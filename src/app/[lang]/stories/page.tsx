import Stories from '@/components/Stories'

interface PageProps {
  params: Promise<{
    lang: 'en' | 'fa'
  }>
}

export default async function StoriesPage({ params }: PageProps) {
  return <Stories params={params} />
}
