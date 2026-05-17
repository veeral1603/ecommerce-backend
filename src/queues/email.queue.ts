import redisClient from "@/lib/redis";
import { Queue } from "bullmq";

export const EMAIL_QUEUE_NAME = "email-queue";

const emailQueue = new Queue(EMAIL_QUEUE_NAME, {
  connection: redisClient,
});

export default emailQueue;
