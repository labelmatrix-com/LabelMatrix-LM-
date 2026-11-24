import React, { useRef, useState } from 'react';
import { FiX } from 'react-icons/fi';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Checks from './pages/Checks';
import Overview from './pages/Overview';
import Settings from './pages/Settings';
import LabelStudio from './pages/LabelStudio';
import UniversalLabelEditor from './pages/UniversalLabelEditor';
import useLabelStudio from './hooks/useLabelStudio';


function App() {
  const [active, setActive] = useState("Label Studio");
  const [mobile, setMobile] = useState(false);
  const [notice, setNotice] = useState('');
  const [checkResults, setCheckResults] = useState([]);
  const labelRef = useRef(null);
  const { data, update, barcodeSvg, qrData, barcodeValid } = useLabelStudio();

  const runChecks = () => {
    const checks = [
      ["Barcode number", data.barcodeMode === "customer" ? (barcodeValid ? "Valid format and check digit" : "Needs a valid customer number") : (data.barcodeType === "CODE128" ? "Internal-use format selected" : "Use Code 128 for internal IDs"), barcodeValid || data.barcodeMode === "internal"],
      ["QR destination", /^https?:\/\/.+/i.test(data.qrValue) ? "Destination looks like a valid URL" : "Enter a complete http(s) URL", /^https?:\/\/.+/i.test(data.qrValue)],
      ["Product details", data.product && data.ingredients && data.net ? "Core label fields are present" : "Complete product, ingredients and net quantity", !!(data.product && data.ingredients && data.net)],
      ["Dates & traceability", data.batch && data.mfg && data.best ? "Batch and date fields are present" : "Add batch, manufacturing and best-before details", !!(data.batch && data.mfg && data.best)],
      ["Approval", "Client and regulatory review still required before production", false]
    ];
    setCheckResults(checks);
    setActive("Regular Checks");
  };

  const downloadBarcode = () => {
    if (!barcodeSvg) return setNotice("Enter a barcode value to generate it.");
    const blob = new Blob([barcodeSvg], { type: "image/svg+xml" });
    downloadBlob(blob, "labelmatrix-barcode.svg");
  };
  const downloadQR = () => {
    if (!qrData) return;
    const a = document.createElement("a"); a.href = qrData; a.download = "labelmatrix-qr.png"; a.click();
  };
  const exportPDF = async () => {
    if (!labelRef.current) return;
    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas"), import("jspdf")]);
    const canvas = await html2canvas(labelRef.current, { scale: 2, backgroundColor: "#ffffff", useCORS: true, logging: false });
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: [100, 150], compress: true });
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 100, 150);
    pdf.save("labelmatrix-back-label.pdf");
    setNotice("Print-ready PDF exported. Confirm final size and print settings with your printer.");
  };
  const printLabel = () => window.print();

  return <div className="app-shell">
    <Sidebar active={active} setActive={setActive} mobile={mobile} setMobile={setMobile} runChecks={runChecks} />
    <main className="main-area">
      <Topbar active={active} setMobile={setMobile} />
      <div className="content">
        {active === "Universal Label Editor" ? <UniversalLabelEditor /> : active === "Label Studio" ? <LabelStudio data={data} update={update} barcodeSvg={barcodeSvg} qrData={qrData} barcodeValid={barcodeValid} labelRef={labelRef} runChecks={runChecks} exportPDF={exportPDF} downloadBarcode={downloadBarcode} downloadQR={downloadQR} printLabel={printLabel} /> : active === "Regular Checks" ? <Checks results={checkResults} run={runChecks}/> : active === "Overview" ? <Overview setActive={setActive}/> : <Settings data={data} update={update}/>}
        {notice && <div className="toast" onClick={()=>setNotice("")}>{notice} <FiX/></div>}
        <footer>© 2026 LabelMatrix Studio <span>Universal label design · Brand identity · Barcode & QR integration</span></footer>
      </div>
    </main>
  </div>;
}
function downloadBlob(blob,name){const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;a.click();URL.revokeObjectURL(a.href);}
export default App;