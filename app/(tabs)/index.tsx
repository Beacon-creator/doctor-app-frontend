import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../src/styles/ThemeContext";

import HomeHeader from "../../src/components/home/HomeHeader";
import SearchBar from "../../src/components/home/SearchBar";
import CarouselCard from "../../src/components/home/CarouselCard";
import CategoryCard from "../../src/components/home/CategoryCard";
import DoctorCard from "../../src/components/home/DoctorCard";

import { doctors } from "@/src/data/doctors.mock";


import { useRouter } from "expo-router";

const categories = ["Cardiology", "Dental", "Neurology", "Skin", "Pediatrics"];


export default function HomeScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      showsVerticalScrollIndicator={false}
    >
      <HomeHeader />

      <SearchBar />

      {/* Carousel */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[1, 2, 3, 4].map((i) => (
          <CarouselCard key={i} />
        ))}
      </ScrollView>

      {/* Categories */}
      <Text style={{ color: theme.colors.text, fontSize: 18, margin: 16 }}>
        Categories
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((cat) => (
          <CategoryCard key={cat} title={cat} />
        ))}
      </ScrollView>

      {/* Doctors */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 16,
          marginTop: 16,
        }}
      >
        <Text style={{ color: theme.colors.text, fontSize: 18, marginTop: 15 }}>
          All Doctors
        </Text>

        <TouchableOpacity
        onPress={() => router.push("/doctors")}
        style={{
          padding: 16,
          borderRadius: 12,
          alignItems: "center",
        }}>
          <Text style={{ color: theme.colors.primary, fontSize: 15 }}>See All</Text>
        </TouchableOpacity>
      </View>

      {doctors.map((doc) => (
        <DoctorCard
          key={doc.id}
          doctor={doc}
          onPress={() => router.push(`/appointment/${doc.id}`)}
        />

      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
