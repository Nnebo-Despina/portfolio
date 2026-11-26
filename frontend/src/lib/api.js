const BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
const TOKEN_KEY = 'despina_admin_token'

export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = (t) => (t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY))

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message)
    this.status = status
    this.data = data
  }
}

/** Turn DRF error payloads ({field: ["msg"]} or {detail}) into one readable sentence. */
function readableError(data, status) {
  if (!data) return status ? `Request failed (${status}).` : 'Could not reach the server. Check your connection.'
  if (typeof data === 'string') return data
  if (data.detail) return data.detail
  const parts = Object.entries(data).map(([k, v]) => {
    const msg = Array.isArray(v) ? v.join(' ') : String(v)
    return `${k.replace(/_/g, ' ')}: ${msg}`
  })
  return parts.join(' ') || 'Something went wrong.'
}

export async function api(path, { method = 'GET', body, auth = false, timeout = 15000, signal } = {}) {
  const headers = {}
  let payload
  if (body instanceof FormData) payload = body
  else if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
    payload = JSON.stringify(body)
  }
  if (auth && getToken()) headers.Authorization = `Token ${getToken()}`

  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), timeout)
  signal?.addEventListener('abort', () => ctrl.abort())

  let res
  try {
    res = await fetch(`${BASE}/api${path}`, { method, headers, body: payload, signal: ctrl.signal })
  } catch {
    throw new ApiError(readableError(null), 0)
  } finally {
    clearTimeout(timer)
  }

  if (res.status === 204) return null
  let data = null
  try {
    data = await res.json()
  } catch {
    /* non-JSON body */
  }
  if (!res.ok) {
    if (auth && res.status === 401) {
      setToken(null)
      window.dispatchEvent(new Event('admin:logout'))
    }
    throw new ApiError(readableError(data, res.status), res.status, data)
  }
  return data
}
