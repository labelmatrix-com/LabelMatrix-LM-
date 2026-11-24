import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FiDownload, FiImage, FiPlus, FiPrinter, FiType, FiTrash2, FiSquare } from 'react-icons/fi';
import Field from '../components/Field';
import siteLogo from '../assets/labelmatrix-logo.webp';

const STORAGE_KEY = 'labelmatrix-universal-editor-v1';

const readOptimizedImage = async (file) => {
  if (file.type === 'image/svg+xml') {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  if (typeof createImageBitmap === 'function') {
    let bitmap;
    try { bitmap = await createImageBitmap(file); } catch { bitmap = null; }
    if (bitmap) {
    const scale = Math.min(1, 1400 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close?.();
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/webp', 0.84));
    if (blob) return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    }
  }
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
const starter = {
  title: 'Your Label Title', website: 'www.yourwebsite.com', width: 100, height: 150,
  background: '#ffffff', siteLogo: siteLogo, contentFormat: 'table',
  contentRows: [
    { id: 'row-ingredients', label: 'Ingredients', value: 'Add ingredients and product details.' },
    { id: 'row-net', label: 'Net quantity', value: '100 g' },
    { id: 'row-care', label: 'Customer care', value: 'Add contact information.' }
  ],
  items: [
    { id: 'site-logo', type: 'siteLogo', x: 36, y: 2, width: 28 },
    { id: 'title', type: 'text', text: 'Your Label Title', x: 8, y: 18, width: 84, fontSize: 18, bold: true, align: 'center' },
    { id: 'body', type: 'content', x: 8, y: 25, width: 84, fontSize: 10, bold: false, align: 'left' },
    { id: 'site', type: 'text', text: 'www.yourwebsite.com', x: 8, y: 88, width: 84, fontSize: 9, bold: false, align: 'center' }
  ]
};

export default function UniversalLabelEditor() {
  const [design, setDesign] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      const items = Array.isArray(saved.items) ? saved.items.map(item => item.id === 'body' && item.type === 'text' ? { ...item, type: 'content' } : item) : starter.items;
      return { ...starter, ...saved, items, contentRows: Array.isArray(saved.contentRows) ? saved.contentRows : starter.contentRows, contentFormat: saved.contentFormat || 'table' };
    } catch { return starter; }
  });
  const [selected, setSelected] = useState('title');
  const [notice, setNotice] = useState('');
  const uploadRef = useRef(null);
  const stageRef = useRef(null);
  const activeDrag = useRef(null);
  const selectedItem = design.items.find(item => item.id === selected);
  const makeId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const patch = (changes) => setDesign(current => ({ ...current, ...changes }));
  const patchItem = (id, changes) => setDesign(current => ({ ...current, items: current.items.map(item => item.id === id ? { ...item, ...changes } : item) }));
  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(design)); } catch { setNotice('Browser storage is full. Export your design to keep a backup.'); } }, [design]);
  useEffect(() => { if (notice) { const timer = setTimeout(() => setNotice(''), 3500); return () => clearTimeout(timer); } }, [notice]);

  const addText = () => {
    const id = makeId('text');
    setDesign(current => ({ ...current, items: [...current.items, { id, type: 'text', text: 'New text block', x: 10, y: 45, width: 80, fontSize: 11, bold: false, align: 'left' }] }));
    setSelected(id);
  };
  const addShape = () => {
    const id = makeId('shape');
    setDesign(current => ({ ...current, items: [...current.items, { id, type: 'shape', x: 10, y: 60, width: 80, height: 2, color: '#344054' }] }));
    setSelected(id);
  };
  const addImage = async (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    if (file.size > 12 * 1024 * 1024) { setNotice(`${file.name} is larger than 12 MB. Please use a smaller image.`); return; }
    try {
      const src = await readOptimizedImage(file);
      const id = makeId('logo');
      setDesign(current => {
        const imageCount = current.items.filter(item => item.type === 'image').length;
        return { ...current, items: [...current.items, { id, type: 'image', src, name: file.name, x: Math.min(70, 24 + (imageCount % 5) * 4), y: Math.min(80, 52 + (imageCount % 5) * 4), width: 28, rotation: 0, z: current.items.length + 1 }] };
      });
      setSelected(id);
    } catch {
      setNotice(`Could not process ${file.name}. Please try a PNG, JPG, SVG or WebP image.`);
    }
  };
  const addImages = (files) => Array.from(files || []).forEach(addImage);
  const updateContentRow = (id, changes) => patch({ contentRows: (design.contentRows || []).map(row => row.id === id ? { ...row, ...changes } : row) });
  const addContentRow = () => patch({ contentRows: [...(design.contentRows || []), { id: makeId('row'), label: 'New field', value: 'Enter value' }] });
  const setSiteLogo = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    readOptimizedImage(file).then(src => patch({ siteLogo: src })).catch(() => setNotice('Could not process the site logo. Please try another image.'));
  };
  const pointerDown = (event, item) => {
    if (event.target.dataset.resize === 'true') return;
    event.preventDefault(); setSelected(item.id);
    const rect = stageRef.current.getBoundingClientRect();
    activeDrag.current = { id: item.id, startX: event.clientX, startY: event.clientY, x: item.x, y: item.y, rect };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const pointerMove = (event) => {
    const drag = activeDrag.current; if (!drag) return;
    const dx = (event.clientX - drag.startX) / drag.rect.width * 100;
    const dy = (event.clientY - drag.startY) / drag.rect.height * 100;
    patchItem(drag.id, { x: Math.max(0, Math.min(96, drag.x + dx)), y: Math.max(0, Math.min(96, drag.y + dy)) });
  };
  const pointerUp = () => { activeDrag.current = null; };
  const exportDesign = () => {
    const blob = new Blob([JSON.stringify(design, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'labelmatrix-universal-label.json'; anchor.click(); URL.revokeObjectURL(url);
  };
  const exportPDF = async () => {
    if (!stageRef.current) return;
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import('html2canvas'), import('jspdf')]);
      const canvas = await html2canvas(stageRef.current, { scale: 3, backgroundColor: design.background, useCORS: true, logging: false });
      const pdf = new jsPDF({ orientation: Number(design.width) > Number(design.height) ? 'landscape' : 'portrait', unit: 'mm', format: [Number(design.width), Number(design.height)], compress: true });
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, Number(design.width), Number(design.height));
      pdf.save('labelmatrix-universal-label.pdf');
    } catch { setNotice('PDF export failed. Please try Print or check the browser console.'); }
  };
  const paperStyle = useMemo(() => ({ width: `${Math.min(440, Math.max(220, Number(design.width) * 3.1))}px`, aspectRatio: `${design.width}/${design.height}`, background: design.background }), [design.width, design.height, design.background]);

  return <>
    <div className="page-heading"><div><div className="eyebrow">FLEXIBLE DESIGN WORKSPACE</div><h1>Universal Label Editor</h1><p>Design product, packaging, shipping, retail and custom labels on one flexible canvas.</p></div><div className="heading-actions"><button className="btn secondary" onClick={exportDesign}><FiDownload/> Export design</button><button className="btn primary" onClick={exportPDF}><FiDownload/> Export PDF</button></div></div>
    <div className="universal-grid">
      <section className="panel editor-panel universal-controls">
        <div className="panel-head"><div><h2>Label setup</h2><p>Set the label title, size and website identity.</p></div><span className="step-tag">CUSTOM CANVAS</span></div>
        <Field label="Label title" value={design.title} onChange={value => { patch({ title: value }); const titleItem = design.items.find(item => item.id === 'title'); if (titleItem) patchItem('title', { text: value }); }}/>
        <Field label="Website / brand URL" value={design.website} onChange={value => { patch({ website: value }); const siteItem = design.items.find(item => item.id === 'site'); if (siteItem) patchItem('site', { text: value }); }}/>
        <div className="form-grid"><Field label="Width (mm)" value={String(design.width)} onChange={value => patch({ width: Math.max(20, Math.min(300, Number(value) || 20)) })}/><Field label="Height (mm)" value={String(design.height)} onChange={value => patch({ height: Math.max(20, Math.min(300, Number(value) || 20)) })}/></div>
        <label className="field"><span>Label background</span><input type="color" value={design.background} onChange={event => patch({ background: event.target.value })}/></label>
        <div className="divider"/><div className="section-title">LABEL CONTENT FORMAT</div>
        <div className="format-switch" role="group" aria-label="Universal label content format"><button type="button" className={design.contentFormat === 'table' ? 'active' : ''} onClick={() => patch({ contentFormat: 'table' })}>Table format</button><button type="button" className={design.contentFormat === 'paragraph' ? 'active' : ''} onClick={() => patch({ contentFormat: 'paragraph' })}>Paragraph format</button></div>
        <p className="helper-copy">Choose how the product information block is printed. Your field values stay the same when switching formats.</p>
        <div className="content-row-editor">{(design.contentRows || []).map(row => <div className="content-row-fields" key={row.id}><Field label="Field / heading" value={row.label} onChange={value => updateContentRow(row.id, { label: value })}/><Field label="Value" value={row.value} area onChange={value => updateContentRow(row.id, { value })}/><button type="button" className="btn danger small" aria-label={`Remove ${row.label}`} onClick={() => patch({ contentRows: design.contentRows.filter(item => item.id !== row.id) })}>Remove row</button></div>)}<button type="button" className="btn secondary small" onClick={addContentRow}><FiPlus/> Add content row</button></div>
        <div className="divider"/><div className="section-title">SITE LOGO</div>
        <div className="site-logo-control"><img src={design.siteLogo} alt="Site logo preview"/><div><b>Website / company logo</b><small>Upload a PNG, JPG, SVG or WebP brand mark.</small><button className="btn secondary small" onClick={() => uploadRef.current?.click()}><FiImage/> Change site logo</button><input ref={uploadRef} type="file" accept="image/*" hidden onChange={event => { setSiteLogo(event.target.files?.[0]); event.target.value = ''; }}/></div></div>
        <div className="divider"/><div className="section-title">ADD DESIGN ELEMENTS</div>
        <div className="universal-add-actions"><button className="btn secondary" onClick={addText}><FiType/> Add text</button><button className="btn secondary" onClick={() => document.getElementById('universal-image-upload').click()}><FiImage/> Add image / logo</button><button className="btn secondary" onClick={addShape}><FiSquare/> Add line</button><input id="universal-image-upload" type="file" accept="image/*" multiple hidden onChange={event => { addImages(event.target.files); event.target.value = ''; }}/></div>
        <p className="helper-copy">Select and drag elements directly on the label. Select an item to edit its content, size and alignment.</p>
        {selectedItem && <><div className="divider"/><div className="section-title">SELECTED ELEMENT</div>
          {selectedItem.type === 'text' && <><Field label="Text content" value={selectedItem.text} area onChange={value => patchItem(selectedItem.id, { text: value })}/><div className="form-grid"><Field label="Font size (px)" value={String(selectedItem.fontSize)} onChange={value => patchItem(selectedItem.id, { fontSize: Math.max(6, Math.min(72, Number(value) || 6)) })}/><label className="field"><span>Alignment</span><select value={selectedItem.align} onChange={event => patchItem(selectedItem.id, { align: event.target.value })}><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option></select></label></div><label className="inline-check"><input type="checkbox" checked={!!selectedItem.bold} onChange={event => patchItem(selectedItem.id, { bold: event.target.checked })}/> Bold text</label></>}
          {(selectedItem.type === 'image' || selectedItem.type === 'siteLogo') && <p className="helper-copy">{selectedItem.type === 'siteLogo' ? 'Site logo' : `Image: ${selectedItem.name || 'Uploaded image'}`}</p>}
          {selectedItem.type !== 'shape' && <label className="field"><span>Element width (%)</span><input type="range" min="5" max="100" value={selectedItem.width} onChange={event => patchItem(selectedItem.id, { width: Number(event.target.value) })}/></label>}
          {(selectedItem.type === 'image' || selectedItem.type === 'siteLogo') && <label className="field"><span>Rotation ({selectedItem.rotation || 0}°)</span><input type="range" min="-180" max="180" value={selectedItem.rotation || 0} onChange={event => patchItem(selectedItem.id, { rotation: Number(event.target.value) })}/></label>}
          <div className="element-actions"><button className="btn secondary small" onClick={() => patchItem(selectedItem.id, { x: Math.max(0, 50 - selectedItem.width / 2) })}>Center</button>{selectedItem.type === 'image' && <button className="btn secondary small" onClick={() => { const copy = { ...selectedItem, id: makeId('logo'), x: Math.min(95, selectedItem.x + 4), y: Math.min(95, selectedItem.y + 4), z: (selectedItem.z || 1) + 1 }; setDesign(current => ({ ...current, items: [...current.items, copy] })); setSelected(copy.id); }}>Duplicate</button>}<button className="btn secondary small" onClick={() => patchItem(selectedItem.id, { z: Math.max(0, ...design.items.map(item => item.z || 0)) + 1 })}>Bring forward</button><button className="btn danger small" onClick={() => { setDesign(current => ({ ...current, items: current.items.filter(item => item.id !== selectedItem.id) })); setSelected(null); }}><FiTrash2/> Delete</button></div>
        </>}
      </section>
      <section className="panel preview-panel universal-preview"><div className="panel-head"><div><h2>Design canvas</h2><p>Drag elements to position them anywhere on the label.</p></div><span className="live-tag"><i/> LIVE PREVIEW</span></div>
        <div className="preview-stage universal-stage"><div className="universal-paper" ref={stageRef} style={paperStyle} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp}>
          {design.items.map(item => <div key={item.id} className={`universal-item ${selected === item.id ? 'is-selected' : ''}`} style={{ left: `${item.x}%`, top: `${item.y}%`, width: `${item.width}%`, fontSize: item.fontSize ? `${item.fontSize}px` : undefined, fontWeight: item.bold ? 700 : 400, textAlign: item.align || 'left', zIndex: item.z || 1, transform: item.rotation ? `rotate(${item.rotation}deg)` : undefined }} onPointerDown={event => pointerDown(event, item)}>
            {item.type === 'text' ? <div style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{item.text}</div> : item.type === 'content' ? (design.contentFormat === 'table' ? <table className="universal-content-table"><tbody>{(design.contentRows || []).map(row => <tr key={row.id}><th>{row.label}</th><td>{row.value}</td></tr>)}</tbody></table> : <div className="universal-content-paragraphs">{(design.contentRows || []).map(row => <p key={row.id}><b>{row.label}: </b>{row.value}</p>)}</div>) : item.type === 'image' ? <img src={item.src} alt={item.name || 'Label graphic'}/> : item.type === 'siteLogo' ? <img src={design.siteLogo} alt="Site logo"/> : <div style={{height: `${item.height}px`, background: item.color || '#344054', width: '100%'}}/>}
          </div>)}
        </div></div>
        <div className="preview-actions"><button className="btn secondary" onClick={() => window.print()}><FiPrinter/> Print</button><button className="btn primary" onClick={exportPDF}><FiDownload/> Download PDF</button></div>
      </section>
    </div>
    {notice && <div className="toast" role="status">{notice}</div>}
  </>;
}
