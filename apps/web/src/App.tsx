import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import { queryClient } from '@/lib/react-query'
import router from '@/routes'
import { useInitAuth } from '@/features/auth/hooks/useInitAuth'

function AppContent() {
  useInitAuth()
  return <RouterProvider router={router} />
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
