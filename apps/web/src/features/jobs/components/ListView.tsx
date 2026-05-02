import type { Job } from '@/types/job';
import { daysAgo } from '@/utils/date';
import CompanyLogo from '@/components/CompanyLogo';
import StagePill from '@/components/StagePill';
import PriorityFlag from '@/components/PriorityFlag';

interface ListViewProps {
  jobs: Job[];
  onCardClick: (job: Job) => void;
}

export default function ListView({ jobs, onCardClick }: ListViewProps) {
  return (
    <div className="flex-1 overflow-auto px-7 py-5 space-y-2">
      {jobs.map((j) => (
        <div
          key={j.id}
          onClick={() => onCardClick(j)}
          className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white border border-stone-200/70 hover:border-stone-300 hover:shadow-sm cursor-pointer transition"
        >
          <CompanyLogo company={j.company} size={40} />
          <div className="w-[200px] flex-shrink-0">
            <div className="text-[13px] font-semibold text-stone-900 flex items-center gap-1.5">
              {j.company}<PriorityFlag priority={j.priority} />
            </div>
            <div className="text-[11px] text-stone-500">{j.location}</div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] text-stone-900 font-medium truncate">{j.title}</div>
            {j.note && <div className="text-[11px] text-stone-500 truncate italic">{j.note}</div>}
          </div>
          <div className="text-[12px] text-stone-500 w-[110px] flex-shrink-0">{j.salary ?? '—'}</div>
          <div className="text-[11px] text-stone-400 w-[80px] flex-shrink-0">
            {j.appliedAt ? daysAgo(j.appliedAt) : '—'}
          </div>
          <StagePill stageId={j.stage} />
        </div>
      ))}
    </div>
  );
}
