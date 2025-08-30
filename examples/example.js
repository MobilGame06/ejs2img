import { renderEjsToImageBuffer } from "../src/index.js";
import fs from "node:fs/promises";

const data = {
    title: "Hello World 🚀",
    subtitle: "Generated as PNG and JPEG"
};

// PNG buffer
const pngBuffer = await renderEjsToImageBuffer("examples/card.ejs", data, {
    width: 1200,
    height: 630,
    format: "png"
});
await fs.writeFile("out.png", pngBuffer);

// JPEG buffer
const jpgBuffer = await renderEjsToImageBuffer("examples/card.ejs", data, {
    width: 1200,
    height: 630,
    format: "jpeg",
    quality: 85
});
await fs.writeFile("out.jpg", jpgBuffer);

console.log("✅ PNG and JPEG created");