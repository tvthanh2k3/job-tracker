const BRAND = '#2A53D9'

function CompanyLogo({ name, color, bg }: { name: string; color: string; bg: string }) {
  return (
    <div style={{
      width: 28, height: 28, borderRadius: 8, background: bg, color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11, fontWeight: 900, letterSpacing: '-0.02em', flexShrink: 0,
    }}>
      {name}
    </div>
  )
}

function Col({ title, color, children, style }: {
  title: string; color: string; children: React.ReactNode; style?: React.CSSProperties
}) {
  return (
    <div style={{
      flex: 1, background: '#fff', borderRadius: 12, padding: '10px 8px',
      boxShadow: '0 14px 28px -12px rgba(0,0,0,0.18)',
      display: 'flex', flexDirection: 'column', gap: 6, color: '#1A2238',
      ...style,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
        <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.08em', color, textTransform: 'uppercase' }}>
          {title}
        </span>
        <span style={{ fontSize: 8, fontWeight: 700, color: '#B5BCCC' }}>
          {Array.isArray(children) ? children.length : 1}
        </span>
      </div>
      {children}
    </div>
  )
}

function Card({ company, role, mono, color, bg, accent }: {
  company: string; role: string; mono: string; color: string; bg: string; accent: string
}) {
  return (
    <div style={{
      background: '#F8FAFC', borderRadius: 8, padding: '7px 8px',
      borderLeft: `3px solid ${accent}`,
      display: 'flex', flexDirection: 'column', gap: 4,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <CompanyLogo name={mono} color={color} bg={bg} />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 9, fontWeight: 700, lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {role}
          </div>
          <div style={{ fontSize: 7.5, color: '#8A93A6', fontWeight: 500 }}>{company}</div>
        </div>
      </div>
    </div>
  )
}

export default function SlideOne() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', padding: '24px' }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', height: '100%' }}>
        <Col title="Applied" color="#3FA8F4" style={{ transform: 'rotate(-2deg)' }}>
          <Card company="Stripe"  role="Senior Frontend"  mono="S" color="#635BFF" bg="#EEEDFF" accent="#3FA8F4" />
          <Card company="Linear"  role="Product Engineer" mono="L" color="#5E6AD2" bg="#EEF0FF" accent="#3FA8F4" />
          <Card company="Vercel"  role="Platform SWE"     mono="▲" color="#0F172A" bg="#F1F5F9" accent="#3FA8F4" />
        </Col>
        <Col title="Interview" color="#F59E0B" style={{ transform: 'translateY(-12px)' }}>
          <Card company="Figma"  role="Design Engineer" mono="F" color="#A259FF" bg="#F5EDFF" accent="#F59E0B" />
          <Card company="Notion" role="Full-stack SWE"   mono="N" color="#1A1A1A" bg="#F1F1EF" accent="#F59E0B" />
        </Col>
        <Col title="Offer" color="#10B981" style={{ transform: 'rotate(2deg) translateY(6px)' }}>
          <Card company="Airbnb" role="Sr. Frontend" mono="A" color="#FF385C" bg="#FFE9EE" accent="#10B981" />
          <div style={{
            background: '#ECFDF5', borderRadius: 8, padding: '7px 8px',
            display: 'flex', alignItems: 'center', gap: 6, color: '#065F46',
          }}>
            <span style={{ fontSize: 11 }}>🎉</span>
            <div>
              <div style={{ fontSize: 9, fontWeight: 700 }}>$165k base</div>
              <div style={{ fontSize: 7.5, fontWeight: 600, opacity: 0.75 }}>Decision by Fri</div>
            </div>
          </div>
        </Col>
      </div>

      <div style={{
        position: 'absolute', left: '40%', top: '-6px',
        background: '#fff', borderRadius: 999, padding: '5px 10px',
        boxShadow: '0 12px 22px -10px rgba(0,0,0,0.22)',
        display: 'flex', alignItems: 'center', gap: 6,
        transform: 'rotate(-4deg)', color: '#1A2238',
      }}>
        <span style={{
          width: 14, height: 14, borderRadius: 999, background: '#10B981',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 8, fontWeight: 900,
        }}>✓</span>
        <span style={{ fontSize: 9, fontWeight: 700 }}>Drag to update status</span>
      </div>
    </div>
  )
}

export { BRAND }
