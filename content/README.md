# Contenus rédactionnels

Ce dossier n'est **pas** branché au site : il n'y a pas de moteur de rendu qui lit ces fichiers
automatiquement. C'est un espace de rédaction — tu écris ici, puis tu demandes à Claude de reporter
le contenu dans les pages HTML correspondantes (`assets/`, `*.html`), en s'appuyant sur les gabarits
déjà en place (titraille, chapô, signature, filets…).

```
content/
  articles/   un fichier par article de magazine
  pages/      un fichier par page "produit" (OpenLab Connect, entreprises, partenaires…)
```

## `content/articles/*.md`

En-tête YAML + corps en Markdown. Champs :

| Champ | Rôle | Exemple |
|---|---|---|
| `title` | Titre de l'article (`oli-headline`) | `Le titre complet` |
| `rubrique` | Clé de filtrage, une valeur parmi : `industrie`, `territoires`, `recherche`, `financement`, `portraits`, `data` | `industrie` |
| `kicker` | Œilleton affiché au-dessus du titre | `Enquête · Industrie` |
| `auteur` | Nom complet du ou de la signataire | `Camille Ferrand` |
| `initiales` | Pour l'avatar rond | `CF` |
| `temps_lecture` | Durée affichée | `12 min` |
| `numero` | Numéro du magazine concerné (optionnel) | `14` |
| `chapo` | Chapô sous le titre (1 à 3 phrases) | — |

Corps du fichier :
- Le **premier paragraphe** devient la lettrine (`oli-lede`) — pas de balisage particulier requis.
- `## Titre` devient un sous-titre d'article (`h2`).
- `### Titre` devient un intertitre court (petites capitales, `h3`).
- Une citation en exergue s'écrit en blockquote, avec l'attribution sur la dernière ligne précédée
  de `—` :
  ```
  > Une phrase forte qui résume l'idée.
  > — Fonction de la personne citée
  ```
- Listes à puces classiques pour les listes à points.

## `content/pages/*.md`

Même principe, en-tête plus léger (`title`, `kicker`, `chapo`), puis le corps en sections `##`
correspondant aux blocs déjà présents sur la page (ex. « Le constat », « Comment ça marche »,
« Ce que contient la plateforme »). Une liste sous un titre devient en général une grille de cartes
(`oli-feature`) ou une série d'étapes numérotées — précise-le en une ligne si l'un des deux est
souhaité, sinon Claude choisit le gabarit le plus proche de l'existant.

## Ce que ça ne remplace pas

- Les éléments très structurés (grille tarifaire, points de diffusion, formulaires) restent plus
  simples à décrire en langage naturel directement dans la conversation — un fichier Markdown n'a
  pas de bonne façon de représenter un tableau de prix ou une liste de coordonnées GPS.
- Toute mise à jour de contenu doit quand même être répercutée par Claude dans le HTML : rien ici
  n'est lu automatiquement par les pages du prototype.
