#!/usr/bin/env node
/**
 * Copie les assets du guide (guides/mascotte) vers public/guide/mascotte
 * pour les servir en local (téléchargements, img src).
 * Exclut galerie.html (référence locale lourde, remplacée par /guide/icones).
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'guides', 'mascotte');
const DEST = path.join(ROOT, 'public', 'guide', 'mascotte');

const SKIP = new Set(['galerie.html', '.DS_Store']);

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;

    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (!fs.existsSync(SRC)) {
  console.warn('sync-guide-assets: guides/mascotte introuvable, skip.');
  process.exit(0);
}

fs.rmSync(DEST, { recursive: true, force: true });
copyRecursive(SRC, DEST);
console.log('✓ Guide assets → public/guide/mascotte');
