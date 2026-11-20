'use client'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
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
  const [hidden, setHidden] = useState(false)
  const [active, setActive] = useState('')
  const lastY = useRef(0)

  const links = [
    { id: t.ids.work, label: t.nav.work },
    { id: t.ids.about, label: t.nav.about },
    { id: t.ids.faq, label: t.nav.faq },
  ]

  // la barra se esconde al bajar y vuelve al subir
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        setHidden(y > 120 && y > lastY.current)
        lastY.current = y
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  // sección visible: enlace marcado
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
    document.documentElement.classList.toggle('menu-open', open)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // al cambiar de idioma se queda en el mismo punto de la página
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

  return (
    <header className={`bar${hidden && !open ? ' is-hidden' : ''}`}>
      <nav aria-label={t.nav.main} className="container bar__in">
        <a href={b || '/'} className="bar__mark">
          Manuel Morales
        </a>
        <ul className="bar__links">
          {links.map(l => (
            <li key={l.id}>
              <a href={`${b}/#${l.id}`} aria-current={active === l.id ? 'true' : undefined}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="bar__end">
          <a
            href={otherPath(path, lang)}
            onClick={switchTo}
            hrefLang={lang === 'es' ? 'en' : 'es'}
            aria-label={t.nav.switchLabel}
            className="bar__lang"
          >
            {t.nav.switchShort}
          </a>
          <a href={`${b}/#${t.ids.contact}`} className="btn btn--quiet bar__cta">
            {t.nav.cta}
          </a>
          <button
            className="bar__menu"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen(o => !o)}
          >
            {open ? t.nav.close : t.nav.menu}
          </button>
        </div>
      </nav>
      <div id="menu" className={`menu${open ? ' is-open' : ''}`} hidden={!open}>
        <ul className="container">
          {[...links, { id: t.ids.contact, label: t.nav.contact }].map(l => (
            <li key={l.id}>
              <a href={`${b}/#${l.id}`} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
