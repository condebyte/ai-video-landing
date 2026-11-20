'use client'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, SpeakerHigh, SpeakerSlash, X } from '@phosphor-icons/react'
import { videoSrc, thumbSrc, type Video } from '@/data/videos'
import { base, dict, vt, type Lang } from '@/lib/i18n'

export default function Lightbox({
  lang,
  list,
  index,
  onIndex,
  onClose,
}: {
  lang: Lang
  list: Video[]
  index: number
  onIndex: (i: number) => void
  onClose: () => void
}) {
  const v = list[index]
  const t = dict[lang]
  const { title, description } = vt(v, lang)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const vid = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const go = (d: number) => onIndex((index + d + list.length) % list.length)

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    document.documentElement.classList.add('menu-open')
    closeBtn.current?.focus()
    return () => {
      document.documentElement.classList.remove('menu-open')
      prev?.focus?.()
    }
  }, [])

  // el sonido elegido se mantiene al pasar de pieza
  useEffect(() => {
    if (vid.current) vid.current.muted = muted
  }, [muted, v.slug])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div role="dialog" aria-modal="true" aria-label={title} className="lb" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="lb__top">
        <p className="num lb__count">
          {index + 1} / {list.length}
        </p>
        <button ref={closeBtn} onClick={onClose} aria-label={t.lightbox.close} className="icon-btn">
          <X size={18} weight="bold" aria-hidden />
        </button>
      </div>

      <div className="lb__stage" onClick={e => e.target === e.currentTarget && onClose()}>
        <video
          ref={vid}
          key={v.slug}
          src={videoSrc(v)}
          poster={thumbSrc(v)}
          controls
          autoPlay
          muted
          playsInline
          className={v.h > v.w ? 'is-tall' : 'is-wide'}
          onVolumeChange={e => setMuted(e.currentTarget.muted)}
        />
      </div>

      <div className="lb__foot">
        <div>
          <h3>{title}</h3>
          <p className="lb__desc">{description}</p>
        </div>
        <div className="lb__ctrl">
          <button className="btn btn--quiet" onClick={() => setMuted(m => !m)} aria-pressed={!muted}>
            {muted ? <SpeakerSlash size={16} aria-hidden /> : <SpeakerHigh size={16} aria-hidden />}
            {muted ? t.lightbox.soundOn : t.lightbox.soundOff}
          </button>
          <a href={`${base(lang)}/video/${v.slug}`} className="lb__page">
            {t.lightbox.page}
          </a>
          <button onClick={() => go(-1)} aria-label={t.lightbox.prev} className="icon-btn">
            <ArrowLeft size={18} aria-hidden />
          </button>
          <button onClick={() => go(1)} aria-label={t.lightbox.next} className="icon-btn">
            <ArrowRight size={18} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  )
}
