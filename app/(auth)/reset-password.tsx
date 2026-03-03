import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../../src/auth/firebase";
import { router, useLocalSearchParams } from "expo-router";
import TestInputWithIcon from "../../src/components/TextInputWithIcon";
import { useTheme } from "../../src/styles/ThemeContext";
import { mapAuthError } from "@/src/auth/mapAuthErrors";


export default function ResetPassword() {
  const { theme } = useTheme();
  const { oobCode } = useLocalSearchParams(); // Firebase reset code from email
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleReset = async () => {
    if (!oobCode){
      Alert.alert("Invalid reset link", "The password reset link is invalid or has expired.");
      return;
    }
    if(password.length < 6){
      Alert.alert("Weak password", "Password must be at least 6 characters.");
      return;
    }
    try {
      setSubmitting(true);
      await confirmPasswordReset(auth, oobCode as string, password);
      router.push("/(auth)/success");
    } catch (error: any) {
      Alert.alert("Failed to reset password", mapAuthError(error));
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
        Reset Password
      </Text>

      <TestInputWithIcon
        label="New Password"
        placeholder="Enter new password"
        value={password}
        onChangeText={setPassword}
        secure
        showHideToggle
        iconName="lock-closed-outline"
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
          Reset Password
        </Text>
      </TouchableOpacity>
    </View>
  );
}
