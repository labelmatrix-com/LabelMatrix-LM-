import React from 'react';
import './Brand.css';
import logo from '../assets/labelmatrix-logo.webp';

export default function Brand({ compact = false }) {
  return (
    <div className={`brand ${compact ? 'brand-compact' : ''}`}>
      <img src={logo} alt="LabelMatrix — Design, Integrate, Print, Grow" />
      <div className="brand-copy">
        <strong>LabelMatrix</strong>
        <span>DESIGN · INTEGRATE · PRINT · GROW</span>
      </div>
    </div>
  );
}
