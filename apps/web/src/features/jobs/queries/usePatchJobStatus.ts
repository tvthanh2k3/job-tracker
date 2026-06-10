import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/axios'
import { JOBS_KEY } from './useJobs'
import type { StageId } from '@/types/job'

export function usePatchJobStatus() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, stage }: { id: string; stage: StageId }) =>
      api
        .patch(`/api/jobs/${id}/status`, {
          status: stage.charAt(0).toUpperCase() + stage.slice(1),
        })
        .then(() => undefined),
    onSuccess: () => qc.invalidateQueries({ queryKey: JOBS_KEY }),
  })
}
