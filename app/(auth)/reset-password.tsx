import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../../src/auth/firebase";
import { router, useLocalSearchParams } from "expo-router";
import TestInputWithIcon from "../../src/components/TextInputWithIcon";
import { useTheme } from "../../src/styles/ThemeContext";

export default function ResetPassword() {
  const { theme } = useTheme();
  const { oobCode } = useLocalSearchParams(); // Firebase reset code from email
  const [password, setPassword] = useState("");

  const handleReset = async () => {
    if (!oobCode) return;
    try {
      await confirmPasswordReset(auth, oobCode as string, password);
      router.push("/(auth)/success");
    } catch (error: any) {
      console.log("RESET PASSWORD ERROR:", error.code, error.message);
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
