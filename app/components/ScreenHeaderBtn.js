import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../constants/theme";
import icons from "../../constants/icons";

const ScreenHeaderBtn = ({ detailPage = false, handleShare }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Left Button (Menu → Home) */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/home")}
      >
        <Image source={icons.menu} style={styles.icon} />
      </TouchableOpacity>

      {/* Right Button */}
      {detailPage ? (
        <TouchableOpacity
          style={styles.button}
          onPress={handleShare}
        >
          <Image source={icons.share} style={styles.icon} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/settings")}
        >
          <Image source={icons.settings} style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ScreenHeaderBtn;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    width: "100%", // ❌ remove 100vw (not supported in React Native)
    marginTop: 10,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  button: {
    width: 42,
    height: 42,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, // Android shadow
  },
});
