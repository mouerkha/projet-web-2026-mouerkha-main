[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/xg2gE7Y-)
# Énoncé de Projet — CV Personnel Interactif

> **Module :** Programmation Web 2 
> **Niveau :** Licence L2
> **Type :** Projet individuel  
> **Durée :** 3 semaines  
> **Rendu final :** Lien GitHub Pages + dépôt public  ( le lien de dépôt sera publié ultérieurement sur classroom)

---

## 1. Contexte et Objectifs

Dans ce projet, vous allez concevoir et publier votre **CV personnel en ligne** en mobilisant trois technologies complémentaires du développement Web :

- **HTML/CSS** pour la structure et la mise en forme
- **jQuery** pour l'interactivité et la manipulation du DOM
- **ReactJS** pour les composants dynamiques et réutilisables

L'ensemble sera hébergé gratuitement sur **GitHub Pages** et accessible via une URL publique de la forme `https://username.github.io`.

---

## 2. Technologies Requises

| Technologie | Rôle dans le projet | Usage minimum attendu |
|-------------|---------------------|-----------------------|
| **HTML5 / CSS3** | Structure & style de la page | Balises sémantiques, Flexbox/Grid, responsive design |
| **jQuery** | Interactivité DOM | Animations, filtres, onglets, effets de survol |
| **ReactJS** | Composants UI dynamiques | Minimum 3 composants fonctionnels avec props |
| **GitHub Pages** | Hébergement & déploiement | Dépôt public, URL accessible, README documenté |

> L'utilisation d'un framework CSS (Bootstrap, Tailwind…) est **autorisée** mais ne remplace pas les exigences CSS natives attendues.

---

## 3. Contenu Obligatoire du CV

Votre CV doit impérativement contenir les six sections suivantes :

### 3.1 En-tête (Header)
- Photo de profil
- Nom complet
- Titre professionnel / filière de formation
- Coordonnées : email, LinkedIn, GitHub

### 3.2 À propos
- Courte biographie (5 à 8 lignes)
- Description de votre parcours, vos centres d'intérêt et vos aspirations professionnelles

### 3.3 Compétences
- Liste de compétences techniques et personnelles
- Niveaux de maîtrise représentés visuellement (barres de progression, tags, étoiles…)
- **Les niveaux doivent être animés via jQuery** (ex : animation au scroll ou au survol)

### 3.4 Formation
- Parcours académique complet
- Présenté sous forme de **timeline** ou d'**accordéon interactif** (jQuery)

### 3.5 Expériences & Projets
- Minimum **2 projets ou expériences** significatifs
- Chaque projet doit être rendu via un **composant React `<ProjectCard />`**
- Informations attendues : titre, description, technologies utilisées, lien (GitHub ou démo)

### 3.6 Contact
- Formulaire avec les champs : Nom, Email, Message
- **Validation des champs en jQuery** (champs vides, format email)
- Le formulaire peut être implémenté comme un **composant React**

---

## 4. Déploiement sur GitHub Pages

### Étape 1 — Créer le dépôt

Créez un dépôt public GitHub nommé exactement :

```
username.github.io
```

> Remplacez `username` par votre nom d'utilisateur GitHub.

### Étape 2 — Initialiser et pousser le projet

```bash
git init
git add .
git commit -m "init: cv project"
git remote add origin https://github.com/username/username.github.io.git
git push -u origin main
```

### Étape 3 — Activer GitHub Pages

1. Aller dans **Settings** du dépôt
2. Section **Pages** → Source : `main` branch, dossier `/root`
3. Sauvegarder

### Étape 4 — Accéder à votre CV en ligne

Votre CV sera accessible à l'adresse :

```
https://username.github.io
```

>  Le déploiement peut prendre quelques minutes après le premier push.

---

## 5. Ressources Utiles

### Documentation officielle
- [MDN Web Docs — HTML/CSS](https://developer.mozilla.org/fr/)
- [jQuery Documentation](https://api.jquery.com/)
- [React Documentation officielle](https://react.dev/)
- [GitHub Pages — Guide de démarrage](https://pages.github.com/)

### Outils recommandés
- **Éditeur :** VS Code avec extensions HTML/CSS/React
- **Icônes :** Font Awesome, Heroicons (libres de droits)
- **Polices :** Google Fonts
- **Images :** Unsplash, Pexels (libres de droits)

---

## 6. Deadline

|(**date de rendu finale : 13 mai 2026 à 12h00 **) |

---

>  **Conseil :** Commencez par la structure HTML et le style CSS avant d'intégrer jQuery et React. Committez régulièrement pour avoir un historique de travail visible et éviter la perte de données.

---
