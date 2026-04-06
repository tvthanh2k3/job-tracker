export interface AnalyticsSummary {
  totalApplications: number
  totalInterviews: number
  totalOffers: number
  interviewRate: number
  offerRate: number
  statusBreakdown: StatusBreakdownItem[]
  applicationTimeline: TimelineItem[]
}

export interface StatusBreakdownItem {
  status: string
  count: number
  percentage: number
}

export interface TimelineItem {
  date: string
  count: number
}
