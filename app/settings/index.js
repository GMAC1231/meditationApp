import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { COLORS, SIZES, SHADOWS } from "../../constants";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";

const Settings = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeaderBtn />

      <View style={styles.content}>

        {/* Settings Card */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/settings/ThemeChange")}
        >
          <Text style={styles.cardText}>⚙️ Settings</Text>
        </TouchableOpacity>

        {/* My Favourites */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/Favourites")}
        >
          <Text style={styles.cardText}>🧘 My Favourites</Text>
        </TouchableOpacity>

        {/* Daily Reminders */}
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>⏰ Daily Reminders</Text>
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity style={[styles.card, styles.logout]}>
          <Text style={styles.cardText}>⬅ Logout</Text>
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
    backgroundColor: "#F8C8D0",
  },
  cardText: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
    color: COLORS.primary,
  },
});
