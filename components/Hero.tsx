import { ArrowRight, ArrowDown } from '@phosphor-icons/react/dist/ssr'
import { featured, videos, videoSrc, thumbSrc } from '@/data/videos'
import { base, dict, vt, type Lang } from '@/lib/i18n'

export default function Hero({ lang }: { lang: Lang }) {
  const t = dict[lang]
  return (
    <section className="px-4 pt-24 md:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-16 pb-24 pt-16 lg:grid-cols-[3fr_2fr]">
        <div>
          <p className="reveal mb-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-sm text-mute">
            <span className="size-2 rounded-full bg-emerald-500" />
            {t.hero.eyebrow}
          </p>
          <h1
            className="reveal ink-grad max-w-[680px] pb-2 text-5xl font-semibold tracking-tight md:text-7xl"
            style={{ '--d': '80ms' } as React.CSSProperties}
          >
            {t.hero.h1[0]}
            <br />
            {t.hero.h1[1]}
          </h1>
          <p className="reveal mt-6 max-w-[680px] text-lg text-mute" style={{ '--d': '160ms' } as React.CSSProperties}>
            {t.hero.sub}
          </p>
          <div className="reveal mt-8 flex flex-wrap items-center gap-6" style={{ '--d': '240ms' } as React.CSSProperties}>
            <a
              href={`#${t.ids.contact}`}
              className="group inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 text-base font-semibold text-paper transition-transform duration-500 ease-fluid hover:-translate-y-0.5 active:translate-y-px"
            >
              {t.nav.cta}
              <span className="grid size-8 place-items-center rounded-full bg-paper text-ink transition-transform duration-500 ease-fluid group-hover:translate-x-1">
                <ArrowRight size={16} weight="bold" />
              </span>
            </a>
            <a
              href={`#${t.ids.work}`}
              className="inline-flex items-center gap-2 text-base font-semibold text-ink underline-offset-4 hover:underline"
            >
              {t.hero.seeWork} <ArrowDown size={16} weight="bold" />
            </a>
          </div>
          <p className="reveal mt-8 text-sm text-mute" style={{ '--d': '320ms' } as React.CSSProperties}>
            {t.hero.proof(videos.length)}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 pb-12">
          {featured.map((v, i) => (
            <a
              key={v.slug}
              href={`${base(lang)}/video/${v.slug}`}
              className={`reveal block overflow-hidden rounded-2xl bg-line ${i === 1 ? 'translate-y-12' : ''}`}
              style={{ '--d': `${200 + i * 120}ms` } as React.CSSProperties}
              aria-label={`${t.work.see}: ${vt(v, lang).title}`}
            >
              <video
                className="aspect-[9/16] w-full object-cover"
                src={videoSrc(v)}
                poster={thumbSrc(v)}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
