import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { KanbanColumn } from './KanbanColumn';
import { useKanban } from './useKanban';
import { JobStatus } from '@/types/job.types';
import type { Job } from '@/types/job.types';

interface KanbanBoardProps {
  jobs: Job[];
}

export function KanbanBoard({ jobs }: KanbanBoardProps) {
  const { handleDragEnd } = useKanban();

  const columns: JobStatus[] = [
    JobStatus.Wishlist,
    JobStatus.Applied,
    JobStatus.Interview,
    JobStatus.Offer,
    JobStatus.Rejected,
  ];

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const jobId = active.id as string;
    const newStatus = over.id as JobStatus;
    const currentJob = jobs.find(j => j.id === jobId);

    if (currentJob && currentJob.status !== newStatus) {
      handleDragEnd(jobId, newStatus);
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <div className="flex gap-4 h-full overflow-x-auto pb-4 snap-x">
        {columns.map((status) => {
          const columnJobs = jobs.filter((job) => job.status === status);
          return (
            <div key={status} className="snap-start">
              <KanbanColumn status={status} jobs={columnJobs} />
            </div>
          );
        })}
      </div>
    </DndContext>
  );
}
