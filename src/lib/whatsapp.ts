/**
 * Think Wise Careers — Advanced WhatsApp Integration Service (powered by OpenWA)
 * 
 * Provides automated messaging workflows:
 * 1. Instant Lead Welcome & Personalized Course/Brochure Link
 * 2. Instant Internal Hot-Lead Notification to Admissions Team
 * 3. 1-on-1 Consultation Booking Confirmation & Calendar Invite
 * 4. Counsellor Meeting Alert
 * 5. Document Request & Inbound Attachment Support
 */

interface SendWhatsAppTextOptions {
  phone: string;
  message: string;
  quotedMessageId?: string;
}

interface SendWhatsAppDocumentOptions {
  phone: string;
  url?: string;
  base64?: string;
  mimetype?: string;
  filename: string;
  caption?: string;
}

interface SendWhatsAppContactOptions {
  phone: string;
  contactName: string;
  contactPhone: string;
  organization?: string;
}

// Helper to format any phone number into OpenWA chatId format (e.g., 919876543210@c.us)
export function formatToWhatsAppChatId(phone: string): string {
  const digitsOnly = phone.replace(/\D/g, "");
  // For Indian numbers without country code
  const cleanNumber = digitsOnly.length === 10 ? `91${digitsOnly}` : digitsOnly;
  return `${cleanNumber}@c.us`;
}

// Session resolution cache
let cachedSessionId: string | null = null;
let lastSessionFetch = 0;

async function getOpenWASession(baseUrl: string, apiKey: string): Promise<string | null> {
  const envSession = process.env.OPENWA_SESSION_ID;
  if (envSession && envSession !== "auto") {
    return envSession;
  }

  // Cache session for 60 seconds
  if (cachedSessionId && Date.now() - lastSessionFetch < 60000) {
    return cachedSessionId;
  }

  try {
    const res = await fetch(`${baseUrl}/api/sessions`, {
      headers: { "X-API-Key": apiKey },
      signal: AbortSignal.timeout(4000),
    });

    if (res.ok) {
      const sessions = await res.json();
      if (Array.isArray(sessions) && sessions.length > 0) {
        const active = sessions.find((s: any) =>
          ["ready", "connected", "working"].includes(String(s.status).toLowerCase())
        ) || sessions[0];
        
        cachedSessionId = active?.id || active?.sessionId || active?.name || null;
        lastSessionFetch = Date.now();
        return cachedSessionId;
      }
    }
  } catch (err: any) {
    console.warn("[OpenWA] Unable to fetch active session list:", err?.message || err);
  }

  return null;
}

/**
 * Core primitive: Send formatted text message via OpenWA
 */
export async function sendWhatsAppText({
  phone,
  message,
  quotedMessageId,
}: SendWhatsAppTextOptions): Promise<{ success: boolean; simulated?: boolean; error?: string }> {
  const baseUrl = process.env.OPENWA_BASE_URL?.replace(/\/$/, "");
  const apiKey = process.env.OPENWA_API_KEY;

  if (!baseUrl || !apiKey) {
    console.log(`\n[WhatsApp SIMULATION / OPENWA NOT CONFIGURED]`);
    console.log(`To: ${phone}`);
    console.log(`Message:\n${message}\n`);
    return { success: true, simulated: true };
  }

  try {
    const sessionId = await getOpenWASession(baseUrl, apiKey);
    if (!sessionId) {
      console.warn(`[OpenWA] No active WhatsApp session available for sending to ${phone}`);
      return { success: false, error: "No active WhatsApp session found" };
    }

    const chatId = formatToWhatsAppChatId(phone);
    const body: Record<string, any> = { chatId, text: message };
    if (quotedMessageId) body.quotedMessageId = quotedMessageId;

    const response = await fetch(`${baseUrl}/api/sessions/${sessionId}/messages/send-text`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(6000),
    });

    if (response.ok) {
      console.log(`[OpenWA WhatsApp] Message dispatched successfully to ${chatId}`);
      return { success: true };
    } else {
      const errText = await response.text();
      console.error(`[OpenWA Send Error] Status ${response.status}:`, errText);
      return { success: false, error: errText };
    }
  } catch (err: any) {
    console.error(`[OpenWA Exception]:`, err?.message || err);
    return { success: false, error: err?.message || String(err) };
  }
}

/**
 * Core primitive: Send document / PDF brochure via OpenWA
 */
export async function sendWhatsAppDocument({
  phone,
  url,
  base64,
  mimetype = "application/pdf",
  filename,
  caption,
}: SendWhatsAppDocumentOptions): Promise<{ success: boolean; simulated?: boolean; error?: string }> {
  const baseUrl = process.env.OPENWA_BASE_URL?.replace(/\/$/, "");
  const apiKey = process.env.OPENWA_API_KEY;

  if (!baseUrl || !apiKey) {
    console.log(`\n[WhatsApp DOCUMENT SIMULATION]`);
    console.log(`To: ${phone} | File: ${filename}`);
    if (caption) console.log(`Caption: ${caption}`);
    return { success: true, simulated: true };
  }

  try {
    const sessionId = await getOpenWASession(baseUrl, apiKey);
    if (!sessionId) {
      return { success: false, error: "No active WhatsApp session found" };
    }

    const chatId = formatToWhatsAppChatId(phone);
    const payload: Record<string, any> = {
      chatId,
      filename,
      caption,
    };

    if (url) {
      payload.url = url;
    } else if (base64) {
      payload.base64 = base64;
      payload.mimetype = mimetype;
    } else {
      return { success: false, error: "Neither URL nor base64 provided for document send" };
    }

    const response = await fetch(`${baseUrl}/api/sessions/${sessionId}/messages/send-document`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });

    if (response.ok) {
      console.log(`[OpenWA WhatsApp] Document '${filename}' sent to ${chatId}`);
      return { success: true };
    } else {
      const errText = await response.text();
      console.error(`[OpenWA Send Document Error] Status ${response.status}:`, errText);
      return { success: false, error: errText };
    }
  } catch (err: any) {
    console.error(`[OpenWA Document Exception]:`, err?.message || err);
    return { success: false, error: err?.message || String(err) };
  }
}

// ─────────────────────────────────────────────────────────────
// HIGH-LEVEL WORKFLOW DISPATCHERS
// ─────────────────────────────────────────────────────────────

/**
 * Workflow 1: Instant Lead Welcome Message on WhatsApp
 * Dispatched the moment a student verifies their phone or submits an inquiry.
 */
export async function sendLeadWelcomeWhatsApp(lead: {
  name: string;
  phone: string;
  serviceInterest?: string | null;
  targetCountry?: string | null;
  sourcePage?: string | null;
}): Promise<void> {
  const firstName = lead.name.trim().split(" ")[0] || "Student";
  const interest = lead.serviceInterest || "Study Abroad & MBBS";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thinkwisecareers.com";
  const counsellorPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917300036507";

  const message = 
`*Welcome to Think Wise Careers!* 🎓

Hello *${firstName}*,

Thank you for choosing us for your academic future. We have received your inquiry regarding *${interest}*.

🌟 *What happens next?*
1. Your academic profile is being matched with verified universities and available scholarships.
2. Our Senior Overseas Counsellor will reach out directly to answer your eligibility, fee structure, and visa questions.

💡 *Need immediate answers?*
• Book a 1-on-1 Consultation: ${siteUrl}/schedule
• Direct Counsellor WhatsApp: https://wa.me/${counsellorPhone}

Reply directly to this chat with any questions—we are here to guide you every step of the way!

Warm regards,  
*Admissions Team | Think Wise Careers*  
🌐 thinkwisecareers.com`;

  await sendWhatsAppText({ phone: lead.phone, message });
}

/**
 * Workflow 2: Internal Hot-Lead WhatsApp Alert to Admissions Team / Counsellors
 * Delivers immediate alert to the admissions phone so speed-to-lead is < 2 minutes.
 */
export async function sendInternalLeadAlertWhatsApp(lead: {
  name: string;
  phone: string;
  email?: string | null;
  serviceInterest?: string | null;
  sourcePage?: string | null;
  qualificationFlag?: string | null;
  isDuplicate?: boolean;
}): Promise<void> {
  const adminPhone = process.env.ADMIN_WHATSAPP_NUMBER || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!adminPhone) return;

  const digitsOnly = lead.phone.replace(/\D/g, "");
  const directStudentWa = `https://wa.me/${digitsOnly.length === 10 ? `91${digitsOnly}` : digitsOnly}`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thinkwisecareers.com";

  const message =
`🚨 *NEW HOT LEAD RECEIVED!*

👤 *Name:* ${lead.name}
📱 *Phone:* ${lead.phone}
📧 *Email:* ${lead.email || "N/A"}
🎯 *Interest:* ${lead.serviceInterest || "General Inquiry"}
📍 *Source:* ${lead.sourcePage || "Website Form"}
🛡️ *Status:* ${lead.qualificationFlag || "VERIFIED"} ${lead.isDuplicate ? "(Existing Profile)" : "(New)"}

👉 *Quick Actions:*
• *Chat with Student on WhatsApp:* ${directStudentWa}
• *Open CRM Dashboard:* ${siteUrl}/admin/leads

_Respond quickly — response times under 5 mins multiply conversion by 4x!_`;

  await sendWhatsAppText({ phone: adminPhone, message });
}

/**
 * Workflow 3: Consultation Booking Confirmation for Students
 * Delivers meeting details, Google Meet link or office address, and calendar notes.
 */
export async function sendConsultationConfirmationWhatsApp(booking: {
  name: string;
  phone: string;
  date: string | Date;
  timeSlot: string;
  mode: string;
  serviceInterest?: string | null;
  targetCountry?: string | null;
  notes?: string | null;
}): Promise<void> {
  const firstName = booking.name.trim().split(" ")[0] || "Student";
  const formattedDate = new Date(booking.date).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const modeDisplayNames: Record<string, string> = {
    PHONE_CALL: "Direct Phone Call 📞",
    GOOGLE_MEET: "Online Video Meeting (Google Meet) 💻",
    IN_PERSON_JAIPUR: "In-Person Visit (Jaipur Head Office) 🏢",
  };
  const modeText = modeDisplayNames[booking.mode] || booking.mode;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thinkwisecareers.com";

  const message =
`🗓️ *Consultation Confirmed — Think Wise Careers*

Hi *${firstName}*,

Your 1-on-1 personalized counselling session has been confirmed!

📌 *Session Details:*
• *Date:* ${formattedDate}
• *Time:* ${booking.timeSlot}
• *Mode:* ${modeText}
• *Focus Area:* ${booking.serviceInterest || "Global Education Guidance"}
${booking.targetCountry ? `• *Target Country:* ${booking.targetCountry}\n` : ""}${booking.mode === "GOOGLE_MEET" ? "• *Meeting Link:* Will be shared via WhatsApp 15 minutes before the slot\n" : ""}
📋 *Preparation Tip:*
Keep your latest academic marksheets (10th/12th/Graduation) and NEET scorecard (for MBBS) ready so our counsellor can give you exact eligibility options.

Need to reschedule or have urgent questions? Reply directly to this message or visit ${siteUrl}/schedule.

See you soon!  
*Think Wise Careers Counselling Team*`;

  await sendWhatsAppText({ phone: booking.phone, message });
}

/**
 * Workflow 4: Consultation Booking Alert to Assigned Counsellor
 */
export async function sendConsultationAlertToCounsellorWhatsApp(booking: {
  name: string;
  phone: string;
  email?: string | null;
  date: string | Date;
  timeSlot: string;
  mode: string;
  serviceInterest?: string | null;
  targetCountry?: string | null;
  counsellorName?: string | null;
  notes?: string | null;
}): Promise<void> {
  const adminPhone = process.env.ADMIN_WHATSAPP_NUMBER || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!adminPhone) return;

  const formattedDate = new Date(booking.date).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const digitsOnly = booking.phone.replace(/\D/g, "");
  const directWa = `https://wa.me/${digitsOnly.length === 10 ? `91${digitsOnly}` : digitsOnly}`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thinkwisecareers.com";

  const message =
`📅 *NEW CONSULTATION SCHEDULED!*

👤 *Student:* ${booking.name}
📱 *Phone:* ${booking.phone}
📧 *Email:* ${booking.email || "N/A"}
🗓️ *Date & Slot:* ${formattedDate} @ ${booking.timeSlot}
📍 *Mode:* ${booking.mode}
🎯 *Target:* ${booking.serviceInterest || "General"} (${booking.targetCountry || "Undecided"})
📝 *Notes:* ${booking.notes || "None provided"}

👉 *Action Links:*
• *Connect with Student:* ${directWa}
• *Meeting Schedule:* ${siteUrl}/admin/meetings`;

  await sendWhatsAppText({ phone: adminPhone, message });
}
