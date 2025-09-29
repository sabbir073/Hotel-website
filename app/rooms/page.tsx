'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import { FaWifi, FaTv, FaCoffee, FaSnowflake, FaSwimmingPool, FaSpa, FaConciergeBell, FaGlassMartiniAlt, FaBed, FaShower, FaUserFriends, FaRulerCombined, FaCheck } from 'react-icons/fa';

const roomsData = [
  {
    id: 'standard',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1595526051245-4506e0005bd0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800&h=600&fit=crop',
    ],
    price: 150,
    size: 25,
    maxGuests: 2,
    bedType: 'King or Twin',
  },
  {
    id: 'deluxe',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop',
    ],
    price: 250,
    size: 35,
    maxGuests: 3,
    bedType: 'King',
  },
  {
    id: 'suite',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop',
    ],
    price: 450,
    size: 65,
    maxGuests: 4,
    bedType: 'King + Sofa Bed',
  },
  {
    id: 'presidential',
    image: 'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1606402179428-a57976d71fa4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1587985064135-0366536eab42?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1609766857326-18a204c2cf31?w=800&h=600&fit=crop',
    ],
    price: 850,
    size: 120,
    maxGuests: 6,
    bedType: 'Master King + Guest Room',
  },
];

export default function Rooms() {
  const { t } = useLanguage();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const getRoomData = (roomId: string) => {
    const room = roomsData.find(r => r.id === roomId);
    const roomType = t.rooms.types[roomId as keyof typeof t.rooms.types];
    return { ...room, ...roomType };
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1920&h=1080&fit=crop"
            alt="Luxury Rooms"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">{t.rooms.title}</h1>
          <p className="text-xl md:text-2xl">{t.rooms.subtitle}</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50 sticky top-20 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedRoom(null)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedRoom === null
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
{t.rooms.allRooms}
            </button>
            {Object.keys(t.rooms.types).map((roomType) => (
              <button
                key={roomType}
                onClick={() => setSelectedRoom(roomType)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedRoom === roomType
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {t.rooms.types[roomType as keyof typeof t.rooms.types].name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {roomsData
              .filter((room) => !selectedRoom || room.id === selectedRoom)
              .map((room, index) => {
                const roomData = getRoomData(room.id);
                return (
                  <div
                    key={room.id}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                      index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div>
                        <h2 className="text-4xl font-serif font-bold mb-3 text-gray-900">{roomData.name}</h2>
                        <p className="text-xl text-primary-600 font-semibold mb-4">
                          {t.rooms.from} €{room.price} {t.rooms.perNight}
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">{roomData.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3">
                          <FaRulerCombined className="text-primary-600 text-xl" />
                          <div>
                            <p className="text-sm text-gray-500">Room Size</p>
                            <p className="font-semibold">{room.size}m²</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FaUserFriends className="text-primary-600 text-xl" />
                          <div>
                            <p className="text-sm text-gray-500">Max Guests</p>
                            <p className="font-semibold">{room.maxGuests} Persons</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FaBed className="text-primary-600 text-xl" />
                          <div>
                            <p className="text-sm text-gray-500">Bed Type</p>
                            <p className="font-semibold">{room.bedType}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FaShower className="text-primary-600 text-xl" />
                          <div>
                            <p className="text-sm text-gray-500">Bathroom</p>
                            <p className="font-semibold">Private Luxury</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">Room Amenities</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {roomData.amenities.map((amenity: string, idx: number) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <FaCheck className="text-green-500 text-sm" />
                              <span className="text-gray-700">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Link
                        href={`/booking?room=${room.id}`}
                        className="inline-block bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-3 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all font-semibold shadow-lg transform hover:scale-105"
                      >
                        {t.rooms.bookRoom}
                      </Link>
                    </div>

                    <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src={room.image}
                          alt={roomData.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        {room.gallery.map((img, idx) => (
                          <div key={idx} className="relative h-32 rounded-lg overflow-hidden shadow-lg">
                            <Image
                              src={img}
                              alt={`${roomData.name} view ${idx + 1}`}
                              fill
                              className="object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* Amenities Overview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4 text-gray-900">All Room Features</h2>
            <p className="text-xl text-gray-600">Every room includes these standard amenities</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <FaWifi className="text-2xl text-primary-600" />
              </div>
              <p className="text-sm font-medium">High-Speed WiFi</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <FaSnowflake className="text-2xl text-primary-600" />
              </div>
              <p className="text-sm font-medium">Air Conditioning</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <FaTv className="text-2xl text-primary-600" />
              </div>
              <p className="text-sm font-medium">Smart TV</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <FaCoffee className="text-2xl text-primary-600" />
              </div>
              <p className="text-sm font-medium">Coffee Maker</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <FaGlassMartiniAlt className="text-2xl text-primary-600" />
              </div>
              <p className="text-sm font-medium">Mini Bar</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <FaConciergeBell className="text-2xl text-primary-600" />
              </div>
              <p className="text-sm font-medium">Room Service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">Special Offers</h2>
          <p className="text-xl mb-8">Book directly and save up to 20%</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-2xl font-semibold mb-2">Early Bird</h3>
              <p className="mb-4">Book 30 days in advance</p>
              <p className="text-3xl font-bold">15% OFF</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-2xl font-semibold mb-2">Long Stay</h3>
              <p className="mb-4">Stay 5 nights or more</p>
              <p className="text-3xl font-bold">20% OFF</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-2xl font-semibold mb-2">Weekend Special</h3>
              <p className="mb-4">Friday to Sunday stays</p>
              <p className="text-3xl font-bold">10% OFF</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}