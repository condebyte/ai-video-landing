'use client'
import { useEffect, useRef } from 'react'
import { dict, type Lang } from '@/lib/i18n'

export default function Tagline({ lang }: { lang: Lang }) {
  const t = dict[lang].tagline
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const words = ref.current?.querySelectorAll('.word')
    if (!words) return
    // la línea de activación está al 60 % de la altura de la pantalla
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          e.target.classList.toggle('on', e.isIntersecting || e.boundingClientRect.top < 0)
        }
      },
      { rootMargin: '0px 0px -40% 0px' },
    )
    words.forEach(w => io.observe(w))
    return () => io.disconnect()
  }, [lang])

  return (
    <section className="px-4 py-24 md:px-8" aria-label={t.label}>
      <div className="mx-auto max-w-6xl">
        <p ref={ref} className="max-w-[680px] text-4xl font-semibold tracking-tight md:text-5xl md:leading-tight">
          {t.text.split(' ').map((w, i) => (
            <span key={i} className="word">
              {w}{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
