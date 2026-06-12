import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/axios'
import { JOBS_KEY } from '@/features/jobs/queries/useJobs'
import type { InterviewStatus } from '@/types/job'

export interface UpdateInterviewPayload {
  id: string
  scheduledAt: string
  round: string
  notes?: string
  status: InterviewStatus
}

export function useUpdateInterview() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status, ...rest }: UpdateInterviewPayload) =>
      api
        .put(`/api/interviews/${id}`, {
          ...rest,
          status: status.charAt(0).toUpperCase() + status.slice(1),
        })
        .then(() => undefined),
    onSuccess: () => qc.invalidateQueries({ queryKey: JOBS_KEY }),
  })
}
