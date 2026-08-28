# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Nature du projet

Prototype de site web **statique** (HTML/CSS + Bootstrap 5). Le dépôt est encore vide au moment de
l'écriture de ce fichier : les conventions ci-dessous sont des règles à appliquer, pas la description
d'un code existant. Mets ce fichier à jour dès que la structure réelle diverge.

Objectif : maquette navigable et démontrable. Prioriser la vitesse d'itération et la lisibilité du
markup sur l'abstraction. Pas de framework JS, pas de backend, pas de données persistées.

## Lancer le prototype

Aucune étape de build. Ouvrir un fichier `.html` directement fonctionne, mais servir en HTTP évite
les problèmes de chemins relatifs et de CORS :

```bash
python3 -m http.server 8000   # puis http://localhost:8000
# ou
npx serve .
```

Il n'y a **pas** de `package.json`, pas de linter et pas de tests. Ne pas inventer de commande
`npm run ...` ni proposer d'en ajouter sans que ce soit demandé.

## Bootstrap 5

- Chargé par **CDN** dans le `<head>` de chaque page (CSS), et le bundle JS
  (`bootstrap.bundle.min.js`, qui inclut Popper) juste avant `</body>`. Les composants interactifs
  (dropdown, modal, offcanvas, collapse, tooltip) ne fonctionnent pas sans ce bundle.
- **Ne jamais modifier de fichier Bootstrap.** Si une version locale de `vendor/` est ajoutée un
  jour, elle reste en lecture seule.
- Composer d'abord avec les **classes utilitaires** (`d-flex`, `gap-3`, `mt-4`, `text-muted`,
  `col-lg-6`…). N'écrire du CSS custom que pour ce que Bootstrap ne couvre pas.
- Personnalisation : surcharger les **variables CSS** Bootstrap (`--bs-primary`, `--bs-body-font-family`,
  `--bs-border-radius`…) dans la feuille custom, plutôt que de dupliquer des règles avec `!important`.
- Grille : `container` > `row` > `col-*`. Ne pas imbriquer une `row` directement dans une `row`.
- Les tooltips et popovers doivent être initialisés manuellement en JS (Bootstrap ne le fait pas seul).

## Structure et conventions

```
index.html          pages à la racine, une par écran de la maquette
assets/css/         style.css = seule feuille custom
assets/js/          main.js = JS d'appoint (init tooltips, petites interactions)
assets/img/
partials/           fragments HTML réutilisables (header, footer) — copiés à la main
content/            contenus rédactionnels en Markdown, à reporter manuellement dans le HTML
                    (voir content/README.md pour les conventions) — non branché au site
```

- Chemins **relatifs** partout (`assets/css/style.css`), jamais absolus (`/assets/...`) : le proto
  doit rester ouvrable depuis le système de fichiers et déployable dans un sous-dossier.
- Pas de moteur de template : le header/footer sont **dupliqués** dans chaque page. Toute
  modification d'un élément commun doit être répercutée sur **toutes** les pages — les chercher avec
  `grep -l` avant d'éditer.
- Nommage des fichiers en `kebab-case`, en français si le reste des pages l'est.
- Classes custom en `kebab-case` avec un préfixe projet (`oli-`) pour ne jamais entrer en collision
  avec une classe Bootstrap.
- HTML en français : `<html lang="fr">`, et le contenu, les libellés et les commentaires suivent.

## À respecter

- Contenu de démo : textes et images réalistes plutôt que du lorem ipsum, mais rien qui puisse être
  pris pour une donnée réelle (pas de vrais noms de clients, de tarifs engageants ou de coordonnées).
- Accessibilité minimale : `alt` sur les images porteuses de sens, hiérarchie `h1`→`h2` cohérente,
  `aria-label` sur les boutons qui n'ont qu'une icône.
- Responsive : vérifier mentalement au moins un breakpoint mobile (`< 768px`) pour chaque écran ajouté.
