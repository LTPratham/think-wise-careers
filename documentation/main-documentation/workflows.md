# Think Wise Careers — Key Workflows

## 1. Student Enquiry Flow
1. Student fills inquiry form (Name, Phone, Email, Service Interest) → partial data saved to sessionStorage.
2. User proceeds to OTP Verification step:
   - User chooses channel: **Mobile SMS** or **Email OTP**.
   - System dispatches a cryptographically random 6-digit code (valid for 5 mins, rate limited).
   - In dev mode, test OTP is logged and displayed for local testing.
3. User enters 6-digit PIN:
   - System verifies against hashed OTP in `otp_verifications` table.
   - On match, signs a tamper-proof verification token.
4. Lead creation:
   - Dedup check against existing leads from last 30 days.
   - If verified via OTP, lead is marked with `phoneVerified: true` / `emailVerified: true` and automatically promoted to `qualificationFlag: QUALIFIED`.
   - Touchpoints recorded, internal email notifications sent via Resend.
5. User sees verified confirmation screen with direct WhatsApp instant chat link.

## 2. Admin Unpublish/Redirect Flow
1. Admin selects "Unpublish" on a published country page
2. System requires either a redirect_target URL or explicit allow_404 override
3. If redirect provided → creates RedirectRule (301) + sets page to Unpublished + audit log entry
4. Sitemap regenerated to exclude unpublished page

## 3. Partner Enquiry → Approval Flow
1. Institution submits PartnerEnquiryForm → creates PartnerEnquiry (status: new)
2. Admin reviews in PartnerApprovalQueue
3. If approved → Admin creates a separate Partner record (active) with logo/description
4. Partner appears on public "Partner With Us" page

## 4. Content Publishing Flow
1. Editor/Admin creates content via Admin CMS (countries, blog, FAQs, etc.)
2. Content saved as Draft → can be previewed
3. On Publish → content becomes available via public API → SSG/ISR picks up changes
4. All mutations logged to AuditLogEntry
