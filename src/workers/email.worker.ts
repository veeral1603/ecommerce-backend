import redisClient from "@/lib/redis";
import type { EmailJobData } from "@/types";

const EMAIL_QUEUE_KEY = "queue:email";

const processEmail = async (_emailJobData: EmailJobData) => {
  // Email sending logic
};

const worker = async () => {
  while (true) {
    const emailDataString = await redisClient.brpop(EMAIL_QUEUE_KEY, 0);
    if (!emailDataString) {
      continue;
    }

    const emailData: EmailJobData = JSON.parse(emailDataString[1]);

    try {
      await processEmail(emailData);
    } catch (error) {
      console.error("Error processing email job:", error);
    }
  }
};

await worker();
