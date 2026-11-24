# LabelMatrix Studio — Production Build

React 18 + Webpack 5 label-design workspace with a product back-label studio and a separate universal label editor, selectable table/paragraph content, multi-logo positioning, barcode and QR generation, validation checks, print output and PDF export.

## Included features

- **Universal Label Editor:** create product, packaging, shipping, retail and custom labels with custom width/height, background color, editable title, website URL, movable site logo, text blocks, uploaded images/logos and divider lines. Drag elements directly on the canvas, resize them, save the design in browser storage, export a JSON design file, print or export a size-specific PDF.
- **Site identity:** the LabelMatrix logo appears in the application navigation and is included as a movable default site-logo element on the universal label. Replace it with a company or website logo at any time.
- **Label content layout:** switch between a compact key/value table and paragraph-style declarations without changing the underlying product data. In Universal Label Editor, add, edit and remove field/value rows; the selected layout is reflected in the live canvas and PDF/print output.
- **Multiple logos:** upload multiple PNG, JPEG, SVG or WebP images; drag them anywhere over the label; resize with the editor controls (and with the corner handle in Back Label Studio); rotate, lock/unlock, duplicate, delete, change stacking order, and center horizontally or vertically. Universal Editor optimizes raster images to WebP before browser storage where supported.
- **Print and PDF:** the logo layer and chosen content layout are part of the label DOM captured for PDF export and browser printing.
- **Barcode and QR:** EAN-13 and UPC-A check-digit validation, Code 128 internal labels, SVG barcode download and QR generation.
- **Optimized build:** hashed assets, filesystem build cache, deterministic module IDs, runtime/vendor splitting, minification, compressed dev-server responses, and deferred PDF dependencies.
- **Smaller brand asset:** optimized WebP logo replaces the large PNG in the application bundle.

## Requirements

- Node.js 18.18+ (Node.js 20 LTS recommended)
- npm 9+

## Install and run

```bash
npm ci
npm start
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
```

Webpack writes deployable static files to `dist/`. Run a local production preview with any static HTTP server, for example:

```bash
npx serve dist
```

## Netlify deployment

The included `netlify.toml` builds with `npm run build` and publishes `dist`. The SPA fallback is configured for client-side routes.

## Environment configuration

Copy `.env.example` to `.env` for local configuration. No API keys or secrets are required by the current frontend. Never place private credentials in a `REACT_APP_*` or other browser-exposed variable.

## Project structure

```text
src/
  components/LogoCanvas.jsx   # draggable, resizable multi-logo layer
  components/                 # shared UI components
  hooks/useLabelStudio.js     # label state and barcode/QR generation
  pages/LabelStudio.jsx       # product back-label editor and live preview
  pages/UniversalLabelEditor.jsx # flexible canvas, title, site logo and custom elements
  utils/barcode.js            # barcode validation helpers
  App.jsx                     # navigation, print and PDF export
  styles.css                  # application and label styles
public/index.html
webpack.config.js
netlify.toml
```

## Build after source updates

The ZIP contains the updated React source. Run `npm ci` followed by `npm run build` to regenerate `dist/` before local static hosting. Netlify performs this build automatically using the included configuration.

## Important production note

This is a production-buildable frontend, not a complete multi-user SaaS backend. Universal Editor saves its design in browser local storage; Back Label Studio keeps its active editing state in browser memory. Export design JSON regularly as a portable backup. Before deploying for customer accounts or regulated production workflows, add authenticated server-side storage, database-backed projects, upload validation/scanning, access controls, backups, audit logging and server-side export where required. Verify final label declarations, barcode ownership, physical dimensions, bleed and printer calibration with the responsible brand owner/printer. LabelMatrix does not issue GS1 GTINs or certify regulatory compliance.
