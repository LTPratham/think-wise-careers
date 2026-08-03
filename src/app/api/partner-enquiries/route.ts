import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PartnerEnquirySchema } from "@/lib/validators";
import { enqueueJob } from "@/lib/jobQueue";
import { JobType } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate payload
    const validatedData = PartnerEnquirySchema.parse(body);

    // Save partner enquiry to database
    const enquiry = await prisma.partnerEnquiry.create({
      data: validatedData,
    });

    // Enqueue notification job
    await enqueueJob(JobType.INTERNAL_NOTIFICATION, {
      enquiryId: enquiry.id,
      type: "NEW_PARTNER_ENQUIRY",
      details: validatedData
    });

    return NextResponse.json({ success: true, id: enquiry.id });
  } catch (error: any) {
    console.error("[Partner Enquiry API Error]:", error);
    return NextResponse.json(
      { error: "Failed to process partner enquiry", details: error.message },
      { status: 400 }
    );
  }
}
