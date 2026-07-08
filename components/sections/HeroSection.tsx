'use client'
import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { featuredVideo, videos } from '@/data/videos'

interface Props {
  onScrollToGrid: () => void
}

export default function HeroSection({ onScrollToGrid }: Props) {
  const bgRef      = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const bg = bgRef.current
    if (!bg) return

    const ctx = gsap.context(() => {
      gsap.to(bg, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col overflow-hidden"
      style={{ minHeight: '100svh', background: 'var(--bg)' }}
    >
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute will-change-transform"
        style={{ inset: '-20%' }}
      >
        {featuredVideo.src ? (
          <video
            autoPlay muted loop playsInline preload="none"
            src={featuredVideo.src}
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden
          />
        ) : (
          <div className="absolute inset-0" style={{ background: featuredVideo.placeholder }} />
        )}
      </div>

      {/* Layers */}
      <div className="noise-overlay" aria-hidden />
      <div className="scan-line"     aria-hidden />
      <div className="absolute inset-0 hero-gradient" aria-hidden />

      {/* ── Top metadata bar ─────────────────── */}
      <motion.div
        className="relative z-10 flex items-center justify-between px-6 md:px-10 lg:px-16 pt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <div className="flex items-center gap-5">
          <span className="text-[9px] font-mono tracking-[0.45em] uppercase" style={{ color: 'var(--muted)' }}>
            001
          </span>
          <div className="h-px w-6" style={{ background: 'var(--muted)' }} />
          <span className="text-[9px] font-mono tracking-[0.45em] uppercase" style={{ color: 'var(--muted)' }}>
            Visual Lab
          </span>
        </div>
        <span className="text-[9px] font-mono tracking-[0.4em] uppercase" style={{ color: 'var(--muted)' }}>
          {videos.length}&nbsp;works&nbsp;·&nbsp;2026
        </span>
      </motion.div>

      {/* ── Main content — bottom-anchored ───── */}
      <div className="relative z-10 flex flex-col justify-end flex-1 px-6 md:px-10 lg:px-16 pb-20 md:pb-28">

        {/* Title block */}
        <div className="overflow-hidden">
          <motion.h1
            className="font-display font-bold uppercase"
            style={{
              fontSize:      'clamp(5.5rem, 18vw, 17rem)',
              lineHeight:    0.87,
              letterSpacing: '-0.025em',
              color:         'var(--text)',
            }}
            initial={{ y: '85%', opacity: 0 }}
            animate={{ y: 0,    opacity: 1 }}
            transition={{ duration: 1.15, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            AI
            <br />
            <span style={{ WebkitTextStroke: '1.5px var(--text)', color: 'transparent' }}>
              CINEMA
            </span>
          </motion.h1>
        </div>

        {/* Bottom row */}
        <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.p
            className="max-w-xs font-light leading-relaxed"
            style={{ color: 'rgba(240,240,240,0.45)', fontSize: '0.875rem', letterSpacing: '0.01em' }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            Vídeos generados con inteligencia artificial.
            <br />
            Cada fotograma, una decisión.
          </motion.p>

          <motion.button
            onClick={onScrollToGrid}
            className="font-mono uppercase self-start md:self-auto"
            style={{
              fontSize:        '0.65rem',
              letterSpacing:   '0.35em',
              padding:         '14px 36px',
              color:           'var(--accent)',
              border:          '1px solid rgba(232,200,114,0.25)',
              background:      'transparent',
              cursor:          'pointer',
              transition:      'all 0.4s ease',
              whiteSpace:      'nowrap',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background   = 'var(--accent)'
              e.currentTarget.style.color        = '#000'
              e.currentTarget.style.borderColor  = 'var(--accent)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background   = 'transparent'
              e.currentTarget.style.color        = 'var(--accent)'
              e.currentTarget.style.borderColor  = 'rgba(232,200,114,0.25)'
            }}
          >
            Ver colección
          </motion.button>
        </div>
      </div>

      {/* ── Scroll indicator — left ──────────── */}
      <motion.div
        className="absolute bottom-8 left-6 md:left-10 lg:left-16 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        aria-hidden
      >
        <div
          className="w-px h-10"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--muted))',
            animation:  'scroll-pulse 2.2s ease-in-out infinite',
          }}
        />
        <span className="text-[9px] font-mono uppercase tracking-[0.4em]" style={{ color: 'var(--muted)' }}>
          scroll
        </span>
      </motion.div>

      {/* ── Timecode — right ─────────────────── */}
      <motion.div
        className="absolute bottom-8 right-6 md:right-10 lg:right-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        aria-hidden
      >
        <span className="text-[9px] font-mono" style={{ color: 'var(--muted)', letterSpacing: '0.18em' }}>
          00:00:00:01
        </span>
      </motion.div>
    </section>
  )
}
