import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../src/auth/firebase";
import { router } from "expo-router";
import TextInputWithIcon from "../../src/components/TextInputWithIcon";
import { useTheme } from "../../src/styles/ThemeContext";

export default function ForgotPassword() {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email.trim());
      router.push("/(auth)/success");
    } catch (error: any) {
      console.log("RESET ERROR:", error.code, error.message);
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
        Forgot Password
      </Text>

      <TextInputWithIcon
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        iconName="mail-outline"
      />

      <TouchableOpacity
        style={{
          width: "100%",
          padding: 15,
          borderRadius: 8,
          backgroundColor: theme.colors.primary,
          marginTop: 20,
          alignItems: "center",
        }}
        onPress={handleReset}
      >
        <Text style={{ color: theme.colors.background, fontWeight: "bold", fontSize: 16 }}>
          Send Reset Link
        </Text>
      </TouchableOpacity>
    </View>
  );
}
