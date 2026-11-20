import { Plus } from '@phosphor-icons/react/dist/ssr'
import { dict, type Lang } from '@/lib/i18n'

export default function Faq({ lang }: { lang: Lang }) {
  const t = dict[lang]
  return (
    <section id={t.ids.faq} className="faq" aria-labelledby="faq-title">
      <div className="container faq__grid">
        <h2 id="faq-title">{t.faq.title}</h2>
        <div className="faq__list">
          {t.faq.items.map(([q, a]) => (
            <details key={q}>
              <summary>
                <span>{q}</span>
                <Plus size={18} aria-hidden className="faq__icon" />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
