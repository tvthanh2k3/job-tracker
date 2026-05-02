import type { Job } from '@/types/job';
import { STAGE_BY_ID } from '@/types/stage';
import { fmtDate, daysAgo } from '@/utils/date';
import CompanyLogo from '@/components/CompanyLogo';
import PriorityFlag from '@/components/PriorityFlag';
import Icon from '@/components/Icon';

interface JobCardProps {
  job: Job;
  onClick: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  isDragging: boolean;
}

const toneBorder: Record<string, string> = {
  neutral: 'border-l-stone-300',
  blue:    'border-l-blue-400',
  purple:  'border-l-violet-400',
  yellow:  'border-l-amber-400',
  green:   'border-l-emerald-400',
  red:     'border-l-red-400',
  gray:    'border-l-stone-300',
};

export default function JobCard({ job, onClick, onDragStart, onDragEnd, isDragging }: JobCardProps) {
  const stage        = STAGE_BY_ID[job.stage];
  const lastInterview = job.interviews.slice(-1)[0];
  const upcomingInt   = job.interviews.find((i) => i.status === 'upcoming');

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className={`group cursor-pointer rounded-xl bg-white border border-stone-200/80 border-l-[3px] ${toneBorder[stage.tone]} p-4 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:border-stone-300 transition-all ${isDragging ? 'opacity-40 rotate-1' : ''}`}
      style={{ transition: 'transform 200ms, box-shadow 200ms, opacity 150ms' }}
    >
      <div className="flex items-start gap-2.5 mb-3">
        <CompanyLogo company={job.company} size={36} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[13px] font-semibold text-stone-900 truncate">{job.company}</span>
            <PriorityFlag priority={job.priority} />
          </div>
          <div className="text-[12px] text-stone-500 truncate">{job.location}</div>
        </div>
        <button
          onClick={(e) => e.stopPropagation()}
          className="text-stone-400 opacity-0 group-hover:opacity-100 hover:text-stone-700 transition -mr-1 -mt-1 p-1"
        >
          <Icon name="dot3" size={14} />
        </button>
      </div>

      <div className="text-[14px] font-semibold text-stone-900 leading-snug mb-2.5">{job.title}</div>

      <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] text-stone-500 mb-3">
        {job.salary && (
          <span className="inline-flex items-center gap-1"><Icon name="cash" size={11} />{job.salary}</span>
        )}
        {job.appliedAt && (
          <span className="inline-flex items-center gap-1"><Icon name="cal" size={11} />{daysAgo(job.appliedAt)}</span>
        )}
      </div>

      {upcomingInt ? (
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-amber-50/70 border border-amber-100 text-[11px]">
          <Icon name="clock" size={11} className="text-amber-700" />
          <span className="text-amber-900 font-medium truncate">{upcomingInt.round}</span>
          <span className="text-amber-700/70 ml-auto flex-shrink-0">{fmtDate(upcomingInt.date)}</span>
        </div>
      ) : lastInterview ? (
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-stone-50 border border-stone-100 text-[11px]">
          <Icon
            name={lastInterview.status === 'failed' ? 'x' : 'check'}
            size={11}
            className={lastInterview.status === 'failed' ? 'text-red-500' : 'text-emerald-600'}
          />
          <span className="text-stone-700 font-medium truncate">{lastInterview.round}</span>
          <span className="text-stone-400 ml-auto flex-shrink-0">{fmtDate(lastInterview.date)}</span>
        </div>
      ) : job.note ? (
        <div className="text-[11px] text-stone-500 leading-relaxed line-clamp-2 italic">"{job.note}"</div>
      ) : null}
    </div>
  );
}
