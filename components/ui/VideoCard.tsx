'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { useVideoObserver } from '@/hooks/useVideoObserver'
import type { Video } from '@/data/videos'

interface Props {
  video:       Video
  onOpenModal: (video: Video) => void
  featured?:   boolean
}

export default function VideoCard({ video, onOpenModal, featured }: Props) {
  const [isHovering, setIsHovering] = useState(false)
  const { videoRef, ready } = useVideoObserver()

  const handleMouseEnter = () => {
    setIsHovering(true)
    if (ready && videoRef.current?.src) {
      videoRef.current.play().catch(() => null)
    }
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden cursor-pointer"
      style={{
        border:     `1px solid ${isHovering ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.04)'}`,
        transition: 'border-color 0.5s ease',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenModal(video)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpenModal(video)}
      aria-label={`Ver vídeo: ${video.title}`}
    >
      {/* Thumbnail */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: featured ? '4/3' : '16/9' }}
      >
        {/* Capa 1 — gradient placeholder (siempre visible como fallback) */}
        <div
          className="absolute inset-0"
          style={{
            background: video.placeholder,
            transform:  isHovering ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Capa 2 — thumbnail .jpg (se oculta si el archivo no existe) */}
        {video.thumbnail && (
          <img
            src={video.thumbnail}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity:    isHovering ? 0 : 1,
              transition: 'opacity 0.5s ease',
              transform:  isHovering ? 'scale(1.05)' : 'scale(1)',
              transitionProperty: 'opacity, transform',
              transitionDuration: '0.5s, 0.9s',
              transitionTimingFunction: 'ease, cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        )}

        {/* Capa 3 — preview de vídeo en hover */}
        {ready && video.src && (
          <video
            ref={videoRef}
            src={video.src}
            poster={video.thumbnail || undefined}
            muted loop playsInline preload="none"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: isHovering ? 1 : 0, transition: 'opacity 0.5s ease' }}
            aria-hidden
          />
        )}
        {/* Elemento oculto para el IntersectionObserver (fase 1) */}
        {!ready && <video ref={videoRef} className="sr-only" aria-hidden />}

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: isHovering
              ? 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.1) 100%)'
              : 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 55%)',
            transition: 'background 0.6s ease',
          }}
        />

        {/* Top-left: tool badge */}
        <div
          className="absolute top-3 left-3 md:top-4 md:left-4"
          style={{
            opacity:    isHovering ? 1 : 0,
            transform:  isHovering ? 'translateY(0)' : 'translateY(-6px)',
            transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span
            className="text-[8px] font-mono uppercase px-2 py-1"
            style={{
              background:     'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(8px)',
              border:         '1px solid rgba(255,255,255,0.07)',
              color:          'var(--accent)',
              letterSpacing:  '0.22em',
            }}
          >
            {video.tool}
          </span>
        </div>

        {/* Top-right: duration */}
        <div
          className="absolute top-3 right-3 md:top-4 md:right-4"
          style={{
            opacity:    isHovering ? 0.8 : 0.4,
            transition: 'opacity 0.4s ease',
          }}
        >
          <span
            className="text-[8px] font-mono"
            style={{ color: 'rgba(240,240,240,0.55)', letterSpacing: '0.12em' }}
          >
            {video.duration}
          </span>
        </div>

        {/* Bottom: title + meta */}
        <div
          className="absolute bottom-0 left-0 right-0 p-4 md:p-5"
          style={{
            transform:  isHovering ? 'translateY(0)' : 'translateY(10px)',
            opacity:    isHovering ? 1 : 0.65,
            transition: 'all 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h3
            className="font-display font-bold uppercase leading-tight"
            style={{
              fontSize:      featured ? 'clamp(1rem, 2.2vw, 1.45rem)' : '0.82rem',
              color:         'var(--text)',
              letterSpacing: '-0.01em',
            }}
          >
            {video.title}
          </h3>
          <div
            className="mt-2 flex items-center gap-2.5"
            style={{
              opacity:    isHovering ? 1 : 0,
              transition: 'opacity 0.4s ease 0.06s',
            }}
          >
            <span className="text-[8px] font-mono uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
              {video.year}
            </span>
            <div className="h-px w-3" style={{ background: 'var(--muted)' }} />
            <span className="text-[8px] font-mono uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
              {video.tags[0]}
            </span>
          </div>
        </div>

        {/* Play icon — center */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity:    isHovering ? 1 : 0,
            transition: 'opacity 0.35s ease',
          }}
        >
          <div
            style={{
              width:          40,
              height:         40,
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              borderRadius:   '50%',
              border:         '1px solid rgba(255,255,255,0.2)',
              background:     'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <Play size={12} fill="white" color="white" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
