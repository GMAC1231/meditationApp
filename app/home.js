import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
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

  // ✅ Use global theme context
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    try {
      const user = await AsyncStorage.getItem("userDetails");
      setUserDetails(user ? JSON.parse(user) : null);
    } catch (error) {
      console.log("Error loading user:", error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode
          ? COLORS.darkBackground
          : COLORS.lightWhite,
      }}
    >
      <ScreenHeaderBtn />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            padding: SIZES.medium,
          }}
          testID="screensDisplay"
        >
          <Welcome
            userDetails={userDetails}
            isDarkMode={isDarkMode}
          />

          <DailyQuote />

          <CountryList />

          <PopularMeditation isDarkMode={isDarkMode} />

          <DailyMeditation isDarkMode={isDarkMode} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

