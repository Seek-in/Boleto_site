# Boleto Site — Notes projet

Documentation pour reprendre le travail sur le site vitrine [boleto.me](https://boleto.me).

## Vue d'ensemble

Site **statique** Astro 7 pour l'app de fidélité locale **Boleto**. Pas de backend : HTML/CSS/JS pur dans `dist/` après build.

| | |
|---|---|
| **Repo local** | `~/Boleto_Site` |
| **Domaine** | https://boleto.me |
| **Serveur** | Hetzner Ubuntu, Caddy (HTTPS) |
| **Dossier serveur** | `/var/www/boleto/` |
| **SSH** | `seek@168.119.165.218` (clé SSH, pas de sudo) |

## Stack

- Astro 7, TypeScript strict
- CSS maison (design tokens dans `src/styles/global.css`)
- Police **Quicksand** (Google Fonts)
- Pas de Tailwind

## Commandes

```bash
npm install          # dépendances
npm run dev          # http://localhost:4321
npm run build        # génère dist/
npm run preview      # prévisualiser le build
npm run deploy       # build + rsync vers le serveur
./deploy.sh          # équivalent shell
```

### Déploiement

```bash
npm run deploy
# = astro build && rsync -avz --delete ./dist/ seek@168.119.165.218:/var/www/boleto/
```

`astro.config.mjs` : `site: 'https://boleto.me'` (URLs canoniques, sitemap).

## Pages et routes

| Route | Fichier | État |
|---|---|---|
| `/` | `src/pages/index.astro` | Landing (hero, comment ça marche, bénéfices, course au premier, CTA) |
| `/catalogue` | `src/pages/catalogue.astro` | Catalogue vide + squelette + empty state |
| `/contact` | `src/pages/contact.astro` | Cartes contact + bloc commerçant + formulaire (single column) |
| `/faq` | `src/pages/faq.astro` | Accordéons FAQ |
| `/telecharger` | `src/pages/telecharger.astro` | Page téléchargement + badges App Store / Play |
| `/carte` | `src/pages/carte.astro` | Carte « bientôt disponible » (label nav : **Maps**) |

## Design system

Palette et tokens dans `src/styles/global.css` :

- Fond crème `#FFF9F0`, blanc `#FFFFFF`, sombre `#241A30`
- Jaune primaire `#FFC93C`, violet `#7E5E8F`
- Texte `#2D2235` / `#6E6376`
- Rayons modérés (`--radius-md` 12px, `--radius-card` 20px) — **pas de grosses pilules** (`999px`)
- **Pas d'emojis** dans l'UI : icônes via `src/components/ui/Icon.astro`
- Logo smiley : SVG jaune (navbar, footer, favicon)

## Navbar (`src/components/layout/Navbar.astro`)

### Desktop (≥ 900px)

- Barre blanche flush en haut, fond crème sous le smiley qui déborde
- Logo centré : « Boleto » + smiley 76px
- Liens ancrés symétriquement depuis le centre du smiley :
  - **Gauche** : Catalogue, Maps (`/carte`)
  - **Droite** : Contact, FAQ
- **Télécharger** : bouton absolu à droite, hors de la grille des liens

### Mobile (< 900px)

- Menu **hamburger** à gauche
- Logo centré (smiley réduit)
- Liens desktop + CTA masqués
- Panneau déroulant : Catalogue, Maps, Contact, FAQ + bouton Télécharger
- Fermeture : clic lien, Échap, ou resize vers desktop

## Composants principaux

```
src/components/
├── layout/       Navbar.astro, Footer.astro
├── ui/           Button, Chip, Badge, Icon, SectionTitle, DownloadBadges
├── landing/      Hero, HowItWorks, Benefits, RaceToFirst, CtaBanner, HowItWorksModal
├── commerce/     CommerceCard, OfferCoupon, CommerceDetail, CatalogueSkeleton, EmptyState
└── modal/        Modal.astro (+ src/scripts/modal.ts)
```

## Données

- `src/data/commerces.ts` — tableau `commerces: []` (vide volontairement)
- Le catalogue affiche un squelette de cartes + message « Pas encore de commerces ici »
- Pour ajouter des commerces : remplir le tableau typé `Commerce[]`

## Favicon

Fichiers dans `public/` :

- `favicon.svg` — smiley vectoriel
- `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png` — fallbacks navigateurs
- `apple-touch-icon.png` — iOS

Liens dans `src/layouts/Layout.astro` avec `?v=2` pour bust cache.

**Note** : les favicons sont très mis en cache. Si changement invisible en prod : supprimer les données du site dans Safari/Chrome pour `boleto.me`, pas seulement Cmd+R.

## Décisions UX déjà validées

- **Contact** : une seule colonne (cartes + formulaire empilés), pas de layout 2 colonnes
- **Hero** : flex `space-between` pour marges gauche/droite symétriques (texte / mockup téléphone)
- **Footer** : 4 colonnes desktop (marque | navigation | légal | téléchargement), compact
- **Catalogue** : label « Maps » (pas « Carte ») dans nav et footer
- Page d'accueil : sections landing OK ; affinements possibles plus tard

## Fichiers racine utiles

| Fichier | Rôle |
|---|---|
| `astro.config.mjs` | Config Astro, `site` URL |
| `package.json` | Scripts dont `deploy` |
| `deploy.sh` | Script deploy alternatif |
| `README.md` | README court |
| `PROJECT.md` | Ce fichier |
| `public/robots.txt` | SEO |

## Pièges connus

1. **Navbar mobile** : ne pas remettre les liens en `position: absolute` sous 900px — chevauchement avec le CTA
2. **Favicon prod** : ancien `favicon.ico` Astro (655 o) vs smiley (1015 o) — vérifier avec `curl -sI https://boleto.me/favicon.ico`
3. **Deploy depuis Cursor** : la clé SSH n'est pas toujours dispo dans l'agent ; l'utilisateur lance `npm run deploy` en local
4. **`--header-height`** dans `global.css` (132px) : approximatif pour le smiley qui déborde ; ajuster si layout header change

## Historique session (jul. 2026)

1. Création projet Astro + design system
2. Pages landing, catalogue, contact, FAQ, télécharger, carte
3. Itérations navbar (liens, espacement smiley, barre sans bande blanche sous l'icône)
4. Contact restauré en single column avec cartes
5. Hero responsive + QR code réaliste dans le mockup téléphone
6. Footer compact 4 colonnes
7. Favicon smiley + PNG/ICO + cache bust
8. Script `deploy` + `deploy.sh`
9. Menu mobile hamburger (cette session)
10. **Guide mascotte local** (`/guide`) — copie de `Boleto_app/boleto_mascotte`, galerie + prompts + téléchargements ; **exclu du deploy prod**

## Guide mascotte (local uniquement)

Copie complète dans `guides/mascotte/` (SVG, prompts, backlog, README…).

| URL locale | Contenu |
|---|---|
| `/guide` | Accueil du guide + workflow Git |
| `/guide/icones` | Galerie (comme `galerie.html`) |
| `/guide/prompts` | `prompts/boleto_prompts.md` |
| `/guide/backlog` | `icones_backlog.md` |
| `/guide/fichiers` | Liste téléchargeable de tous les fichiers |

```bash
npm run dev    # sync assets + serveur → http://localhost:4321/guide
```

- `npm run deploy` exclut `dist/guide/` → **pas sur boleto.me**
- Pour ajouter une icône : déposer un `.svg` dans `guides/mascotte/02_icones/<catégorie>/`, commit, push
- `public/guide/mascotte/` est généré par `scripts/sync-guide-assets.mjs` (gitignored)

## Prochaines étapes possibles

- [ ] Remplir `commerces.ts` avec de vrais partenaires
- [ ] Page carte interactive (Maps)
- [ ] Pages légales (mentions, CGU, confidentialité — liens `#` dans le footer)
- [ ] Affiner la landing si demandé
- [ ] Badges App Store / Play : liens réels quand les apps sont publiées
