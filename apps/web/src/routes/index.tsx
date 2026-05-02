import { createBrowserRouter } from 'react-router-dom'
import DashboardPage from '@/pages/DashboardPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/login',
    element: <div>Login Page (coming soon)</div>,
  },
  {
    path: '*',
    element: <div>404 - Not Found</div>,
  },
])

export default router