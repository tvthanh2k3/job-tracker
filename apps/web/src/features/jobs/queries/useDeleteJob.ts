import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/axios'
import { JOBS_KEY } from './useJobs'

export function useDeleteJob() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/api/jobs/${id}`).then(() => undefined),
    onSuccess: () => qc.invalidateQueries({ queryKey: JOBS_KEY }),
  })
}
