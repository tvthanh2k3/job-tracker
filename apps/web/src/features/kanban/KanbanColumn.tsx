import { useDroppable } from '@dnd-kit/core';
import { KanbanCard } from './KanbanCard';
import type { Job, JobStatus } from '@/types/job.types';

interface KanbanColumnProps {
  status: JobStatus;
  jobs: Job[];
}

export function KanbanColumn({ status, jobs }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: { status },
  });

  return (
    <div className="flex flex-col w-72 shrink-0 bg-muted/40 rounded-xl border border-border h-full max-h-[calc(100vh-140px)]">
      <div className="p-4 flex items-center justify-between border-b border-border/50 bg-background/50 backdrop-blur rounded-t-xl sticky top-0 z-10">
        <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
          {status}
          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium">
            {jobs.length}
          </span>
        </h3>
      </div>

      <div 
        ref={setNodeRef}
        className={`flex-1 p-3 overflow-y-auto space-y-3 transition-colors ${
          isOver ? 'bg-primary/5 border-2 border-dashed border-primary/30 rounded-b-xl' : ''
        }`}
      >
        {jobs.map((job) => (
          <KanbanCard key={job.id} job={job} />
        ))}
        {jobs.length === 0 && (
          <div className="h-full flex items-center justify-center text-center opacity-50 p-4 border-2 border-dashed border-transparent">
            <span className="text-sm text-muted-foreground italic">Drag jobs here</span>
          </div>
        )}
      </div>
    </div>
  );
}
