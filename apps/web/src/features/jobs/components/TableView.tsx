import type { Job } from '@/types/job';
import { fmtDate } from '@/utils/date';
import CompanyLogo from '@/components/CompanyLogo';
import StagePill from '@/components/StagePill';
import PriorityFlag from '@/components/PriorityFlag';
import Icon from '@/components/Icon';

interface TableViewProps {
  jobs: Job[];
  onCardClick: (job: Job) => void;
}

export default function TableView({ jobs, onCardClick }: TableViewProps) {
  return (
    <div className="flex-1 overflow-auto px-7 py-5">
      <div className="rounded-xl border border-stone-200/70 bg-white overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-stone-500 bg-stone-50/60">
              <th className="px-4 py-3">Công ty</th>
              <th className="px-4 py-3">Vị trí</th>
              <th className="px-4 py-3">Giai đoạn</th>
              <th className="px-4 py-3">Địa điểm</th>
              <th className="px-4 py-3">Lương</th>
              <th className="px-4 py-3">Ngày ứng tuyển</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {jobs.map((j) => (
              <tr
                key={j.id}
                onClick={() => onCardClick(j)}
                className="border-t border-stone-100 hover:bg-stone-50/60 cursor-pointer"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <CompanyLogo company={j.company} size={28} />
                    <span className="font-semibold text-stone-900">{j.company}</span>
                    <PriorityFlag priority={j.priority} />
                  </div>
                </td>
                <td className="px-4 py-3 text-stone-800">{j.title}</td>
                <td className="px-4 py-3"><StagePill stageId={j.stage} /></td>
                <td className="px-4 py-3 text-stone-600">{j.location}</td>
                <td className="px-4 py-3 text-stone-600">{j.salary ?? '—'}</td>
                <td className="px-4 py-3 text-stone-500">{j.appliedAt ? fmtDate(j.appliedAt) : '—'}</td>
                <td className="px-4 py-3 text-right text-stone-400">
                  <Icon name="chevR" size={14} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
