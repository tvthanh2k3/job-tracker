import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/axios'
import { JOBS_KEY, mapJob, type ApiJob } from './useJobs'
import type { StageId } from '@/types/job'

export interface CreateJobPayload {
  title: string
  company: string
  location?: string
  salary?: string
  url?: string
  note?: string
  source?: string
  status?: StageId
}

export function useCreateJob() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ status, url, ...rest }: CreateJobPayload) =>
      api
        .post<ApiJob>('/api/jobs', {
          ...rest,
          url,
          status: status
            ? status.charAt(0).toUpperCase() + status.slice(1)
            : 'Applied',
        })
        .then((r) => mapJob(r.data)),
    onSuccess: () => qc.invalidateQueries({ queryKey: JOBS_KEY }),
  })
}
