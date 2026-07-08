'use client'
import { motion } from 'framer-motion'
import VideoCard from '@/components/ui/VideoCard'
import { videos } from '@/data/videos'
import type { Video } from '@/data/videos'

interface Props {
  onOpenModal: (video: Video) => void
}

export default function VideoGrid({ onOpenModal }: Props) {
  const [featured, second, ...rest] = videos

  return (
    <section
      id="coleccion"
      className="py-32 md:py-40 px-6 md:px-10 lg:px-16"
      style={{ background: 'var(--bg)' }}
    >
      {/* ── Section header ───────────────────── */}
      <div className="mb-14 md:mb-18">
        <motion.p
          className="text-[9px] font-mono uppercase tracking-[0.5em] mb-5"
          style={{ color: 'var(--muted)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          002&nbsp;&nbsp;—&nbsp;&nbsp;Colección
        </motion.p>
        <div className="overflow-hidden">
          <motion.h2
            className="font-display font-bold uppercase"
            style={{
              fontSize:      'clamp(3.5rem, 9vw, 8rem)',
              lineHeight:    0.88,
              letterSpacing: '-0.025em',
              color:         'var(--text)',
            }}
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
          >
            Vídeos&nbsp;
            <span style={{ WebkitTextStroke: '1.5px var(--text)', color: 'transparent' }}>
              IA
            </span>
          </motion.h2>
        </div>
      </div>

      {/* ── Asymmetric editorial grid ─────────── */}
      {/* Row 1: featured (2/3) + second (1/3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        <div className="md:col-span-2">
          <VideoCard video={featured} onOpenModal={onOpenModal} featured />
        </div>
        <div className="md:col-span-1">
          <VideoCard video={second} onOpenModal={onOpenModal} />
        </div>

        {/* Row 2: remaining 4 videos — 3 cols */}
        {rest.map((video) => (
          <div key={video.slug} className="md:col-span-1">
            <VideoCard video={video} onOpenModal={onOpenModal} />
          </div>
        ))}
      </div>

      {/* ── Footer counter ───────────────────── */}
      <motion.div
        className="mt-8 flex items-center gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
        <span className="text-[8px] font-mono uppercase tracking-[0.35em]" style={{ color: 'var(--muted)' }}>
          {videos.length}&nbsp;obras
        </span>
      </motion.div>
    </section>
  )
}
