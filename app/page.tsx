'use client'
import { useState, useRef } from 'react'
import type { Video } from '@/data/videos'

import ScrollProgress      from '@/components/ui/ScrollProgress'
import CursorGlow          from '@/components/ui/CursorGlow'
import Header              from '@/components/layout/Header'
import Footer              from '@/components/layout/Footer'
import HeroSection         from '@/components/sections/HeroSection'
import ManifestoSection    from '@/components/sections/ManifestoSection'
import VideoGrid           from '@/components/sections/VideoGrid'
import StorySection        from '@/components/sections/StorySection'
import ContactSection      from '@/components/sections/ContactSection'
import VideoModal          from '@/components/ui/VideoModal'

export default function HomePage() {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const scrollToGrid = () => {
    document.getElementById('coleccion')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Header />

      <main>
        <HeroSection onScrollToGrid={scrollToGrid} />
        <ManifestoSection />
        <div ref={gridRef}>
          <VideoGrid onOpenModal={setActiveVideo} />
        </div>
        <StorySection onOpenModal={setActiveVideo} />
        <ContactSection />
      </main>

      <Footer />

      {activeVideo && (
        <VideoModal
          video={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </>
  )
}
