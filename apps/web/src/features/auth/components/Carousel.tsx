import { SLIDES } from './slides/data'
import { Squiggle } from './slides'

const SPRINKLES = [
  { color: '#F4A361', style: { left: '14%',  top: '12%' } },
  { color: '#E94F64', style: { left: '18%',  top: '52%' } },
  { color: '#5DC983', style: { right: '18%', top: '18%' } },
  { color: '#A78BFA', style: { right: '24%', top: '56%' } },
  { color: '#F2C94C', style: { left: '48%',  top: '8%'  } },
  { color: '#F2C94C', style: { right: '10%', top: '40%' } },
]

interface CarouselProps {
  active: number
  onSelect: (i: number) => void
}

export default function Carousel({ active, onSelect }: CarouselProps) {
  return (
    <div className="auth-panel-left">
      {/* Faint background blobs */}
      <div className="auth-bg-blobs" aria-hidden="true">
        <svg width="160" height="160" style={{ left: -30, top: 30 }}>
          <ellipse cx="80" cy="80" rx="68" ry="40" fill="#fff" transform="rotate(-20 80 80)" />
        </svg>
        <svg width="200" height="200" style={{ right: -50, bottom: -30 }}>
          <ellipse cx="100" cy="100" rx="86" ry="50" fill="#fff" transform="rotate(30 100 100)" />
        </svg>
        <svg width="80" height="80" style={{ right: 40, top: 60 }}>
          <ellipse cx="40" cy="40" rx="30" ry="18" fill="#fff" transform="rotate(40 40 40)" />
        </svg>
      </div>

      {/* Colour sprinkles */}
      {SPRINKLES.map((s, i) => (
        <svg key={i} width="14" height="14" style={{ position: 'absolute', ...s.style }} aria-hidden="true">
          <circle cx="7" cy="7" r="6" fill={s.color} />
        </svg>
      ))}

      {/* Slide stage */}
      <div className="auth-stage">
        <div className="auth-stage-inner">
          {SLIDES.map((s, i) => {
            const cls = i === active ? 'is-active' : i < active ? 'is-prev' : 'is-next'
            return (
              <div key={s.id} className={`auth-slide ${cls}`}>
                <s.Component />
              </div>
            )
          })}
        </div>
      </div>

      {/* Caption */}
      <div style={{ position: 'relative', paddingBottom: 4 }}>
        <Squiggle />
        <div className="auth-caption">
          {SLIDES.map((s, i) => (
            <div
              key={s.id}
              className={`auth-slide ${i === active ? 'is-active' : i < active ? 'is-prev' : 'is-next'}`}
              style={{ position: i === active ? 'static' : 'absolute', inset: 0, padding: '0 48px' }}
            >
              <h2>
                {s.title.split('\n').map((line, j) => <span key={j}>{line}<br /></span>)}
              </h2>
              <p>
                {s.sub.split('\n').map((line, j) => <span key={j}>{line}<br /></span>)}
              </p>
            </div>
          ))}

          <div className="auth-dots">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                className={`auth-dot ${i === active ? 'active' : ''}`}
                onClick={() => onSelect(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
