import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../src/auth/firebase";
import { router } from "expo-router";
import TextInputWithIcon from "../../src/components/TextInputWithIcon";
import { useTheme } from "../../src/styles/ThemeContext";
import { mapAuthError } from "@/src/auth/mapAuthErrors";

export default function ForgotPassword() {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);

  const handleReset = async () => {
    if (!email) {
      Alert.alert("Missing info", "Please enter your email.");
      return;
    }

    try {
      setSubmitting(true);
      await sendPasswordResetEmail(auth, email.trim());
      router.push("/(auth)/success");
    } catch (error: any) {
      Alert.alert("Failed to send reset email", mapAuthError(error));
    } finally {
      setSubmitting(false);
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
        disabled={submitting}
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
         {submitting ? "Sending reset link..." : "Send Reset Link"}
        </Text>
      </TouchableOpacity>

       <TouchableOpacity
              style={{
                width: "100%",
                padding: 15,
                borderRadius: 8,
                backgroundColor: theme.colors.primary,
                marginTop: 20,
                alignItems: "center",
              }}
              onPress={() => router.push("/(auth)/login")}
            >
              <Text style={{ color: theme.colors.background, fontWeight: "bold", fontSize: 16 }}>
                Back to Login
              </Text>
            </TouchableOpacity>
    </View>
  );
}
