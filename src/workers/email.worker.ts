import redisClient from "@/lib/redis";
import { EMAIL_QUEUE_NAME } from "@/queues/email.queue";
import { Worker, type Job } from "bullmq";
import type { EmailJobData } from "@/types";
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendWelcomeEmail,
} from "@/lib/resend";

const emailProcessor = async (_job: Job<EmailJobData>) => {
  const { recipientEmail, recipientName, type, payload } = _job.data;

  try {
    if (type === "verification") {
      await sendVerificationEmail(
        recipientEmail,
        recipientName,
        payload.verificationToken,
      );
    } else if (type === "passwordReset") {
      await sendPasswordResetEmail(
        recipientEmail,
        recipientName,
        payload.passwordResetToken,
      );
    } else if (type === "welcome") {
      await sendWelcomeEmail(recipientEmail, recipientName);
    } else {
      throw new Error(`Unknown email type`);
    }
  } catch (error) {
    console.error(`Failed to process email job for ${recipientEmail}:`, error);
    throw error; // Re-throw to let BullMQ handle retries
  }
};

new Worker(EMAIL_QUEUE_NAME, emailProcessor, {
  connection: redisClient,
});

console.log("Email worker is running...");
