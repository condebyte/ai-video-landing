'use client'
import { motion } from 'framer-motion'
import { lineReveal, staggerContainer } from '@/lib/animations'

const lines = [
  { text: 'Cada imagen',      outline: false },
  { text: 'es una decisión.', outline: true  },
  { text: 'Cada segundo,',    outline: false },
  { text: 'una visión.',      outline: true  },
]

export default function ManifestoSection() {
  return (
    <section
      className="relative overflow-hidden py-40 md:py-64 px-6 md:px-10 lg:px-16"
      style={{ background: 'var(--surface)' }}
    >
      {/* Noise */}
      <div className="noise-overlay" aria-hidden />

      {/* Background large ghost number */}
      <div
        className="absolute top-1/2 right-0 pointer-events-none select-none"
        aria-hidden
        style={{
          fontSize:        'clamp(12rem, 30vw, 28rem)',
          lineHeight:      1,
          fontFamily:      'var(--font-display)',
          fontWeight:      900,
          letterSpacing:   '-0.05em',
          color:           'transparent',
          WebkitTextStroke:'1px rgba(255,255,255,0.03)',
          userSelect:      'none',
          transform:       'translateY(-50%) translateX(8%)',
        }}
      >
        001
      </div>

      {/* Label row */}
      <motion.div
        className="flex items-center gap-5 mb-16 md:mb-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.45em]" style={{ color: 'var(--muted)' }}>
          Manifiesto
        </span>
        <div className="h-px w-8" style={{ background: 'var(--muted)' }} />
        <span className="text-[9px] font-mono uppercase tracking-[0.45em]" style={{ color: 'var(--muted)' }}>
          2026
        </span>
      </motion.div>

      {/* Text reveal */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-5xl"
      >
        {lines.map(({ text, outline }, i) => (
          <div key={i} className="line-reveal overflow-hidden">
            <motion.p
              variants={lineReveal}
              className="font-display font-bold leading-[1.0] uppercase"
              style={{
                fontSize:         'clamp(2.8rem, 8.5vw, 8.5rem)',
                color:            outline ? 'transparent' : 'var(--text)',
                WebkitTextStroke: outline ? '1px rgba(240,240,240,0.35)' : undefined,
                letterSpacing:    '-0.02em',
                paddingBottom:    '0.06em',
              }}
            >
              {text}
            </motion.p>
          </div>
        ))}
      </motion.div>

      {/* Accent line */}
      <motion.div
        className="mt-16 h-px"
        style={{ background: 'var(--accent)', maxWidth: '5rem' }}
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
    </section>
  )
}
