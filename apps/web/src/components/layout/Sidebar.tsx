import { STAGES } from '@/types/stage';
import type { Job } from '@/types/job';
import Icon from '@/components/Icon';

interface SidebarProps {
  jobs: Job[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export default function Sidebar({ jobs, activeFilter, setActiveFilter }: SidebarProps) {
  const counts = STAGES.reduce<Record<string, number>>((acc, s) => {
    acc[s.id] = jobs.filter((j) => j.stage === s.id).length;
    return acc;
  }, {});

  const total = jobs.length;
  const activeNotRej = jobs.filter(
    (j) => !['rejected', 'ghosted', 'offer'].includes(j.stage),
  ).length;

  const navItem = (id: string, icon: Parameters<typeof Icon>[0]['name'], label: string, count?: number) => {
    const active = activeFilter === id;
    return (
      <button
        key={id}
        onClick={() => setActiveFilter(id)}
        className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
          active ? 'bg-stone-900 text-white' : 'text-stone-700 hover:bg-stone-100'
        }`}
      >
        <span className="flex items-center gap-3">
          <Icon name={icon} size={16} className={active ? 'text-white' : 'text-stone-500'} />
          <span className="font-medium">{label}</span>
        </span>
        {count !== undefined && (
          <span className={`text-xs font-medium ${active ? 'text-stone-300' : 'text-stone-400'}`}>
            {count}
          </span>
        )}
      </button>
    );
  };

  return (
    <aside className="w-[260px] flex-shrink-0 border-r border-stone-200/70 flex flex-col bg-white">
      {/* Logo */}
      <div className="px-5 pt-5 pb-4 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#3B82F6' }}>
          <Icon name="briefcase" size={16} className="text-white" />
        </div>
        <div className="flex items-baseline">
          <span className="text-[19px] font-bold tracking-tight text-stone-900">Trackr</span>
          <span className="text-[19px] font-bold" style={{ color: '#3B82F6' }}>.</span>
        </div>
      </div>

      {/* Workspace */}
      <div className="mx-3 mb-4 px-3 py-2.5 rounded-xl bg-white border border-stone-200/70 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: '#EFF6FF', color: '#1E40AF' }}>
          <Icon name="user" size={14} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-semibold text-stone-900 leading-tight">Săn việc 2026</div>
          <div className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
            <span className="w-1 h-1 rounded-full bg-stone-400" />Cá nhân
          </div>
        </div>
        <Icon name="chevR" size={14} className="text-stone-400" />
      </div>

      {/* Nav */}
      <nav className="px-3 flex-1 overflow-y-auto">
        <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider px-3 mb-2">Tổng quan</div>
        <div className="space-y-0.5 mb-5">
          {navItem('all',     'inbox',   'Tất cả đơn',  total)}
          {navItem('active',  'flag',    'Đang xử lý',  activeNotRej)}
          {navItem('starred', 'star',    'Việc mơ ước', jobs.filter((j) => j.priority === 'dream').length)}
          {navItem('archive', 'archive', 'Lưu trữ',     jobs.filter((j) => ['rejected', 'ghosted'].includes(j.stage)).length)}
        </div>

        <div className="flex items-center justify-between px-3 mb-2">
          <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Theo giai đoạn</span>
        </div>
        <div className="space-y-0.5 mb-5">
          {STAGES.map((s) => {
            const active = activeFilter === `stage:${s.id}`;
            return (
              <button
                key={s.id}
                onClick={() => setActiveFilter(`stage:${s.id}`)}
                className={`w-full flex items-center justify-between gap-3 px-3 py-1.5 rounded-md text-[13px] transition-colors ${
                  active ? 'bg-stone-100 text-stone-900' : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: s.dot }} />
                  <span>{s.label}</span>
                </span>
                <span className="text-stone-400 text-xs">{counts[s.id] ?? 0}</span>
              </button>
            );
          })}
        </div>

        <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider px-3 mb-2">Công cụ</div>
        <div className="space-y-0.5 mb-5">
          <div className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-stone-700 hover:bg-stone-100 cursor-pointer">
            <Icon name="cal" size={16} className="text-stone-500" />
            <span className="font-medium">Lịch</span>
            <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-stone-200 text-stone-500 font-semibold">SẮP CÓ</span>
          </div>
          <div className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-stone-700 hover:bg-stone-100 cursor-pointer">
            <Icon name="chart" size={16} className="text-stone-500" />
            <span className="font-medium">Thống kê</span>
          </div>
          <div className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-stone-700 hover:bg-stone-100 cursor-pointer">
            <Icon name="settings" size={16} className="text-stone-500" />
            <span className="font-medium">Cài đặt</span>
          </div>
        </div>
      </nav>

      {/* Tip */}
      <div className="m-3 p-3 rounded-xl border border-stone-200/70 bg-white">
        <div className="text-[12px] text-stone-700 font-semibold mb-1">Mẹo nhỏ</div>
        <div className="text-[11px] text-stone-500 leading-relaxed">
          Kéo thẻ sang cột khác để đổi giai đoạn. Bấm vào thẻ để xem chi tiết.
        </div>
      </div>
    </aside>
  );
}
