import { getDictionary } from '@/lib/dictionaries'
import { Metadata } from 'next'

type SignupLayoutProps = {
  children: React.ReactNode
  params: Promise<{ lang: 'en' | 'fa' }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang as 'en' | 'fa')
  
  const isEnglish = lang === 'en'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  
  const title = isEnglish 
    ? 'Join Doogi - Create Account to Share Kids\' Cute Words | Free Parent Community'
    : 'عضویت در دوگی - حساب بسازید و کلمات بامزه بچه‌ها را به اشتراک بگذارید | جامعه رایگان والدین'
    
  const description = isEnglish
    ? 'Create your free Doogi account to share and discover adorable word mix-ups from children. Join thousands of parents preserving precious childhood moments and connecting over funny sayings.'
    : 'حساب رایگان دوگی خود را بسازید تا کلمات و عبارات بامزه کودکان را به اشتراک بگذارید و کشف کنید. به هزاران والدین بپیوندید که لحظات گرانبهای کودکی را حفظ می‌کنند.'

  const keywords = isEnglish
    ? 'doogi signup, create account, join doogi, parent registration, kids sayings signup, children words platform registration, free parenting community'
    : 'ثبت نام دوگی, ایجاد حساب, عضویت دوگی, ثبت نام والدین, ثبت نام گفته‌های کودکان, ثبت نام پلتفرم کلمات بچه‌ها, جامعه رایگان والدین'

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
      url: `${baseUrl}/${lang}/signup`,
      siteName: 'Doogi',
      locale: lang === 'en' ? 'en_US' : 'fa_IR',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/static/doogi.png`,
          width: 1200,
          height: 630,
          alt: isEnglish ? 'Join Doogi Community' : 'عضویت در جامعه دوگی',
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
      canonical: `${baseUrl}/${lang}/signup`,
      languages: {
        'en': `${baseUrl}/en/signup`,
        'fa': `${baseUrl}/fa/signup`,
      },
    },
  }
}

export default async function SignupLayout({ children, params }: SignupLayoutProps) {
  return <>{children}</>
}