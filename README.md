# 🚀 Portfolio de Valérian Vandercamme

> **Développeur .NET Full-Stack** passionné qui transforme les idées en solutions élégantes

[![Portfolio](https://img.shields.io/badge/Portfolio-Live-success?style=for-the-badge)](https://valerian-portfolio.com)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-95%2B-green?style=for-the-badge)](https://developers.google.com/web/tools/lighthouse)
[![Mobile Friendly](https://img.shields.io/badge/Mobile-Friendly-blue?style=for-the-badge)](https://search.google.com/test/mobile-friendly)

## ✨ Aperçu

Portfolio minimaliste mais impactant présentant mes compétences en développement .NET/Full-Stack, mes projets en production et mon parcours atypique d'entrepreneur devenu développeur.

### 🎯 Objectifs
- Présenter mes projets de manière engageante
- Démontrer mes compétences techniques
- Faciliter le contact avec les recruteurs
- Offrir une expérience utilisateur mémorable

## 🛠️ Stack Technique

### Frontend
- **HTML5** - Structure sémantique
- **CSS3** - Design moderne avec variables CSS
- **JavaScript Vanilla** - Performances optimales
- **Responsive Design** - Mobile-first approach

### Design & UX
- **Thème sombre** par défaut avec toggle light/dark
- **Animations CSS** fluides et performantes
- **Curseur personnalisé** sur desktop
- **Micro-interactions** sur tous les éléments

### Performance
- **Lighthouse Score 95+**
- **Lazy loading** des images
- **Optimisation des ressources**
- **Service Worker** pour la mise en cache

## 📱 Fonctionnalités

### 🎨 Interface
- [x] **Hero Section** avec terminal interactif
- [x] **Animation de typing** pour les titres
- [x] **Effet Matrix** subtil en arrière-plan
- [x] **Cards 3D** avec effets hover
- [x] **Timeline** interactive pour l'expérience
- [x] **Formulaire de contact** fonctionnel

### 🎮 Interactions
- [x] **Smooth scrolling** entre sections
- [x] **Navigation highlight** automatique
- [x] **Barres de progression** animées pour les skills
- [x] **Compteurs animés** pour les statistiques
- [x] **Filtres** pour les projets
- [x] **Easter egg** (Konami Code)

### 📊 Performance
- [x] **Intersection Observer** pour les animations
- [x] **Throttling** des événements scroll
- [x] **Preload** des ressources critiques
- [x] **Images responsives** avec srcset
- [x] **Code splitting** et optimisation

## 🎯 Sections

### 1. **Hero Section**
- Titre animé avec effet de machine à écrire
- Terminal interactif avec commandes simulées
- Boutons d'action vers projets et contact
- Liens sociaux avec animations hover

### 2. **À propos**
- Présentation du parcours atypique
- Métriques animées (années d'exp, projets, satisfaction)
- Points forts avec icônes et micro-animations

### 3. **Compétences**
- Groupées par catégories (Backend, Frontend, DevOps)
- Barres de progression animées au scroll
- Icônes pour chaque technologie
- Hover effects sur chaque skill

### 4. **Projets**
- **5 projets** chargés depuis les README
- **Système de filtres** par catégorie
- **Cards interactives** avec effets 3D
- **Liens GitHub/Demo** pour chaque projet

### 5. **Expérience**
- **Timeline verticale** responsive
- **Points clés** du parcours professionnel
- **Technologies utilisées** par période
- **Certifications** avec icônes

### 6. **Contact**
- **Informations** de contact stylisées
- **Formulaire** avec validation
- **Statut de disponibilité** en temps réel
- **Liens directs** vers les réseaux

## 🚀 Installation et Démarrage

### Prérequis
- Navigateur moderne (Chrome, Firefox, Safari, Edge)
- Serveur local pour éviter les erreurs CORS

### Installation rapide

```bash
# 1. Cloner le repository
git clone https://github.com/valerian-vandercamme/portfolio.git
cd portfolio

# 2. Démarrer un serveur local
# Option A: Python
python -m http.server 8000

# Option B: Node.js (live-server)
npx live-server

# Option C: VS Code Live Server extension
# Clic droit sur index.html > "Open with Live Server"

# 3. Ouvrir dans le navigateur
# http://localhost:8000
```

### Structure du projet

```
portfolio/
├── index.html              # Page principale
├── styles.css              # Styles CSS
├── scripts.js              # Logique JavaScript
├── README.md               # Documentation
├── assets/                 # Ressources statiques
│   ├── images/            # Images et icônes
│   ├── fonts/             # Polices personnalisées
│   └── sounds/            # Effets sonores
└── README/                # README des projets
    ├── README DocuSync.md
    ├── README cfo portal.md
    └── ...
```

## 🎮 Easter Eggs

### Konami Code
Tapez la séquence : `↑ ↑ ↓ ↓ ← → ← → B A`

Déclenche un modal spécial avec effet Matrix et message personnalisé.

### Terminal Interactif
Le terminal dans la hero section exécute automatiquement des commandes réalistes :
- `whoami` - Identité
- `ls -la` - Structure du portfolio
- `cat skills.txt` - Liste des compétences
- `grep -r "passion"` - Recherche dans les fichiers

## 📊 Performance & SEO

### Optimisations
- **Lighthouse Score**: 95+ (Performance, Accessibility, SEO)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

### SEO
- Meta tags optimisés
- Open Graph pour les réseaux sociaux
- Schema.org markup
- Sitemap.xml
- Robots.txt

### Accessibilité
- Contraste WCAG AA
- Navigation clavier
- Lecteurs d'écran
- Focus management
- ARIA labels

## 🎨 Personnalisation

### Couleurs
```css
/* Variables CSS dans styles.css */
:root {
  --accent-primary: #00ff88;    /* Vert néon */
  --accent-secondary: #0066ff;  /* Bleu électrique */
  --bg-primary: #0a0a0a;       /* Noir profond */
}
```

### Contenus
1. **Informations personnelles** : Modifier dans `index.html`
2. **Projets** : Ajouter des README dans `/README/`
3. **Expérience** : Éditer la timeline dans `index.html`
4. **Contact** : Mettre à jour les liens et l'email

## 🔧 Intégrations

### Formulaire de contact
- **EmailJS** (recommandé)
- **Netlify Forms**
- **Formspree**
- **API personnalisée**

### Analytics
- **Google Analytics 4**
- **Plausible** (respectueux de la vie privée)
- **Simple Analytics**

### Déploiement
- **GitHub Pages** (gratuit)
- **Netlify** (recommandé)
- **Vercel**
- **Surge.sh**

## 📞 Contact & Support

### Valérian Vandercamme
- **Email**: [valerian.vandercamme@example.com](mailto:valerian.vandercamme@example.com)
- **LinkedIn**: [linkedin.com/in/valerian-vandercamme](https://linkedin.com/in/valerian-vandercamme)
- **GitHub**: [@valerian-vandercamme](https://github.com/valerian-vandercamme)

### Feedback
Vos retours sont précieux ! N'hésitez pas à :
- Ouvrir une **issue** pour signaler un bug
- Proposer des **améliorations**
- Partager vos **suggestions de design**

## 📄 Licence

Ce projet est sous licence **MIT**. Vous êtes libre de l'utiliser comme inspiration pour votre propre portfolio !

---

<div align="center">

**⭐ Si ce portfolio vous plaît, n'hésitez pas à lui donner une étoile !**

*Développé avec passion par [Valérian Vandercamme](https://github.com/valerian-vandercamme)*

</div>