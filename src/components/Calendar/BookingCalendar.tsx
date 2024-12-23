import { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Reservation } from '../../types';
import { setTimeToCheckIn, setTimeToCheckOut } from '../../utils/dates';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface BookingEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export default function BookingCalendar() {
  const [events, setEvents] = useState<BookingEvent[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'reservations'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const bookingEvents: BookingEvent[] = [];
      querySnapshot.forEach((doc) => {
        const reservation = { id: doc.id, ...doc.data() } as Reservation;
        bookingEvents.push({
          id: reservation.id!,
          title: `${reservation.guestName} (${reservation.status})`,
          start: setTimeToCheckIn(new Date(reservation.startDate.seconds *1000)),
          end: setTimeToCheckOut(new Date(reservation.endDate.seconds *1000)),
          status: reservation.status,
        });
      });
      setEvents(bookingEvents);
    });

    return () => unsubscribe();
  }, []);

  const eventStyleGetter = (event: BookingEvent) => {
    let backgroundColor = '#3B82F6'; // blue-500 for confirmed
    if (event.status === 'pending') {
      backgroundColor = '#F59E0B'; // yellow-500
    } else if (event.status === 'cancelled') {
      backgroundColor = '#EF4444'; // red-500
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
      },
    };
  };

  return (
    <div className="h-[600px] bg-white p-4 rounded-lg shadow">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        views={['month', 'week', 'day']}
      />
    </div>
  );
}