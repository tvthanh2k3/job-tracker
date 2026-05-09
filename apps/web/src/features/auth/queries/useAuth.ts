import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import api from '@/lib/axios'
import { useAuthStore } from '@/stores/authStore'

interface AuthUser {
  id: string
  name: string
  email: string
  role: string
}

interface AuthResponse {
  token: string
  user: AuthUser
}

interface LoginPayload {
  email: string
  password: string
}

interface RegisterPayload {
  name: string
  email: string
  password: string
}

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (payload: LoginPayload) =>
      api.post<AuthResponse>('/api/auth/login', payload).then((r) => r.data),
    onSuccess: (data) => {
      setAuth(data.token, data.user)
      navigate('/')
    },
  })
}

export function useRegister() {
  const setAuth = useAuthStore((s) => s.setAuth)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (payload: RegisterPayload) =>
      api.post<AuthResponse>('/api/auth/register', payload).then((r) => r.data),
    onSuccess: (data) => {
      setAuth(data.token, data.user)
      navigate('/')
    },
  })
}
