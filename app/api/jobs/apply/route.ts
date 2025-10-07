import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import { Client } from 'basic-ftp';
import { sendEmail } from '@/lib/email';
import { jobApplicationConfirmationTemplate } from '@/lib/email-templates/job-application-confirmation';

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

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const jobId = formData.get('jobId') as string;
    const jobTitle = formData.get('jobTitle') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const passport = formData.get('passport') as string;
    const experience = formData.get('experience') as string;
    const coverLetter = formData.get('coverLetter') as string;
    const resume = formData.get('resume') as File;
    const clientIp = formData.get('clientIp') as string || getClientIp(request);

    // Validate required fields
    if (!jobId || !jobTitle || !firstName || !lastName || !email || !phone || !passport || !experience || !resume) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // Validate resume file type (PDF only)
    if (!resume.type.includes('pdf')) {
      return NextResponse.json(
        { error: 'Only PDF files are accepted for resume' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (resume.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Resume file size must be less than 5MB' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const fileExtension = resume.name.substring(resume.name.lastIndexOf('.'));
    const uniqueFilename = `${uuidv4()}${fileExtension}`;

    // Convert file to buffer
    const bytes = await resume.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to cPanel via FTP
    const client = new Client();
    client.ftp.verbose = true; // Enable verbose for debugging

    try {
      await client.access({
        host: process.env.FTP_HOST || '',
        port: parseInt(process.env.FTP_PORT || '21'),
        user: process.env.FTP_USER || '',
        password: process.env.FTP_PASSWORD || '',
        secure: false
      });

      // Ensure binary mode for PDF files
      client.ftp.encoding = 'binary';

      // Navigate to the uploads directory
      await client.cd(process.env.FTP_UPLOAD_PATH || '/');

      // Upload file - save to temp file first to ensure proper binary transfer
      const fs = await import('fs');
      const path = await import('path');
      const os = await import('os');

      const tempPath = path.join(os.tmpdir(), uniqueFilename);
      fs.writeFileSync(tempPath, buffer);

      await client.uploadFrom(tempPath, uniqueFilename);

      // Clean up temp file
      fs.unlinkSync(tempPath);

      client.close();
    } catch (ftpError) {
      client.close();
      return NextResponse.json(
        { error: 'Failed to upload resume to server' },
        { status: 500 }
      );
    }

    // Store URL path in database using FTP public URL
    const resumePath = `${process.env.FTP_PUBLIC_URL || 'https://file.theatrehoteldoo.com/uploads'}/${uniqueFilename}`;

    // Insert application into database
    const result: any = await query(
      `INSERT INTO job_applications
       (job_id, job_title, first_name, last_name, email, phone, passport, experience, cover_letter, resume_path, resume_original_name, ip_address, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        jobId,
        jobTitle,
        firstName,
        lastName,
        email,
        phone,
        passport,
        experience,
        coverLetter || null,
        resumePath,
        resume.name,
        clientIp
      ]
    );

    const applicationId = result.insertId;

    // Send confirmation email to applicant
    try {
      const emailTemplate = jobApplicationConfirmationTemplate({
        firstName,
        lastName,
        jobTitle,
        email,
        phone,
        experience,
        applicationId
      });

      await sendEmail({
        to: email,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text,
      });
    } catch (emailError) {
      // Don't fail the application if email fails
    }

    return NextResponse.json({
      success: true,
      applicationId,
      message: 'Your application has been submitted successfully!'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again later.' },
      { status: 500 }
    );
  }
}
