# Boleto — Kit de prompts de génération (v5)

Mascotte : **Boleto** · Marque : **Boleto**
L'IA génère **en couleur** (cel-shading plat). On vectorise (Vectorizer.ai, « General use »),
puis je normalise la palette (jaune Boleto exact) et je cale le visage canonique.

---

## ADN de Boleto — règles non négociables

- **Transformation (RÈGLE CENTRALE)** : la **SILHOUETTE du corps prend la FORME RÉELLE de l'objet**
  — comme le ticket devenu **t‑shirt sur cintre** (icône **MODE = LA référence du bon niveau**).
  - ✅ La **forme change vraiment** (contour compris). PAS un rectangle avec juste une texture ou
    des éléments posés dessus → ça donne « rien ne s'est transformé », c'est interdit.
  - ✅ L'**identité Boleto est portée par les ENCOCHES + la perforation**, qui restent TOUJOURS
    visibles **sur la nouvelle forme** (comme les encoches gardées sur le t‑shirt). C'est ça qui
    fait qu'on reconnaît Boleto, PAS le fait de garder un rectangle.
  - Exemples : Boisson → **forme de verre/gobelet** (pas un rectangle rempli de jus) · Café →
    **forme de mug** · Cadeau → forme de **paquet** (pas un ticket avec un ruban posé).
  - Toujours + un petit **univers** de props autour.
  - **INTERDIT ABSOLU** : ticket rectangulaire neutre + accessoires posés à côté.
- **Intérieur violet** : l'intérieur / le dessous / le revers des objets peut être **violet #5B2D91**
  (ex. intérieur d'une cloche) — joli contraste « premium », à utiliser souvent.
- **Signature ticket** : encoche franche + perforation en pointillés.
- **Visage minimal** : deux petits yeux ovales + un sourire fin.
- **Jambes fines terminées par de petites CHAUSSURES VIOLETTES (#5B2D91, SEMELLE BLANCHE, LACETS NOIRS). JAMAIS de bras**
  (interaction avec les pieds).
- **Style** : illustration PLATE et minimaliste façon icône. Contour noir net + **aplats**
  (2 à 3 tons plats max : aplat jaune + une ombre plate bas-droite + un petit reflet plat).
  **INTERDIT** : dégradés, volume réaliste, reflets glossy, rendu 3D, textures détaillées.
  **Pas d'ombre au sol** (ajoutée dans l'app si besoin).

## Couleur — JAUNE dominant + VIOLET en accent

- **Équilibre : ~85-90 % jaune #FFD21F · 5-10 % violet #5B2D91 (accent) · ~5 % noir (contours).**
- Le **violet** est la 2e couleur officielle, toujours **discret mais présent** : chaussures
  violettes (signature), petits accessoires, intérieur de certains objets, reflets lavande très clairs,
  éléments « tech/premium ». Il apporte contraste et profondeur sans jamais voler la vedette au jaune.
- **Univers majoritairement jaune** : les objets compagnons sont souvent jaunes, avec **quelques
  touches violettes** pour le contraste. Éviter les autres couleurs sauf petit accent nécessaire.
- Après vectorisation, je normalise les jaunes (jaune Boleto exact) et les violets (#5B2D91).

> Le bon curseur (validé sur le fromage / croissant) : **gabarit ticket + encoches TOUJOURS gardés**,
> mais la matière/surface du corps devient l'objet. Ni ticket neutre + déco, ni forme qui casse
> l'identité. Toujours une transformation visible et logique.

---

## PROMPT A — SIMPLE (transformation seule, debout, sans histoire)

Pour les petites icônes : juste le personnage transformé, isolé.

```
Crée une illustration de « Boleto », la mascotte de la marque Boleto — le MÊME personnage que l'image de référence attachée — SEUL, centré, debout, de face, sur FOND BLANC PUR. Aucune scène, aucun objet, aucune histoire.

STYLE (strict) :
- Illustration PLATE et minimaliste façon icône. Contour noir net, épaisseur constante, coins arrondis.
- Couleur en APLATS : 2 à 3 tons plats MAXIMUM (aplat jaune + une ombre plate bas-droite + un petit reflet plat haut-gauche).
- INTERDIT : dégradés, volume réaliste, reflets brillants/glossy, rendu 3D, textures détaillées. Simple et épuré. PAS d'ombre au sol.

TRANSFORMATION (le point clé, OBLIGATOIRE) :
- La SILHOUETTE du corps prend la FORME RÉELLE de {OBJET} (le CONTOUR change vraiment), comme le ticket devenu t-shirt sur cintre dans l'icône « Mode » (LA référence). PAS un rectangle avec une texture ou des éléments juste posés dessus (= INTERDIT, ça fait « rien ne s'est transformé »). Les ENCOCHES + la perforation restent visibles SUR cette nouvelle forme — c'est ça qui garde l'identité Boleto, pas le fait de rester un rectangle. On lit « le ticket est devenu {OBJET} » d'un coup d'œil.
- Il garde TOUJOURS : l'encoche franche, la perforation en pointillés, le visage minimal (2 yeux ovales + sourire fin), les petites jambes fines terminées par de petites CHAUSSURES VIOLETTES (#5B2D91, SEMELLE BLANCHE, LACETS NOIRS).
- JAMAIS de bras. Boleto reste JAUNE dominant, avec le violet #5B2D91 en petit accent (chaussures + éventuel petit détail).

POSE (strict) : STRICTEMENT DEBOUT, DE FACE (face à l'objectif), STATIQUE — exactement la même position que le personnage de base. Jambes droites et posées côte à côte. AUCUN mouvement, AUCUNE pose expressive, aucune jambe croisée/levée (ça, c'est réservé aux scènes du Prompt B).

Image carrée haute résolution, aucun texte.
```

> Prompt A = **transformation visible obligatoire** (gabarit ticket gardé) + **pose statique debout de face**.
> Le mouvement et les jambes expressives sont **uniquement** dans le Prompt B (scènes).

## PROMPT B — SCÈNE (il vit une histoire)

⚠️ S'utilise APRÈS le Prompt A : tu attaches **le personnage généré par le Prompt A**
(Boleto déjà transformé en {OBJET}). B ne redécrit PAS la transformation ni l'ADN —
le personnage est fourni en image. B ne décrit que la mise en scène.

```
Tu reçois en image le personnage « Boleto » déjà transformé en {OBJET} (image attachée).
GARDE-LE EXACTEMENT tel quel : même forme, même transformation, même visage, mêmes couleurs, même trait, même style cel-shading plat. Ne le redessine pas, ne change pas ses proportions.

Place-le dans une SCÈNE sur FOND BLANC PUR où il VIT un moment lié à {THÈME} :
- Boleto reste le personnage PRINCIPAL et GRAND — pas noyé dans un groupe, PAS une nature morte.
- Il FAIT une action simple et claire, avec une attitude, et interagit vraiment avec 1 seul objet compagnon (2 max), plus PETIT que lui (avec ses pieds / en s'appuyant / en le regardant).
- PAS d'assiette par défaut, pas de décor chargé, pas d'objets énormes.
- JAMBES EXPRESSIVES (élément d'identité) : placement vivant et un peu marrant — croisées, tendues, une jambe pliée, allongées façon « Voyage », en appui… JAMAIS la pose neutre de face (réservée au personnage de base).
- Boleto garde ses CHAUSSURES VIOLETTES (#5B2D91, SEMELLE BLANCHE, LACETS NOIRS).
- Univers TRÈS JAUNE avec le VIOLET #5B2D91 en accent : les objets compagnons sont majoritairement jaunes, avec quelques touches violettes pour le contraste (accessoires, intérieur d'objet, détail). Éviter les autres couleurs. Certains compagnons portent un mini-visage (2 yeux + sourire) — son univers.
- PAS d'ombre au sol.

Image carrée haute résolution, aucun texte.
```
