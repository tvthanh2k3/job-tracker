import { useEffect, useState, useCallback } from 'react'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import { cn } from '@/utils'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

// ------- Global toast store (lightweight, no extra deps) -------
type ToastListener = (toasts: Toast[]) => void
const listeners = new Set<ToastListener>()
let toasts: Toast[] = []

function notify(listeners: Set<ToastListener>, next: Toast[]) {
  toasts = next
  listeners.forEach((l) => l(next))
}

export const toast = {
  success: (title: string, message?: string) =>
    add({ type: 'success', title, message }),
  error: (title: string, message?: string) =>
    add({ type: 'error', title, message }),
  warning: (title: string, message?: string) =>
    add({ type: 'warning', title, message }),
  info: (title: string, message?: string) =>
    add({ type: 'info', title, message }),
}

function add(t: Omit<Toast, 'id'>) {
  const id = Math.random().toString(36).slice(2)
  notify(listeners, [...toasts, { id, duration: 4000, ...t }])
}

export function removeToast(id: string) {
  notify(listeners, toasts.filter((t) => t.id !== id))
}

// ------- Icon & styles -------
const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="h-5 w-5 text-emerald-500" />,
  error: <XCircle className="h-5 w-5 text-red-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
}

// ------- Single Toast item -------
function ToastItem({ toast: t }: { toast: Toast }) {
  useEffect(() => {
    const timer = setTimeout(() => removeToast(t.id), t.duration ?? 4000)
    return () => clearTimeout(timer)
  }, [t.id, t.duration])

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-lg',
        'w-80 animate-in slide-in-from-right-5 fade-in duration-300'
      )}
    >
      <span className="mt-0.5 shrink-0">{icons[t.type]}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">{t.title}</p>
        {t.message && (
          <p className="mt-0.5 text-xs text-muted-foreground">{t.message}</p>
        )}
      </div>
      <button
        onClick={() => removeToast(t.id)}
        className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

// ------- Toast container (mount once in AppLayout) -------
export function Toaster() {
  const [items, setItems] = useState<Toast[]>([])

  const update = useCallback((next: Toast[]) => setItems([...next]), [])

  useEffect(() => {
    listeners.add(update)
    return () => { listeners.delete(update) }
  }, [update])

  if (!items.length) return null

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {items.map((t) => (
        <ToastItem key={t.id} toast={t} />
      ))}
    </div>
  )
}
