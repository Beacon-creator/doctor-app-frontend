import { View, Text, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../src/styles/ThemeContext";

export default function PaymentSuccess() {
  const { theme } = useTheme();

  const params = useLocalSearchParams();

  const doctor = Array.isArray(params.doctor)
    ? params.doctor[0]
    : params.doctor;

  const date = Array.isArray(params.date)
    ? params.date[0]
    : params.date;

  const time = Array.isArray(params.time)
    ? params.time[0]
    : params.time;

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
          marginBottom: 10,
          textAlign: "center",
        }}
      >
        You have successfully paid {doctor ?? "your doctor"}.
      </Text>

      {date && time && (
        <Text
          style={{
            fontSize: 14,
            color: theme.colors.muted,
            marginBottom: 30,
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
