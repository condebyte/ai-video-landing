import { dict, type Lang } from '@/lib/i18n'

export default function About({ lang }: { lang: Lang }) {
  const t = dict[lang]
  const a = t.about
  return (
    <section id={t.ids.about} className="px-4 py-24 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2">
        <div className="reveal">
          <h2 className="text-4xl font-semibold tracking-tight">{a.title}</h2>
          <p className="mt-6 text-lg text-mute">{a.p1}</p>
          <p className="mt-4 text-lg text-mute">{a.p2}</p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {a.services.map(s => (
              <li key={s} className="rounded-full border border-line px-3 py-1 text-sm text-ink">
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="reveal text-sm font-semibold text-mute">{a.howTitle}</h3>
          <ol className="mt-6 grid gap-4">
            {a.steps.map(([title, d], i) => (
              <li
                key={title}
                className="reveal flex gap-6 rounded-2xl border border-line bg-white p-6"
                style={{ '--d': `${i * 100}ms` } as React.CSSProperties}
              >
                <span className="text-sm font-semibold tabular-nums text-mute">0{i + 1}</span>
                <div>
                  <p className="text-lg font-semibold">{title}</p>
                  <p className="mt-1 text-base text-mute">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
