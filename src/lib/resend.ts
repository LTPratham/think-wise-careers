import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLeadNotificationEmail(leadData: any) {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'prathameshsawarkar1@gmail.com', // As requested
      subject: `New Lead: ${leadData.name} - ${leadData.serviceInterest || 'General Enquiry'}`,
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
    console.log('[Resend] Lead notification email sent to prathameshsawarkar1@gmail.com');
  } catch (error) {
    console.error('[Resend Error]', error);
  }
}
