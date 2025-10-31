import { Metadata } from 'next'

type AuthLayoutProps = {
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
    ? 'Authentication - Doogi | Login & Sign Up for Parents'
    : 'احراز هویت - دوگی | ورود و ثبت نام برای والدین'
    
  const description = isEnglish
    ? 'Join Doogi to share and discover adorable word mix-ups from children. Create your account or sign in to connect with other parents and preserve precious childhood moments.'
    : 'به دوگی بپیوندید تا کلمات و عبارات بامزه کودکان را به اشتراک بگذارید و کشف کنید. حساب کاربری خود را ایجاد کنید یا وارد شوید تا با والدین دیگر ارتباط برقرار کنید.'

  const keywords = isEnglish
    ? 'doogi login, doogi signup, parent account, kids sayings platform, children words sharing, parenting community'
    : 'ورود دوگی, ثبت نام دوگی, حساب والدین, پلتفرم گفته‌های کودکان, اشتراک کلمات بچه‌ها, جامعه والدین'

  return {
    title,
    description,
    keywords,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${lang}/login`,
      siteName: 'Doogi',
      locale: lang === 'en' ? 'en_US' : 'fa_IR',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/static/doogi.png`,
          width: 1200,
          height: 630,
          alt: isEnglish ? 'Doogi Authentication' : 'احراز هویت دوگی',
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
      canonical: `${baseUrl}/${lang}/login`,
      languages: {
        'en': `${baseUrl}/en/login`,
        'fa': `${baseUrl}/fa/login`,
      },
    },
  }
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  return <>{children}</>
}