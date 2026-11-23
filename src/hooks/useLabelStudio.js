import { useEffect, useMemo, useState } from 'react';
import JsBarcode from 'jsbarcode';
import QRCode from 'qrcode';
import { validateBarcode } from '../utils/barcode';

export const initialLabel = {
  product: '',
  brand: '',
  category: 'General merchandise',
  targetMarket: 'Global / multiple markets',
  language: 'English',
  productId: '',
  packSize: '',
  categoryFields: {
    'General merchandise': {
      composition: '',
      specifications: '',
      instructions: '',
      warnings: '',
    },
  },
  batchLot: '',
  manufactureDate: '',
  expiryDate: '',
  countryOrigin: '',
  responsibleParty: '',
  serviceContact: '',
  website: '',
  customFieldLabel: '',
  customFieldContent: '',
  barcodeType: 'CODE128',
  barcodeValue: '',
  barcodeMode: 'internal',
  qrValue: '',
  labelWidthMm: '100',
  labelHeightMm: '150',
};

export default function useLabelStudio() {
  const [data, setData] = useState(initialLabel);
  const [barcodeSvg, setBarcodeSvg] = useState('');
  const [qrData, setQrData] = useState('');

  const update = (key, value) => {
    const categoryFieldKeys = ['composition', 'specifications', 'instructions', 'warnings'];
    setData((current) => {
      if (categoryFieldKeys.includes(key)) {
        const currentCategoryFields = current.categoryFields || {};
        return {
          ...current,
          categoryFields: {
            ...currentCategoryFields,
            [current.category]: {
              ...(currentCategoryFields[current.category] || {}),
              [key]: value,
            },
          },
        };
      }
      return { ...current, [key]: value };
    });
  };

  const barcodeValidation = useMemo(
    () => validateBarcode(data.barcodeValue, data.barcodeType),
    [data.barcodeValue, data.barcodeType],
  );
  const barcodeValid = barcodeValidation.valid;

  useEffect(() => {
    if (!data.barcodeValue.trim() || !barcodeValid) {
      setBarcodeSvg('');
      return undefined;
    }

    try {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      JsBarcode(svg, data.barcodeValue.trim(), {
        format: data.barcodeType,
        lineColor: '#101828',
        background: '#ffffff',
        width: 1.65,
        height: 48,
        displayValue: true,
        fontSize: 12,
        margin: 5,
      });
      setBarcodeSvg(new XMLSerializer().serializeToString(svg));
    } catch {
      setBarcodeSvg('');
    }
    return undefined;
  }, [data.barcodeValue, data.barcodeType, barcodeValid]);

  useEffect(() => {
    let alive = true;
    if (!data.qrValue.trim()) {
      setQrData('');
      return () => {
        alive = false;
      };
    }

    QRCode.toDataURL(data.qrValue.trim(), {
      width: 240,
      margin: 2,
      errorCorrectionLevel: 'H',
      color: { dark: '#101828', light: '#ffffff' },
    })
      .then((url) => {
        if (alive) setQrData(url);
      })
      .catch(() => {
        if (alive) setQrData('');
      });

    return () => {
      alive = false;
    };
  }, [data.qrValue]);

  return { data, update, barcodeSvg, qrData, barcodeValid, barcodeValidation };
}
