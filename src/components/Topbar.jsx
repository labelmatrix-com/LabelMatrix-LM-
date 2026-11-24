import React from 'react';
import { FiMenu, FiSearch } from 'react-icons/fi';

export default function Topbar({ active, setMobile }) {
  return (
    <header className="topbar">
      <button className="mobile-menu" aria-label="Open navigation" onClick={() => setMobile(true)}><FiMenu /></button>
      <div className="crumb">Workspace <span>/</span> <b>{active}</b></div>
      <div className="top-actions">
        <div className="searchbox"><FiSearch /><input aria-label="Search projects" placeholder="Search projects..." /></div>
        <div className="status-pill"><i /> All systems operational</div>
        <div className="avatar top-avatar">LM</div>
      </div>
    </header>
  );
}
