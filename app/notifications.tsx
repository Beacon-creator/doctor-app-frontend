import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";


import { useTheme } from "../src/styles/ThemeContext";

export default function NotificationsScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Appointment confirmed",
      message: "Your booking with Dr. Jane is confirmed.",
      time: "2m ago",
      read: false,
    },
    {
      id: "2",
      title: "Reminder",
      message: "Upcoming appointment tomorrow.",
      time: "1h ago",
      read: true,
    },
  ]);

  // unread counter
  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleRead = (id: string) => {
    setNotifications(prev =>
      prev.map(item =>
        item.id === id ? { ...item, read: !item.read } : item
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev =>
      prev.filter(item => item.id !== id)
    );
  };

  const markAllRead = () => {
    setNotifications(prev =>
      prev.map(item => ({ ...item, read: true }))
    );
  };

  const renderRightActions = (id: string) => (
    <TouchableOpacity
      onPress={() => deleteNotification(id)}
      style={{
        backgroundColor: "#ff4d4f",
        justifyContent: "center",
        alignItems: "center",
        width: 90,
        borderRadius: 12,
        marginBottom: 12,
      }}
    >
      <Ionicons name="trash" size={20} color="#fff" />
      <Text style={{ color: "#fff", fontWeight: "bold", marginTop: 4 }}>
        Delete
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: any) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <TouchableOpacity
        onPress={() => toggleRead(item.id)}
        style={{
          backgroundColor: item.read
            ? theme.colors.card
            : theme.colors.primary + "15",
          padding: 16,
          borderRadius: 12,
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            fontWeight: item.read ? "500" : "bold",
            color: theme.colors.text,
          }}
        >
          {item.title}
        </Text>

        <Text
          style={{
            color: theme.colors.muted,
            marginTop: 4,
          }}
        >
          {item.message}
        </Text>

        <Text
          style={{
            fontSize: 12,
            color: theme.colors.muted,
            marginTop: 6,
          }}
        >
          {item.time}
        </Text>
      </TouchableOpacity>
    </Swipeable>
  );

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
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
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
              marginLeft: 12,
              color: theme.colors.text,
            }}
          >
            Notifications
          </Text>

          {/* Badge */}
          {unreadCount > 0 && (
            <View
              style={{
                backgroundColor: theme.colors.primary,
                marginLeft: 8,
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 12,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 12 }}>
                {unreadCount}
              </Text>
            </View>
          )}
        </View>

        {/* Mark all read */}
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllRead}>
            <Text style={{ color: theme.colors.primary }}>
              Mark all read
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* List */}
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={renderItem}
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