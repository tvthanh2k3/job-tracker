import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Dashboard Page (coming soon)</div>,
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