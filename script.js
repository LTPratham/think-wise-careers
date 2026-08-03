const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const sa = await prisma.country.findMany({ select: { slug: true, name: true } });
  const mbbs = await prisma.mBBSCountry.findMany({ select: { slug: true, name: true } });
  console.log('Study Abroad:', sa);
  console.log('MBBS Abroad:', mbbs);
}
main().catch(console.error).finally(() => prisma.());
