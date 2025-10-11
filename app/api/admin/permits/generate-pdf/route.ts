import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { query } from '@/lib/db';
import puppeteer from 'puppeteer';
import { generateWorkPermitHTML } from '@/lib/pdf-templates/work-permit-template';
import { Client } from 'basic-ftp';
import path from 'path';
import fs from 'fs';
import os from 'os';

export async function POST(request: Request) {
  let browser = null;
  let tempFilePath = '';

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { permitId } = await request.json();

    if (!permitId) {
      return NextResponse.json(
        { error: 'Permit ID is required' },
        { status: 400 }
      );
    }

    // Fetch permit data
    const permits = await query(
      `SELECT * FROM work_permits WHERE id = ?`,
      [permitId]
    );

    if (!Array.isArray(permits) || permits.length === 0) {
      return NextResponse.json(
        { error: 'Permit not found' },
        { status: 404 }
      );
    }

    const permit = permits[0];

    // Generate HTML
    const html = generateWorkPermitHTML(permit);

    // Launch Puppeteer
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm',
      },
    });

    await browser.close();
    browser = null;

    // Save to temporary file
    const filename = `permit_${permit.license_number}.pdf`;
    tempFilePath = path.join(os.tmpdir(), filename);
    fs.writeFileSync(tempFilePath, pdfBuffer);

    // Upload to FTP
    const client = new Client();
    client.ftp.verbose = false;

    try {
      await client.access({
        host: process.env.FTP_HOST!,
        port: parseInt(process.env.FTP_PORT || '21'),
        user: process.env.FTP_USER!,
        password: process.env.FTP_PASSWORD!,
        secure: false,
      });

      // Use PDF_UPLOAD_PATH from env (e.g., /pdf)
      const pdfUploadPath = process.env.PDF_UPLOAD_PATH || '/pdf';
      try {
        await client.ensureDir(pdfUploadPath);
      } catch (e) {
        // Directory might already exist
      }

      // Upload file
      const remotePath = `${pdfUploadPath}/${filename}`;
      await client.uploadFrom(tempFilePath, remotePath);

      client.close();

      // Update database with file path
      // FTP_PUBLIC_URL is like: https://file.theatrehoteldoo.com/uploads
      // PDF_UPLOAD_PATH is like: /pdf
      // Result: https://file.theatrehoteldoo.com/uploads/pdf/permit_xxx.pdf
      const baseUrl = process.env.FTP_PUBLIC_URL || 'https://file.theatrehoteldoo.com/uploads';
      const publicUrl = `${baseUrl}${pdfUploadPath}/${filename}`;
      await query(
        `UPDATE work_permits SET pdf_file_path = ?, pdf_public_url = ? WHERE id = ?`,
        [remotePath, publicUrl, permitId]
      );

      // Clean up temp file
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }

      return NextResponse.json({
        success: true,
        pdfUrl: publicUrl,
        filename: filename,
      });
    } catch (ftpError) {
      console.error('FTP Error:', ftpError);
      client.close();

      // If FTP fails, return the PDF directly for download
      return new NextResponse(Buffer.from(pdfBuffer), {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      });
    }
  } catch (error) {
    console.error('Error generating PDF:', error);

    if (browser) {
      await browser.close();
    }

    if (tempFilePath && fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }

    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const permitId = searchParams.get('permitId');

    if (!permitId) {
      return NextResponse.json(
        { error: 'Permit ID is required' },
        { status: 400 }
      );
    }

    // Fetch permit data
    const permits = await query(
      `SELECT * FROM work_permits WHERE id = ?`,
      [permitId]
    );

    if (!Array.isArray(permits) || permits.length === 0) {
      return NextResponse.json(
        { error: 'Permit not found' },
        { status: 404 }
      );
    }

    const permit = permits[0];

    // If PDF already exists, return the URL
    if (permit.pdf_public_url) {
      return NextResponse.json({
        success: true,
        pdfUrl: permit.pdf_public_url,
        filename: `permit_${permit.license_number}.pdf`,
      });
    }

    return NextResponse.json(
      { error: 'PDF not generated yet' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch PDF' },
      { status: 500 }
    );
  }
}

// DELETE - Delete PDF file from FTP server
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const permitId = searchParams.get('permitId');

    if (!permitId) {
      return NextResponse.json(
        { error: 'Permit ID is required' },
        { status: 400 }
      );
    }

    // Fetch permit data to get PDF path
    const permits = await query(
      `SELECT pdf_file_path, license_number FROM work_permits WHERE id = ?`,
      [permitId]
    );

    if (!Array.isArray(permits) || permits.length === 0) {
      return NextResponse.json(
        { error: 'Permit not found' },
        { status: 404 }
      );
    }

    const permit = permits[0];

    // If no PDF exists, return success
    if (!permit.pdf_file_path) {
      return NextResponse.json({
        success: true,
        message: 'No PDF to delete'
      });
    }

    // Delete from FTP
    const client = new Client();
    client.ftp.verbose = false;

    try {
      await client.access({
        host: process.env.FTP_HOST!,
        port: parseInt(process.env.FTP_PORT || '21'),
        user: process.env.FTP_USER!,
        password: process.env.FTP_PASSWORD!,
        secure: false,
      });

      // Delete the file
      await client.remove(permit.pdf_file_path);
      client.close();

      // Update database to clear PDF paths
      await query(
        `UPDATE work_permits SET pdf_file_path = NULL, pdf_public_url = NULL WHERE id = ?`,
        [permitId]
      );

      return NextResponse.json({
        success: true,
        message: 'PDF deleted successfully'
      });
    } catch (ftpError) {
      console.error('FTP Delete Error:', ftpError);
      client.close();

      // Even if FTP delete fails, clear database paths
      await query(
        `UPDATE work_permits SET pdf_file_path = NULL, pdf_public_url = NULL WHERE id = ?`,
        [permitId]
      );

      return NextResponse.json({
        success: true,
        message: 'PDF reference cleared (FTP delete failed)'
      });
    }
  } catch (error) {
    console.error('Error deleting PDF:', error);
    return NextResponse.json(
      { error: 'Failed to delete PDF' },
      { status: 500 }
    );
  }
}
