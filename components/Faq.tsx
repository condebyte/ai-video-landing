import { Plus } from '@phosphor-icons/react/dist/ssr'
import { dict, type Lang } from '@/lib/i18n'

export default function Faq({ lang }: { lang: Lang }) {
  const t = dict[lang]
  return (
    <section id={t.ids.faq} className="px-4 py-24 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_2fr]">
        <h2 className="reveal text-4xl font-semibold tracking-tight">{t.faq.title}</h2>
        <div className="reveal divide-y divide-line border-y border-line">
          {t.faq.items.map(([q, a]) => (
            <details key={q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium outline-none focus-visible:underline [&::-webkit-details-marker]:hidden">
                {q}
                <Plus
                  size={18}
                  weight="bold"
                  className="shrink-0 transition-transform duration-500 ease-fluid group-open:rotate-45"
                />
              </summary>
              <p className="-mt-2 pb-6 pr-12 text-base text-mute">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
