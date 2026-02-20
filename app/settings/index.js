import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, SIZES, SHADOWS } from "../../constants";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";

const Settings = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const user = await AsyncStorage.getItem("userDetails");
      if (user) {
        const parsedUser = JSON.parse(user);
        setUserName(parsedUser.userName);
      }
    } catch (error) {
      console.log("Error loading user:", error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("userDetails");
              setUserName("");
              router.replace("/login");
            } catch (error) {
              console.log("Logout error:", error);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeaderBtn />

      <View style={styles.header}>
        <Text style={styles.headerText}>
          Hello, {userName ? userName : "User"} 👋
        </Text>
      </View>

      <View style={styles.content}>

        {/* Account Settings */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/settings/ThemeChange")}
        >
          <Text style={styles.cardText}>⚙️ Account Settings</Text>
        </TouchableOpacity>

        {/* Favourites */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/settings/Favourites")}
        >
          <Text style={styles.cardText}>🧘 My Favourites</Text>
        </TouchableOpacity>

        {/* 🔔 Daily Reminder (NEW) */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/settings/DailyReminders")}
        >
          <Text style={styles.cardText}>⏰ Daily Reminder</Text>
        </TouchableOpacity>

        {/* Notifications */}
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>🔔 Notifications</Text>
        </TouchableOpacity>

        {/* About */}
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>ℹ️ About App</Text>
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity
          style={[styles.card, styles.logout]}
          onPress={handleLogout}
        >
          <Text style={[styles.cardText, { color: "#B00020" }]}>
            ⬅ Logout
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  header: {
    paddingVertical: 25,
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    padding: SIZES.large,
  },
  card: {
    backgroundColor: "#F3F4F8",
    padding: SIZES.large,
    borderRadius: 15,
    marginBottom: SIZES.medium,
    ...SHADOWS.medium,
  },
  logout: {
    backgroundColor: "#FDE8E8",
  },
  cardText: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
    color: COLORS.primary,
  },
});
