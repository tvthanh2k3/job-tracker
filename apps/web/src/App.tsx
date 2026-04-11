import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/router'
import { setAxiosErrorNotifier } from '@/lib/axios'
import { toast } from '@/components/ui/Toast'
import { Toaster } from '@/components/ui/Toast'

export default function App() {
  useEffect(() => {
    setAxiosErrorNotifier((title, description) => toast.error(title, description))
  }, [])

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}
