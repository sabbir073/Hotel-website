interface ApplicationDetails {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  experience: string;
  applicationId: number;
}

export const jobApplicationConfirmationTemplate = (details: ApplicationDetails) => {
  const subject = `Application Received - ${details.jobTitle} - THEATRE HOTEL d.o.o.`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">THEATRE HOTEL d.o.o.</h1>
              <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 16px;">Application Received</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">

              <div style="text-align: center; margin-bottom: 30px;">
                <div style="display: inline-block; background-color: #10b981; border-radius: 50%; padding: 15px; margin-bottom: 20px;">
                  <span style="font-size: 40px; color: white;">✓</span>
                </div>
                <h2 style="margin: 0; color: #1f2937; font-size: 24px;">Thank You for Your Application!</h2>
              </div>

              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                Dear ${details.firstName} ${details.lastName},
              </p>

              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                We have successfully received your application for the position of <strong>${details.jobTitle}</strong>.
                Thank you for your interest in joining the THEATRE HOTEL d.o.o. team!
              </p>

              <!-- Application Details Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 25px;">
                    <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px;">Application Summary</h3>

                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td style="color: #6b7280; font-size: 14px; padding: 8px 0;">Application ID:</td>
                        <td style="color: #1f2937; font-size: 14px; font-weight: bold; padding: 8px 0;">#${details.applicationId}</td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px; padding: 8px 0;">Position:</td>
                        <td style="color: #1f2937; font-size: 14px; font-weight: bold; padding: 8px 0;">${details.jobTitle}</td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px; padding: 8px 0;">Email:</td>
                        <td style="color: #1f2937; font-size: 14px; padding: 8px 0;">${details.email}</td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px; padding: 8px 0;">Phone:</td>
                        <td style="color: #1f2937; font-size: 14px; padding: 8px 0;">${details.phone}</td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px; padding: 8px 0;">Experience:</td>
                        <td style="color: #1f2937; font-size: 14px; padding: 8px 0;">${details.experience} years</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <h3 style="color: #1f2937; font-size: 18px; margin: 25px 0 15px 0;">What Happens Next?</h3>

              <ul style="color: #4b5563; font-size: 15px; line-height: 1.8; padding-left: 20px; margin: 0 0 25px 0;">
                <li>Our HR team will carefully review your application and resume</li>
                <li>If your qualifications match our requirements, we will contact you for an interview</li>
                <li>The review process typically takes 5-7 business days</li>
                <li>Please keep an eye on your email inbox (and spam folder)</li>
              </ul>

              <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px; margin-bottom: 25px; border-radius: 4px;">
                <p style="margin: 0; color: #1e40af; font-size: 14px; line-height: 1.6;">
                  <strong>Important:</strong> Please do not reply to this email. If you have any questions about your application,
                  please contact us at <a href="mailto:careers@theatrehoteldoo.com" style="color: #1e40af; text-decoration: underline;">careers@theatrehoteldoo.com</a>
                </p>
              </div>

              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 5px;">
                Best regards,
              </p>
              <p style="color: #1f2937; font-size: 16px; font-weight: bold; margin: 0;">
                Human Resources Team<br>
                THEATRE HOTEL d.o.o.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                THEATRE HOTEL d.o.o.<br>
                Split, Croatia
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                © All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const text = `
THEATRE HOTEL d.o.o.
Application Received

Dear ${details.firstName} ${details.lastName},

We have successfully received your application for the position of ${details.jobTitle}.
Thank you for your interest in joining the THEATRE HOTEL d.o.o. team!

Application Summary:
- Application ID: #${details.applicationId}
- Position: ${details.jobTitle}
- Email: ${details.email}
- Phone: ${details.phone}
- Experience: ${details.experience} years

What Happens Next?
- Our HR team will carefully review your application and resume
- If your qualifications match our requirements, we will contact you for an interview
- The review process typically takes 5-7 business days
- Please keep an eye on your email inbox (and spam folder)

Important: Please do not reply to this email. If you have any questions about your application,
please contact us at careers@theatrehoteldoo.com

Best regards,
Human Resources Team
THEATRE HOTEL d.o.o.

---
THEATRE HOTEL d.o.o.
Split, Croatia

© All rights reserved.
  `;

  return { subject, html, text };
};
