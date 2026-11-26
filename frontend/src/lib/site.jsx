import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api } from './api'
import { SEED } from './seed'

const CACHE_KEY = 'despina_site_v2'
const SiteContext = createContext({ ...SEED, live: false, loaded: false })

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    return raw ? { ...SEED, ...JSON.parse(raw) } : SEED
  } catch {
    return SEED
  }
}

/**
 * Stale-while-revalidate: the page paints immediately from the last response
 * (or the built-in seed), then swaps in fresh data from the API.
 */
export function SiteProvider({ children }) {
  const [data, setData] = useState(readCache)
  const [state, setState] = useState({ live: false, loaded: false })

  useEffect(() => {
    const ctrl = new AbortController()
    api('/bootstrap/', { signal: ctrl.signal, timeout: 12000 })
      .then((fresh) => {
        setData({ ...SEED, ...fresh })
        setState({ live: true, loaded: true })
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(fresh))
        } catch {
          /* storage full or blocked */
        }
      })
      .catch(() => setState({ live: false, loaded: true }))
    return () => ctrl.abort()
  }, [])

  const value = useMemo(() => ({ ...data, ...state }), [data, state])
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export const useSite = () => useContext(SiteContext)
