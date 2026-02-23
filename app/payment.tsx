import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";

import { useTheme } from "../src/styles/ThemeContext";
import { fetchDoctorById } from "../src/api/doctor";
import { createAppointment } from "../src/api/appointment";
import { useEffect } from "react";


export default function PaymentScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useLocalSearchParams();

  const doctorId = Array.isArray(params.doctorId)
    ? params.doctorId[0]
    : params.doctorId;

  const date = Array.isArray(params.date) ? params.date[0] : params.date;
  const time = Array.isArray(params.time) ? params.time[0] : params.time;

  const [doctor, setDoctor] = useState<any>(null);

  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardType, setCardType] = useState<
    "visa" | "mastercard" | "verve" | "amex" | null
  >(null);
  const isValid = name && cardNumber.length === 19 && expiry.length === 5 && cvv.length >= 3;


  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, "").slice(0, 16);

    if (/^4/.test(cleaned)) setCardType("visa");
    else if (/^5[1-5]/.test(cleaned)) setCardType("mastercard");
    else if (/^(506|507|650)/.test(cleaned)) setCardType("verve");
    else if (/^3[47]/.test(cleaned)) setCardType("amex");
    else setCardType(null);

    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || "";
    setCardNumber(formatted);
  };

  const formatExpiry = (text: string) => {
    const cleaned = text.replace(/\D/g, "").slice(0, 4);

    if (cleaned.length >= 3) {
      setExpiry(`${cleaned.slice(0, 2)}/${cleaned.slice(2)}`);
    } else {
      setExpiry(cleaned);
    }
  };


const handlePay = async () => {
  try {
    setLoading(true);

    const payload = {
      doctorId: doctor.id,
      date: doctor.availableDates?.includes(date)
        ? date
        : doctor.availableDates?.[0] || date,
      time: doctor.workingHours?.includes(time)
        ? time
        : doctor.workingHours?.[0] || time,
    };

    console.log("Creating appointment with:", payload);

    const result = await createAppointment(payload);

    console.log("Appointment created:", result);

    router.push({
      pathname: "/payment-success",
      params: {
        doctor: doctor.name,
        date: payload.date,
        time: payload.time,
      },
    });
  } catch (e) {
    console.log("Appointment error:", e);
    setError("Payment failed. Please try again.");
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


if (loading) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Loading payment info...</Text>
    </View>
  );
}

if (!doctor) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Payment data unavailable</Text>
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
      {loading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading payment info...</Text>
        </View>
      )}
      {/* HEADER */}
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
          Payment
        </Text>
      </View>

      {/* SCROLL CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      >
        <Text style={{ color: theme.colors.text, fontSize: 18 }}>
          Paying to
        </Text>

        <Text
          style={{
            fontWeight: "bold",
            fontSize: 22,
            marginBottom: 20,
          }}
        >
          {doctor.name}
        </Text>

        <Text style={{ color: theme.colors.text }}>Amount</Text>

        <Text
          style={{
            fontWeight: "bold",
            fontSize: 48,
            color: theme.colors.primary,
            marginBottom: 10,
          }}
        >
          ${doctor.price}
        </Text>

        {date && time && (
          <Text style={{ color: theme.colors.muted, marginBottom: 20 }}>
            {date} • {time}
          </Text>
        )}

        <View
          style={{
            backgroundColor: theme.colors.card,
            padding: 16,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              marginBottom: 12,
            }}
          >
            Card Details
          </Text>

          <TextInput
            placeholder="Cardholder Name"
            value={name}
            onChangeText={setName}
            style={inputStyle(theme)}
          />

          <TextInput
            placeholder="Card Number"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={formatCardNumber}
            style={inputStyle(theme)}
          />

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TextInput
              placeholder="MM/YY"
              keyboardType="numeric"
              value={expiry}
              onChangeText={formatExpiry}
              style={[inputStyle(theme), { width: "48%" }]}
            />

            <TextInput
              placeholder="CVV"
              keyboardType="numeric"
              secureTextEntry
              value={cvv}
              onChangeText={(t) =>
                setCvv(t.replace(/\D/g, "").slice(0, 4))
              }
              style={[inputStyle(theme), { width: "48%" }]}
            />
          </View>
        </View>

        <TouchableOpacity
          disabled={!isValid || loading}
          onPress={handlePay}
          style={{
            padding: 16,
            borderRadius: 12,
            alignItems: "center",
            marginTop: 30,
            backgroundColor: isValid
              ? theme.colors.primary
              : theme.colors.muted,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            {loading ? "Processing..." : "Pay"}
          </Text>
        </TouchableOpacity>
        {error && (
          <Text
            style={{
              color: "red",
              marginTop: 20,
              textAlign: "center",
            }}
          >
            {error}
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const inputStyle = (theme: any) => ({
  borderWidth: 1,
  borderColor: theme.colors.border,
  borderRadius: 8,
  padding: 12,
  marginBottom: 12,
  color: theme.colors.text,
});
