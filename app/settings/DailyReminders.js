import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
  TextInput,
  StyleSheet,
  Modal,
} from "react-native";
import { Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar } from "react-native-calendars";
import * as Notifications from "expo-notifications";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS, SIZES } from "../../constants";
import { useTheme } from "../../context/ThemeProvider";

const DailyReminders = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const [reminders, setReminders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [manualTime, setManualTime] = useState("");

  // ✅ Custom Popup State
  const [popup, setPopup] = useState({
    visible: false,
    title: "",
    message: "",
  });

  const showPopup = (title, message) => {
    setPopup({ visible: true, title, message });
  };

  const closePopup = () => {
    setPopup({ visible: false, title: "", message: "" });
  };

  useEffect(() => {
    requestPermissions();
    loadReminders();
  }, []);

  // ✅ Permission Handler
  const requestPermissions = async () => {
    if (Platform.OS === "web") {
      if ("Notification" in window) {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          showPopup("Permission Required", "Please allow browser notifications.");
        }
      }
    } else {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        showPopup(
          "Permission Required",
          "Please allow notifications to receive reminders."
        );
      }
    }
  };

  const loadReminders = async () => {
    const storedReminders = await AsyncStorage.getItem("reminders");
    const allReminders = storedReminders ? JSON.parse(storedReminders) : [];

    const futureReminders = allReminders.filter(
      (reminder) => new Date(reminder.triggerDate) > new Date()
    );

    setReminders(futureReminders);
  };

  // ✅ Notification Scheduler
  const scheduleNotification = async (reminder) => {
    const triggerDate = new Date(reminder.triggerDate);

    if (Platform.OS === "web") {
      const delay = triggerDate.getTime() - new Date().getTime();

      if (delay > 0 && Notification.permission === "granted") {
        setTimeout(() => {
          new Notification("Reminder", {
            body: reminder.description,
            icon: "/favicon.ico",
          });
        }, delay);
      }
    } else {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Reminder",
          body: reminder.description,
        },
        trigger: { date: triggerDate },
      });
    }
  };

  const handleAddReminder = async () => {
    if (!selectedDate) {
      showPopup("Error", "Please select a date.");
      return;
    }

    const triggerDate = new Date(selectedDate);

    const [hours, minutes] = manualTime
      .split(":")
      .map((item) => parseInt(item, 10));

    if (!isNaN(hours) && !isNaN(minutes)) {
      triggerDate.setHours(hours, minutes, 0, 0);
    } else {
      triggerDate.setHours(
        selectedTime.getHours(),
        selectedTime.getMinutes(),
        0,
        0
      );
    }

    if (triggerDate <= new Date()) {
      showPopup("Error", "Please select a future time.");
      return;
    }

    const newReminder = {
      id: Date.now(),
      date: selectedDate,
      time:
        manualTime ||
        triggerDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      description: "Reminder: Time for your daily task!",
      triggerDate: triggerDate.toISOString(),
    };

    try {
      const updatedReminders = [...reminders, newReminder];
      await AsyncStorage.setItem(
        "reminders",
        JSON.stringify(updatedReminders)
      );
      setReminders(updatedReminders);
      await scheduleNotification(newReminder);

      showPopup("Success", "Reminder added successfully!");
    } catch (error) {
      showPopup("Error", "Error adding reminder.");
    }
  };

  const deleteReminder = async (id) => {
    const updatedReminders = reminders.filter(
      (reminder) => reminder.id !== id
    );
    await AsyncStorage.setItem("reminders", JSON.stringify(updatedReminders));
    setReminders(updatedReminders);
  };

  const Reminder = ({ item }) => (
    <View style={styles.reminderContainer}>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.date}>
        {item.date} - {item.time}
      </Text>
      <TouchableOpacity
        onPress={() => deleteReminder(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode
          ? COLORS.darkBackground
          : COLORS.lightWhite,
      }}
    >
      <Stack.Screen options={{ headerTitle: "Daily Reminders" }} />

      <ScrollView contentContainerStyle={{ padding: SIZES.medium }}>
        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: COLORS.primary,
            },
          }}
        />

        <TextInput
          placeholder="Enter Time (HH:mm)"
          value={manualTime}
          onChangeText={setManualTime}
          keyboardType="numeric"
          maxLength={5}
          style={styles.input}
        />

        <Text style={styles.selected}>
          Date: {selectedDate || "None"}
        </Text>

        <TouchableOpacity
          onPress={handleAddReminder}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Add Reminder</Text>
        </TouchableOpacity>

        <Text style={styles.reminderHeader}>All Reminders:</Text>

        {reminders.length > 0 ? (
          reminders.map((rem) => (
            <Reminder key={rem.id} item={rem} />
          ))
        ) : (
          <Text>No reminders yet.</Text>
        )}
      </ScrollView>

      {/* ✅ Custom Popup Modal */}
      <Modal transparent visible={popup.visible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{popup.title}</Text>
            <Text style={styles.modalMessage}>{popup.message}</Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={closePopup}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default DailyReminders;

const styles = StyleSheet.create({
  reminderContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: SIZES.small,
    marginVertical: SIZES.small,
  },
  description: {
    color: COLORS.lightWhite,
    fontWeight: "bold",
  },
  date: {
    color: COLORS.darkText,
    fontSize: SIZES.small,
  },
  input: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 8,
    padding: SIZES.small,
    marginVertical: SIZES.small,
  },
  selected: {
    fontSize: SIZES.medium,
    marginVertical: SIZES.small,
    color: COLORS.primary,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: SIZES.medium,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: COLORS.lightWhite,
    fontWeight: "bold",
  },
  deleteButton: {
    marginTop: SIZES.small,
    alignSelf: "flex-end",
  },
  deleteText: {
    color: "#FE7654",
    fontWeight: "bold",
  },
  reminderHeader: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    color: COLORS.primary,
    marginVertical: SIZES.medium,
  },

  // 🔥 Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 350,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 15,
    marginBottom: 15,
    color: "#333",
  },
  modalButton: {
    alignSelf: "flex-end",
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});