import { dict, type Lang } from '@/lib/i18n'

export default function About({ lang }: { lang: Lang }) {
  const t = dict[lang]
  const a = t.about
  return (
    <section id={t.ids.about} className="about" aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__text">
          <h2 id="about-title">{a.title}</h2>
          <p className="lead">{a.p1}</p>
          <p>{a.p2}</p>
        </div>
        <div className="about__list">
          <h3 className="visually-hidden">{a.servicesLabel}</h3>
          <ul className="rows">
            {a.services.map(([name, line]) => (
              <li key={name}>
                <span className="rows__name">{name}</span>
                <span className="rows__line">{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
