import { cn } from '@/lib/utils/cn'
import { forwardRef } from 'react'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    return (
      <div className='form-control w-full'>
        {label && (
          <label className='label'>
            <span className='label-text'>{label}</span>
          </label>
        )}
        <textarea
          className={cn(
            'textarea textarea-bordered w-full',
            error && 'textarea-error',
            className,
          )}
          ref={ref}
          {...props}
        />
        {(error || helperText) && (
          <label className='label'>
            <span className={cn('label-text-alt', error && 'text-error')}>
              {error || helperText}
            </span>
          </label>
        )}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'

export { Textarea }
