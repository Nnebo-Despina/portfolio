import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'

const short = (iso) => new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })

export default function Dashboard() {
  const [s, setS] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => { api('/admin/stats/', { auth: true }).then(setS).catch((e) => setError(e.message)) }, [])

  const cards = s && [
    ['/admin/messages', 'Unread messages', s.unread, true],
    ['/admin/messages', 'Total messages', s.messages],
    ['/admin/projects', 'Projects', s.projects],
    ['/admin/reviews', 'Reviews', s.reviews],
    ['/admin/faqs', 'FAQ', s.faqs],
    ['/admin/experience', 'Experience', s.experience],
    ['/admin/education', 'Education', s.education],
    ['/admin/socials', 'Social links', s.socials],
    ['/admin/tools', 'Tools', s.tools],
  ]

  return (
    <>
      <div className="adm-h">
        <div><h1>Overview</h1><p>Everything on your site is managed from here. Changes go live within a minute.</p></div>
        <a className="a-btn sec" href="/" target="_blank" rel="noreferrer">View site ↗</a>
      </div>
      {error && <div className="form-err">{error}</div>}
      {!s && !error && <div className="stat-grid">{Array.from({ length: 6 }, (_, i) => <div key={i} className="card skeleton" style={{ margin: 0, height: 92 }} />)}</div>}
      {s && (
        <>
          <div className="stat-grid">
            {cards.map(([to, label, n, hot]) => (
              <Link key={label} to={to} className={`card stat-card ${hot && n ? 'hot' : ''}`}><b>{n}</b><span>{label}</span></Link>
            ))}
          </div>
          <div className="card">
            <div style={{ padding: '18px 18px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <b style={{ fontSize: '1.1rem', letterSpacing: '-0.02em' }}>Latest messages</b>
              <Link to="/admin/messages" className="a-btn sm sec">Open inbox</Link>
            </div>
            {s.latest.length === 0 ? (
              <div className="empty-state"><b>No messages yet</b>New enquiries from your contact form will appear here.</div>
            ) : (
              <div className="rows">
                {s.latest.map((m) => (
                  <Link to="/admin/messages" className="row" key={m.id}>
                    <div className="meta"><b>{m.name}{!m.is_read && <span className="pill" style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}>New</span>}</b><span>{m.details}</span></div>
                    <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{short(m.created_at)}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}
