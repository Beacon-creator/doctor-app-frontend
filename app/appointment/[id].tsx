import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";

import { useTheme } from "../../src/styles/ThemeContext";
import HorizontalSelector from "../../src/components/home/HorizontalSelector";

import { doctors } from "../../src/data/doctors.mock";

export default function AppointmentScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const [date, setDate] = useState("Mon 24");
  const [time, setTime] = useState("10:00");

  const params = useLocalSearchParams();
  const doctorId = Array.isArray(params.id) ? params.id[0] : params.id;

  const doctor = doctors.find((d) => d.id === doctorId);

  if (!doctor) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <Text style={{ color: theme.colors.text }}>
          Doctor not found
        </Text>
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
      {/* FIXED HEADER */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          marginBottom: 10,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginLeft: 12,
            color: theme.colors.text,
          }}
        >
          Appointment
        </Text>
      </View>

      {/* SCROLLABLE CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      >
        {/* Doctor Info */}
        <View style={{ alignItems: "center" }}>
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
          onPress={() =>
            router.push({
              pathname: "/doctors/date",
              params: { doctorId: doctor.id },
            })
          }
          theme={theme}
        />

        <HorizontalSelector
          data={doctor.availableDates}
          selected={date}
          onSelect={setDate}
        />

        {/* Time Section */}
        <SectionHeader
          title="Working Hours"
          onPress={() =>
            router.push({
              pathname: "/doctors/date",
              params: { doctorId: doctor.id },
            })
          }
          theme={theme}
        />

        <HorizontalSelector
          data={doctor.workingHours}
          selected={time}
          onSelect={setTime}
        />

        {/* Book Button */}
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/payment",
              params: {
                doctorId: doctor.id,
                doctorName: doctor.name,
                amount: doctor.price,
              },
            })
          }
          style={{
            backgroundColor: theme.colors.primary,
            padding: 16,
            borderRadius: 12,
            marginTop: 30,
            alignItems: "center",
          }}
        >
          <Text style={{ color: theme.colors.background, fontWeight: "bold" }}>
            Book Appointment
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

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
