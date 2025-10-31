'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/language-context'

export default function ContactForm() {
  const { dict } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error')
      return
    }

    // Simulate form submission
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })

      // Reset status after 3 seconds
      setTimeout(() => setStatus('idle'), 3000)
    }, 1000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>{dict.contact.name}</span>
        </label>
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          className='input input-bordered'
          required
        />
      </div>

      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>{dict.contact.email}</span>
        </label>
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          className='input input-bordered'
          required
        />
      </div>

      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>{dict.contact.message}</span>
        </label>
        <textarea
          name='message'
          value={formData.message}
          onChange={handleChange}
          className='textarea textarea-bordered h-24'
          required
        ></textarea>
      </div>

      {status === 'success' && (
        <div className='alert alert-success'>
          <span>{dict.contact.success}</span>
        </div>
      )}

      {status === 'error' && (
        <div className='alert alert-error'>
          <span>{dict.contact.error}</span>
        </div>
      )}

      <div className='form-control mt-6'>
        <button type='submit' className='btn btn-primary'>
          {dict.contact.send}
        </button>
      </div>
    </form>
  )
}
