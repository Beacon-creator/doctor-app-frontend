import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useRef } from "react";

import { useTheme } from "../../src/styles/ThemeContext";

export default function ChatRoom() {
  const { theme } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const flatListRef = useRef<FlatList>(null);

  // mock doctor
  const doctor = {
    name: "Dr. Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=12",
  };

  const now = () =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello! How are you feeling today?",
      sender: "doctor",
      time: now(),
    },
    {
      id: "2",
      text: "Much better, thank you!",
      sender: "user",
      time: now(),
    },
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      time: now(),
    };

    setMessages(prev => [...prev, newMsg]);
    setInput("");

    // simulate doctor typing + reply
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "Thanks — I understand. Let’s monitor that.",
          sender: "doctor",
          time: now(),
        },
      ]);
    }, 1500);

    scrollToBottom();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderMessage = ({ item }: any) => {
    const isUser = item.sender === "user";

    return (
      <View
        style={{
          alignSelf: isUser ? "flex-end" : "flex-start",
          marginVertical: 6,
          maxWidth: "78%",
        }}
      >
        <View
          style={{
            backgroundColor: isUser
              ? theme.colors.primary
              : theme.colors.card,
            padding: 12,
            borderRadius: 16,
          }}
        >
          <Text
            style={{
              color: isUser ? "#fff" : theme.colors.text,
            }}
          >
            {item.text}
          </Text>
        </View>

        <Text
          style={{
            fontSize: 11,
            color: theme.colors.muted,
            marginTop: 4,
            alignSelf: isUser ? "flex-end" : "flex-start",
          }}
        >
          {item.time}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingTop: 50,
          paddingBottom: 12,
          borderBottomWidth: 1,
          borderColor: theme.colors.border,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>

        <Image
          source={{ uri: doctor.avatar }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            marginLeft: 12,
          }}
        />

        <Text
          style={{
            marginLeft: 10,
            fontWeight: "bold",
            fontSize: 16,
            color: theme.colors.text,
          }}
        >
          {doctor.name}
        </Text>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={scrollToBottom}
      />

      {/* Typing indicator */}
      {typing && (
        <Text
          style={{
            marginLeft: 20,
            marginBottom: 6,
            color: theme.colors.muted,
            fontSize: 12,
          }}
        >
          Doctor is typing…
        </Text>
      )}

      {/* Input */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 12,
          borderTopWidth: 1,
          borderColor: theme.colors.border,
        }}
      >
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          placeholderTextColor={theme.colors.muted}
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: 20,
            paddingHorizontal: 14,
            paddingVertical: 8,
            color: theme.colors.text,
            marginRight: 8,
          }}
        />

        <TouchableOpacity
          onPress={sendMessage}
          style={{
            backgroundColor: theme.colors.primary,
            padding: 10,
            borderRadius: 20,
          }}
        >
          <Ionicons name="send" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
