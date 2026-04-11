import { forwardRef } from 'react'
import { cn } from '@/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2',
            'text-sm text-foreground placeholder:text-muted-foreground',
            'transition-colors focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-ring focus-visible:border-primary',
            'disabled:cursor-not-allowed disabled:opacity-50 resize-y',
            error && 'border-destructive focus-visible:ring-destructive',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }
