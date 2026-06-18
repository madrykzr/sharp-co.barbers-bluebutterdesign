export interface CutStyle {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  image: string;
  tagline: string;
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  avatar: string;
  bio: string;
}

export interface Product {
  id: string;
  name: string;
  category: "pomade" | "beard" | "aftershave" | "grooming";
  price: number;
  description: string;
  image: string;
  rating: number;
  size: string;
}

export type ActiveView = 'home' | 'cuts' | 'book' | 'shop' | 'about' | 'visit';

export interface BookingState {
  step: number;
  selectedCut: CutStyle | null;
  selectedBarber: Barber | null;
  selectedDate: string; // YYYY-MM-DD
  selectedTimeSlot: string; // e.g. "10:30 AM"
  customerName: string;
  customerPhone: string;
  customerNote: string;
}
