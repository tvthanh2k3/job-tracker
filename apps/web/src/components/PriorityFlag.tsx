import type { Priority } from '@/types/job';

interface PriorityFlagProps {
  priority?: Priority;
}

export default function PriorityFlag({ priority }: PriorityFlagProps) {
  if (!priority) return null;

  if (priority === 'dream') {
    return (
      <span
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold"
        style={{ background: '#EFF6FF', color: '#1E40AF' }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z"/>
        </svg>
        Mơ ước
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold"
      style={{ background: '#FEE2E2', color: '#B91C1C' }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
      Khẩn
    </span>
  );
}
