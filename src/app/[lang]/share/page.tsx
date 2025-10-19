import { getDictionary } from '@/src/lib/dictionaries'
import ShareForm from '@/src/components/ShareForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/src/lib/auth'
import { redirect } from 'next/navigation'

type PageProps = {
  params: Promise<{ lang: 'en' | 'fa' }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Share({ params }: PageProps) {
  const resolvedParams = await params

  // Check authentication
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect(`/${resolvedParams.lang}/auth/login`)
  }

  const dict = await getDictionary(resolvedParams.lang)

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-lg font-bold mb-4 text-center'>
          {dict.share.title}
        </h1>

        <div className='card bg-base-100 shadow-xl'>
          <div className='card-body'>
            <ShareForm />
          </div>
        </div>
      </div>
    </div>
  )
}
