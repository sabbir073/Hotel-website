export const contactConfirmationTemplate = (name: string) => {
  return {
    subject: 'Thank You for Contacting THEATRE HOTEL d.o.o.',
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Contact Confirmation - THEATRE HOTEL d.o.o.</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">THEATRE HOTEL d.o.o.</h1>
                            <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 16px;">Split, Croatia</p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 20px 0; color: #1e3a8a; font-size: 24px;">Thank You for Reaching Out!</h2>

                            <p style="margin: 0 0 15px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                                Dear ${name},
                            </p>

                            <p style="margin: 0 0 15px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                                We have received your inquiry and want to thank you for contacting THEATRE HOTEL d.o.o.
                            </p>

                            <p style="margin: 0 0 15px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                                Our team is reviewing your message and will respond to you as soon as possible, typically within 24 hours during business days.
                            </p>

                            <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 25px 0;">
                                <p style="margin: 0; color: #1e40af; font-size: 14px; line-height: 1.6;">
                                    <strong>Need immediate assistance?</strong><br>
                                    Please call us at: <a href="tel:021655961" style="color: #3b82f6; text-decoration: none;">021655961</a> or <a href="tel:+385924512500" style="color: #3b82f6; text-decoration: none;">+385 92 451 2500</a>
                                </p>
                            </div>

                            <p style="margin: 0 0 15px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                                We look forward to welcoming you to our hotel and providing you with an exceptional experience in the heart of Split.
                            </p>

                            <p style="margin: 25px 0 0 0; color: #374151; font-size: 16px; line-height: 1.6;">
                                Warm regards,<br>
                                <strong style="color: #1e3a8a;">The THEATRE HOTEL Team</strong>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                                <strong>THEATRE HOTEL d.o.o.</strong>
                            </p>
                            <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 13px;">
                                Matošića 21, 21000, Split, Croatia
                            </p>
                            <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 13px;">
                                Phone: 021655961 | +385 92 451 2500<br>
                                Email: <a href="mailto:info@theatrehoteldoo.com" style="color: #3b82f6; text-decoration: none;">info@theatrehoteldoo.com</a><br>
                                Website: <a href="https://theatrehoteldoo.com" style="color: #3b82f6; text-decoration: none;">www.theatrehoteldoo.com</a>
                            </p>
                            <p style="margin: 15px 0 0 0; color: #9ca3af; font-size: 11px;">
                                This is an automated confirmation email. Please do not reply to this message.<br>
                                If you did not submit this inquiry, please contact us immediately.
                            </p>
                            <p style="margin: 10px 0 0 0; color: #9ca3af; font-size: 12px;">
                                &copy; All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `,
    text: `Dear ${name},

We have received your inquiry and want to thank you for contacting THEATRE HOTEL d.o.o.

Our team is reviewing your message and will respond to you as soon as possible, typically within 24 hours during business days.

Need immediate assistance? Please call us at: 021655961 or +385 92 451 2500

We look forward to welcoming you to our hotel and providing you with an exceptional experience in the heart of Split.

Warm regards,
The THEATRE HOTEL Team

---
THEATRE HOTEL d.o.o.
Matošića 21, 21000, Split, Croatia
Phone: 021655961 | +385 92 451 2500
Email: info@theatrehoteldoo.com
Website: www.theatrehoteldoo.com

© All rights reserved.`
  };
};
