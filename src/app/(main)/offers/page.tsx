'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const offers = [
  {
    id: 1,
    title: 'Hunza Valley Explorer',
    description: 'Experience the beauty of Hunza Valley with our comprehensive 5-day package.',
    image: '/offers/hunza-explorer.jpg',
    price: 499,
    duration: '5 Days',
    highlights: [
      'Visit Baltit and Altit Forts',
      'Attabad Lake Boat Ride',
      'Passu Cones Viewpoint',
      'Local Cultural Experience',
    ],
    validUntil: '2024-12-31',
  },
  {
    id: 2,
    title: 'K2 Base Camp Trek',
    description: 'Embark on an unforgettable journey to the base camp of the world\'s second-highest peak.',
    image: '/offers/k2-trek.jpg',
    price: 1299,
    duration: '14 Days',
    highlights: [
      'Professional Guide',
      'All Camping Equipment',
      'Meals Included',
      'Transportation',
    ],
    validUntil: '2024-09-30',
  },
  {
    id: 3,
    title: 'Skardu Adventure',
    description: 'Discover the wonders of Skardu with our adventure-packed 7-day package.',
    image: '/offers/skardu-adventure.jpg',
    price: 799,
    duration: '7 Days',
    highlights: [
      'Shangrila Resort Stay',
      'Satpara Lake Visit',
      'Kharpocho Fort Tour',
      'Deosai Plains Safari',
    ],
    validUntil: '2024-11-30',
  },
  {
    id: 4,
    title: 'Gilgit Cultural Tour',
    description: 'Immerse yourself in the rich culture and history of Gilgit with our 4-day package.',
    image: '/offers/gilgit-cultural.jpg',
    price: 399,
    duration: '4 Days',
    highlights: [
      'Gilgit Fort Visit',
      'Kargah Buddha Tour',
      'Local Bazaar Experience',
      'Traditional Music Night',
    ],
    validUntil: '2024-12-31',
  },
];

export default function OffersPage() {
  const [selectedOffer, setSelectedOffer] = useState<typeof offers[0] | null>(null);

  return (
    <main className="min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Special Offers</h1>
        <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Discover our exclusive packages and special deals for exploring the wonders of Gilgit-Baltistan.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-64">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">{offer.title}</h2>
                    <p className="text-gray-600">{offer.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-blue-600">${offer.price}</p>
                    <p className="text-sm text-gray-500">{offer.duration}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Highlights:</h3>
                  <ul className="space-y-2">
                    {offer.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-center text-gray-700"
                      >
                        <svg
                          className="w-5 h-5 text-blue-600 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    Valid until: {new Date(offer.validUntil).toLocaleDateString()}
                  </p>
                  <button
                    onClick={() => setSelectedOffer(offer)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Modal */}
        {selectedOffer && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedOffer(null)}
          >
            <div
              className="bg-white rounded-lg max-w-2xl w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-semibold">Book {selectedOffer.title}</h2>
                <button
                  onClick={() => setSelectedOffer(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Travelers
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Proceed to Payment
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 