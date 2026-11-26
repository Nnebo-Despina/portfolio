import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Arrow, Menu } from './Icons'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/projects', label: 'Work' },
  { to: '/about-me', label: 'About' },
  { to: '/services', label: 'Process' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header className="nav">
        <nav className="nav-pill" aria-label="Main">
          <Link to="/" className="logo" aria-label="Despina, home">
            <img src="/img/logo.webp" alt="" width="28" height="28" />
            Despina
          </Link>
          <div className="nav-links">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end}>{l.label}</NavLink>
            ))}
          </div>
          <Link to="/contact" className="btn small plain nav-cta">Contact me</Link>
          <button className="nav-burger" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
            <Menu close={open} />
          </button>
        </nav>
      </header>
      <div className={`sheet ${open ? 'open' : ''}`} aria-hidden={!open}>
        {LINKS.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end} tabIndex={open ? 0 : -1}>{l.label}</NavLink>
        ))}
        <NavLink to="/contact" tabIndex={open ? 0 : -1}>Contact</NavLink>
        <Link to="/contact" className="btn" tabIndex={open ? 0 : -1}>
          Start a project <span className="ico"><Arrow size={16} /></span>
        </Link>
      </div>
    </>
  )
}
