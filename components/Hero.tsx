'use client'
import { useRef, useState } from 'react'
import { Pause, Play } from '@phosphor-icons/react'
import { featured, videoSrc, thumbSrc } from '@/data/videos'
import { base, dict, vt, type Lang } from '@/lib/i18n'

export default function Hero({ lang }: { lang: Lang }) {
  const t = dict[lang]
  const wrap = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)

  const toggle = () => {
    const vids = wrap.current?.querySelectorAll('video') ?? []
    vids.forEach(v => (paused ? v.play().catch(() => {}) : v.pause()))
    setPaused(p => !p)
  }

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__reel" ref={wrap}>
        {featured.map((v, i) => (
          <a key={v.slug} href={`${base(lang)}/video/${v.slug}`} className="hero__clip" aria-label={`${t.work.see}: ${vt(v, lang).title}`}>
            <video
              src={videoSrc(v)}
              poster={thumbSrc(v)}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          </a>
        ))}
      </div>
      <div className="hero__copy container">
        <h1 id="hero-title">
          {t.hero.h1[0]}
          <br />
          {t.hero.h1[1]}
        </h1>
        <p className="lead">{t.hero.sub}</p>
        <div className="hero__actions">
          <a href={`#${t.ids.work}`} className="btn btn--primary">
            {t.hero.seeWork}
          </a>
          <button className="hero__pause" onClick={toggle} aria-label={paused ? t.hero.play : t.hero.pause}>
            {paused ? <Play size={16} weight="fill" aria-hidden /> : <Pause size={16} weight="fill" aria-hidden />}
          </button>
        </div>
      </div>
    </section>
  )
}
