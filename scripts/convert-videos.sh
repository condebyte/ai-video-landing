#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# convert-videos.sh
#
# Convierte .mov y .mp4 de assets/original-videos/ a .mp4 web-optimizados
# en public/videos/.  Lee solo la carpeta de origen, nunca la modifica.
# Los .mp4 de origen también se reprocesan con ffmpeg (no se copian tal
# cual) para quedar optimizados para web y con nombre slug limpio.
#
# Uso:
#   ./scripts/convert-videos.sh                    # salta archivos ya convertidos
#   ./scripts/convert-videos.sh --force             # reconvierte aunque ya existan
#   ./scripts/convert-videos.sh --force --with-audio  # reconvierte conservando audio (AAC)
#
# Por defecto los .mp4 se generan sin audio (-an), pensados para previews
# ligeros. Con --with-audio se conserva el audio original re-codificado a
# AAC 160k, compatible con reproducción web.
#
# Requisito: ffmpeg >= 4  (brew install ffmpeg)
# ─────────────────────────────────────────────────────────────────────────────

set -uo pipefail
# Nota: NO usamos -e para poder continuar tras un fallo individual.

# ── Rutas ─────────────────────────────────────────────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

INPUT_DIR="$ROOT_DIR/assets/original-videos"
OUTPUT_DIR="$ROOT_DIR/public/videos"

# ── Opciones ──────────────────────────────────────────────────────────────────

FORCE=false
WITH_AUDIO=false
for arg in "$@"; do
  [[ "$arg" == "--force" ]] && FORCE=true
  [[ "$arg" == "--with-audio" ]] && WITH_AUDIO=true
done

# Argumentos de audio para ffmpeg, según --with-audio
if [ "$WITH_AUDIO" == true ]; then
  AUDIO_ARGS=(-map 0:a:0 -c:a aac -b:a 160k)
else
  AUDIO_ARGS=(-an)
fi

# ── Función: slug limpio ───────────────────────────────────────────────────────
# Convierte nombres con espacios, acentos y caracteres especiales a kebab-case.

to_slug() {
  local name="$1"
  # 1. Minúsculas
  # 2. Sustituir acentos y ñ
  # 3. Eliminar " copia" y " copy" (sufijo macOS)
  # 4. Reemplazar espacios y guiones bajos por guiones
  # 5. Eliminar caracteres no ASCII ni alfanuméricos
  # 6. Colapsar guiones múltiples
  # 7. Quitar guiones al inicio/final
  echo "$name" \
    | tr '[:upper:]' '[:lower:]' \
    | sed 's/á/a/g; s/é/e/g; s/í/i/g; s/ó/o/g; s/ú/u/g; s/ü/u/g; s/ñ/n/g' \
    | sed 's/ copia$//; s/ copy$//' \
    | sed 's/[_ ]/-/g' \
    | sed 's/[^a-z0-9-]//g' \
    | sed 's/-\{2,\}/-/g' \
    | sed 's/^-//; s/-$//'
}

# ── Comprobaciones previas ────────────────────────────────────────────────────

if ! command -v ffmpeg &>/dev/null; then
  echo "ERROR: ffmpeg no encontrado."
  echo "       Instálalo con: brew install ffmpeg"
  exit 1
fi

if [ ! -d "$INPUT_DIR" ]; then
  echo "ERROR: Carpeta de origen no existe: $INPUT_DIR"
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

# ── Buscar archivos .mov / .mp4 ────────────────────────────────────────────────

# nullglob evita que el patrón se expanda literalmente si no hay coincidencias
shopt -s nullglob
files=("$INPUT_DIR"/*.mov "$INPUT_DIR"/*.MOV "$INPUT_DIR"/*.mp4 "$INPUT_DIR"/*.MP4)
shopt -u nullglob

if [ ${#files[@]} -eq 0 ]; then
  echo "No se encontraron archivos .mov/.mp4 en:"
  echo "  $INPUT_DIR"
  echo ""
  echo "Coloca tus vídeos originales ahí y vuelve a ejecutar el script."
  exit 0
fi

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║          AI Video Landing — Conversión web           ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""
echo "  Origen:   $INPUT_DIR"
echo "  Destino:  $OUTPUT_DIR"
echo "  Archivos: ${#files[@]} encontrados"
[[ "$FORCE" == true ]] && echo "  Modo:     --force (reconvierte aunque ya existan)"
if [ "$WITH_AUDIO" == true ]; then
  echo "  Audio:    con audio (AAC 160k)"
else
  echo "  Audio:    sin audio (-an, preview ligero)"
fi
echo ""

# ── Contadores ────────────────────────────────────────────────────────────────

count_ok=0
count_skip=0
count_fail=0
failed_files=()

# ── Bucle de conversión ───────────────────────────────────────────────────────

for input in "${files[@]}"; do
  filename="$(basename "$input")"
  name="${filename%.*}"
  slug="$(to_slug "$name")"
  output="$OUTPUT_DIR/${slug}.mp4"

  echo "────────────────────────────────────────────────────────"
  echo "  Origen:  $filename"
  echo "  Destino: ${slug}.mp4"

  # Skip si ya existe y no es --force
  if [ -f "$output" ] && [ "$FORCE" == false ]; then
    echo "  Estado:  [SALTADO] — ya existe. Usa --force para reconvertir."
    (( count_skip++ )) || true
    echo ""
    continue
  fi

  # Si --force y el archivo ya existe, informamos
  if [ -f "$output" ] && [ "$FORCE" == true ]; then
    echo "  Aviso:   reconvirtiendo (--force activado)"
  fi

  # Guardamos la ruta del output para poder borrarlo si falla
  output_tmp="$output"

  # Conversión
  #
  # Filtro de escala:
  #   scale='min(1920,iw)':-2
  #   → Escala solo si el ancho supera 1920px. El alto se calcula proporcional
  #     con -2 (garantiza valor par, necesario para yuv420p).
  #   → Funciona con vídeos verticales y horizontales sin deformar.
  #
  # Alternativa si el filtro anterior da error con algún codec:
  #   -vf "scale=1920:1080:force_original_aspect_ratio=decrease,format=yuv420p"
  #
  echo "  Convirtiendo..."

  if ffmpeg \
      -i "$input" \
      -map 0:v:0 \
      -c:v libx264 \
      -crf 23 \
      -preset medium \
      -pix_fmt yuv420p \
      -vf "scale='min(1920,iw)':-2" \
      -movflags +faststart \
      "${AUDIO_ARGS[@]}" \
      -y \
      "$output" \
      2>&1 | grep --line-buffered -E "(frame=|fps=|time=|Error|error|Invalid|Cannot)" ; then

    echo "  Estado:  [OK] → $output"
    (( count_ok++ )) || true

  else
    echo "  Estado:  [FALLIDO] — borrando archivo incompleto si existe"
    # Solo borramos el .mp4 generado en este intento, nunca el original
    [ -f "$output_tmp" ] && rm -f "$output_tmp" && echo "  Limpieza: $output_tmp eliminado"
    failed_files+=("$filename")
    (( count_fail++ )) || true
  fi

  echo ""
done

# ── Resumen final ─────────────────────────────────────────────────────────────

echo "╔══════════════════════════════════════════════════════╗"
echo "║                    Resumen final                     ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""
echo "  ✓ Convertidos: $count_ok"
echo "  → Saltados:    $count_skip"
echo "  ✗ Fallidos:    $count_fail"
echo ""

if [ ${#failed_files[@]} -gt 0 ]; then
  echo "  Archivos fallidos:"
  for f in "${failed_files[@]}"; do
    echo "    - $f"
  done
  echo ""
fi

if [ "$count_ok" -gt 0 ]; then
  echo "  Archivos .mp4 disponibles en:"
  echo "  $OUTPUT_DIR/"
  echo ""
fi

# Código de salida refleja si hubo fallos
[ "$count_fail" -eq 0 ] && exit 0 || exit 1
