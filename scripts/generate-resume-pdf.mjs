/**
 * Generates public/resume.pdf from the resume HTML template.
 *
 * Source of truth: scripts/resume-template.html  (edit this to update the resume)
 * Output:          public/resume.pdf              (linked from the portfolio's Resume buttons)
 *
 * Usage: npm run resume:pdf
 *
 * Uses the system Chrome installation -no Chromium download required.
 * Override with: CHROME_PATH="C:\path\to\chrome.exe" npm run resume:pdf
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
].filter(Boolean);

const browser = await puppeteer.launch({
  executablePath: CHROME_CANDIDATES[0],
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--force-device-scale-factor=1"],
});

try {
  const page = await browser.newPage();
  const html = await readFile(path.join(root, "scripts", "resume-template.html"), "utf8");
  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.pdf({
    path: path.join(root, "public", "resume.pdf"),
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
  });
  console.log("Wrote public/resume.pdf");
} finally {
  await browser.close();
}
