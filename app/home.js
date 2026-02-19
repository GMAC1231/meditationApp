import { useEffect, useState, useMemo } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { COLORS, SIZES } from "../constants/theme";
import { useTheme } from "../context/ThemeProvider";

import ScreenHeaderBtn from "../components/ScreenHeaderBtn";
import Welcome from "../components/Welcome";
import PopularMeditation from "../components/PopularMeditation";
import DailyMeditation from "../components/DailyMeditation";
import DailyQuote from "../components/DailyQuote";
import CountryList from "../components/CountryList";

const Home = () => {
  const [userDetails, setUserDetails] = useState(null);

  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  // ✅ Dynamic styles using useMemo
  const dynamicStyles = useMemo(() => {
    return {
      container: {
        flex: 1,
        backgroundColor: isDarkMode
          ? COLORS.darkBackground
          : COLORS.lightWhite,
      },
      content: {
        padding: SIZES.medium,
        backgroundColor: isDarkMode
          ? COLORS.darkBackground
          : COLORS.lightWhite,
      },
    };
  }, [isDarkMode]);

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const user = await AsyncStorage.getItem("userDetails");
        setUserDetails(user ? JSON.parse(user) : null);
      } catch (error) {
        console.log("Error loading user:", error);
      }
    };

    loadUserDetails();
  }, []);

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <ScreenHeaderBtn />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={dynamicStyles.content}
      >
        <View testID="screensDisplay">

          <Welcome
            userDetails={userDetails}
            isDarkMode={isDarkMode}
          />

          <DailyQuote isDarkMode={isDarkMode} />

          <CountryList isDarkMode={isDarkMode} />

          <PopularMeditation isDarkMode={isDarkMode} />

          <DailyMeditation isDarkMode={isDarkMode} />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
