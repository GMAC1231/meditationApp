import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Alert,
  TextInput,
  Text,
  TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SHADOWS } from "../constants";

const SignUp = () => {

    // -------------------- STATE --------------------
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
  
    const router = useRouter();
  
    // -------------------- VALIDATION FUNCTION --------------------
    const validateForm = () => {
  
      if (!userName.trim() || !email.trim() || !password.trim()) {
        setErrorMessage("All fields are required.");
        return false;
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrorMessage("Please enter a valid email address.");
        return false;
      }
  
      if (password.length < 6) {
        setErrorMessage("Password must be at least 6 characters.");
        return false;
      }
  
      setErrorMessage(""); // clear error if valid
      return true;
    };
  
    // -------------------- REGISTER FUNCTION --------------------
    const handleRegister = async () => {
  
      if (!validateForm()) return;
  
      try {
        const userDetails = {
          userName,
          email,
          password,
          token: "sample-token"
        };
  
        await AsyncStorage.setItem(
          "userDetails",
          JSON.stringify(userDetails)
        );
  
        setUserName("");
        setEmail("");
        setPassword("");
  
        router.replace("/login");
  
      } catch (error) {
        setErrorMessage("Something went wrong. Please try again.");
        console.log("Registration Error:", error);
      }
    };
  

  // -------------------- UI --------------------
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (<></>),
          headerTitle: "",
        }}
      />

      <View style={{ padding: 20 }}>

        {/* ICON */}
        <View
          style={{
            padding: 20,
            marginHorizontal: "auto",
            backgroundColor: "#f0f0f0",
            borderRadius: 50,
            height: 90,
            justifyContent: "center",
            alignItems: "center",
            ...SHADOWS.medium,
          }}
        >
          <Image
            source={icons.menu}
            style={{ width: 50, height: 50 }}
          />
        </View>

        {/* FORM */}
        <View style={{ marginTop: 30 }}>

          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
            placeholder="Enter Username"
          />

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

<TextInput
  style={styles.input}
  value={password}
  onChangeText={setPassword}
  secureTextEntry
  placeholder="Enter Password"
/>

{errorMessage ? (
  <Text style={{ color: "red", marginBottom: 10 }}>
    {errorMessage}
  </Text>
) : null}


          <TouchableOpacity
            style={styles.button}
            onPress={handleRegister}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Sign Up
            </Text>
          </TouchableOpacity>

          <View style={styles.row}>
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={{ color: "blue", marginLeft: 5 }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
};


const styles = {
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  }
};

export default SignUp;
