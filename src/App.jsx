import React, { useRef, useState } from 'react';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { FiX } from 'react-icons/fi';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Checks from './pages/Checks';
import Overview from './pages/Overview';
import Settings from './pages/Settings';
import LabelStudio from './pages/LabelStudio';
import useLabelStudio from './hooks/useLabelStudio';
import { getCategoryTemplate } from './constants/productCategories';


function App() {
  const [active, setActive] = useState("Label Studio");
  const [mobile, setMobile] = useState(false);
  const [notice, setNotice] = useState('');
  const [checkResults, setCheckResults] = useState([]);
  const labelRef = useRef(null);
  const { data, update, barcodeSvg, qrData, barcodeValid, barcodeValidation } = useLabelStudio();

  const runChecks = () => {
    const categoryTemplate = getCategoryTemplate(data.category);
    const requiredFields = categoryTemplate.fields.filter((field) => field[3]);
    const categoryValues = data.categoryFields?.[data.category] || {};
    const missingFields = requiredFields.filter((field) => !String(categoryValues[field[0]] || '').trim());
    const barcodeEntered = Boolean(String(data.barcodeValue || '').trim());
    const qrEntered = Boolean(String(data.qrValue || '').trim());
    const checks = [
      [
        'Product identity',
        data.product && data.brand ? 'Product name and brand are present' : 'Add the product name and brand / responsible brand owner',
        Boolean(data.product && data.brand),
      ],
      [
        'Category-specific information',
        missingFields.length
          ? `Complete the selected category fields: ${missingFields.map((field) => field[1]).join(', ')}`
          : 'The recommended category information fields are complete',
        missingFields.length === 0,
      ],
      [
        'Destination market and language',
        data.targetMarket && data.language ? 'Destination market and label language are selected' : 'Choose a destination market and label language',
        Boolean(data.targetMarket && data.language),
      ],
      [
        'Barcode data',
        barcodeEntered ? (barcodeValid ? 'Barcode data passes the selected format check' : barcodeValidation.message) : 'No barcode entered; barcode generation was skipped',
        !barcodeEntered || barcodeValid,
      ],
      [
        'QR content',
        qrEntered ? (qrData ? 'QR code generated from the entered URL or text' : 'QR code could not be generated; check the entered content') : 'No QR content entered; QR generation was skipped',
        !qrEntered || Boolean(qrData),
      ],
      [
        'Traceability details',
        data.batchLot || data.manufactureDate || data.expiryDate
          ? 'One or more batch / date fields are present; confirm whether the market requires more'
          : 'No batch or date information supplied; confirm whether it applies to this product',
        true,
      ],
      [
        'Regulatory and artwork approval',
        'Manual review by the responsible business and qualified specialists is required for each product and destination market',
        false,
      ],
    ];
    setCheckResults(checks);
    setActive('Regular Checks');
  };

  const downloadBarcode = () => {
    if (!barcodeSvg) return setNotice("Enter a barcode value to generate it.");
    const blob = new Blob([barcodeSvg], { type: "image/svg+xml" });
    downloadBlob(blob, "labelmatrix-barcode.svg");
  };
  const downloadQR = () => {
    if (!qrData) return;
    const anchor = document.createElement('a');
    anchor.href = qrData;
    anchor.download = 'labelmatrix-qr.png';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };
  const exportPDF = async () => {
    if (!labelRef.current) return;
    const width = Math.min(300, Math.max(20, Number(data.labelWidthMm) || 100));
    const height = Math.min(400, Math.max(20, Number(data.labelHeightMm) || 150));

    try {
      const canvas = await html2canvas(labelRef.current, {
        scale: 3,
        backgroundColor: '#ffffff',
        useCORS: true,
      });
      const pdf = new jsPDF({
        orientation: width > height ? 'landscape' : 'portrait',
        unit: 'mm',
        format: [width, height],
      });
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, width, height);
      pdf.save('labelmatrix-back-label.pdf');
      setNotice('Back-label PDF exported. Confirm final dimensions, barcode readability and printer settings before production.');
    } catch {
      setNotice('PDF export failed. Please review the label content and try again.');
    }
  };
  const printLabel = () => window.print();

  return <div className="app-shell">
    <Sidebar active={active} setActive={setActive} mobile={mobile} setMobile={setMobile} runChecks={runChecks} />
    <main className="main-area">
      <Topbar active={active} setMobile={setMobile} />
      <div className="content">
        {active === "Label Studio" ? <LabelStudio data={data} update={update} barcodeSvg={barcodeSvg} qrData={qrData} barcodeValid={barcodeValid} barcodeValidation={barcodeValidation} labelRef={labelRef} runChecks={runChecks} exportPDF={exportPDF} downloadBarcode={downloadBarcode} downloadQR={downloadQR} printLabel={printLabel} /> : active === "Regular Checks" ? <Checks results={checkResults} run={runChecks}/> : active === "Overview" ? <Overview setActive={setActive}/> : <Settings data={data} update={update}/>}
        {notice && <div className="toast" onClick={()=>setNotice("")}>{notice} <FiX/></div>}
        <footer>© 2026 LabelMatrix Professional Studio <span>Universal back-label design · Barcode generation · QR generation</span></footer>
      </div>
    </main>
  </div>;
}
function downloadBlob(blob, name) {
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = objectUrl;
  anchor.download = name;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}
export default App;