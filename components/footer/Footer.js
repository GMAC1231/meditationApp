import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./Footer.style";
import { icons } from "../../constants";

const Footer = ({
  isFavorite,
  isReminder,
  toggleFavorite,
  toggleReminder,
}) => {
  return (
    <View style={styles.container}>

      {/* Heart Button */}
      <TouchableOpacity
        style={styles.likeBtn}
        onPress={toggleFavorite}
      >
        <Image
          source={isFavorite ? icons.heartFilled : icons.heartOutline}
          resizeMode="contain"
          style={[
            styles.likeBtnImage,
            { tintColor: isFavorite ? "red" : "#F37453" },
          ]}
        />
      </TouchableOpacity>

      {/* 🔔 Reminder Button */}
      <TouchableOpacity
        style={styles.likeBtn}
        onPress={toggleReminder}
      >
        <Text style={{ fontSize: 24 }}>
          {isReminder ? "🔔" : "🔕"}
        </Text>
      </TouchableOpacity>

      {/* Bottom Button */}
      <TouchableOpacity
        style={styles.applyBtn}
        onPress={toggleFavorite}
      >
        <Text style={styles.applyBtnText}>
          {isFavorite
            ? "Remove from favorites"
            : "Add to favorites"}
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default Footer;
