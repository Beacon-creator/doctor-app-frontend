import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";

import HorizontalSelector from "../../src/components/home/HorizontalSelector";
import { useTheme } from "../../src/styles/ThemeContext";
import { fetchDoctorById } from "../../src/api/doctor";
import { useLocalSearchParams } from "expo-router";

export default function DateScreen() {
  console.log("DateScreen rendered with params:", useLocalSearchParams());
  console.log("Date Screen mounted with doctorId:", useLocalSearchParams().doctorId);
  const { theme } = useTheme();
  const router = useRouter();

  const [doctor, setDoctor] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("10:00");

  const { doctorId } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!doctorId) return;

    console.log("DATE SCREEN doctorId raw:", doctorId);

    loadDoctor();
  }, [doctorId]);

  const loadDoctor = async () => {
    try {
      setLoading(true);

      const id = Array.isArray(doctorId)
        ? doctorId[0]
        : doctorId;

      const data = await fetchDoctorById(id);

      setDoctor(data);
    } catch (e) {
      console.log("Doctor fetch error:", e);
      setError("Failed to load doctor");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading doctor...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red", fontSize: 16 }}>{error}</Text>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ marginTop: 20 }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }


  if (!doctor) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading doctor...</Text>
      </View>
    );
  }

  const availableDates = doctor.availableDates || [];

  const markedDates = availableDates.reduce((acc: any, date: string) => {
    acc[date] = {
      marked: true,
      dotColor: theme.colors.primary,
      selected: selectedDate === date,
      selectedColor: theme.colors.primary,
    };
    return acc;
  }, {});

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, paddingTop: 50 }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginVertical: 16,
          color: theme.colors.text,
        }}
      >
        Select Date & Time
      </Text>

      <Calendar
        markedDates={markedDates}
        onDayPress={(day) => {
          if (availableDates.includes(day.dateString)) {
            setSelectedDate(day.dateString);
          }
        }}
        theme={{
          backgroundColor: theme.colors.card,
          calendarBackground: theme.colors.card,
          dayTextColor: theme.colors.text,
          monthTextColor: theme.colors.text,
          arrowColor: theme.colors.primary,
          todayTextColor: theme.colors.primary,
        }}
        style={{
          borderRadius: 12,
          overflow: "hidden",
          marginBottom: 20,
        }}
      />

      <Text style={{ fontWeight: "bold", marginBottom: 10, color: theme.colors.text }}>
        Available Time
      </Text>

      <HorizontalSelector
        data={doctor.workingHours || []}
        selected={selectedTime}
        onSelect={setSelectedTime}
      />

      <TouchableOpacity
        disabled={!selectedDate}
        onPress={() =>
          router.push({
            pathname: "/payment",
            params: {
              doctorId: doctor.id,
              date: selectedDate,
              time: selectedTime,
            },
          })
        }
        style={{
          marginTop: 30,
          padding: 16,
          borderRadius: 12,
          alignItems: "center",
          backgroundColor: selectedDate
            ? theme.colors.primary
            : theme.colors.muted,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          Set Appointment
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
