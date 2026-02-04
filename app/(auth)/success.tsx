import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useTheme } from "../../src/styles/ThemeContext";

export default function Success() {
  const { theme } = useTheme();

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
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20, color: theme.colors.text }}>
        Success!
      </Text>
      <Text style={{ fontSize: 16, color: theme.colors.text, marginBottom: 40, textAlign: "center" }}>
        Your action has been completed successfully.
      </Text>

      <TouchableOpacity
        style={{
          width: "100%",
          padding: 15,
          borderRadius: 8,
          backgroundColor: theme.colors.primary,
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
