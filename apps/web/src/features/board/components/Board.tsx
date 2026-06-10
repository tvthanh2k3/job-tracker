import { useState } from 'react';
import type { Job, StageId } from '@/types/job';
import { STAGES } from '@/types/stage';
import { usePatchJobStatus } from '@/features/jobs/queries/usePatchJobStatus';
import KanbanColumn from './KanbanColumn';

interface BoardProps {
  jobs: Job[];
  onCardClick: (job: Job) => void;
}

export default function Board({ jobs, onCardClick }: BoardProps) {
  const [draggingId,    setDraggingId]    = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<string | null>(null);
  const patchStatus = usePatchJobStatus();

  const onDragStart = (jobId: string) => (e: React.DragEvent) => {
    setDraggingId(jobId);
    e.dataTransfer.effectAllowed = 'move';
    try { e.dataTransfer.setData('text/plain', jobId); } catch { /* IE compat */ }
  };

  const onDragEnd = () => { setDraggingId(null); setDragOverStage(null); };

  const onDragOver = (stageId: string) => (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverStage !== stageId) setDragOverStage(stageId);
  };

  const onDrop = (stageId: string) => (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggingId) return;
    patchStatus.mutate({ id: draggingId, stage: stageId as StageId });
    setDraggingId(null);
    setDragOverStage(null);
  };

  return (
    <div className="flex-1 overflow-x-auto overflow-y-hidden">
      <div className="flex gap-4 px-7 py-5 h-full min-w-max">
        {STAGES.map((stage) => (
          <KanbanColumn
            key={stage.id}
            stage={stage}
            jobs={jobs.filter((j) => j.stage === stage.id)}
            onCardClick={onCardClick}
            draggingId={draggingId}
            isOver={dragOverStage === stage.id}
            onDragOver={onDragOver(stage.id)}
            onDrop={onDrop(stage.id)}
            onDragLeave={() => dragOverStage === stage.id && setDragOverStage(null)}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        ))}
      </div>
    </div>
  );
}
