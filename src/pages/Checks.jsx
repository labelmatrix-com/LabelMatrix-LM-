import React from 'react';
import { FiRefreshCw } from 'react-icons/fi';

const defaultChecks = [
  ['Barcode number', 'Run checks to validate the current barcode.', false],
  ['QR destination', 'Run checks to verify the QR destination.', false],
  ['Product details', 'Review product fields.', false],
  ['Dates & traceability', 'Review batch and date fields.', false],
  ['Approval', 'Brand owner / regulatory review required.', false],
];

export default function Checks({ results, run }) {
  const rows = results.length ? results : defaultChecks;
  return <>
    <div className="page-heading">
      <div><div className="eyebrow">QUALITY CONTROL</div><h1>Regular Checks</h1><p>Review barcode, QR destination and label completeness before approval.</p></div>
      <button className="btn primary" onClick={run}><FiRefreshCw /> Run checks again</button>
    </div>
    <div className="panel checks-panel">
      <div className="panel-head"><div><h2>Label verification report</h2><p>Operational checks only — not a legal compliance certificate.</p></div><span className="step-tag">PRE-FLIGHT</span></div>
      {rows.map((row, index) => <div className="check-row" key={index}>
        <div className={`check-symbol ${row[2] ? 'good' : 'review'}`}>{row[2] ? '✓' : '!'}</div>
        <div><b>{row[0]}</b><p>{row[1]}</p></div>
        <span className={`check-state ${row[2] ? 'green' : 'amber'}`}>{row[2] ? 'PASSED' : 'REVIEW'}</span>
      </div>)}
    </div>
  </>;
}
