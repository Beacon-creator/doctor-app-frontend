export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  category: string;
  rating: number;
  price: string;
  bio: string;
  image: string;

  workingHours: string[];
  availableDates: string[];
};
