import type { Job } from '@/types/job';
import StatCard from './StatCard';

interface StatsBannerProps {
  jobs: Job[];
}

export default function StatsBanner({ jobs }: StatsBannerProps) {
  const total    = jobs.length;
  const applied  = jobs.filter((j) => j.stage !== 'saved').length;
  const phone    = jobs.filter((j) => ['phone', 'interview', 'offer'].includes(j.stage)).length;
  const interview = jobs.filter((j) => ['interview', 'offer'].includes(j.stage)).length;
  const offer    = jobs.filter((j) => j.stage === 'offer').length;

  const responseRate  = applied > 0 ? Math.round((phone     / applied) * 100) : 0;
  const interviewRate = applied > 0 ? Math.round((interview / applied) * 100) : 0;

  return (
    <div className="grid grid-cols-12 gap-4 px-7 py-5 bg-white border-b border-stone-200/70">
      <StatCard
        label="Đơn đang xử lý"
        value={applied}
        sub={`Tổng cộng ${total} đơn đang theo dõi`}
        accent="stone"
      />
      <StatCard
        label="Tỷ lệ phản hồi"
        value={`${responseRate}%`}
        sub={`${phone}/${applied} đơn được phản hồi`}
        accent="violet"
      />
      <StatCard
        label="Tỷ lệ phỏng vấn"
        value={`${interviewRate}%`}
        sub={`${interview} buổi phỏng vấn`}
        accent="amber"
      />
      <StatCard
        label="Số offer"
        value={offer}
        sub={offer ? '1 đang chờ quyết định' : 'Chưa có offer'}
        accent="emerald"
      />
    </div>
  );
}
