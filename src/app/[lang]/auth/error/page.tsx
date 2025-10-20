import Link from 'next/link'

type PageProps = {
  params: Promise<{ lang: 'en' | 'fa' }>
  searchParams: Promise<{ error?: string }>
}

export default async function AuthError({ params, searchParams }: PageProps) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  
  const error = resolvedSearchParams.error

  const getErrorMessage = (error: string | undefined) => {
    switch (error) {
      case 'Configuration':
        return resolvedParams.lang === 'fa' 
          ? 'خطا در تنظیمات احراز هویت'
          : 'Authentication configuration error'
      case 'AccessDenied':
        return resolvedParams.lang === 'fa'
          ? 'دسترسی رد شد'
          : 'Access denied'
      case 'Verification':
        return resolvedParams.lang === 'fa'
          ? 'خطا در تأیید هویت'
          : 'Verification error'
      case 'OAuthSignin':
        return resolvedParams.lang === 'fa'
          ? 'خطا در ورود با Google'
          : 'Error signing in with Google'
      case 'OAuthCallback':
        return resolvedParams.lang === 'fa'
          ? 'خطا در بازگشت از Google'
          : 'Error in Google callback'
      case 'OAuthCreateAccount':
        return resolvedParams.lang === 'fa'
          ? 'خطا در ایجاد حساب کاربری'
          : 'Error creating account'
      case 'EmailCreateAccount':
        return resolvedParams.lang === 'fa'
          ? 'خطا در ایجاد حساب با ایمیل'
          : 'Error creating account with email'
      case 'Callback':
        return resolvedParams.lang === 'fa'
          ? 'خطا در callback'
          : 'Callback error'
      case 'OAuthAccountNotLinked':
        return resolvedParams.lang === 'fa'
          ? 'این حساب Google قبلاً با ایمیل دیگری ثبت شده است'
          : 'This Google account is already linked to another email'
      case 'EmailSignin':
        return resolvedParams.lang === 'fa'
          ? 'خطا در ارسال ایمیل'
          : 'Error sending email'
      case 'CredentialsSignin':
        return resolvedParams.lang === 'fa'
          ? 'اطلاعات ورود نادرست است'
          : 'Invalid credentials'
      case 'SessionRequired':
        return resolvedParams.lang === 'fa'
          ? 'برای دسترسی به این صفحه باید وارد شوید'
          : 'You must be signed in to access this page'
      default:
        return resolvedParams.lang === 'fa'
          ? 'خطای ناشناخته در احراز هویت'
          : 'Unknown authentication error'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <h1 className="text-2xl font-bold text-error mb-4">
              {resolvedParams.lang === 'fa' ? 'خطا در احراز هویت' : 'Authentication Error'}
            </h1>
            
            <div className="alert alert-error mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{getErrorMessage(error)}</span>
            </div>

            <p className="text-base-content/70 mb-6">
              {resolvedParams.lang === 'fa' 
                ? 'لطفاً دوباره تلاش کنید یا با پشتیبانی تماس بگیرید.'
                : 'Please try again or contact support if the problem persists.'
              }
            </p>

            <div className="card-actions justify-center">
              <Link 
                href={`/${resolvedParams.lang}/auth/login`}
                className="btn btn-primary"
              >
                {resolvedParams.lang === 'fa' ? 'بازگشت به صفحه ورود' : 'Back to Login'}
              </Link>
              <Link 
                href={`/${resolvedParams.lang}`}
                className="btn btn-ghost"
              >
                {resolvedParams.lang === 'fa' ? 'صفحه اصلی' : 'Home'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}