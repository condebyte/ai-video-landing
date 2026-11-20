import { base, dict, type Lang } from '@/lib/i18n'

export default function Footer({ lang }: { lang: Lang }) {
  const t = dict[lang]
  const b = base(lang)
  return (
    <footer className="foot">
      <div className="container">
        <p className="foot__mark" aria-hidden>
          Manuel Morales
        </p>
        <div className="foot__row">
          <nav aria-label={t.footer.label} className="foot__links">
            <a href={`${b}/#${t.ids.work}`}>{t.nav.work}</a>
            <a href={`${b}/#${t.ids.about}`}>{t.nav.about}</a>
            <a href={`${b}/#${t.ids.faq}`}>{t.nav.faq}</a>
            <a href={`${b}/#${t.ids.contact}`}>{t.nav.contact}</a>
            <a href="#top">{t.footer.top}</a>
          </nav>
          <p className="foot__legal">{t.footer.legal}</p>
        </div>
      </div>
    </footer>
  )
}
