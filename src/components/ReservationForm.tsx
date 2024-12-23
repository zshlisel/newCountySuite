import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Apartment } from '../types';
import toast from 'react-hot-toast';
import { addDays, setHours, setMinutes } from 'date-fns';

interface Props {
  apartment: Apartment;
  onClose: () => void;
}

export default function ReservationForm({ apartment, onClose }: Props) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [reservedDates, setReservedDates] = useState<{ startDate: Date; endDate: Date }[]>([]);

  const areDatesValid = (): boolean => {
    return !reservedDates.some(({ startDate: reservedStart, endDate: reservedEnd }) => {
      return (
        (startDate && endDate && startDate < reservedEnd && endDate > reservedStart)
      );
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      toast.error('Please select dates');
      return;
    }

    if (!areDatesValid()) {
      toast.error('Selected dates conflict with an existing reservation');
      return;
    }

    try {
      await addDoc(collection(db, 'reservations'), {
        apartmentId: apartment.id,
        startDate,
        endDate,
        guestName,
        guestEmail,
        guestPhone,
        status: 'pending',
        createdAt: new Date(),
      });

      toast.success('Reservation request submitted successfully!');
      onClose();
    } catch (error) {
      toast.error('Error submitting reservation');
    }
  };

  const fetchReservedDates = async (apartmentId: string): Promise<{ startDate: Date; endDate: Date }[]> => {
    const reservationQuery = query(
      collection(db, 'reservations'),
      where('apartmentId', '==', apartmentId),
      where('startDate', '>=', new Date())
    );

    const querySnapshot = await getDocs(reservationQuery);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        startDate: data.startDate.toDate(),
        endDate: data.endDate.toDate(),
      };
    });
  };

  useEffect(() => {
    const fetchDates = async () => {
      const dates = await fetchReservedDates(apartment.id);
      setReservedDates(dates)
    };

    fetchDates();
  }, []);

  const isStartDateExcluded = (date: Date): boolean => {
    const updatedDate = setHours(setMinutes(date, 0), 20)
    return reservedDates.some(({ startDate, endDate }) => {
      return updatedDate >= startDate && updatedDate <= endDate;
    });
  };

  const isEndDateExcluded = (date: Date): boolean => {
    const updatedDate = setHours(setMinutes(date, 0), 10)
    return reservedDates.some(({ startDate, endDate }) => {
      return updatedDate >= startDate && updatedDate <= endDate;
    });
  };

  const getMinDate = () => {
    const now = new Date();
    const cutoffTime = setHours(setMinutes(new Date(), 0), 15); // Today at 3 PM

    // If it's after 3 PM, set `minDate` to tomorrow
    return now > cutoffTime ? addDays(now, 1) : now;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Make a Reservation</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Check-in / Check-out</label>
            <div className="grid grid-cols-2 gap-4 mt-1">
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  if (date) {
                    const adjustedDate = setHours(setMinutes(date, 0), 15);
                    setStartDate(adjustedDate);
                  }
                }}
                selectsStart
                maxTime={setHours(setMinutes(new Date(), 0), 15)}
                startDate={startDate}
                endDate={endDate}
                minDate={getMinDate()}
                filterDate={(date) => !isStartDateExcluded(date)}
                //excludeDates={[addDays(new Date(), 1)]} //exclude dates
                className="w-full p-2 border rounded-md"
                placeholderText="Check-in date"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => {
                  if (date) {
                    const adjustedDate = setHours(setMinutes(date, 0), 11);
                    setEndDate(adjustedDate);
                  }
                }}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                filterDate={(date) => !isEndDateExcluded(date)}
                className="w-full p-2 border rounded-md"
                placeholderText="Check-out date"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              required
              className="mt-1 w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              required
              className="mt-1 w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              required
              pattern="\d{10}"
              title="Please enter a 10-digit phone number"
              className="mt-1 w-full p-2 border rounded-md"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit Reservation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}