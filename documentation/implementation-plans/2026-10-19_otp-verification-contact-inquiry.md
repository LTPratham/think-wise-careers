# Implementation Plan: Dual OTP (Email & SMS) Verification for Contact Inquiries

**Date:** 2026-10-19  
**Summary:** Implements dual-channel OTP verification (Email via Resend & Mobile SMS/WhatsApp with pluggable providers and dev fallback) for contact inquiry submissions, eliminating spam and automatically verifying leads into the database.

---

## 1. Objectives
- Provide users with an OTP verification step when submitting inquiries via the Contact page and inquiry forms.
- Support dual delivery channels:
  1. **Email OTP**: Sent directly via existing Resend integration with branded email template.
  2. **Mobile SMS / WhatsApp OTP**: Pluggable provider architecture (supports Fast2SMS, Twilio, MSG91) with dev logging fallback.
- Prevent spam, bots, and invalid lead entries in PostgreSQL.
- Auto-tag verified leads with `QUALIFIED` status and `phoneVerified`/`emailVerified` flags.

---

## 2. Architecture & Data Flow

```
[ User on Contact Page ]
        │
        ▼ (Enters Details: Name, Phone, Email)
[ Choose Channel: SMS/WhatsApp or Email ]
        │
        ▼ POST /api/otp/send
[ OTP Engine: Generate 6-digit code, Hash with bcrypt, Store in DB with 5-min expiry ]
        │
        ├── Email ──> [ Resend API ] ──> User Inbox
        └── SMS   ──> [ SMS Gateway / Dev Mock ] ──> User Mobile
        │
        ▼ (User inputs 6-digit OTP)
        │
        ▼ POST /api/otp/verify
[ Validate Code & Check Attempts ]
        │
        ▼ On Success
[ Submit Lead: POST /api/leads/enquiry ]
        │
        ▼
[ Database: Lead created with phoneVerified / emailVerified = true & QUALIFIED ]
```

---

## 3. Scope of Changes

1. **Database Schema (`prisma/schema.prisma`)**:
   - Add `OtpVerification` model with `identifier`, `otpHash`, `type`, `expiresAt`, `attempts`, `verified`.
   - Update `Lead` model with `phoneVerified` and `emailVerified` booleans.
2. **Backend Services**:
   - `src/lib/sms.ts`: SMS/WhatsApp messaging service supporting Fast2SMS/Twilio with development mock fallback.
   - `src/lib/otp.ts`: Core OTP generator, bcrypt hashing, DB verification, and rate-limiting.
   - Update `src/lib/resend.ts`: Add branded OTP email template function `sendOtpEmail`.
3. **API Endpoints**:
   - `POST /api/otp/send`: Generates and dispatches OTP to selected channel.
   - `POST /api/otp/verify`: Validates user OTP against stored hash.
   - Update `POST /api/leads/enquiry`: Receives verification status and attaches verified flags.
4. **UI Components**:
   - Create `src/components/forms/OtpVerificationModal.tsx` / `OtpInput.tsx`:
     - Clean, modern UI matching Think Wise Careers design tokens.
     - Channel selector (SMS vs Email).
     - 6-digit input slots, 60s resend timer, error handling.
   - Update `QuickEnquiryForm.tsx` to integrate the OTP flow smoothly before lead finalization.
