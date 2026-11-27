import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../styles/home.css'
import Page from '../components/Page'
import Faq from '../components/Faq'
import Showcase, { shortName, catLabel } from '../components/Showcase'
import ScrollFill from '../components/ScrollFill'
import { Arrow, Cursor, Sparkle, BsWhatsapp } from '../components/Icons'
import { useSite } from '../lib/site'
import { useInView } from '../lib/hooks'

function Hero() {
  const { profile, projects } = useSite()
  const box = useRef(null)
  const raf = useRef(0)

  // tiny pointer parallax for the stickers (desktop only)
  useEffect(() => {
    const el = box.current
    if (!el || !window.matchMedia('(pointer: fine)').matches) return
    const move = (e) => {
      cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => {
        el.style.setProperty('--mx', ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3))
        el.style.setProperty('--my', ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3))
      })
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(raf.current) }
  }, [])

  const pool = projects.filter((p) => p.featured)
  const feat = (pool.length ? pool : projects).slice(0, 4)
  const mid = Math.ceil(feat.length / 2)
  const items = [...feat.slice(0, mid).map((p) => ({ p })), { me: true }, ...feat.slice(mid).map((p) => ({ p }))]
  const center = (items.length - 1) / 2

  return (
    <section className="panel hero">
      <div className="wrap hero-inner" ref={box}>
        <p className="hero-badge">
          {profile.available && <span className="dot" />} Hi, I’m {profile.name}
          {profile.available ? `. ${profile.availability_label}` : ''}
        </p>
        <h1 className="hero-title">
          <span className="line"><span>I design and build</span></span>
          <span className="line"><span>interfaces people enjoy.</span></span>
          <span className="stk figma" aria-hidden="true"><span className="stk-in"><span className="tag">Figma</span></span></span>
          <span className="stk react" aria-hidden="true"><span className="stk-in"><span className="tag">React</span></span></span>
          <span className="stk star" aria-hidden="true"><span className="stk-in"><Sparkle size={44} /></span></span>
          <span className="stk heart" aria-hidden="true"><span className="stk-in"><Sparkle size={26} /></span></span>
          <span className="stk you" aria-hidden="true"><span className="stk-in cur"><Cursor /><span className="tag">You</span></span></span>
          <span className="stk me" aria-hidden="true"><span className="stk-in cur"><Cursor /><span className="tag">{profile.name}</span></span></span>
        </h1>
        <p className="lede hero-sub">{profile.role}. {profile.intro}</p>
        <div className="hero-cta">
          <Link to="/projects" className="btn">View my work <span className="ico"><Arrow size={16} /></span></Link>
          <Link to="/contact" className="btn ghost plain">Contact me</Link>
        </div>
      </div>

      {/* <div className="fan" aria-label="Featured projects">
        {items.map((it, idx) => {
          const i = idx - center
          const style = { '--i': i, '--ay': Math.abs(i), '--z': 10 - Math.round(Math.abs(i) * 2) }
          if (it.me) {
            return (
              <Link key="me" to="/about-me" className="fcard me" style={style} aria-label={`About ${profile.name}`}>
                <img src="/img/hero.webp" alt={`${profile.full_name}`} width="500" height="667" fetchPriority="high" decoding="async" />
                <span className="nm"><b>{profile.full_name}</b><span>{profile.location}</span></span>
              </Link>
            )
          }
          const p = it.p
          return (
            <Link key={p.id} to={`/projects/${p.category}/${p.id}`} className="fcard" style={{ ...style, '--c': p.color }}>
              <span className="fcard-art"><img src={p.image_src} alt="" loading="eager" decoding="async" /></span>
              <span className="fcard-meta"><b>{shortName(p.name)}</b><span>{catLabel(p.category)}</span></span>
            </Link>
          )
        })}
      </div> */}
    </section>
  )
}

function Work() {
  const { projects } = useSite()
  const pool = projects.filter((p) => p.featured)
  const list = pool.length ? pool : projects
  if (!list.length) return null
  return (
    <section className="panel dark showcase" id="work">
      <div className="wrap showcase-head">
        <h2>Selected work, designed and built with care</h2>
        <p className="lede">Mobile apps, website designs and full stack builds. Drag, swipe or use the arrows.</p>
      </div>
      <Showcase projects={list} />
      <div className="showcase-foot">
        <Link to="/projects" className="btn light">See all projects <span className="ico"><Arrow size={16} /></span></Link>
      </div>
    </section>
  )
}

function About() {
  const { profile, projects } = useSite()
  const year = (new Date().getFullYear() - 2025) + '+'
  const stats = [
    [year, 'Years of experience'],
    [String(projects.length), 'Projects completed'],
    [profile.satisfaction, 'Client satisfaction'],
    [profile.clients_count, 'Clients worldwide'],
  ]
  return (
    <section className="panel section">
      <div className="wrap">
        <div className="about-grid">
          <div>
            <h2 className="h2">Who is {profile.full_name}?</h2>
            <ScrollFill text={profile.about} />
            <div style={{ marginTop: 36 }}>
              <Link to="/about-me" className="btn">More about me <span className="ico"><Arrow size={16} /></span></Link>
            </div>
          </div>
          <div className="about-photo">
            <div className="arch"><img src="/img/about.webp" alt={`Portrait of ${profile.full_name}`} width="500" height="667" loading="lazy" decoding="async" /></div>
            <span className="tag">{profile.location}</span>
          </div>
        </div>
        <div className="stats">
          {stats.map(([v, l]) => (
            <div className="stat" key={l}><b>{v}</b><span>{l}</span></div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Tools() {
  const { tools } = useSite()
  const [ref, seen] = useInView()
  if (!tools.length) return null
  return (
    <section className="panel soft section" ref={ref}>
      <div className={`wrap ${seen ? 'in-view' : ''}`}>
        <div className="tools-head">
          <h2 className="h2" style={{ maxWidth: '12ch' }}>Tools behind my process</h2>
          <p className="lede">The software I reach for every day to design, prototype and ship.</p>
        </div>
        <div className="tools-grid">
          {tools.map((t) => (
            <div className="tool" key={t.id}>
              <div className="tool-top">
                {t.icon_src && <img src={t.icon_src} alt="" width="52" height="52" loading="lazy" />}
                <b>{t.name}</b>
              </div>
              <div>
                <div className="tool-lvl"><strong>{t.level}%</strong></div>
                <div className="bar" role="img" aria-label={`${t.name} proficiency ${t.level} percent`}><i style={{ '--w': `${t.level}%` }} /></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Reviews() {
  const { reviews } = useSite()
  if (!reviews.length) return null
  // repeat so the loop is seamless even with few reviews
  const base = reviews.length < 4 ? [...reviews, ...reviews] : reviews
  const loop = [...base, ...base]
  return (
    <section className="panel section">
      <div className="wrap reviews-head">
        <h2 className="h2">Kind words from clients</h2>
        <p className="lede">A few notes from people I’ve worked with.</p>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {loop.map((r, i) => (
            <figure className="review" key={`${r.id}-${i}`} aria-hidden={i >= base.length} style={{ margin: 0 }}>
              <div className="stars" aria-label={`${r.rating} out of 5`}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
              <p>{r.review}</p>
              <figcaption className="who">
                {r.avatar_src ? <img src={r.avatar_src} alt="" loading="lazy" /> : <span className="av">{r.name[0]}</span>}
                <span><b>{r.name}</b><small>{[r.position, r.company].filter(Boolean).join(', ')}</small></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  const { faqs } = useSite()
  if (!faqs.length) return null
  return (
    <section className="panel section">
      <div className="wrap faq-grid">
        <div className="stick">
          <h2 className="h2">Questions, answered</h2>
          <p className="lede">Pricing, timelines and how we’d work together. Can’t find yours? Send it over.</p>
          <Link to="/contact" className="btn">Ask me directly <span className="ico"><Arrow size={16} /></span></Link>
        </div>
        <Faq items={faqs} />
      </div>
    </section>
  )
}

function Cta() {
  const { profile } = useSite()
  return (
    <section className="panel brand cta">
      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <h2>Ready to get your dream website?</h2>
        <p>Whether it’s a website, a mobile app design or a complete UI system, let’s build something modern, functional and designed to impress from the first click.</p>
        <div className="row">
          <Link to="/contact" className="btn light">Contact me <span className="ico"><Arrow size={16} /></span></Link>
          <a className="btn outline-light plain" style={{ gap: 8 }} href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer"><BsWhatsapp /> Chat on WhatsApp</a>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <Page>
      <Hero />
      <Work />
      <About />
      <Tools />
      <Reviews />
      <FaqSection />
      <Cta />
    </Page>
  )
}
