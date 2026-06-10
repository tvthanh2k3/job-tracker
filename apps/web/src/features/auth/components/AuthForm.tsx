import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import Icon from '@/components/Icon'
import { useLogin, useRegister } from '../queries/useAuth'
import { useAuthStore } from '@/stores/authStore'

const MIN_SPINNER_MS = 2000

// ── Sub-components ─────────────────────────────────────────────────────────

function TrackrLogo() {
  return (
    <div className="auth-logo">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary"
      >
        <Icon name="briefcase" size={16} className="text-white" />
      </div>
    </div>
  )
}

function Field({
  id, label, type = 'text', value, onChange, icon, onIconClick,
}: {
  id: string
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  icon: React.ReactNode
  onIconClick?: () => void
}) {
  const [focus, setFocus] = useState(false)
  return (
    <label
      className={`auth-field ${focus ? 'is-focus' : ''} ${value ? 'has-value' : ''}`}
      htmlFor={id}
    >
      <span className="auth-float-label">{label}</span>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete="off"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => onChange(e.target.value)}
      />
      <span
        className="auth-field-icon"
        style={onIconClick ? { cursor: 'pointer' } : undefined}
        onClick={onIconClick}
      >
        {icon}
      </span>
    </label>
  )
}

function ConfettiBurst() {
  const pieces = [
    { color: '#F4A361', x:  60, y: -40 },
    { color: '#A78BFA', x:  80, y:  20 },
    { color: '#E94F64', x: -70, y:  10 },
    { color: '#5DC983', x: -50, y:  50 },
    { color: '#F2C94C', x: -20, y: -70 },
    { color: '#3FA8F4', x:  40, y:  70 },
    { color: '#F4A361', x: -90, y: -30 },
    { color: '#A78BFA', x: 100, y: -10 },
  ]
  return (
    <>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="auth-confetti-piece"
          style={{
            background: p.color,
            left: '50%', top: '50%',
            '--burst': `translate(${p.x}px, ${p.y}px)`,
            animationDelay: `${200 + i * 40}ms`,
            width:  i % 2 ? 10 : 14,
            height: i % 2 ? 10 : 14,
            borderRadius: i % 3 ? '999px' : '4px',
          } as React.CSSProperties}
        />
      ))}
    </>
  )
}

// ── Icons ───────────────────────────────────────────────────────────────────

const IconEmail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2c4.5 0 8 3 8 7" />
    <circle cx="12" cy="12" r="4" /><path d="M16 9v5a2 2 0 004 0" />
  </svg>
)


const IconEye = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
)

const IconEyeOff = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)

const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
  </svg>
)

// ── Error mapping ───────────────────────────────────────────────────────────

function resolveApiError(error: unknown, isSignup: boolean): string {
  const status = (error as { response?: { status?: number } }).response?.status
  if (isSignup) {
    if (status === 409) return 'Email này đã được sử dụng'
    if (status === 400) return 'Thông tin đăng ký không hợp lệ'
  } else {
    if (status === 400) return 'Email hoặc mật khẩu không hợp lệ'
    if (status === 401) return 'Email hoặc mật khẩu không đúng'
  }
  return 'Có lỗi xảy ra, vui lòng thử lại'
}

// ── Main component ──────────────────────────────────────────────────────────

type Mode = 'login' | 'signup'
type Phase = 'idle' | 'processing' | 'confirmed'

interface AuthFormProps {
  frameRef: React.RefObject<HTMLDivElement | null>
}

export default function AuthForm({ frameRef }: AuthFormProps) {
  const navigate = useNavigate()
  const setAuth  = useAuthStore((s) => s.setAuth)
  const loginMutation    = useLogin()
  const registerMutation = useRegister()

  const [mode,     setMode]     = useState<Mode>('login')
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [pw,       setPw]       = useState('')
  const [pw2,      setPw2]      = useState('')
  const [remember, setRemember] = useState(false)
  const [agree,    setAgree]    = useState(false)
  const [formErr,  setFormErr]  = useState('')
  const [origin,   setOrigin]   = useState({ cx: '50%', cy: '50%' })
  const [showPw,   setShowPw]   = useState(false)
  const [showPw2,  setShowPw2]  = useState(false)

  const [phase,      setPhase]      = useState<Phase>('idle')
  const [delayReady, setDelayReady] = useState(false)
  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const btnRef = useRef<HTMLButtonElement>(null)
  const mutation = mode === 'login' ? loginMutation : registerMutation

  const isSignup = mode === 'signup'

  // Settle only after both the 2s delay AND the API call have finished
  useEffect(() => {
    if (phase !== 'processing' || !delayReady || mutation.isPending) return
    if (mutation.isSuccess) {
      setPhase('confirmed')
    } else if (mutation.isError) {
      setPhase('idle')
    }
  }, [phase, delayReady, mutation.isPending, mutation.isSuccess, mutation.isError])

  useEffect(() => {
    if (phase !== 'confirmed') return
    const data = mutation.data
    const timer = setTimeout(() => {
      if (data) setAuth(data.token, data.user)
      navigate('/')
    }, 1600)
    return () => clearTimeout(timer)
  }, [phase, navigate, setAuth, mutation.data])

  useEffect(() => {
    return () => { if (delayTimerRef.current) clearTimeout(delayTimerRef.current) }
  }, [])

  const switchTo = (next: Mode) => {
    setMode(next)
    setFormErr('')
    setPhase('idle')
    setDelayReady(false)
    setShowPw(false)
    setShowPw2(false)
    if (delayTimerRef.current) clearTimeout(delayTimerRef.current)
    loginMutation.reset()
    registerMutation.reset()
  }

  const computeOrigin = () => {
    const frame = frameRef.current
    const btn   = btnRef.current
    if (!frame || !btn) return
    const fr = frame.getBoundingClientRect()
    const br = btn.getBoundingClientRect()
    const cx = ((br.left + br.width  / 2) - fr.left) / fr.width  * 100
    const cy = ((br.top  + br.height / 2) - fr.top)  / fr.height * 100
    setOrigin({ cx: `${cx}%`, cy: `${cy}%` })
  }

  const submit = (e: { preventDefault(): void }) => {
    e.preventDefault()
    if (phase !== 'idle') return
    setFormErr('')

    if (isSignup) {
      if (pw && pw2 && pw !== pw2) { setFormErr('Mật khẩu không khớp'); return }
      if (!agree) { setFormErr('Vui lòng đồng ý điều khoản để tiếp tục'); return }
    }

    computeOrigin()
    setDelayReady(false)
    if (delayTimerRef.current) clearTimeout(delayTimerRef.current)
    delayTimerRef.current = setTimeout(() => setDelayReady(true), MIN_SPINNER_MS)

    if (isSignup) {
      registerMutation.mutate({ name, email, password: pw })
    } else {
      loginMutation.mutate({ email, password: pw })
    }

    requestAnimationFrame(() => setPhase('processing'))
  }

  const apiError = phase === 'idle' && mutation.isError
    ? resolveApiError(mutation.error, isSignup)
    : ''

  const overlay = (
    <div
      className={`auth-reveal ${phase !== 'idle' ? 'is-on' : ''}`}
      style={{ '--cx': origin.cx, '--cy': origin.cy } as React.CSSProperties}
    >
      {phase === 'processing' && (
        <div className="auth-reveal-content">
          <div className="auth-spinner" />
          <h3>Đang xử lý…</h3>
        </div>
      )}
      {phase === 'confirmed' && (
        <div className="auth-reveal-content" style={{ position: 'relative' }}>
          <div className="auth-confirm-card">
            <svg width="48" height="48" viewBox="0 0 40 40" fill="none">
              <polyline
                points="9 21 17 29 32 12"
                stroke="#5DC983"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="auth-check-draw"
              />
            </svg>
          </div>
          <h3>Thành công!</h3>
          <ConfettiBurst />
        </div>
      )}
    </div>
  )

  return (
    <div className={`auth-panel-right ${isSignup ? 'is-signup' : ''}`}>
      <TrackrLogo />

      <div className="auth-form-head" key={mode}>
        <h1>{isSignup ? 'Tạo tài khoản' : 'Chào mừng trở lại!'}</h1>
        <p>
          {isSignup
            ? 'Đăng ký để tổ chức hành trình tìm việc của bạn — theo dõi đơn ứng tuyển, lên lịch phỏng vấn và để AI tối ưu CV.'
            : 'Đăng nhập để tiếp tục quản lý quá trình tìm việc — pipeline, lịch phỏng vấn và công cụ AI luôn sẵn sàng.'}
        </p>
      </div>

      <form className="auth-form" onSubmit={submit} key={`${mode}-form`}>
        {isSignup && (
          <Field id="name" label="Họ và tên" value={name} onChange={setName} icon={<IconUser />} />
        )}
        <Field id="email"    label="Email"    type="email"    value={email} onChange={setEmail} icon={<IconEmail />} />
        <Field
          id="password" label="Mật khẩu"
          type={showPw ? 'text' : 'password'}
          value={pw} onChange={setPw}
          icon={showPw ? <IconEyeOff /> : <IconEye />}
          onIconClick={() => setShowPw(v => !v)}
        />
        {isSignup && (
          <Field
            id="password2" label="Xác nhận mật khẩu"
            type={showPw2 ? 'text' : 'password'}
            value={pw2} onChange={setPw2}
            icon={showPw2 ? <IconEyeOff /> : <IconEye />}
            onIconClick={() => setShowPw2(v => !v)}
          />
        )}

        {!isSignup && (
          <div className="auth-row-aux">
            <label className="auth-check">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              <span className="auth-box">
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="2 6.5 5 9.5 10 3.5" />
                </svg>
              </span>
              Ghi nhớ tôi
            </label>
            <a href="#" className="auth-recovery" onClick={(e) => e.preventDefault()}>
              Quên mật khẩu?
            </a>
          </div>
        )}

        {isSignup && (
          <div className="auth-row-aux" style={{ marginTop: 2 }}>
            <label className="auth-check" style={{ alignItems: 'flex-start', lineHeight: 1.45 }}>
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
              <span className="auth-box" style={{ marginTop: 1 }}>
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="2 6.5 5 9.5 10 3.5" />
                </svg>
              </span>
              <span>
                Tôi đồng ý với{' '}
                <a href="#" className="auth-recovery" onClick={(e) => e.preventDefault()}>Điều khoản</a>
                {' '}và{' '}
                <a href="#" className="auth-recovery" onClick={(e) => e.preventDefault()}>Chính sách bảo mật</a>
              </span>
            </label>
          </div>
        )}

        {(formErr || apiError) && (
          <div className="auth-err">{formErr || apiError}</div>
        )}

        <button ref={btnRef} type="submit" className="auth-btn auth-btn-primary">
          {isSignup ? 'Tạo tài khoản' : 'Đăng nhập'}
        </button>
      </form>

      <div className="auth-footer">
        {isSignup ? (
          <>Đã có tài khoản?<a href="#" onClick={(e) => { e.preventDefault(); switchTo('login') }}>Đăng nhập</a></>
        ) : (
          <>Chưa có tài khoản?<a href="#" onClick={(e) => { e.preventDefault(); switchTo('signup') }}>Đăng ký</a></>
        )}
      </div>

      {/* Overlay portaled into auth-frame so it covers both panels */}
      {frameRef.current && createPortal(overlay, frameRef.current)}
    </div>
  )
}
