# FishEye - Plateforme de Photographes

## Présentation du Projet
FishEye est une plateforme web dédiée aux photographes indépendants, permettant de mettre en valeur leurs travaux. Ce projet est un prototype fonctionnel avec un focus particulier sur l'accessibilité.

## Installation et Démarrage
1. Clonez le repository
git clone https://github.com/Sco10969/P6---OpenClassrooms-.git

2. Ouvrez le projet dans VS Code

3. Installez l'extension "Live Server"
   - Cliquez sur l'icône des extensions dans VS Code
   - Recherchez "Live Server"
   - Installez l'extension de Ritwick Dey

4. Lancez le projet
   - Clic sur Go Live en bas à droite de VS Code

## Technologies Utilisées
- HTML5
- CSS3 (avec imports modulaires)
- JavaScript (ES6+)
- Pattern Factory Method
- Architecture modulaire
- Gestion des données via JSON

## Fonctionnalités Clés

### 1. Navigation et Structure
- Page d'accueil avec liste des photographes
- Pages individuelles des photographes
- Navigation accessible au clavier
- Structure HTML sémantique

### 2. Composants Interactifs
- Lightbox pour la visualisation des médias
- Formulaire de contact modal
- Système de likes avec persistance locale
- Menu de tri des médias (popularité, date, titre)

### 3. Accessibilité
- Navigation au clavier complète
- Attributs ARIA
- Support des lecteurs d'écran
- Messages d'état pour les interactions
- Focus management dans les modales

## Architecture Technique

### Structure des Composants
- Components modulaires (photographe, média, likes, etc.)
- Gestion des états avec LocalStorage
- Utilisation du pattern Factory pour les médias
- Système de modales réutilisable

### Performance et Maintenabilité
- Code modulaire et réutilisable
- Gestion optimisée des événements
- Structure CSS organisée par composants
- Utils partagés pour les fonctionnalités communes

## Points Forts du Projet
1. Accessibilité au cœur du développement
2. Architecture modulaire et maintenable
3. Expérience utilisateur fluide
4. Gestion des états cohérente
5. Support complet du clavier

## Démonstration Live
- Navigation au clavier
- Utilisation de la lightbox
- Système de likes
- Formulaire de contact
- Tri des médias
