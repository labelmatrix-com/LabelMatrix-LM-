import React from 'react';
import Field from '../components/Field';

export default function Settings({ data, update }) {
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">WORKSPACE PREFERENCES</div>
          <h1>Settings</h1>
          <p>Manage default product label details.</p>
        </div>
      </div>
      <div className="panel settings-panel">
        <h2>Label defaults</h2>
        <p>These values are used in the current product label workspace.</p>
        <Field label="Default product website" value={data.website} onChange={(value) => update('website', value)} />
        <Field label="Default customer support / service contact" value={data.serviceContact} onChange={(value) => update('serviceContact', value)} />
        <Field label="Default label language" value={data.language} onChange={(value) => update('language', value)} />
        <div className="notice-box">
          Projects currently live in browser memory only. Add secure server-side storage and access control before
          using the workspace for customer records, multi-user teams or commercial production workflows.
        </div>
      </div>
    </>
  );
}
