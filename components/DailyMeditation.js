import React from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "../constants/theme";
import useFetch from "../hook/useFetch";
import { useTheme } from "../context/ThemeProvider";

const DailyMeditation = ({ meditations }) => {
  const router = useRouter();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const { isLoading, error, bestMeditations } = useFetch("search", {
    query: "",
    num_pages: "1",
  });

  const handleNavigate = (id) => {
    router.push(`/meditation-details/${id}`);
  };

  const data = meditations || bestMeditations;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={[
            styles.headerTitle,
            { color: isDarkMode ? "#FFFFFF" : COLORS.primary },
          ]}
        >
          Daily Meditation
        </Text>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text style={{ color: isDarkMode ? "#FFFFFF" : "#000000" }}>
            Something went wrong
          </Text>
        ) : (
          data?.map((meditation) => (
            <TouchableOpacity
              key={`meditation-${meditation.id}`}
              style={[
                styles.cardContainer,
                {
                  backgroundColor: isDarkMode ? "#1E1E1E" : "#FFFFFF",
                  shadowColor: isDarkMode ? "#000" : COLORS.white,
                },
              ]}
              onPress={() => handleNavigate(meditation.id)}
            >
              <View
                style={[
                  styles.logoContainer,
                  {
                    backgroundColor: isDarkMode ? "#2A2A2A" : COLORS.white,
                  },
                ]}
              >
                <Image
                  source={{ uri: meditation.image }}
                  resizeMode="cover"
                  style={styles.logoImage}
                />
              </View>

              <View style={styles.textContainer}>
                <Text
                  style={[
                    styles.meditationName,
                    { color: isDarkMode ? "#FFFFFF" : COLORS.primary },
                  ]}
                  numberOfLines={1}
                >
                  {meditation.title}
                </Text>

                <Text
                  style={{
                    color: isDarkMode ? "#BBBBBB" : "#444444",
                  }}
                >
                  {meditation.target}
                </Text>

                <Text
                  style={{
                    color: isDarkMode ? "#BBBBBB" : "#444444",
                  }}
                >
                  {meditation.duration}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </View>
  );
};

export default DailyMeditation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SIZES.xLarge,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SIZES.small,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
    gap: SIZES.small,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    ...SHADOWS.medium,
  },
  logoContainer: {
    width: "100%",
    height: 150,
    justifyContent: "center",
    borderRadius: SIZES.medium,
    alignItems: "center",
  },
  logoImage: {
    width: "100%",
    height: "100%",
    borderRadius: SIZES.medium,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
    marginTop: SIZES.medium,
  },
  meditationName: {
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
  },
});
