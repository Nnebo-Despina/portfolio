import { useState } from 'react'
import { api, setToken } from '../lib/api'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true); setError('')
    try {
      const r = await api('/auth/login/', { method: 'POST', body: { username, password } })
      setToken(r.token)
      onLogin()
    } catch (err) {
      setError(err.status === 429 ? 'Too many attempts. Try again in an hour.' : err.message)
    } finally { setBusy(false) }
  }

  return (
    <div className="login">
      <form onSubmit={submit}>
        <h1>Admin sign in</h1>
        <p>Manage your portfolio content and messages.</p>
        {error && <div className="form-err" role="alert">{error}</div>}
        <div className="af"><label htmlFor="u">Username</label><input id="u" type="text" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus /></div>
        <div className="af"><label htmlFor="p">Password</label><input id="p" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
        <button className="a-btn" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </div>
  )
}
