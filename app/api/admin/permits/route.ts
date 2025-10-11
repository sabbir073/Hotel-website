import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';

// GET - Fetch all permits
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const permits = await query(
      `SELECT id, license_number, date_of_issue, valid_from, valid_until,
              employee_name, employee_address, date_of_birth, passport_number,
              passport_issued_in, citizenship, company_name, company_address,
              mbs, oib, occupation, salary, email, contract_no,
              pdf_file_path, pdf_public_url, created_at, updated_at
       FROM work_permits
       ORDER BY created_at DESC`
    );

    return NextResponse.json(permits);
  } catch (error) {
    console.error('Error fetching permits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch permits' },
      { status: 500 }
    );
  }
}

// POST - Create new permit
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    // Validate required fields
    const requiredFields = [
      'license_number', 'date_of_issue', 'valid_from', 'valid_until',
      'employee_name', 'employee_address', 'date_of_birth', 'passport_number',
      'passport_issued_in', 'citizenship', 'occupation', 'salary'
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const result = await query(
      `INSERT INTO work_permits (
        license_number, date_of_issue, valid_from, valid_until,
        employee_name, employee_address, date_of_birth, passport_number,
        passport_issued_in, citizenship, company_name, company_address,
        mbs, oib, occupation, salary, email, contract_no, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.license_number,
        data.date_of_issue,
        data.valid_from,
        data.valid_until,
        data.employee_name,
        data.employee_address,
        data.date_of_birth,
        data.passport_number,
        data.passport_issued_in,
        data.citizenship,
        data.company_name || 'THEATRE HOTEL d.o.o.',
        data.company_address || 'Matošića 21, 21000, Split, Hrvatska',
        data.mbs || '060416714',
        data.oib || '13682410736',
        data.occupation,
        data.salary,
        data.email || null,
        data.contract_no || null,
        session.user?.email
      ]
    );

    return NextResponse.json({
      success: true,
      id: (result as any).insertId
    });
  } catch (error: any) {
    console.error('Error creating permit:', error);

    // Handle duplicate license number
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { error: 'License number already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create permit' },
      { status: 500 }
    );
  }
}

// PUT - Update permit
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    if (!data.id) {
      return NextResponse.json(
        { error: 'Permit ID is required' },
        { status: 400 }
      );
    }

    await query(
      `UPDATE work_permits SET
        license_number = ?,
        date_of_issue = ?,
        valid_from = ?,
        valid_until = ?,
        employee_name = ?,
        employee_address = ?,
        date_of_birth = ?,
        passport_number = ?,
        passport_issued_in = ?,
        citizenship = ?,
        company_name = ?,
        company_address = ?,
        mbs = ?,
        oib = ?,
        occupation = ?,
        salary = ?,
        email = ?,
        contract_no = ?
      WHERE id = ?`,
      [
        data.license_number,
        data.date_of_issue,
        data.valid_from,
        data.valid_until,
        data.employee_name,
        data.employee_address,
        data.date_of_birth,
        data.passport_number,
        data.passport_issued_in,
        data.citizenship,
        data.company_name,
        data.company_address,
        data.mbs,
        data.oib,
        data.occupation,
        data.salary,
        data.email || null,
        data.contract_no || null,
        data.id
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error updating permit:', error);

    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { error: 'License number already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update permit' },
      { status: 500 }
    );
  }
}

// DELETE - Delete permit
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
        { error: 'Permit ID is required' },
        { status: 400 }
      );
    }

    await query('DELETE FROM work_permits WHERE id = ?', [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting permit:', error);
    return NextResponse.json(
      { error: 'Failed to delete permit' },
      { status: 500 }
    );
  }
}
