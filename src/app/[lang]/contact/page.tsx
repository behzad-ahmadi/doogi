import { getDictionary } from '@/src/lib/dictionaries'
import ContactForm from '@/src/components/contact-form'

export default async function Contact({
  params,
}: {
  params: { lang: 'en' | 'fa' }
}) {
  const dict = await getDictionary(params.lang)

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
