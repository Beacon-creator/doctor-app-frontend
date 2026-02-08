import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../styles/ThemeContext";

export default function HomeHeader() {
  const { theme } = useTheme();
  const router = useRouter();

  // mock unread notifications count
  const unreadCount = 3;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 50,
        marginBottom: 12,
      }}
    >
      {/* Left — profile + greeting */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150" }}
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            marginRight: 12,
          }}
        />

        <View>
          <Text style={{ color: theme.colors.muted, fontSize: 13 }}>
            Welcome back
          </Text>

          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: theme.colors.text,
            }}
          >
            Telehealth User
          </Text>
        </View>
      </View>

      {/* Right — notification icon */}
      <TouchableOpacity
        onPress={() => router.push("/notifications")}
        style={{ padding: 6 }}
      >
        <Ionicons
          name="notifications-outline"
          size={24}
          color={theme.colors.text}
        />

        {/* badge */}
        {unreadCount > 0 && (
          <View
            style={{
              position: "absolute",
              right: -2,
              top: -2,
              backgroundColor: theme.colors.primary,
              borderRadius: 10,
              minWidth: 18,
              height: 18,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 4,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 10,
                fontWeight: "bold",
              }}
            >
              {unreadCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
