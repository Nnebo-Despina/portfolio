import { Link, useNavigate, useParams } from 'react-router-dom'
import '../styles/pages.css'
import Page from '../components/Page'
import { Arrow } from '../components/Icons'
import { shortName, catLabel } from '../components/Showcase'
import { CATEGORIES } from '../lib/seed'
import { useSite } from '../lib/site'

export default function Projects() {
  const { category } = useParams()
  const navigate = useNavigate()
  const { projects } = useSite()
  const active = CATEGORIES.some((c) => c.key === category) ? category : 'all'
  const list = active === 'all' ? projects : projects.filter((p) => p.category === active)
  const count = (k) => projects.filter((p) => p.category === k).length

  return (
    <Page title="Work">
      <section className="panel">
        <div className="wrap">
          <div className="page-head">
            <h1>Selected work</h1>
            <p className="lede">Mobile interfaces, website designs and front end builds. Each one starts from a real user need.</p>
          </div>
          <div className="filters" role="tablist" aria-label="Filter projects">
            <button className={active === 'all' ? 'on' : ''} onClick={() => navigate('/projects')}>All <small>{projects.length}</small></button>
            {CATEGORIES.map((c) => (
              <button key={c.key} className={active === c.key ? 'on' : ''} onClick={() => navigate(`/projects/${c.key}`)}>
                {c.label} <small>{count(c.key)}</small>
              </button>
            ))}
          </div>
          {list.length ? (
            <div className="proj-grid">
              {list.map((p) => (
                <Link key={p.id} to={`/projects/${p.category}/${p.id}`} className="pcard" style={{ '--c': p.color }}>
                  <div className="art"><img src={p.image_src} alt="" loading="lazy" decoding="async" /></div>
                  <div className="info">
                    <div><small>{catLabel(p.category)}</small><b>{shortName(p.name)}</b></div>
                    <span className="go"><Arrow size={18} /></span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="empty" style={{ paddingBottom: 100 }}>No projects in this category yet.</p>
          )}
        </div>
      </section>
    </Page>
  )
}
