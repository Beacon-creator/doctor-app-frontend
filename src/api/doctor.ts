import api from "./client";

export type BackendDoctor = {
  id: string;
  specialty: string;
  about: string;
  rating: number;
  pictureUrl?: string;
  user: {
    fullName: string;
    avatarUrl?: string;
  };
};

export async function fetchDoctors(): Promise<BackendDoctor[]> {
  const res = await api.get("/users/doctors");
  return res.data;
}

export const fetchDoctorById = async (id: string) => {
  const res = await api.get(`/users/doctors/${id}`);

  const d = res.data;

  // map backend → UI model
  return {
    id: d.id,
    name: d.user.fullName,
    specialty: d.specialty,
    rating: d.rating,
    image: d.pictureUrl,

    // TEMP mock scheduling data
    workingHours: [
      "09:00",
      "10:00",
      "11:00",
      "13:00",
      "15:00",
    ],

    availableDates: [
      "2026-02-15",
      "2026-02-16",
      "2026-02-18",
    ],
  };
};
