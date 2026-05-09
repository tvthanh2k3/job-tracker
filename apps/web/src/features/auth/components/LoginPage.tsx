import { useState, useEffect, useRef } from 'react'
import Carousel from './Carousel'
import AuthForm from './AuthForm'
import { SLIDES } from './slides'

const AUTOPLAY_INTERVAL = 4000

export default function LoginPage() {
  const [active, setActive] = useState(0)
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = setInterval(
      () => setActive((a) => (a + 1) % SLIDES.length),
      AUTOPLAY_INTERVAL,
    )
    return () => clearInterval(id)
  }, [])

  return (
    <div className="auth-root">
      {/* Page background blobs */}
      <div className="auth-page-blobs" aria-hidden="true">
        <svg width="60" height="60" style={{ left: '6%',  top: '14%' }}><ellipse cx="30" cy="30" rx="22" ry="14" transform="rotate(-30 30 30)" fill="#F4A361" /></svg>
        <svg width="40" height="40" style={{ left: '12%', top: '60%' }}><circle cx="20" cy="20" r="12" fill="#E94F64" /></svg>
        <svg width="22" height="22" style={{ left: '3%',  top: '88%' }}><circle cx="11" cy="11" r="7"  fill="#F2C94C" /></svg>
        <svg width="22" height="22" style={{ left: '38%', top: '6%'  }}><circle cx="11" cy="11" r="7"  fill="#F2C94C" /></svg>
        <svg width="60" height="60" style={{ right: '6%', top: '8%'  }}><ellipse cx="30" cy="30" rx="24" ry="13" transform="rotate(40 30 30)" fill="#E94F64" /></svg>
        <svg width="22" height="22" style={{ right: '14%',top: '30%' }}><circle cx="11" cy="11" r="7"  fill="#3FA8F4" /></svg>
        <svg width="22" height="22" style={{ right: '3%', top: '60%' }}><circle cx="11" cy="11" r="7"  fill="#F2C94C" /></svg>
        <svg width="40" height="40" style={{ right: '8%', bottom: '6%' }}><ellipse cx="20" cy="20" rx="16" ry="9" transform="rotate(20 20 20)" fill="#5DC983" /></svg>
        <svg width="22" height="22" style={{ left: '48%', bottom: '4%' }}><circle cx="11" cy="11" r="7" fill="#3FA8F4" /></svg>
        <svg width="220" height="220" style={{ left: -40, top: '24%', opacity: 0.5 }}><ellipse cx="110" cy="110" rx="100" ry="60" transform="rotate(-20 110 110)" fill="#C7D7F8" /></svg>
        <svg width="180" height="180" style={{ right: -30, bottom: '18%', opacity: 0.5 }}><ellipse cx="90" cy="90" rx="80" ry="50" transform="rotate(30 90 90)" fill="#C7D7F8" /></svg>
      </div>

      <div className="auth-frame" ref={frameRef} style={{ '--auth-brand': '#2A53D9' } as React.CSSProperties}>
        <Carousel active={active} onSelect={setActive} />
        <AuthForm frameRef={frameRef} />
      </div>
    </div>
  )
}
