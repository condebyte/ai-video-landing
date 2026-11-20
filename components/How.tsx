import { dict, type Lang } from '@/lib/i18n'

/** El proceso como tira de contactos: numerales finos, líneas verticales entre pasos. */
export default function How({ lang }: { lang: Lang }) {
  const h = dict[lang].how
  return (
    <section className="how" aria-labelledby="how-title">
      <div className="container">
        <h2 id="how-title">{h.title}</h2>
        <ol className="strip">
          {h.steps.map(([title, line]) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{line}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
