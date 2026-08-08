import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { QuickEnquirySchema, FullEnquirySchema } from "@/lib/validators";
import { checkDuplicate } from "@/lib/leadDedup";
import { qualifyLead } from "@/lib/leadQualification";
import { enqueueJob } from "@/lib/jobQueue";
import { sendLeadNotificationEmail } from "@/lib/resend";
import { JobType, TouchpointChannel } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Determine if it's a quick or full enquiry based on present fields
    const isFull = body.email !== undefined;
    
    // Validate payload
    const schema = isFull ? FullEnquirySchema : QuickEnquirySchema;
    const validatedData = schema.parse(body);

    const sourcePage = body.sourcePage || "Unknown";
    const email = isFull ? (validatedData as any).email : "no-email@example.com";
    
    // 1. Check for duplicates
    const { isDuplicate, existingLeadId } = await checkDuplicate(
      validatedData.phone,
      email
    );

    // 2. Qualify lead
    const qualification = qualifyLead({
      phone: validatedData.phone,
      email: email,
      serviceInterest: validatedData.serviceInterest,
      isDuplicate,
    });

    // 3. Persist Lead & Touchpoint
    let leadId = existingLeadId;

    if (isDuplicate && existingLeadId) {
      // Append new touchpoint to existing lead
      await prisma.leadTouchpoint.create({
        data: {
          leadId: existingLeadId,
          sourcePage,
          channel: TouchpointChannel.FORM,
        },
      });

      // Update last activity
      await prisma.lead.update({
        where: { id: existingLeadId },
        data: { lastActivityAt: new Date() },
      });
    } else {
      // Create new lead and initial touchpoint
      const newLead = await prisma.lead.create({
        data: {
          name: validatedData.name,
          phone: validatedData.phone,
          email: email,
          sourcePage,
          serviceInterest: validatedData.serviceInterest,
          message: isFull ? (validatedData as any).message : null,
          qualificationFlag: qualification.flag,
          touchpoints: {
            create: {
              sourcePage,
              channel: TouchpointChannel.FORM,
            },
          },
        },
      });
      leadId = newLead.id;
    }

    // 4. Enqueue Async Jobs (CRM Sync, Email Notification, WhatsApp)
    // We don't await the job execution, just the enqueuing, so the user gets a fast response
    await Promise.all([
      enqueueJob(JobType.CRM_SYNC, { leadId }),
      enqueueJob(JobType.INTERNAL_NOTIFICATION, { 
        leadId, 
        type: "NEW_ENQUIRY",
        details: validatedData
      }),
      // Trigger the real email synchronously without waiting for the stub queue
      sendLeadNotificationEmail({ ...validatedData, email, sourcePage, leadId })
    ]);

    return NextResponse.json({
      success: true,
      isDuplicate,
      qualification: qualification.flag,
    });
  } catch (error: any) {
    console.error("[Leads API Error]:", error);
    return NextResponse.json(
      { error: "Failed to process enquiry", details: error.message },
      { status: 400 }
    );
  }
}
