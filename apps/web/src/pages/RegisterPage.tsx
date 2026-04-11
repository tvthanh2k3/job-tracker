import { RegisterForm } from '@/features/auth'

export default function RegisterPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Tạo tài khoản mới</h2>
      <RegisterForm />
    </div>
  )
}
