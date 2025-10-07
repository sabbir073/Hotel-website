import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

// PUT - Update user
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { username, email, password, full_name, status } = await request.json();
    const { id: userId } = await params;

    // Validate required fields
    if (!username || !email || !full_name) {
      return NextResponse.json({ error: 'Username, email, and full name are required' }, { status: 400 });
    }

    // Check if username or email already exists (excluding current user)
    const existingUsers = await query<any[]>(
      'SELECT id FROM admin_users WHERE (username = ? OR email = ?) AND id != ?',
      [username, email, userId]
    );

    if (existingUsers.length > 0) {
      return NextResponse.json({ error: 'Username or email already exists' }, { status: 400 });
    }

    // Update user (with or without password)
    if (password) {
      const hashedPassword = hashPassword(password);
      await query(
        'UPDATE admin_users SET username = ?, email = ?, password = ?, full_name = ?, status = ? WHERE id = ?',
        [username, email, hashedPassword, full_name, status || 'active', userId]
      );
    } else {
      await query(
        'UPDATE admin_users SET username = ?, email = ?, full_name = ?, status = ? WHERE id = ?',
        [username, email, full_name, status || 'active', userId]
      );
    }

    return NextResponse.json({ message: 'User updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

// DELETE - Delete user
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: userId } = await params;

    // Prevent deleting own account
    if ((session.user as any).id === userId) {
      return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 });
    }

    // Delete user
    await query('DELETE FROM admin_users WHERE id = ?', [userId]);

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
