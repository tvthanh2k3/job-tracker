import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Building2, MapPin, DollarSign, GripVertical } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { formatSalary } from '@/utils';
import type { Job } from '@/types/job.types';

interface KanbanCardProps {
  job: Job;
}

export function KanbanCard({ job }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: job.id,
    data: job,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`touch-manipulation ${isDragging ? 'opacity-50 z-50 rotate-3 scale-105 transition-transform shadow-2xl' : ''}`}
    >
      <Card className="flex flex-col group cursor-grab active:cursor-grabbing border-border dark:bg-card/50 shadow-sm hover:border-primary/30 hover:shadow-md transition-all h-full bg-card">
        <div className="p-3.5 flex flex-col h-full gap-3">
          
          <div className="flex gap-2 items-start justify-between">
            <h4 className="font-semibold text-sm text-foreground line-clamp-2 leading-snug">
              {job.title}
            </h4>
            <div 
              className="mt-0.5 text-muted-foreground/30 group-hover:text-muted-foreground flex-shrink-0 touch-none"
              {...attributes}
              {...listeners}
            >
              <GripVertical className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-center text-xs font-medium text-muted-foreground gap-1.5">
            <Building2 className="w-3.5 h-3.5" />
            <span className="line-clamp-1">{job.company}</span>
          </div>

          <div className="space-y-1.5 mt-auto pt-2">
            {(job.location || job.remoteStatus) && (
              <div className="flex items-center text-xs text-muted-foreground gap-1.5">
                <MapPin className="w-3 h-3" />
                <span className="line-clamp-1 truncate">
                  {job.remoteStatus === 'Remote' ? 'Remote' : job.location}
                </span>
              </div>
            )}
            {(job.salaryMin || job.salaryMax) && (
              <div className="flex items-center text-xs text-emerald-600 dark:text-emerald-500 gap-1.5">
                <DollarSign className="w-3 h-3" />
                <span>{formatSalary(job.salaryMin, job.salaryMax, job.currency)}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
