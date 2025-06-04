'use client'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface ToastProviderProps {
  lang: string
}

export default function ToastProvider({ lang }: ToastProviderProps) {
  return (
    <ToastContainer
      position='top-center'
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={lang === 'fa'}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
    />
  )
}
