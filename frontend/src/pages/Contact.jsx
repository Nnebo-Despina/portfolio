import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/pages.css'
import Page from '../components/Page'
import { Arrow, PLATFORM_NAMES, SocialIcon, BsWhatsapp } from '../components/Icons'
import { api } from '../lib/api'
import { useSite } from '../lib/site'
import { COUNTRIES } from '../lib/countries'

const INTERESTS = ['Mobile UI/UX Design', 'Website UI/UX Design', 'Website Development']
const BUDGETS = ['< $100', '$100 - $500', '$501 - $1000', '$1001 - $3000', '$3001+']
const EMPTY = { name: '', email: '', phone: '', interest: '', budget: '', country: 'Nigeria', details: '', website: '' }

export default function Contact() {
  const { profile, socials } = useSite()
  const [form, setForm] = useState(EMPTY)
  const [state, setState] = useState('idle') // idle | sending | done | error
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const waLink = () => {
    const text = `Hello ${profile.name} 👋🏽\nI want to work with you.\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nInterest: ${form.interest}\nBudget: ${form.budget}\nCountry: ${form.country}\n\nProject details:\n${form.details}`
    return `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(text)}`
  }

  const submit = async (e) => {
    e.preventDefault()
    setState('sending'); setError(''); setFieldErrors({})
    try {
      await api('/contact/', { method: 'POST', body: form })
      setState('done')
    } catch (err) {
      setFieldErrors(err.data && typeof err.data === 'object' ? err.data : {})
      setError(err.status === 429 ? 'You’ve sent a few messages already. Please try again in an hour, or use WhatsApp.' : err.status === 400 ? 'Please fix the highlighted fields.' : err.message)
      setState('error')
    }
  }
  const fe = (k) => fieldErrors[k] && <span className="err">{[].concat(fieldErrors[k]).join(' ')}</span>

  return (
    <Page title="Contact">
      <section className="panel">
        <div className="wrap">
          <div className="page-head">
            <h1>Have a project idea? Let’s talk.</h1>
            <p className="lede">I’m always open to new projects and collaborations. Share what you have in mind and I’ll reply by email.</p>
          </div>
          <div className="contact-grid">
            <aside className="contact-side">
              <div className="contact-list" style={{ marginTop: 0 }}>
                <a href={`mailto:${profile.email}`}><span>Email</span><b>{profile.email}</b></a>
                <a href={`tel:${profile.phone.replace(/\s/g, '')}`}><span>Phone</span><b>{profile.phone}</b></a>
                <div><span>Based in</span><b>{profile.location}</b></div>
              </div>
              <div className="socials">
                <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer"><BsWhatsapp /> WhatsApp</a>
                {socials.map((s) => (
                  <a key={s.id} href={s.url} target="_blank" rel="noreferrer"><SocialIcon platform={s.platform} /> {PLATFORM_NAMES[s.platform] || 'Link'}</a>
                ))}
              </div>
            </aside>

            {state === 'done' ? (
              <div className="done" role="status">
                <h2>Message sent.</h2>
                <p>Thanks, {form.name.split(' ')[0]}. I’ll read it and reply to {form.email} soon. For something urgent, you can also message me on WhatsApp.</p>
                <a className="btn light" href={waLink()} target="_blank" rel="noreferrer">Continue on WhatsApp <span className="ico"><Arrow size={16} /></span></a>
              </div>
            ) : (
              <form className="form" onSubmit={submit} noValidate>
                {state === 'error' && (
                  <div className="notice" role="alert">
                    {error}
                    {!Object.keys(fieldErrors).length || fieldErrors.detail ? (
                      <div><a className="btn small wa" href={waLink()} target="_blank" rel="noreferrer" style={{ color: '#fff' }}><BsWhatsapp /> Send on WhatsApp instead</a></div>
                    ) : null}
                  </div>
                )}
                <div className="row2">
                  <div className="field"><label htmlFor="name">Your name <i>*</i></label><input id="name" value={form.name} onChange={set('name')} placeholder="Ada Obi" required autoComplete="name" />{fe('name')}</div>
                  <div className="field"><label htmlFor="email">Email <i>*</i></label><input id="email" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" required autoComplete="email" />{fe('email')}</div>
                </div>
                <div className="row2">
                  <div className="field"><label htmlFor="phone">Phone</label><input id="phone" value={form.phone} onChange={set('phone')} placeholder="Optional" autoComplete="tel" />{fe('phone')}</div>
                  <div className="field"><label htmlFor="interest">I’m interested in <i>*</i></label>
                    <select id="interest" value={form.interest} onChange={set('interest')} required>
                      <option value="" disabled>Select a service</option>
                      {INTERESTS.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div className="row2">
                  <div className="field"><label htmlFor="budget">Budget <i>*</i></label>
                    <select id="budget" value={form.budget} onChange={set('budget')} required>
                      <option value="" disabled>Select a budget</option>
                      {BUDGETS.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="field"><label htmlFor="country">Country <i>*</i></label>
                    <select id="country" value={form.country} onChange={set('country')} required>
                      {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="field"><label htmlFor="details">Project details <i>*</i></label>
                  <textarea id="details" value={form.details} onChange={set('details')} placeholder="What are you building, and what does success look like?" required />{fe('details')}
                </div>
                <div className="hp" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} /></label></div>
                <div><button type="submit" className="btn" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send message'} <span className="ico"><Arrow size={16} /></span></button></div>
              </form>
            )}
          </div>
        </div>
      </section>
    </Page>
  )
}
