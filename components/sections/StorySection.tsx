'use client'
import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Play } from 'lucide-react'
import { featuredVideo } from '@/data/videos'
import type { Video } from '@/data/videos'

interface Props {
  onOpenModal: (video: Video) => void
}

export default function StorySection({ onOpenModal }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const text    = textRef.current
    if (!section || !text) return

    const ctx = gsap.context(() => {
      gsap.from(text, {
        x: -40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 65%',
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="historia"
      className="relative overflow-hidden py-32 md:py-48"
      style={{ background: 'var(--surface)' }}
    >
      {/* Background video / placeholder */}
      <div className="absolute inset-0" style={{ background: featuredVideo.placeholder }} aria-hidden />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.1) 100%)',
        }}
        aria-hidden
      />
      <div className="noise-overlay" aria-hidden />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-10 lg:px-16 max-w-2xl">
        <div ref={textRef}>
          <p className="text-[9px] font-mono uppercase tracking-[0.45em] mb-6 flex items-center gap-4" style={{ color: 'var(--muted)' }}>
            <span>003</span>
            <span className="h-px w-6 inline-block" style={{ background: 'var(--muted)' }} />
            <span style={{ color: 'var(--accent)' }}>Producción destacada</span>
          </p>

          <h2
            className="font-display font-bold uppercase leading-[1.0] mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', color: 'var(--text)' }}
          >
            {featuredVideo.title}
          </h2>

          <p className="text-sm font-light leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>
            {featuredVideo.description}
          </p>

          <p className="text-xs font-mono mb-10" style={{ color: 'var(--muted)' }}>
            {featuredVideo.year}&nbsp;·&nbsp;{featuredVideo.tool}&nbsp;·&nbsp;{featuredVideo.duration}
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenModal(featuredVideo)}
              className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest px-6 py-3.5 transition-all duration-300"
              style={{ background: 'var(--accent)', color: '#000' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <Play size={13} fill="#000" /> Ver vídeo
            </button>

            <div className="flex gap-1.5">
              {featuredVideo.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm"
                  style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--muted)', border: '1px solid var(--border)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Frame decorativo */}
      <div
        className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 hidden lg:block"
        style={{ width: '35vw', aspectRatio: '16/9' }}
      >
        <div
          className="w-full h-full rounded-lg flex items-center justify-center cursor-pointer group"
          style={{ border: '1px solid var(--border)', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}
          onClick={() => onOpenModal(featuredVideo)}
          role="button"
          aria-label={`Ver ${featuredVideo.title}`}
        >
          <motion.div
            className="flex items-center justify-center rounded-full"
            style={{
              width: 72, height: 72,
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <Play size={24} fill="white" color="white" />
          </motion.div>
          {/* Corner accents */}
          {[
            'top-0 left-0 border-t border-l',
            'top-0 right-0 border-t border-r',
            'bottom-0 left-0 border-b border-l',
            'bottom-0 right-0 border-b border-r',
          ].map((cls, i) => (
            <span
              key={i}
              className={`absolute w-4 h-4 ${cls}`}
              style={{ borderColor: 'var(--accent)', opacity: 0.6 }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
