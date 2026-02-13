import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../src/auth/firebase";
import { router } from "expo-router";
import TextInputWithIcon from "../../src/components/TextInputWithIcon";
import { useTheme } from "../../src/styles/ThemeContext";

export default function Register() {
  const { theme } = useTheme();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/(auth)/success");
    } catch (error: any) {
      console.log("REGISTER ERROR:", error.code, error.message);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: theme.colors.background,
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 30, color: theme.colors.text }}>
        Create Account
      </Text>

      <TextInputWithIcon
        label="Full Name"
        placeholder="Enter your full name"
        value={fullname}
        onChangeText={setFullname}
        iconName="person-outline"
      />

      <TextInputWithIcon
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        iconName="mail-outline"
      />

      <TextInputWithIcon
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secure
        showHideToggle
        iconName="lock-closed-outline"
      />

      <TouchableOpacity
        style={{
          width: "100%",
          padding: 15,
          borderRadius: 8,
          backgroundColor: theme.colors.primary,
          marginVertical: 20,
          alignItems: "center",
        }}
        onPress={handleRegister}
      >
        <Text style={{ color: theme.colors.background, fontWeight: "bold", fontSize: 16 }}>
          Sign Up
        </Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row" }}>
        <Text style={{ color: theme.colors.text }}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
          <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
