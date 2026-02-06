export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  category: string;
  rating: number;
  price: number;
  bio: string;
  image: string;

  workingHours: string[];
  availableDates: string[];
};
