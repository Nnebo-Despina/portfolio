import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { Confirm, useToast } from './ui'

const fmt = (iso) => new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
const short = (iso) => new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })

export default function Messages({ onChange }) {
  const toast = useToast()
  const [items, setItems] = useState(null)
  const [error, setError] = useState('')
  const [sel, setSel] = useState(null)
  const [del, setDel] = useState(false)

  const load = async () => {
    try { setItems(await api('/admin/messages/', { auth: true })); setError('') } catch (e) { setError(e.message) }
  }
  useEffect(() => { load() }, [])

  const current = items?.find((m) => m.id === sel)

  const patch = async (m, is_read) => {
    try {
      await api(`/admin/messages/${m.id}/`, { method: 'PATCH', body: { is_read }, auth: true })
      setItems((l) => l.map((x) => (x.id === m.id ? { ...x, is_read } : x)))
      onChange?.()
    } catch (e) { toast(e.message, 'err') }
  }
  const open = (m) => { setSel(m.id); if (!m.is_read) patch(m, true) }

  const remove = async () => {
    try {
      await api(`/admin/messages/${current.id}/`, { method: 'DELETE', auth: true })
      toast('Deleted'); setDel(false); setSel(null); await load(); onChange?.()
    } catch (e) { toast(e.message, 'err') }
  }
  const markAll = async () => {
    try { await api('/admin/messages/mark-all-read/', { method: 'POST', auth: true }); toast('All marked as read'); await load(); onChange?.() } catch (e) { toast(e.message, 'err') }
  }

  const unread = items?.filter((m) => !m.is_read).length || 0
  const wa = current?.phone ? `https://wa.me/${current.phone.replace(/\D/g, '')}` : ''

  return (
    <>
      <div className="adm-h">
        <div><h1>Messages</h1><p>Enquiries sent from your contact form. {unread ? `${unread} unread.` : 'You’re all caught up.'}</p></div>
        {unread > 0 && <button className="a-btn sec" onClick={markAll}>Mark all as read</button>}
      </div>
      {error && <div className="form-err">{error} <button className="a-btn sm sec" onClick={load}>Try again</button></div>}
      {!items && !error && <div className="card"><div className="skeleton" /><div className="skeleton" /></div>}
      {items && items.length === 0 && <div className="card empty-state"><b>No messages yet</b>When someone fills in your contact form it will show up here.</div>}
      {items && items.length > 0 && (
        <div className={`inbox ${current ? 'has-sel' : ''}`}>
          <div className="card msg-list-card">
            <div className="msg-list">
              {items.map((m) => (
                <button key={m.id} className={`msg-item ${m.id === sel ? 'on' : ''} ${m.is_read ? '' : 'unread'}`} onClick={() => open(m)}>
                  <b>{m.name}<time>{short(m.created_at)}</time></b>
                  <span>{m.details}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="card msg-view-card">
            {current ? (
              <div className="msg-view">
                <button className="a-btn sec sm msg-back" onClick={() => setSel(null)}>← All messages</button>
                <h2>{current.name}</h2>
                <small style={{ color: 'var(--muted)' }}>{fmt(current.created_at)}</small>
                <div className="msg-meta">
                  <div><small>Email</small><span>{current.email}</span></div>
                  {current.phone && <div><small>Phone</small><span>{current.phone}</span></div>}
                  {current.interest && <div><small>Interested in</small><span>{current.interest}</span></div>}
                  {current.budget && <div><small>Budget</small><span>{current.budget}</span></div>}
                  {current.country && <div><small>Country</small><span>{current.country}</span></div>}
                </div>
                <p className="msg-body">{current.details}</p>
                <div className="msg-acts">
                  <a className="a-btn" href={`mailto:${current.email}?subject=${encodeURIComponent('Re: your project enquiry')}`}>Reply by email</a>
                  {wa && <a className="a-btn sec" href={wa} target="_blank" rel="noreferrer">Reply on WhatsApp</a>}
                  <button className="a-btn sec" onClick={() => patch(current, !current.is_read)}>{current.is_read ? 'Mark as unread' : 'Mark as read'}</button>
                  <button className="a-btn sec" onClick={() => setDel(true)} style={{ color: '#c0332b' }}>Delete</button>
                </div>
              </div>
            ) : <div className="empty-state"><b>Select a message</b>Choose one from the list to read it.</div>}
          </div>
        </div>
      )}
      {del && current && <Confirm title="Delete this message?" body={`The message from ${current.name} will be permanently deleted.`} onConfirm={remove} onCancel={() => setDel(false)} />}
    </>
  )
}
