import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { COLORS, SIZES } from "../constants/theme";

const CountryDropdown = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch countries");
      }

      const data = await response.json();

      const countryNames = data
        .map((country) => country.name.common)
        .sort((a, b) => a.localeCompare(b));

      setCountries(countryNames);
    } catch (error) {
      console.log("Error fetching countries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select a Country</Text>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <Picker
          selectedValue={selectedCountry}
          onValueChange={(itemValue) =>
            setSelectedCountry(itemValue)
          }
          style={styles.picker}
        >
          <Picker.Item label="-- Choose Country --" value="" />
          {countries.map((country, index) => (
            <Picker.Item
              key={index}
              label={country}
              value={country}
            />
          ))}
        </Picker>
      )}

      {selectedCountry !== "" && (
        <Text style={styles.selectedText}>
          Selected: {selectedCountry}
        </Text>
      )}
    </View>
  );
};

export default CountryDropdown;

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.large,
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.primary,
  },
  picker: {
    backgroundColor: "#f2f2f2",
  },
  selectedText: {
    marginTop: 10,
    fontSize: 14,
    color: "#333",
  },
});
