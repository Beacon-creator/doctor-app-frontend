import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../src/styles/ThemeContext";

export default function HistoryScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  // mock history data — replace later with real data
  const history = [
    {
      id: "1",
      doctor: "Dr. Sarah Johnson",
      date: "Feb 12, 2026",
      time: "10:00",
      amount: "$45",
    },
    {
      id: "2",
      doctor: "Dr. Amina Bello",
      date: "Feb 20, 2026",
      time: "14:00",
      amount: "$60",
    },
  ];

  const renderItem = ({ item }: any) => (
    <View
      style={{
        backgroundColor: theme.colors.card,
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 16,
          color: theme.colors.text,
        }}
      >
        {item.doctor}
      </Text>

      <Text style={{ color: theme.colors.muted, marginTop: 4 }}>
        {item.date} • {item.time}
      </Text>

      <Text
        style={{
          marginTop: 8,
          color: theme.colors.primary,
          fontWeight: "600",
        }}
      >
        {item.amount}
      </Text>
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: 16,
        paddingTop: 50,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={theme.colors.text}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: theme.colors.text,
            marginLeft: 12,
          }}
        >
          Appointment History
        </Text>
      </View>

      {/* History List */}
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
