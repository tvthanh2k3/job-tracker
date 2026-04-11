import axios from 'axios'
import { ROUTES } from '@/constants/routes'
import { useAuthStore } from '@/stores/authStore'

type NotifyFn = (title: string, description?: string) => void

let _notifyError: NotifyFn = (title, description) => {
  console.error('[axios]', title, description)
}

export function setAxiosErrorNotifier(fn: NotifyFn) {
  _notifyError = fn
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
      if (window.location.pathname !== ROUTES.LOGIN && window.location.pathname !== ROUTES.REGISTER) {
        _notifyError('Phiên đăng nhập hết hạn', 'Vui lòng đăng nhập lại')
        window.location.href = ROUTES.LOGIN
      }
    }
    return Promise.reject(error)
  }
)
