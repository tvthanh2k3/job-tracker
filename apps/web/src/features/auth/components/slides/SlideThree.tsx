const SKILLS = ['React', 'TypeScript', 'Next.js', 'Node', 'GraphQL']

export default function SlideThree() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Resume document */}
      <div style={{
        position: 'absolute', left: '8%', top: '10%',
        width: '46%', background: '#fff', borderRadius: 14, padding: 14,
        boxShadow: '0 24px 40px -14px rgba(0,0,0,0.25)',
        transform: 'rotate(-4deg)', color: '#1A2238',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 999, background: 'linear-gradient(135deg,#A78BFA,#7C5BD4)' }} />
          <div>
            <div style={{ fontSize: 11, fontWeight: 700 }}>Alex Nguyen</div>
            <div style={{ fontSize: 8, color: '#8A93A6', fontWeight: 500 }}>Senior Frontend Engineer</div>
          </div>
        </div>
        <div style={{ fontSize: 8, fontWeight: 700, color: '#7C5BD4', letterSpacing: '0.08em', marginBottom: 5 }}>EXPERIENCE</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {[92, 80, 68, 85].map((w, i) => (
            <div key={i} style={{
              height: 5, borderRadius: 3,
              background: i === 2 ? '#FDE68A' : '#E2E8F0',
              width: `${w}%`, position: 'relative',
            }}>
              {i === 2 && (
                <span style={{
                  position: 'absolute', right: -4, top: -4,
                  width: 11, height: 11, borderRadius: 999,
                  background: '#F59E0B', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: '#fff', fontSize: 7, fontWeight: 900,
                }}>✦</span>
              )}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 8, fontWeight: 700, color: '#7C5BD4', letterSpacing: '0.08em', margin: '10px 0 5px' }}>SKILLS</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {SKILLS.map((s, i) => (
            <span key={s} style={{
              fontSize: 8, fontWeight: 600, padding: '2px 7px', borderRadius: 999,
              background: i === 1 ? '#EDE9FE' : '#F1F5F9',
              color: i === 1 ? '#7C5BD4' : '#475569',
            }}>{s}</span>
          ))}
        </div>
      </div>

      {/* AI suggestion bubble */}
      <div style={{
        position: 'absolute', right: '14%', top: '8%',
        background: '#fff', borderRadius: 12, padding: '9px 11px',
        boxShadow: '0 16px 28px -10px rgba(124,91,212,0.35)',
        display: 'flex', alignItems: 'center', gap: 8, color: '#1A2238',
        borderLeft: '3px solid #7C5BD4', transform: 'rotate(4deg)',
      }}>
        <span style={{ fontSize: 14 }}>✨</span>
        <div>
          <div style={{ fontSize: 9.5, fontWeight: 700 }}>AI tailored to JD</div>
          <div style={{ fontSize: 8, color: '#8A93A6', fontWeight: 500 }}>+12 keyword matches</div>
        </div>
      </div>

      {/* Match score gauge */}
      <div style={{
        position: 'absolute', right: '8%', top: '34%',
        width: 130, background: '#fff', borderRadius: 14, padding: 12,
        boxShadow: '0 22px 30px -12px rgba(0,0,0,0.22)', color: '#1A2238',
        transform: 'rotate(5deg)',
      }}>
        <div style={{ fontSize: 8.5, fontWeight: 700, color: '#8A93A6', letterSpacing: '0.06em' }}>JD MATCH SCORE</div>
        <div style={{ position: 'relative', width: 90, height: 50, margin: '8px auto 0' }}>
          <svg viewBox="0 0 100 60" width="90" height="50">
            <path d="M10 55 A 40 40 0 0 1 90 55" stroke="#F1F5F9" strokeWidth="9" fill="none" strokeLinecap="round" />
            <path d="M10 55 A 40 40 0 0 1 86 35" stroke="#10B981" strokeWidth="9" fill="none" strokeLinecap="round" />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 2 }}>
            <div style={{ fontSize: 18, fontWeight: 900, lineHeight: 1, color: '#10B981' }}>
              92<span style={{ fontSize: 10 }}>%</span>
            </div>
          </div>
        </div>
        <div style={{ fontSize: 8, color: '#10B981', fontWeight: 700, textAlign: 'center', marginTop: 2 }}>Excellent fit</div>
      </div>

      {/* Cover letter card */}
      <div style={{
        position: 'absolute', left: '18%', bottom: '6%',
        width: '52%', background: '#fff', borderRadius: 12, padding: '10px 12px',
        boxShadow: '0 18px 30px -10px rgba(0,0,0,0.22)', color: '#1A2238',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              width: 18, height: 18, borderRadius: 6,
              background: 'linear-gradient(135deg,#A78BFA,#7C5BD4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 10,
            }}>✦</span>
            <div style={{ fontSize: 10, fontWeight: 700 }}>Cover letter generated</div>
          </div>
          <span style={{ fontSize: 8, color: '#8A93A6', fontWeight: 600 }}>2.3s</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[100, 94, 88, 72].map((w, i) => (
            <div key={i} style={{ height: 4, borderRadius: 2, background: '#E2E8F0', width: `${w}%` }} />
          ))}
        </div>
      </div>
    </div>
  )
}
