import '../styles/pages.css'
import Page from '../components/Page'
import { PLATFORM_NAMES, SocialIcon } from '../components/Icons'
import { useSite } from '../lib/site'

function Timeline({ title, items }) {
  return (
    <div className="timeline">
      <h2 className="h2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{title}</h2>
      {items.length ? (
        <ol className="tl">
          {items.map((x) => (
            <li key={x.id}>
              <time>{x.period}</time>
              <h3>{x.title}</h3>
              {x.description && <p>{x.description}</p>}
            </li>
          ))}
        </ol>
      ) : <p className="empty">Nothing added yet.</p>}
    </div>
  )
}

export default function About() {
  const { profile, socials, experience, education } = useSite()
  return (
    <Page title="About">
      <section className="panel">
        <div className="wrap">
          <div className="page-head" style={{ paddingBottom: 0 }} />
          <div className="about-top">
            <div>
              <h1 className="display" style={{ fontSize: 'clamp(2.8rem, 8vw, 6.6rem)', textWrap: 'balance' }}>Hello, I’m {profile.name}.</h1>
              <p className="lede">{profile.about}</p>
              <div className="contact-list">
                <div><span>Based in</span><b>{profile.location}</b></div>
                <a href={`mailto:${profile.email}`}><span>Email</span><b>{profile.email}</b></a>
                <a href={`tel:${profile.phone.replace(/\s/g, '')}`}><span>Phone</span><b>{profile.phone}</b></a>
              </div>
              <div className="socials">
                {socials.map((s) => (
                  <a key={s.id} href={s.url} target="_blank" rel="noreferrer">
                    <SocialIcon platform={s.platform} /> {PLATFORM_NAMES[s.platform] || 'Link'}
                  </a>
                ))}
              </div>
            </div>
            <div className="portrait"><img src="/img/cutout.webp" alt={`${profile.full_name}`} width="433" height="577" fetchPriority="high" /></div>
          </div>
        </div>
      </section>
      <section className="panel soft section">
        <div className="wrap timeline-wrap">
          <Timeline title="Experience" items={experience} />
          <Timeline title="Education" items={education} />
        </div>
      </section>
    </Page>
  )
}
