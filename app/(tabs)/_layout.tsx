import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../src/styles/ThemeContext";
import React from "react";

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.tabmute,

        tabBarStyle: {
          elevation: 8,
          paddingInline: 10,
          paddingTop: 0,
          height: 60,
        },
      }}
    >
      {/* HOME */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />

      {/* CHAT */}
      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble-ellipses" size={22} color={color} />
          ),
        }}
      />

      {/* APPOINTMENTS */}
      <Tabs.Screen
        name="appointments"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar-outline" size={22} color={color} />
          ),
        }}
      />

      {/* PROFILE */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

