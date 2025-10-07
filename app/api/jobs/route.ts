import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET - Fetch all active jobs (public endpoint)
export async function GET() {
  try {
    const jobs = await query(
      `SELECT id, title, description, department, type, location, requirements
       FROM jobs
       WHERE status = 'active'
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
