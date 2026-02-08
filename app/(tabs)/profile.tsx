import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import ProfileListItem from "@/src/components/profile/ProfileListItem";
import { useTheme } from "../../src/styles/ThemeContext";

import { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";


export default function ProfileScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  // mock user — replace later with auth user
  const user = {
    name: "John Doe",
    avatar: "https://i.pravatar.cc/200",
  };

type IconName = ComponentProps<typeof Ionicons>["name"];


const menu: {
  id: string;
  title: string;
  icon: IconName;
  route?: string;
  action?: string;
}[] = [
  {
    id: "history",
    title: "History",
    icon: "time-outline",
    route: "/profile/history",
  },
  {
    id: "details",
    title: "Personal Details",
    icon: "person-outline",
    route: "/profile/details",
  },
  {
    id: "payment",
    title: "Payment Method",
    icon: "card-outline",
    route: "/profile/payment",
  },
  {
    id: "settings",
    title: "Settings",
    icon: "settings-outline",
    route: "/profile/settings",
  },
  {
    id: "logout",
    title: "Logout",
    icon: "log-out-outline",
    action: "logout",
  },
];


  const handlePress = (item: any) => {
    if (item.action === "logout") {
      router.push("/profile/logout");
    } else {
      router.push(item.route);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: 60,
      }}
    >
      {/* Profile header */}
      <View
        style={{
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Image
          source={{ uri: user.avatar }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            marginBottom: 12,
          }}
        />

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: theme.colors.text,
          }}
        >
          {user.name}
        </Text>
      </View>

      {/* Menu list */}
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
