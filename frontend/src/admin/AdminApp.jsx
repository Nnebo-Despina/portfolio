import { useCallback, useEffect, useState } from 'react'
import { Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import '../styles/global.css'
import './admin.css'
import { api, getToken, setToken } from '../lib/api'
import { ToastProvider, IconMenu } from './ui'
import { RESOURCES } from './resources'
import Resource from './Resource'
import Login from './Login'
import Dashboard from './Dashboard'
import Messages from './Messages'
import Settings from './Settings'

function Shell({ onLogout }) {
  const [open, setOpen] = useState(false)
  const [unread, setUnread] = useState(0)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])

  const refresh = useCallback(() => {
    api('/admin/stats/', { auth: true }).then((s) => setUnread(s.unread)).catch(() => {})
  }, [])
  useEffect(() => { refresh() }, [refresh, pathname])

  const link = (to, label, badge) => (
    <NavLink to={to} end={to === '/admin'}>{label}{badge ? <span className="adm-badge">{badge}</span> : null}</NavLink>
  )

  const logout = async () => {
    try { await api('/auth/logout/', { method: 'POST', auth: true }) } catch { /* ignore */ }
    onLogout()
  }

  return (
    <div className={`adm ${open ? 'nav-open' : ''}`}>
      <div className="adm-top" style={{ gridColumn: '1 / -1' }}>
        <button className="icon-btn" onClick={() => setOpen(true)} aria-label="Open menu"><IconMenu /></button>
        Admin
      </div>
      <aside className="adm-side" aria-label="Admin navigation">
        <div className="adm-brand"><img src="/img/logo.webp" alt="" /><div>Despina<small>Site admin</small></div></div>
        {link('/admin', 'Overview')}
        {link('/admin/messages', 'Messages', unread || null)}
        <div className="adm-group">Content</div>
        {link('/admin/projects', 'Projects')}
        {link('/admin/reviews', 'Reviews')}
        {link('/admin/experience', 'Experience')}
        {link('/admin/education', 'Education')}
        {link('/admin/faqs', 'FAQ')}
        {link('/admin/socials', 'Social links')}
        {link('/admin/tools', 'Tools')}
        <div className="adm-group">Site</div>
        {link('/admin/settings', 'Contact and settings')}
        <div className="spacer" />
        <Link to="/" target="_blank" className="linkbtn">View site ↗</Link>
        <button className="linkbtn" onClick={logout}>Sign out</button>
      </aside>
      <main className="adm-main" id="admin-main">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="messages" element={<Messages onChange={refresh} />} />
          {Object.entries(RESOURCES).map(([key, cfg]) => (
            <Route key={key} path={key} element={<Resource key={key} cfg={cfg} />} />
          ))}
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default function AdminApp() {
  const [authed, setAuthed] = useState(!!getToken())

  useEffect(() => {
    document.title = 'Admin | Despina'
    const meta = document.createElement('meta')
    meta.name = 'robots'; meta.content = 'noindex'
    document.head.appendChild(meta)
    const out = () => setAuthed(false)
    window.addEventListener('admin:logout', out)
    return () => { window.removeEventListener('admin:logout', out); meta.remove() }
  }, [])

  const logout = () => { setToken(null); setAuthed(false) }

  return (
    <ToastProvider>
      {authed ? <Shell onLogout={logout} /> : <Login onLogin={() => setAuthed(true)} />}
    </ToastProvider>
  )
}
