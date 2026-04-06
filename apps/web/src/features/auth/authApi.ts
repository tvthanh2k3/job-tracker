import { api } from '@/lib/axios'
import type { LoginRequest, RegisterRequest, AuthResponse, User } from '@/types/user.types'

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/api/auth/login', data)
    return response.data
  },
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/api/auth/register', data)
    return response.data
  },
  getMe: async (): Promise<User> => {
    const response = await api.get<User>('/api/auth/me')
    return response.data
  },
}
