import { z } from "zod";

export const submitSchema = z
  .object({
    email: z.string().email(),
    confirmEmail: z.string().email(),
    answers: z.record(z.string(), z.string().optional()).default({}),
  })
  .refine(
    (data) => data.email.trim().toLowerCase() === data.confirmEmail.trim().toLowerCase(),
    { message: "E-mails não conferem", path: ["confirmEmail"] }
  );

export type SubmitPayload = z.infer<typeof submitSchema>;
