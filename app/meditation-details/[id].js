import React, { useState, useEffect, useCallback } from "react";
import { useGlobalSearchParams } from "expo-router";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Share,
  Alert,
  StyleSheet,
} from "react-native";

import { MeditationTopDisplay, About, Footer, Tabs } from "../../components";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
import { COLORS, SIZES } from "../../constants/theme";
import useFetch from "../../hook/useFetch";

import {
  getFavorites,
  getReminders,
  toggleFavorite as toggleFavoriteStorage,
  toggleReminder as toggleReminderStorage,
} from "../../utils/storage";

import { useTheme } from "../../context/ThemeProvider";

const tabs = ["About", "Instructions"];

const MeditationDetails = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const bgColor = isDarkMode ? "#121212" : "#FFFFFF";
  const cardColor = isDarkMode ? "#1E1E1E" : "#FFFFFF";
  const textPrimary = isDarkMode ? "#FFFFFF" : "#111111";
  const textSecondary = isDarkMode ? "#BBBBBB" : "#444444";

  const params = useGlobalSearchParams();
  const id = params.id;

  const { data, isLoading, error, refetch } = useFetch("search", { query: id });
  const meditationItem = data?.[0];

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);
  const [isReminder, setIsReminder] = useState(false);

  useEffect(() => {
    if (meditationItem) checkStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meditationItem]);

  const checkStatus = async () => {
    const favs = await getFavorites();
    const rems = await getReminders();

    setIsFavorite(favs.some((f) => f.id === meditationItem.id));
    setIsReminder(rems.some((r) => r.id === meditationItem.id));
  };

  const handleToggleFavorite = async () => {
    const newState = await toggleFavoriteStorage(meditationItem);
    setIsFavorite(newState);
  };

  const handleToggleReminder = async () => {
    const newState = await toggleReminderStorage(meditationItem);
    setIsReminder(newState);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, [refetch]);

  const displayTabContent = () => {
    if (!meditationItem) return null;

    if (activeTab === "About") {
      return (
        <View style={[styles.sectionWrapper, { backgroundColor: cardColor }]}>
          <About
            title={meditationItem.title}
            info={meditationItem.description ?? "No data provided"}
            // If your About component supports it later:
            // isDarkMode={isDarkMode}
          />
        </View>
      );
    }

    if (activeTab === "Instructions") {
      return (
        <View
          style={[
            styles.specificsContainer,
            { backgroundColor: cardColor, borderRadius: 14 },
          ]}
        >
          <Text style={[styles.specificsTitle, { color: textPrimary }]}>
            Instructions:
          </Text>

          <View style={styles.pointsContainer}>
            {(meditationItem.instructions ?? ["N/A"]).map((item, index) => (
              <View style={styles.pointWrapper} key={index}>
                <View style={styles.pointDot} />
                <Text style={[styles.pointText, { color: textSecondary }]}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>
      );
    }

    return null;
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: `Check out this meditation: ${meditationItem?.title} (${meditationItem?.duration})`,
      });
    } catch (err) {
      Alert.alert(err.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
      <ScreenHeaderBtn detailPage={true} handleShare={onShare} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text style={{ color: textPrimary, padding: SIZES.medium }}>
            Something went wrong
          </Text>
        ) : !meditationItem ? (
          <Text style={{ color: textPrimary, padding: SIZES.medium }}>
            No data available
          </Text>
        ) : (
          <View style={{ padding: SIZES.medium, paddingBottom: 110 }}>
            <MeditationTopDisplay
              meditationImage={meditationItem.image}
              meditationTitle={meditationItem.title}
              duration={meditationItem.duration}
              target={meditationItem.target}
              // If your MeditationTopDisplay supports it later:
              // isDarkMode={isDarkMode}
            />

            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              // If your Tabs supports it later:
              // isDarkMode={isDarkMode}
            />

            {displayTabContent()}
          </View>
        )}
      </ScrollView>

      <Footer
        data={meditationItem}
        isFavorite={isFavorite}
        isReminder={isReminder}
        toggleFavorite={handleToggleFavorite}
        toggleReminder={handleToggleReminder}
        // If your Footer supports it later:
        // isDarkMode={isDarkMode}
      />
    </SafeAreaView>
  );
};

export default MeditationDetails;

const styles = StyleSheet.create({
  sectionWrapper: {
    borderRadius: 14,
    paddingVertical: SIZES.small,
    marginTop: SIZES.small,
  },
  specificsContainer: {
    padding: SIZES.medium,
    marginTop: SIZES.small,
  },
  specificsTitle: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    marginBottom: SIZES.small,
  },
  pointsContainer: {
    marginTop: SIZES.small,
  },
  pointWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.small / 2,
  },
  pointDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginRight: SIZES.small,
  },
  pointText: {
    fontSize: SIZES.medium,
  },
});
