import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../constants/theme";
import useFetch from "../hook/useFetch";

const PopularMeditation = () => {
  const router = useRouter();

  const { data, isLoading, error } = useFetch("search", {
    query: "Meditation",
    num_pages: "1",
  });

  const [selectedMeditation, setSelectedMeditation] = useState(null);

  const handleCardPress = (item) => {
    router.push(`/meditation-details/${item.id}`);
    setSelectedMeditation(item.id);
  };

  const renderMeditationCard = ({ item }) => (
    <TouchableOpacity
      style={styles.container(selectedMeditation, item)}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{ uri: item?.image }}
          resizeMode="cover"
          style={styles.logoImage}
        />
      </TouchableOpacity>

      <View style={styles.tabsContainer}>
        <Text style={styles.companyName} numberOfLines={1}>
          {item.target}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text
          style={styles.meditationName(selectedMeditation, item)}
          numberOfLines={1}
        >
          {item.title}
        </Text>

        <View style={styles.infoWrapper}>
          <Text style={styles.publisher(selectedMeditation, item)}>
            {item?.shortDescription}
          </Text>
        </View>
      </View>

      <Text style={styles.location}>{item.duration}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.wrapper} testID="popularContainer">

        {/* Header */}
        <View style={styles.header} testID="popularHeader">
          <Text style={styles.headerTitle}>Popular Meditations</Text>
          <TouchableOpacity />
        </View>

        {/* Cards Section */}
        <View style={styles.cardsContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderMeditationCard}
              contentContainerStyle={{ columnGap: SIZES.medium }}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: SIZES.large,
  },

  container: (selectedMeditation, item) => ({
    width: 270,
    padding: SIZES.xLarge,
    marginHorizontal: SIZES.small,
    backgroundColor:
      selectedMeditation === item.id ? COLORS.primary : "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
  }),

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },

  cardsContainer: {
    marginTop: SIZES.medium,
  },

  logoContainer: {
    width: "100%",
    height: 140,
    borderRadius: SIZES.medium,
    overflow: "hidden",
  },

  logoImage: {
    width: "100%",
    height: "100%",
  },

  tabsContainer: {
    marginTop: SIZES.medium,
  },

  companyName: {
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },

  infoContainer: {
    marginTop: SIZES.large,
  },

  meditationName: (selectedMeditation, item) => ({
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color:
      selectedMeditation === item.id
        ? COLORS.white
        : COLORS.primary,
  }),

  infoWrapper: {
    marginTop: 5,
  },

  publisher: (selectedMeditation, item) => ({
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color:
      selectedMeditation === item.id
        ? COLORS.white
        : COLORS.primary,
  }),

  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginTop: SIZES.small,
  },
});

export default PopularMeditation;
