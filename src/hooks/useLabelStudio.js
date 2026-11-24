import { useEffect, useMemo, useState } from 'react';
import JsBarcode from 'jsbarcode';
import QRCode from 'qrcode';
import { eanCheck, upcCheck } from '../utils/barcode';

export const initialLabel = {
  product: 'Organic Almond Cookies', brand: 'NORTH & NATURE', category: 'Food',
  ingredients: 'Almonds (42%), oats, dates, coconut oil, sea salt.',
  allergen: 'Contains tree nuts. May contain traces of peanuts.',
  net: '150 g', mrp: '₹199.00', batch: 'BATCH-2408', mfg: '22/11/2026',
  best: '21/05/2027', maker: 'North & Nature Foods, Jaipur, Rajasthan, India',
  care: '+91 98765 43210 | care@example.in', website: 'https://example.in',
  barcodeType: 'EAN13', barcodeValue: '', qrValue: 'https://example.in/product/almond-cookies',
  barcodeMode: 'customer', labelFormat: 'table', logos: []
};

export default function useLabelStudio() {
  const [data, setData] = useState(initialLabel);
  const [barcodeSvg, setBarcodeSvg] = useState('');
  const [qrData, setQrData] = useState('');

  const update = (key, value) => setData((current) => ({ ...current, [key]: typeof value === 'function' ? value(current[key]) : value }));
  const barcodeValid = useMemo(() => {
    const value = data.barcodeValue.trim();
    if (!value) return false;
    if (data.barcodeType === 'EAN13') return /^\d{13}$/.test(value) && eanCheck(value);
    if (data.barcodeType === 'UPC') return /^\d{12}$/.test(value) && upcCheck(value);
    return /^[\x20-\x7E]{1,80}$/.test(value);
  }, [data.barcodeValue, data.barcodeType]);

  useEffect(() => {
    if (!data.barcodeValue.trim()) { setBarcodeSvg(''); return; }
    try {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      JsBarcode(svg, data.barcodeValue, { format: data.barcodeType, lineColor: '#111827', background: '#ffffff', width: 1.65, height: 48, displayValue: true, fontSize: 12, margin: 5 });
      setBarcodeSvg(new XMLSerializer().serializeToString(svg));
    } catch { setBarcodeSvg(''); }
  }, [data.barcodeValue, data.barcodeType]);

  useEffect(() => {
    let alive = true;
    QRCode.toDataURL(data.qrValue || 'https://example.in', { width: 220, margin: 1, errorCorrectionLevel: 'H', color: { dark: '#101828', light: '#ffffff' } })
      .then((url) => { if (alive) setQrData(url); }).catch(() => setQrData(''));
    return () => { alive = false; };
  }, [data.qrValue]);

  return { data, update, barcodeSvg, qrData, barcodeValid };
}
