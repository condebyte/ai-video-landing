'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ArrowRight, Globe } from '@phosphor-icons/react'
import { base, dict, type Lang } from '@/lib/i18n'

/** Ruta equivalente en el otro idioma. */
function otherPath(path: string, lang: Lang) {
  if (lang === 'en') return path.replace(/^\/en(?=\/|$)/, '') || '/'
  return path === '/' ? '/en' : `/en${path}`
}

export default function Nav({ lang }: { lang: Lang }) {
  const t = dict[lang]
  const path = usePathname() || '/'
  const b = base(lang)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  const links = [
    { id: t.ids.work, label: t.nav.work },
    { id: t.ids.about, label: t.nav.about },
    { id: t.ids.faq, label: t.nav.faq },
  ]

  // al cambiar de idioma se queda en el mismo punto de la página:
  // guarda en qué sección estás y cuánto has bajado dentro de ella
  const switchTo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const secs = [...document.querySelectorAll<HTMLElement>('main > section, main > div')]
    const y = window.scrollY
    let i = secs.findIndex(s => s.offsetTop + s.offsetHeight > y)
    if (i < 0) i = secs.length - 1
    const st = secs[i] ? { i, off: (y - secs[i].offsetTop) / Math.max(1, secs[i].offsetHeight) } : { y }
    try {
      sessionStorage.setItem('lang-scroll', JSON.stringify(st))
    } catch {}
    window.location.href = otherPath(path, lang)
  }

  useEffect(() => {
    const els = [...links.map(l => l.id), t.ids.contact]
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]
    if (!els.length) return
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const langLink = (
    <a
      href={otherPath(path, lang)}
      onClick={switchTo}
      hrefLang={lang === 'es' ? 'en' : 'es'}
      aria-label={t.nav.switchLabel}
      className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-ink transition-colors duration-500 ease-fluid hover:bg-ink/5"
    >
      <Globe size={14} weight="bold" />
      {lang === 'es' ? 'EN' : 'ES'}
    </a>
  )

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4">
        <nav
          aria-label={t.nav.main}
          className="mt-6 flex w-full max-w-6xl items-center justify-between gap-4 rounded-full border border-line bg-white/70 py-2 pl-6 pr-2 backdrop-blur-xl md:mx-auto md:w-max md:justify-start"
        >
          <a href={b || '/'} className="text-sm font-semibold tracking-tight">
            Manuel Morales
          </a>
          <ul className="hidden items-center gap-1 md:flex md:pl-6">
            {links.map(l => (
              <li key={l.id}>
                <a
                  href={`${b}/#${l.id}`}
                  aria-current={active === l.id ? 'true' : undefined}
                  className="rounded-full px-3 py-2 text-sm font-medium text-mute transition-colors duration-500 ease-fluid hover:text-ink aria-[current]:bg-ink/5 aria-[current]:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1">
            {langLink}
            <a
              href={`${b}/#${t.ids.contact}`}
              className="hidden items-center gap-2 rounded-full bg-ink py-2 pl-4 pr-3 text-sm font-semibold text-paper transition-transform duration-500 ease-fluid hover:-translate-y-0.5 active:translate-y-px md:inline-flex"
            >
              {t.nav.cta} <ArrowRight size={14} weight="bold" />
            </a>

            {/* hamburguesa que se convierte en X */}
            <button
              onClick={() => setOpen(o => !o)}
              aria-label={open ? t.nav.close : t.nav.open}
              aria-expanded={open}
              className="relative size-10 rounded-full bg-ink text-paper md:hidden"
            >
              <span
                className={`absolute left-3 right-3 h-0.5 rounded-full bg-current transition-transform duration-700 ease-fluid ${open ? 'top-[19px] rotate-45' : 'top-4'}`}
              />
              <span
                className={`absolute left-3 right-3 h-0.5 rounded-full bg-current transition-transform duration-700 ease-fluid ${open ? 'top-[19px] -rotate-45' : 'top-[22px]'}`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* menú móvil */}
      <div
        className={`fixed inset-0 z-40 bg-white/80 backdrop-blur-3xl transition-opacity duration-700 ease-fluid md:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        aria-hidden={!open}
      >
        <ul className="flex h-full flex-col justify-center gap-6 px-8">
          {[...links, { id: t.ids.contact, label: t.nav.contact }].map((l, i) => (
            <li key={l.id} className="overflow-hidden">
              <a
                href={`${b}/#${l.id}`}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${100 + i * 50}ms` : '0ms' }}
                className={`block text-4xl font-semibold tracking-tight transition-all duration-700 ease-fluid ${open ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
