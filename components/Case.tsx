import { videos, videoSrc, thumbSrc } from '@/data/videos'
import { base, dict, type Lang } from '@/lib/i18n'

/** Un trabajo abierto como caso: el anillo, con su ficha. */
export default function Case({ lang }: { lang: Lang }) {
  const t = dict[lang].case
  const v = videos.find(x => x.slug === 'video-casa-atico')
  if (!v) return null
  return (
    <section className="case" aria-labelledby="case-title">
      <div className="container case__grid">
        <figure className="case__film">
          <video src={videoSrc(v)} poster={thumbSrc(v)} muted loop playsInline autoPlay controls preload="metadata" aria-label={t.videoLabel} />
        </figure>
        <div className="case__text">
          <h2 id="case-title">{t.title}</h2>
          <p className="lead">{t.lead}</p>
          <dl className="sheet">
            {t.rows.map(([k, val]) => (
              <div key={k} className="sheet__row">
                <dt>{k}</dt>
                <dd>{val}</dd>
              </div>
            ))}
          </dl>
          <a href={`${base(lang)}/video/${v.slug}`} className="link">
            {t.open}
          </a>
        </div>
      </div>
    </section>
  )
}
