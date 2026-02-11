import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Alert,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SHADOWS } from "../constants";

const SignUp = () => {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Email format validation
  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleRegister = async () => {
    // Empty field validation
    if (!userName || !email || !password) {
      setError("All fields are required.");
      return;
    }

    // Email validation
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password length validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");

    const userDetails = {
      userName,
      email,
      password,
      token: "sample-token",
    };

    try {
      await AsyncStorage.setItem("userDetails", JSON.stringify(userDetails));
      Alert.alert("Success", "Registration successful!");
      router.push("/login");
    } catch (err) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => <></>,
          headerTitle: "",
        }}
      />

      <SafeAreaView style={styles.container}>
        <View style={styles.iconContainer}>
          <Image source={icons.menu} style={styles.icon} />
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={[
              styles.input,
              error && !userName && styles.inputError,
            ]}
            value={userName}
            onChangeText={setUserName}
            placeholder="Username"
          />

          <TextInput
            style={[
              styles.input,
              error && !email && styles.inputError,
            ]}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
          />

          <TextInput
            style={[
              styles.input,
              error && !password && styles.inputError,
            ]}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Password"
          />

          {/* Inline Error Message */}
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}

          <TouchableOpacity
            style={styles.button}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={styles.loginText}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginTop: 40,
    alignSelf: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 60,
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.medium,
  },
  icon: {
    width: 50,
    height: 50,
  },
  formContainer: {
    marginTop: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 14,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  loginText: {
    color: "blue",
    fontWeight: "600",
  },
});
