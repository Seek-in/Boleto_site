# Boleto — Mascotte (assets)

Organisation des fichiers de la mascotte Boleto.

```
boleto_mascotte/
├── 00_reference/   Sources : planche de référence (icones_test.png),
│                   ticket de base généré (ticket_logo_ex.png) + vectorisé (.svg)
├── 01_base/        Boleto canonique
│                     boleto_base_couleur.svg     (couleur, cel-shading plat)
│                     boleto_base_contours.svg    (contours noir & blanc)
├── 02_icones/      Icônes par thème (à remplir)
│                     ex: 02_icones/pizza/pizza_couleur.svg
│                         02_icones/pizza/pizza_contours.svg
├── prompts/        boleto_prompts.md (Prompt A perso + Prompt B scène)
└── _archive/       Essais et anciennes versions
```

## Workflow par icône
1. **Prompt A** (+ ticket de base en réf) → génère le perso transformé en {OBJET}.
2. Vectoriser (Vectorizer.ai, « General use ») → `..._couleur.svg`.
3. Me l'envoyer → je normalise le jaune, cale le visage, et sors la version
   `..._contours.svg` (noir & blanc) automatiquement.
4. (option) **Prompt B** (+ le perso de l'étape 1) → la scène « il vit ».

## Règle couleur
Boleto est toujours jaune, univers majoritairement jaune. Chaque icône existe en
2 versions : **couleur** et **contours noir & blanc**.
