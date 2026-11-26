import { createContext, useCallback, useContext, useState } from 'react'

/* ---------- Toasts ---------- */
const ToastCtx = createContext(() => {})
export const useToast = () => useContext(ToastCtx)

export function ToastProvider({ children }) {
  const [list, setList] = useState([])
  const push = useCallback((text, kind = 'ok') => {
    const id = Math.random()
    setList((l) => [...l, { id, text, kind }])
    setTimeout(() => setList((l) => l.filter((t) => t.id !== id)), 3200)
  }, [])
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="toasts" role="status" aria-live="polite">
        {list.map((t) => <div key={t.id} className={`toast ${t.kind === 'err' ? 'err' : ''}`}>{t.text}</div>)}
      </div>
    </ToastCtx.Provider>
  )
}

/* ---------- Icons ---------- */
const I = ({ d, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
)
export const IconUp = () => <I d="M12 19V5M5 12l7-7 7 7" />
export const IconDown = () => <I d="M12 5v14M19 12l-7 7-7-7" />
export const IconEdit = () => <I d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
export const IconTrash = () => <I d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6" />
export const IconPlus = () => <I d="M12 5v14M5 12h14" />
export const IconClose = () => <I d="M6 6l12 12M18 6L6 18" />
export const IconMenu = () => <I d="M4 7h16M4 12h16M4 17h16" size={22} />

/* ---------- Confirm dialog ---------- */
export function Confirm({ title, body, confirmLabel = 'Delete', onConfirm, onCancel, busy }) {
  return (
    <>
      <div className="scrim" onClick={onCancel} />
      <div className="dialog" role="alertdialog" aria-modal="true" aria-labelledby="cf-t">
        <h3 id="cf-t">{title}</h3>
        <p>{body}</p>
        <div className="acts">
          <button className="a-btn sec" onClick={onCancel}>Cancel</button>
          <button className="a-btn danger" onClick={onConfirm} disabled={busy}>{busy ? 'Deleting…' : confirmLabel}</button>
        </div>
      </div>
    </>
  )
}

/* ---------- Form fields ---------- */
export function Field({ field, value, onChange }) {
  const id = `f-${field.name}`
  const label = <label htmlFor={id}>{field.label}{field.required && ' *'}</label>
  const help = field.help && <span className="help">{field.help}</span>

  switch (field.type) {
    case 'textarea':
      return <div className="af">{label}<textarea id={id} value={value ?? ''} required={field.required} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} />{help}</div>
    case 'select':
      return (
        <div className="af">{label}
          <select id={id} value={value ?? ''} required={field.required} onChange={(e) => onChange(e.target.value)}>
            {field.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>{help}
        </div>
      )
    case 'number':
      return <div className="af">{label}<input id={id} type="number" min={field.min} max={field.max} value={value ?? ''} required={field.required} onChange={(e) => onChange(e.target.value)} />{help}</div>
    case 'color':
      return (
        <div className="af">{label}
          <div className="colorrow">
            <input id={id} type="color" value={/^#[0-9a-f]{6}$/i.test(value) ? value : '#e7e4ff'} onChange={(e) => onChange(e.target.value)} />
            <input type="text" aria-label={`${field.label} hex`} value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder="#E7E4FF" />
          </div>{help}
        </div>
      )
    case 'bool':
      return (
        <div className="af">
          <label className="toggle">
            <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
            <span className="sw" />{field.label}
          </label>{help}
        </div>
      )
    case 'tags':
      return <div className="af">{label}<input id={id} type="text" value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder="UI/UX, App Design, Health Care" />{help}</div>
    case 'image':
      return <ImageField field={field} value={value} onChange={onChange} />
    default:
      return <div className="af">{label}<input id={id} type={field.type === 'url' ? 'text' : field.type === 'email' ? 'email' : 'text'} value={value ?? ''} required={field.required} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} />{help}</div>
  }
}

function ImageField({ field, value, onChange }) {
  const v = value || { file: null, preview: '', clear: false, url: '' }
  const shown = v.clear ? '' : v.preview || v.url
  const pick = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 8 * 1024 * 1024) { alert('Please choose an image under 8 MB.'); return }
    onChange({ ...v, file, clear: false, preview: URL.createObjectURL(file) })
  }
  return (
    <div className="af imgfield">
      <span className="lbl">{field.label}</span>
      <div className="prev">{shown ? <img src={shown} alt="" /> : <span>No image</span>}</div>
      <div className="tools">
        <label className="a-btn sec sm" style={{ cursor: 'pointer' }}>
          {shown ? 'Replace image' : 'Upload image'}
          <input type="file" accept="image/*" onChange={pick} />
        </label>
        {shown && <button type="button" className="a-btn sec sm" onClick={() => onChange({ ...v, file: null, preview: '', url: '', clear: true })}>Remove image</button>}
      </div>
      <input type="text" aria-label="Image link" placeholder="Or paste an image link, e.g. /projects/x.webp" value={v.clear ? '' : (v.file ? '' : v.url || '')} onChange={(e) => onChange({ ...v, file: null, preview: '', clear: false, url: e.target.value })} />
      {field.help && <span className="help">{field.help}</span>}
    </div>
  )
}
