import { useCallback, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Arrow } from './Icons'
import { CATEGORIES } from '../lib/seed'

export const shortName = (n = '') => n.split(' - ')[0]
export const catLabel = (k) => CATEGORIES.find((c) => c.key === k)?.label || ''

/** Horizontal coverflow. Scroll-snap does the physics; JS only writes 3 CSS vars per card. */
export default function Showcase({ projects }) {
  const rail = useRef(null)
  const raf = useRef(0)
  const drag = useRef({ on: false, x: 0, left: 0, moved: false })

  const update = useCallback(() => {
    const el = rail.current
    if (!el) return
    const mid = el.getBoundingClientRect().left + el.clientWidth / 2
    for (const card of el.children) {
      const r = card.getBoundingClientRect()
      const o = Math.max(-1.6, Math.min(1.6, (r.left + r.width / 2 - mid) / r.width))
      const a = Math.abs(o)
      card.style.setProperty('--rot', `${(-o * 26).toFixed(2)}deg`)
      card.style.setProperty('--sc', (1 - a * 0.09).toFixed(3))
      card.style.setProperty('--op', (1 - a * 0.28).toFixed(3))
    }
  }, [])

  useEffect(() => {
    const el = rail.current
    if (!el) return
    const onScroll = () => { cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(update) }
    update()
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { el.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf.current) }
  }, [update, projects])

  const step = (dir) => {
    const el = rail.current
    const w = el.firstElementChild?.getBoundingClientRect().width || 300
    el.scrollBy({ left: dir * (w + 24), behavior: 'smooth' })
  }

  // mouse drag (touch uses native scrolling)
  const down = (e) => {
    if (e.pointerType !== 'mouse') return
    drag.current = { on: true, x: e.clientX, left: rail.current.scrollLeft, moved: false }
  }
  const move = (e) => {
    const d = drag.current
    if (!d.on) return
    const dx = e.clientX - d.x
    if (Math.abs(dx) > 5) { d.moved = true; rail.current.classList.add('drag') }
    if (d.moved) rail.current.scrollLeft = d.left - dx
  }
  const up = () => {
    drag.current.on = false
    rail.current?.classList.remove('drag')
  }
  const click = (e) => { if (drag.current.moved) { e.preventDefault(); drag.current.moved = false } }

  return (
    <>
      <div className="rail" ref={rail} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up} onClickCapture={click}
        role="list" aria-label="Selected projects">
        {projects.map((p) => (
          <Link key={p.id} to={`/projects/${p.category}/${p.id}`} className="wcard" style={{ '--c': p.color }} role="listitem" draggable={false}>
            <div className="wcard-art"><img src={p.image_src} alt="" loading="lazy" decoding="async" draggable={false} /></div>
            <div className="wcard-info">
              <div><small>{catLabel(p.category)}</small><b>{shortName(p.name)}</b></div>
              <span className="go"><Arrow size={18} /></span>
            </div>
          </Link>
        ))}
      </div>
      <div className="rail-ctl">
        <button className="prev" onClick={() => step(-1)} aria-label="Previous project"><Arrow /></button>
        <button className="next" onClick={() => step(1)} aria-label="Next project"><Arrow /></button>
      </div>
    </>
  )
}
