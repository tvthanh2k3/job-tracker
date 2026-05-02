import { STAGE_BY_ID } from '@/types/stage';
import type { StageId } from '@/types/job';

const toneMap: Record<string, string> = {
  neutral: 'bg-stone-100 text-stone-600',
  blue:    'bg-blue-50 text-blue-700',
  purple:  'bg-violet-50 text-violet-700',
  yellow:  'bg-amber-50 text-amber-700',
  green:   'bg-emerald-50 text-emerald-700',
  red:     'bg-red-50 text-red-700',
  gray:    'bg-stone-100 text-stone-500',
};

interface StagePillProps {
  stageId: StageId;
  count?: number;
}

export default function StagePill({ stageId, count }: StagePillProps) {
  const stage = STAGE_BY_ID[stageId];
  return (
    <div className="flex items-center gap-2">
      <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider ${toneMap[stage.tone]}`}>
        {stage.label}
      </span>
      {count !== undefined && (
        <span className="text-stone-500 text-sm font-medium">{count}</span>
      )}
    </div>
  );
}
