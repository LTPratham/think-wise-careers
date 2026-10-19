# Think Wise Careers — Progress Tracking

## Last Updated: 2026-07-25

---

## Phase 0: Foundation
- [ ] Repository setup (Next.js 14+ App Router, TypeScript, Tailwind)
- [ ] Prisma schema with all 18 models
- [ ] Database migration
- [ ] Auth system (NextAuth.js / JWT)
- [ ] RBAC middleware (Editor/Admin)
- [ ] Seed script

## Phase 1: Core Content Backbone
- [ ] University shared-entity CRUD (API + admin UI)
- [ ] Partner shared-entity CRUD (API + admin UI)
- [ ] Country CRUD (API + admin editor) with University join
- [ ] MBBSCountry CRUD (API + admin editor) with University join
- [x] University shared-entity CRUD (API + admin UI)
- [x] Partner shared-entity CRUD (API + admin UI)
- [x] Country CRUD (API + admin editor) with University join
- [x] MBBSCountry CRUD (API + admin editor) with University join
- [x] Service, FAQ, Testimonial, BlogPost CRUD
- [x] Redirect rule engine

## Phase 2: Lead Capture Pipeline
- [ ] Lead & LeadTouchpoint schema + normalization/dedup logic
- [ ] Qualification logic (auto Qualified/Unverified)
- [x] Create project scaffolding (Next.js, Tailwind, Shadcn)
- [x] Implement database schema (Prisma)
- [x] Create core backend libraries (Dedup, Qualification, Job Queue)
- [x] Build core API routes (Lead capture, Partner enquiries)
- [x] Build shared form components
- [x] Create unit tests for dedup and qualification logic

## Phase 3: Frontend Public Pages
- [ ] Shared layout (Header, Footer, StickyMobileCTA, WhatsAppFloatButton)
- [ ] Shared form components + FormSessionPersistence
- [ ] HomePage
- [ ] CountryPage + MBBSCountryPage dynamic routes
- [ ] ServicesHub + ServiceDetail + Contact
- [ ] Blog listing (model only, Phase 2 display)

## Phase 4: Integrations & Compliance (Future)
- [ ] GA4, Meta Pixel, Search Console
- [ ] Email marketing integration
- [ ] GDPR consent & deletion workflow
- [ ] Audit log wiring

## Phase 5: Hardening & Launch (Future)
- [ ] WAF, rate limiting, input sanitization
- [ ] Load testing
- [ ] PageSpeed / Core Web Vitals audit
- [ ] Accessibility audit (WCAG 2.1 AA)

---

## Completed Items
- **2026-10-19**: Implemented Dual-Channel (Email & SMS/WhatsApp) OTP Verification for Contact Inquiries:
  - Database schema updated with `OtpVerification` model and `Lead.phoneVerified`/`emailVerified`.
  - Backend OTP module (`lib/otp.ts`) with bcrypt hashing, rate-limiting, and 5-min expiry.
  - Branded email delivery via Resend (`sendOtpEmail`), OpenWA WhatsApp Gateway (`https://github.com/rmyndharis/OpenWA`), and SMS gateway handler (`lib/sms.ts`) with development mock fallback.
  - API endpoints `/api/otp/send` and `/api/otp/verify`.
  - Updated `/api/leads/enquiry` to validate tokens and automatically mark verified leads as `QUALIFIED`.
  - Frontend `OtpVerificationStep` component and updated `QuickEnquiryForm` with dual-tab SMS/Email selection, 6-digit PIN input, countdown timer, and verified celebratory state.

