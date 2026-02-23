import api from "./client";

export async function createAppointment(payload: {
  doctorId: string;
  date: string;  
  time: string;  
}) {
  console.log("Creating appointment:", payload);

  const res = await api.post("users/appointments", payload);

  console.log("Appointment response:", res.data);

  return res.data;
}

export const fetchAppointments = async () => {
  const res = await api.get("users/appointments");
  console.log("appointment get", res.data);
  return res.data;
};

export const confirmAppointmentStatus = async (appointmentId: string) => {
    const res = await api.patch(`/users/appointments/${appointmentId}/confirm`);
    return res.data;
}