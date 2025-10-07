'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import RecaptchaProvider from '@/components/RecaptchaProvider';
import Link from 'next/link';
import Image from 'next/image';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

function ContactForm() {
  const { t } = useLanguage();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    passport: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Execute reCAPTCHA
      if (!executeRecaptcha) {
        setError(t.contact.errors.recaptchaNotLoaded);
        setIsSubmitting(false);
        return;
      }

      const recaptchaToken = await executeRecaptcha('contact_form');

      // Get client IP from external service
      let clientIp = 'unknown';
      try {
        const ipResponse = await fetch('https://api64.ipify.org?format=json');
        const ipData = await ipResponse.json();
        clientIp = ipData.ip;
      } catch (ipError) {
        // Fallback to cloudflare trace
        try {
          const cfResponse = await fetch('https://www.cloudflare.com/cdn-cgi/trace');
          const cfText = await cfResponse.text();
          const ipMatch = cfText.match(/ip=([^\n]+)/);
          if (ipMatch) {
            clientIp = ipMatch[1];
          }
        } catch {
          // Silent fail
        }
      }

      // Submit form
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
          clientIp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || t.contact.errors.failedToSubmit);
        setIsSubmitting(false);
        return;
      }

      // Success
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
      }, 5000);
    } catch (error) {
      setError(t.contact.errors.generalError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-contact.jpg"
            alt="Contact THEATRE HOTEL d.o.o. Split Croatia - professional reception desk and friendly hospitality staff ready to assist"
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
                      <a href="mailto:info@theatrehoteldoo.com" className="hover:text-primary-600 transition-colors">
                        info@theatrehoteldoo.com
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
                      <p>{t.contact.hoursDetails.reception}</p>
                      <p>{t.contact.hoursDetails.restaurant}</p>
                      <p>{t.contact.hoursDetails.spa}</p>
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
                    {error && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        {error}
                      </div>
                    )}
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
                          placeholder={t.contact.form.passportPlaceholder}
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
                        <option value="">{t.contact.form.selectSubject}</option>
                        <option value="reservation">{t.contact.form.subjectOptions.reservation}</option>
                        <option value="event">{t.contact.form.subjectOptions.event}</option>
                        <option value="spa">{t.contact.form.subjectOptions.spa}</option>
                        <option value="restaurant">{t.contact.form.subjectOptions.restaurant}</option>
                        <option value="complaint">{t.contact.form.subjectOptions.complaint}</option>
                        <option value="compliment">{t.contact.form.subjectOptions.compliment}</option>
                        <option value="other">{t.contact.form.subjectOptions.other}</option>
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
                        placeholder={t.contact.form.messagePlaceholder}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaPaperPlane />
                      <span>{isSubmitting ? 'Sending...' : t.contact.form.send}</span>
                    </button>

                    <p className="text-sm text-gray-500 mt-4 text-center">
                      {t.contact.form.requiredNote}
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
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">{t.contact.services.title}</h2>
            <p className="text-xl text-gray-600">{t.contact.services.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPhone className="text-2xl text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.contact.services.reservations.title}</h3>
              <p className="text-gray-600 mb-4">{t.contact.services.reservations.description}</p>
              <a href="tel:+385924512500" className="text-primary-600 hover:text-primary-700 font-medium">
                {t.contact.services.reservations.action}
              </a>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="text-2xl text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.contact.services.events.title}</h3>
              <p className="text-gray-600 mb-4">{t.contact.services.events.description}</p>
              <a href="mailto:events@theatrehoteldoo.com" className="text-primary-600 hover:text-primary-700 font-medium">
                {t.contact.services.events.action}
              </a>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="text-2xl text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.contact.services.concierge.title}</h3>
              <p className="text-gray-600 mb-4">{t.contact.services.concierge.description}</p>
              <a href="mailto:concierge@theatrehoteldoo.com" className="text-primary-600 hover:text-primary-700 font-medium">
                {t.contact.services.concierge.action}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-12 bg-red-50 border-l-4 border-red-500">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-semibold text-red-800 mb-2">{t.contact.emergency.title}</h3>
            <p className="text-red-700 mb-4">
              {t.contact.emergency.description}
            </p>
            <a
              href="tel:+385924512500"
              className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              {t.contact.emergency.action}
            </a>
          </div>
        </div>
      </section>

      {/* Explore More */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-3">{t.internalLinks.contact.exploreMore}</h2>
            <p className="text-gray-600">{t.internalLinks.contact.exploreDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link href="/rooms" className="group p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary-700 transition-colors">{t.internalLinks.contact.roomsSuites}</h3>
              <p className="text-gray-600">{t.internalLinks.contact.roomsDesc}</p>
            </Link>
            <Link href="/booking" className="group p-6 bg-primary-50 rounded-xl hover:bg-primary-100 transition-all">
              <h3 className="text-xl font-semibold mb-2 text-primary-900 group-hover:text-primary-700 transition-colors">{t.internalLinks.contact.bookStay}</h3>
              <p className="text-gray-700">{t.internalLinks.contact.bookDesc}</p>
            </Link>
            <Link href="/about" className="group p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary-700 transition-colors">{t.internalLinks.contact.aboutUs}</h3>
              <p className="text-gray-600">{t.internalLinks.contact.aboutDesc}</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Contact() {
  return (
    <RecaptchaProvider>
      <ContactForm />
    </RecaptchaProvider>
  );
}