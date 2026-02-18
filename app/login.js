import React, { useState } from "react";
import { View, SafeAreaView, Image, Alert, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SHADOWS } from "../constants";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
  
    // ---------------- VALIDATION FUNCTION ----------------
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
  
    // ---------------- AUTHENTICATION FUNCTION ----------------
    const handleLogin = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("userDetails");
  
        if (!storedUser) {
          setErrorMessage("No user found. Please sign up first.");
          return;
        }
  
        const parsedUser = JSON.parse(storedUser);
  
        if (email === parsedUser.email && password === parsedUser.password) {
          setErrorMessage("");
          router.replace("/home");
        } else {
          setErrorMessage("Incorrect email or password.");
        }
  
      } catch (error) {
        console.error("Error accessing AsyncStorage", error);
        setErrorMessage("Something went wrong.");
      }
    };
  
    // ---------------- BUTTON HANDLER ----------------
    const handleLoginPress = () => {
      if (validateForm()) {
        handleLogin();
      }
    };
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
     <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
<></>
          ),
          headerTitle: "",
        }}
      />
      <View style={{ padding: 20 }}>
        <View
          style={{
            padding: 20,
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "#f0f0f0",
            borderRadius: 50,
            height: 90,
            ...SHADOWS.medium,
            shadowColor: COLORS.white,
          }}
        >
          <Image
            source={icons.menu}
            style={{
              width: 50,
              height: 50,
              marginBottom: 20,
            }}
          />
        </View>

        {/* Form Component */}
        <View style={{ marginTop: 20 }}>
          <View style={{ marginBottom: 20 }}>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 10,
                borderRadius: 5,
                marginBottom: 10,
              }}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
            />
<TextInput
  style={{
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  }}
  value={password}
  secureTextEntry={true}
  onChangeText={setPassword}
  placeholder="Password"
/>

{errorMessage ? (
  <Text style={{ color: "red", marginBottom: 10 }}>
    {errorMessage}
  </Text>
) : null}

          </View>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              padding: 15,
              borderRadius: 5,
              alignItems: "center",
            }}
            onPress={handleLogin}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Additional Options */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
          }}
        >
          <Text style={{ marginRight: 5 }}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text style={{ color: "blue" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;