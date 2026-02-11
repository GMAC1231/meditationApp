import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ScreenHeaderBtn from "./components/ScreenHeaderBtn";
import Welcome from "./components/Welcome";
import PopularMeditation from "./components/PopularMeditation";
import DailyMeditation from "./components/DailyMeditation";

const Home = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    try {
      const user = await AsyncStorage.getItem("userDetails");

      if (user) {
        setUserDetails(JSON.parse(user));
      }
    } catch (error) {
      console.log("Error loading user:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeaderBtn />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View testID="screensDisplay">
          <Welcome userDetails={userDetails} />
          <PopularMeditation />
          <DailyMeditation />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  scrollContainer: {
    padding: SIZES.medium,
  },
});
