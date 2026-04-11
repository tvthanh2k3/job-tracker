import { LoginForm } from '@/features/auth'

export default function LoginPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Đăng nhập tài khoản</h2>
      <LoginForm />
    </div>
  )
}
