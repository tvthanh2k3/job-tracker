import { useQuery } from '@tanstack/react-query'
import { analyticsApi } from './analyticsApi'

export function useAnalyticsSummary() {
  return useQuery({
    queryKey: ['analytics', 'summary'],
    queryFn: analyticsApi.getSummary,
  })
}
