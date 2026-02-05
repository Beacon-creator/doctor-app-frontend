import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useTheme } from "../src/styles/ThemeContext";

export default function PaymentSuccess() {
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
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
          color: theme.colors.text,
        }}
      >
        Payment Successful!
      </Text>

      <Text
        style={{
          fontSize: 16,
          color: theme.colors.text,
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        You have successfully paid Dr. Jane Doe.
      </Text>

      <TouchableOpacity
        style={{
          width: "100%",
          padding: 15,
          borderRadius: 8,
          backgroundColor: theme.colors.primary,
          alignItems: "center",
        }}
        onPress={() => router.push("/(tabs)")} // go to homepage
      >
        <Text
          style={{
            color: theme.colors.background,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Go to Home
        </Text>
      </TouchableOpacity>
    </View>
  );
}
