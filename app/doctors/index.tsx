import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../src/styles/ThemeContext";
import { useLocalSearchParams } from "expo-router";

import SearchInput from "../../src/components/home/SearchInput";
import DoctorCard from "../../src/components/home/DoctorCard";

import { doctors } from "@/src/data/doctors.mock";


export default function DoctorsScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { category } = useLocalSearchParams();
  const filteredDoctors = category
    ? doctors.filter(d => d.category === category)
    : doctors;


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
        {category ? `${category} Doctors` : "All Doctors"}
        </Text>
      </View>

      {/* Search */}
      <SearchInput placeholder="Search doctors..." />

      {/* Doctor List */}
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 16 }}
        renderItem={({ item }) => (
          <DoctorCard
            doctor={item}
            onPress={() => router.push(`/appointment/${item.id}`)}
          />

        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
