export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  JOBS: '/jobs',
  JOB_DETAIL: (id: string) => `/jobs/${id}`,
  ANALYTICS: '/analytics',
  AI_TOOLS: '/ai-tools',
} as const
