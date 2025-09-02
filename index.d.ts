export interface RenderOptions {
  /** Viewport width in pixels (default: 1200) */
  width?: number;
  /** Viewport height in pixels (default: 630) */
  height?: number;
  /** Capture the full scrollable page (default: false) */
  fullPage?: boolean;
  /** Transparent background (only applies to PNG) */
  transparent?: boolean;
  /** Output format (default: "png") */
  format?: "png" | "jpeg";
  /** JPEG quality 0–100 (only applies to JPEG) */
  quality?: number;
  /** Options passed directly to puppeteer.launch */
  puppeteerLaunchOptions?: import("puppeteer").PuppeteerLaunchOptions;
}

/**
 * Render an EJS template file to an HTML string.
 * @param ejsPath Path to the EJS template file.
 * @param data Data passed to the EJS template.
 */
export function renderEjsToHtml(
  ejsPath: string,
  data?: Record<string, any>
): Promise<string>;

/**
 * Render an EJS template into an image buffer (PNG or JPEG).
 * @param ejsPath Path to the EJS template file.
 * @param data Data passed to the EJS template.
 * @param options Rendering options.
 * @returns Buffer containing the image.
 */
export function renderEjsToImageBuffer(
  ejsPath: string,
  data?: Record<string, any>,
  options?: RenderOptions
): Promise<Buffer>;

/**
 * Render an EJS template into an image file (PNG or JPEG).
 * @param ejsPath Path to the EJS template file.
 * @param data Data passed to the EJS template.
 * @param outPath Path where the image will be saved.
 * @param options Rendering options.
 * @returns Absolute path to the saved file.
 */
export function renderEjsToImageFile(
  ejsPath: string,
  data: Record<string, any>,
  outPath: string,
  options?: RenderOptions
): Promise<string>;
