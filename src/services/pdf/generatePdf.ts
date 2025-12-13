import puppeteer from "puppeteer-core";
import fs from "node:fs";
import { execSync } from "node:child_process";

type GeneratePdfParams = {
  html: string;
  timeoutMs?: number;
};

function tryWhich(cmd: string): string | null {
  try {
    const out = execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
    return out || null;
  } catch {
    return null;
  }
}

function resolveExecutablePath(): string {
  const envPath = process.env.PUPPETEER_EXECUTABLE_PATH;
  if (envPath && fs.existsSync(envPath)) return envPath;

  const candidates = [
    "/usr/bin/google-chrome-stable",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/chrome",
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }

  const whichCandidates = ["google-chrome-stable", "google-chrome", "chromium", "chromium-browser"];
  for (const bin of whichCandidates) {
    const found = tryWhich(`which ${bin}`);
    if (found && fs.existsSync(found)) return found;
  }

  const binLs = tryWhich("ls -la /usr/bin | head -n 200") ?? "N/A";
  throw new Error(
    [
      "No browser executable found for puppeteer-core.",
      `Tried env PUPPETEER_EXECUTABLE_PATH=${envPath ?? "(unset)"}`,
      `Checked candidates: ${candidates.join(", ")}`,
      "Hint: ensure chromium/google-chrome is installed in the container.",
      "Debug /usr/bin snippet:",
      binLs,
    ].join("\n")
  );
}

export async function generatePdfBuffer({
  html,
  timeoutMs = 20_000,
}: GeneratePdfParams): Promise<Buffer> {
  const executablePath = resolveExecutablePath();

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
      margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" },
    });

    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}
