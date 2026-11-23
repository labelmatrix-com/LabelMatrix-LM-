import React from 'react';
import { FiLayers, FiBarChart2, FiArrowUpRight, FiGlobe } from 'react-icons/fi';
import { FaQrcode } from 'react-icons/fa6';
import StatCard from '../components/StatCard';
import { PRODUCT_CATEGORIES } from '../constants/productCategories';

export default function Overview({ setActive }) {
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">YOUR GLOBAL LABEL OPERATIONS</div>
          <h1>One studio. Every product.</h1>
          <p>Design back labels and generate barcodes and QR codes for products across industries and markets.</p>
        </div>
        <button className="btn primary" onClick={() => setActive('Label Studio')}>
          Create back label
        </button>
      </div>
      <div className="stats-row">
        <StatCard icon={<FiLayers />} label="Industry templates" value={String(PRODUCT_CATEGORIES.length)} meta="Food, consumer, industrial and custom products" />
        <StatCard icon={<FiBarChart2 />} label="Barcode formats" value="10" meta="Retail, logistics and internal formats" />
        <StatCard icon={<FaQrcode />} label="QR generator" value="URL + text" meta="Encode product links or information" />
      </div>
      <div className="panel overview-card">
        <div className="overview-global-icon"><FiGlobe /></div>
        <h2>Universal product back-labeling</h2>
        <p>
          Start with a category template or use the custom product option. Add materials or ingredients,
          specifications, usage information, safety notices, traceability details, barcode data and QR content.
          Choose a destination market and prepare a label preview for review and printing.
        </p>
        <button className="btn primary" onClick={() => setActive('Label Studio')}>
          Open Back Label Studio <FiArrowUpRight />
        </button>
      </div>
    </>
  );
}
