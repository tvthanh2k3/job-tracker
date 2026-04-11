import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { lazy, Suspense } from 'react'
import AppLayout from '@/components/layout/AppLayout'
import AuthLayout from '@/components/layout/AuthLayout'
import ProtectedRoute from './ProtectedRoute'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import { ErrorBoundary } from '@/components/shared/ErrorBoundary'

const LoginPage = lazy(() => import('@/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const JobsPage = lazy(() => import('@/pages/JobsPage'))
const JobDetailPage = lazy(() => import('@/pages/JobDetailPage'))
const AnalyticsPage = lazy(() => import('@/pages/AnalyticsPage'))
const AIToolsPage = lazy(() => import('@/pages/AIToolsPage'))

const withSuspense = (Component: React.LazyExoticComponent<() => React.JSX.Element>) => (
  <ErrorBoundary>
    <Suspense fallback={<LoadingSpinner fullScreen />}>
      <Component />
    </Suspense>
  </ErrorBoundary>
)

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: ROUTES.LOGIN, element: withSuspense(LoginPage) },
      { path: ROUTES.REGISTER, element: withSuspense(RegisterPage) },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/', element: <Navigate to={ROUTES.DASHBOARD} replace /> },
      { path: ROUTES.DASHBOARD, element: withSuspense(DashboardPage) },
      { path: ROUTES.JOBS, element: withSuspense(JobsPage) },
      { path: ROUTES.JOB_DETAIL_PATTERN, element: withSuspense(JobDetailPage) },
      { path: ROUTES.ANALYTICS, element: withSuspense(AnalyticsPage) },
      { path: ROUTES.AI_TOOLS, element: withSuspense(AIToolsPage) },
    ],
  },
  { path: '*', element: <Navigate to={ROUTES.DASHBOARD} replace /> },
])
