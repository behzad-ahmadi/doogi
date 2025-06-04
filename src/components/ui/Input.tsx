'use client'

import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className='form-control w-full'>
        <label className='label'>
          <span className='label-text'>{label}</span>
        </label>
        <input
          ref={ref}
          className={`input input-bordered w-full ${
            error ? 'input-error' : ''
          } ${className}`}
          {...props}
        />
        {(error || helperText) && (
          <label className='label'>
            <span className={`label-text-alt ${error ? 'text-error' : ''}`}>
              {error || helperText}
            </span>
          </label>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
