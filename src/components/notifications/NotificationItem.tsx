import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../styles/ThemeContext";

export default function NotificationItem({ item }: any) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.card,
        padding: 14,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: theme.colors.border,
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 12,
      }}
    >
      <Ionicons
        name={item.icon || "notifications-outline"}
        size={22}
        color={theme.colors.primary}
      />

      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontWeight: "bold",
            color: theme.colors.text,
            marginBottom: 4,
          }}
        >
          {item.title}
        </Text>

        <Text
          style={{
            color: theme.colors.muted,
            fontSize: 14,
            marginBottom: 6,
          }}
        >
          {item.message}
        </Text>

        <Text
          style={{
            fontSize: 12,
            color: theme.colors.muted,
          }}
        >
          {item.time}
        </Text>
      </View>
    </View>
  );
}
