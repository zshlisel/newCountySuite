import { useState } from 'react';
import { Apartment } from '../types';
import ReservationForm from './ReservationForm';
import ContactUs from './ContactUs';

interface Props {
  apartment: Apartment;
}

export default function ApartmentDetails({ apartment }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [showContactUsForm, setContactUsForm] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen overflow-y-auto ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="relative h-96">
            <img
              src={apartment.images[currentImageIndex]}
              alt={`Apartment view ${currentImageIndex + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
            {apartment.images.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {apartment.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {apartment.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`w-full h-20 object-cover rounded cursor-pointer ${index === currentImageIndex ? 'ring-2 ring-blue-500' : ''
                  }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{apartment.title}</h1>
          <p className="text-gray-600 mb-8">{apartment.description}</p>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-semibold">Bedrooms</h3>
              <p>{apartment.bedrooms}</p>
            </div>
            <div>
              <h3 className="font-semibold">Bathrooms</h3>
              <p>{apartment.bathrooms}</p>
            </div>
            <div>
              <h3 className="font-semibold">Square Footage</h3>
              <p>{apartment.squareFootage} sq ft</p>
            </div>
            <div>
              <h3 className="font-semibold">Price per night</h3>
              <p>${apartment.price}</p>
            </div>
            <div>
              <h3 className="font-semibold">Price per week-end</h3>
              <p>${apartment.pricePerWeekend}</p>
            </div>
            <div>
              <h3 className="font-semibold">Price 3 days +</h3>
              <p>{apartment.price3plus}</p>{/* add link to contact id */}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold mb-4">Amenities</h3>
            <ul className="grid grid-cols-2 gap-4">
              {apartment.amenities.map((amenity, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">✓</span>
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
          <p className='text-sm text-gray-600 font-medium italic'>
            * A one-time cleaning fee of $100 applies to each rental.
          </p>
          <button
            onClick={() => setShowReservationForm(true)}
            className="w-full my-0 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Book Now
          </button>
          <p>or:</p>
          <button
            onClick={() => setContactUsForm(true)}
            className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-700"
          >
            Contact Us
          </button>
        </div>

      </div>

      {showReservationForm && (
        <ReservationForm
          onClose={() => setShowReservationForm(false)}
          apartment={apartment}
        />
      )}
      {showContactUsForm && (
        <ContactUs
          onClose={() => setContactUsForm(false)}
        />
      )}
      
    </div>

  );
}