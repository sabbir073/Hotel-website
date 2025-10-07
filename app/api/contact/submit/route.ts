import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { sendEmail } from '@/lib/email';
import { contactConfirmationTemplate } from '@/lib/email-templates/contact-confirmation';

// Verify reCAPTCHA token
async function verifyRecaptcha(token: string, isDevelopment: boolean = false): Promise<{ success: boolean; error?: string }> {
  try {
    if (!process.env.RECAPTCHA_SECRET_KEY) {
      return { success: false, error: 'Server configuration error' };
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const data = await response.json();

    if (!data.success) {
      const errorCodes = data['error-codes'] || [];
      const errorCodesStr = errorCodes.join(', ');

      // In development, if the only error is hostname mismatch, allow it
      if (isDevelopment && errorCodes.includes('hostname-mismatch')) {
        return { success: true };
      }

      return { success: false, error: errorCodesStr || 'Unknown error' };
    }

    // For v3, check score (0.0 - 1.0, where 1.0 is very likely a good interaction)
    if (data.score !== undefined && data.score < 0.3) {
      return { success: false, error: `Low score: ${data.score}` };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
}

// Get client IP address
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip'); // Cloudflare
  const xClientIp = request.headers.get('x-client-ip');

  // Try different headers in order of preference
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  if (realIp) {
    return realIp;
  }

  if (xClientIp) {
    return xClientIp;
  }

  return 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, passport, subject, message, recaptchaToken, clientIp: providedIp } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Name, email, subject, and message are required' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification required' },
        { status: 400 }
      );
    }

    const isDevelopment = process.env.NODE_ENV === 'development';
    const recaptchaResult = await verifyRecaptcha(recaptchaToken, isDevelopment);

    if (!recaptchaResult.success) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      );
    }

    // Get client IP - prefer client-provided IP (from ipify), fallback to headers
    let clientIp = providedIp || getClientIp(request);

    // If still unknown or localhost, it's a development environment
    if (!clientIp || clientIp === 'unknown' || clientIp === '::1' || clientIp === '127.0.0.1') {
      clientIp = providedIp || 'localhost';
    }

    // Insert into database
    await query(
      `INSERT INTO contact_submissions
       (name, email, phone, passport, subject, message, ip_address)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone || null, passport || null, subject, message, clientIp]
    );

    // Send confirmation email to user
    await sendEmail({
      to: email,
      subject: contactConfirmationTemplate(name).subject,
      html: contactConfirmationTemplate(name).html,
      text: contactConfirmationTemplate(name).text,
    });

    return NextResponse.json({
      success: true,
      message: 'Your message has been received. We will get back to you soon!',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit contact form. Please try again later.' },
      { status: 500 }
    );
  }
}
