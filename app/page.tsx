'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { FaWifi, FaSwimmingPool, FaSpa, FaCoffee, FaConciergeBell, FaParking, FaGlassMartiniAlt, FaDumbbell, FaStar, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import Image from 'next/image';

export default function Home() {
  const { t } = useLanguage();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&h=1080&fit=crop"
            alt="Hotel du Théâtre"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 animate-fade-in">
            {t.hero.title}
          </h1>
          <p className="text-xl md:text-2xl mb-4 animate-fade-in-delay-1">
            {t.hero.subtitle}
          </p>
          <p className="text-lg mb-8 animate-fade-in-delay-2 text-gray-200">
            {t.hero.description}
          </p>

          {/* Quick Booking Widget */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl mt-8 animate-fade-in-delay-3">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-left">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  <FaCalendarAlt className="inline mr-2 text-primary-600" />
                  {t.hero.checkIn}
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                />
              </div>

              <div className="text-left">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  <FaCalendarAlt className="inline mr-2 text-primary-600" />
                  {t.hero.checkOut}
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                />
              </div>

              <div className="text-left">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  <FaUsers className="inline mr-2 text-primary-600" />
                  {t.hero.guests}
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </select>
              </div>

              <div className="flex items-end">
                <Link
                  href="/booking"
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-2.5 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all font-semibold text-center"
                >
                  {t.hero.searchRooms}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">{t.home.whyChoose.title}</h2>
            <p className="text-xl text-gray-600">{t.home.whyChoose.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group hover:transform hover:scale-105 transition-all">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl transition-shadow">
                <FaConciergeBell className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.features.luxury.title}</h3>
              <p className="text-gray-600">{t.features.luxury.description}</p>
            </div>

            <div className="text-center group hover:transform hover:scale-105 transition-all">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl transition-shadow">
                <FaGlassMartiniAlt className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.features.dining.title}</h3>
              <p className="text-gray-600">{t.features.dining.description}</p>
            </div>

            <div className="text-center group hover:transform hover:scale-105 transition-all">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl transition-shadow">
                <FaSpa className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.features.spa.title}</h3>
              <p className="text-gray-600">{t.features.spa.description}</p>
            </div>

            <div className="text-center group hover:transform hover:scale-105 transition-all">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl transition-shadow">
                <FaStar className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.features.location.title}</h3>
              <p className="text-gray-600">{t.features.location.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Preview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">{t.rooms.title}</h2>
            <p className="text-xl text-gray-600">{t.rooms.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Standard Room */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-shadow">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop"
                  alt={t.rooms.types.standard.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-primary-700 font-semibold">{t.rooms.from} €150/{t.rooms.perNight}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{t.rooms.types.standard.name}</h3>
                <p className="text-gray-600 mb-4">{t.rooms.types.standard.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    <FaWifi className="inline mr-1" /> Wi-Fi
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    <FaCoffee className="inline mr-1" /> Mini Bar
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    25m²
                  </span>
                </div>
                <Link
                  href="/rooms"
                  className="block text-center bg-gradient-to-r from-primary-600 to-primary-700 text-white py-2.5 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all font-semibold"
                >
                  {t.rooms.viewDetails}
                </Link>
              </div>
            </div>

            {/* Deluxe Room */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-shadow">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop"
                  alt={t.rooms.types.deluxe.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-primary-700 font-semibold">{t.rooms.from} €250/{t.rooms.perNight}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{t.rooms.types.deluxe.name}</h3>
                <p className="text-gray-600 mb-4">{t.rooms.types.deluxe.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    <FaWifi className="inline mr-1" /> Wi-Fi
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    Balcony
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    35m²
                  </span>
                </div>
                <Link
                  href="/rooms"
                  className="block text-center bg-gradient-to-r from-primary-600 to-primary-700 text-white py-2.5 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all font-semibold"
                >
                  {t.rooms.viewDetails}
                </Link>
              </div>
            </div>

            {/* Suite */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-shadow">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop"
                  alt={t.rooms.types.suite.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-primary-700 font-semibold">{t.rooms.from} €450/{t.rooms.perNight}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{t.rooms.types.suite.name}</h3>
                <p className="text-gray-600 mb-4">{t.rooms.types.suite.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    <FaSpa className="inline mr-1" /> Jacuzzi
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    Living Area
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    65m²
                  </span>
                </div>
                <Link
                  href="/rooms"
                  className="block text-center bg-gradient-to-r from-primary-600 to-primary-700 text-white py-2.5 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all font-semibold"
                >
                  {t.rooms.viewDetails}
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/rooms"
              className="inline-block bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-3 rounded-full hover:from-primary-700 hover:to-primary-800 transition-all font-semibold shadow-lg transform hover:scale-105"
            >
              {t.home.viewAllRooms}
            </Link>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">{t.home.amenities.title}</h2>
            <p className="text-xl text-gray-600">{t.home.amenities.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <FaWifi className="text-2xl text-primary-600" />
              </div>
              <p className="text-sm font-medium">{t.home.amenities.freeWifi}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <FaSwimmingPool className="text-2xl text-primary-600" />
              </div>
              <p className="text-sm font-medium">{t.home.amenities.swimmingPool}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <FaSpa className="text-2xl text-primary-600" />
              </div>
              <p className="text-sm font-medium">{t.home.amenities.spaWellness}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <FaDumbbell className="text-2xl text-primary-600" />
              </div>
              <p className="text-sm font-medium">{t.home.amenities.fitnessCenter}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <FaParking className="text-2xl text-primary-600" />
              </div>
              <p className="text-sm font-medium">{t.home.amenities.freeParking}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <FaConciergeBell className="text-2xl text-primary-600" />
              </div>
              <p className="text-sm font-medium">{t.home.amenities.concierge}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">{t.home.testimonials.title}</h2>
            <p className="text-xl text-gray-600">{t.home.testimonials.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-lg" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                &ldquo;{t.home.testimonials.review1.text}&rdquo;
              </p>
              <p className="font-semibold">{t.home.testimonials.review1.name}</p>
              <p className="text-sm text-gray-500">{t.home.testimonials.review1.country}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-lg" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                &ldquo;{t.home.testimonials.review2.text}&rdquo;
              </p>
              <p className="font-semibold">{t.home.testimonials.review2.name}</p>
              <p className="text-sm text-gray-500">{t.home.testimonials.review2.country}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-lg" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                &ldquo;{t.home.testimonials.review3.text}&rdquo;
              </p>
              <p className="font-semibold">{t.home.testimonials.review3.name}</p>
              <p className="text-sm text-gray-500">{t.home.testimonials.review3.country}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">{t.home.cta.title}</h2>
          <p className="text-xl mb-8">{t.home.cta.subtitle}</p>
          <Link
            href="/booking"
            className="inline-block bg-white text-primary-700 px-8 py-3 rounded-full hover:bg-gray-100 transition-all font-semibold shadow-lg transform hover:scale-105"
          >
            {t.home.cta.button}
          </Link>
        </div>
      </section>
    </div>
  );
}