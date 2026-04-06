import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import AppLayout from '@/components/layout/AppLayout'
import AuthLayout from '@/components/layout/AuthLayout'
import ProtectedRoute from './ProtectedRoute'
import LoadingSpinner from '@/components/shared/LoadingSpinner'

// Lazy-loaded pages for code splitting
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const JobsPage = lazy(() => import('@/pages/JobsPage'))
const JobDetailPage = lazy(() => import('@/pages/JobDetailPage'))
const AnalyticsPage = lazy(() => import('@/pages/AnalyticsPage'))
const AIToolsPage = lazy(() => import('@/pages/AIToolsPage'))

const withSuspense = (Component: React.LazyExoticComponent<() => React.JSX.Element>) => (
  <Suspense fallback={<LoadingSpinner fullScreen />}>
    <Component />
  </Suspense>
)

export const router = createBrowserRouter([
  // Public routes (auth layout)
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: withSuspense(LoginPage) },
      { path: '/register', element: withSuspense(RegisterPage) },
    ],
  },
  // Protected routes (app layout)
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/', element: <Navigate to="/dashboard" replace /> },
      { path: '/dashboard', element: withSuspense(DashboardPage) },
      { path: '/jobs', element: withSuspense(JobsPage) },
      { path: '/jobs/:id', element: withSuspense(JobDetailPage) },
      { path: '/analytics', element: withSuspense(AnalyticsPage) },
      { path: '/ai-tools', element: withSuspense(AIToolsPage) },
    ],
  },
  // Fallback
  { path: '*', element: <Navigate to="/dashboard" replace /> },
])
