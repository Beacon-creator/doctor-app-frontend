import { doctors } from "./doctors.mock";

export const doctorService = {
  getAll: () => doctors,

  getById: (id: string) =>
    doctors.find((doc) => doc.id === id),

  search: (query: string) =>
    doctors.filter((doc) =>
      doc.name.toLowerCase().includes(query.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(query.toLowerCase())
    ),

  filterByCategory: (category: string) =>
    doctors.filter(
      (doc) => doc.specialty.toLowerCase() === category.toLowerCase()
    ),
};
