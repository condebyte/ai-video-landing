# AI Video Landing

Landing page futurista para mostrar vídeos generados con IA.
Stack: Next.js 15 · TypeScript · Tailwind v4 · Framer Motion · GSAP · Lenis

---

## Inicio rápido

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## Estructura de carpetas

```
assets/
  original-videos/     ← coloca aquí tus .mov originales
public/
  videos/              ← .mp4 convertidos (servidos por Next.js)
  thumbnails/          ← imágenes de portada opcionales
scripts/
  convert-videos.sh    ← convierte .mov → .mp4 web-optimizados
```

---

## Preparar vídeos para web

### 1. Instalar ffmpeg

```bash
brew install ffmpeg
```

### 2. Colocar los originales

Copia tus archivos `.mov` en:

```
assets/original-videos/
```

### 3. Ejecutar la conversión

```bash
./scripts/convert-videos.sh
```

El script convierte cada `.mov` a un `.mp4` web-optimizado en `public/videos/`.
Si un `.mp4` ya existe, lo salta automáticamente.

### Configuración aplicada

| Parámetro         | Valor                        | Motivo                                      |
|-------------------|------------------------------|---------------------------------------------|
| Codec de vídeo    | `libx264`                    | Compatibilidad máxima en navegadores        |
| CRF               | `23`                         | Balance calidad/tamaño (18 = alta, 28 = pequeño) |
| Preset            | `slow`                       | Mejor compresión a igual calidad            |
| Perfil            | `high / level 4.1`           | Compatible con móviles modernos             |
| Resolución máx.   | `1920×1080`                  | Escala hacia abajo si es mayor, no amplia   |
| Pixel format      | `yuv420p`                    | Compatibilidad con Safari/iOS               |
| Audio             | `-an` (eliminado)            | Los vídeos de galería no necesitan audio    |
| Faststart         | `-movflags +faststart`       | El vídeo empieza a reproducirse sin esperar |

### Conversión manual (un archivo)

```bash
ffmpeg -i assets/original-videos/mi-video.mov \
  -c:v libx264 -crf 23 -preset slow \
  -profile:v high -level 4.1 \
  -vf "scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease,format=yuv420p" \
  -an \
  -movflags +faststart \
  public/videos/mi-video.mp4
```

### Ajustar calidad

- **Más calidad / más tamaño** → baja el CRF: `-crf 18`
- **Menos tamaño / menor calidad** → sube el CRF: `-crf 28`
- **Mantener audio** → elimina `-an` del comando
- **Resolución 720p** → cambia `min(1080,ih)` por `min(720,ih)`

---

## Añadir un vídeo a la galería

1. Coloca el `.mp4` en `public/videos/`
2. Añade su entrada en `data/videos.ts`:

```ts
{
  slug:        'nombre-del-video',
  title:       'Título del vídeo',
  description: 'Descripción breve.',
  duration:    '0:30',
  year:        2026,
  tags:        ['hotel', 'arquitectura'],
  tool:        'Higgsfield',
  src:         '/videos/nombre-del-video.mp4',
  thumbnail:   '/thumbnails/nombre-del-video.jpg',  // opcional
  placeholder: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
}
```

3. Si no tienes thumbnail, el campo `placeholder` actúa como fondo de color.

---

## .gitignore recomendado

Añade esto a `.gitignore` para no subir los vídeos al repositorio:

```
assets/original-videos/*.mov
assets/original-videos/*.MOV
public/videos/*.mp4
public/thumbnails/*.jpg
public/thumbnails/*.png
```
