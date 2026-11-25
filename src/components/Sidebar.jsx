import React from 'react';
import { FiGrid, FiLayers, FiCheckCircle, FiSettings, FiShield, FiArrowUpRight, FiX, FiMaximize } from 'react-icons/fi';
import Brand from './Brand';
import DonateCom from './DonateCom';

const navigation = [
  ['Overview', FiGrid],
  ['Label Studio', FiLayers],
  ['Universal Label Editor', FiMaximize],
  ['Regular Checks', FiCheckCircle],
  ['Settings', FiSettings],
];

export default function Sidebar({ active, setActive, mobile, setMobile, runChecks }) {
  return (
    <aside className={`sidebar ${mobile ? 'sidebar-open' : ''}`}>
      <div className="brand-wrap">
        <Brand />
        <button className="close-menu" aria-label="Close navigation" onClick={() => setMobile(false)}><FiX /></button>
      </div>
      <div className="workspace-label">WORKSPACE</div>
      {navigation.map(([name, Icon]) => (
        <button key={name} className={`nav-item ${active === name ? 'active' : ''}`}
          aria-current={active === name ? 'page' : undefined}
          onClick={() => { setActive(name); setMobile(false); }}>
          <Icon /><span>{name}</span>{name === 'Regular Checks' && <i className="nav-dot" />}
        </button>
      ))}
      <div className="sidebar-bottom">
        <div className="help-card">
          <div className="help-icon"><FiShield /></div>
          <b>Quality-first labels</b>
          <p>Design, customize and prepare every label format with confidence.</p>
          <button onClick={runChecks}>Run label checks <FiArrowUpRight /></button>
        </div>
        <div className="profile">
          <div><DonateCom/></div>
          {/* <div className="avatar">LM</div><div><b>LabelMatrix Admin</b><small>Studio workspace</small></div><FiSettings /> */}
          </div>
      </div>
    </aside>
  );
}
