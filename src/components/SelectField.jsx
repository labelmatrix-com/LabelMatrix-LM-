import React from 'react';

export default function SelectField({ label, value, onChange, options, hint }) {
  return (
    <label className="field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => {
          const item = typeof option === 'string' ? { value: option, label: option } : option;
          return (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
      {hint && <small className="field-hint">{hint}</small>}
    </label>
  );
}
