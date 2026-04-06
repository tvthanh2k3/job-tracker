import { Spinner } from '@/components/ui/Spinner'

interface LoadingSpinnerProps {
  fullScreen?: boolean
  className?: string
}

export default function LoadingSpinner({ fullScreen, className }: LoadingSpinnerProps) {
  return <Spinner fullScreen={fullScreen} className={className} size={fullScreen ? 'lg' : 'md'} />
}
