import React from "react";
import { View, Text, SafeAreaView, Switch, StyleSheet } from "react-native";
import { COLORS, SIZES, SHADOWS } from "../../constants";
import { useTheme } from "../../context/ThemeProvider";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";

const ThemeChange = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? COLORS.darkBackground
            : COLORS.lightWhite,
        },
      ]}
    >
      <ScreenHeaderBtn />

      <View
        style={[
          styles.toggleCard,
          {
            backgroundColor: isDarkMode ? "#1E1E1E" : "#FFFFFF",
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            { color: isDarkMode ? "#FFFFFF" : "#000000" },
          ]}
        >
          {isDarkMode ? "Dark Mode" : "Light Mode"}
        </Text>

        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          trackColor={{ false: "#ccc", true: COLORS.primary }}
          thumbColor={isDarkMode ? "#fff" : "#f4f3f4"}
        />
      </View>
    </SafeAreaView>
  );
};

export default ThemeChange;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.large,
  },
  toggleCard: {
    marginTop: 50,
    padding: SIZES.large,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...SHADOWS.medium,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
