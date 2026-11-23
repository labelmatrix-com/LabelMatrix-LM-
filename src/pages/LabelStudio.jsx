import React from 'react';
import {
  FiCheckCircle,
  FiDownload,
  FiPrinter,
  FiBarChart2,
  FiShield,
  FiLayers,
  FiGlobe,
} from 'react-icons/fi';
import { FaQrcode } from 'react-icons/fa6';
import Field from '../components/Field';
import SelectField from '../components/SelectField';
import StatCard from '../components/StatCard';
import { PRODUCT_CATEGORIES, TARGET_MARKETS, getCategoryTemplate } from '../constants/productCategories';

const BARCODE_FORMATS = [
  { value: 'CODE128', label: 'Code 128 — general-purpose / internal' },
  { value: 'EAN13', label: 'EAN-13 — retail GTIN-13' },
  { value: 'EAN8', label: 'EAN-8 — compact retail GTIN-8' },
  { value: 'UPC', label: 'UPC-A — retail GTIN-12' },
  { value: 'UPCE', label: 'UPC-E — compact UPC' },
  { value: 'ITF14', label: 'ITF-14 — carton / trade item' },
  { value: 'CODE39', label: 'Code 39 — industrial / internal' },
  { value: 'ITF', label: 'Interleaved 2 of 5 — numeric logistics' },
  { value: 'MSI', label: 'MSI — inventory / internal' },
  { value: 'pharmacode', label: 'Pharmacode — pharmaceutical packaging' },
];

function PreviewBlock({ title, children }) {
  if (!children || !String(children).trim()) return null;
  return (
    <div className="label-block">
      <b>{title}</b>
      <p>{children}</p>
    </div>
  );
}

export default function LabelStudio({
  data,
  update,
  barcodeSvg,
  qrData,
  barcodeValid,
  barcodeValidation,
  labelRef,
  runChecks,
  exportPDF,
  downloadBarcode,
  downloadQR,
  printLabel,
}) {
  const categoryTemplate = getCategoryTemplate(data.category);
  const labelWidthMm = Math.min(300, Math.max(20, Number(data.labelWidthMm) || 100));
  const labelHeightMm = Math.min(400, Math.max(20, Number(data.labelHeightMm) || 150));
  const previewWidth = Math.max(235, Math.min(460, labelWidthMm * 3.78));
  const previewHeight = Math.max(320, Math.min(760, labelHeightMm * 3.78));

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">UNIVERSAL PRODUCT LABEL WORKSPACE</div>
          <h1>Back Label Studio</h1>
          <p>Build product back labels for multiple industries and destination markets, with barcode and QR generation.</p>
        </div>
        <div className="heading-actions">
          <button className="btn secondary" onClick={runChecks}>
            <FiCheckCircle /> Run checks
          </button>
          <button className="btn primary" onClick={exportPDF}>
            <FiDownload /> Export print PDF
          </button>
        </div>
      </div>

      <div className="stats-row">
        <StatCard icon={<FiLayers />} label="Product category" value={String(PRODUCT_CATEGORIES.length)} meta="Industry templates" />
        <StatCard
          icon={<FiBarChart2 />}
          label="Barcode status"
          value={barcodeValid ? 'Ready' : 'Review'}
          meta={barcodeValid ? 'Value format checked' : 'Enter a valid barcode value'}
        />
        <StatCard
          icon={<FaQrcode />}
          label="QR code"
          value={qrData ? 'Generated' : 'Not added'}
          meta="URL or plain text content"
        />
      </div>

      <div className="studio-grid">
        <section className="panel editor-panel">
          <div className="panel-head">
            <div>
              <h2>Back-label information</h2>
              <p>Choose a product type and destination market to load relevant field guidance.</p>
            </div>
            <span className="step-tag">PRODUCT DETAILS</span>
          </div>

          <div className="section-title">PRODUCT IDENTITY</div>
          <div className="form-grid">
            <Field label="Product name" value={data.product} onChange={(value) => update('product', value)} placeholder="Enter product name" />
            <Field label="Brand / brand owner" value={data.brand} onChange={(value) => update('brand', value)} placeholder="Brand name" />
            <SelectField
              label="Product industry / category"
              value={data.category}
              onChange={(value) => update('category', value)}
              options={PRODUCT_CATEGORIES.map(({ value, label }) => ({ value, label }))}
            />
            <Field label="Product ID / SKU / model" value={data.productId} onChange={(value) => update('productId', value)} placeholder="SKU, model or reference" />
            <Field label="Pack size / net content" value={data.packSize} onChange={(value) => update('packSize', value)} placeholder="e.g. 500 ml, 2 pieces, 1 unit" />
            <SelectField
              label="Destination market"
              value={data.targetMarket}
              onChange={(value) => update('targetMarket', value)}
              options={TARGET_MARKETS}
            />
            <Field label="Label language" value={data.language} onChange={(value) => update('language', value)} placeholder="e.g. English, Hindi, Arabic" />
            <Field label="Country of origin" value={data.countryOrigin} onChange={(value) => update('countryOrigin', value)} placeholder="Country where product was made" />
          </div>

          <div className="category-guidance">
            <FiGlobe />
            <span>{categoryTemplate.description} Field prompts below change with the selected category.</span>
          </div>

          <div className="divider" />
          <div className="section-title">CATEGORY-SPECIFIC BACK-LABEL FIELDS</div>
          <div className="dynamic-fields">
            {categoryTemplate.fields.map(([key, label, placeholder]) => (
              <Field
                key={`${data.category}-${key}`}
                label={label}
                value={data.categoryFields?.[data.category]?.[key] || ''}
                onChange={(value) => update(key, value)}
                placeholder={placeholder}
                area
              />
            ))}
          </div>

          <div className="divider" />
          <div className="section-title">TRACEABILITY & RESPONSIBLE BUSINESS</div>
          <div className="form-grid">
            <Field label="Batch / lot / serial number" value={data.batchLot} onChange={(value) => update('batchLot', value)} placeholder="Optional batch, lot or serial" />
            <Field label="Manufacture / pack date" value={data.manufactureDate} onChange={(value) => update('manufactureDate', value)} placeholder="Use market-appropriate date format" />
            <Field label="Expiry / use-by date (if applicable)" value={data.expiryDate} onChange={(value) => update('expiryDate', value)} placeholder="Leave blank when not applicable" />
            <Field label="Customer support / service contact" value={data.serviceContact} onChange={(value) => update('serviceContact', value)} placeholder="Email, phone or service URL" />
          </div>
          <Field label="Manufacturer / importer / responsible company" value={data.responsibleParty} onChange={(value) => update('responsibleParty', value)} placeholder="Company name and postal address" area />
          <Field label="Product website" value={data.website} onChange={(value) => update('website', value)} placeholder="https://example.com" />
          <div className="form-grid">
            <Field label="Additional custom field title" value={data.customFieldLabel} onChange={(value) => update('customFieldLabel', value)} placeholder="e.g. Warranty, recycling, certification reference" />
            <Field label="Additional custom field content" value={data.customFieldContent} onChange={(value) => update('customFieldContent', value)} placeholder="Enter any additional product-specific details" />
          </div>

          <div className="divider" />
          <div className="section-title">BARCODE GENERATOR <span className="required">USE AN ASSIGNED NUMBER FOR RETAIL</span></div>
          <div className="choice-grid">
            <button
              className={`choice ${data.barcodeMode === 'customer' ? 'selected' : ''}`}
              onClick={() => {
                update('barcodeMode', 'customer');
                if (!['EAN13', 'EAN8', 'UPC', 'UPCE'].includes(data.barcodeType)) update('barcodeType', 'EAN13');
              }}
              type="button"
            >
              <span className="choice-radio" />
              <div>
                <b>Existing / customer-assigned number</b>
                <small>Enter a GTIN or other number assigned to your company by the relevant numbering authority.</small>
              </div>
              <span className="choice-badge">RETAIL</span>
            </button>
            <button
              className={`choice ${data.barcodeMode === 'internal' ? 'selected' : ''}`}
              onClick={() => {
                update('barcodeMode', 'internal');
                if (['EAN13', 'EAN8', 'UPC', 'UPCE'].includes(data.barcodeType)) update('barcodeType', 'CODE128');
              }}
              type="button"
            >
              <span className="choice-radio" />
              <div>
                <b>Internal / operational code</b>
                <small>Create a Code 128 or other supported code for internal stock and operational use.</small>
              </div>
              <span className="choice-badge muted">INTERNAL</span>
            </button>
          </div>
          <div className="form-grid barcode-fields">
            <SelectField
              label="Barcode symbology"
              value={data.barcodeType}
              onChange={(value) => update('barcodeType', value)}
              options={BARCODE_FORMATS}
            />
            <Field
              label="Barcode data / number"
              value={data.barcodeValue}
              onChange={(value) => update('barcodeValue', value)}
              placeholder="Enter the value to encode"
            />
          </div>
          <div className={`validation ${barcodeValid ? 'valid' : 'pending'}`}>
            {barcodeValid ? '✓ Barcode value meets the selected format checks.' : barcodeValidation.message}
          </div>
          <div className="inline-actions">
            <button className="btn secondary small" onClick={downloadBarcode} disabled={!barcodeSvg}>
              <FiDownload /> Download barcode SVG
            </button>
          </div>

          <div className="divider" />
          <div className="section-title">QR CODE GENERATOR</div>
          <Field
            label="QR content — website URL or plain text"
            value={data.qrValue}
            onChange={(value) => update('qrValue', value)}
            placeholder="Enter a product URL, support page, serial number or other text"
            area
          />
          <div className="helper-copy">The QR code stores exactly the text entered here. Make sure the destination or data is correct before printing.</div>
          <div className="inline-actions">
            <button className="btn secondary small" onClick={downloadQR} disabled={!qrData}>
              <FiDownload /> Download QR PNG
            </button>
          </div>

          <div className="divider" />
          <div className="section-title">PRINT SIZE</div>
          <div className="form-grid">
            <Field label="Label width (mm)" value={data.labelWidthMm} onChange={(value) => update('labelWidthMm', value.replace(/[^0-9]/g, ''))} placeholder="20–300 mm" />
            <Field label="Label height (mm)" value={data.labelHeightMm} onChange={(value) => update('labelHeightMm', value.replace(/[^0-9]/g, ''))} placeholder="20–400 mm" />
          </div>
        </section>

        <section className="preview-column">
          <div className="panel preview-panel">
            <div className="panel-head">
              <div>
                <h2>Live back-label preview</h2>
                <p>Review text flow and code placement while editing.</p>
              </div>
              <span className="live-tag"><i /> LIVE</span>
            </div>
            <div className="preview-stage">
              <div
                className="label-paper"
                ref={labelRef}
                style={{ width: `${previewWidth}px`, minHeight: `${previewHeight}px` }}
              >
                <div className="label-brand">{data.brand || 'YOUR BRAND'}</div>
                <div className="label-product">{data.product || 'Product name'}</div>
                <div className="label-meta">{data.category} · {data.targetMarket}</div>
                <div className="label-rule" />
                <div className="label-two">
                  <div><b>PRODUCT ID</b><p>{data.productId || '—'}</p></div>
                  <div><b>PACK / NET CONTENT</b><p>{data.packSize || '—'}</p></div>
                </div>
                {categoryTemplate.fields.map(([key, label]) => (
                  <PreviewBlock key={key} title={label}>
                    {data.categoryFields?.[data.category]?.[key]}
                  </PreviewBlock>
                ))}
                {(data.batchLot || data.manufactureDate || data.expiryDate) && (
                  <div className="label-two">
                    <div><b>BATCH / LOT / SERIAL</b><p>{data.batchLot || '—'}</p></div>
                    <div><b>DATE DETAILS</b><p>{[data.manufactureDate, data.expiryDate].filter(Boolean).join(' / ') || '—'}</p></div>
                  </div>
                )}
                <PreviewBlock title="COUNTRY OF ORIGIN">{data.countryOrigin}</PreviewBlock>
                <PreviewBlock title="MANUFACTURER / RESPONSIBLE COMPANY">{data.responsibleParty}</PreviewBlock>
                <PreviewBlock title="CUSTOMER SUPPORT">{data.serviceContact}</PreviewBlock>
                <PreviewBlock title={data.customFieldLabel}>{data.customFieldContent}</PreviewBlock>
                <div className="label-codes">
                  {barcodeSvg ? (
                    <div className="barcode-view" dangerouslySetInnerHTML={{ __html: barcodeSvg }} />
                  ) : (
                    <div className="barcode-placeholder">BARCODE PREVIEW<br /><small>Enter valid barcode data</small></div>
                  )}
                  {qrData && <img src={qrData} alt="QR code containing the entered product information" />}
                </div>
                <div className="label-footer">
                  {[data.website, data.language, data.targetMarket].filter(Boolean).join(' · ')}
                </div>
              </div>
            </div>
            <div className="preview-actions">
              <button className="btn secondary" onClick={printLabel}><FiPrinter /> Print</button>
              <button className="btn primary" onClick={exportPDF}><FiDownload /> Download print PDF</button>
            </div>
          </div>
          <div className="panel guidance">
            <div className="guidance-icon"><FiShield /></div>
            <div>
              <b>Barcode, QR and regulatory responsibility</b>
              <p>
                LabelMatrix generates codes from the data you provide; it does not issue GTINs or certify legal compliance.
                Retail identifiers must be legitimately assigned. Requirements vary by product and destination market;
                the responsible business must review all declarations, symbols, translations and print proofs before sale.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
