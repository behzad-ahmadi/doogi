import { Metadata } from 'next'

type ForgotPasswordLayoutProps = {
  children: React.ReactNode
  params: Promise<{ lang: 'en' | 'fa' }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  
  const isEnglish = lang === 'en'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  
  const title = isEnglish 
    ? 'Reset Password - Doogi | Recover Your Parent Account Access'
    : 'بازیابی رمز عبور - دوگی | بازیابی دسترسی حساب والدین'
    
  const description = isEnglish
    ? 'Forgot your Doogi password? Reset it easily to regain access to your account and continue sharing your child\'s adorable word mix-ups with our parent community.'
    : 'رمز عبور دوگی خود را فراموش کرده‌اید؟ به راحتی آن را بازیابی کنید تا دوباره به حساب خود دسترسی پیدا کنید و به اشتراک‌گذاری کلمات بامزه فرزندتان ادامه دهید.'

  const keywords = isEnglish
    ? 'doogi password reset, forgot password, recover account, doogi account recovery, parent account reset, password recovery'
    : 'بازیابی رمز عبور دوگی, فراموشی رمز عبور, بازیابی حساب, بازیابی حساب دوگی, بازیابی حساب والدین'

  return {
    title,
    description,
    keywords,
    robots: {
      index: false, // Don't index password reset pages
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${lang}/forgot-password`,
      siteName: 'Doogi',
      locale: lang === 'en' ? 'en_US' : 'fa_IR',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/static/doogi.png`,
          width: 1200,
          height: 630,
          alt: isEnglish ? 'Reset Doogi Password' : 'بازیابی رمز عبور دوگی',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/static/doogi.png`],
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/forgot-password`,
      languages: {
        'en': `${baseUrl}/en/forgot-password`,
        'fa': `${baseUrl}/fa/forgot-password`,
      },
    },
  }
}

export default async function ForgotPasswordLayout({ children }: ForgotPasswordLayoutProps) {
  return <>{children}</>
}