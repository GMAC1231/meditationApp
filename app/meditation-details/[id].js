import { useGlobalSearchParams } from "expo-router";
import { useCallback, useState} from "react";
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

import {
  MeditationTopDisplay,
  About,
  Footer,
  Tabs,
} from "../components";

import ScreenHeaderBtn from "../components/ScreenHeaderBtn";
import { COLORS, SIZES } from "../../constants/theme";
import useFetch from "../../hook/useFetch";   // ✅ ADD THIS




const TABS = ["About", "Instructions"];

const MeditationDetails = () => {
    const { id } = useGlobalSearchParams();
  
    const [activeTab, setActiveTab] = useState(TABS[0]);
    const [refreshing, setRefreshing] = useState(false);
  
    const { data, isLoading, error, refetch } = useFetch();

  
    const meditationItem =
      Array.isArray(data)
        ? data.find((item) => item.id === parseInt(id, 10))
        : null;
  

  // Pull-to-refresh handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  // Share handler
  const handleShare = async () => {
    if (!meditationItem) return;

    try {
      await Share.share({
        message: `Check out this meditation: ${meditationItem.title} (${meditationItem.duration})`,
      });
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  // Render tab content
  const renderTabContent = () => {
    if (!meditationItem) return null;

    if (activeTab === "About") {
      return (
        <About
          title={meditationItem.title}
          info={meditationItem.description || "No description available"}
        />
      );
    }

    if (activeTab === "Instructions") {
      return (
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>Instructions:</Text>

          <View style={styles.pointsContainer}>
            {(meditationItem.instructions || ["N/A"]).map(
              (instruction, index) => (
                <View key={index} style={styles.pointRow}>
                  <View style={styles.dot} />
                  <Text style={styles.pointText}>{instruction}</Text>
                </View>
              )
            )}
          </View>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeaderBtn detailPage handleShare={handleShare} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text style={styles.message}>Something went wrong.</Text>
        ) : !meditationItem ? (
          <Text style={styles.message}>No data available.</Text>
        ) : (
          <View style={styles.content}>
            <MeditationTopDisplay
              meditationImage={meditationItem.image}
              meditationTitle={meditationItem.title}
              duration={meditationItem.duration}
              target={meditationItem.target}
            />

            <Tabs
              tabs={TABS}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {renderTabContent()}
          </View>
        )}
      </ScrollView>

      {meditationItem && <Footer data={meditationItem} />}
    </SafeAreaView>
  );
};

export default MeditationDetails;


// ----------------------
// Styles
// ----------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: SIZES.medium,
    paddingBottom: 100,
  },
  message: {
    textAlign: "center",
    marginTop: SIZES.large,
    fontSize: SIZES.medium,
  },
  instructionsContainer: {
    paddingVertical: SIZES.medium,
  },
  instructionsTitle: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    marginBottom: SIZES.small,
  },
  pointsContainer: {
    marginTop: SIZES.small,
  },
  pointRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.small / 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginRight: SIZES.small,
  },
  pointText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    flex: 1,
  },
});
