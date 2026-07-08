'use client'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { ArrowUpRight } from 'lucide-react'

export default function ContactSection() {
  return (
    <section
      id="contacto"
      className="py-40 md:py-56 px-6 md:px-10 lg:px-16"
      style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-3xl"
      >
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-5 mb-10"
        >
          <span className="text-[9px] font-mono uppercase tracking-[0.45em]" style={{ color: 'var(--muted)' }}>
            004
          </span>
          <div className="h-px w-6" style={{ background: 'var(--muted)' }} />
          <span className="text-[9px] font-mono uppercase tracking-[0.45em]" style={{ color: 'var(--muted)' }}>
            Contacto
          </span>
        </motion.div>

        <div className="line-reveal overflow-hidden mb-2">
          <motion.h2
            className="font-display font-bold uppercase leading-[0.9]"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 10rem)', color: 'var(--text)' }}
            initial={{ y: '105%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          >
            Hablemos
          </motion.h2>
        </div>

        <motion.div variants={fadeUp} className="mt-12 flex flex-col gap-4">
          <a
            href="mailto:manuelvillamar97@gmail.com"
            className="group inline-flex items-center gap-3 transition-all duration-300"
            style={{ color: 'var(--text)' }}
          >
            <span
              className="text-sm md:text-base font-light transition-colors duration-200 group-hover:underline"
              style={{ textDecorationColor: 'var(--accent)' }}
            >
              manuelvillamar97@gmail.com
            </span>
            <ArrowUpRight
              size={16}
              style={{ color: 'var(--accent)' }}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          <div className="flex items-center gap-6 mt-2">
            <p className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
              Producción de vídeo IA
            </p>
            <span style={{ color: 'var(--border)' }}>·</span>
            <p className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
              Proyectos creativos
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
