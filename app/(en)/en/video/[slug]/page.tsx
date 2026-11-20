import { VideoPage, videoMetadata, videoParams } from '@/components/pages'

type Props = { params: Promise<{ slug: string }> }

export const generateStaticParams = videoParams
export const dynamicParams = false

export async function generateMetadata({ params }: Props) {
  return videoMetadata('en', (await params).slug)
}

export default async function Page({ params }: Props) {
  return <VideoPage lang="en" slug={(await params).slug} />
}
