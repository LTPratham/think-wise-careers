import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendOtpEmail } from "@/lib/resend";
import { sendSms } from "@/lib/sms";

export type OtpChannel = "EMAIL" | "PHONE";

const OTP_EXPIRY_MINUTES = 5;
const MAX_ATTEMPTS = 5;
const RATE_LIMIT_MINUTES = 10;
const MAX_REQUESTS_IN_WINDOW = 4;

/**
 * Clean & normalize identifier
 */
export function normalizeIdentifier(identifier: string, channel: OtpChannel): string {
  if (channel === "EMAIL") {
    return identifier.trim().toLowerCase();
  }
  // Digits only
  return identifier.replace(/\D/g, '');
}

/**
 * Generate a cryptographically secure 6-digit OTP
 */
export function generateOtpCode(): string {
  return crypto.randomInt(100000, 999999).toString();
}

/**
 * Send an OTP to phone or email
 */
export async function sendOtp({
  identifier,
  channel,
}: {
  identifier: string;
  channel: OtpChannel;
}): Promise<{ success: boolean; message: string; simulated?: boolean; devCode?: string }> {
  const cleanId = normalizeIdentifier(identifier, channel);

  if (!cleanId) {
    return { success: false, message: "Invalid identifier provided" };
  }

  // 1. Rate limiting check (max 4 sends per 10 minutes)
  const windowStart = new Date(Date.now() - RATE_LIMIT_MINUTES * 60 * 1000);
  const recentCount = await prisma.otpVerification.count({
    where: {
      identifier: cleanId,
      createdAt: { gte: windowStart }
    }
  });

  if (recentCount >= MAX_REQUESTS_IN_WINDOW) {
    return {
      success: false,
      message: "Too many OTP requests. Please wait a few minutes before trying again."
    };
  }

  // 2. Generate 6-digit OTP
  const code = generateOtpCode();
  const salt = await bcrypt.genSalt(10);
  const otpHash = await bcrypt.hash(code, salt);
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  // 3. Invalidate old active unverified OTPs for this identifier
  await prisma.otpVerification.deleteMany({
    where: {
      identifier: cleanId,
      verified: false
    }
  });

  // 4. Save new OTP record
  await prisma.otpVerification.create({
    data: {
      identifier: cleanId,
      channel,
      otpHash,
      expiresAt,
      attempts: 0,
      verified: false
    }
  });

  // 5. Dispatch OTP
  let simulated = false;
  if (channel === "EMAIL") {
    await sendOtpEmail({ email: cleanId, code });
  } else {
    const smsResult = await sendSms({
      phone: cleanId,
      code,
      message: `${code} is your Think Wise Careers inquiry verification code. Valid for 5 mins.`
    });
    simulated = !!smsResult.simulated;
  }

  const isDev = process.env.NODE_ENV !== "production";

  return {
    success: true,
    message: `OTP sent successfully to your ${channel === 'EMAIL' ? 'email address' : 'mobile phone'}.`,
    simulated,
    devCode: isDev ? code : undefined // Helpful in local dev console/UI
  };
}

/**
 * Verify an entered OTP
 */
export async function verifyOtp({
  identifier,
  channel,
  code
}: {
  identifier: string;
  channel: OtpChannel;
  code: string;
}): Promise<{ success: boolean; message: string; verificationToken?: string }> {
  const cleanId = normalizeIdentifier(identifier, channel);
  const cleanCode = code.trim();

  if (!cleanId || !cleanCode || cleanCode.length !== 6) {
    return { success: false, message: "Please provide a valid 6-digit code." };
  }

  // Find latest active OTP
  const record = await prisma.otpVerification.findFirst({
    where: {
      identifier: cleanId,
      verified: false
    },
    orderBy: { createdAt: "desc" }
  });

  if (!record) {
    return { success: false, message: "No active verification request found. Please request a new OTP." };
  }

  if (new Date() > record.expiresAt) {
    return { success: false, message: "This OTP has expired. Please request a new one." };
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    return { success: false, message: "Maximum verification attempts exceeded. Please request a new OTP." };
  }

  // Check OTP match
  const isMatch = await bcrypt.compare(cleanCode, record.otpHash);

  if (!isMatch) {
    // Increment attempts
    await prisma.otpVerification.update({
      where: { id: record.id },
      data: { attempts: { increment: 1 } }
    });
    const remaining = MAX_ATTEMPTS - (record.attempts + 1);
    return {
      success: false,
      message: `Invalid code. ${remaining > 0 ? `${remaining} attempts remaining.` : 'Please request a new OTP.'}`
    };
  }

  // Mark record as verified
  await prisma.otpVerification.update({
    where: { id: record.id },
    data: { verified: true }
  });

  // Generate a tamper-proof verification token
  const tokenSecret = process.env.NEXTAUTH_SECRET || "twc-otp-default-secret-2026";
  const tokenPayload = `${record.id}:${cleanId}:${record.createdAt.getTime()}`;
  const hmac = crypto.createHmac("sha256", tokenSecret).update(tokenPayload).digest("hex");
  const verificationToken = Buffer.from(JSON.stringify({ recordId: record.id, identifier: cleanId, hmac })).toString("base64");

  return {
    success: true,
    message: "Verified successfully!",
    verificationToken
  };
}

/**
 * Verify a previously generated verificationToken
 */
export async function validateVerificationToken(token: string, expectedIdentifier: string): Promise<boolean> {
  try {
    const raw = Buffer.from(token, "base64").toString("utf-8");
    const parsed = JSON.parse(raw);
    const { recordId, identifier, hmac } = parsed;

    const record = await prisma.otpVerification.findUnique({
      where: { id: recordId }
    });

    if (!record || !record.verified) return false;

    // Check identifier match (either phone or email digits)
    const cleanExpected = expectedIdentifier.replace(/\D/g, '') || expectedIdentifier.trim().toLowerCase();
    const cleanRecord = record.identifier.replace(/\D/g, '') || record.identifier.trim().toLowerCase();
    if (!cleanRecord.includes(cleanExpected) && !cleanExpected.includes(cleanRecord)) {
      return false;
    }

    const tokenSecret = process.env.NEXTAUTH_SECRET || "twc-otp-default-secret-2026";
    const tokenPayload = `${record.id}:${record.identifier}:${record.createdAt.getTime()}`;
    const expectedHmac = crypto.createHmac("sha256", tokenSecret).update(tokenPayload).digest("hex");

    return hmac === expectedHmac;
  } catch {
    return false;
  }
}
