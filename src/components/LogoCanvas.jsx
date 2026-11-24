import React, { useRef } from 'react';

/** Lightweight percentage-based logo layer; positions remain stable at any preview size. */
export default function LogoCanvas({ logos = [], updateLogos, selectedId, setSelectedId, editable = true }) {
  const drag = useRef(null);
  const patch = (id, changes) => updateLogos(logos.map((logo) => logo.id === id ? { ...logo, ...changes } : logo));
  const pointerDown = (event, logo, mode = 'move') => {
    if (!editable || logo.locked) return;
    event.preventDefault(); event.stopPropagation(); setSelectedId(logo.id);
    const bounds = event.currentTarget.closest(".label-paper").getBoundingClientRect();
    drag.current = { id: logo.id, mode, x: event.clientX, y: event.clientY, left: logo.x, top: logo.y, width: logo.width, bounds };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };
  const pointerMove = (event) => {
    if (!drag.current) return;
    const d = drag.current, dx = (event.clientX - d.x) / d.bounds.width * 100, dy = (event.clientY - d.y) / d.bounds.height * 100;
    if (d.mode === 'resize') patch(d.id, { width: Math.max(5, Math.min(65, d.width + dx)) });
    else patch(d.id, { x: Math.max(0, Math.min(100, d.left + dx)), y: Math.max(0, Math.min(100, d.top + dy)) });
  };
  const pointerUp = () => { drag.current = null; };
  return <div className="logo-layer" onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp}>
    {logos.map((logo) => <div key={logo.id} className={`logo-object ${editable && selectedId === logo.id ? 'logo-selected' : ''}`} style={{ left: `${logo.x}%`, top: `${logo.y}%`, width: `${logo.width}%`, transform: `translate(-50%, -50%) rotate(${logo.rotation || 0}deg)`, zIndex: logo.z || 2 }} onPointerDown={(e) => pointerDown(e, logo)}>
      <img src={logo.src} alt={logo.name || 'Label logo'} draggable="false" />
      {editable && selectedId === logo.id && <button type="button" className="logo-resize" aria-label="Resize logo" onPointerDown={(e) => pointerDown(e, logo, 'resize')}/>}
    </div>)}
  </div>;
}
