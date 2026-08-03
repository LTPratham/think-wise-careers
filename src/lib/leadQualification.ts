import { isValidPhone, isValidEmail } from "@/lib/leadDedup";
import type { QualificationFlag } from "@prisma/client";

export interface QualificationInput {
  phone: string;
  email: string;
  serviceInterest: string | null | undefined;
  isDuplicate: boolean;
}

export interface QualificationResult {
  flag: QualificationFlag;
  reasons: string[];
}

/**
 * Determine if a lead is Qualified or Unverified based on:
 * 1. Valid phone number format
 * 2. Valid email format
 * 3. Non-empty service interest field
 * 4. Not flagged as a duplicate
 *
 * A lead must pass ALL checks to be Qualified.
 * Any failure results in Unverified status with reasons.
 */
export function qualifyLead(input: QualificationInput): QualificationResult {
  const reasons: string[] = [];

  if (!isValidPhone(input.phone)) {
    reasons.push("Invalid phone number format");
  }

  if (!isValidEmail(input.email)) {
    reasons.push("Invalid email format");
  }

  if (!input.serviceInterest || input.serviceInterest.trim() === "") {
    reasons.push("Service interest is empty");
  }

  if (input.isDuplicate) {
    reasons.push("Duplicate submission detected");
  }

  return {
    flag: reasons.length === 0 ? "QUALIFIED" : "UNVERIFIED",
    reasons,
  };
}
