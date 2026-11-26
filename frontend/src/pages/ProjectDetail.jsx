import { Link, useParams } from 'react-router-dom'
import '../styles/pages.css'
import Page from '../components/Page'
import { Arrow } from '../components/Icons'
import { shortName, catLabel } from '../components/Showcase'
import { useSite } from '../lib/site'

export default function ProjectDetail() {
  const { id } = useParams()
  const { projects } = useSite()
  const idx = projects.findIndex((p) => String(p.id) === id)
  const p = projects[idx]

  if (!p) {
    return (
      <Page title="Project not found">
        <section className="panel nf"><div className="wrap">
          <h2 className="h2">That project isn’t here</h2>
          <p className="lede" style={{ margin: '16px auto 28px' }}>It may have been removed or the link is wrong.</p>
          <Link to="/projects" className="btn">Back to all work <span className="ico"><Arrow size={16} /></span></Link>
        </div></section>
      </Page>
    )
  }
  const next = projects[(idx + 1) % projects.length]
  const links = [
    p.figma_link && ['Figma prototype', p.figma_link],
    p.behance_link && ['Case study on Behance', p.behance_link],
    p.website_link && ['Visit live website', p.website_link],
  ].filter(Boolean)

  return (
    <Page title={shortName(p.name)}>
      <section className="panel">
        <div className="wrap">
          <div className="page-head" style={{ paddingBottom: 28 }}>
            <Link to="/projects" style={{ color: 'var(--muted)', fontWeight: 600 }}>← All work</Link>
            <h1 style={{ marginTop: 18, maxWidth: '18ch' }}>{p.name}</h1>
          </div>
          <div className="pd-hero" style={{ '--c': p.color }}>
            <img src={p.image_src} alt={`${shortName(p.name)} preview`} fetchPriority="high" />
          </div>
          <div className="pd-body">
            <div>
              <span className="chip">{catLabel(p.category)}</span>
              {p.description && <p className="lede" style={{ marginTop: 22 }}>{p.description}</p>}
              <div className="pd-tags">{p.tags.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
            </div>
            <div className="pd-links">
              {links.length ? links.map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer">{label} <Arrow /></a>
              )) : <p className="empty">No public links for this project yet.</p>}
            </div>
          </div>
          {projects.length > 1 && (
            <Link to={`/projects/${next.category}/${next.id}`} className="pd-next" style={{ borderTop: '1px solid var(--line)' }}>
              <small>Next project</small>
              <b>{shortName(next.name)}</b>
            </Link>
          )}
        </div>
      </section>
    </Page>
  )
}
