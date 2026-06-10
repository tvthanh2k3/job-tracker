import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'
import type { Job, Interview, StageId, InterviewStatus } from '@/types/job'

// Shapes returned by the backend
interface ApiInterview {
  id: string
  jobId: string
  scheduledAt: string
  round: string
  notes?: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface ApiJob {
  id: string
  title: string
  company: string
  url?: string
  description?: string
  salary?: string
  location?: string
  note?: string
  source?: string
  status: string
  createdAt: string
  updatedAt: string
  interviews: ApiInterview[]
}

function mapInterview(iv: ApiInterview): Interview {
  return {
    round: iv.round,
    date: iv.scheduledAt,
    status: iv.status.toLowerCase() as InterviewStatus,
    notes: iv.notes,
  }
}

export function mapJob(raw: ApiJob): Job {
  return {
    id: raw.id,
    company: raw.company,
    title: raw.title,
    location: raw.location ?? '',
    salary: raw.salary,
    appliedAt: raw.createdAt,
    stage: raw.status.toLowerCase() as StageId,
    source: raw.source,
    jdLink: raw.url,
    note: raw.note,
    interviews: raw.interviews.map(mapInterview),
  }
}

export const JOBS_KEY = ['jobs'] as const

export function useJobs() {
  return useQuery({
    queryKey: JOBS_KEY,
    queryFn: () =>
      api.get<ApiJob[]>('/api/jobs').then((r) => r.data.map(mapJob)),
  })
}
