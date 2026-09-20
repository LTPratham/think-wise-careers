import { Resend } from 'resend';

// We now use the Admissions API key as our Master Key since the domain thinkwisecareers.com is verified on it.
const resend = process.env.RESEND_API_KEY_ADMISSIONS ? new Resend(process.env.RESEND_API_KEY_ADMISSIONS) : null;

export async function sendLeadNotificationEmail(leadData: any) {
  if (!resend) {
    console.warn(`[Resend] Missing Master API key (RESEND_API_KEY_ADMISSIONS)`);
    return;
  }

  try {
    let targetEmail = 'admissions@thinkwisecareers.com';
    let department = "Admissions";

    if (leadData.serviceInterest === 'Career Counselling') {
      targetEmail = 'counselling@thinkwisecareers.com';
      department = "Counselling";
    }

    // 1. Send internal alert to the team
    await resend.emails.send({
      from: 'Admissions <admissions@thinkwisecareers.com>',
      to: targetEmail,
      subject: `New Lead (${department}): ${leadData.name} - ${leadData.serviceInterest || 'General Enquiry'}`,
      html: `
        <h2>New Lead Submitted!</h2>
        <p><strong>Name:</strong> ${leadData.name}</p>
        <p><strong>Phone:</strong> ${leadData.phone}</p>
        <p><strong>Email:</strong> ${leadData.email || 'N/A'}</p>
        <p><strong>Service Interest:</strong> ${leadData.serviceInterest || 'N/A'}</p>
        <p><strong>Source Page:</strong> ${leadData.sourcePage || 'N/A'}</p>
        <p><strong>Message:</strong> ${leadData.message || 'N/A'}</p>
        <br/>
        <p>View this lead in the Admin Dashboard: <a href="https://thinkwisecareers.com/admin/leads">thinkwisecareers.com/admin/leads</a></p>
      `
    });
    console.log(`[Resend] Lead internal alert sent to ${targetEmail}`);

    // 2. Send auto-reply to the student (if they provided a real email)
    if (leadData.email && leadData.email !== "no-email@example.com") {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thinkwisecareers.com";
      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917300036507";
      const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi%20Think%20Wise%20Careers,%20I%20just%20submitted%20an%20enquiry%20for%20${encodeURIComponent(leadData.serviceInterest || 'Consultation')}.%20Can%20we%20connect?`;

      await resend.emails.send({
        from: 'Think Wise Careers <admissions@thinkwisecareers.com>',
        to: leadData.email,
        subject: `We've Received Your Enquiry – Think Wise Careers`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
                    
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 36px 32px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 700; letter-spacing: -0.5px;">Think Wise Careers</h1>
                        <p style="color: #bfdbfe; margin: 8px 0 0 0; font-size: 14px; font-weight: 500;">Your Gateway to Global Education</p>
                      </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                      <td style="padding: 36px 32px;">
                        <h2 style="margin: 0 0 16px 0; font-size: 20px; color: #0f172a; font-weight: 600;">Hello ${leadData.name},</h2>
                        <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #334155;">
                          Thank you for reaching out to <strong>Think Wise Careers</strong>. We have successfully received your enquiry regarding <strong>${leadData.serviceInterest || 'our educational programs'}</strong>.
                        </p>
                        <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #334155;">
                          Our expert academic counselling team has already been notified and is currently reviewing your profile. A senior counsellor will connect with you directly at <strong>${leadData.phone}</strong> to guide you through university options, eligibility, scholarships, and admissions.
                        </p>

                        <!-- Highlight Box -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 8px; margin-bottom: 28px;">
                          <tr>
                            <td style="padding: 16px 20px;">
                              <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #1e40af; font-weight: 500;">
                                💡 <strong>Need faster assistance?</strong> You don't have to wait! You can instantly schedule a dedicated consultation slot or chat with an expert counsellor right now.
                              </p>
                            </td>
                          </tr>
                        </table>

                        <!-- CTA Buttons -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
                          <tr>
                            <td align="center" style="padding-bottom: 12px;">
                              <a href="${whatsappLink}" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 15px; text-align: center; width: 80%; box-sizing: border-box;">
                                💬 Chat with Counsellor on WhatsApp
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td align="center">
                              <a href="${siteUrl}/contact" style="display: inline-block; background-color: #1e3a8a; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 15px; text-align: center; width: 80%; box-sizing: border-box;">
                                📅 Schedule a Meeting / Call
                              </a>
                            </td>
                          </tr>
                        </table>

                        <!-- Next Steps -->
                        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px;">
                          <h3 style="margin: 0 0 12px 0; font-size: 15px; color: #0f172a; font-weight: 600;">What happens next?</h3>
                          <ul style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6; color: #475569;">
                            <li style="margin-bottom: 6px;">Profile & academic eligibility assessment</li>
                            <li style="margin-bottom: 6px;">Personalized shortlisting of recognized universities & courses</li>
                            <li style="margin-bottom: 6px;">End-to-end guidance for documentation, visas, and admissions</li>
                          </ul>
                        </div>

                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #f1f5f9; padding: 24px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
                        <p style="margin: 0 0 8px 0; font-size: 13px; color: #64748b; font-weight: 500;">
                          Think Wise Careers · Jaipur, Rajasthan, India
                        </p>
                        <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                          Helpline: <a href="tel:+917300036507" style="color: #3b82f6; text-decoration: none;">+91 73000 36507</a> · 
                          <a href="${siteUrl}" style="color: #3b82f6; text-decoration: none;">thinkwisecareers.com</a>
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `
      });
      console.log(`[Resend] Enhanced auto-reply sent to student at ${leadData.email}`);
    }

  } catch (error) {
    console.error('[Resend Error]', error);
  }
}

export async function sendPartnerNotificationEmail(partnerData: any) {
  if (!resend) {
    console.warn(`[Resend] Missing Master API key (RESEND_API_KEY_ADMISSIONS)`);
    return;
  }

  try {
    // 1. Send internal alert to the team
    await resend.emails.send({
      from: 'Partnerships <admissions@thinkwisecareers.com>',
      to: 'partnerships@thinkwisecareers.com',
      subject: `New Partner Enquiry: ${partnerData.organizationName}`,
      html: `
        <h2>New Partner Enquiry Submitted!</h2>
        <p><strong>Partner Type:</strong> ${partnerData.partnerType}</p>
        <p><strong>Organization Name:</strong> ${partnerData.organizationName}</p>
        <p><strong>Contact Name:</strong> ${partnerData.contactName}</p>
        <p><strong>Contact Phone:</strong> ${partnerData.contactPhone}</p>
        <p><strong>Contact Email:</strong> ${partnerData.contactEmail}</p>
        <p><strong>Message:</strong> ${partnerData.message}</p>
      `
    });
    console.log(`[Resend] Partner internal alert sent to partnerships@thinkwisecareers.com`);

    // 2. Send auto-reply to the partner
    if (partnerData.contactEmail) {
      await resend.emails.send({
        from: 'Think Wise Careers <admissions@thinkwisecareers.com>',
        to: partnerData.contactEmail,
        subject: `Partnership Enquiry Received - Think Wise Careers`,
        html: `
          <h3>Hi ${partnerData.contactName},</h3>
          <p>Thank you for your interest in partnering with Think Wise Careers.</p>
          <p>We have received your enquiry for ${partnerData.organizationName}. Our partnerships team will review your details and get back to you shortly.</p>
          <br/>
          <p>Best Regards,</p>
          <p><strong>The Think Wise Careers Team</strong></p>
          <p><a href="https://thinkwisecareers.com">thinkwisecareers.com</a></p>
        `
      });
      console.log(`[Resend] Auto-reply sent to partner at ${partnerData.contactEmail}`);
    }

  } catch (error) {
    console.error('[Resend Error]', error);
  }
}
