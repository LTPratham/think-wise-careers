import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Clean up existing data (optional, but good for local dev)
  // Be careful with this in production!
  await prisma.leadTouchpoint.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.auditLogEntry.deleteMany();
  await prisma.partnerEnquiry.deleteMany();
  await prisma.partner.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.fAQ.deleteMany();
  await prisma.service.deleteMany();
  await prisma.countryUniversity.deleteMany();
  await prisma.mBBSCountryUniversity.deleteMany();
  await prisma.university.deleteMany();
  await prisma.mBBSCountry.deleteMany();
  await prisma.country.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Users
  const passwordHash = await bcrypt.hash("password123", 10);
  
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@thinkwisecareers.com",
      passwordHash,
      role: UserRole.ADMIN,
    },
  });
  
  const editor = await prisma.user.create({
    data: {
      name: "Editor User",
      email: "editor@thinkwisecareers.com",
      passwordHash,
      role: UserRole.EDITOR,
    },
  });

  console.log(`Created users: ${admin.email} (Admin), ${editor.email} (Editor)`);

  // 3. Create Universities
  const u1 = await prisma.university.create({
    data: { name: "University of Toronto", countryName: "Canada", description: "Top Canadian University" },
  });
  const u2 = await prisma.university.create({
    data: { name: "University of Oxford", countryName: "UK", description: "Prestigious UK University" },
  });
  const u3 = await prisma.university.create({
    data: { name: "Tbilisi State Medical University", countryName: "Georgia", description: "Leading Medical University in Georgia" },
  });
  const u4 = await prisma.university.create({
    data: { name: "Kazan Federal University", countryName: "Russia", description: "Top Medical University in Russia" },
  });

  // 4. Create Countries
  const canada = await prisma.country.create({
    data: {
      slug: "canada",
      name: "Canada",
      overview: "Study in Canada offers high-quality education.",
      popularCourses: JSON.stringify(["Engineering", "Business", "IT"]),
      eligibility: "Varies by program. Generally 60%+ in 12th.",
      costBreakdown: JSON.stringify({ tuition: "$15,000 - $30,000/yr", living: "$10,000/yr" }),
      scholarships: "Merit-based scholarships available.",
      visaOverview: "Study permit required.",
      careerOutcomes: "Post-graduation work permit up to 3 years.",
      publishStatus: "PUBLISHED",
      universities: {
        create: [{ universityId: u1.id }]
      }
    },
  });

  const uk = await prisma.country.create({
    data: {
      slug: "uk",
      name: "United Kingdom",
      overview: "Study in the UK for world-class degrees.",
      popularCourses: JSON.stringify(["Business", "Law", "Medicine"]),
      eligibility: "Good academic record.",
      costBreakdown: JSON.stringify({ tuition: "£10,000 - £25,000/yr", living: "£9,000/yr" }),
      scholarships: "Various university scholarships.",
      visaOverview: "Tier 4 Student Visa.",
      careerOutcomes: "2-year Graduate Route visa.",
      publishStatus: "PUBLISHED",
      universities: {
        create: [{ universityId: u2.id }]
      }
    },
  });

  // 5. Create MBBS Countries
  const georgia = await prisma.mBBSCountry.create({
    data: {
      slug: "georgia",
      name: "Georgia",
      feeStructure: JSON.stringify({ total: "$25,000" }),
      recognitionStatus: "NMC & WHO Recognized",
      eligibilityNeet: "NEET Qualified",
      admissionProcess: "Direct Admission",
      hostelInfo: "Hostel available on campus",
      livingCost: JSON.stringify({ monthly: "$200 - $300" }),
      careerScope: "Practice in India after FMGE.",
      publishStatus: "PUBLISHED",
      universities: {
        create: [{ universityId: u3.id }]
      }
    },
  });

  const russia = await prisma.mBBSCountry.create({
    data: {
      slug: "russia",
      name: "Russia",
      feeStructure: JSON.stringify({ total: "$20,000" }),
      recognitionStatus: "NMC & WHO Recognized",
      eligibilityNeet: "NEET Qualified",
      admissionProcess: "Application -> Invitation -> Visa",
      hostelInfo: "Government hostels available",
      livingCost: JSON.stringify({ monthly: "$150 - $250" }),
      careerScope: "Global recognition.",
      publishStatus: "PUBLISHED",
      universities: {
        create: [{ universityId: u4.id }]
      }
    },
  });

  // 6. Create Services
  await prisma.service.createMany({
    data: [
      {
        slug: "study-abroad-admissions",
        name: "Study Abroad Admissions",
        description: "End-to-end admission guidance.",
        process: "Profile Evaluation -> University Selection -> Application",
      },
      {
        slug: "mbbs-abroad",
        name: "MBBS Abroad",
        description: "Secure admission in top medical universities.",
        process: "Counselling -> University Selection -> Admission -> Visa",
      },
      {
        slug: "career-counselling",
        name: "Career Counselling",
        description: "Psychometric testing and career path mapping.",
        process: "Test -> Report -> Counselling Session",
      },
    ],
  });

  // 7. Create FAQs
  await prisma.fAQ.createMany({
    data: [
      { question: "Do I need IELTS for Canada?", answer: "Yes, generally an overall band of 6.0 or 6.5 is required.", scope: "COUNTRY", scopeRefId: canada.id },
      { question: "Is NEET compulsory for MBBS abroad?", answer: "Yes, if you wish to practice in India later.", scope: "MBBS_COUNTRY", scopeRefId: georgia.id },
      { question: "Do you charge consultation fees?", answer: "Our initial consultation is completely free.", scope: "GLOBAL" },
    ],
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
