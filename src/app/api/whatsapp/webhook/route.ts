import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendWhatsAppText } from "@/lib/whatsapp";
import { TouchpointChannel } from "@prisma/client";

/**
 * OpenWA Inbound Webhook Handler
 * 
 * Subscribes to events from the OpenWA gateway:
 * - `message.received`: Real-time incoming WhatsApp chat from students & applicants
 * - `session.status`: Connection state monitoring
 */
export async function POST(req: Request) {
  try {
    const rawBody = await req.json();

    // 1. Verify Event Type
    const event = rawBody.event || rawBody.type;
    const data = (rawBody.data || rawBody.payload || rawBody) as Record<string, any>;

    // Handle healthcheck or non-message events
    if (event === "test") {
      console.log("[OpenWA Webhook] Test probe event acknowledged successfully.");
      return NextResponse.json({ success: true, message: "Webhook alive" });
    }

    if (event !== "message.received" && event !== "message") {
      return NextResponse.json({ received: true, ignoredEvent: event });
    }

    // 2. Filter out self-sent, groups, broadcasts, or newsletter updates
    const from = String(data.from || "");
    const isFromMe = Boolean(data.fromMe);

    if (
      isFromMe ||
      from.includes("@g.us") ||
      from.includes("@broadcast") ||
      from.includes("@newsletter") ||
      !from.includes("@c.us")
    ) {
      return NextResponse.json({ received: true, ignored: "Non-direct incoming message" });
    }

    // 3. Extract sender phone and message content
    const rawDigits = from.replace(/\D/g, "");
    const indian10Digit = rawDigits.length > 10 ? rawDigits.slice(-10) : rawDigits;
    const cleanPhone = rawDigits.startsWith("91") || rawDigits.length > 10 ? rawDigits : `91${indian10Digit}`;
    const text = String(data.body || data.text || "").trim();
    const messageId = String(data.id || "");
    const hasMedia = Boolean(data.hasMedia);

    console.log(`[OpenWA Webhook] Incoming message from ${cleanPhone}: "${text}" (hasMedia: ${hasMedia})`);

    // 4. Match or create Lead in CRM
    let lead = await prisma.lead.findFirst({
      where: {
        OR: [
          { phone: cleanPhone },
          { phone: indian10Digit },
          { phone: `+${cleanPhone}` },
          { phone: { endsWith: indian10Digit } },
        ],
      },
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thinkwisecareers.com";
    const counsellorPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917300036507";
    const adminAlertPhone = process.env.ADMIN_WHATSAPP_NUMBER || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

    if (lead) {
      // Update last activity and touchpoint
      await prisma.lead.update({
        where: { id: lead.id },
        data: {
          lastActivityAt: new Date(),
          touchpoints: {
            create: {
              sourcePage: `WhatsApp Inbound: ${text.slice(0, 80) || (hasMedia ? "Attached Media" : "Chat")}`,
              channel: TouchpointChannel.WHATSAPP_CLICK,
            },
          },
        },
      });

      // If student sent documents (PDF or image marksheet)
      if (hasMedia) {
        const existingDocs = Array.isArray(lead.documents) ? lead.documents : [];
        const newDocRecord = {
          receivedAt: new Date().toISOString(),
          type: data.type || "media",
          caption: text || "Uploaded via WhatsApp",
          messageId,
        };

        await prisma.lead.update({
          where: { id: lead.id },
          data: {
            documents: [...existingDocs, newDocRecord],
          },
        });
      }
    }

    // 5. Interactive Keyword Auto-Responder
    const lowerText = text.toLowerCase();

    // Trigger A: Document submission acknowledgment
    if (hasMedia) {
      const docAck = 
`✅ *Documents Received!*

Thank you for sharing your academic documents. Our verification team is reviewing them for eligibility and scholarship options.

A senior counsellor will update you shortly!`;
      await sendWhatsAppText({ phone: cleanPhone, message: docAck, quotedMessageId: messageId });
      return NextResponse.json({ success: true, action: "document_ack" });
    }

    // Trigger B: Brochure / Guide request
    if (lowerText.includes("brochure") || lowerText.includes("guide") || lowerText.includes("prospectus")) {
      const brochureReply =
`📖 *Think Wise Careers — Official Overseas Guides*

You can access and download our comprehensive university admission guides & fee charts here:

• *MBBS in Georgia Guide:* ${siteUrl}/mbbs-abroad/georgia
• *MBBS in Uzbekistan Guide:* ${siteUrl}/mbbs-abroad/uzbekistan
• *MBBS in Russia Guide:* ${siteUrl}/mbbs-abroad/russia
• *Study Abroad (UK/US/Canada):* ${siteUrl}/study-abroad

Need an exact cost breakdown for a specific university? Reply with the university name or type *FEES*.`;

      await sendWhatsAppText({ phone: cleanPhone, message: brochureReply, quotedMessageId: messageId });
      return NextResponse.json({ success: true, action: "brochure_sent" });
    }

    // Trigger C: Fee & Budget queries
    if (lowerText.includes("fee") || lowerText.includes("cost") || lowerText.includes("budget") || lowerText.includes("price")) {
      const feeReply =
`💰 *Tuition & Total Budget Overview:*

• *MBBS Abroad (Georgia / Uzbekistan / Russia / Kazakhstan):*
  Starting from ₹18 Lakhs to ₹32 Lakhs for the entire 5–6 year course (Tuition + Hostel + Mess).

• *Study Abroad (UK, US, Canada, Europe):*
  Tuition fees vary by course and degree level. Scholarships up to 50% are available for eligible profiles.

👉 *Want a personalized fee estimate for your profile?*
Schedule a free 1-on-1 consultation: ${siteUrl}/schedule
Or reply with your target country & budget!`;

      await sendWhatsAppText({ phone: cleanPhone, message: feeReply, quotedMessageId: messageId });
      return NextResponse.json({ success: true, action: "fee_guide_sent" });
    }

    // Trigger D: Eligibility / NEET queries
    if (lowerText.includes("eligib") || lowerText.includes("neet") || lowerText.includes("cutoff") || lowerText.includes("marks")) {
      const eligibilityReply =
`📋 *Admission Eligibility Criteria:*

• *For MBBS Abroad:*
  - Minimum 50% in Physics, Chemistry, Biology (12th Grade).
  - Valid NEET Qualifying Score (NMC guidelines).
  
• *For Bachelors / Masters Abroad:*
  - Minimum 55–60% in previous qualification.
  - Medium of Instruction (MOI) or IELTS accepted.

Reply with your *12th PCB %* and *NEET score*, and our advisor will send you a pre-approved list of universities!`;

      await sendWhatsAppText({ phone: cleanPhone, message: eligibilityReply, quotedMessageId: messageId });
      return NextResponse.json({ success: true, action: "eligibility_sent" });
    }

    // Trigger E: Human Counsellor Hand-off
    if (
      lowerText.includes("counsellor") ||
      lowerText.includes("human") ||
      lowerText.includes("speak") ||
      lowerText.includes("call me") ||
      lowerText.includes("agent")
    ) {
      // Alert internal team
      if (adminAlertPhone) {
        const studentLink = `https://wa.me/${cleanPhone}`;
        await sendWhatsAppText({
          phone: adminAlertPhone,
          message: `🚨 *LIVE CHAT REQUEST!*\n\nStudent *${lead?.name || "Direct WhatsApp Contact"}* (${cleanPhone}) has requested to speak with a counsellor.\n\n💬 Last Message: "${text}"\n\n👉 *Tap to chat directly:* ${studentLink}`,
        });
      }

      const counsellorHandoff =
`👨‍🏫 *Connecting you to a Senior Overseas Advisor...*

Our academic counselling desk has been alerted. A dedicated counsellor will message or call you on this number shortly.

You can also speak with us directly:
📞 *Call/WhatsApp Desk:* +${counsellorPhone}
🌐 *Book a Scheduled Slot:* ${siteUrl}/schedule`;

      await sendWhatsAppText({ phone: cleanPhone, message: counsellorHandoff, quotedMessageId: messageId });
      return NextResponse.json({ success: true, action: "counsellor_handoff" });
    }

    // Trigger F: General Greetings (Hi, Hello, Hey)
    if (["hi", "hello", "hey", "hola", "namaste", "good morning", "good evening"].some(g => lowerText.startsWith(g))) {
      const studentName = lead?.name?.split(" ")[0] || "there";
      const greetingReply =
`Hello *${studentName}*! 👋

Welcome to *Think Wise Careers* — your gateway to global education.

How can we assist you today?
1️⃣ Type *BROCHURE* for course guides & university lists
2️⃣ Type *FEES* for tuition and living cost breakdown
3️⃣ Type *ELIGIBILITY* to check your admission eligibility
4️⃣ Type *COUNSELLOR* to connect with an overseas education advisor

Or visit our portal: ${siteUrl}`;

      await sendWhatsAppText({ phone: cleanPhone, message: greetingReply, quotedMessageId: messageId });
      return NextResponse.json({ success: true, action: "greeting_sent" });
    }

    return NextResponse.json({ success: true, action: "logged" });
  } catch (error: any) {
    console.error("[OpenWA Webhook Error]:", error);
    return NextResponse.json(
      { error: "Webhook processing failed", details: error?.message || String(error) },
      { status: 500 }
    );
  }
}
