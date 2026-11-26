import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { Field, useToast } from './ui'

const FIELDS = [
  { group: 'Contact details', items: [
    { name: 'location', label: 'Location', type: 'text', help: 'Shown in the footer, About and Contact pages.' },
    { name: 'phone', label: 'Phone number', type: 'text', help: 'Shown on the site, e.g. +234 813 5744 702' },
    { name: 'whatsapp', label: 'WhatsApp number', type: 'text', help: 'Digits only with country code, no + or spaces. Used by the WhatsApp buttons.' },
    { name: 'email', label: 'Email', type: 'email' },
  ] },
  { group: 'Availability', items: [
    { name: 'available', label: 'Show “open to new projects”', type: 'bool' },
    { name: 'availability_label', label: 'Availability text', type: 'text' },
  ] },
  { group: 'Intro and about', items: [
    { name: 'name', label: 'Display name', type: 'text' },
    { name: 'full_name', label: 'Full name', type: 'text' },
    { name: 'role', label: 'Role', type: 'text' },
    { name: 'intro', label: 'Short intro', type: 'textarea', help: 'Shown under the home page headline.' },
    { name: 'about', label: 'About me', type: 'textarea', help: 'Shown on the home and About pages.' },
  ] },
  { group: 'Numbers on the home page', items: [
    { name: 'years_experience', label: 'Years of experience', type: 'text' },
    { name: 'satisfaction', label: 'Client satisfaction', type: 'text' },
    { name: 'clients_count', label: 'Clients worldwide', type: 'text' },
  ] },
]

export default function Settings() {
  const toast = useToast()
  const [values, setValues] = useState(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => { api('/admin/profile/', { auth: true }).then(setValues).catch((e) => setError(e.message)) }, [])

  const save = async (e) => {
    e.preventDefault()
    setSaving(true); setError('')
    try {
      setValues(await api('/admin/profile/', { method: 'PUT', body: values, auth: true }))
      toast('Saved')
    } catch (err) { setError(err.message) } finally { setSaving(false) }
  }

  return (
    <>
      <div className="adm-h"><div><h1>Site settings</h1><p>Your contact details, location and the text at the top of your site.</p></div></div>
      {!values && !error && <div className="card"><div className="skeleton" /><div className="skeleton" /></div>}
      {values && (
        <form onSubmit={save} style={{ display: 'grid', gap: 14, maxWidth: 760 }}>
          {error && <div className="form-err" role="alert">{error}</div>}
          {FIELDS.map((g) => (
            <section className="card" key={g.group} style={{ padding: 24, display: 'grid', gap: 18 }}>
              <h2 style={{ fontSize: '1.1rem', letterSpacing: '-0.02em' }}>{g.group}</h2>
              {g.items.map((f) => <Field key={f.name} field={f} value={values[f.name]} onChange={(v) => setValues((s) => ({ ...s, [f.name]: v }))} />)}
            </section>
          ))}
          <div><button className="a-btn" disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</button></div>
        </form>
      )}
      {!values && error && <div className="form-err">{error}</div>}
    </>
  )
}
