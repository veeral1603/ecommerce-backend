export type EmailJobType = "verification" | "welcome" | "passwordReset";
export interface EmailJobData {
  recipientEmail: string;
  recipientName: string;
  type: EmailJobType;
  payload: Record<string, unknown>;
}
