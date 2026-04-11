import { useQueryClient } from '@tanstack/react-query';
import { useUpdateJobStatus } from '@/features/jobs';
import { jobKeys } from '@/constants/queryKeys';
import type { JobStatus, Job } from '@/features/jobs';
import type { PaginatedResponse } from '@/types/common.types';

export function useKanban() {
  const queryClient = useQueryClient();
  const { mutate: updateJobStatus } = useUpdateJobStatus();

  const handleDragEnd = (jobId: string, newStatus: JobStatus) => {
    queryClient.setQueryData<PaginatedResponse<Job> | undefined>(jobKeys.list({}), (oldData) => {
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
