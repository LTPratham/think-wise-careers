import { prisma } from "@/lib/prisma";

/**
 * Normalize a phone number for dedup matching.
 * Strips all non-digit characters, removes leading country codes (91 for India).
 */
export function normalizePhone(phone: string): string {
  // Strip everything except digits
  let digits = phone.replace(/\D/g, "");

  // Remove leading 91 (India country code) if number is > 10 digits
  if (digits.length > 10 && digits.startsWith("91")) {
    digits = digits.slice(2);
  }

  // Remove leading 0 if present
  if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  return digits;
}

/**
 * Normalize an email for dedup matching.
 * Lowercases and trims whitespace.
 */
export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

/**
 * Check if a phone number format is valid.
 * Must be 10 digits after normalization (Indian mobile).
 */
export function isValidPhone(phone: string): boolean {
  const normalized = normalizePhone(phone);
  return /^\d{10}$/.test(normalized);
}

/**
 * Check if an email format is valid.
 */
export function isValidEmail(email: string): boolean {
  const normalized = normalizeEmail(email);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
}

export interface DedupResult {
  isDuplicate: boolean;
  existingLeadId: string | null;
}

/**
 * Check for duplicate leads within the last 30 days.
 * Primary match: normalized phone number.
 * Secondary match: normalized email.
 *
 * If a match is found, returns the existing lead ID so a touchpoint
 * can be appended instead of creating a new lead.
 */
export async function checkDuplicate(
  phone: string,
  email: string
): Promise<DedupResult> {
  const normalizedPhone = normalizePhone(phone);
  const normalizedEmail = normalizeEmail(email);

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Primary match: phone number (within last 30 days)
  const phoneMatch = await prisma.lead.findFirst({
    where: {
      phone: normalizedPhone,
      createdAt: { gte: thirtyDaysAgo },
    },
    orderBy: { createdAt: "desc" },
  });

  if (phoneMatch) {
    return { isDuplicate: true, existingLeadId: phoneMatch.id };
  }

  // Secondary match: email (within last 30 days)
  const emailMatch = await prisma.lead.findFirst({
    where: {
      email: normalizedEmail,
      createdAt: { gte: thirtyDaysAgo },
    },
    orderBy: { createdAt: "desc" },
  });

  if (emailMatch) {
    return { isDuplicate: true, existingLeadId: emailMatch.id };
  }

  return { isDuplicate: false, existingLeadId: null };
}
