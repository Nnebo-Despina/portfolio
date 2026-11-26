import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'

export function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Despina Nnebo` : 'Despina Nnebo | UI/UX Designer & Front End Developer'
  }, [title])
}

/** Shared chrome for public pages. Scrolls to top on route change. */
export default function Page({ title, children }) {
  const { pathname } = useLocation()
  useTitle(title)
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </>
  )
}
