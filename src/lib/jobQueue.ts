import { prisma } from "@/lib/prisma";
import type { JobType } from "@prisma/client";

/**
 * Enqueue an async job for downstream integrations.
 * Phase 1: DB-backed stub. The abstraction is designed to be
 * swappable to a real message broker (Redis/BullMQ, SQS, etc.) later.
 *
 * Jobs are written to integration_job_queue with status PENDING.
 * A future worker process will pick them up for retry/processing.
 */
export async function enqueueJob(
  jobType: JobType,
  payload: any
) {
  return prisma.integrationJobQueue.create({
    data: {
      jobType,
      payload,
      status: "PENDING",
      retryCount: 0,
    },
  });
}

/**
 * Process pending jobs (Phase 1 stub).
 * In production, this would be a background worker with retry/backoff.
 * For now, it marks jobs as COMPLETED immediately.
 */
export async function processJobs() {
  const pendingJobs = await prisma.integrationJobQueue.findMany({
    where: { status: "PENDING" },
    take: 10,
    orderBy: { createdAt: "asc" },
  });

  for (const job of pendingJobs) {
    try {
      // Phase 1: Log and mark completed
      // Phase 2+: Actually send emails, notifications, etc.
      console.log(`[JobQueue] Processing job ${job.id}: ${job.jobType}`, job.payload);

      await prisma.integrationJobQueue.update({
        where: { id: job.id },
        data: { status: "COMPLETED" },
      });
    } catch (error) {
      const retryCount = job.retryCount + 1;
      const newStatus = retryCount >= 3 ? "FAILED" : "RETRYING";

      await prisma.integrationJobQueue.update({
        where: { id: job.id },
        data: {
          status: newStatus,
          retryCount,
          lastError: error instanceof Error ? error.message : "Unknown error",
        },
      });
    }
  }
}
