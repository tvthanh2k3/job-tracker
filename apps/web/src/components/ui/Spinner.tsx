import { Loader2 } from 'lucide-react'
import { cn } from '@/utils'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  fullScreen?: boolean
}

const sizeMap = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-10 w-10',
}

export function Spinner({ size = 'md', className, fullScreen }: SpinnerProps) {
  const icon = (
    <Loader2 className={cn('animate-spin text-primary', sizeMap[size], className)} />
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        {icon}
      </div>
    )
  }

  return icon
}
