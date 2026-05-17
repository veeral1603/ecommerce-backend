import redisClient from "@/lib/redis";
import type { EmailJobData } from "@/types";

const EMAIL_QUEUE_KEY = "queue:email";

export const addEmailToQueue = async (emailData: EmailJobData) => {
  await redisClient.rpush(EMAIL_QUEUE_KEY, JSON.stringify(emailData));
};
