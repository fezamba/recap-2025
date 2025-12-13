import { Resend } from "resend";

const resendKey = process.env.RESEND_API_KEY;
const emailFrom = process.env.EMAIL_FROM;

if (!resendKey) throw new Error("Missing env RESEND_API_KEY");
if (!emailFrom) throw new Error("Missing env EMAIL_FROM");

const resend = new Resend(resendKey);

export async function sendResultsEmail(params: {
  to: string;
  subject: string;
  html: string;
  pdfBuffer: Buffer;
  pdfFilename?: string;
}): Promise<{ messageId?: string }> {
  const { to, subject, html, pdfBuffer, pdfFilename = "retrospectiva.pdf" } = params;

  const { data, error } = await resend.emails.send({
    from: emailFrom!,
    to,
    subject,
    html,
    attachments: [
      {
        filename: pdfFilename,
        content: pdfBuffer.toString("base64"),
      },
    ],
  });

  if (error) throw new Error(error.message);

  return { messageId: data?.id };
}
