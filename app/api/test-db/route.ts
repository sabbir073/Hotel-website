import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      host: process.env.DB_HOST,
      database: process.env.DB_NAME
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      host: process.env.DB_HOST
    }, { status: 500 });
  }
}
