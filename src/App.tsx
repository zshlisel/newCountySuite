import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard/index'
import ApartmentDetails from './components/ApartmentDetails';


const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const demoApartment = {
  id: '1',
  title: 'Luxury Suite in Airmont, NY',
  description: 'Beautiful suite in the heart of Airmont in a peacefull neighborhood.',
  amenities: [
    'Close to Shul',
    'Air Conditioning',
    'Full Kitchen',
    'Full Bath',
    'Shopping nearby',
    'Parking'
  ],
  images: [
    //Kitchen
    '/assets/WhatsApp Image 2024-12-18 at 3.19.16 PM.jpeg',
    '/assets/WhatsApp Image 2024-12-18 at 3.19.17 PM (2).jpeg',
    '/assets/WhatsApp Image 2024-12-18 at 3.19.16 PM (1).jpeg',
    //Bedroom
    '/assets/WhatsApp Image 2024-12-18 at 3.19.17 PM.jpeg',
    '/assets/WhatsApp Image 2024-12-18 at 3.19.17 PM1.jpeg', 
    '/assets/WhatsApp Image 2024-12-18 at 3.19.17 PM (3).jpeg',
    '/assets/WhatsApp Image 2024-12-18 at 3.19.17 PM (1).jpeg', 
    '/assets/WhatsApp Image 2024-12-18 at 3.19.17 PM (1)1.jpeg',
    '/assets/WhatsApp Image 2024-12-18 at 3.19.17 PM (2)1.jpeg',
    '/assets/WhatsApp Image 2024-12-18 at 3.19.18 PM.jpeg',
//Steps
    '/assets/WhatsApp Image 2024-12-18 at 3.19.16 PM1.jpeg', 
    '/assets/WhatsApp Image 2024-12-18 at 3.19.15 PM.jpeg',

   
  ],
  pricePerWeekend: 400,
  price: 150,
  price3plus: "Let's discuss...",
  bedrooms: 2,
  bathrooms: 1,
  squareFootage: 750,
  address: '6 new county Rd, Airmont NY 10952'
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<ApartmentDetails apartment={demoApartment} />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;