interface BookingDetails {
  firstName: string;
  lastName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  nights: number;
  totalAmount: number;
  bookingId: number;
}

export const bookingConfirmationTemplate = (details: BookingDetails) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const roomNames: Record<string, string> = {
    standard: 'Standard Room',
    deluxe: 'Deluxe Room',
    suite: 'Executive Suite',
    presidential: 'Presidential Suite'
  };

  return {
    subject: `Booking Confirmation #${details.bookingId} - THEATRE HOTEL d.o.o.`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Booking Confirmation - THEATRE HOTEL d.o.o.</title>
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

                    <!-- Success Message -->
                    <tr>
                        <td style="padding: 30px; text-align: center; background-color: #f0fdf4; border-bottom: 3px solid #22c55e;">
                            <div style="display: inline-block; width: 60px; height: 60px; background-color: #22c55e; border-radius: 50%; margin-bottom: 15px;">
                                <span style="font-size: 36px; line-height: 60px; color: white;">✓</span>
                            </div>
                            <h2 style="margin: 0 0 10px 0; color: #166534; font-size: 24px;">Booking Confirmed!</h2>
                            <p style="margin: 0; color: #15803d; font-size: 16px;">Confirmation #${details.bookingId}</p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                                Dear ${details.firstName} ${details.lastName},
                            </p>

                            <p style="margin: 0 0 25px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                                Thank you for choosing THEATRE HOTEL d.o.o.! We are delighted to confirm your reservation.
                            </p>

                            <!-- Booking Details -->
                            <div style="background-color: #f9fafb; border-radius: 8px; padding: 25px; margin-bottom: 25px;">
                                <h3 style="margin: 0 0 20px 0; color: #1e3a8a; font-size: 18px;">Booking Details</h3>

                                <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 40%;">Room Type:</td>
                                        <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-weight: 600;">${roomNames[details.roomType] || details.roomType}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Check-in:</td>
                                        <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-weight: 600;">${formatDate(details.checkIn)}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Check-out:</td>
                                        <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-weight: 600;">${formatDate(details.checkOut)}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Number of Nights:</td>
                                        <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-weight: 600;">${details.nights}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Guests:</td>
                                        <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-weight: 600;">${details.adults} Adult${details.adults > 1 ? 's' : ''}${details.children > 0 ? `, ${details.children} Child${details.children > 1 ? 'ren' : ''}` : ''}</td>
                                    </tr>
                                    <tr style="border-top: 2px solid #e5e7eb;">
                                        <td style="padding: 15px 0 8px 0; color: #1f2937; font-size: 16px; font-weight: 600;">Total Amount:</td>
                                        <td style="padding: 15px 0 8px 0; color: #1e3a8a; font-size: 18px; font-weight: bold;">€${details.totalAmount.toFixed(2)}</td>
                                    </tr>
                                </table>
                            </div>

                            <!-- Important Information -->
                            <div style="background-color: #eff6ff; border-left: 4px solid: #3b82f6; padding: 20px; margin-bottom: 25px;">
                                <h4 style="margin: 0 0 12px 0; color: #1e40af; font-size: 16px;">Important Information</h4>
                                <ul style="margin: 0; padding-left: 20px; color: #1e40af; font-size: 14px; line-height: 1.8;">
                                    <li>Check-in time: 2:00 PM</li>
                                    <li>Check-out time: 11:00 AM</li>
                                    <li>Please bring a valid photo ID and the credit card used for booking</li>
                                    <li>Early check-in/late check-out available upon request (subject to availability)</li>
                                </ul>
                            </div>

                            <!-- Contact Information -->
                            <div style="margin-bottom: 25px;">
                                <h4 style="margin: 0 0 15px 0; color: #1e3a8a; font-size: 16px;">Need to Make Changes?</h4>
                                <p style="margin: 0 0 10px 0; color: #374151; font-size: 14px; line-height: 1.6;">
                                    If you need to modify or cancel your reservation, please contact us:
                                </p>
                                <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6;">
                                    Phone: <a href="tel:021655961" style="color: #3b82f6; text-decoration: none;">021655961</a> or
                                    <a href="tel:+385924512500" style="color: #3b82f6; text-decoration: none;">+385 92 451 2500</a><br>
                                    Email: <a href="mailto:info@theatrehoteldoo.com" style="color: #3b82f6; text-decoration: none;">info@theatrehoteldoo.com</a>
                                </p>
                            </div>

                            <p style="margin: 25px 0 0 0; color: #374151; font-size: 16px; line-height: 1.6;">
                                We look forward to welcoming you to THEATRE HOTEL d.o.o. and making your stay in Split memorable!
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
                                This is an automated confirmation email. Please do not reply to this message.
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
    text: `Dear ${details.firstName} ${details.lastName},

Thank you for choosing THEATRE HOTEL d.o.o.! We are delighted to confirm your reservation.

BOOKING CONFIRMATION #${details.bookingId}

Booking Details:
- Room Type: ${roomNames[details.roomType] || details.roomType}
- Check-in: ${formatDate(details.checkIn)}
- Check-out: ${formatDate(details.checkOut)}
- Number of Nights: ${details.nights}
- Guests: ${details.adults} Adult${details.adults > 1 ? 's' : ''}${details.children > 0 ? `, ${details.children} Child${details.children > 1 ? 'ren' : ''}` : ''}
- Total Amount: €${details.totalAmount.toFixed(2)}

Important Information:
- Check-in time: 2:00 PM
- Check-out time: 11:00 AM
- Please bring a valid photo ID and the credit card used for booking
- Early check-in/late check-out available upon request (subject to availability)

Need to Make Changes?
If you need to modify or cancel your reservation, please contact us:
Phone: 021655961 or +385 92 451 2500
Email: info@theatrehoteldoo.com

We look forward to welcoming you to THEATRE HOTEL d.o.o. and making your stay in Split memorable!

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
