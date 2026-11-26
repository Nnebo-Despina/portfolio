import { useEffect, useMemo, useRef } from 'react'

/** Words turn from grey to ink as the paragraph scrolls through the viewport. */
export default function ScrollFill({ text, className = '' }) {
  const ref = useRef(null)
  const words = useMemo(() => (text || '').split(/\s+/).filter(Boolean), [text])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const spans = [...el.children]
    let last = -1, raf = 0
    const run = () => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.55 + r.height * 0.6)))
      const n = Math.round(p * spans.length)
      if (n === last) return
      const [a, b] = n > last ? [Math.max(last, 0), n] : [n, last]
      for (let i = a; i < b; i++) spans[i]?.classList.toggle('on', n > last)
      last = n
    }
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf) }
  }, [words])

  return (
    <p ref={ref} className={`fill ${className}`} aria-label={text}>
      {words.map((w, i) => <span key={i} aria-hidden="true">{w}{' '}</span>)}
    </p>
  )
}
