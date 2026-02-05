import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";

import { useTheme } from "../../src/styles/ThemeContext";
import HorizontalSelector from "../../src/components/home/HorizontalSelector";

export default function AppointmentScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const [date, setDate] = useState("Mon 24");
  const [time, setTime] = useState("10:00");

  // mock doctor data
  const doctor = {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    price: "$45",
    bio: "Dr. Sarah Johnson is a leading cardiologist with over a decade of experience in treating complex heart conditions. She focuses on preventive care and patient education.",
    image: "https://i.pravatar.cc/200?img=12",
  };

  const dates = ["Mon 24", "Tue 25", "Wed 26", "Thu 27", "Fri 28"];
  const times = ["09:00", "10:00", "12:00", "14:00", "16:00"];

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
      contentContainerStyle={{ padding: 16, paddingTop: 50 }}
    >
      {/* Header */}
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
      </TouchableOpacity>

      {/* Doctor Info */}
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <Image
          source={{ uri: doctor.image }}
          style={{ width: 120, height: 120, borderRadius: 60 }}
        />

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: theme.colors.text,
            marginTop: 10,
          }}
        >
          {doctor.name}
        </Text>

        <Text style={{ color: theme.colors.primary }}>
          {doctor.specialty}
        </Text>

        <TouchableOpacity
          style={{ position: "absolute", right: 0, top: 10 }}
          onPress={() => router.push("/chat")}
        >
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={26}
            color={theme.colors.primary}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginTop: 6,
            color: theme.colors.text,
          }}
        >
          {doctor.price}
        </Text>
      </View>

      {/* Bio */}
      <Text
        style={{
          marginTop: 20,
          color: theme.colors.muted,
          lineHeight: 22,
        }}
      >
        {doctor.bio}
      </Text>

      {/* Date Section */}
      <SectionHeader
        title="Available Dates"
        onPress={() => router.push("/(tabs)/date")}
        theme={theme}
      />

      <HorizontalSelector
        data={dates}
        selected={date}
        onSelect={setDate}
      />

      {/* Time Section */}
      <SectionHeader
        title="Working Hours"
        onPress={() => router.push("/(tabs)/date")}
        theme={theme}
      />

      <HorizontalSelector
        data={times}
        selected={time}
        onSelect={setTime}
      />

      {/* Book Button */}
      <TouchableOpacity
        style={{
          backgroundColor: theme.colors.primary,
          padding: 16,
          borderRadius: 12,
          marginTop: 30,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          Book Appointment
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* small reusable header inside same file */
function SectionHeader({ title, onPress, theme }: any) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginBottom: 10,
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 16,
          color: theme.colors.text,
        }}
      >
        {title}
      </Text>

      <TouchableOpacity onPress={onPress}>
        <Text style={{ color: theme.colors.primary }}>See all</Text>
      </TouchableOpacity>
    </View>
  );
}
