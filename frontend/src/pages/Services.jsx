import { Link } from 'react-router-dom'
import '../styles/pages.css'
import '../styles/home.css'
import Page from '../components/Page'
import Faq from '../components/Faq'
import { Arrow } from '../components/Icons'
import { useSite } from '../lib/site'

const STEPS = [
  ['Give a project', 'Tell me what you want to build, who it’s for and any references you like. I’ll reply with questions, a plan and a timeline.'],
  ['Make your payment', 'Once everything is confirmed, we go through a clear payment process to kick off the design or development work.'],
  ['Receive your work', 'You get a refined, responsive product ready for feedback, handover or deployment, depending on what you need.'],
]

export default function Services() {
  const { faqs } = useSite()
  return (
    <Page title="Process">
      <section className="panel">
        <div className="wrap">
          <div className="page-head">
            <h1>How we work together</h1>
            <p className="lede">A simple, structured process that takes every project from idea to polished interface with clarity at each step.</p>
          </div>
          <div className="steps" style={{ paddingBottom: 'clamp(60px, 8vw, 110px)' }}>
            {STEPS.map(([t, d], i) => (
              <div className="step" key={t}>
                <span className="n">{i + 1}</span>
                <div><h3>{t}</h3><p>{d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {faqs.length > 0 && (
        <section className="panel section">
          <div className="wrap faq-grid">
            <div className="stick">
              <h2 className="h2">Frequently asked questions</h2>
              <p className="lede">Pricing, timelines and how I work with clients around the world.</p>
              <Link to="/contact" className="btn">Start a project <span className="ico"><Arrow size={16} /></span></Link>
            </div>
            <Faq items={faqs} />
          </div>
        </section>
      )}
    </Page>
  )
}
