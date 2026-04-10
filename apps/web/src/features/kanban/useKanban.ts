import { useQueryClient } from '@tanstack/react-query';
import { useUpdateJobStatus, jobKeys } from '@/features/jobs/useJobs';
import type { JobStatus, PaginatedJobs } from '@/types/job.types';

export function useKanban() {
  const queryClient = useQueryClient();
  const { mutate: updateJobStatus } = useUpdateJobStatus();

  const handleDragEnd = (jobId: string, newStatus: JobStatus) => {
    queryClient.setQueryData<PaginatedJobs | undefined>(jobKeys.list({}), (oldData) => {
      if (!oldData) return oldData;

      const updatedItems = oldData.items.map((job) => {
        if (job.id === jobId && job.status !== newStatus) {
          return { ...job, status: newStatus };
        }
        return job;
      });

      return {
        ...oldData,
        items: updatedItems,
      };
    });

    updateJobStatus({ id: jobId, data: { status: newStatus } });
  };

  return { handleDragEnd };
}
