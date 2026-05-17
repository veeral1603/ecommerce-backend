import redisClient from "@/lib/redis";
import { EMAIL_QUEUE_NAME } from "@/queues/email.queue";
import { Worker, type Job } from "bullmq";
import type { EmailJobData } from "@/types";

const emailProcessor = async (_job: Job<EmailJobData>) => {
  await new Promise((resolve) => setTimeout(resolve, 10000));
};

new Worker(EMAIL_QUEUE_NAME, emailProcessor, {
  connection: redisClient,
});

console.log("Email worker is running...");
