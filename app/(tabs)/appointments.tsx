import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useTheme } from "../../src/styles/ThemeContext";
import { confirmAppointmentStatus, fetchAppointments } from "../../src/api/appointment";


export default function AppointmentsScreen() {
  const { theme } = useTheme();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const data = await fetchAppointments();
      console.log("Appointments:", data);
      setAppointments(data);
    } catch (e) {
      console.log("Fetch appointments error:", e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading appointments...</Text>
      </View>
    );
  }

  return (
    <View
           style={{
             flex: 1,
             backgroundColor: theme.colors.background,
             paddingHorizontal: 16,
             paddingTop: 50,
           }}
         >
           <Text
             style={{
               fontSize: 22,
               fontWeight: "bold",
               marginBottom: 16,
               color: theme.colors.text,
             }}
           >
             Appointments
           </Text>

      {appointments.length === 0 && (
        <Text>No appointments yet</Text>
      )}

      {appointments.map((appt: any) => {
          const dateObj = new Date(appt.date);

          return (
            <ScrollView
              key={appt.id}
              style={{
                backgroundColor: theme.colors.card,
                padding: 16,
                borderRadius: 12,
                marginBottom: 12,
              }}
            >
              <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
                {appt.doctor?.user?.fullName || "Doctor"}
              </Text>

              <Text style={{ color: theme.colors.text }}>
                {new Date(appt.date).toLocaleDateString()} • {appt.time}
              </Text>


              <Text style={{ marginTop: 6, color: theme.colors.primary }}>
                Status: {appt.status}
              </Text>

             {appt.status === "PENDING" && (
              <TouchableOpacity
                onPress={async () => {
                  try {
                    await confirmAppointmentStatus(appt.id);
                    await loadAppointments(); // ensure refresh
                  } catch (e) {
                    console.log("Confirm error:", e);
                  }
                }}
                style={{
                  backgroundColor: theme.colors.primary,
                  padding: 8,
                  borderRadius: 8,
                  marginTop: 10,
                  width: 100,
                }}
              >
                <Text style={{ color: theme.colors.text, fontWeight: "600" }}>Confirm</Text>
              </TouchableOpacity>
            )}

            </ScrollView>
          );
        })}

    </View>
  );
}
