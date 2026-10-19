import { NextResponse } from "next/server";
import { sendOtp, OtpChannel } from "@/lib/otp";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { identifier, channel } = body;

    if (!identifier || typeof identifier !== "string") {
      return NextResponse.json(
        { error: "Identifier (phone or email) is required." },
        { status: 400 }
      );
    }

    const validChannel: OtpChannel = channel === "EMAIL" ? "EMAIL" : "PHONE";

    // Basic format checks
    if (validChannel === "EMAIL") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(identifier.trim())) {
        return NextResponse.json(
          { error: "Please provide a valid email address." },
          { status: 400 }
        );
      }
    } else {
      const digits = identifier.replace(/\D/g, "");
      if (digits.length < 10) {
        return NextResponse.json(
          { error: "Please provide a valid 10-digit mobile number." },
          { status: 400 }
        );
      }
    }

    const result = await sendOtp({
      identifier,
      channel: validChannel
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 429 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      simulated: result.simulated,
      devCode: result.devCode
    });
  } catch (error: any) {
    console.error("[OTP Send API Error]:", error);
    return NextResponse.json(
      { error: "Failed to send OTP. Please try again." },
      { status: 500 }
    );
  }
}
