'use client'
import { motion } from 'framer-motion'
import { lineReveal } from '@/lib/animations'

interface Props {
  children:   string
  className?: string
  delay?:     number
  as?:        'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export default function AnimatedTitle({ children, className = '', delay = 0, as: Tag = 'span' }: Props) {
  const lines = children.split('\n')

  return (
    <Tag className={className}>
      {lines.map((line, li) => (
        <span key={li} className="line-reveal block">
          <motion.span
            className="block"
            variants={lineReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: delay + li * 0.12 }}
          >
            {line || ' '}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
