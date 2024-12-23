import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Reservation } from '../../types';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function ReservationList() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'reservations'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reservationsData: Reservation[] = [];
      querySnapshot.forEach((doc) => {
        reservationsData.push({ id: doc.id, ...doc.data() } as Reservation);
      });
      setReservations(reservationsData.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    });

    return () => unsubscribe();
  }, []);


  const updateReservationStatus = async (id: string, status: 'confirmed' | 'cancelled') => {
    try {
      await updateDoc(doc(db, 'reservations', id), { status });
      toast.success(`Reservation ${status} successfully`);
    } catch (error) {
      toast.error('Error updating reservation');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reservations.map((reservation) => (

            <tr key={reservation.id}>
              <td className="px-1 md:px-6 py-4">
                <div className="text-sm font-medium text-gray-900">{reservation.guestName}</div>
                <div className="text-sm text-gray-500">{reservation.guestEmail}</div>
                <div className="text-sm text-gray-500">{reservation.guestPhone}</div>
              </td>
              <td className="px-1 md:px-6 py-4">
                <div className="text-sm text-gray-900">
                  Check-in: {format(new Date(reservation.startDate.seconds * 1000), 'MMM dd, yyyy h:mm a')}
                </div>
                <div className="text-sm text-gray-900">
                  Check-out: {format(new Date(reservation.endDate.seconds * 1000), 'MMM dd, yyyy hh:mm a')}
                </div>
              </td>
              <td className="px-1 md:px-6 py-4">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full transform
                  ${reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    reservation.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'}
                        md:rotate-0 rotate-45`}>
                  {reservation.status}
                </span>
              </td>
              <td className="px-1 md:px-6 py-6">
                {reservation.status === 'pending' && (
                  <div className="space-x-2">
                    <button
                      onClick={() => reservation.id && updateReservationStatus(reservation.id, 'confirmed')}
                      className="bg-green-500 text-white px-1 md:px-3 py-1 rounded-md text-sm"
                    >
                      <span className="hidden sm:inline">Confirm</span>
                      <span className="sm:hidden">✔</span>
                    </button>
                    <button
                      onClick={() => reservation.id && updateReservationStatus(reservation.id, 'cancelled')}
                      className="bg-red-500 text-white px-1 md:px-3 py-1 rounded-md text-sm"
                    >
                      <span className="hidden sm:inline">Cancel</span>
                      <span className="sm:hidden">✖</span>
                    </button>
                  </div>
                )}
                {reservation.status === 'confirmed' && (
                  <div className='space-x-2'>
                    <button
                      onClick={() => reservation.id && updateReservationStatus(reservation.id, 'cancelled')}
                      className="bg-red-500 text-white px-1 md:px-3 py-1 rounded-md text-sm"
                    >
                      <span className="hidden sm:inline">Cancel</span>
                      <span className="sm:hidden">✖</span>
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}