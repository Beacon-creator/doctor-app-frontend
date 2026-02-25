import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useTheme } from "../../src/styles/ThemeContext";
import { fetchMe, updateMe } from "../../src/api/user";

export default function PersonalDetailsScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const me = await fetchMe();
      setName(me.fullName || "");
      setEmail(me.email || "");
      setPhone(me.phone || "");
    } catch (e) {
      console.log("Profile fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await updateMe({
        fullName: name,
        email,
        phone,
      });
      router.back();
    } catch (e) {
      console.log("Update profile error:", e);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: theme.colors.text }}>Loading...</Text>
      </View>
    );
  }

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

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={labelStyle(theme)}>Full Name</Text>
        <TextInput value={name} onChangeText={setName} style={inputStyle(theme)} />

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
