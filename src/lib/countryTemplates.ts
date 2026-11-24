export interface CountryTemplateData {
  name: string;
  slug: string;
  overview: string;
  popularCourses: string[];
  costBreakdown: {
    undergraduateTuition: string;
    postgraduateTuition: string;
    livingExpenses: string;
    visaFees: string;
    workRights: string;
    postStudyWork: string;
  };
  eligibility: string;
  scholarships: string;
  visaOverview: string;
  careerOutcomes: string;
}

export const POPULAR_COUNTRY_TEMPLATES: Record<string, CountryTemplateData> = {
  "united-kingdom": {
    name: "United Kingdom",
    slug: "united-kingdom",
    overview:
      "The United Kingdom is a premier global education powerhouse, home to historic Russell Group universities and modern innovative institutions. Offering internationally respected 3-year undergraduate and 1-year master's degrees, the UK delivers faster degree completion, high return on investment, and exposure to rich multicultural student communities across London, Manchester, Edinburgh, and Birmingham.",
    popularCourses: [
      "Business & Management (MBA)",
      "Computer Science & AI",
      "Data Science & Analytics",
      "Finance & Accounting",
      "Law & International Relations",
      "Mechanical & Civil Engineering",
      "Biomedical Sciences",
    ],
    costBreakdown: {
      undergraduateTuition: "£13,000 - £26,000 / year",
      postgraduateTuition: "£14,500 - £30,000 / year",
      livingExpenses: "£9,207 - £12,006 / year (Outer London) | £12,000 - £15,000 (London)",
      visaFees: "£490 Student Visa + £776/yr Immigration Health Surcharge (IHS)",
      workRights: "20 hours / week during term time, full-time during vacations",
      postStudyWork: "2-year Graduate Route visa (3 years for doctoral graduates)",
    },
    eligibility:
      "Undergraduate: 65% - 85% in Class 12 (CBSE/ICSE/State Board). Postgraduate: 55% - 70% in recognized Bachelor's degree. English Proficiency: IELTS 6.0 - 6.5 (min 5.5 in each band), PTE 58 - 65, or TOEFL iBT 80 - 90. Many UK universities offer English score waivers for students scoring 70%+ in Class 12 English.",
    scholarships:
      "Chevening Scholarships (full funding), Commonwealth Scholarships, GREAT Scholarships (£10,000 fee waiver), British Council STEM Scholarships for Women, and University Merit Bursaries offering 15% - 50% tuition discounts.",
    visaOverview:
      "UK Student Visa (Points-Based System). Key requirements: Confirmation of Acceptance for Studies (CAS) from a licensed student sponsor, maintenance funds maintained for 28 consecutive days, valid passport, TB clearance certificate, and biometric enrollment via VFS Global.",
    careerOutcomes:
      "The 2-year Graduate Route allows students to work or search for jobs at any skill level with no minimum salary cap. Major hiring industries include Financial Services (City of London), Technology & FinTech, Healthcare (NHS), Engineering, Management Consulting, and Creative Media.",
  },
  "united-states": {
    name: "United States",
    slug: "united-states",
    overview:
      "The United States remains the world's most sought-after higher education destination, boasting top-ranked Ivy League and Tier-1 research universities. With unmatched academic flexibility, interdisciplinary curricula, cutting-edge STEM research facilities, and generous corporate sponsorships, studying in the US equips students for global industry leadership.",
    popularCourses: [
      "Computer Science & Software Engineering",
      "Artificial Intelligence & Machine Learning",
      "MBA & Business Analytics",
      "Biotechnology & Health Informatics",
      "Electrical & Computer Engineering",
      "Finance & Quantitative Economics",
    ],
    costBreakdown: {
      undergraduateTuition: "$22,000 - $48,000 / year",
      postgraduateTuition: "$25,000 - $52,000 / year",
      livingExpenses: "$12,000 - $18,000 / year",
      visaFees: "$185 F-1 Visa fee + $350 SEVIS I-901 fee",
      workRights: "20 hours / week on-campus during academic terms; full-time during breaks",
      postStudyWork: "12-month OPT + 24-month STEM OPT extension (total 36 months)",
    },
    eligibility:
      "Undergraduate: 70%+ in high school with SAT/ACT (often optional). Postgraduate: 4-year Bachelor's or 3-year degree with WES evaluation (or 16 years education equivalent), minimum 3.0 GPA (60%+). GRE/GMAT required by selective programs, with many universities offering waivers. English: IELTS 6.5+, TOEFL 85+, or Duolingo 110+.",
    scholarships:
      "Fulbright-Nehru Fellowships, Graduate Teaching Assistantships (GTA), Graduate Research Assistantships (GRA) with full tuition waiver and monthly stipends, and University Dean's Merit Scholarships ranging from $5,000 to $25,000 annually.",
    visaOverview:
      "US F-1 Student Visa. Requires Form I-20 issued by SEVP-certified institution, payment of SEVIS fee, DS-160 online application, and mandatory in-person visa interview at the US Embassy/Consulate demonstrating genuine student intent and strong financial support.",
    careerOutcomes:
      "STEM degree graduates qualify for up to 3 years of post-study Optional Practical Training (OPT). Premier employment markets include Silicon Valley, New York, Seattle, Austin, and Boston across Tech, AI, Investment Banking, Pharmaceuticals, and Aerospace.",
  },
  canada: {
    name: "Canada",
    slug: "canada",
    overview:
      "Canada is globally celebrated for its welcoming multicultural society, world-class publicly funded universities, affordable high-quality education, and transparent pathways to permanent residency. Students benefit from robust co-op work programs integrated directly into degree curricula.",
    popularCourses: [
      "Computer Science & Cybersecurity",
      "Information Technology & Networking",
      "Business Administration & Supply Chain",
      "Mechanical & Civil Engineering",
      "Data Analytics & Big Data",
      "Health Administration & Nursing",
    ],
    costBreakdown: {
      undergraduateTuition: "CAD $20,000 - $38,000 / year",
      postgraduateTuition: "CAD $18,000 - $35,000 / year",
      livingExpenses: "CAD $20,635 / year (GIC requirement)",
      visaFees: "CAD $150 Study Permit + CAD $85 Biometrics",
      workRights: "24 hours / week off-campus during terms; full-time during scheduled breaks",
      postStudyWork: "Post-Graduation Work Permit (PGWP) up to 3 years",
    },
    eligibility:
      "Undergraduate: 65%+ in Class 12. Postgraduate: Minimum 60% - 65% in recognized 4-year Bachelor's degree (many colleges accept 3-year degrees). English Proficiency: IELTS Academic 6.5 overall (no band less than 6.0), PTE 60+, or TOEFL 88+.",
    scholarships:
      "Vanier Canada Graduate Scholarships, Ontario Graduate Scholarships, Pierre Elliott Trudeau Foundation Scholarships, and university entrance awards ranging from CAD $2,000 to CAD $10,000 for top academic achievers.",
    visaOverview:
      "Canadian Study Permit with Provincial Attestation Letter (PAL) where required. Key requirements include guaranteed Letter of Acceptance (LOA), CAD $20,635 Guaranteed Investment Certificate (GIC), upfront medical exam, and police clearance certificate.",
    careerOutcomes:
      "Up to 3-year PGWP allowing unrestricted full-time employment. Direct immigration pathways via Express Entry (Canadian Experience Class) and Provincial Nominee Programs (PNP) in Ontario, British Columbia, and Alberta.",
  },
  australia: {
    name: "Australia",
    slug: "australia",
    overview:
      "Australia is home to 7 of the world's top 100 universities, including the renowned Group of Eight (Go8). Renowned for its relaxed lifestyle, clean modern cities, high standard of living, and dynamic research ecosystems, Australia offers generous post-study work rights and strong employment prospects.",
    popularCourses: [
      "Information Technology & Cloud Computing",
      "Professional Accounting & Finance",
      "Mining & Renewable Energy Engineering",
      "Nursing & Allied Health",
      "Business Analytics & Project Management",
      "Hospitality & Tourism Management",
    ],
    costBreakdown: {
      undergraduateTuition: "AUD $28,000 - $45,000 / year",
      postgraduateTuition: "AUD $30,000 - $48,000 / year",
      livingExpenses: "AUD $29,710 / year (Department of Home Affairs standard)",
      visaFees: "AUD $1,600 Student Visa (Subclass 500)",
      workRights: "48 hours per fortnight during study terms; unlimited during breaks",
      postStudyWork: "Temporary Graduate Visa (Subclass 485) 2 to 4 years",
    },
    eligibility:
      "Undergraduate: 65% - 85% in Class 12. Postgraduate: 60%+ in Bachelor's degree. English Requirements: IELTS Academic 6.5 (minimum 6.0 in each band) or PTE Academic 58 - 64. Genuine Student (GS) assessment required for all applicants.",
    scholarships:
      "Australia Awards, Destination Australia Scholarships (up to AUD $15,000/yr for regional studies), Vice-Chancellor's International Excellence Scholarships, and university fee remissions between 20% and 50%.",
    visaOverview:
      "Subclass 500 Student Visa. Requirements include Confirmation of Enrolment (CoE), Overseas Student Health Cover (OSHC), financial capacity proof for 1 year living + tuition fees, Genuine Student (GS) statement, and biometric capture.",
    careerOutcomes:
      "Temporary Graduate Visa (Subclass 485) provides 2 to 4 years of work rights. Regional study destinations (Adelaide, Perth, Gold Coast, Wollongong) grant additional 1-2 years of post-study stay.",
  },
  germany: {
    name: "Germany",
    slug: "germany",
    overview:
      "Germany is Europe's economic powerhouse and the premier destination for tuition-free or low-cost higher education. World-famous for its TU9 technical universities, cutting-edge engineering, and automotive mastery, Germany offers English-taught bachelor's and master's degrees with virtually no tuition fees at public universities.",
    popularCourses: [
      "Automotive & Mechanical Engineering",
      "Computer Science & Software Technology",
      "Data Science & Artificial Intelligence",
      "Renewable Energy & Sustainable Technology",
      "International Management & MBA",
      "Biomedical Engineering",
    ],
    costBreakdown: {
      undergraduateTuition: "€0 at Public Universities (Nominal Semester Fee €150 - €350)",
      postgraduateTuition: "€0 at Public Universities (Private: €10,000 - €18,000 / year)",
      livingExpenses: "€11,208 / year (€934/month Blocked Account - Sperrkonto)",
      visaFees: "€75 National Visa (Category D)",
      workRights: "140 full days or 280 half days per calendar year",
      postStudyWork: "18-month Job Seeker Visa / Residence Permit post-graduation",
    },
    eligibility:
      "Undergraduate: 12th + 1 year higher education or Studienkolleg / Feststellungsprüfung (FSP) with 70%+, or direct entry with high CBSE/JEE scores. Postgraduate: 4-year Bachelor's degree with 68%+ (ECTS credit alignment essential). English: IELTS 6.5+ or TOEFL 90+. Basic German (A1/A2) recommended.",
    scholarships:
      "DAAD Scholarships (full funding + monthly allowance €934), Heinrich Böll Foundation, Konrad-Adenauer-Stiftung, and Deutschlandstipendium (€300/month).",
    visaOverview:
      "German National Student Visa (Category D). Key steps: APS Certificate (mandatory for Indian students), official University Admission Letter (Zulassungsbescheid), Blocked Account (Sperrkonto) funded with €11,208, and statutory health insurance (TK/Barmer).",
    careerOutcomes:
      "18-month post-study work visa to find employment matching your degree. Direct pathway to the EU Blue Card and German Permanent Residency (PR) after just 21-27 months of qualified employment.",
  },
  ireland: {
    name: "Ireland",
    slug: "ireland",
    overview:
      "Ireland is Europe's premier technology and finance hub, hosting the European headquarters of Google, Apple, Microsoft, Meta, Pfizer, and Intel. Known as the Silicon Valley of Europe, Ireland offers 1-year master's degrees, an English-speaking environment, and a generous 2-year Third Level Graduate work scheme.",
    popularCourses: [
      "Data Analytics & Big Data",
      "Computer Science & Cloud Systems",
      "Pharmaceutical Sciences & Biotechnology",
      "FinTech & Quantitative Finance",
      "Digital Marketing & Strategy",
      "Cybersecurity",
    ],
    costBreakdown: {
      undergraduateTuition: "€11,000 - €25,000 / year",
      postgraduateTuition: "€13,000 - €28,000 / year",
      livingExpenses: "€10,000 - €14,000 / year",
      visaFees: "€60 Single Entry / €100 Multi-Entry + €300 IRP Card",
      workRights: "20 hours / week during terms; 40 hours during June-September & Christmas",
      postStudyWork: "2-year Stay Back Option (Third Level Graduate Scheme - Stamp 1G)",
    },
    eligibility:
      "Undergraduate: 70%+ in Class 12. Postgraduate: 60%+ in Bachelor's degree (First or High Second Class). English: IELTS 6.5 (minimum 6.0 in each band), PTE 63, or TOEFL 88.",
    scholarships:
      "Government of Ireland International Education Scholarships (€10,000 stipend + full tuition waiver), university merit awards (€2,000 to €5,000), and departmental excellence grants.",
    visaOverview:
      "Irish Long Stay 'D' Study Visa. Requires letter of acceptance, tuition fee receipt, proof of €10,000 immediate access funds, medical insurance, and evidence of family finances.",
    careerOutcomes:
      "2-year Stamp 1G graduate visa with direct transition into Critical Skills Employment Permit (CSEP) leading to Stamp 4 permanent residency after 2 years.",
  },
  france: {
    name: "France",
    slug: "france",
    overview:
      "France is celebrated for its prestigious Grandes Écoles and historic universities, ranking among the world's elite in management, aerospace, luxury branding, and engineering. With highly subsidized public tuition, extensive English-taught master's degrees, and French government housing subsidies (CAF), France is a top European destination.",
    popularCourses: [
      "Master in Management (MiM) & MBA",
      "Luxury Brand & Fashion Management",
      "Aerospace & Aeronautical Engineering",
      "Data Science & AI",
      "Hospitality & Culinary Arts",
      "Finance & International Business",
    ],
    costBreakdown: {
      undergraduateTuition: "€2,770 / year (Public Universities) | €8,000 - €16,000 (Private/Business)",
      postgraduateTuition: "€3,770 / year (Public Universities) | €12,000 - €25,000 (Grandes Écoles)",
      livingExpenses: "€8,000 - €12,000 / year (CAF provides 30%-40% housing subsidy)",
      visaFees: "€99 Long Stay Visa (VLS-TS)",
      workRights: "Up to 964 hours per year (~20 hours/week, 60% of annual legal working time)",
      postStudyWork: "2-year post-study work visa (APS / RECE) + 5-year Schengen visa for Indian alumni",
    },
    eligibility:
      "Undergraduate: 65%+ in Class 12. Postgraduate: 55%+ in recognized Bachelor's degree. Many English programs do not require French proficiency, though A2 level is recommended for daily life. IELTS 6.0 - 6.5 or TOEFL 80+.",
    scholarships:
      "Charpak Scholarship (monthly stipend €860 + tuition waiver + visa waiver), Eiffel Excellence Scholarship, and Business School Dean's merit scholarships up to 40% tuition reduction.",
    visaOverview:
      "Campus France NOC and Études en France procedure followed by VLS-TS Long-Stay Student Visa application with VFS Global. Requires proof of €615/month living expenses.",
    careerOutcomes:
      "2-year post-graduation job search visa. Under the Franco-Indian partnership agreement, Indian students with a master's degree from France are granted a 5-year short-stay Schengen visa.",
  },
  "new-zealand": {
    name: "New Zealand",
    slug: "new-zealand",
    overview:
      "New Zealand offers 100% of its universities ranked within the global top 3% by QS. Known for scenic natural landscapes, welcoming communities, and safety, New Zealand emphasizes practical, hands-on learning, environmental sustainability, and innovation.",
    popularCourses: [
      "Information Technology & Software Development",
      "Agribusiness & Food Science",
      "Civil & Environmental Engineering",
      "Business Analytics & Management",
      "Tourism & Hospitality Management",
      "Health Sciences & Nursing",
    ],
    costBreakdown: {
      undergraduateTuition: "NZD $24,000 - $36,000 / year",
      postgraduateTuition: "NZD $26,000 - $42,000 / year",
      livingExpenses: "NZD $20,000 / year (Immigration NZ requirement)",
      visaFees: "NZD $430 Fee Paying Student Visa",
      workRights: "20 hours / week during terms; full-time during breaks",
      postStudyWork: "Post-Study Work Visa up to 3 years depending on qualification level",
    },
    eligibility:
      "Undergraduate: 65% - 75% in Class 12. Postgraduate: 60%+ in Bachelor's degree. English: IELTS 6.0 - 6.5 or PTE 58+.",
    scholarships:
      "Manaaki New Zealand Scholarships, University International Excellence Awards (NZD $5,000 - $10,000), and Vice-Chancellor's Global Awards.",
    visaOverview:
      "Fee Paying Student Visa. Evidence of genuine student status, approved health check/chest X-ray, police clearance, and living funds of NZD $20,000 for one full academic year.",
    careerOutcomes:
      "Up to 3-year Post Study Work Visa allowing open employment, with pathways to the Skilled Migrant Category Resident Visa.",
  },
  dubai: {
    name: "Dubai (UAE)",
    slug: "dubai",
    overview:
      "Dubai has emerged as the Middle East's premier global higher education destination, housing international branch campuses of top UK, Australian, and US universities in Dubai International Academic City (DIAC) and Dubai Knowledge Park. Students gain internationally recognized degrees with lower living costs, zero income tax, and rapid visa processing.",
    popularCourses: [
      "International Business & MBA",
      "Artificial Intelligence & Computer Science",
      "Civil & Petroleum Engineering",
      "Hospitality & Luxury Tourism",
      "Digital Marketing & E-Commerce",
      "Logistics & Global Supply Chain",
    ],
    costBreakdown: {
      undergraduateTuition: "AED 40,000 - 80,000 / year (₹9,00,000 - ₹18,00,000)",
      postgraduateTuition: "AED 50,000 - 95,000 / year (₹11,00,000 - ₹21,00,000)",
      livingExpenses: "AED 25,000 - 40,000 / year",
      visaFees: "AED 2,500 - 3,500 Student Residence Visa (sponsored by university)",
      workRights: "Part-time work permitted under CDA and university work permits",
      postStudyWork: "UAE Green Visa (5-year residency) or Golden Visa for top graduates",
    },
    eligibility:
      "Undergraduate: 60%+ in Class 12. Postgraduate: 55%+ in Bachelor's degree. English: IELTS 6.0 or TOEFL 75 (English waiver often available based on Class 12 scores). Fast-track 2-3 week admissions without embassy interview.",
    scholarships:
      "University Academic Merit Scholarships offering 15% to 50% tuition discounts, early bird enrollment grants, and high-achiever fee remissions.",
    visaOverview:
      "University-sponsored 1-year renewable student residence visa. Fast-track processing (typically 10-15 working days) with in-country medical fitness test and Emirates ID biometric registration.",
    careerOutcomes:
      "Dubai's tax-free job market spans logistics, aviation, tech, finance, and hospitality. Outstanding university graduates with GPA 3.8+ qualify for the coveted 10-year UAE Golden Visa.",
  },
  singapore: {
    name: "Singapore",
    slug: "singapore",
    overview:
      "Singapore is Asia's global education and financial nucleus, boasting world-class institutions like NUS and NTU alongside campuses of leading international business schools. Combining rigorous academics, futuristic infrastructure, and exceptional safety, Singapore provides a direct bridge to Asian and multinational corporate headquarters.",
    popularCourses: [
      "Computer Science & Cyber Systems",
      "Business Administration & Global Finance",
      "Data Analytics & Supply Chain Management",
      "Biotechnology & Life Sciences",
      "Hospitality & Event Management",
    ],
    costBreakdown: {
      undergraduateTuition: "SGD $18,000 - $38,000 / year",
      postgraduateTuition: "SGD $22,000 - $45,000 / year",
      livingExpenses: "SGD $12,000 - $18,000 / year",
      visaFees: "SGD $30 Processing + SGD $60 Issuance (Student's Pass)",
      workRights: "16 hours / week during terms at approved institutions; full-time during vacations",
      postStudyWork: "1-year Long-Term Social Visit Pass (LTVP) to seek employment",
    },
    eligibility:
      "Undergraduate: 80%+ in Class 12 for public universities; 60%+ for private institutes. Postgraduate: 65%+ in Bachelor's degree. English: IELTS 6.5+ or TOEFL 90+.",
    scholarships:
      "Singapore Government MOE Tuition Grant (up to 50% tuition subsidy in exchange for a 3-year service bond), ASEAN Scholarships, and university merit fellowships.",
    visaOverview:
      "Student's Pass processed through Singapore Immigration & Checkpoints Authority (ICA) SOLAR system with university in-principle approval (IPA).",
    careerOutcomes:
      "Transition from LTVP to Employment Pass (EP) or S-Pass with multinational employers across APAC headquarters located in Singapore.",
  },
};

export function getCountryTemplate(countryName: string): CountryTemplateData {
  if (!countryName || countryName.trim().length === 0) {
    return generateGenericTemplate("Study Destination");
  }

  const clean = countryName.toLowerCase().trim();

  // Match aliases
  if (clean.includes("uk") || clean.includes("united kingdom") || clean.includes("britain") || clean.includes("england")) {
    return POPULAR_COUNTRY_TEMPLATES["united-kingdom"];
  }
  if (clean.includes("us") || clean.includes("united states") || clean.includes("usa") || clean.includes("america")) {
    return POPULAR_COUNTRY_TEMPLATES["united-states"];
  }
  if (clean.includes("canada")) {
    return POPULAR_COUNTRY_TEMPLATES["canada"];
  }
  if (clean.includes("australia") || clean.includes("aussie")) {
    return POPULAR_COUNTRY_TEMPLATES["australia"];
  }
  if (clean.includes("german") || clean.includes("deutschland")) {
    return POPULAR_COUNTRY_TEMPLATES["germany"];
  }
  if (clean.includes("ireland") || clean.includes("irish")) {
    return POPULAR_COUNTRY_TEMPLATES["ireland"];
  }
  if (clean.includes("france") || clean.includes("french")) {
    return POPULAR_COUNTRY_TEMPLATES["france"];
  }
  if (clean.includes("new zealand") || clean.includes("nz")) {
    return POPULAR_COUNTRY_TEMPLATES["new-zealand"];
  }
  if (clean.includes("dubai") || clean.includes("uae") || clean.includes("emirates")) {
    return POPULAR_COUNTRY_TEMPLATES["dubai"];
  }
  if (clean.includes("singapore")) {
    return POPULAR_COUNTRY_TEMPLATES["singapore"];
  }

  return generateGenericTemplate(countryName.trim());
}

function generateGenericTemplate(country: string): CountryTemplateData {
  const slug = country
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  return {
    name: country,
    slug,
    overview: `Studying in ${country} offers international students an outstanding combination of accredited academic institutions, diverse educational opportunities, and vibrant cultural exposure. With globally recognized degree pathways, dedicated international student support centers, and cost-effective tuition frameworks, ${country} has become an increasingly favored higher education destination for ambitious students.`,
    popularCourses: [
      "Computer Science & Information Technology",
      "Business Administration & Management (MBA)",
      "Data Analytics & Artificial Intelligence",
      "Engineering & Applied Sciences",
      "International Business & Finance",
      "Health Sciences & Public Health",
    ],
    costBreakdown: {
      undergraduateTuition: "$8,000 - $20,000 / year",
      postgraduateTuition: "$10,000 - $24,000 / year",
      livingExpenses: "$7,000 - $12,000 / year",
      visaFees: "Standard Student Visa fee ($100 - $300)",
      workRights: "20 hours / week during academic terms",
      postStudyWork: "1 to 2 years post-study work visa / residence permit",
    },
    eligibility: `Undergraduate: Minimum 60% in Class 12 / Higher Secondary Certificate. Postgraduate: Minimum 55% - 60% in recognized Bachelor's degree. English Proficiency: IELTS 6.0 - 6.5, PTE 58+, or TOEFL iBT 80+. Many universities offer institutional English waivers based on high school medium of instruction.`,
    scholarships: `Merit-based university scholarships, international student fee waivers (15% - 35% tuition discount), government bilateral exchange grants, and early-decision application bursaries.`,
    visaOverview: `Student Visa requires official Letter of Acceptance from a certified institution, proof of sufficient financial funds to cover 1 year of tuition and living expenses, valid passport, medical insurance, and biometric submission at the relevant consulate or visa center.`,
    careerOutcomes: `Graduates benefit from post-study stay-back permissions, allowing employment in expanding local and multinational sectors including IT, business services, engineering, and healthcare.`,
  };
}
