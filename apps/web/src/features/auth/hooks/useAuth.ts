import { useMutation, useQuery } from '@tanstack/react-query'
import { authApi } from '../authApi'
import { useAuthStore } from '@/stores/authStore'
import { toast } from '@/components/ui/Toast'
import { useNavigate } from 'react-router-dom'
import type { LoginRequest, RegisterRequest } from '../auth.types'
import { authKeys } from '@/constants/queryKeys'

export function useLogin() {
  const setToken = useAuthStore((s) => s.setToken)
  const setUser = useAuthStore((s) => s.setUser)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (data) => {
      setToken(data.token)
      setUser(data.user)
      toast.success('Đăng nhập thành công!', 'Chào mừng bạn quay lại.')
      navigate('/dashboard', { replace: true })
    },
    onError: (error: any) => {
      toast.error('Đăng nhập thất bại', error.response?.data?.message || 'Thông tin đăng nhập không hợp lệ')
    },
  })
}

export function useRegister() {
  const setToken = useAuthStore((s) => s.setToken)
  const setUser = useAuthStore((s) => s.setUser)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (data) => {
      setToken(data.token)
      setUser(data.user)
      toast.success('Tạo tài khoản thành công!', 'Chào mừng đến với Job Tracker.')
      navigate('/dashboard', { replace: true })
    },
    onError: (error: any) => {
      toast.error('Tạo tài khoản thất bại', error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại sau')
    },
  })
}

export function useMe() {
  const token = useAuthStore((s) => s.token)
  
  return useQuery({
    queryKey: authKeys.me,
    queryFn: authApi.getMe,
    enabled: !!token,
    staleTime: 1000 * 60 * 60, // 1 hour
  })
}
