import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';

// GET - Fetch all jobs
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const jobs = await query(
      `SELECT id, title, description, department, type, location, requirements, status, created_at, updated_at
       FROM jobs
       ORDER BY created_at DESC`
    );

    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

// POST - Create new job
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, department, type, location, requirements, status } = await request.json();

    if (!title || !description || !department || !type || !location || !requirements) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Requirements should be an array, convert to JSON string
    const requirementsString = typeof requirements === 'string' ? requirements : JSON.stringify(requirements);

    const result: any = await query(
      `INSERT INTO jobs (title, description, department, type, location, requirements, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, description, department, type, location, requirementsString, status || 'active']
    );

    return NextResponse.json({
      success: true,
      jobId: result.insertId,
      message: 'Job created successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    );
  }
}

// PUT - Update job
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, title, description, department, type, location, requirements, status } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      );
    }

    // Requirements should be an array, convert to JSON string
    const requirementsString = typeof requirements === 'string' ? requirements : JSON.stringify(requirements);

    await query(
      `UPDATE jobs
       SET title = ?, description = ?, department = ?, type = ?, location = ?, requirements = ?, status = ?
       WHERE id = ?`,
      [title, description, department, type, location, requirementsString, status, id]
    );

    return NextResponse.json({
      success: true,
      message: 'Job updated successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update job' },
      { status: 500 }
    );
  }
}

// DELETE - Delete job
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      );
    }

    await query(`DELETE FROM jobs WHERE id = ?`, [id]);

    return NextResponse.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete job' },
      { status: 500 }
    );
  }
}
