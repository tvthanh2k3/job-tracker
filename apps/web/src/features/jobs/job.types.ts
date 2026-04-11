export const InterviewType = {
  Phone: 'Phone',
  Technical: 'Technical',
  HR: 'HR',
  Onsite: 'Onsite',
  Final: 'Final',
  Other: 'Other',
} as const
export type InterviewType = (typeof InterviewType)[keyof typeof InterviewType]

export const InterviewResult = {
  Pending: 'Pending',
  Passed: 'Passed',
  Failed: 'Failed',
} as const
export type InterviewResult = (typeof InterviewResult)[keyof typeof InterviewResult]

export interface Interview {
  id: string
  jobId: string
  scheduledAt: string
  type: InterviewType
  result: InterviewResult
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface CreateInterviewRequest {
  jobId: string
  scheduledAt: string
  type: InterviewType
  notes?: string
}

export interface UpdateInterviewRequest {
  scheduledAt?: string
  type?: InterviewType
  result?: InterviewResult
  notes?: string
}

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
