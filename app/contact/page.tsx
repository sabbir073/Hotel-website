'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    passport: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        passport: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1920&h=1080&fit=crop"
            alt="Contact THEATRE HOTEL d.o.o."
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">{t.contact.title}</h1>
          <p className="text-xl md:text-2xl">{t.contact.subtitle}</p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-serif font-bold mb-8 text-gray-900">{t.contact.getInTouch}</h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-xl text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{t.contact.info.address}</h3>
                    <p className="text-gray-600">Matošića ul. 21000<br />Split, Croatia</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-xl text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{t.contact.info.phone}</h3>
                    <p className="text-gray-600">
                      <a href="tel:021655961" className="hover:text-primary-600 transition-colors block">
                        021655961
                      </a>
                      <a href="tel:+385924512500" className="hover:text-primary-600 transition-colors block">
                        +385 92 451 2500
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-xl text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{t.contact.info.email}</h3>
                    <p className="text-gray-600">
                      <a href="mailto:info@hoteldutheatre.hr" className="hover:text-primary-600 transition-colors">
                        info@hoteldutheatre.hr
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-xl text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{t.contact.info.hours}</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Reception: 24/7</p>
                      <p>Restaurant: 7:00 - 23:00</p>
                      <p>Spa: 9:00 - 21:00</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Map Embed */}
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.8!2d16.4402!3d43.5089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13355e0a8ea5f0b7%3A0x0!2zTWF0b8WhacSHYSAyMSwgMjEwMDAsIFNwbGl0LCBDcm9hdGlh!5e0!3m2!1sen!2s!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="THEATRE HOTEL d.o.o. Location"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-serif font-bold mb-6 text-gray-900">{t.contact.sendMessage}</h2>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-green-600 mb-2">{t.contact.messageSent}</h3>
                    <p className="text-gray-600">{t.contact.messageThankYou}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          {t.contact.form.name} *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          {t.contact.form.email} *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          {t.contact.form.phone}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          {t.contact.form.passport}
                        </label>
                        <input
                          type="text"
                          name="passport"
                          value={formData.passport}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Required for reservation inquiries"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        {t.contact.form.subject} *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      >
                        <option value="">Select a subject...</option>
                        <option value="reservation">Reservation Inquiry</option>
                        <option value="event">Event Planning</option>
                        <option value="spa">Spa Services</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="complaint">Complaint</option>
                        <option value="compliment">Compliment</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2">
                        {t.contact.form.message} *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Please describe your inquiry in detail..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all font-semibold flex items-center justify-center space-x-2"
                    >
                      <FaPaperPlane />
                      <span>{t.contact.form.send}</span>
                    </button>

                    <p className="text-sm text-gray-500 mt-4 text-center">
                      * Required fields. We typically respond within 24 hours.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">How We Can Help</h2>
            <p className="text-xl text-gray-600">Our team is here to assist with all your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPhone className="text-2xl text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Reservations</h3>
              <p className="text-gray-600 mb-4">Book your stay or modify existing reservations with our dedicated team.</p>
              <a href="tel:+385924512500" className="text-primary-600 hover:text-primary-700 font-medium">
                Call Now
              </a>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="text-2xl text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Events & Groups</h3>
              <p className="text-gray-600 mb-4">Planning a special event or group booking? Our events team will help.</p>
              <a href="mailto:events@hoteldutheatre.hr" className="text-primary-600 hover:text-primary-700 font-medium">
                Email Events Team
              </a>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="text-2xl text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Concierge</h3>
              <p className="text-gray-600 mb-4">Local recommendations, tours, and personalized assistance during your stay.</p>
              <a href="mailto:concierge@hoteldutheatre.hr" className="text-primary-600 hover:text-primary-700 font-medium">
                Contact Concierge
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-12 bg-red-50 border-l-4 border-red-500">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-semibold text-red-800 mb-2">Emergency Contact</h3>
            <p className="text-red-700 mb-4">
              For urgent matters outside business hours or emergencies during your stay
            </p>
            <a
              href="tel:+385924512500"
              className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              24/7 Emergency Line: +385 92 451 2500
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}