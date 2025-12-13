import React from "react";
import { pdf } from "@react-pdf/renderer";
import { RetrospectivaPdf } from "./RetrospectivaPdf";

async function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

export async function generatePdfBuffer(params: {
  email: string;
  answers: Record<string, string | undefined>;
}): Promise<Buffer> {
  const { email, answers } = params;

  const doc = <RetrospectivaPdf email={email} answers={answers} />;

  const out = await pdf(doc).toBuffer();

  if (Buffer.isBuffer(out)) return out;
  if (out instanceof Uint8Array) return Buffer.from(out);

  return streamToBuffer(out as unknown as NodeJS.ReadableStream);
}
