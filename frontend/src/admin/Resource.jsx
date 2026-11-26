import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { Confirm, Field, IconClose, IconDown, IconEdit, IconPlus, IconTrash, IconUp, useToast } from './ui'

function initialValues(cfg, item) {
  const v = {}
  for (const f of cfg.fields) {
    if (f.type === 'image') {
      v[f.name] = { file: null, clear: false, preview: item?.[f.srcName] || '', url: item?.[f.urlName] || '' }
    } else if (f.type === 'tags') {
      v[f.name] = item ? (item.tags || []).join(', ') : f.default ?? ''
    } else if (f.type === 'bool') {
      v[f.name] = item ? !!item[f.name] : f.default ?? false
    } else {
      v[f.name] = item ? item[f.name] ?? '' : f.default ?? ''
    }
  }
  return v
}

function buildBody(cfg, values) {
  const hasImage = cfg.fields.some((f) => f.type === 'image')
  const fd = hasImage ? new FormData() : null
  const json = {}
  for (const f of cfg.fields) {
    const v = values[f.name]
    if (f.type === 'image') {
      if (v.file) fd.append(f.name, v.file)
      fd.append(f.urlName, v.file ? '' : v.url || '')
      if (!v.file && (v.clear || v.url)) fd.append('clear_image', 'true')
    } else if (hasImage) {
      fd.append(f.name, f.type === 'bool' ? String(!!v) : String(v ?? ''))
    } else {
      json[f.name] = f.type === 'number' ? Number(v) : v
    }
  }
  return hasImage ? fd : json
}

function Drawer({ cfg, item, onClose, onSaved }) {
  const toast = useToast()
  const [values, setValues] = useState(() => initialValues(cfg, item))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [onClose])

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true); setError('')
    try {
      await api(item ? `${cfg.path}${item.id}/` : cfg.path, { method: item ? 'PATCH' : 'POST', body: buildBody(cfg, values), auth: true })
      toast('Saved')
      onSaved()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <div className="scrim" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label={item ? `Edit ${cfg.singular}` : `Add ${cfg.singular}`}>
        <header>
          <h2>{item ? `Edit ${cfg.singular}` : `Add ${cfg.singular}`}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><IconClose /></button>
        </header>
        <form onSubmit={submit}>
          <div className="body">
            {error && <div className="form-err" role="alert">{error}</div>}
            {cfg.fields.map((f) => (
              <Field key={f.name} field={f} value={values[f.name]} onChange={(val) => setValues((s) => ({ ...s, [f.name]: val }))} />
            ))}
          </div>
          <footer>
            <button type="button" className="a-btn sec" onClick={onClose}>Cancel</button>
            <button type="submit" className="a-btn" disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</button>
          </footer>
        </form>
      </aside>
    </>
  )
}

export default function Resource({ cfg }) {
  const toast = useToast()
  const [items, setItems] = useState(null)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null) // { item } | null
  const [del, setDel] = useState(null)
  const [busy, setBusy] = useState(false)

  const load = async () => {
    try { setItems(await api(cfg.path, { auth: true })); setError('') } catch (e) { setError(e.message) }
  }
  useEffect(() => { load() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const move = async (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= items.length) return
    const next = [...items]
    ;[next[i], next[j]] = [next[j], next[i]]
    setItems(next)
    try {
      await api(`${cfg.path}reorder/`, { method: 'POST', body: { ids: next.map((x) => x.id) }, auth: true })
    } catch (e) { toast(e.message, 'err'); load() }
  }

  const remove = async () => {
    setBusy(true)
    try {
      await api(`${cfg.path}${del.id}/`, { method: 'DELETE', auth: true })
      toast('Deleted')
      setDel(null)
      await load()
    } catch (e) { toast(e.message, 'err') } finally { setBusy(false) }
  }

  return (
    <>
      <div className="adm-h">
        <div><h1>{cfg.title}</h1><p>{cfg.blurb}</p></div>
        <button className="a-btn" onClick={() => setEditing({ item: null })}><IconPlus /> Add {cfg.singular}</button>
      </div>

      <div className="card">
        {error && <div className="form-err" style={{ margin: 16 }}>{error} <button className="a-btn sm sec" onClick={load}>Try again</button></div>}
        {!items && !error && <><div className="skeleton" /><div className="skeleton" /><div className="skeleton" /></>}
        {items && items.length === 0 && (
          <div className="empty-state"><b>No {cfg.title.toLowerCase()} yet</b>Add your first {cfg.singular} to show it on the site.</div>
        )}
        {items && items.length > 0 && (
          <div className="rows">
            {items.map((x, i) => {
              const r = cfg.row(x)
              return (
                <div className="row" key={x.id}>
                  {'thumb' in r && (r.thumb ? <img className="thumb" src={r.thumb} alt="" loading="lazy" /> : <span className="thumb" />)}
                  <div className="meta">
                    <b>{r.title}{r.hidden && <span className="pill warn">Hidden</span>}</b>
                    <span>{r.sub}</span>
                  </div>
                  <div className="acts">
                    <button className="icon-btn" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up"><IconUp /></button>
                    <button className="icon-btn" disabled={i === items.length - 1} onClick={() => move(i, 1)} aria-label="Move down"><IconDown /></button>
                    <button className="icon-btn" onClick={() => setEditing({ item: x })} aria-label={`Edit ${r.title}`}><IconEdit /></button>
                    <button className="icon-btn del" onClick={() => setDel(x)} aria-label={`Delete ${r.title}`}><IconTrash /></button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {editing && <Drawer cfg={cfg} item={editing.item} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); load() }} />}
      {del && (
        <Confirm
          title={`Delete this ${cfg.singular}?`}
          body={`“${String(cfg.row(del).title).slice(0, 80)}” will be removed from your site. This can’t be undone.`}
          onConfirm={remove} onCancel={() => setDel(null)} busy={busy}
        />
      )}
    </>
  )
}
