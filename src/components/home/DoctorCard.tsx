import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../styles/ThemeContext";

export default function DoctorCard({ doctor }: any) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: theme.colors.card,
        marginHorizontal: 16,
        marginTop: 12,
        borderRadius: 16,
        padding: 12,
      }}
    >
      <Image
        source={{ uri: "https://i.pravatar.cc/150" }}
        style={{ width: 80, height: 80, borderRadius: 12 }}
      />

      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={{ color: theme.colors.text, fontWeight: "bold" }}>
          {doctor.name}
        </Text>

        <Text style={{ color: theme.colors.muted }}>
          {doctor.specialty}
        </Text>

        <Text
          style={{ color: theme.colors.muted, fontSize: 12 }}
          numberOfLines={2}
        >
          {doctor.about}
        </Text>

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}
        >
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={{ marginLeft: 4, color: theme.colors.text }}>
            {doctor.rating}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: theme.colors.primary,
          paddingHorizontal: 12,
          height: 30,
          borderRadius: 8,
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#fff" }}>Book</Text>
      </TouchableOpacity>
    </View>
  );
}
