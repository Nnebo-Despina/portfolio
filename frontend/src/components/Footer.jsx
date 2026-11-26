import { Link } from 'react-router-dom'
import { useSite } from '../lib/site'
import { PLATFORM_NAMES, SocialIcon, Arrow, BsWhatsapp } from './Icons'

export default function Footer() {
  const { profile, socials } = useSite()
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="col">
            <Link to="/" className="logo" style={{ color: '#fff' }}>
              <img src="/img/logo.webp" alt="" width="28" height="28" />
              {profile.name}
            </Link>
            <p className="blurb">{profile.intro}</p>
            {profile.available && (
              <p className="availability" style={{ marginTop: 22 }}>
                <span className="dot" /> {profile.availability_label}
              </p>
            )}
          </div>
          <div className="col">
            <h3>Explore</h3>
            <Link to="/">Home</Link>
            <Link to="/projects">Work</Link>
            <Link to="/about-me">About</Link>
            <Link to="/services">Process and FAQ</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="col">
            <h3>Get in touch</h3>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
            <p>{profile.location}</p>
            <a className="btn small wa" style={{ marginTop: 14, padding: '8px 18px', gap: 12, alignItems: 'end', color: '#fff' }} href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer">
              <BsWhatsapp /> Chat on WhatsApp
            </a>
          </div>
          <div className="col social">
            <h3>Follow</h3>
            {socials.map((s) => (
              <a key={s.id} href={s.url} target="_blank" rel="noreferrer">
                <SocialIcon platform={s.platform} />
                {PLATFORM_NAMES[s.platform] || 'Link'}
              </a>
            ))}
          </div>
        </div>
        <div className="footer-end">
          <span>© {year} {profile.full_name}. All rights reserved.</span>
          <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>Start a project <Arrow size={14} /></Link>
        </div>
      </div>
      <div className="wordmark" aria-hidden="true">{profile.name}</div>
    </footer>
  )
}
