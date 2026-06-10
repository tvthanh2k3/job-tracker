import { create } from 'zustand'

interface AuthUser {
  id: string
  email: string
  fullName: string
  avatarUrl?: string
  roles: string[]
}

interface AuthState {
  token: string | null
  user: AuthUser | null
  setAuth: (token: string, user: AuthUser) => void
  clearAuth: () => void
}

const TOKEN_KEY = 'token'

export const useAuthStore = create<AuthState>()((set) => ({
  token: localStorage.getItem(TOKEN_KEY),
  user: null,

  setAuth: (token, user) => {
    localStorage.setItem(TOKEN_KEY, token)
    set({ token, user })
  },

  clearAuth: () => {
    localStorage.removeItem(TOKEN_KEY)
    set({ token: null, user: null })
  },
}))
