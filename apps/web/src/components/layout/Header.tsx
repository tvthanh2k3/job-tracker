import type { ViewMode } from '@/types/view';
import Icon from '@/components/Icon';

interface HeaderProps {
  search: string;
  setSearch: (value: string) => void;
  view: ViewMode;
  setView: (view: ViewMode) => void;
  onQuickAdd: () => void;
}

const VIEW_OPTIONS: { id: ViewMode; icon: Parameters<typeof Icon>[0]['name']; label: string }[] = [
  { id: 'kanban', icon: 'grid',  label: 'Bảng' },
  { id: 'table',  icon: 'table', label: 'Bảng dữ liệu' },
  { id: 'list',   icon: 'list',  label: 'Danh sách' },
];

export default function Header({ search, setSearch, view, setView, onQuickAdd }: HeaderProps) {
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
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full" style={{ background: '#3B82F6' }} />
        </button>

        {/* Quick add */}
        <button
          onClick={onQuickAdd}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-white text-[13px] font-semibold shadow-sm transition hover:opacity-90"
          style={{ background: '#3B82F6', boxShadow: '0 1px 2px rgba(59,130,246,0.35)' }}
        >
          <Icon name="plus" size={14} />
          Thêm đơn ứng tuyển
        </button>

        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-white text-[13px]"
          style={{ background: 'linear-gradient(135deg,#3B82F6,#2563EB)' }}
        >
          MK
        </div>
      </div>
    </header>
  );
}
