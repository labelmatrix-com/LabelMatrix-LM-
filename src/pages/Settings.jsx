import React from 'react';
import Field from '../components/Field';

export default function Settings({ data, update }) {
  return <>
    <div className="page-heading"><div><div className="eyebrow">WORKSPACE PREFERENCES</div><h1>Settings</h1><p>Manage basic workspace defaults.</p></div></div>
    <div className="panel settings-panel"><h2>Label defaults</h2><p>These settings affect the current label project.</p>
      <Field label="Default website" value={data.website} onChange={(value) => update('website', value)} />
      <Field label="Customer care contact" value={data.care} onChange={(value) => update('care', value)} />
      <div className="notice-box">Project data is stored in the current browser session only. Connect a secure backend before using this prototype for customer records or production workflows.</div>
    </div>
  </>;
}
