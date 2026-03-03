import api from "./client";

export async function createAppointment(payload: {
  doctorId: string;
  date: string;  
  time: string;  
}) {

  const res = await api.post("users/appointments", payload);

  return res.data;
}

export const fetchAppointments = async () => {
  const res = await api.get("users/appointments");
  return res.data;
};

export const confirmAppointmentStatus = async (appointmentId: string) => {
    const res = await api.patch(`/users/appointments/${appointmentId}/confirm`);
    return res.data;
}