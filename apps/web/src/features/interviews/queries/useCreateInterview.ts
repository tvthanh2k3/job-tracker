import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/axios'
import { JOBS_KEY } from '@/features/jobs/queries/useJobs'

export interface CreateInterviewPayload {
  jobId: string
  scheduledAt: string
  round: string
  notes?: string
}

export function useCreateInterview() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateInterviewPayload) =>
      api.post('/api/interviews', payload).then(() => undefined),
    onSuccess: () => qc.invalidateQueries({ queryKey: JOBS_KEY }),
  })
}
