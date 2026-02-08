import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTheme } from "../../src/styles/ThemeContext";

export default function PersonalDetailsScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  // mock user data — replace with real user store later
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@email.com");
  const [phone, setPhone] = useState("+234 800 000 0000");

  const handleSave = () => {
    console.log("Saved:", { name, email, phone });
    router.back();
  };

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
          Personal Details
        </Text>
      </View>

      {/* Scrollable content */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={labelStyle(theme)}>Full Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={inputStyle(theme)}
        />

        <Text style={labelStyle(theme)}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={inputStyle(theme)}
        />

        <Text style={labelStyle(theme)}>Phone</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={inputStyle(theme)}
        />

        {/* Save Button */}
        <TouchableOpacity
          onPress={handleSave}
          style={{
            marginTop: 24,
            padding: 16,
            borderRadius: 12,
            backgroundColor: theme.colors.primary,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            Save Changes
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const labelStyle = (theme: any) => ({
  color: theme.colors.muted,
  marginBottom: 6,
  marginTop: 12,
});

const inputStyle = (theme: any) => ({
  borderWidth: 1,
  borderColor: theme.colors.border,
  borderRadius: 8,
  padding: 12,
  color: theme.colors.text,
});
