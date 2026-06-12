import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/axios'
import { JOBS_KEY } from '@/features/jobs/queries/useJobs'

export function useDeleteInterview() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/api/interviews/${id}`).then(() => undefined),
    onSuccess: () => qc.invalidateQueries({ queryKey: JOBS_KEY }),
  })
}
