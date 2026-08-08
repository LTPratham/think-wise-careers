import { Resend } from 'resend';

// Different clients for different departments
const resendCounselling = process.env.RESEND_API_KEY_COUNSELLING ? new Resend(process.env.RESEND_API_KEY_COUNSELLING) : null;
const resendAdmissions = process.env.RESEND_API_KEY_ADMISSIONS ? new Resend(process.env.RESEND_API_KEY_ADMISSIONS) : null;
const resendPartnerships = process.env.RESEND_API_KEY_PARTNERSHIPS ? new Resend(process.env.RESEND_API_KEY_PARTNERSHIPS) : null;

export async function sendLeadNotificationEmail(leadData: any) {
  try {
    let client = resendAdmissions;
    let targetEmail = 'admissions@thinkwisecareers.com';
    let department = "Admissions";

    if (leadData.serviceInterest === 'Career Counselling') {
      client = resendCounselling;
      targetEmail = 'counselling@thinkwisecareers.com';
      department = "Counselling";
    }

    if (!client) {
      console.warn(`[Resend] Missing API key for ${department} notifications`);
      return;
    }

    await client.emails.send({
      from: 'onboarding@resend.dev',
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
    console.log(`[Resend] Lead notification email sent to ${targetEmail}`);
  } catch (error) {
    console.error('[Resend Error]', error);
  }
}

export async function sendPartnerNotificationEmail(partnerData: any) {
  try {
    if (!resendPartnerships) {
      console.warn(`[Resend] Missing API key for Partnerships notifications`);
      return;
    }

    await resendPartnerships.emails.send({
      from: 'onboarding@resend.dev',
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
    console.log(`[Resend] Partner notification email sent to partnerships@thinkwisecareers.com`);
  } catch (error) {
    console.error('[Resend Error]', error);
  }
}
