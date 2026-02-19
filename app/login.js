import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SHADOWS } from "../constants";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // ---------------- VALIDATION ----------------
  const validateForm = () => {
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please fill in all fields.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  // ---------------- LOGIN FUNCTION ----------------
  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const storedUser = await AsyncStorage.getItem("userDetails");

      if (!storedUser) {
        setErrorMessage("No user found. Please sign up first.");
        return;
      }

      const parsedUser = JSON.parse(storedUser);

      if (email === parsedUser.email && password === parsedUser.password) {

        // ✅ SAVE LOGIN SESSION
        await AsyncStorage.setItem("isLoggedIn", "true");

        setErrorMessage("");
        router.replace("/home");

      } else {
        setErrorMessage("Incorrect email or password.");
      }

    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Something went wrong. Try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />

      <View style={styles.wrapper}>

        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image source={icons.menu} style={styles.logo} />
        </View>

        {/* Input Fields */}
        <View style={styles.formContainer}>

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            value={password}
            secureTextEntry
            onChangeText={setPassword}
            placeholder="Password"
          />

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

        </View>

        {/* Signup Redirect */}
        <View style={styles.signupContainer}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text style={styles.signupText}> Sign Up</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default Login;

// ---------------- STYLES ----------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  wrapper: {
    padding: 20,
  },
  logoContainer: {
    padding: 20,
    alignSelf: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 50,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.medium,
  },
  logo: {
    width: 50,
    height: 50,
  },
  formContainer: {
    marginTop: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    color: "blue",
    fontWeight: "bold",
  },
});
