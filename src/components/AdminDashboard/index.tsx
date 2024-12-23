import { useState } from 'react';
import ReservationList from './ReservationList';
import BookingCalendar from '../Calendar/BookingCalendar';
import { useAuth } from '../../contexts/AuthContext';
import SignUp from './SignUp';

export default function AdminDashboard() {
  const [view, setView] = useState<'list' | 'calendar'>('calendar');
  const { logout } = useAuth();
  const [addAdmin, setAddAdmin] = useState(false)




  return (
    <div
    className={`container mx-auto px-4 py-8 flex flex-col items-center justify-center max-w-7xl`}>
      {addAdmin ? (
        <SignUp />
      ) : (
        <div className="w-full">
          <nav className="w-full lg:flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold pb-4 lg:pb-0 pr-4">Reservations Management</h2>
            <div className="space-x-2">
              <button
                className="px-4 py-2 rounded-md bg-gray-200 text-gray-700"
                onClick={logout}
              >
                Log Out
              </button>
              <button
                onClick={() => setView('list')}
                className={`px-4 py-2 rounded-md ${
                  view === 'list'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setView('calendar')}
                className={`px-4 py-2 rounded-md ${
                  view === 'calendar'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Calendar View
              </button>
            </div>
          </nav>
  
          <section className="w-full">
            {view === 'list' ? <ReservationList /> : <BookingCalendar />}
          </section>
        </div>
      )}
       <button className=' p-2 m-2 rounded-md bg-gray-200 text-gray-700 text-sm' onClick={() => setAddAdmin(!addAdmin)}>{addAdmin ? 'Back to reservations' : 'Click here to add an admin'}</button>
    </div>
  )
}  