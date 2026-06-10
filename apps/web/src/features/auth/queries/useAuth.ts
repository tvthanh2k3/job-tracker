import { useMutation } from '@tanstack/react-query'
import api from '@/lib/axios'

export interface AuthUser {
  id: string
  email: string
  fullName: string
  avatarUrl?: string
  roles: string[]
}

export interface AuthResponse {
  token: string
  user: AuthUser
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginPayload) =>
      api.post<AuthResponse>('/api/auth/login', payload).then((r) => r.data),
  })
}

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) =>
      api.post<AuthResponse>('/api/auth/register', payload).then((r) => r.data),
  })
}
