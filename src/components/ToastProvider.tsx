'use client'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useLanguage } from '@/contexts/language-context'

export default function ToastProvider() {
  const { lang } = useLanguage()

  return (
    <ToastContainer
      position='top-center'
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={lang === 'fa'}
      draggable
      theme='light'
      pauseOnFocusLoss
    />
  )
}
