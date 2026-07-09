import fs from 'node:fs';
import path from 'node:path';

export type GuideIcon = {
  id: string;
  label: string;
  file: string;
  publicPath: string;
  category: string;
};

export type GuideIconSection = {
  id: string;
  title: string;
  note?: string;
  layout: 'row' | 'grid';
  icons: GuideIcon[];
};

const GUIDE_ROOT = path.join(process.cwd(), 'guides', 'mascotte');
const PUBLIC_PREFIX = '/guide/mascotte';

function toLabel(filename: string): string {
  return filename
    .replace(/\.svg$/i, '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function iconFromFile(relativePath: string, category: string): GuideIcon {
  const basename = path.basename(relativePath);
  return {
    id: relativePath.replace(/[/\\.]/g, '-'),
    label: toLabel(basename),
    file: relativePath,
    publicPath: `${PUBLIC_PREFIX}/${relativePath}`,
    category,
  };
}

function listSvgsInDir(relativeDir: string, category: string): GuideIcon[] {
  const abs = path.join(GUIDE_ROOT, relativeDir);
  if (!fs.existsSync(abs)) return [];

  return fs
    .readdirSync(abs)
    .filter((f) => f.endsWith('.svg'))
    .sort((a, b) => a.localeCompare(b, 'fr'))
    .map((f) => iconFromFile(path.posix.join(relativeDir, f), category));
}

export function getGuideIconSections(): GuideIconSection[] {
  const baseFiles = [
    '01_base/boleto_base_OFFICIEL.svg',
    '02_icones/boissons/boissons_gobelet_base.svg',
    '02_icones/epicerie/epicerie_panier_base.svg',
    '02_icones/mode/mode_tshirt_base.svg',
  ];

  const sections: GuideIconSection[] = [
    {
      id: 'base',
      title: 'Personnages de base',
      note: 'même forme, même pose',
      layout: 'row',
      icons: baseFiles.map((f) => iconFromFile(f, 'base')),
    },
  ];

  const iconesDir = path.join(GUIDE_ROOT, '02_icones');
  if (fs.existsSync(iconesDir)) {
    const categories = fs
      .readdirSync(iconesDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .sort((a, b) => a.localeCompare(b, 'fr'));

    for (const cat of categories) {
      const all = listSvgsInDir(path.posix.join('02_icones', cat), cat);
      const sceneIcons = all.filter((i) => !i.file.includes('_base'));
      if (sceneIcons.length === 0) continue;

      sections.push({
        id: cat,
        title: cat.charAt(0).toUpperCase() + cat.slice(1),
        layout: 'grid',
        icons: sceneIcons,
      });
    }
  }

  return sections;
}

export function countGuideIcons(sections: GuideIconSection[]): number {
  return sections.reduce((n, s) => n + s.icons.length, 0);
}

export function readGuideMarkdown(relativePath: string): string {
  const abs = path.join(GUIDE_ROOT, relativePath);
  return fs.readFileSync(abs, 'utf-8');
}

export type GuidePrompt = {
  id: 'A' | 'B';
  title: string;
  subtitle: string;
  body: string;
};

export function extractGuidePrompts(markdown: string): GuidePrompt[] {
  const blocks: GuidePrompt[] = [
    {
      id: 'A',
      title: 'Prompt A — Transformation seule',
      subtitle: 'Petites icônes : personnage transformé, debout, sans scène.',
      body: '',
    },
    {
      id: 'B',
      title: 'Prompt B — Scène',
      subtitle: 'Après le Prompt A : mise en scène avec un objet compagnon.',
      body: '',
    },
  ];

  const regex = /## PROMPT ([AB])[\s\S]*?```\n([\s\S]*?)```/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(markdown)) !== null) {
    const id = match[1] as 'A' | 'B';
    const entry = blocks.find((b) => b.id === id);
    if (entry) entry.body = match[2].trim();
  }

  return blocks;
}
