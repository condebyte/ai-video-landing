'use client'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from '@phosphor-icons/react'
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
  const [shown, setShown] = useState(false)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const go = (d: number) => onIndex((index + d + list.length) % list.length)

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    document.documentElement.style.overflow = 'hidden'
    requestAnimationFrame(() => setShown(true))
    closeBtn.current?.focus()
    return () => {
      document.documentElement.style.overflow = ''
      prev?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const vertical = v.h > v.w

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={e => e.target === e.currentTarget && onClose()}
      className={`fixed inset-0 z-[60] flex flex-col bg-black/90 text-white backdrop-blur-xl transition-opacity duration-500 ease-fluid ${shown ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="flex items-center justify-between gap-4 p-4 md:px-8">
        <p className="text-sm text-white/60 tabular-nums">
          {index + 1} / {list.length}
        </p>
        <button
          ref={closeBtn}
          onClick={onClose}
          aria-label={t.lightbox.close}
          className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors duration-500 ease-fluid hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"
        >
          <X size={18} weight="bold" />
        </button>
      </div>

      <div
        onClick={e => e.target === e.currentTarget && onClose()}
        className={`flex min-h-0 flex-1 items-center justify-center px-4 transition-transform duration-700 ease-fluid md:px-8 ${shown ? 'scale-100' : 'scale-95'}`}
      >
        <video
          key={v.slug}
          src={videoSrc(v)}
          poster={thumbSrc(v)}
          controls
          autoPlay
          playsInline
          className={`max-h-full rounded-xl bg-black ${vertical ? 'h-full w-auto' : 'w-full max-w-5xl'}`}
        />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:flex-row md:items-end md:justify-between md:px-8 md:pb-8">
        <div>
          <p className="text-sm text-white/60">
            {t.cat[v.category]} · {v.duration}
          </p>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight">{title}</h3>
          <p className="mt-2 max-w-xl text-sm text-white/70">{description}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={`${base(lang)}/video/${v.slug}`}
            className="mr-2 inline-flex items-center gap-1 text-sm font-semibold text-white/80 hover:text-white"
          >
            {t.lightbox.page} <ArrowUpRight size={14} weight="bold" />
          </a>
          <button
            onClick={() => go(-1)}
            aria-label={t.lightbox.prev}
            className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors duration-500 ease-fluid hover:bg-white/20 active:scale-[0.98]"
          >
            <ArrowLeft size={18} weight="bold" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label={t.lightbox.next}
            className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors duration-500 ease-fluid hover:bg-white/20 active:scale-[0.98]"
          >
            <ArrowRight size={18} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  )
}
