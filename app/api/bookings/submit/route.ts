import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { sendEmail } from '@/lib/email';
import { bookingConfirmationTemplate } from '@/lib/email-templates/booking-confirmation';

// Get client IP address
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  if (realIp) {
    return realIp;
  }

  return 'unknown';
}

// Detect card type from card number
function getCardType(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\s/g, '');

  if (/^4/.test(cleaned)) {
    return 'Visa';
  } else if (/^5[1-5]/.test(cleaned)) {
    return 'Mastercard';
  } else if (/^3[47]/.test(cleaned)) {
    return 'American Express';
  } else if (/^6(?:011|5)/.test(cleaned)) {
    return 'Discover';
  }

  return 'Unknown';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      passport,
      roomType,
      checkIn,
      checkOut,
      adults,
      children,
      arrivalTime,
      specialRequests,
      totalAmount,
      cardNumber,
      cardHolder,
      cardExpiry,
      cardCvv,
      billingAddress,
      billingCity,
      billingCountry,
      billingPostalCode,
      clientIp: providedIp
    } = body;

    // Validate required fields (passport is optional)
    if (!firstName || !lastName || !email || !phone || !roomType || !checkIn || !checkOut) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // Get client IP
    let clientIp = providedIp || getClientIp(request);
    if (!clientIp || clientIp === 'unknown' || clientIp === '::1' || clientIp === '127.0.0.1') {
      clientIp = providedIp || 'localhost';
    }

    // Get card type
    const cardType = cardNumber ? getCardType(cardNumber) : null;

    // Calculate nights
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));

    // Insert into database with all payment and billing details
    const result: any = await query(
      `INSERT INTO room_bookings
       (first_name, last_name, email, phone, passport, room_type, check_in, check_out,
        adults, children, arrival_time, special_requests, total_amount,
        card_number, card_holder_name, card_expiry, card_cvv, card_type,
        billing_address, billing_city, billing_country, billing_postal_code, ip_address, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        firstName,
        lastName,
        email,
        phone,
        passport,
        roomType,
        checkIn,
        checkOut,
        adults,
        children || 0,
        arrivalTime || null,
        specialRequests || null,
        totalAmount,
        cardNumber || null,
        cardHolder || null,
        cardExpiry || null,
        cardCvv || null,
        cardType,
        billingAddress || null,
        billingCity || null,
        billingCountry || null,
        billingPostalCode || null,
        clientIp
      ]
    );

    const bookingId = result.insertId;

    // Send confirmation email
    const emailTemplate = bookingConfirmationTemplate({
      firstName,
      lastName,
      roomType,
      checkIn,
      checkOut,
      adults: parseInt(adults),
      children: parseInt(children || '0'),
      nights,
      totalAmount: parseFloat(totalAmount),
      bookingId
    });

    await sendEmail({
      to: email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text,
    });

    return NextResponse.json({
      success: true,
      bookingId,
      message: 'Your booking has been confirmed! Check your email for details.',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to complete booking. Please try again later.' },
      { status: 500 }
    );
  }
}
