#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IMAGES_DIR="$ROOT/public/images"
OG_DIR="$IMAGES_DIR/og"
QUALITY=82
HERO_MAX=1920
CONTENT_MAX=1200
LOGO_MAX=400

mkdir -p "$OG_DIR"

optimize_jpeg() {
  local file="$1"
  local max_dim="$2"
  local tmp="${file}.tmp.jpg"

  sips -s format jpeg -s formatOptions "$QUALITY" "$file" --out "$tmp" >/dev/null
  sips -Z "$max_dim" "$tmp" --out "$file" >/dev/null
  rm -f "$tmp"
}

optimize_png() {
  local file="$1"
  local max_dim="$2"

  sips -Z "$max_dim" "$file" --out "$file" >/dev/null
}

create_og() {
  local src="$1"
  local dest="$2"
  local tmp="${dest}.tmp.jpg"

  cp "$src" "$tmp"
  sips -Z 2400 "$tmp" >/dev/null
  sips -c 630 1200 "$tmp" --out "$dest" >/dev/null
  sips -s format jpeg -s formatOptions "$QUALITY" "$dest" --out "$dest" >/dev/null
  rm -f "$tmp"
}

echo "Optimising content and hero images..."

for file in \
  "$IMAGES_DIR/lion.jpeg" \
  "$IMAGES_DIR/about-hero.jpg" \
  "$IMAGES_DIR/services-hero.jpg" \
  "$IMAGES_DIR/mtd-hero.jpg" \
  "$IMAGES_DIR/plants.jpeg" \
  "$IMAGES_DIR/sarah.jpeg" \
  "$IMAGES_DIR/blog-hero.jpg" \
  "$IMAGES_DIR/contact-hero.jpg" \
  "$IMAGES_DIR/pricing-hero.jpg" \
  "$IMAGES_DIR/home-intro.jpg" \
  "$IMAGES_DIR/hmrc-letter.jpeg" \
  "$IMAGES_DIR/dubai-view.jpeg" \
  "$IMAGES_DIR/liverpool-city-1.jpeg" \
  "$IMAGES_DIR/liverpool-city.jpeg" \
  "$IMAGES_DIR/making-tax-digital.jpg" \
  "$IMAGES_DIR/mtd-content.jpg"
do
  if [[ -f "$file" ]]; then
    if [[ "$file" == *"lion"* ]]; then
      optimize_jpeg "$file" "$HERO_MAX"
    else
      optimize_jpeg "$file" "$CONTENT_MAX"
    fi
    echo "  ✓ $(basename "$file")"
  fi
done

echo "Optimising logos..."
optimize_png "$ROOT/public/logo.png" "$LOGO_MAX"
optimize_png "$ROOT/public/logo-light.png" "$LOGO_MAX"
echo "  ✓ logo.png, logo-light.png"

echo "Generating Open Graph images (1200×630)..."
create_og "$IMAGES_DIR/lion.jpeg" "$OG_DIR/default.jpg"
create_og "$IMAGES_DIR/about-hero.jpg" "$OG_DIR/about.jpg"
create_og "$IMAGES_DIR/services-hero.jpg" "$OG_DIR/services.jpg"
create_og "$IMAGES_DIR/hmrc-letter.jpeg" "$OG_DIR/mtd.jpg"
create_og "$IMAGES_DIR/hmrc-letter.jpeg" "$OG_DIR/self-assessment.jpg"
create_og "$IMAGES_DIR/hmrc-letter.jpeg" "$OG_DIR/compliance.jpg"
create_og "$IMAGES_DIR/plants.jpeg" "$OG_DIR/bookkeeping.jpg"
create_og "$IMAGES_DIR/sarah.jpeg" "$OG_DIR/payroll.jpg"
create_og "$IMAGES_DIR/blog-hero.jpg" "$OG_DIR/blog.jpg"
create_og "$IMAGES_DIR/contact-hero.jpg" "$OG_DIR/contact.jpg"
create_og "$IMAGES_DIR/pricing-hero.jpg" "$OG_DIR/pricing.jpg"
create_og "$IMAGES_DIR/making-tax-digital.jpg" "$OG_DIR/blog-what-is-making-tax-digital.jpg"
create_og "$IMAGES_DIR/plants.jpeg" "$OG_DIR/blog-bookkeeping-mistakes.jpg"
create_og "$IMAGES_DIR/mtd-content.jpg" "$OG_DIR/blog-tax-return.jpg"
create_og "$IMAGES_DIR/home-intro.jpg" "$OG_DIR/blog-vat-registration.jpg"
create_og "$IMAGES_DIR/mtd-content.jpg" "$OG_DIR/blog-cloud-accounting.jpg"
echo "  ✓ og/*.jpg"

echo "Done."
