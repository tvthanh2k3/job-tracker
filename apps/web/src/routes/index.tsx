import { createBrowserRouter } from 'react-router-dom'
import DashboardPage from '@/pages/DashboardPage'
import LoginPage from '@/features/auth/components/LoginPage'
import { GuestRoute, ProtectedRoute } from '@/components/ProtectedRoute'

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <DashboardPage />,
      },
      {
        path: '/home',
        element: <DashboardPage />,
      },
    ],
  },
  {
    element: <GuestRoute />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '*',
    element: <div>404 - Not Found</div>,
  },
])

export default router