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
      await resend.emails.send({
        from: 'Think Wise Careers <admissions@thinkwisecareers.com>',
        to: leadData.email,
        subject: `Thank you for contacting Think Wise Careers!`,
        html: `
          <h3>Hi ${leadData.name},</h3>
          <p>Thank you for reaching out to Think Wise Careers regarding <strong>${leadData.serviceInterest || 'our services'}</strong>.</p>
          <p>We have successfully received your enquiry. One of our expert counsellors will review your details and contact you shortly at ${leadData.phone}.</p>
          <p>If you have any immediate questions, feel free to reply directly to this email.</p>
          <br/>
          <p>Best Regards,</p>
          <p><strong>The Think Wise Careers Team</strong></p>
          <p><a href="https://thinkwisecareers.com">thinkwisecareers.com</a></p>
        `
      });
      console.log(`[Resend] Auto-reply sent to student at ${leadData.email}`);
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
