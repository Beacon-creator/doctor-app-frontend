import { View, Text, TouchableOpacity, Switch, ScrollView, ViewStyle, TextStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../src/styles/ThemeContext";
import { useState } from "react";

export default function SettingsScreen() {
  const { theme, toggleTheme, darkMode } = useTheme();
  const router = useRouter();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: 50,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          marginBottom: 16,
        }}
      >
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
          Settings
        </Text>
      </View>

      {/* Settings list */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Theme toggle */}
        <View style={rowStyle(theme)}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name={darkMode ? "moon" : "sunny"}
              size={22}
              color={theme.colors.primary}
              style={{ marginRight: 12 }}
            />
            <Text style={textStyle(theme)}>Dark Mode</Text>
          </View>

          <Switch
            value={darkMode}
            onValueChange={toggleTheme}
            thumbColor={theme.colors.primary}
          />
        </View>

        {/* Notifications */}
        <View style={rowStyle(theme)}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="notifications-outline"
              size={22}
              color={theme.colors.primary}
              style={{ marginRight: 12 }}
            />
            <Text style={textStyle(theme)}>Notifications</Text>
          </View>

          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            thumbColor={theme.colors.primary}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const rowStyle = (theme: any): ViewStyle => ({
  backgroundColor: theme.colors.card,
  padding: 16,
  borderRadius: 12,
  marginBottom: 12,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

const textStyle = (theme: any): TextStyle => ({
  fontSize: 16,
  fontWeight: "600", 
  color: theme.colors.text,
});
