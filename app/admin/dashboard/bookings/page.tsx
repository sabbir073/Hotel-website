'use client';

import { useState, useEffect } from 'react';
import { FaEye, FaTimes, FaUser, FaCalendarAlt, FaBed, FaCreditCard, FaMapMarkerAlt } from 'react-icons/fa';

interface Booking {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  passport: string;
  room_type: string;
  check_in: string;
  check_out: string;
  adults: number;
  children: number;
  arrival_time: string | null;
  special_requests: string | null;
  total_amount: number;
  card_number: string | null;
  card_holder_name: string | null;
  card_expiry: string | null;
  card_cvv: string | null;
  card_type: string | null;
  billing_address: string | null;
  billing_city: string | null;
  billing_country: string | null;
  billing_postal_code: string | null;
  ip_address: string | null;
  created_at: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

export default function RoomBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/admin/bookings');
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      // Error fetching bookings
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const response = await fetch('/api/admin/bookings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        fetchBookings();
      }
    } catch (error) {
      // Error updating status
    }
  };

  const handleViewClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowViewModal(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getRoomName = (roomType: string) => {
    const names: Record<string, string> = {
      standard: 'Standard Room',
      deluxe: 'Deluxe Room',
      suite: 'Executive Suite',
      presidential: 'Presidential Suite'
    };
    return names[roomType] || roomType;
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Room Bookings</h1>
        <p className="text-gray-600 mt-2">Manage hotel room reservations</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Guest Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check-in
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check-out
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                      No bookings yet
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        #{booking.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {booking.first_name} {booking.last_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getRoomName(booking.room_type)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(booking.check_in)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(booking.check_out)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary-600">
                        €{parseFloat(booking.total_amount.toString()).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {getStatusBadge(booking.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewClick(booking)}
                          className="text-primary-600 hover:text-primary-900 mr-3"
                          title="View Details"
                        >
                          <FaEye className="inline" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Booking Details #{selectedBooking.id}</h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Header Info */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Booking ID</label>
                  <p className="text-lg font-semibold text-gray-900">#{selectedBooking.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Booking Date</label>
                  <p className="text-lg font-semibold text-gray-900">{formatDateTime(selectedBooking.created_at)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-2">Status</label>
                  <select
                    value={selectedBooking.status}
                    onChange={(e) => {
                      updateStatus(selectedBooking.id, e.target.value);
                      setSelectedBooking({ ...selectedBooking, status: e.target.value as any });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <hr />

              {/* Guest Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Guest Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                    <p className="text-gray-900">{selectedBooking.first_name} {selectedBooking.last_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-gray-900">
                      <a href={`mailto:${selectedBooking.email}`} className="text-primary-600 hover:underline">
                        {selectedBooking.email}
                      </a>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-gray-900">
                      <a href={`tel:${selectedBooking.phone}`} className="text-primary-600 hover:underline">
                        {selectedBooking.phone}
                      </a>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Passport Number</label>
                    <p className="text-gray-900 font-mono">{selectedBooking.passport}</p>
                  </div>
                  {selectedBooking.ip_address && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">IP Address</label>
                      <p className="text-gray-900 font-mono">{selectedBooking.ip_address}</p>
                    </div>
                  )}
                </div>
              </div>

              <hr />

              {/* Booking Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Room Type</label>
                    <p className="text-gray-900 font-semibold">{getRoomName(selectedBooking.room_type)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Guests</label>
                    <p className="text-gray-900">{selectedBooking.adults} Adult{selectedBooking.adults > 1 ? 's' : ''}{selectedBooking.children > 0 ? `, ${selectedBooking.children} Child${selectedBooking.children > 1 ? 'ren' : ''}` : ''}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Check-in Date</label>
                    <p className="text-gray-900">{formatDate(selectedBooking.check_in)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Check-out Date</label>
                    <p className="text-gray-900">{formatDate(selectedBooking.check_out)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Number of Nights</label>
                    <p className="text-gray-900">{calculateNights(selectedBooking.check_in, selectedBooking.check_out)}</p>
                  </div>
                  {selectedBooking.arrival_time && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Estimated Arrival Time</label>
                      <p className="text-gray-900">{selectedBooking.arrival_time}</p>
                    </div>
                  )}
                </div>

                {selectedBooking.special_requests && (
                  <div className="mt-4">
                    <label className="text-sm font-medium text-gray-500 block mb-2">Special Requests</label>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-900 whitespace-pre-wrap">{selectedBooking.special_requests}</p>
                    </div>
                  </div>
                )}
              </div>

              <hr />

              {/* Payment Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  {selectedBooking.card_holder_name && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Card Holder Name</label>
                      <p className="text-gray-900">{selectedBooking.card_holder_name}</p>
                    </div>
                  )}
                  {selectedBooking.card_type && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Card Type</label>
                      <p className="text-gray-900">{selectedBooking.card_type}</p>
                    </div>
                  )}
                  {selectedBooking.card_number && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Card Number</label>
                      <p className="text-gray-900 font-mono">{selectedBooking.card_number}</p>
                    </div>
                  )}
                  {selectedBooking.card_expiry && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Expiry Date</label>
                      <p className="text-gray-900 font-mono">{selectedBooking.card_expiry}</p>
                    </div>
                  )}
                  {selectedBooking.card_cvv && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">CVV</label>
                      <p className="text-gray-900 font-mono">{selectedBooking.card_cvv}</p>
                    </div>
                  )}
                </div>

                {(selectedBooking.billing_address || selectedBooking.billing_city || selectedBooking.billing_country || selectedBooking.billing_postal_code) && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Billing Address</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedBooking.billing_address && (
                        <div className="col-span-2">
                          <label className="text-sm font-medium text-gray-500">Street Address</label>
                          <p className="text-gray-900">{selectedBooking.billing_address}</p>
                        </div>
                      )}
                      {selectedBooking.billing_city && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">City</label>
                          <p className="text-gray-900">{selectedBooking.billing_city}</p>
                        </div>
                      )}
                      {selectedBooking.billing_postal_code && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Postal Code</label>
                          <p className="text-gray-900">{selectedBooking.billing_postal_code}</p>
                        </div>
                      )}
                      {selectedBooking.billing_country && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Country</label>
                          <p className="text-gray-900">{selectedBooking.billing_country}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t">
                  <label className="text-sm font-medium text-gray-500">Total Amount</label>
                  <p className="text-2xl font-bold text-primary-600">€{parseFloat(selectedBooking.total_amount.toString()).toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <a
                href={`mailto:${selectedBooking.email}?subject=Booking%20${selectedBooking.id}%20-%20THEATRE%20HOTEL`}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Email Guest
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
