import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useTheme } from "../src/styles/ThemeContext";
import { useLocalSearchParams } from "expo-router";
import { doctors } from "@/src/data/doctors.mock";

export default function PaymentScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardType, setCardType] = useState<"visa" | "mastercard" | "verve" | "amex" | null>(null);

  const { doctorId, date, time } = useLocalSearchParams();

  const doctor = doctors.find(d => d.id === doctorId);

  if (!doctor) return null;

  const doctorName = doctor.name;
  const amount = doctor.price;

  const formatCardNumber = (text: string) => {
  const cleaned = text.replace(/\D/g, "").slice(0, 16);


  // Detect card type
  if (/^4/.test(cleaned)) setCardType("visa");
  else if (/^5[1-5]/.test(cleaned)) setCardType("mastercard");
  else if (/^(506|507|650)/.test(cleaned)) setCardType("verve");
  else if (/^3[47]/.test(cleaned)) setCardType("amex");
  else setCardType(null);

  const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || "";
  setCardNumber(formatted);
};

  // Format expiry MM/YY
  const formatExpiry = (text: string) => {
    const cleaned = text.replace(/\D/g, "").slice(0, 4);
    if (cleaned.length >= 3) {
      setExpiry(`${cleaned.slice(0, 2)}/${cleaned.slice(2)}`);
    } else {
      setExpiry(cleaned);
    }
  };

  const handlePay = () => {
   router.push({
    pathname: "/payment-success",
    params: { doctor: doctor.name, date, time },
});

  };

  const isValid = name && cardNumber.length === 19 && expiry.length === 5 && cvv.length >= 3;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, paddingTop: 50 }}
    >
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 20 }}>
        <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
      </TouchableOpacity>

      <Text style={{ color: theme.colors.text, fontSize: 18 }}>Paying to</Text>
      <Text style={{ fontWeight: "bold", fontSize: 22, marginBottom: 20 }}>{doctorName}</Text>

      <Text style={{ color: theme.colors.text }}>Amount</Text>
      <Text style={{ fontWeight: "bold", fontSize: 48, color: theme.colors.primary, marginBottom: 30 }}>
        ${amount}
      </Text>
      <Text style={{ color: theme.colors.muted }}>
        {date} • {time}
      </Text>


      <View style={{ backgroundColor: theme.colors.card, padding: 16, borderRadius: 12 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 12 }}>Card Details</Text>

        <TextInput
          placeholder="Cardholder Name"
          value={name}
          onChangeText={setName}
          style={inputStyle(theme)}
        />

        <View style={{ position: "relative" }}>
            <TextInput
                placeholder="Card Number"
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={formatCardNumber}
                style={[inputStyle(theme), { paddingRight: 50 }]}
            />

        {cardType && (
            <View style={{ position: "absolute", right: 15, top: 14 }}>
            {cardType === "visa" && <Ionicons name="card-outline" size={24} color="#1A1F71" />}
            {cardType === "mastercard" && <Ionicons name="card-outline" size={24} color="#EB001B" />}
            {cardType === "verve" && <Ionicons name="card-outline" size={24} color="#0066B3" />}
            {cardType === "amex" && <Ionicons name="card-outline" size={24} color="#2E77BB" />}
            </View>
        )}
        </View>


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
            onChangeText={(t) => setCvv(t.replace(/\D/g, "").slice(0, 4))}
            style={[inputStyle(theme), { width: "48%" }]}
          />
        </View>
      </View>

      <TouchableOpacity
        disabled={!isValid}
        onPress={handlePay}
        style={{
          padding: 16,
          borderRadius: 12,
          alignItems: "center",
          marginTop: 30,
          backgroundColor: isValid ? theme.colors.primary : theme.colors.muted,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Pay Now</Text>
      </TouchableOpacity>
    </ScrollView>
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
