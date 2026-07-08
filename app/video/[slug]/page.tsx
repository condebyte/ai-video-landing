import { notFound } from 'next/navigation'
import { videos }   from '@/data/videos'
import VideoPageClient from './VideoPageClient'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return videos.map((v) => ({ slug: v.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const video = videos.find(v => v.slug === slug)
  if (!video) return {}
  return {
    title:       `${video.title} — AI Cinema`,
    description: video.description,
  }
}

export default async function VideoPage({ params }: Props) {
  const { slug } = await params
  const video = videos.find(v => v.slug === slug)
  if (!video) notFound()
  return <VideoPageClient video={video} allVideos={videos} />
}
