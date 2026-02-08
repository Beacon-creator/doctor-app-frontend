import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../src/styles/ThemeContext";
import { useState } from "react";

type Card = {
  id: string;
  brand: "visa" | "mastercard";
  last4: string;
  default?: boolean;
};

export default function PaymentMethodScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  // mock saved cards
  const [cards] = useState<Card[]>([
    { id: "1", brand: "visa", last4: "4242", default: true },
    { id: "2", brand: "mastercard", last4: "1122" },
  ]);

  const brandIcon = (brand: string) => {
    switch (brand) {
      case "visa":
        return "#1A1F71";
      case "mastercard":
        return "#EB001B";
      default:
        return theme.colors.text;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: 50,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          marginBottom: 16,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginLeft: 12,
            color: theme.colors.text,
          }}
        >
          Payment Methods
        </Text>
      </View>

      {/* Scrollable cards */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {cards.map(card => (
          <View
            key={card.id}
            style={{
              backgroundColor: theme.colors.card,
              padding: 16,
              borderRadius: 12,
              marginBottom: 12,
              borderWidth: card.default ? 2 : 1,
              borderColor: card.default
                ? theme.colors.primary
                : theme.colors.border,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="card-outline"
                size={24}
                color={brandIcon(card.brand)}
                style={{ marginRight: 10 }}
              />

              <View>
                <Text
                  style={{
                    color: theme.colors.text,
                    fontWeight: "bold",
                  }}
                >
                  •••• {card.last4}
                </Text>

                {card.default && (
                  <Text
                    style={{
                      color: theme.colors.primary,
                      fontSize: 12,
                    }}
                  >
                    Default
                  </Text>
                )}
              </View>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.muted}
            />
          </View>
        ))}

        {/* Add new card */}
        <TouchableOpacity
          onPress={() => console.log("Add new card")}
          style={{
            marginTop: 20,
            padding: 16,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: theme.colors.primary,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: theme.colors.primary,
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            + Add Payment Method
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
