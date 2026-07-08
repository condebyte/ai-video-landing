'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
      style={{
        height: 60,
        background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* Logo */}
      <span
        className="text-xs font-mono uppercase tracking-[0.25em] cursor-pointer"
        style={{ color: 'var(--text)' }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        AI<span style={{ color: 'var(--accent)' }}>·</span>CINEMA
      </span>

      {/* Nav */}
      <nav className="hidden md:flex items-center gap-8">
        {(['coleccion', 'historia', 'contacto'] as const).map((id) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="text-[11px] font-mono uppercase tracking-widest transition-colors duration-200"
            style={{ color: 'var(--muted)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
          >
            {id}
          </button>
        ))}
      </nav>
    </motion.header>
  )
}
