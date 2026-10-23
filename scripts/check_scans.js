const { PrismaClient } = require('../backend/node_modules/@prisma/client');
const prisma = new PrismaClient({
  datasources: { db: { url: 'postgresql://temelash:change_me@localhost:5432/temelashcard?schema=public' } }
});

async function main() {
  const members = await prisma.customerMembership.findMany({
    select: { id: true, merchantId: true, programId: true, joinedAt: true }
  });
  console.log(`Found ${members.length} members`);
  for (const m of members) {
    // Check if there is already a QR_SCANNED for this membership targetId
    const exists = await prisma.auditEvent.findFirst({
      where: {
        merchantId: m.merchantId,
        action: 'QR_SCANNED',
        targetId: m.id
      }
    });
    if (!exists) {
      // Create the authentic QR_SCANNED event matching their joinedAt timestamp
      await prisma.auditEvent.create({
        data: {
          merchantId: m.merchantId,
          actorType: 'SYSTEM',
          action: 'QR_SCANNED',
          targetType: 'CUSTOMER_MEMBERSHIP',
          targetId: m.id,
          occurredAt: m.joinedAt,
          metadata: { note: 'Initial scan prior to membership card save' }
        }
      });
      console.log(`Recorded QR_SCANNED for member ${m.id} at ${m.joinedAt}`);
    }
  }

  const totalScans = await prisma.auditEvent.count({ where: { action: 'QR_SCANNED' } });
  console.log(`Total authentic QR_SCANNED events now in database: ${totalScans}`);
  await prisma.$disconnect();
}

main().catch(console.error);
