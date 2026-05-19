import resend from "@/lib/resend";
import path from "path";
import { readFile } from "node:fs/promises";

export const sendVerificationEmail = async (
  recipientEmail: string,
  recipientName: string,
  token: string,
): Promise<void> => {
  const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  const htmlPath = path.join(
    process.cwd(),
    "src",
    "emails",
    "verification.email.html",
  );
  const htmlText = (await readFile(htmlPath, "utf-8"))
    .replace("{{name}}", recipientName)
    .replace("{{verification_link}}", verificationLink);

  await resend.emails.send({
    from: "Ecom <onboarding@resend.dev>",
    to: [recipientEmail],
    subject: "Verify Your Email Address",
    html: htmlText,
  });
};

export const sendWelcomeEmail = async (
  recipientEmail: string,
  recipientName: string,
): Promise<void> => {
  const storeUrl = `${process.env.FRONTEND_URL}`;

  const htmlPath = path.join(
    process.cwd(),
    "src",
    "emails",
    "welcome.email.html",
  );
  const htmlText = (await readFile(htmlPath, "utf-8"))
    .replace("{{name}}", recipientName)
    .replace("{{storeUrl}}", storeUrl);

  await resend.emails.send({
    from: "Ecom <onboarding@resend.dev>",
    to: [recipientEmail],
    subject: "Welcome to Ecom!",
    html: htmlText,
  });
};

export const sendPasswordResetEmail = async (
  recipientEmail: string,
  recipientName: string,
  token: string,
): Promise<void> => {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  const htmlPath = path.join(
    process.cwd(),
    "src",
    "emails",
    "password-reset.email.html",
  );
  const htmlText = (await readFile(htmlPath, "utf-8"))
    .replace("{{name}}", recipientName)
    .replace("{{reset_link}}", resetLink);

  await resend.emails.send({
    from: "Ecom <onboarding@resend.dev>",
    to: [recipientEmail],
    subject: "Reset Your Password",
    html: htmlText,
  });
};
