import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../src/styles/ThemeContext";
import HomeHeader from "../../src/components/home/HomeHeader";
import SearchBar from "../../src/components/home/SearchBar";
import CarouselCard from "../../src/components/home/CarouselCard";
import CategoryCard from "../../src/components/home/CategoryCard";
import DoctorCard from "../../src/components/home/DoctorCard";
import { fetchDoctors, fetchDoctorById } from "@/src/api/doctor";
import { fetchNotifications } from "@/src/api/notifications";
import { useRouter, useFocusEffect } from "expo-router";
import { useState, useEffect, useCallback } from "react";

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
  const [doctorId, setDoctorId] = useState<string | null>(null);
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

 
  const [doctors, setDoctors] = useState<any[]>([]);


  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    loadDoctors();
    loadUnreadNotifications();
  }, []);


  useFocusEffect(
    useCallback(() => {
      loadUnreadNotifications();
    }, [])
  );

  const loadUnreadNotifications = async () => {
  try {
    const notifications = await fetchNotifications();
    const unread = notifications.filter((n: any) => !n.isRead).length;
    setUnreadCount(unread);
  } catch (e) {
    console.log("Notification fetch error:", e);
    setUnreadCount(0); 
  }
};

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const data = await fetchDoctors();

  
      const mapped = data.map((d) => ({
        id: d.id,
        name: d.user?.fullName,
        specialty: d.specialty,
        rating: d.rating,
        image: d.pictureUrl,
        price: d.price,
      }));

      setDoctors(mapped);
    } catch (e) {
      console.log("Doctors fetch error:", e);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (doctorId) loadDoctor();
  }, [doctorId]);

  const loadDoctor = async () => {
    try {
      console.log("Loading payment doctor:", doctorId);
      setLoading(true);
      const data = await fetchDoctorById(doctorId as string);
      console.log("Payment doctor:", data);
      setDoctor(data);
    } catch (e) {
      console.log("Doctor fetch error:", e);
      setDoctor(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 0, backgroundColor: theme.colors.background }}>
     
      <HomeHeader unreadCount={unreadCount} />
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search a Doctor"
        showVoiceIcon
      />

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

      <Text style={{ color: theme.colors.text, fontSize: 18, margin: 16 }}>
        Categories
      </Text>

      <View style={{ height: 50 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((cat) => (
            <CategoryCard
              key={cat}
              title={cat}
              onPress={() => router.push(`/doctors?category=${cat}`)}
            />
          ))}
        </ScrollView>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 16,
          marginTop: 16,
          alignItems: "center",
        }}
      >
        <Text style={{ color: theme.colors.text, fontSize: 18, marginTop: 25 }}>
          All Doctors
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/doctors")}
          style={{ padding: 8, borderRadius: 12, marginTop: 25, alignItems: "center" }}
        >
          <Text style={{ color: theme.colors.primary, fontSize: 18 }}>
            See All
          </Text>
        </TouchableOpacity>
      </View>

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
