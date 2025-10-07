import nodemailer from 'nodemailer';

// Create reusable transporter with SSL/TLS support
const smtpPort = parseInt(process.env.SMTP_PORT || '587');
const smtpSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: smtpPort,
  secure: smtpSecure, // true for port 465 (SSL), false for port 587 (TLS/STARTTLS)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // For self-signed certificates (cPanel often uses these)
  },
  // Anti-spam headers
  connectionTimeout: 60000, // 60 seconds
  greetingTimeout: 30000,
  socketTimeout: 60000
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || '',
      // Anti-spam headers
      headers: {
        'X-Mailer': 'THEATRE HOTEL Contact System',
        'X-Priority': '3',
        'Importance': 'normal',
        'MIME-Version': '1.0',
      },
      // Reply-To
      replyTo: process.env.SMTP_FROM,
    });

    return true;
  } catch (error) {
    return false;
  }
}

// Verify SMTP connection
export async function verifyEmailConnection(): Promise<boolean> {
  try {
    await transporter.verify();
    return true;
  } catch (error) {
    return false;
  }
}
