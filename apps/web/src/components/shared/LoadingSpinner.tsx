import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  fullScreen?: boolean
  className?: string
}

export default function LoadingSpinner({ fullScreen, className }: LoadingSpinnerProps) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }
  return <Loader2 className={`h-5 w-5 animate-spin text-primary ${className ?? ''}`} />
}
