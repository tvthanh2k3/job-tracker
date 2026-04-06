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
