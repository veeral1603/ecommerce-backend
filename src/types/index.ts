export type EmailJobData =
  | {
      type: "verification";
      recipientEmail: string;
      recipientName: string;
      payload: {
        verificationToken: string;
      };
    }
  | {
      type: "passwordReset";
      recipientEmail: string;
      recipientName: string;
      payload: {
        passwordResetToken: string;
      };
    }
  | {
      type: "welcome";
      recipientEmail: string;
      recipientName: string;
      payload?: Record<string, never>;
    };
