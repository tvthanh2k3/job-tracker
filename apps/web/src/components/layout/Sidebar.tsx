import { useNavigate } from 'react-router-dom';
import type { Job } from '@/types/job';
import Icon from '@/components/Icon';

interface SidebarProps {
  jobs: Job[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export default function Sidebar({ jobs, activeFilter, setActiveFilter }: SidebarProps) {
  const navigate = useNavigate();
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
      <div className="px-5 pt-5 pb-4">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary">
            <Icon name="briefcase" size={16} className="text-white" />
          </div>
          <span className="text-[19px] font-bold tracking-tight text-stone-900">Job Tracker</span>
        </button>
      </div>

      {/* Workspace */}
      <div className="mx-3 mb-4 px-3 py-2.5 rounded-xl bg-white border border-stone-200/70 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: '#EEF2FF', color: '#1E3A8A' }}>
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
          {navItem('archive', 'archive', 'Lưu trữ',     jobs.filter((j) => ['rejected', 'ghosted'].includes(j.stage)).length)}
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

    </aside>
  );
}
