import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useRegister } from './useAuth'

const registerSchema = z.object({
  fullName: z.string().min(2, 'Họ và tên phải có ít nhất 2 ký tự'),
  email: z.string().min(1, 'Vui lòng nhập email').email('Email không đúng định dạng'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
})

type RegisterValues = z.infer<typeof registerSchema>

export function RegisterForm() {
  const { mutate: registerUser, isPending } = useRegister()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: '', email: '', password: '' },
  })

  const onSubmit = (data: RegisterValues) => {
    registerUser(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="Họ và tên"
        placeholder="John Doe"
        error={errors.fullName?.message}
        {...register('fullName')}
      />

      <Input
        label="Email"
        type="email"
        placeholder="your@email.com"
        error={errors.email?.message}
        {...register('email')}
      />
      
      <Input
        label="Mật khẩu"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register('password')}
      />

      <Button type="submit" className="w-full" loading={isPending}>
        Tạo tài khoản
      </Button>

      <div className="text-center text-sm text-muted-foreground mt-4">
        Đã có tài khoản?{' '}
        <Link to="/login" className="font-semibold text-primary hover:underline transition-all">
          Đăng nhập
        </Link>
      </div>
    </form>
  )
}
