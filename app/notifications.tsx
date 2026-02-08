import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../src/styles/ThemeContext";

import NotificationItem from "../src/components/notifications/NotificationItem";

const InitialNotifications = [
  {
    id: "1",
    title: "Appointment Confirmed",
    message: "Your session with Dr. Jane Doe is scheduled.",
    time: "2 min ago",
    icon: "calendar-outline",
    read: false,
  },
  {
    id: "2",
    title: "Payment Successful",
    message: "Your payment was processed successfully.",
    time: "1 hour ago",
    icon: "card-outline",
    read: true,
  },
  {
    id: "3",
    title: "Reminder",
    message: "You have an appointment tomorrow at 10:00.",
    time: "Yesterday",
    icon: "alarm-outline",
    read: false,
  },
];

export default function NotificationsScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: 16,
        paddingTop: 50,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={theme.colors.text}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: theme.colors.text,
            marginLeft: 12,
          }}
        >
          Notifications
        </Text>
      </View>

      {/* List */}
      <FlatList
        data={InitialNotifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationItem item={item} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text
            style={{
              textAlign: "center",
              marginTop: 40,
              color: theme.colors.muted,
            }}
          >
            No notifications yet
          </Text>
        }
      />
    </View>
  );
}
