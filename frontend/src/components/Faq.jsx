import { useState } from 'react'
import { Plus } from './Icons'

export default function Faq({ items }) {
  const [open, setOpen] = useState(null)
  return (
    <div className="faq-list">
      {items.map((f) => {
        const isOpen = open === f.id
        return (
          <div key={f.id} className={`faq-item ${isOpen ? 'open' : ''}`}>
            <h3>
              <button className="faq-q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : f.id)}>
                {f.question}
                <span className="plus"><Plus /></span>
              </button>
            </h3>
            <div className="faq-a" role="region">
              <div><p>{f.answer}</p></div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
