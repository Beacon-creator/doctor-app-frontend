import { View, Text, Image, FlatList } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useEffect, useState, useCallback } from "react";

import ProfileListItem from "@/src/components/profile/ProfileListItem";
import { useTheme } from "../../src/styles/ThemeContext";
import { fetchMe } from "@/src/api/user";

import { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";

type IconName = ComponentProps<typeof Ionicons>["name"];

export default function ProfileScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMe();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadMe();
    }, [])
  );

  const loadMe = async () => {
    try {
      const data = await fetchMe();
      setUser(data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const menu: {
    id: string;
    title: string;
    icon: IconName;
    route?: string;
    action?: string;
  }[] = [
    { id: "history", title: "History", icon: "time-outline", route: "/profile/history" },
    { id: "details", title: "Personal Details", icon: "person-outline", route: "/profile/personal-details" },
    { id: "settings", title: "Settings", icon: "settings-outline", route: "/profile/settings" },
    { id: "logout", title: "Logout", icon: "log-out-outline", action: "logout" },
  ];

  const handlePress = (item: any) => {
    if (item.action === "logout") {
      router.push("/profile/logout");
    } else {
      router.push(item.route);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: theme.colors.text }}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background, paddingTop: 60 }}>
      {/* Profile header */}
      <View style={{ alignItems: "center", marginBottom: 24 }}>
        <Image
          source={{ uri: user?.avatarUrl || "https://i.pravatar.cc/200" }}
          style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 12 }}
        />

        <Text style={{ fontSize: 20, fontWeight: "bold", color: theme.colors.text }}>
          {user?.fullName || "User"}
        </Text>
      </View>

      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <ProfileListItem
            title={item.title}
            icon={item.icon}
            onPress={() => handlePress(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
