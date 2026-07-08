export interface Video {
  slug:        string
  title:       string
  description: string
  duration:    string
  year:        number
  tags:        string[]
  tool:        'Higgsfield' | 'Runway' | 'Kling' | 'Pika' | 'Veo' | 'Sora'
  src:         string
  thumbnail:   string   // ruta futura; si no existe, se usa placeholder
  placeholder: string   // gradient CSS de fallback
  featured?:   boolean
}

export const videos: Video[] = [
  {
    slug:        'video-hotel-escenas',
    title:       'Hotel — Cinematic Scenes',
    description: 'Producción cinematográfica para hotel de lujo. Planos interiores, texturas premium y atmósferas de hospitalidad de alta gama generadas con IA.',
    duration:    '0:35',
    year:        2026,
    tags:        ['Hospitality Film', 'Cinematic', 'Interior'],
    tool:        'Higgsfield',
    src:         '/videos/video-hotel-escenas.mp4',
    thumbnail:   '/thumbnails/video-hotel-escenas.jpg',
    placeholder: 'linear-gradient(135deg, #0d1f3c 0%, #060e1f 55%, #020508 100%)',
    featured:    true,
  },
  {
    slug:        'video-casa-planos',
    title:       'Casa — Architectural Study',
    description: 'Estudio arquitectónico residencial. Planos, volúmenes y materiales explorados a través de IA generativa. Cada plano, una hipótesis espacial.',
    duration:    '0:50',
    year:        2026,
    tags:        ['Architecture AI', 'Interior Concept', 'Residential'],
    tool:        'Runway',
    src:         '/videos/video-casa-planos.mp4',
    thumbnail:   '/thumbnails/video-casa-planos.jpg',
    placeholder: 'linear-gradient(135deg, #111418 0%, #090c10 55%, #020304 100%)',
  },
  {
    slug:        'video-piscina',
    title:       'Pool Scene — Luz y Agua',
    description: 'Escena exterior junto a piscina. Reflexiones de luz sobre el agua, geometría del espacio y calma visual. Producción para resort premium.',
    duration:    '0:28',
    year:        2026,
    tags:        ['Pool Scene', 'Hospitality Film', 'Exterior'],
    tool:        'Higgsfield',
    src:         '/videos/video-piscina.mp4',
    thumbnail:   '/thumbnails/video-piscina.jpg',
    placeholder: 'linear-gradient(135deg, #051824 0%, #030e18 55%, #010508 100%)',
  },
  {
    slug:        'video-casa-atico',
    title:       'Ático — Penthouse Study',
    description: 'Residencia de lujo en planta ático. Espacios abiertos, materiales nobles y luz natural filtrada. Concepto de interiorismo generado con IA.',
    duration:    '0:52',
    year:        2026,
    tags:        ['Interior Concept', 'Architecture AI', 'Luxury'],
    tool:        'Kling',
    src:         '/videos/video-casa-atico.mp4',
    thumbnail:   '/thumbnails/video-casa-atico.jpg',
    placeholder: 'linear-gradient(135deg, #1a1208 0%, #0e0b04 55%, #030201 100%)',
  },
  {
    slug:        'video-zapatillas',
    title:       'Footwear — Motion Study',
    description: 'Producción de producto para zapatillas. Movimiento, materiales y detalle extremo generados fotograma a fotograma con IA generativa.',
    duration:    '0:48',
    year:        2026,
    tags:        ['Sneaker Product', 'Product Motion', 'Detail'],
    tool:        'Runway',
    src:         '/videos/video-zapatillas.mp4',
    thumbnail:   '/thumbnails/video-zapatillas.jpg',
    placeholder: 'linear-gradient(135deg, #141414 0%, #0a0a0a 55%, #020202 100%)',
  },
  {
    slug:        'video-zapas-palntilla',
    title:       'Sneaker — Design Template',
    description: 'Exploración de plantilla de diseño para calzado deportivo. Estructura, materiales y silueta analizados con visión generativa.',
    duration:    '0:52',
    year:        2026,
    tags:        ['Sneaker Product', 'Product Motion', 'Design'],
    tool:        'Pika',
    src:         '/videos/video-zapas-palntilla.mp4',
    thumbnail:   '/thumbnails/video-zapas-palntilla.jpg',
    placeholder: 'linear-gradient(135deg, #0f1218 0%, #080a0e 55%, #020304 100%)',
  },
  {
    slug:        'zapatillas-color',
    title:       'Sneaker — Color Edition',
    description: 'Estudio cromático de zapatillas. Color como protagonista. Cada variante es una decisión visual generada con inteligencia artificial.',
    duration:    '0:38',
    year:        2026,
    tags:        ['Sneaker Product', 'Product Motion', 'Color'],
    tool:        'Pika',
    src:         '/videos/zapatillas-color.mp4',
    thumbnail:   '/thumbnails/zapatillas-color.jpg',
    placeholder: 'linear-gradient(135deg, #1a0d18 0%, #0e070c 55%, #030102 100%)',
  },
]

export const featuredVideo = videos.find(v => v.featured) ?? videos[0]
