import React from 'react';
import { FiMenu } from 'react-icons/fi';

export default function Topbar({ active, setMobile }) {
  return (
    <header className="topbar">
      <button className="mobile-menu" aria-label="Open navigation" onClick={() => setMobile(true)}><FiMenu /></button>
      <div className="crumb">Workspace <span>/</span> <b>{active}</b></div>
      <div className="top-actions">
        <div className="status-pill"><i /> Local workspace</div>
        <div className="avatar top-avatar" aria-label="LabelMatrix workspace">LM</div>
      </div>
    </header>
  );
}
