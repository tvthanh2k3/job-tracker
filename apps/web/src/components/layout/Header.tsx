import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { ViewMode } from '@/types/view'
import Icon from '@/components/Icon'
import { useAuthStore } from '@/stores/authStore'

interface HeaderProps {
  search: string
  setSearch: (value: string) => void
  view: ViewMode
  setView: (view: ViewMode) => void
  onQuickAdd: () => void
}

const VIEW_OPTIONS: { id: ViewMode; icon: Parameters<typeof Icon>[0]['name']; label: string }[] = [
  { id: 'kanban', icon: 'grid',  label: 'Bảng' },
  { id: 'table',  icon: 'table', label: 'Bảng dữ liệu' },
  { id: 'list',   icon: 'list',  label: 'Danh sách' },
]

function AvatarImg({ avatarUrl, size = 'md' }: { avatarUrl?: string | null; size?: 'sm' | 'md' }) {
  const dim = size === 'sm' ? 'w-8 h-8' : 'w-9 h-9'
  return (
    <img
      src={avatarUrl ?? '/avatar-default.svg'}
      alt="avatar"
      className={`${dim} rounded-full object-cover flex-shrink-0`}
    />
  )
}

export default function Header({ search, setSearch, view, setView, onQuickAdd }: HeaderProps) {
  const navigate    = useNavigate()
  const { user, clearAuth } = useAuthStore()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const handleLogout = () => {
    clearAuth()
    navigate('/login')
  }

  return (
    <header className="px-7 py-4 border-b border-stone-200/70 bg-white flex items-center gap-4">
      <div>
        <div className="text-[12px] text-stone-500 mb-0.5">Workspace · Săn việc 2026</div>
        <h1 className="text-[22px] font-bold tracking-tight text-stone-900 leading-none">
          Đơn ứng tuyển của tôi
        </h1>
      </div>

      <div className="flex-1 flex items-center justify-end gap-3">
        {/* Search */}
        <div className="relative">
          <Icon name="search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm công ty, vị trí hoặc ghi chú…"
            className="w-[300px] pl-9 pr-3 py-2 rounded-lg bg-white border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300/50 focus:border-stone-300 transition"
          />
        </div>

        {/* View switcher */}
        <div className="inline-flex bg-white border border-stone-200 rounded-lg p-0.5">
          {VIEW_OPTIONS.map((v) => (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] font-medium transition ${
                view === v.id ? 'bg-stone-900 text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Icon name={v.icon} size={13} />
              {v.label}
            </button>
          ))}
        </div>

        {/* Filter */}
        <button className="w-9 h-9 rounded-lg bg-white border border-stone-200 hover:border-stone-300 flex items-center justify-center text-stone-600 transition">
          <Icon name="filter" size={15} />
        </button>

        {/* Notification */}
        <button className="w-9 h-9 rounded-lg bg-white border border-stone-200 hover:border-stone-300 flex items-center justify-center text-stone-600 transition relative">
          <Icon name="bell" size={15} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary" />
        </button>

        {/* Quick add */}
        <button
          onClick={onQuickAdd}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-white text-[13px] font-semibold shadow-sm transition hover:opacity-90 bg-primary"
          style={{ boxShadow: '0 1px 2px color-mix(in srgb, var(--color-primary) 35%, transparent)' }}
        >
          <Icon name="plus" size={14} />
          Thêm đơn ứng tuyển
        </button>

        {/* Avatar + Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-9 h-9 rounded-full overflow-hidden border border-stone-300 hover:border-stone-400 flex items-center justify-center flex-shrink-0 transition"
          >
            <img
              src={user?.avatarUrl ?? '/avatar-default.svg'}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </button>

          {open && (
            <div className="absolute top-full right-0 mt-2 w-[224px] bg-white border border-stone-200/80 rounded-xl shadow-xl shadow-stone-900/10 py-1.5 z-50">
              {/* User info header */}
              <div className="px-3.5 py-3 flex items-center gap-3 border-b border-stone-100">
                <AvatarImg avatarUrl={user?.avatarUrl} size="sm" />
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-stone-900 truncate leading-tight">
                    {user?.fullName ?? '—'}
                  </div>
                  <div className="text-[11px] text-stone-500 truncate mt-0.5">
                    {user?.email ?? '—'}
                  </div>
                </div>
              </div>

              {/* Menu items */}
              <div className="px-1.5 pt-1.5 pb-1">
                <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] text-stone-700 hover:bg-stone-100 transition text-left">
                  <Icon name="user" size={14} className="text-stone-400 flex-shrink-0" />
                  Hồ sơ cá nhân
                </button>
                <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] text-stone-700 hover:bg-stone-100 transition text-left">
                  <Icon name="settings" size={14} className="text-stone-400 flex-shrink-0" />
                  Cài đặt
                </button>
              </div>

              <div className="h-px bg-stone-100 mx-2" />

              <div className="px-1.5 pt-1 pb-1.5">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] text-red-600 hover:bg-red-50 transition text-left"
                >
                  <Icon name="logout" size={14} className="text-red-400 flex-shrink-0" />
                  Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
