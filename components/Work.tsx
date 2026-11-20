'use client'
import { useCallback, useMemo, useRef, useState } from 'react'
import { videos, CATEGORIES, videoSrc, thumbSrc, type Category, type Video } from '@/data/videos'
import { dict, vt, type Lang } from '@/lib/i18n'
import Lightbox from './Lightbox'

type Filter = 'all' | Category

function Card({ v, onOpen, lang, first }: { v: Video; onOpen: () => void; lang: Lang; first: boolean }) {
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
    <li className="piece">
      <button
        className="piece__btn"
        onClick={onOpen}
        onMouseEnter={start}
        onMouseLeave={stop}
        onFocus={start}
        onBlur={stop}
        aria-label={`${t.work.see}: ${title}`}
      >
        <span className="piece__media" style={{ aspectRatio: `${v.w} / ${v.h}` }}>
          <img
            src={thumbSrc(v)}
            alt={`${t.work.frame} ${title}`}
            width={v.w}
            height={v.h}
            loading={first ? 'eager' : 'lazy'}
            fetchPriority={first ? 'high' : 'auto'}
          />
          <video ref={vid} muted loop playsInline preload="none" poster={thumbSrc(v)} className={playing ? 'is-on' : ''} />
        </span>
        <span className="piece__cap">
          <span className="piece__title">{title}</span>
          <span className="piece__meta">
            <span>{t.cat[v.category]}</span>
            <span className="num piece__dur">{v.duration}</span>
          </span>
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
    <section id={t.ids.work} className="work">
      <div className="container">
        <div className="work__head">
          <div>
            <h2>{t.work.title}</h2>
            <p className="lead work__lead">{t.work.lead}</p>
          </div>
          <div className="work__tools">
            <div role="group" aria-label={t.work.filter} className="filters">
              {(['all', ...CATEGORIES] as Filter[]).map(f => (
                <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f}>
                  {f === 'all' ? t.work.all : t.cat[f]} <span className="num">{count(f)}</span>
                </button>
              ))}
            </div>
            <p className="work__hint">
              <span className="on-hover">{t.work.hintHover}</span>
              <span className="on-touch">{t.work.hintTouch}</span>
            </p>
          </div>
        </div>

        <ul key={filter} className="pieces">
          {list.map((v, i) => (
            <Card key={v.slug} v={v} lang={lang} first={i === 0} onOpen={() => setOpen(i)} />
          ))}
        </ul>
      </div>

      {open !== null && <Lightbox lang={lang} list={list} index={open} onIndex={setOpen} onClose={close} />}
    </section>
  )
}
