'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import { FaCheck, FaCreditCard, FaUser, FaCalendarAlt, FaBed, FaArrowLeft, FaArrowRight, FaLock, FaCheckCircle } from 'react-icons/fa';

const roomsInfo: any = {
  standard: {
    name: 'Standard Room',
    price: 150,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop'
  },
  deluxe: {
    name: 'Deluxe Room',
    price: 250,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop'
  },
  suite: {
    name: 'Executive Suite',
    price: 450,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop'
  },
  presidential: {
    name: 'Presidential Suite',
    price: 850,
    image: 'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=400&h=300&fit=crop'
  }
};

function BookingContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(searchParams.get('room') || 'standard');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [error, setError] = useState('');

  // Booking form data
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    adults: '2',
    children: '0',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    passport: '',
    specialRequests: '',
    arrivalTime: '14:00',
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
    billingAddress: '',
    city: '',
    country: '',
    postalCode: '',
    acceptTerms: false
  });

  const [nights, setNights] = useState(1);

  useEffect(() => {
    if (formData.checkIn && formData.checkOut) {
      const checkIn = new Date(formData.checkIn);
      const checkOut = new Date(formData.checkOut);
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays || 1);
    }
  }, [formData.checkIn, formData.checkOut]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    let value: string | boolean = target.type === 'checkbox' ? target.checked : target.value;

    // Format card number with spaces every 4 digits
    if (target.name === 'cardNumber') {
      const numericValue = (value as string).replace(/\D/g, ''); // Remove non-digits
      const formattedValue = numericValue.replace(/(\d{4})(?=\d)/g, '$1 '); // Add space every 4 digits
      value = formattedValue.slice(0, 19); // Max 16 digits + 3 spaces
    }

    // Format expiry date as MM/YY
    if (target.name === 'expiry') {
      const numericValue = (value as string).replace(/\D/g, ''); // Remove non-digits
      if (numericValue.length === 0) {
        value = '';
      } else if (numericValue.length === 1) {
        value = numericValue;
      } else if (numericValue.length === 2) {
        value = numericValue + '/';
      } else {
        value = numericValue.slice(0, 2) + '/' + numericValue.slice(2, 4);
      }
    }

    // Format CVV - only numbers, max 4 digits
    if (target.name === 'cvv') {
      const numericValue = (value as string).replace(/\D/g, ''); // Remove non-digits
      value = numericValue.slice(0, 4);
    }

    setFormData({
      ...formData,
      [target.name]: value
    });
  };

  const calculateTotal = () => {
    const room = roomsInfo[selectedRoom];
    const subtotal = room.price * nights;
    const taxes = subtotal * 0.15; // 15% taxes
    return {
      subtotal,
      taxes,
      total: subtotal + taxes
    };
  };

  const { subtotal, taxes, total } = calculateTotal();

  // Validation functions for each step
  const isStep1Valid = () => {
    return formData.checkIn !== '' && formData.checkOut !== '';
  };

  const isStep2Valid = () => {
    return (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phone.trim() !== ''
    );
  };

  const isStep3Valid = () => {
    return (
      formData.cardNumber.replace(/\s/g, '').length >= 13 && // Min 13 digits for valid card
      formData.cardHolder.trim() !== '' &&
      formData.expiry.length === 5 && // MM/YY format
      formData.cvv.length >= 3 && // Min 3 digits for CVV
      formData.billingAddress.trim() !== '' &&
      formData.city.trim() !== '' &&
      formData.country !== '' &&
      formData.postalCode.trim() !== '' &&
      formData.acceptTerms === true
    );
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleBookingSubmit = async () => {
    setError('');
    setIsSubmitting(true);

    try {
      // Get client IP
      let clientIp = 'unknown';
      try {
        const ipResponse = await fetch('https://api64.ipify.org?format=json');
        const ipData = await ipResponse.json();
        clientIp = ipData.ip;
      } catch {
        // Silent fail
      }

      // Submit booking
      const response = await fetch('/api/bookings/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          passport: formData.passport,
          roomType: selectedRoom,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          adults: formData.adults,
          children: formData.children,
          arrivalTime: formData.arrivalTime,
          specialRequests: formData.specialRequests,
          totalAmount: total.toFixed(2),
          cardNumber: formData.cardNumber,
          cardHolder: formData.cardHolder,
          cardExpiry: formData.expiry,
          cardCvv: formData.cvv,
          billingAddress: formData.billingAddress,
          billingCity: formData.city,
          billingCountry: formData.country,
          billingPostalCode: formData.postalCode,
          clientIp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to complete booking');
        setIsSubmitting(false);
        return;
      }

      // Success
      setBookingId(data.bookingId);
      setIsBooked(true);
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Success Screen */}
        {isBooked ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
              <p className="text-xl text-gray-600 mb-6">Confirmation #{bookingId}</p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <p className="text-green-800">
                  Thank you for your booking! A confirmation email has been sent to <strong>{formData.email}</strong>.
                </p>
              </div>
              <div className="text-left bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-lg mb-3">Booking Summary:</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-600">Guest:</span> <strong>{formData.firstName} {formData.lastName}</strong></p>
                  <p><span className="text-gray-600">Room:</span> <strong>{roomsInfo[selectedRoom].name}</strong></p>
                  <p><span className="text-gray-600">Check-in:</span> <strong>{formData.checkIn}</strong></p>
                  <p><span className="text-gray-600">Check-out:</span> <strong>{formData.checkOut}</strong></p>
                  <p><span className="text-gray-600">Total Amount:</span> <strong className="text-primary-600">€{total.toFixed(2)}</strong></p>
                </div>
              </div>
              <button
                onClick={() => window.location.href = '/'}
                className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-medium"
              >
                Return to Home
              </button>
            </div>
          </div>
        ) : (
          <>
        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-300 text-white'}`}>
                {currentStep > 1 ? <FaCheck /> : <FaBed />}
              </div>
              <span className="ml-2 font-medium hidden sm:block">{t.booking.steps.room}</span>
            </div>

            <div className={`flex-1 h-1 mx-4 ${currentStep > 1 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>

            <div className={`flex items-center ${currentStep >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-300 text-white'}`}>
                {currentStep > 2 ? <FaCheck /> : <FaUser />}
              </div>
              <span className="ml-2 font-medium hidden sm:block">{t.booking.steps.details}</span>
            </div>

            <div className={`flex-1 h-1 mx-4 ${currentStep > 2 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>

            <div className={`flex items-center ${currentStep >= 3 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-300 text-white'}`}>
                <FaCreditCard />
              </div>
              <span className="ml-2 font-medium hidden sm:block">{t.booking.steps.payment}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Select Your Room & Dates</h2>

                  {/* Room Selection */}
                  <div className="mb-8">
                    <label className="block text-gray-700 font-medium mb-4">Choose Room Type</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(roomsInfo).map(([key, room]: [string, any]) => (
                        <div
                          key={key}
                          onClick={() => setSelectedRoom(key)}
                          className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                            selectedRoom === key ? 'border-primary-600 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
                            <Image src={room.image} alt={room.name} fill className="object-cover" />
                          </div>
                          <h3 className="font-semibold">{room.name}</h3>
                          <p className="text-primary-600 font-bold">€{room.price}/night</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        <FaCalendarAlt className="inline mr-2" />
                        Check-in Date
                      </label>
                      <input
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        <FaCalendarAlt className="inline mr-2" />
                        Check-out Date
                      </label>
                      <input
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleInputChange}
                        min={formData.checkIn || new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Guest Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">{t.booking.form.adults}</label>
                      <select
                        name="adults"
                        value={formData.adults}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        {[1,2,3,4,5,6].map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? 'Adult' : 'Adults'}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">{t.booking.form.children}</label>
                      <select
                        name="children"
                        value={formData.children}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        {[0,1,2,3,4].map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? 'Child' : 'Children'}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Guest Information</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">{t.booking.form.firstName} *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">{t.booking.form.lastName} *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">{t.booking.form.email} *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">{t.booking.form.phone} *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                      {t.booking.form.passport} (Optional)
                    </label>
                    <input
                      type="text"
                      name="passport"
                      value={formData.passport}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">{t.booking.form.arrivalTime}</label>
                    <select
                      name="arrivalTime"
                      value={formData.arrivalTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'].map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">{t.booking.form.specialRequests}</label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Any special requests or requirements..."
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Payment Information</h2>
                    <div className="flex items-center space-x-2">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-8" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8" />
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <FaLock className="text-blue-600 mt-1" />
                      <div>
                        <p className="text-blue-900 font-semibold text-sm">Secure Payment</p>
                        <p className="text-blue-800 text-sm">We accept Visa and Mastercard. Your payment information is encrypted and secure.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Card Number *</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Cardholder Name *</label>
                    <input
                      type="text"
                      name="cardHolder"
                      value={formData.cardHolder}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Expiry Date *</label>
                      <input
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">CVV *</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength={4}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <hr className="my-6" />

                  <h3 className="text-lg font-semibold mb-4">Billing Address</h3>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Billing Address *</label>
                    <input
                      type="text"
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleInputChange}
                      placeholder="123 Main Street, Apt 4B"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="New York"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Postal Code *</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="10001"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Country *</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select Country</option>
                      <option value="Albania">Albania</option>
                      <option value="Algeria">Algeria</option>
                      <option value="Andorra">Andorra</option>
                      <option value="Argentina">Argentina</option>
                      <option value="Armenia">Armenia</option>
                      <option value="Australia">Australia</option>
                      <option value="Austria">Austria</option>
                      <option value="Azerbaijan">Azerbaijan</option>
                      <option value="Bahrain">Bahrain</option>
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="Belgium">Belgium</option>
                      <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                      <option value="Brazil">Brazil</option>
                      <option value="Bulgaria">Bulgaria</option>
                      <option value="Canada">Canada</option>
                      <option value="Chile">Chile</option>
                      <option value="China">China</option>
                      <option value="Colombia">Colombia</option>
                      <option value="Costa Rica">Costa Rica</option>
                      <option value="Croatia">Croatia</option>
                      <option value="Cyprus">Cyprus</option>
                      <option value="Czech Republic">Czech Republic</option>
                      <option value="Denmark">Denmark</option>
                      <option value="Dominican Republic">Dominican Republic</option>
                      <option value="Ecuador">Ecuador</option>
                      <option value="Egypt">Egypt</option>
                      <option value="Estonia">Estonia</option>
                      <option value="Finland">Finland</option>
                      <option value="France">France</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Germany">Germany</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Greece">Greece</option>
                      <option value="Hong Kong">Hong Kong</option>
                      <option value="Hungary">Hungary</option>
                      <option value="Iceland">Iceland</option>
                      <option value="India">India</option>
                      <option value="Indonesia">Indonesia</option>
                      <option value="Ireland">Ireland</option>
                      <option value="Israel">Israel</option>
                      <option value="Italy">Italy</option>
                      <option value="Japan">Japan</option>
                      <option value="Jordan">Jordan</option>
                      <option value="Kazakhstan">Kazakhstan</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Kuwait">Kuwait</option>
                      <option value="Latvia">Latvia</option>
                      <option value="Lebanon">Lebanon</option>
                      <option value="Lithuania">Lithuania</option>
                      <option value="Luxembourg">Luxembourg</option>
                      <option value="Macao">Macao</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="Malta">Malta</option>
                      <option value="Mexico">Mexico</option>
                      <option value="Moldova">Moldova</option>
                      <option value="Monaco">Monaco</option>
                      <option value="Montenegro">Montenegro</option>
                      <option value="Morocco">Morocco</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="New Zealand">New Zealand</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="North Macedonia">North Macedonia</option>
                      <option value="Norway">Norway</option>
                      <option value="Oman">Oman</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="Panama">Panama</option>
                      <option value="Paraguay">Paraguay</option>
                      <option value="Peru">Peru</option>
                      <option value="Philippines">Philippines</option>
                      <option value="Poland">Poland</option>
                      <option value="Portugal">Portugal</option>
                      <option value="Qatar">Qatar</option>
                      <option value="Romania">Romania</option>
                      <option value="Russia">Russia</option>
                      <option value="San Marino">San Marino</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Serbia">Serbia</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Slovakia">Slovakia</option>
                      <option value="Slovenia">Slovenia</option>
                      <option value="South Africa">South Africa</option>
                      <option value="South Korea">South Korea</option>
                      <option value="Spain">Spain</option>
                      <option value="Sri Lanka">Sri Lanka</option>
                      <option value="Sweden">Sweden</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="Taiwan">Taiwan</option>
                      <option value="Thailand">Thailand</option>
                      <option value="Tunisia">Tunisia</option>
                      <option value="Turkey">Turkey</option>
                      <option value="Ukraine">Ukraine</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Uruguay">Uruguay</option>
                      <option value="Uzbekistan">Uzbekistan</option>
                      <option value="Vatican City">Vatican City</option>
                      <option value="Vietnam">Vietnam</option>
                    </select>
                  </div>

                  <div className="mt-6 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleInputChange}
                        required
                        className="mt-1 w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">
                        I accept the <a href="/terms" className="text-primary-600 hover:underline" target="_blank">Terms and Conditions</a> and <a href="/privacy" className="text-primary-600 hover:underline" target="_blank">Privacy Policy</a> *
                      </span>
                    </label>
                  </div>

                  <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <FaLock className="text-green-600" />
                    <span>256-bit SSL Encrypted Payment</span>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    currentStep === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  disabled={currentStep === 1}
                >
                  <FaArrowLeft className="inline mr-2" />
                  Previous
                </button>

                {currentStep < 3 ? (
                  <button
                    onClick={nextStep}
                    disabled={
                      (currentStep === 1 && !isStep1Valid()) ||
                      (currentStep === 2 && !isStep2Valid())
                    }
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      ((currentStep === 1 && !isStep1Valid()) || (currentStep === 2 && !isStep2Valid()))
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800'
                    }`}
                  >
                    Next
                    <FaArrowRight className="inline ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={handleBookingSubmit}
                    disabled={isSubmitting || !isStep3Valid()}
                    className={`px-8 py-3 rounded-lg font-medium transition-all ${
                      (isSubmitting || !isStep3Valid())
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800'
                    }`}
                  >
                    {isSubmitting ? 'Processing...' : 'Complete Booking'}
                  </button>
                )}
                {error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-semibold mb-4">{t.booking.summary.title}</h3>

              {selectedRoom && (
                <div className="mb-6">
                  <div className="relative h-40 rounded-lg overflow-hidden mb-3">
                    <Image
                      src={roomsInfo[selectedRoom].image}
                      alt={roomsInfo[selectedRoom].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="font-semibold">{roomsInfo[selectedRoom].name}</h4>
                  <p className="text-primary-600 font-bold">€{roomsInfo[selectedRoom].price}/night</p>
                </div>
              )}

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t.booking.summary.checkIn}:</span>
                  <span className="font-medium">{formData.checkIn || 'Not selected'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t.booking.summary.checkOut}:</span>
                  <span className="font-medium">{formData.checkOut || 'Not selected'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t.booking.summary.nights}:</span>
                  <span className="font-medium">{nights}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t.booking.summary.guests}:</span>
                  <span className="font-medium">
                    {formData.adults} Adults{formData.children !== '0' && `, ${formData.children} Children`}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t.booking.summary.subtotal}:</span>
                  <span className="font-medium">€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t.booking.summary.taxes}:</span>
                  <span className="font-medium">€{taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-3">
                  <span>{t.booking.summary.total}:</span>
                  <span className="text-primary-600">€{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 p-3 bg-green-50 rounded-lg">
                <p className="text-green-800 text-sm">
                  <FaCheck className="inline mr-2" />
                  Free cancellation up to 24 hours before check-in
                </p>
              </div>
            </div>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
}

export default function Booking() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>}>
      <BookingContent />
    </Suspense>
  );
}