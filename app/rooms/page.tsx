'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import { FaWifi, FaTv, FaCoffee, FaSnowflake, FaSwimmingPool, FaSpa, FaConciergeBell, FaGlassMartiniAlt, FaBed, FaShower, FaUserFriends, FaRulerCombined, FaCheck } from 'react-icons/fa';

const roomsData = [
  {
    id: 'standard',
    image: '/images/rooms/room-standard.jpg',
    gallery: [
      '/images/gallery/standard/standard-1.jpg',
      '/images/gallery/standard/standard-2.jpg',
      '/images/gallery/standard/standard-3.jpg',
    ],
    price: 150,
    size: 25,
    maxGuests: 2,
    bedType: 'King or Twin',
  },
  {
    id: 'deluxe',
    image: '/images/rooms/room-deluxe.jpg',
    gallery: [
      '/images/gallery/deluxe/deluxe-1.jpg',
      '/images/gallery/deluxe/deluxe-2.jpg',
      '/images/gallery/deluxe/deluxe-3.jpg',
    ],
    price: 250,
    size: 35,
    maxGuests: 3,
    bedType: 'King',
  },
  {
    id: 'suite',
    image: '/images/rooms/room-suite.jpg',
    gallery: [
      '/images/gallery/suite/suite-1.jpg',
      '/images/gallery/suite/suite-2.jpg',
      '/images/gallery/suite/suite-3.jpg',
    ],
    price: 450,
    size: 65,
    maxGuests: 4,
    bedType: 'King + Sofa Bed',
  },
  {
    id: 'presidential',
    image: '/images/rooms/room-presidential.jpg',
    gallery: [
      '/images/gallery/presidential/presidential-1.jpg',
      '/images/gallery/presidential/presidential-2.jpg',
      '/images/gallery/presidential/presidential-3.jpg',
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
            src="/images/hero/hero-rooms.jpg"
            alt="Luxury hotel rooms at THEATRE HOTEL Split Croatia showcasing elegant design and premium accommodations"
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
                            <p className="text-sm text-gray-500">{t.rooms.roomSize}</p>
                            <p className="font-semibold">{room.size}m²</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FaUserFriends className="text-primary-600 text-xl" />
                          <div>
                            <p className="text-sm text-gray-500">{t.rooms.maxGuests}</p>
                            <p className="font-semibold">{room.maxGuests} {t.rooms.persons}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FaBed className="text-primary-600 text-xl" />
                          <div>
                            <p className="text-sm text-gray-500">{t.rooms.bedType}</p>
                            <p className="font-semibold">
                              {room.bedType === 'King or Twin' && t.rooms.kingOrTwin}
                              {room.bedType === 'King' && t.rooms.king}
                              {room.bedType === 'King + Sofa Bed' && t.rooms.kingPlusSofa}
                              {room.bedType === 'Master King + Guest Room' && t.rooms.masterKingPlusGuest}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FaShower className="text-primary-600 text-xl" />
                          <div>
                            <p className="text-sm text-gray-500">{t.rooms.bathroom}</p>
                            <p className="font-semibold">{t.rooms.privateLuxury}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">{t.rooms.roomAmenities}</h3>
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
                          alt={`${roomData.name} at luxury hotel Split Croatia - main view showcasing room layout and premium amenities`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        {room.gallery.map((img, idx) => (
                          <div key={idx} className="relative h-32 rounded-lg overflow-hidden shadow-lg">
                            <Image
                              src={img}
                              alt={`${roomData.name} THEATRE HOTEL Split - detailed view ${idx + 1} showing interior features and luxury design`}
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
            <h2 className="text-4xl font-serif font-bold mb-4 text-gray-900">{t.rooms.allRoomFeatures.title}</h2>
            <p className="text-xl text-gray-600">{t.rooms.allRoomFeatures.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <FaWifi className="text-2xl text-primary-600" />
              </div>
              <p className="text-sm font-medium">{t.rooms.allRoomFeatures.highSpeedWifi}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <FaSnowflake className="text-2xl text-primary-600" />
              </div>
              <p className="text-sm font-medium">{t.rooms.allRoomFeatures.airConditioning}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <FaTv className="text-2xl text-primary-600" />
              </div>
              <p className="text-sm font-medium">{t.rooms.allRoomFeatures.smartTv}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <FaCoffee className="text-2xl text-primary-600" />
              </div>
              <p className="text-sm font-medium">{t.rooms.allRoomFeatures.coffeeMaker}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <FaGlassMartiniAlt className="text-2xl text-primary-600" />
              </div>
              <p className="text-sm font-medium">{t.rooms.allRoomFeatures.miniBar}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <FaConciergeBell className="text-2xl text-primary-600" />
              </div>
              <p className="text-sm font-medium">{t.rooms.allRoomFeatures.roomService}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">{t.rooms.specialOffers.title}</h2>
          <p className="text-xl mb-8">{t.rooms.specialOffers.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-2xl font-semibold mb-2">{t.rooms.specialOffers.earlyBird.title}</h3>
              <p className="mb-4">{t.rooms.specialOffers.earlyBird.description}</p>
              <p className="text-3xl font-bold">{t.rooms.specialOffers.earlyBird.discount}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-2xl font-semibold mb-2">{t.rooms.specialOffers.longStay.title}</h3>
              <p className="mb-4">{t.rooms.specialOffers.longStay.description}</p>
              <p className="text-3xl font-bold">{t.rooms.specialOffers.longStay.discount}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-2xl font-semibold mb-2">{t.rooms.specialOffers.weekend.title}</h3>
              <p className="mb-4">{t.rooms.specialOffers.weekend.description}</p>
              <p className="text-3xl font-bold">{t.rooms.specialOffers.weekend.discount}</p>
            </div>
          </div>
          <div className="mt-12">
            <Link
              href="/booking"
              className="inline-block px-10 py-4 bg-white text-primary-700 rounded-lg hover:bg-gray-100 transition-all font-semibold text-lg"
            >
              {t.internalLinks.rooms.bookNow}
            </Link>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link href="/about" className="group p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary-700 transition-colors">{t.internalLinks.rooms.relatedLinks.aboutHotel}</h3>
              <p className="text-gray-600">{t.internalLinks.rooms.relatedLinks.aboutDesc}</p>
            </Link>
            <Link href="/contact" className="group p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary-700 transition-colors">{t.internalLinks.rooms.relatedLinks.contact}</h3>
              <p className="text-gray-600">{t.internalLinks.rooms.relatedLinks.contactDesc}</p>
            </Link>
            <Link href="/careers" className="group p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary-700 transition-colors">{t.internalLinks.rooms.relatedLinks.careers}</h3>
              <p className="text-gray-600">{t.internalLinks.rooms.relatedLinks.careersDesc}</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}