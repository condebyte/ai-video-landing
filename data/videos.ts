export type Category = 'Cine' | 'Avatares' | 'Espacios' | 'Producto'

export const CATEGORIES: Category[] = ['Cine', 'Avatares', 'Espacios', 'Producto']

export interface Video {
  slug: string
  title: string
  description: string
  /** título y descripción en inglés */
  en: { title: string; description: string }
  category: Category
  /** duración real del archivo */
  duration: string
  /** proporción del vídeo, para reservar el hueco antes de cargar */
  w: number
  h: number
  featured?: boolean
}

export const videos: Video[] = [
  {
    slug: 'kill-bill-a-silent-hallway-seven-blades-one-leaderslow-steps-then-everything-changesh',
    title: 'Siete espadas, homenaje',
    description: 'Un pasillo en silencio, siete espadas y un líder. Tensión construida plano a plano.',
    en: { title: 'Seven blades, a homage', description: 'A silent hallway, seven blades and one leader. Tension built shot by shot.' },
    category: 'Cine',
    duration: '0:24',
    w: 636,
    h: 360,
  },
  {
    slug: 'real-or-ai-swipe-and-tell-me-what-you-thinkif-this-looks-too-real-thats-the-pointai-ai-1',
    title: '¿Real o IA? 01',
    description: 'Formato para redes que pone a prueba al espectador: ¿es una persona real o una generación de IA?',
    en: { title: 'Real or AI? 01', description: 'A social format that tests the viewer: is it a real person or an AI generation?' },
    category: 'Avatares',
    duration: '0:25',
    w: 720,
    h: 1280,
  },
  {
    slug: 'video-piscina',
    title: 'Piscina, luz y agua',
    description: 'Exterior junto a la piscina de un resort. Reflejos sobre el agua y calma visual.',
    en: { title: 'Pool, light and water', description: 'Poolside at a resort. Light reflecting on the water and visual calm.' },
    category: 'Espacios',
    duration: '0:09',
    w: 1080,
    h: 1934,
  },
  {
    slug: 'chinese-trend-vibes-filmlook-moviescene-aivideo-aiavatar-aiavatars-aigenerated-heyge',
    title: 'Look de película',
    description: 'Estética de cine inspirada en una tendencia viral, con un etalonaje de nivel editorial.',
    en: { title: 'Film look', description: 'Cinematic look inspired by a viral trend, with editorial grade colour.' },
    category: 'Cine',
    duration: '0:15',
    w: 636,
    h: 360,
  },
  {
    slug: 'anillo-amatista',
    title: 'Anillo de amatista',
    description: 'Anuncio de joyería. Oro, brillantes y una amatista de talla princesa, con luz de estudio y reflejos de catálogo.',
    en: { title: 'Amethyst ring', description: 'Jewellery ad. Gold, diamonds and a princess cut amethyst, with studio light and catalogue reflections.' },
    category: 'Producto',
    duration: '0:19',
    w: 1080,
    h: 1920,
    featured: true,
  },
  {
    slug: 'real-or-ai-swipe-and-tell-me-what-you-thinkif-this-looks-too-real-thats-the-pointai-ai',
    title: '¿Real o IA? 03',
    description: 'Tercera pieza del formato. Realismo llevado al límite de lo indistinguible.',
    en: { title: 'Real or AI? 03', description: 'The third piece of the format. Realism pushed to the point where you cannot tell.' },
    category: 'Avatares',
    duration: '0:14',
    w: 360,
    h: 640,
  },
  {
    slug: 'video-hotel-escenas',
    title: 'Hotel, escenas de cine',
    description:
      'Producción para un hotel de lujo. Planos interiores, texturas y la atmósfera de una estancia de alta gama.',
    en: { title: 'Hotel, cinematic scenes', description: 'Film for a luxury hotel. Interior shots, textures and the atmosphere of a high end stay.' },
    category: 'Espacios',
    duration: '0:15',
    w: 1080,
    h: 1964,
    featured: true,
  },
  {
    slug: 'real-or-ai-swipe-and-tell-me-what-you-thinkif-this-looks-too-real-thats-the-pointai-ai-2',
    title: '¿Real o IA? 02',
    description: 'Segunda pieza del formato. Nueva escena y el mismo reto: distinguir lo generado de lo real.',
    en: { title: 'Real or AI? 02', description: 'The second piece of the format. A new scene, same challenge: tell what is generated from what is real.' },
    category: 'Avatares',
    duration: '0:16',
    w: 360,
    h: 640,
    featured: true,
  },
  {
    slug: 'video-casa-atico',
    title: 'Ático, estudio de interiorismo',
    description: 'Vivienda en planta ático. Espacios abiertos, materiales nobles y luz natural filtrada.',
    en: { title: 'Penthouse, interior study', description: 'A penthouse home. Open spaces, fine materials and filtered daylight.' },
    category: 'Espacios',
    duration: '0:33',
    w: 1920,
    h: 1072,
  },
  {
    slug: 'video-casa-planos',
    title: 'Casa, del plano al espacio',
    description: 'Estudio residencial. Volúmenes, materiales y planos convertidos en un recorrido.',
    en: { title: 'House, from plan to space', description: 'Residential study. Volumes, materials and floor plans turned into a walkthrough.' },
    category: 'Espacios',
    duration: '0:29',
    w: 1920,
    h: 1072,
  },
]

export const videoSrc = (v: Video) => `/videos/${v.slug}.mp4`
export const thumbSrc = (v: Video) => `/thumbnails/${v.slug}.jpg`
export const featured = videos.filter(v => v.featured)
