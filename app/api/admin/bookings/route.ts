import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const bookings = await query(
      `SELECT id, first_name, last_name, email, phone, passport, room_type,
              check_in, check_out, adults, children, arrival_time, special_requests,
              total_amount, card_number, card_holder_name, card_expiry, card_cvv, card_type,
              billing_address, billing_city, billing_country, billing_postal_code, ip_address,
              created_at, status
       FROM room_bookings
       ORDER BY created_at DESC`
    );

    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID and status are required' },
        { status: 400 }
      );
    }

    await query(
      `UPDATE room_bookings SET status = ? WHERE id = ?`,
      [status, id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}
