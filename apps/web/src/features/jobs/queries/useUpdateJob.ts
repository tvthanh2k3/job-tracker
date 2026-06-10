import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/axios'
import { JOBS_KEY } from './useJobs'
import type { StageId } from '@/types/job'

export interface UpdateJobPayload {
  id: string
  title: string
  company: string
  location?: string
  salary?: string
  url?: string
  note?: string
  source?: string
  status?: StageId
}

export function useUpdateJob() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status, url, ...rest }: UpdateJobPayload) =>
      api
        .put(`/api/jobs/${id}`, {
          ...rest,
          url,
          status: status
            ? status.charAt(0).toUpperCase() + status.slice(1)
            : undefined,
        })
        .then(() => undefined),
    onSuccess: () => qc.invalidateQueries({ queryKey: JOBS_KEY }),
  })
}
