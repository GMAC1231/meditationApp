import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

import { COLORS, FONT, SIZES } from "../../constants";
import DailyMeditation from "../../components/DailyMeditation";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";

const Favourites = () => {
  // State variables
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load favorites from AsyncStorage
  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      const favoritesArray = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];

      setFavorites(favoritesArray);
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Reload data whenever screen gains focus
  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      loadFavorites();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeaderBtn />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : favorites.length === 0 ? (
            <Text style={styles.headerTitle}>
              No favorite items found.
            </Text>
          ) : (
            <>
              <Text style={styles.title}>
                My Favourite Exercises
              </Text>
              <DailyMeditation meditations={favorites} />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
  container: {
    marginTop: SIZES.xLarge,
    padding: SIZES.medium,
  },
  title: {
    textAlign: "center",
    color: "#FF4500",
    fontWeight: "bold",
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
    textAlign: "center",
    marginTop: 20,
  },
});
