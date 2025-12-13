import puppeteer from "puppeteer";

export async function generatePdfBuffer(params: {
  html: string;
  timeoutMs?: number;
}): Promise<Buffer> {
  const { html, timeoutMs = 20_000 } = params;

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    // Soft timeout guard: race PDF generation against a timer.
    const timer = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`PDF generation timed out after ${timeoutMs}ms`)), timeoutMs)
    );

    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfPromise = page.pdf({
      format: "A4",
      printBackground: true,
    });

    const pdf = await Promise.race([pdfPromise, timer]);
    return Buffer.from(pdf as Uint8Array);
  } finally {
    await browser.close();
  }
}
