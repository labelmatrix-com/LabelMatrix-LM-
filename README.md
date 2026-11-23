# LabelMatrix Professional Studio

**Universal product back-label design, barcode generation and QR code generation.**

LabelMatrix is structured for products across many industries and destination markets. Category templates adapt the recommended back-label prompts for food and beverages, cosmetics, pharmaceuticals and medical devices, household products, electronics, apparel, toys, automotive, chemicals, industrial equipment, construction materials, jewelry, pet products, sports products, stationery, home and garden products, and custom products.

## Main capabilities

- Category-driven back-label fields for materials / ingredients, specifications, usage or care instructions, and warnings.
- Destination-market selection and free-text label-language entry (translations are supplied by the user).
- Product identity, SKU / model, pack size, origin, batch / lot, date, manufacturer and customer-support details.
- Barcode generation for Code 128, EAN-13, EAN-8, UPC-A, UPC-E, ITF-14, Code 39, Interleaved 2 of 5, MSI and Pharmacode.
- QR generation from a website URL or arbitrary text.
- Live back-label preview, barcode SVG download, QR PNG download, printing and print-size PDF export.
- Component-based React architecture and the supplied LabelMatrix brand logo.

The current selector includes 18 category templates, including a custom-product option and destination-market options for global workflows.

## Project structure

```text
src/
├── assets/
│   └── labelmatrix-logo.png
├── components/
│   ├── Brand.jsx
│   ├── Brand.css
│   ├── Field.jsx
│   ├── SelectField.jsx
│   ├── SelectField.jsx
│   ├── Sidebar.jsx
│   ├── StatCard.jsx
│   └── Topbar.jsx
├── constants/
│   └── productCategories.js
├── hooks/
│   └── useLabelStudio.js
├── pages/
│   ├── LabelStudio.jsx
│   ├── Checks.jsx
│   ├── Overview.jsx
│   └── Settings.jsx
├── utils/
│   └── barcode.js
├── App.jsx
├── index.jsx
└── styles.css
```

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:3000`.

## Production build

```bash
npm run format
npm run format:check
npm run build
```

Webpack writes production assets to `dist/`.

## Barcode and regulatory notes

- LabelMatrix encodes the barcode data entered by the user; it does not allocate or issue GTINs.
- Retail barcodes must use identifiers legitimately assigned to the responsible company through the applicable numbering authority / GS1 Member Organisation.
- Internal Code 128, Code 39 and other operational formats are not a substitute for a retail GTIN where one is required.
- Barcode format validation is a client-side format/check-digit aid, not confirmation that a number is officially assigned or globally unique.
- QR codes encode the exact URL or text entered by the user. Users must test the destination and content before printing.
- Regulatory requirements vary by product type and destination market. The market selector is a workflow aid, not an automatic legal-compliance engine. The responsible business must obtain qualified review of required declarations, languages, symbols, warnings and artwork.

## Current implementation boundaries

- The current application uses browser-local React state; it does not yet persist projects to a server or support user accounts, cloud workspaces or team collaboration.
- PDF output is generated from the browser preview as a raster image. For commercial prepress workflows, add a vector / print-PDF pipeline, embedded fonts, colour-management checks, bleed and printer-specific output profiles.
- The current category templates are configurable starting points, not a complete catalogue of every country's legal requirements.
