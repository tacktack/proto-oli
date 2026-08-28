# Open Lab Insight — Prototype

Prototype statique (HTML/CSS + [Bootstrap 5](https://getbootstrap.com/)) du site vitrine et
éditorial d'**Open Lab Insight** ([openlabinsight.io](https://openlabinsight.io)) : présentation de
l'offre OpenLab Connect et espace magazine dans un esprit rédactionnel proche d'un média de presse.

Palette strictement noir / blanc / gris. Contenus et images de substitution (aucune donnée réelle).

## Lancer le prototype

Aucune étape de build. Servir le dossier en HTTP (évite les soucis de chemins relatifs) :

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Pages

| Page | Description |
|---|---|
| `index.html` | Accueil — édito mis en avant, consultation des articles filtrable par rubrique |
| `magazine.html` / `article.html` | Espace magazine — liste des articles et gabarit d'article signé |
| `openlab-connect.html` | Présentation de l'offre OpenLab Connect |
| `entreprises.html` | Offres à destination des entreprises (publicité, partenariat, contenu de marque) |
| `partenaires.html` | Partenaires institutionnels, académiques et industriels |
| `points-de-diffusion.html` | Points de diffusion du magazine papier (carte factice) |
| `kits.html` | Numéro en téléchargement, lecteur interactif, kits téléchargeables, réception du magazine |
| `contact.html` | Formulaire de contact |

## Structure

```
index.html …          pages à la racine, une par écran
assets/css/style.css  feuille de style custom (surcharge Bootstrap)
assets/js/main.js     filtres, validation des formulaires, interactions carte
assets/img/           images de substitution (SVG)
partials/             fragments header/footer — dupliqués manuellement dans chaque page
```

Voir `CLAUDE.md` pour les conventions de développement détaillées.

## Hors périmètre du prototype

Ces fonctionnalités sont matérialisées à l'écran (zones « Hors prototype ») mais non fonctionnelles :

- Téléchargement du PDF du numéro complet et lecteur interactif **Issuu** (abonnement à la charge du client)
- Formulaire de collecte d'adresse postale (envoi gratuit du magazine)
- Inscription à la newsletter (**Mailchimp**, compte Autocycling)
- Carte **Google Maps** des points de diffusion et back-office de gestion des points

Tous les formulaires du prototype valident les champs côté navigateur mais ne transmettent ni
n'enregistrent aucune donnée.
