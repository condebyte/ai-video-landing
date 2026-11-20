'use client'
import { useCallback, useMemo, useRef, useState } from 'react'
import { Play } from '@phosphor-icons/react'
import { videos, CATEGORIES, videoSrc, thumbSrc, type Category, type Video } from '@/data/videos'
import Lightbox from './Lightbox'
import { dict, vt, type Lang } from '@/lib/i18n'

type Filter = 'all' | Category

function Card({ v, onOpen, lang }: { v: Video; onOpen: () => void; lang: Lang }) {
  const t = dict[lang]
  const { title } = vt(v, lang)
  const vid = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const start = () => {
    const el = vid.current
    if (!el || !window.matchMedia('(hover: hover)').matches) return
    if (!el.src) el.src = videoSrc(v)
    el.play().then(() => setPlaying(true)).catch(() => {})
  }
  const stop = () => {
    vid.current?.pause()
    setPlaying(false)
  }

  return (
    <li className="card-in mb-6 break-inside-avoid">
      <button
        onClick={onOpen}
        onMouseEnter={start}
        onMouseLeave={stop}
        onFocus={start}
        onBlur={stop}
        className="group block w-full rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
        aria-label={`${t.work.see}: ${title}`}
      >
        <span
          className="relative block overflow-hidden rounded-2xl bg-line"
          style={{ aspectRatio: `${v.w} / ${v.h}` }}
        >
          <img
            src={thumbSrc(v)}
            alt={`${t.work.frame} ${title}`}
            loading="lazy"
            className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-fluid group-hover:scale-[1.03]"
          />
          <video
            ref={vid}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ease-fluid ${playing ? 'opacity-100' : 'opacity-0'}`}
          />
          <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2 py-1 text-xs font-medium tabular-nums text-white backdrop-blur">
            {v.duration}
          </span>
          <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/90 text-ink opacity-0 transition-all duration-500 ease-fluid group-hover:opacity-100 max-md:opacity-100">
            <Play size={14} weight="fill" />
          </span>
        </span>
        <span className="mt-3 flex items-baseline justify-between gap-4">
          <span className="text-base font-medium">{title}</span>
          <span className="shrink-0 text-sm text-mute">{t.cat[v.category]}</span>
        </span>
      </button>
    </li>
  )
}

export default function Work({ lang }: { lang: Lang }) {
  const t = dict[lang]
  const [filter, setFilter] = useState<Filter>('all')
  const [open, setOpen] = useState<number | null>(null)

  const list = useMemo(() => (filter === 'all' ? videos : videos.filter(v => v.category === filter)), [filter])
  const count = (f: Filter) => (f === 'all' ? videos.length : videos.filter(v => v.category === f).length)
  const close = useCallback(() => setOpen(null), [])

  return (
    <section id={t.ids.work} className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight">{t.work.title}</h2>
            <p className="mt-3 max-w-md text-base text-mute">
              <span className="hidden md:inline">{t.work.hintHover}</span>
              <span className="md:hidden">{t.work.hintTouch}</span>
            </p>
          </div>
          <div role="group" aria-label={t.work.filter} className="flex flex-wrap gap-2">
            {(['all', ...CATEGORIES] as Filter[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className="rounded-full border border-line px-4 py-2 text-sm font-medium text-mute transition-all duration-500 ease-fluid hover:border-ink/30 hover:text-ink active:scale-[0.98] aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper"
              >
                {f === 'all' ? t.work.all : t.cat[f]} <span className="tabular-nums opacity-60">{count(f)}</span>
              </button>
            ))}
          </div>
        </div>

        <ul key={filter} className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {list.map((v, i) => (
            <Card key={v.slug} v={v} lang={lang} onOpen={() => setOpen(i)} />
          ))}
        </ul>
      </div>

      {open !== null && <Lightbox lang={lang} list={list} index={open} onIndex={setOpen} onClose={close} />}
    </section>
  )
}
