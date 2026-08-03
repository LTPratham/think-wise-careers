const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const countries = [
    { slug: 'australia', name: 'Australia', overview: 'Study in Australia for world-class education.', eligibility: 'IELTS 6.5', scholarships: 'Various available', visaOverview: 'Subclass 500', careerOutcomes: 'Great opportunities', publishStatus: 'PUBLISHED' },
    { slug: 'usa', name: 'USA', overview: 'Study in the USA for limitless opportunities.', eligibility: 'TOEFL 90', scholarships: 'Merit based', visaOverview: 'F1 Visa', careerOutcomes: 'High demand', publishStatus: 'PUBLISHED' },
    { slug: 'germany', name: 'Germany', overview: 'Study in Germany for free or low-cost education.', eligibility: 'IELTS 6.0 / German A2', scholarships: 'DAAD', visaOverview: 'Student visa', careerOutcomes: 'EU Blue Card', publishStatus: 'PUBLISHED' },
    { slug: 'ireland', name: 'Ireland', overview: 'Study in Ireland, the tech hub of Europe.', eligibility: 'IELTS 6.5', scholarships: 'Government funded', visaOverview: 'Stamp 2', careerOutcomes: '2 Year Post Study Work', publishStatus: 'PUBLISHED' },
    { slug: 'france', name: 'France', overview: 'Study in France with excellent scholarships.', eligibility: 'IELTS 6.0', scholarships: 'Charpak', visaOverview: 'VLS-TS', careerOutcomes: '2 Year Post Study Work', publishStatus: 'PUBLISHED' },
    { slug: 'dubai', name: 'Dubai', overview: 'Study in Dubai, a rapidly growing education hub.', eligibility: 'IELTS 5.5', scholarships: 'University specific', visaOverview: 'Student Visa', careerOutcomes: 'Tax free income', publishStatus: 'PUBLISHED' }
  ];

  for (const c of countries) {
    await prisma.country.upsert({
      where: { slug: c.slug },
      update: c,
      create: c
    });
  }
  
  const mbbs = [
    { slug: 'georgia', name: 'Georgia', recognitionStatus: 'NMC & WHO Approved', eligibilityNeet: 'NEET Qualified', admissionProcess: 'Direct Admission', hostelInfo: 'Available', careerScope: 'Global practice', publishStatus: 'PUBLISHED' },
    { slug: 'kazakhstan', name: 'Kazakhstan', recognitionStatus: 'NMC & WHO Approved', eligibilityNeet: 'NEET Qualified', admissionProcess: 'Direct Admission', hostelInfo: 'Available', careerScope: 'Global practice', publishStatus: 'PUBLISHED' }
  ];
  
  for (const c of mbbs) {
    await prisma.mBBSCountry.upsert({
      where: { slug: c.slug },
      update: c,
      create: c
    });
  }
}
main().then(() => console.log('Seeded successfully')).catch(console.error);
