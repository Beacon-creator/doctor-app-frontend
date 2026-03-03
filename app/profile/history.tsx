import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../src/styles/ThemeContext";
import { use, useEffect, useState } from "react";
import { fetchAppointments } from "@/src/api/appointment";



export default function HistoryScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await fetchAppointments();

      // Only past appointments
      const past = data.filter((a: any) => {
        return new Date(a.date) < new Date();
      });

      setHistory(past);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

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
        {item.doctor.user.fullName}
      </Text>

      <Text style={{ color: theme.colors.muted, marginTop: 4 }}>
        {new Date(item.date).toDateString()}
      </Text>

      <Text
        style={{
          marginTop: 8,
          color: theme.colors.primary,
          fontWeight: "600",
        }}
      >
        {item.doctor.price} USD
      </Text>

      <Text style={{ marginTop: 4, color: theme.colors.muted }}>
        {item.status}
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
      {!loading && history.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: theme.colors.muted }}>No past appointments</Text>
        </View>
      ) : (
        <>
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
        </>
      )}
    </View>
  );
}
