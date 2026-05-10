const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const TODAY_IDX = 3
const EVENT_DAYS = [10, 12, 14, 17, 18]

function InterviewRow({ color, bg, company, role, time, when }: {
  color: string; bg: string
  company: string; role: string; time: string; when: string
}) {
  const [dayLabel, dayNum] = when.split(' ')
  return (
    <div style={{
      background: '#fff', borderRadius: 10, padding: '8px 10px',
      boxShadow: '0 12px 22px -10px rgba(0,0,0,0.16)',
      display: 'flex', alignItems: 'center', gap: 10, color: '#1A2238',
    }}>
      <div style={{
        width: 34, height: 34, borderRadius: 8, background: bg, color,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', lineHeight: 1,
      }}>
        <span style={{ fontSize: 7, fontWeight: 700, opacity: 0.7 }}>{dayLabel}</span>
        <span style={{ fontSize: 13, fontWeight: 900 }}>{dayNum}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 700, lineHeight: 1.2 }}>{company} — {role}</div>
        <div style={{ fontSize: 8.5, color: '#8A93A6', fontWeight: 500, marginTop: 2, display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: 999, background: '#10B981' }} />
          {time}
        </div>
      </div>
      <span style={{ fontSize: 14 }}>📹</span>
    </div>
  )
}

export default function SlideTwo() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Mini calendar */}
      <div style={{
        position: 'absolute', left: '6%', top: '8%',
        width: '42%', background: '#fff', borderRadius: 14, padding: 12,
        boxShadow: '0 22px 36px -12px rgba(0,0,0,0.22)', color: '#1A2238',
        transform: 'rotate(-3deg)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700 }}>March 2026</div>
          <div style={{ display: 'flex', gap: 4 }}>
            {['‹', '›'].map((c) => (
              <span key={c} style={{ width: 18, height: 18, borderRadius: 6, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#8A93A6' }}>{c}</span>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3 }}>
          {DAYS.map((d, i) => (
            <div key={`h${i}`} style={{ fontSize: 7, fontWeight: 700, color: '#B5BCCC', textAlign: 'center', padding: '2px 0' }}>{d}</div>
          ))}
          {Array.from({ length: 21 }).map((_, i) => {
            const isToday = i === TODAY_IDX
            const hasEvent = EVENT_DAYS.includes(i)
            return (
              <div key={i} style={{
                aspectRatio: '1/1', borderRadius: 6,
                background: isToday ? 'var(--color-primary)' : 'transparent',
                color: isToday ? '#fff' : '#1A2238',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 8.5, fontWeight: isToday ? 700 : 500,
                position: 'relative',
              }}>
                {i + 1}
                {hasEvent && !isToday && (
                  <span style={{ position: 'absolute', bottom: 2, width: 3, height: 3, borderRadius: 999, background: '#F59E0B' }} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Upcoming list */}
      <div style={{
        position: 'absolute', right: '4%', top: '18%',
        width: '56%', display: 'flex', flexDirection: 'column', gap: 8,
        transform: 'rotate(3deg)',
      }}>
        <InterviewRow color="#A259FF" bg="#F5EDFF" company="Figma"  role="Design Eng" time="Today, 2:00 PM"  when="MAR 14" />
        <InterviewRow color="#1A1A1A" bg="#F1F1EF" company="Notion" role="Full-stack" time="Tomorrow, 10:30" when="MAR 15" />
        <InterviewRow color="#635BFF" bg="#EEEDFF" company="Stripe" role="Frontend"   time="Thu, 4:00 PM"   when="MAR 18" />
      </div>

      {/* Reminder pill */}
      <div style={{
        position: 'absolute', left: '4%', bottom: '10%',
        background: '#fff', borderRadius: 999, padding: '6px 12px',
        boxShadow: '0 14px 26px -10px rgba(0,0,0,0.2)',
        display: 'flex', alignItems: 'center', gap: 8,
        transform: 'rotate(-3deg)', color: '#1A2238',
      }}>
        <span style={{ fontSize: 14 }}>🔔</span>
        <span style={{ fontSize: 9, fontWeight: 700 }}>Reminder · 15 min before</span>
      </div>
    </div>
  )
}
