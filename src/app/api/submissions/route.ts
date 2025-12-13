import { NextResponse } from "next/server";
import { submitSchema } from "@/lib/validation";
import { assertRateLimit } from "@/lib/rateLimit";
import { getMongoClient, getDbName } from "@/lib/mongo";
import { renderEmailHtml } from "@/services/email/renderEmailHtml";
import { renderPdfHtml } from "@/services/pdf/renderPdfHtml";
import { generatePdfBuffer } from "@/services/pdf/generatePdf";
import { sendResultsEmail } from "@/services/email/sendEmail";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    await assertRateLimit(`submit:${ip}`);

    const body = await req.json();
    const parsed = submitSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { email, answers } = parsed.data;

    const client = await getMongoClient();
    const db = client.db(getDbName());
    const submissions = db.collection("submissions");

    const insert = await submissions.insertOne({
      email,
      createdAt: new Date(),
      answers,
      delivery: {
        status: "pending",
        sentAt: null,
        errorMessage: null,
        providerMessageId: null,
      },
    });

    const emailHtml = renderEmailHtml({ email, answers });
    const pdfHtml = renderPdfHtml({ email, answers });

    let pdfBuffer: Buffer;
    try {
      pdfBuffer = await generatePdfBuffer({ html: pdfHtml, timeoutMs: 20_000 });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "PDF generation failed";
      await submissions.updateOne(
        { _id: insert.insertedId },
        { $set: { "delivery.status": "failed", "delivery.errorMessage": msg } }
      );
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    const subject = "Sua Retrospectiva 2025 / Visão 2026";
    const send = await sendResultsEmail({ to: email, subject, html: emailHtml, pdfBuffer });

    await submissions.updateOne(
      { _id: insert.insertedId },
      {
        $set: {
          "delivery.status": "sent",
          "delivery.sentAt": new Date(),
          "delivery.providerMessageId": send.messageId ?? null,
        },
      }
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
