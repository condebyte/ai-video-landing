import type { Variants } from 'framer-motion'

const EASE_OUT    = [0.16, 1, 0.3, 1]    as const
const EASE_CINEMA = [0.76, 0, 0.24, 1]   as const

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.95, ease: EASE_OUT } },
}

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.75, ease: 'easeOut' } },
}

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.93, y: 24 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
}

export const slideLeft: Variants = {
  hidden:  { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: EASE_OUT } },
}

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
}

export const staggerContainerFast: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

export const lineReveal: Variants = {
  hidden:  { y: '110%' },
  visible: { y: 0, transition: { duration: 1.1, ease: EASE_CINEMA } },
}

export const maskReveal: Variants = {
  hidden:  { clipPath: 'inset(0 100% 0 0)' },
  visible: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 1.3, ease: EASE_OUT } },
}
