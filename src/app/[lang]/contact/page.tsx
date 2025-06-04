import { getDictionary } from '@/src/lib/dictionaries'
import ContactForm from '@/src/components/ContactForm'

type PageProps = {
  params: Promise<{ lang: 'en' | 'fa' }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Contact({ params }: PageProps) {
  const resolvedParams = await params
  const dict = await getDictionary(resolvedParams.lang)

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-4xl font-bold mb-8 text-center'>
          {dict.contact.title}
        </h1>

        <div className='card bg-base-100 shadow-xl'>
          <div className='card-body'>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
