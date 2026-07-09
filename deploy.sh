#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "→ Sync assets guide"
node scripts/sync-guide-assets.mjs

echo "→ Build Astro (dist/)"
npm run build:site

echo "→ Sync vers seek@168.119.165.218:/var/www/boleto/ (sans /guide/)"
rsync -avz --delete --exclude 'guide/' ./dist/ seek@168.119.165.218:/var/www/boleto/

echo "✓ Déployé sur https://boleto.me"
