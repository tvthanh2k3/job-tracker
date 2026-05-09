import { createBrowserRouter } from 'react-router-dom'
import DashboardPage from '@/pages/DashboardPage'
import LoginPage from '@/features/auth/components/LoginPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <div>404 - Not Found</div>,
  },
])

export default router