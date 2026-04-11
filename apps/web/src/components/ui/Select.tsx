import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  placeholder?: string
  options: { label: string; value: string }[]
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, placeholder, options, id, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'flex h-9 w-full appearance-none rounded-md border border-input bg-background',
              'px-3 pr-9 py-2 text-sm text-foreground',
              'transition-colors focus-visible:outline-none focus-visible:ring-2',
              'focus-visible:ring-ring focus-visible:border-primary',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-destructive focus-visible:ring-destructive',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    )
  }
)

Select.displayName = 'Select'

export { Select }
