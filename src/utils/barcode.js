function isDigits(value, length) {
  return new RegExp(`^\\d{${length}}$`).test(value);
}

function gtinCheckDigit(value) {
  const digits = value.slice(0, -1).split('').reverse();
  const sum = digits.reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(value[value.length - 1]);
}

export function eanCheck(value) {
  return isDigits(value, 13) && gtinCheckDigit(value);
}

export function ean8Check(value) {
  return isDigits(value, 8) && gtinCheckDigit(value);
}

export function upcCheck(value) {
  return isDigits(value, 12) && gtinCheckDigit(value);
}

export function itf14Check(value) {
  return isDigits(value, 14) && gtinCheckDigit(value);
}

export function validateBarcode(value, format) {
  const code = String(value || '').trim();
  if (!code) return { valid: false, message: 'Enter a barcode value to generate a barcode.' };

  switch (format) {
    case 'EAN13':
      return { valid: eanCheck(code), message: 'EAN-13 requires 13 digits and a valid check digit.' };
    case 'EAN8':
      return { valid: ean8Check(code), message: 'EAN-8 requires 8 digits and a valid check digit.' };
    case 'UPC':
      return { valid: upcCheck(code), message: 'UPC-A requires 12 digits and a valid check digit.' };
    case 'UPCE':
      return { valid: isDigits(code, 8), message: 'UPC-E requires 8 numeric digits. Confirm the number is assigned to you.' };
    case 'ITF14':
      return { valid: itf14Check(code), message: 'ITF-14 requires 14 digits and a valid check digit.' };
    case 'ITF':
      return { valid: /^\d{2,80}$/.test(code) && code.length % 2 === 0, message: 'Interleaved 2 of 5 requires an even number of digits.' };
    case 'CODE39':
      return { valid: /^[0-9A-Z .\-\/$+%]{1,80}$/i.test(code), message: 'Code 39 supports uppercase letters, digits and selected punctuation.' };
    case 'MSI':
      return { valid: /^\d{1,80}$/.test(code), message: 'MSI accepts numeric values.' };
    case 'pharmacode': {
      const number = Number(code);
      return { valid: /^\d{1,6}$/.test(code) && number >= 3 && number <= 131070, message: 'Pharmacode accepts a number from 3 to 131070.' };
    }
    case 'CODE128':
    default:
      return { valid: /^[\x20-\x7E]{1,80}$/.test(code), message: 'Code 128 accepts up to 80 printable ASCII characters.' };
  }
}
