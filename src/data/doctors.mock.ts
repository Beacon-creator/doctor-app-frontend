import { Doctor } from "./doctor.types";

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Williams",
    specialty: "Cardiologist",
    category: "Cardiology",
    rating: 4.8,
    price: 120,
    bio: "Experienced heart specialist focused on preventive care and long-term health.",

    image: "https://i.pravatar.cc/300?img=5",

    workingHours: ["09:00", "10:00", "11:00", "13:00"],
    availableDates: ["2026-02-10", "2026-02-11", "2026-02-14"],
  },

  {
    id: "2",
    name: "Dr. James Carter",
    specialty: "Dermatologist",
    category: "Dermetology",
    rating: 4.6,
    price: 90,
    bio: "Skin care expert helping patients achieve long-lasting skin health.",

    image: "https://i.pravatar.cc/300?img=8",

    workingHours: ["10:00", "11:00", "14:00", "15:00"],
    availableDates: ["2026-02-12", "2026-02-13"],
  },

  {
    id: "3",
    name: "Dr. Emily Chen",
    specialty: "Pediatrician",
    category: "Pediatry",
    rating: 4.9,
    price: 100,
    bio: "Dedicated child healthcare professional with a caring approach.",

    image: "https://i.pravatar.cc/300?img=9",

    workingHours: ["08:00", "09:00", "10:00"],
    availableDates: ["2026-02-10", "2026-02-15"],
  },
];
