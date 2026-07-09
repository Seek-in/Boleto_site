# Boleto — Site vitrine

Site vitrine statique de [Boleto](https://boleto.me), l'app de fidélité ludique pour commerces locaux.

## Stack

- [Astro](https://astro.build) 7 — sortie HTML/CSS/JS statique
- TypeScript
- CSS maison avec design tokens Boleto

## Commandes

```bash
# Installer les dépendances
npm install

# Serveur de développement (http://localhost:4321)
npm run dev

# Build de production → dist/
npm run build

# Prévisualiser le build
npm run preview
```

## Structure

```
src/
├── components/     # Composants réutilisables (UI, layout, commerce, landing, modal)
├── data/           # Données locales (commerces partenaires)
├── layouts/        # Layout principal
├── pages/          # Routes : /, /catalogue, /contact
├── scripts/        # JS client (modales, filtres)
└── styles/         # global.css — design tokens
```

## Déploiement

Le dossier `dist/` est servi en statique par Caddy sur `boleto.me`.

```bash
npm run build
# Copier dist/ vers le serveur
```

## Pages

| Route | Description |
|---|---|
| `/` | Landing — hero, comment ça marche, bénéfices, course au premier |
| `/catalogue` | Grille de commerces partenaires avec filtres et modal détail |
| `/contact` | Formulaire de contact et coordonnées |

## Données commerces

Modifier `src/data/commerces.ts` pour ajouter ou mettre à jour les commerces partenaires.
