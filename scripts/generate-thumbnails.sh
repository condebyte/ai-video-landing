#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# generate-thumbnails.sh
#
# Genera un .jpg por cada .mp4 de public/videos/ en public/thumbnails/.
# Toma el frame del segundo 1.5 del vídeo.
#
# Uso:
#   ./scripts/generate-thumbnails.sh            # salta los que ya existen
#   ./scripts/generate-thumbnails.sh --force    # regenera todos
#
# Requisito: ffmpeg >= 4  (brew install ffmpeg)
# ─────────────────────────────────────────────────────────────────────────────

set -uo pipefail
# Sin -e: un fallo individual no mata el proceso completo.

# ── Rutas absolutas desde la ubicación del script ────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

INPUT_DIR="$ROOT_DIR/public/videos"
OUTPUT_DIR="$ROOT_DIR/public/thumbnails"

FRAME_TIME="1.5"   # segundo del que se extrae el frame

# ── Opciones ──────────────────────────────────────────────────────────────────

FORCE=false
for arg in "$@"; do
  [[ "$arg" == "--force" ]] && FORCE=true
done

# ── Comprobaciones previas ────────────────────────────────────────────────────

if ! command -v ffmpeg &>/dev/null; then
  echo "ERROR: ffmpeg no encontrado."
  echo "       Instálalo con: brew install ffmpeg"
  exit 1
fi

if [ ! -d "$INPUT_DIR" ]; then
  echo "ERROR: Carpeta de vídeos no existe: $INPUT_DIR"
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

# ── Buscar archivos .mp4 ──────────────────────────────────────────────────────

shopt -s nullglob
files=("$INPUT_DIR"/*.mp4 "$INPUT_DIR"/*.MP4)
shopt -u nullglob

if [ ${#files[@]} -eq 0 ]; then
  echo "No se encontraron archivos .mp4 en:"
  echo "  $INPUT_DIR"
  exit 0
fi

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║       AI Video Landing — Generación de thumbnails    ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""
echo "  Origen:   $INPUT_DIR"
echo "  Destino:  $OUTPUT_DIR"
echo "  Frame:    segundo $FRAME_TIME"
echo "  Archivos: ${#files[@]} encontrados"
[[ "$FORCE" == true ]] && echo "  Modo:     --force (regenera aunque ya existan)"
echo ""

# ── Contadores ────────────────────────────────────────────────────────────────

count_ok=0
count_skip=0
count_fail=0
failed_files=()

# ── Bucle principal ───────────────────────────────────────────────────────────

for input in "${files[@]}"; do
  filename="$(basename "$input")"
  name="${filename%.*}"
  output="$OUTPUT_DIR/${name}.jpg"

  echo "────────────────────────────────────────────────────────"
  echo "  Vídeo:     $filename"
  echo "  Thumbnail: ${name}.jpg"

  # Skip si ya existe y no es --force
  if [ -f "$output" ] && [ "$FORCE" == false ]; then
    echo "  Estado:    [SALTADO] — ya existe. Usa --force para regenerar."
    (( count_skip++ )) || true
    echo ""
    continue
  fi

  if [ -f "$output" ] && [ "$FORCE" == true ]; then
    echo "  Aviso:     regenerando (--force activado)"
  fi

  # Extracción del frame
  # -ss antes de -i: seek rápido (no decodifica desde el inicio)
  # -vframes 1: un solo frame
  # -q:v 2: calidad alta (1=máxima, 31=mínima)
  # -update 1: necesario cuando se exporta un único frame a jpg
  if ffmpeg \
      -ss "$FRAME_TIME" \
      -i "$input" \
      -vframes 1 \
      -q:v 2 \
      -update 1 \
      -y \
      "$output" \
      2>&1 | grep --line-buffered -E "(Error|error|Invalid|Cannot|Output)"; then

    if [ -f "$output" ] && [ -s "$output" ]; then
      size=$(du -h "$output" | cut -f1)
      echo "  Estado:    [OK] → ${name}.jpg ($size)"
      (( count_ok++ )) || true
    else
      echo "  Estado:    [FALLIDO] — el archivo generado está vacío"
      [ -f "$output" ] && rm -f "$output"
      failed_files+=("$filename")
      (( count_fail++ )) || true
    fi

  else
    echo "  Estado:    [FALLIDO] — error en ffmpeg"
    [ -f "$output" ] && rm -f "$output" && echo "  Limpieza:  thumbnail incompleto eliminado"
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
echo "  ✓ Generados: $count_ok"
echo "  → Saltados:  $count_skip"
echo "  ✗ Fallidos:  $count_fail"
echo ""

if [ ${#failed_files[@]} -gt 0 ]; then
  echo "  Archivos fallidos:"
  for f in "${failed_files[@]}"; do
    echo "    - $f"
  done
  echo ""
fi

if [ "$count_ok" -gt 0 ]; then
  echo "  Thumbnails disponibles en:"
  echo "  $OUTPUT_DIR/"
  echo ""
fi

[ "$count_fail" -eq 0 ] && exit 0 || exit 1
