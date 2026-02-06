import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";

import HorizontalSelector from "../../src/components/home/HorizontalSelector";
import { useTheme } from "../../src/styles/ThemeContext";

import { useLocalSearchParams } from "expo-router";
import { doctors } from "../../src/data/doctors.mock";

export default function DateScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("10:00");

  const { doctorId } = useLocalSearchParams();
  const doctor = doctors.find((d) => d.id === doctorId);

  if (!doctor) return null;

  const availableDates = doctor.availableDates || [];

  // mark available + selected
  const markedDates = availableDates.reduce((acc: any, date) => {
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
      {/* Header */}
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

      {/* Calendar */}
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

      {/* Time Slots */}
      <Text
        style={{
          fontWeight: "bold",
          marginBottom: 10,
          color: theme.colors.text,
        }}
      >
        Available Time
      </Text>

      <HorizontalSelector
        data={doctor.workingHours}
        selected={selectedTime}
        onSelect={setSelectedTime}
      />

      {/* Button */}
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
