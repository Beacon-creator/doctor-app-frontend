import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import { useTheme } from "../src/styles/ThemeContext";
import {
  fetchNotifications,
  markNotificationRead,
  deleteNotification
} from "../src/api/notifications";

export default function NotificationsScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  useFocusEffect(
    useCallback(() => {
      loadNotifications();
    }, [])
  );

  useEffect(() => {
    loadNotifications();
  }, []);

const loadNotifications = async () => {
  try {
    const data = await fetchNotifications();
    setNotifications(
      data.map((n: any) => ({
        id: n.id,
        title: n.title,
        message: n.content,
        time: new Date(n.createdAt).toISOString(),
        read: n.isRead,
      }))
    );
  } catch (e) {
    console.log("Fetch notifications error:", e);
  } finally {
    setLoading(false);
  }
};


const unreadCount = notifications.filter(n => !n.isRead).length;

const toggleRead = async (id: string) => {

  setNotifications(prev =>
    prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
  );

  try {
    await markNotificationRead(id);
  } catch (e) {
    console.log("Failed to mark read:", e);
    // rollback in case of error
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: false } : n))
    );
  }
};


const removeNotification = async (id: string) => {
  await deleteNotification(id);
  loadNotifications();
};

const markAllRead = async () => {

  setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));

  const unread = notifications.filter(n => !n.isRead);
  for (const n of unread) {
    try {
      await markNotificationRead(n.id);
    } catch (e) {
      console.log("Failed to mark read:", e);
      
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === n.id ? { ...notif, isRead: false } : notif
        )
      );
    }
  }
};


const renderRightActions = (id: string) => (
  <TouchableOpacity
    onPress={() => removeNotification(id)}
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

  const renderItem = ({ item }: any) => {
    const time = new Date(item.time);


    return (
      <Swipeable renderRightActions={() => renderRightActions(item.id)}>
        <TouchableOpacity
          onPress={() => toggleRead(item.id)}
          style={{
            backgroundColor: item.isRead
              ? theme.colors.card
              : theme.colors.primary + "15",
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              fontWeight: item.isRead ? "500" : "bold",
              color: theme.colors.text,
            }}
          >
            {item.title}
          </Text>

          <Text style={{ color: theme.colors.muted, marginTop: 4 }}>
            {item.content}
          </Text>

          <Text style={{ fontSize: 12, color: theme.colors.muted, marginTop: 6 }}>
            {time.toLocaleDateString()} {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: theme.colors.text }}>Loading notifications...</Text>
      </View>
    );
  }

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
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
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

        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllRead}>
            <Text style={{ color: theme.colors.primary }}>
              Mark all read
            </Text>
          </TouchableOpacity>
        )}
      </View>

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
