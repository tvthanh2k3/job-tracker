import { api } from '@/lib/axios'
import type { AnalyticsSummary } from './analytics.types'

export const analyticsApi = {
  getSummary: async (): Promise<AnalyticsSummary> => {
    const response = await api.get('/api/analytics/summary')
    return response.data
  },
}
