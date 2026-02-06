import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useTheme } from "../src/styles/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";


export default function PaymentSuccess() {
  const { theme } = useTheme();
  const { doctor, date, time } = useLocalSearchParams();


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
      {/* BIG SUCCESS ICON */}
      <Ionicons
        name="checkmark-circle"
        size={120}
        color={theme.colors.primary}
        style={{ marginBottom: 20 }}
      />

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
        You have successfully paid {doctor}.
      </Text>

      {date && time && (
      <Text
        style={{
            fontSize: 14,
            color: theme.colors.muted,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
        Appointment: {date} • {time}
      </Text>
      )}


      <TouchableOpacity
        style={{
          width: "100%",
          padding: 15,
          borderRadius: 8,
          backgroundColor: theme.colors.primary,
          alignItems: "center",
        }}
        onPress={() => router.push("/(tabs)")}
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
