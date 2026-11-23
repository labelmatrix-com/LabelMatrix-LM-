import React from 'react';

export default function Field({ label, value, onChange, placeholder = '', area = false }) {
  return (
    <label className={`field ${area ? 'field-wide' : ''}`}>
      <span>{label}</span>
      {area
        ? <textarea rows="2" value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
        : <input value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />}
    </label>
  );
}
