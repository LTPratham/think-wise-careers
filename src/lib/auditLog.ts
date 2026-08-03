import { prisma } from "@/lib/prisma";

/**
 * Write an audit log entry for any admin mutation.
 * Called from API routes after successful mutations.
 */
export async function writeAuditLog(
  userId: string,
  action: string,
  entityType: string,
  entityId: string,
  changeSummary: Record<string, unknown> = {}
) {
  await prisma.auditLogEntry.create({
    data: {
      userId,
      action,
      entityType,
      entityId,
      changeSummary,
      timestamp: new Date(),
    },
  });
}
