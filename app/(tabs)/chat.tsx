import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../../src/styles/ThemeContext";

export default function ChatScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  // mock conversations
  const chats = [
    {
      id: "1",
      doctor: "Dr. Sarah Johnson",
      message: "How are you feeling today?",
      time: "2m",
      unread: true,
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: "2",
      doctor: "Dr. Michael Lee",
      message: "Remember to take your medication.",
      time: "1h",
      unread: false,
      avatar: "https://i.pravatar.cc/150?img=32",
    },
  ];

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() =>
      router.push({
      pathname: "/chat/[id]",
      params: { id: item.id },
      })}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: theme.colors.border,
      }}
    >
      <Image
        source={{ uri: item.avatar }}
        style={{
          width: 52,
          height: 52,
          borderRadius: 26,
          marginRight: 12,
        }}
      />

      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontWeight: item.unread ? "bold" : "500",
            fontSize: 16,
            color: theme.colors.text,
          }}
        >
          {item.doctor}
        </Text>

        <Text
          numberOfLines={1}
          style={{
            marginTop: 4,
            color: theme.colors.muted,
          }}
        >
          {item.message}
        </Text>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <Text
          style={{
            fontSize: 12,
            color: theme.colors.muted,
          }}
        >
          {item.time}
        </Text>

        {item.unread && (
          <View
            style={{
              marginTop: 6,
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: theme.colors.primary,
            }}
          />
        )}
      </View>
    </TouchableOpacity>
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
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 16,
          color: theme.colors.text,
        }}
      >
        Chats
      </Text>

      <FlatList
        data={chats}
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
            No conversations yet
          </Text>
        }
      />
    </View>
  );
}
