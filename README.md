# ejs2img

Convert EJS templates into PNG or JPEG images using Puppeteer. Perfect for generating social media cards, certificates, badges, or any visual content from your templates.

## Features

- 🎨 Render EJS templates to PNG or JPEG images
- 📏 Customizable viewport dimensions
- 🖼️ Support for full page screenshots
- 🎯 Transparent backgrounds (PNG only)
- ⚡ Buffer or file output options
- 🚀 Built with Puppeteer for high-quality rendering

## Installation
[![NPM](https://nodei.co/npm/ejs2img.png)](https://www.npmjs.com/package/ejs2img)

```bash
npm install ejs2img
```

## Quick Start

```javascript
import { renderEjsToImageBuffer } from "ejs2img";

// Render EJS template to image buffer
const imageBuffer = await renderEjsToImageBuffer("template.ejs", {
  title: "Hello World",
  subtitle: "Generated with ejs2img",
});

// Save to file
import fs from "fs/promises";
await fs.writeFile("output.png", imageBuffer);
```

## API Reference

### renderEjsToHtml(ejsPath, data)

Render an EJS template to HTML string.

**Parameters:**

- `ejsPath` (string): Path to the EJS template file
- `data` (object, optional): Data to pass to the template

**Returns:** `Promise<string>` - HTML string

### renderEjsToImageBuffer(ejsPath, data, options)

Render an EJS template to image buffer.

**Parameters:**

- `ejsPath` (string): Path to the EJS template file
- `data` (object, optional): Data to pass to the template
- `options` (object, optional): Rendering options

**Options:**

- `width` (number): Viewport width in pixels (default: 1200)
- `height` (number): Viewport height in pixels (default: 630)
- `fullPage` (boolean): Capture full scrollable page (default: false)
- `transparent` (boolean): Transparent background, PNG only (default: false)
- `format` (string): Output format "png" or "jpeg" (default: "png")
- `quality` (number): JPEG quality 0-100 (default: 80)

**Returns:** `Promise<Buffer>` - Image buffer

### renderEjsToImageFile(ejsPath, data, outPath, options)

Render an EJS template directly to an image file.

**Parameters:**

- `ejsPath` (string): Path to the EJS template file
- `data` (object): Data to pass to the template
- `outPath` (string): Output file path
- `options` (object, optional): Same options as `renderEjsToImageBuffer`

**Returns:** `Promise<string>` - Absolute path to the saved file

## Examples

### Basic Usage

```javascript
import { renderEjsToImageFile } from "ejs2img";

// Create a simple card
await renderEjsToImageFile(
  "card.ejs",
  {
    title: "Welcome!",
    message: "Thanks for using ejs2img",
  },
  "welcome-card.png"
);
```

### Custom Dimensions and Format

```javascript
import { renderEjsToImageBuffer } from "ejs2img";

const buffer = await renderEjsToImageBuffer(
  "banner.ejs",
  {
    event: "Tech Conference 2024",
    date: "March 15-17",
  },
  {
    width: 1920,
    height: 1080,
    format: "jpeg",
    quality: 95,
  }
);
```

### Transparent Background

```javascript
import { renderEjsToImageBuffer } from "ejs2img";

const buffer = await renderEjsToImageBuffer(
  "logo.ejs",
  {
    company: "Acme Corp",
  },
  {
    width: 400,
    height: 400,
    format: "png",
    transparent: true,
  }
);
```

### Full Page Screenshot

```javascript
import { renderEjsToImageBuffer } from 'ejs2img';

const buffer = await renderEjsToImageBuffer('invoice.ejs', {
  invoiceNumber: 'INV-001',
  items: [...]
}, {
  width: 800,
  height: 600,
  fullPage: true
});
```

## Template Example

Create an EJS template (`card.ejs`):

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        margin: 0;
        font-family: "Arial", sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }
      .card {
        padding: 40px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        text-align: center;
        backdrop-filter: blur(10px);
      }
      h1 {
        margin: 0 0 10px 0;
      }
      p {
        margin: 0;
        opacity: 0.9;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <h1><%= title %></h1>
      <p><%= subtitle %></p>
    </div>
  </body>
</html>
```

Then render it:

```javascript
import { renderEjsToImageFile } from "ejs2img";

await renderEjsToImageFile(
  "card.ejs",
  {
    title: "Hello World! 🚀",
    subtitle: "Generated with ejs2img",
  },
  "output.png"
);
```

## Requirements

- Node.js 16.0.0 or higher
- The library automatically downloads Chromium via Puppeteer

## Use Cases

- **Social Media Cards**: Generate Open Graph images, Twitter cards
- **Certificates**: Create personalized certificates and badges
- **Reports**: Convert HTML reports to images
- **Email Images**: Generate images for email campaigns
- **Thumbnails**: Create preview images for content
- **Screenshots**: Programmatic webpage screenshots

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the example: `npm run example`

### Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all existing tests pass

## License

MIT © [MobilGame06](https://github.com/MobilGame06)

## Related Projects

- [puppeteer](https://github.com/puppeteer/puppeteer) - Headless Chrome Node.js API
- [ejs](https://github.com/mde/ejs) - Embedded JavaScript templates
