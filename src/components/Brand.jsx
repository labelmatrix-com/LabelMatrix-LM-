import React from 'react';
import './Brand.css';
import logo from '../assets/labelmatrix-logo.png';

export default function Brand() {
  return (
    <div className="brand">
      <img src={logo} alt="LabelMatrix — Design, Integrate, Print, Grow" />
      <span className="brand-caption">PROFESSIONAL STUDIO</span>
    </div>
  );
}
