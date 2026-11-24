import React from 'react';
import { FiLayers, FiBarChart2, FiArrowUpRight } from 'react-icons/fi';
import { FiGrid } from 'react-icons/fi';
import StatCard from '../components/StatCard';
import { FaQrcode } from 'react-icons/fa';   

export default function Overview({ setActive }) {
  return <>
    <div className="page-heading"><div><div className="eyebrow">YOUR LABEL OPERATIONS</div><h1>Good evening.</h1><p>Welcome to your LabelMatrix workspace.</p></div>
      <button className="btn primary" onClick={() => setActive('Label Studio')}>Create back label</button></div>
    <div className="stats-row">
      <StatCard icon={<FiLayers />} label="Label projects" value="01" meta="Studio project" />
      <StatCard icon={<FiBarChart2 />} label="Barcode formats" value="03" meta="EAN-13 · UPC-A · Code 128" />
      <StatCard icon={<FaQrcode />} label="QR tools" value="01" meta="URL-based QR generation" />
    </div>
    <div className="panel overview-card"><h2>Build a production-ready back label</h2>
      <p>Enter product information, select the correct barcode source, add a QR destination and export your artwork for printer review.</p>
      <button className="btn primary" onClick={() => setActive('Label Studio')}>Open Label Studio <FiArrowUpRight /></button>
    </div>
  </>;
}
