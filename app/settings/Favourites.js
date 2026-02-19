import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, FONT, SIZES } from "../../constants";
import DailyMeditation from "../../components/DailyMeditation";
import { useFocusEffect } from "expo-router";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
import { useTheme } from "../../context/ThemeProvider";

const Favourites = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      const favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];
      setFavorites(favoritesArray);
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? "#121212" : COLORS.lightWhite,
      }}
    >
      <ScreenHeaderBtn />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : favorites.length === 0 ? (
            <Text
              style={[
                styles.headerTitle,
                { color: isDarkMode ? "#FFFFFF" : COLORS.primary },
              ]}
            >
              No favorite items found.
            </Text>
          ) : (
            <>
              <Text
                style={{
                  textAlign: "center",
                  color: isDarkMode ? "#FF7A59" : "#FF4500",
                  fontWeight: "bold",
                }}
              >
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
  container: {
    marginTop: SIZES.xLarge,
    padding: SIZES.medium,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    textAlign: "center",
    marginTop: 20,
  },
});
