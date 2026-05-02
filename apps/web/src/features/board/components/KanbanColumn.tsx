import type { Job } from '@/types/job';
import type { Stage } from '@/types/stage';
import StagePill from '@/components/StagePill';
import Icon from '@/components/Icon';
import JobCard from './JobCard';

interface KanbanColumnProps {
  stage: Stage;
  jobs: Job[];
  onCardClick: (job: Job) => void;
  draggingId: string | null;
  isOver: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDragStart: (jobId: string) => (e: React.DragEvent) => void;
  onDragEnd: () => void;
}

export default function KanbanColumn({
  stage,
  jobs,
  onCardClick,
  draggingId,
  isOver,
  onDragOver,
  onDrop,
  onDragLeave,
  onDragStart,
  onDragEnd,
}: KanbanColumnProps) {
  return (
    <div
      className="w-[300px] flex-shrink-0 flex flex-col"
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragLeave={onDragLeave}
    >
      <div className="flex items-center justify-between px-1 mb-3 sticky top-0">
        <StagePill stageId={stage.id} count={jobs.length} />
        <div className="flex items-center gap-0.5">
          <button className="w-6 h-6 rounded-md hover:bg-stone-200/60 text-stone-500 flex items-center justify-center transition">
            <Icon name="plus" size={13} />
          </button>
          <button className="w-6 h-6 rounded-md hover:bg-stone-200/60 text-stone-500 flex items-center justify-center transition">
            <Icon name="dot3" size={13} />
          </button>
        </div>
      </div>

      <div
        className={`flex-1 rounded-xl space-y-2.5 p-1.5 -m-1.5 overflow-y-auto transition-colors ${
          isOver ? 'bg-stone-200/60 ring-2 ring-stone-300/50 ring-dashed' : ''
        }`}
        style={{ scrollbarWidth: 'thin' }}
      >
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onClick={() => onCardClick(job)}
            onDragStart={onDragStart(job.id)}
            onDragEnd={onDragEnd}
            isDragging={draggingId === job.id}
          />
        ))}
        {jobs.length === 0 && (
          <div className="text-center py-8 text-[12px] text-stone-400 border-2 border-dashed border-stone-200 rounded-xl">
            Thả thẻ vào đây
          </div>
        )}
        <button className="w-full mt-1 py-2 rounded-lg text-[12px] text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition flex items-center justify-center gap-1.5">
          <Icon name="plus" size={12} />Thêm thẻ
        </button>
      </div>
    </div>
  );
}
