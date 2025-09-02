import fs from "node:fs/promises";
import path from "node:path";
import ejs from "ejs";
import puppeteer from "puppeteer";

/**
 * Render an EJS template file to an HTML string.
 * @param {string} ejsPath Path to the EJS template file.
 * @param {object} [data={}] Data to inject into the template.
 * @returns {Promise<string>} HTML string.
 */
export async function renderEjsToHtml(ejsPath, data = {}) {
    const absPath = path.resolve(ejsPath);
    const template = await fs.readFile(absPath, "utf8");
    return ejs.render(template, data, { filename: absPath });
}

/**
 * Render an EJS template file into an image buffer (PNG or JPEG).
 * @param {string} ejsPath Path to the EJS template file.
 * @param {object} [data={}] Data to inject into the template.
 * @param {object} [options={}] Rendering options.
 * @param {number} [options.width=1200] Viewport width in px.
 * @param {number} [options.height=630] Viewport height in px.
 * @param {boolean} [options.fullPage=false] Capture full page.
 * @param {boolean} [options.transparent=false] Transparent background (PNG only).
 * @param {"png"|"jpeg"} [options.format="png"] Image format.
 * @param {number} [options.quality] JPEG quality (0–100).
 * @param {object} [options.puppeteerLaunchOptions] Options passed directly to puppeteer.launch.
 * @returns {Promise<Buffer>} Image buffer.
 */
export async function renderEjsToImageBuffer(ejsPath, data = {}, options = {}) {
    const {
        width = 1200,
        height = 630,
        fullPage = false,
        transparent = false,
        format = "png",
        quality,
        puppeteerLaunchOptions = {}
    } = options;

    const html = await renderEjsToHtml(ejsPath, data);

    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        ...puppeteerLaunchOptions
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width, height });
        await page.setContent(html, { waitUntil: "networkidle0" });

        return await page.screenshot({
            fullPage,
            omitBackground: transparent,
            type: format,
            quality: format === "jpeg" ? quality || 80 : undefined
        });
    } finally {
        await browser.close();
    }
}

/**
 * Convenience: render an EJS template and write an image (PNG/JPEG) to disk.
 * @param {string} ejsPath Path to EJS file.
 * @param {object} data Template data.
 * @param {string} outPath Path where the image will be saved.
 * @param {object} [options] Same as renderEjsToImageBuffer.
 * @returns {Promise<string>} Absolute path of the saved image.
 */
export async function renderEjsToImageFile(ejsPath, data, outPath, options = {}) {
    const buffer = await renderEjsToImageBuffer(ejsPath, data, options);
    const absOut = path.resolve(outPath);
    await fs.mkdir(path.dirname(absOut), { recursive: true });
    await fs.writeFile(absOut, buffer);
    return absOut;
}