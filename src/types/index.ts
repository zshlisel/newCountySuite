import { Timestamp } from 'firebase/firestore';

export interface Apartment {
  id: string;
  title: string;
  description: string;
  amenities: string[];
  images: string[];
  price: number;
  pricePerWeekend: number;
  price3plus: string;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  address: string;
}

export interface Reservation {
  id?: string;
  startDate: Timestamp;
  endDate: Timestamp;
  seconds: Timestamp;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}