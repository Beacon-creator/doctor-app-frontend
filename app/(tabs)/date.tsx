import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Calendar } from "react-native-calendars";

import { useTheme } from "../../src/styles/ThemeContext";
import HorizontalSelector from "../../src/components/home/HorizontalSelector";

export default function DateScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("10:00");

  // mock available dates
  const availableDates = [
    "2026-02-10",
    "2026-02-12",
    "2026-02-15",
    "2026-02-20",
  ];

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

  // hourly time slots
  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
  ];

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
        data={timeSlots}
        selected={selectedTime}
        onSelect={setSelectedTime}
      />

      {/* Button */}
      <TouchableOpacity
        disabled={!selectedDate}
        onPress={() => router.push("/payment")}
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
