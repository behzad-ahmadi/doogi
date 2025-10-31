import { getDictionary } from '@/lib/dictionaries'
import { Metadata } from 'next'

type LoginLayoutProps = {
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
    ? 'Login to Doogi - Share Your Child\'s Cute Words | Parent Community'
    : 'ورود به دوگی - کلمات بامزه فرزندتان را به اشتراک بگذارید | جامعه والدین'
    
  const description = isEnglish
    ? 'Sign in to your Doogi account to share and discover adorable word mix-ups from children. Join our community of parents preserving precious childhood moments and funny sayings.'
    : 'وارد حساب دوگی خود شوید تا کلمات و عبارات بامزه کودکان را به اشتراک بگذارید و کشف کنید. به جامعه والدینی بپیوندید که لحظات گرانبهای کودکی را حفظ می‌کنند.'

  const keywords = isEnglish
    ? 'doogi login, sign in, parent login, kids sayings login, children words platform login, parenting community access'
    : 'ورود دوگی, ورود والدین, ورود پلتفرم گفته‌های کودکان, دسترسی جامعه والدین, ورود کلمات بچه‌ها'

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
          alt: isEnglish ? 'Login to Doogi' : 'ورود به دوگی',
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

export default async function LoginLayout({ children, params }: LoginLayoutProps) {
  return <>{children}</>
}