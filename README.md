# Coach Virtuel - Votre Assistant Sportif Personnel 🏋️‍♂️

[![Next.js](https://img.shields.io/badge/Next.js-13.0-black.svg)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC.svg)](https://tailwindcss.com/)
[![ShadcnUI](https://img.shields.io/badge/ShadcnUI-Latest-purple.svg)](https://ui.shadcn.com/)

## 📝 Description

Coach Virtuel est une application web moderne qui offre des programmes d'entraînement personnalisés en fonction de vos objectifs, votre niveau et vos contraintes. Propulsée par l'IA, elle génère des recommandations détaillées pour vous aider à atteindre vos objectifs fitness.

## ✨ Fonctionnalités

- 📋 Formulaire de santé et fitness complet
- 🎯 Définition d'objectifs personnalisés
- 💪 Programmes d'entraînement adaptés
- 🥗 Recommandations nutritionnelles
- 📊 Suivi de progression
- 🔄 Interface utilisateur intuitive et réactive

## 🚀 Technologies Utilisées

- **Frontend:**
  - Next.js 13
  - React
  - Tailwind CSS
  - ShadcnUI Components
  - Lucide Icons

- **Backend:**
  - API OpenAI (via Azure)
  - API Routes Next.js

- **Validation & Formulaires:**
  - React Hook Form
  - Zod

## 💻 Installation

1. Clonez le repository :
```bash
git clone https://github.com/Valentin-Droid/coach-coach-coach.git
cd coach-coach-coach
```

2. Installez les dépendances :
```bash
npm install
# ou
yarn install
```

3. Configurez les variables d'environnement :
```bash
cp .env.example .env.local
```
Remplissez les variables suivantes dans votre `.env.local` :
- `GITHUB_TOKEN`: Votre token GitHub

4. Lancez le serveur de développement :
```bash
npm run dev
# ou
yarn dev
```

5. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🏗️ Structure du Projet

```
coach-coach-coach/
├── components/         # Composants React réutilisables
├── hooks/             # Custom hooks React
├── pages/             # Pages de l'application
├── public/            # Assets statiques
└── styles/            # Fichiers de style
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📜 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Auteurs

- [@Valentin-Droid](https://github.com/Valentin-Droid) - Développeur principal
- [@Zowx](https://github.com/Zowx) - Contributeur

## 📞 Support

Pour toute question ou problème, veuillez :
1. Consulter les [Issues GitHub](https://github.com/Valentin-Droid/coach-coach-coach/issues)
2. Ouvrir une nouvelle issue si nécessaire

---

Fait avec ❤️ en France 🇫🇷
