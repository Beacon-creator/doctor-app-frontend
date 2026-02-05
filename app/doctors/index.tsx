import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../src/styles/ThemeContext";

import SearchInput from "../../src/components/home/SearchInput";
import DoctorCard from "../../src/components/home/DoctorCard";

export default function DoctorsScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  // temporary mock data
  const doctors = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      rating: 4.8,
      bio: "Heart specialist with 10+ years experience.",
      image: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: "2",
      name: "Dr. Michael Lee",
      specialty: "Dermatologist",
      rating: 4.6,
      bio: "Skin care expert and consultant.",
      image: "https://i.pravatar.cc/150?img=32",
    },
    {
      id: "3",
      name: "Dr. Aisha Bello",
      specialty: "Pediatrician",
      rating: 4.9,
      bio: "Child healthcare specialist.",
      image: "https://i.pravatar.cc/150?img=5",
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: 16,
        paddingTop: 50,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={theme.colors.text}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: theme.colors.text,
            marginLeft: 12,
          }}
        >
          All Doctors
        </Text>
      </View>

      {/* Search */}
      <SearchInput placeholder="Search doctors..." />

      {/* Doctor List */}
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 16 }}
        renderItem={({ item }) => (
          <DoctorCard doctor={item} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
