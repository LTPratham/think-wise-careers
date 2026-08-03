import { z } from "zod";

export const phoneRegex = /^\d{10}$/; // Post-normalization

export const QuickEnquirySchema = z.object({
  name: z.string().min(2, "Name is too short"),
  phone: z.string().min(10, "Invalid phone number format"),
  serviceInterest: z.string().min(1, "Please select an interest"),
});

export const FullEnquirySchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number format"),
  serviceInterest: z.string().min(1, "Please select a service"),
  message: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and privacy policy",
  }),
});

export const PartnerEnquirySchema = z.object({
  partnerType: z.enum(["SCHOOL", "UNIVERSITY", "FINANCIAL_INSTITUTION"]),
  organizationName: z.string().min(2, "Organization name required"),
  contactName: z.string().min(2, "Contact name required"),
  contactEmail: z.string().email("Invalid email address"),
  contactPhone: z.string().min(10, "Invalid phone number format"),
  message: z.string().min(10, "Please provide more details in your message"),
});

// Admin CMS Schemas

export const UniversitySchema = z.object({
  name: z.string().min(2),
  countryName: z.string().min(2),
  description: z.string().min(10),
  logoUrl: z.string().url().optional().or(z.literal("")),
});

export const CountrySchema = z.object({
  slug: z.string().min(2),
  name: z.string().min(2),
  overview: z.string().min(10),
  popularCourses: z.array(z.string()),
  eligibility: z.string().min(10),
  costBreakdown: z.record(z.string(), z.string()),
  scholarships: z.string().min(10),
  visaOverview: z.string().min(10),
  careerOutcomes: z.string().min(10),
  publishStatus: z.enum(["DRAFT", "PUBLISHED", "UNPUBLISHED"]),
  redirectTarget: z.string().optional().or(z.literal("")),
  universityIds: z.array(z.string()),
  seoMeta: z.record(z.string(), z.string()).optional(),
});

export const MBBSCountrySchema = z.object({
  slug: z.string().min(2),
  name: z.string().min(2),
  feeStructure: z.record(z.string(), z.string()),
  recognitionStatus: z.string().min(5),
  recognitionDisclaimer: z.string().min(10),
  eligibilityNeet: z.string().min(5),
  admissionProcess: z.string().min(10),
  hostelInfo: z.string().min(5),
  livingCost: z.record(z.string(), z.string()),
  careerScope: z.string().min(10),
  publishStatus: z.enum(["DRAFT", "PUBLISHED", "UNPUBLISHED"]),
  redirectTarget: z.string().optional().or(z.literal("")),
  universityIds: z.array(z.string()),
  seoMeta: z.record(z.string(), z.string()).optional(),
});

export const ServiceSchema = z.object({
  slug: z.string().min(2),
  name: z.string().min(2),
  description: z.string().min(10),
  process: z.string().min(10),
  ctaLabel: z.string().min(2),
});

export const FAQSchema = z.object({
  question: z.string().min(5),
  answer: z.string().min(10),
  scope: z.enum(["GLOBAL", "COUNTRY", "MBBS_COUNTRY", "SERVICE"]),
  scopeRefId: z.string().optional(),
  displayOrder: z.number().int().default(0),
});

export const TestimonialSchema = z.object({
  studentName: z.string().min(2),
  program: z.string().min(2),
  country: z.string().min(2),
  quoteText: z.string().optional().or(z.literal("")),
  videoEmbedUrl: z.string().url().optional().or(z.literal("")),
  mediaUrl: z.string().url().optional().or(z.literal("")),
  displayStatus: z.enum(["DRAFT", "PUBLISHED"]),
});

export const PartnerSchema = z.object({
  partnerType: z.enum(["SCHOOL", "UNIVERSITY", "FINANCIAL_INSTITUTION"]),
  name: z.string().min(2),
  logoUrl: z.string().url().optional().or(z.literal("")),
  description: z.string().min(10),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  displayOrder: z.number().int().default(0),
});
