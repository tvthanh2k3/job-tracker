import type { Interview } from './interview.types'

export const JobStatus = {
  Wishlist: 'Wishlist',
  Applied: 'Applied',
  Interview: 'Interview',
  Offer: 'Offer',
  Rejected: 'Rejected',
} as const
export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus]

export const RemoteStatus = {
  OnSite: 'OnSite',
  Remote: 'Remote',
  Hybrid: 'Hybrid',
} as const
export type RemoteStatus = (typeof RemoteStatus)[keyof typeof RemoteStatus]

export interface Job {
  id: string
  userId: string
  title: string
  company: string
  location?: string
  salaryMin?: number
  salaryMax?: number
  currency?: string
  status: JobStatus
  remoteStatus: RemoteStatus
  jobUrl?: string
  description?: string
  notes?: string
  appliedAt?: string
  interviews?: Interview[]
  createdAt: string
  updatedAt: string
}

export interface CreateJobRequest {
  title: string
  company: string
  location?: string
  salaryMin?: number
  salaryMax?: number
  currency?: string
  status?: JobStatus
  remoteStatus?: RemoteStatus
  jobUrl?: string
  description?: string
  notes?: string
  appliedAt?: string
}

export type UpdateJobRequest = Partial<CreateJobRequest>

export interface UpdateJobStatusRequest {
  status: JobStatus
}

export interface JobFilters {
  status?: JobStatus
  remoteStatus?: RemoteStatus
  search?: string
  page?: number
  pageSize?: number
}

export interface PaginatedJobs {
  items: Job[]
  totalCount: number
  page: number
  pageSize: number
  totalPages: number
}
