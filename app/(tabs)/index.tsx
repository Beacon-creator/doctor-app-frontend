import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../src/styles/ThemeContext";
import HomeHeader from "../../src/components/home/HomeHeader";
import SearchBar from "../../src/components/home/SearchBar";
import CarouselCard from "../../src/components/home/CarouselCard";
import CategoryCard from "../../src/components/home/CategoryCard";
import DoctorCard from "../../src/components/home/DoctorCard";

import { doctors } from "@/src/data/doctors.mock";

import { useRouter } from "expo-router";
import { useState } from "react";

const categories = [
  "Cardiology",
  "Gynecology",
  "Dental",
  "Neurology",
  "Pediatrics",
  "Dermatology",
  "Orthopedics",
  "General Medicine",
  "Psychiatry",
];

export default function HomeScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter doctors based on search query
  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <HomeHeader />

      {/* Search */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search a Doctor"
        showVoiceIcon
      />

      {/* Carousel */}
      <View style={{ height: 160, marginTop: 10 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {[1, 2, 3, 4].map((i) => (
            <CarouselCard key={i} />
          ))}
        </ScrollView>
      </View>

      {/* Categories */}
      <Text style={{ color: theme.colors.text, fontSize: 18, margin: 16 }}>
        Categories
      </Text>

      <View style={{ height: 100 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((cat) => (
            <CategoryCard
              key={cat}
              title={cat}
              onPress={() => router.push(`/doctors?category=${cat}`)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Doctors */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 16,
          marginTop: 16,
          alignItems: "center",
        }}
      >
        <Text style={{ color: theme.colors.text, fontSize: 18, marginTop: 15 }}>
          All Doctors
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/doctors")}
          style={{ padding: 8, borderRadius: 12, alignItems: "center" }}
        >
          <Text style={{ color: theme.colors.primary, fontSize: 15 }}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable doctor list */}
      <View style={{ flex: 1, marginTop: 10 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        >
          {filteredDoctors.slice(0, 5).map((doc) => (
            <DoctorCard
              key={doc.id}
              doctor={doc}
              onPress={() => router.push(`/appointment/${doc.id}`)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
