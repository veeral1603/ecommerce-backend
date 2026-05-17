export type EmailJobType = "verification" | "welcome" | "passwordReset";
export interface EmailJobData {
  recipient: string;
  recipientName: string;
  type: EmailJobType;
  payload: Record<string, unknown>;
}
