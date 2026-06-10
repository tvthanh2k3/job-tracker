import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/authStore'
import type { AuthUser } from '@/features/auth/queries/useAuth'
import api from '@/lib/axios'

export function useInitAuth() {
  const { token, user, setAuth, clearAuth } = useAuthStore()

  const { data, isError } = useQuery({
    queryKey: ['me'],
    queryFn: () => api.get<AuthUser>('/api/auth/me').then((r) => r.data),
    enabled: !!token && !user,
    retry: false,
    staleTime: Infinity,
  })

  useEffect(() => {
    if (data && token) setAuth(token, data)
  }, [data, token, setAuth])

  useEffect(() => {
    if (isError) clearAuth()
  }, [isError, clearAuth])
}
