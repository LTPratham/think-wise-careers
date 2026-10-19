import { NextResponse } from "next/server";
import { verifyOtp, OtpChannel } from "@/lib/otp";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { identifier, channel, code } = body;

    if (!identifier || !code) {
      return NextResponse.json(
        { error: "Identifier and 6-digit code are required." },
        { status: 400 }
      );
    }

    const validChannel: OtpChannel = channel === "EMAIL" ? "EMAIL" : "PHONE";

    const result = await verifyOtp({
      identifier,
      channel: validChannel,
      code
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      verificationToken: result.verificationToken
    });
  } catch (error: any) {
    console.error("[OTP Verify API Error]:", error);
    return NextResponse.json(
      { error: "Verification failed. Please try again." },
      { status: 500 }
    );
  }
}
