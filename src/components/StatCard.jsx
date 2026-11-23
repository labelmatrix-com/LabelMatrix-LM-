import React from 'react';

export default function StatCard({ icon, label, value, meta }) {
  return <div className="stat-card"><div className="stat-icon">{icon}</div><div><small>{label}</small><b>{value}</b><span>{meta}</span></div></div>;
}
