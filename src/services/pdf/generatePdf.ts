import puppeteer from "puppeteer-core";

type GeneratePdfParams = {
  html: string;
  timeoutMs?: number;
};

export async function generatePdfBuffer({
  html,
  timeoutMs = 20_000,
}: GeneratePdfParams): Promise<Buffer> {
  const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;

  if (!executablePath) {
    throw new Error("Missing env PUPPETEER_EXECUTABLE_PATH");
  }

  const browser = await puppeteer.launch({
    executablePath,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--no-zygote",
    ],
    timeout: timeoutMs,
  });

  try {
    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "networkidle0",
      timeout: timeoutMs,
    });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        bottom: "20mm",
        left: "15mm",
        right: "15mm",
      },
    });

    return Buffer.from(pdf);
  } catch (err) {
    console.error("PDF generation failed:", err);
    throw err;
  } finally {
    await browser.close();
  }
}
