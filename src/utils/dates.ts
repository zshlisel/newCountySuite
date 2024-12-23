import { setHours, setMinutes, isWithinInterval } from 'date-fns';
import { Reservation } from '../types';

export const CHECK_IN_TIME = 15; // 3 PM
export const CHECK_OUT_TIME = 11; // 11 AM

export function setTimeToCheckIn(date: Date): Date {
  return setHours(setMinutes(date, 0), CHECK_IN_TIME);
}

export function setTimeToCheckOut(date: Date): Date {
  return setHours(setMinutes(date, 0), CHECK_OUT_TIME);
}

export function isDateBooked(date: Date, reservations: Reservation[]): boolean {
  const confirmedReservations = reservations.filter(r => r.status === 'confirmed');
  
  return confirmedReservations.some(reservation => {
    const checkIn = setTimeToCheckIn(new Date(reservation.startDate.seconds *1000));
    const checkOut = setTimeToCheckOut(new Date(reservation.endDate.seconds *1000));
    
    return isWithinInterval(date, { start: checkIn, end: checkOut });
  });
}

