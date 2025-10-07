import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

// GET - Get all users
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const users = await query<any[]>(
      'SELECT id, username, email, full_name, status, created_at, last_login FROM admin_users ORDER BY created_at DESC'
    );

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST - Create new user
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { username, email, password, full_name } = await request.json();

    // Validate required fields
    if (!username || !email || !password || !full_name) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Check if username or email already exists
    const existingUsers = await query<any[]>(
      'SELECT id FROM admin_users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existingUsers.length > 0) {
      return NextResponse.json({ error: 'Username or email already exists' }, { status: 400 });
    }

    // Hash password and insert user
    const hashedPassword = hashPassword(password);
    await query(
      'INSERT INTO admin_users (username, email, password, full_name) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, full_name]
    );

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
