import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../src/styles/ThemeContext";

export default function LogoutScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    // Replace with real auth logout later
    router.replace("/"); // or login screen route
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: "center",
        padding: 20,
      }}
    >
      {/* Icon */}
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Ionicons
          name="log-out-outline"
          size={80}
          color={theme.colors.primary}
        />
      </View>

      {/* Text */}
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 10,
          color: theme.colors.text,
        }}
      >
        Logout
      </Text>

      <Text
        style={{
          textAlign: "center",
          marginBottom: 30,
          color: theme.colors.muted,
        }}
      >
        Are you sure you want to log out of your account?
      </Text>

      {/* Buttons */}
      <View style={{ gap: 12 }}>
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            backgroundColor: theme.colors.primary,
            padding: 16,
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Yes, Logout
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            backgroundColor: theme.colors.card,
            padding: 16,
            borderRadius: 12,
            alignItems: "center",
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          <Text style={{ color: theme.colors.text, fontWeight: "600" }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
