import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeProvider";
import { SIZES } from "../../constants/theme";
import styles from "./About.style";

const About = ({ info, title }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <View style={styles.wrapper}>
      <Text
        style={[
          styles.heading,
          { color: isDarkMode ? "#FFFFFF" : "#111111" },
        ]}
      >
        About {title}
      </Text>

      <View
        style={[
          styles.card,
          { backgroundColor: isDarkMode ? "#1E1E1E" : "#F3F3F3" },
        ]}
      >
        <Text
          style={[
            styles.description,
            { color: isDarkMode ? "#DDDDDD" : "#333333" },
          ]}
        >
          {info}
        </Text>
      </View>
    </View>
  );
};

export default About;