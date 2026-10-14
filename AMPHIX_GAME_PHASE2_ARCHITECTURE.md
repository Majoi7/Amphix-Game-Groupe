# AMPHIX GAME — PHASE 2: PRÉPARATION DU BACKEND SMARTNET

## 1. ÉTAT ACTUEL DU PROJET

### Frontend
- **Framework**: React 19 avec Vite
- **Architecture**: Application monopage (SPA) avec routing basé sur le hash (`window.location.hash`)
- **Gestion de l'état**: React hooks useState/useEffect principalement
- **Appels Supabase**: Directs depuis tous les composants via `@supabase/supabase-js`
- **Composants principaux**:
  - `App.tsx` - Point d'entrée avec routage et authentification admin basique
  - `EntryScreen.tsx` - Rejoindre une session avec code de validation
  - `QuizScreen.tsx` - Logique de jeu principale (validation réponses, score, vies)
  - `ArenaScreen.tsx` - Écran de fin de partie
  - `AdminScreen.tsx` - Tableau de bord admin complet
  - `LiveRankingScreen.tsx` - Classement en direct
  - `SQLInstruction.tsx` - Instructions SQL pour mise à jour Supabase

### Supabase
- **Tables existantes**:
  1. `sessions` - Informations sur les sessions de jeu
  2. `players` - Joueurs participants aux sessions
  3. `answers` - Réponses soumises par les joueurs
- **Colonnes principales**:
  - `sessions`: id, name, status, duration_seconds, categories, validation_code, unlimited_codes, groups, start_time, initial_points
  - `players`: id, session_id, name, group_name, individual_points, group_score, started_at, finished_at
  - `answers`: id, player_id, question_index, selected_option, is_correct, created_at
- **RLS**: Actuellement DÉSACTIVÉ sur toutes les tables (per SQLInstruction.tsx lignes 44-46)
- **Publication Realtime**: `supabase_realtime` active sur les 3 tables
- **Extension**: `uuid-ossp` pour les UUID générés automatiquement

### Données des Questions
- Fichier statique: `src/data/questions.ts`
- 92 questions couvrant: suites, séries, équations différentielles
- Structure: `{ id, category, text, options[], correctIndex }`

## 2. ARCHITECTURE ACTUELLE

```text
                    AMPHIX GAME (ACTUEL)
                         │
                  Frontend React
                         │
                         ▼
                Supabase Direct
                         │
                   (Tables: sessions, players, answers)
```

**Flux de données actuels**:
1. Authentification admin: React → vérification directe du mot de passe en dur
2. Création session: React → INSERT direct dans table `sessions`
3. Validation code: React → SELECT direct depuis table `sessions`
4. Lancement quiz: React → SELECT questions depuis fichier local + état local
5. Validation réponse: React → vérification locale correctIndex → INSERT dans `answers` + UPDATE dans `players`
6. Classement: React → SELECT/aggregation directe depuis tables `players` et `sessions`
7. Admin dashboard: React → lectures/écritures directes sur toutes les tables

## 3. ARCHITECTURE CIBLE

```text
                    AMPHIX GAME (CIBLE)
                         │
                  Frontend React
                         │
                         ▼
                 Backend Smartnet
                         │
                         ▼
                     Supabase
                         │
                   (Tables: sessions, players, answers, ...)
```

**Flux de données futurs**:
1. Authentification admin: React → Smartnet (/api/admin/login) → vérification serveur → session sécurisée
2. Création session: React → Smartnet → validation → INSERT dans Supabase
3. Validation code: React → Smartnet → vérification → réponse autorisation/refus
4. Lancement quiz: React → Smartnet → récupération questions depuis banque sécurisée
5. Validation réponse: React → Smartnet → validation + calcul score/vies → écriture Supabase
6. Classement: React → Smartnet → agrégations sécurisées → réponse optimisée
7. Admin dashboard: React → Smartnet → toutes opérations via API sécurisée

## 4. OPÉRATIONS SENSIBLES À MIGRER VERS SMARTNET

### A — Lecture Publique (Peut rester en direct ou via cache)
- Questions disponibles (depuis fichier sécurisé ou API)
- Informations publiques sur les niveaux/matières
- Statistiques globales non sensibles

### B — Lecture Authentifiée
- Session d'un joueur spécifique
- Historique personnel de jeu
- Détails d'une session auxquelles le joueur participe

### C — Opérations Sensibles (Doivent passer par Smartnet)

| Opération | Où se trouve actuellement | Pourquoi passer par Smartnet | Priorité |
|-----------|---------------------------|------------------------------|----------|
| **Connexion admin** | `App.tsx:10-17` (mot de passe en dur) | Éviter exposition du mot de passe, permettre authentification forte | ★★★★★ |
| **Création de questions** | Fichier statique `src/data/questions.ts` | Centraliser la banque, éviter accès direct frontend, permettre import massif | ★★★★★ |
| **Modification/suppression de questions** | N/A (pas d'interface actuelle) | Nécessaire pour gestion dynamique de la banque | ★★★★☆ |
| **Import massif de questions** | N/A | Fonctionnalité exigée par l'utilisateur | ★★★★★ |
| **Création de niveaux/matières** | `AdminScreen.tsx` (state local uniquement) | Persistance, partage entre admins, cohérence | ★★★★☆ |
| **Validation d'invitation** | `EntryScreen.tsx` (vérification directe Supabase) | Centraliser logique, prévenir abus, ajouter taux de rafraîchissement | ★★★★★ |
| **Rejoindre une session** | `EntryScreen.tsx` (validation code directe) | Ajouter logique métier (limites, dates, etc.) | ★★★★★ |
| **Soumission d'une réponse** | `QuizScreen.tsx:1236-1246` (INSERT/UPDATE direct) | Séparer logique de jeu de l'accès données, prévenir triche | ★★★★★ |
| **Calcul du score** | `QuizScreen.tsx:1214` (+10 pts) | Centraliser règles de jeu, permettre évolution sans mise à jour frontend | ★★★★☆ |
| **Modification des vies** | `QuizScreen.tsx:1216,1224` (-1/+1 vie) | Même raison que score | ★★★★☆ |
| **Élimination d'un joueur** | `QuizScreen.tsx:1251-1253` (vérif individual_points===0) | Centraliser logique de fin de partie | ★★★★☆ |
| **Gestion d'une partie multiplayer** | Diverses vérifications réparties | Assurer cohérence, prévenir conditions de course | ★★★★★ |
| **Création/gestion de sessions** | `AdminScreen.tsx:268-296` (startSession) | Centraliser validation, ajouter métriques, limiter abus | ★★★★☆ |
| **Mise à jour du classement** | `LiveRankingScreen.tsx` (aggrégation directe) | Optimiser performances, réduire charge Supabase | ★★★★☆ |

## 5. CONTRAINTES SMARTNET À VÉRIFIER

Avant de choisir l'architecture backend, il faut vérifier auprès de Smartnet:

- `Node.js disponible ?` À vérifier sur Smartnet
- `version Node.js ?` À vérifier sur Smartnet
- `npm disponible ?` À vérifier sur Smartnet
- `SSH ?` À vérifier sur Smartnet
- `processus persistants ?` À vérifier sur Smartnet
- `PM2 ou équivalent ?` À vérifier sur Smartnet
- `variables d'environnement ?` À vérifier sur Smartnet
- `HTTPS ?` À vérifier sur Smartnet
- `domaine ou sous-domaine ?` À vérifier sur Smartnet
- `reverse proxy ?` À vérifier sur Smartnet
- `WebSocket ?` À vérifier sur Smartnet
- `ports disponibles ?` À vérifier sur Smartnet
- `déploiement Git possible ?` À vérifier sur Smartnet
- `cron/jobs ?` À vérifier sur Smartnet
- `limites CPU/RAM ?` À vérifier sur Smartnet
- `possibilité de faire tourner une API Node.js en permanence ?` À vérifier sur Smartnet

## 6. ARCHITECTURE BACKEND SMARTNET PROPOSÉE

En supposant que Smartnet supporte un environnement Node.js moderne (à vérifier):

```text
Smartnet
   │
   └── Node.js (≥18.x recommandé)
          │
          ├── HTTP Server (Express.js ou équivalent)
          │
          ├── API Routes
          │   ├── /api/admin/*          # Routes administrateur
          │   ├── /api/game/*           # Routes de jeu
          │   ├── /api/questions/*      # Routes gestion questions
          │   ├── /api/sessions/*       # Routes gestion sessions
          │   └── /api/auth/*           # Routes authentification
          │
          ├── Services
          │   ├── AuthService           # Gestion authentification admin
          │   ├── GameService           # Logique de jeu (score, vies, éliminations)
          │   ├── QuestionService       # Banque de questions
          │   ├── SessionService        # Gestion des sessions
          │   └── InvitationService     # Gestion des invitations/codes
          │
          ├── Middleware
          │   ├── AuthMiddleware        # Vérification JWT/session
          │   ├── ValidationMiddleware  # Validation des données d'entrée
          │   └── RateLimitMiddleware   # Prévention des abus
          │
          ├── Supabase Client           # Instance unique configurée avec service_role
          │
          └── Utils
              ├── PasswordUtils         # Hashage/vérification mots de passe
              └── DateUtils             # Gestion des temps et durée
```

**Point crucial**: La clé `service_role` Supabase **DOIT** rester exclusivement côté backend et ne **JAMAIS** être exposée au frontend.

## 7. CONTRAT API PROPOSÉ

### AUTHENTIFICATION
```text
POST   /api/admin/login
  • Role: Authentification administrateur
  • Utilisateur: Admin
  • Données envoyées: { password: string }
  • Données retournées: { token: string, expiresIn: number }
  • Authentification nécessaire: Non (c'est l'endpoint d'authentification)
  • Opération Supabase correspondante: Lecture de la hash du mot de passe admin (à stocker en variable d'environnement sécurisée)
  • Risque de sécurité: Mitigé par utilisation de HTTP-only cookies ou JWT court avec refresh
```

### GESTION DES QUESTIONS
```text
GET    /api/questions
  • Role: Récupération de questions pour une session
  • Utilisateur: Joueur en cours de jeu
  • Données envoyées: { sessionId: string, categories?: string[], limit?: number }
  • Données retournées: [{ id, text, options[] }]  // NOTICE: correctIndex exclu pour sécurité
  • Authentification nécessaire: Oui (token joueur ou session valide)
  • Opération Supabase correspondante: Aucune (questions depuis cache/service sécurisé)
  • Risque de sécurité: Faible (pas de bonne réponse exposée)

POST   /api/admin/questions
  • Role: Création d'une nouvelle question
  • Utilisateur: Administrateur
  • Données envoyées: { category: string, text: string, options: string[], correctIndex: number }
  • Données retournées: { id: number }
  • Authentification nécessaire: Oui (token admin)
  • Opération Supabase correspondante: INSERT dans table personnalisée `questions` (à créer)
  • Risque de sécurité: Moyen (nécessite validation des entrées)

POST   /api/admin/questions/import
  • Role: Import massif de questions depuis fichier
  • Utilisateur: Administrateur
  • Données envoyées: File (CSV/JSON/XLSX) avec métadonnées
  • Données retournées: { imported: number, errors: [{line: number, message: string}] }
  • Authentification nécessaire: Oui (token admin)
  • Opération Supabase correspondante: INSERT en lot dans table `questions`
  • Risque de sécurité: Moyen à élevé (dépend du format accepté - privilégier JSON structuré)

GET    /api/questions/bank
  • Role: Consultation de la banque de questions (admin seulement)
  • Utilisateur: Administrateur
  • Données envoyées: { filters?: {category:string}, page: number, limit: number }
  • Données retournées: { questions: [{id, category, text, options[], correctIndex, difficulty?: number}], total: number, page: number, limit: number }
  • Authentification nécessaire: Oui (token admin)
  • Opération Supabase correspondante: SELECT depuis table `questions`
  • Risque de sécurité: Faible (accès admin seulement)
```

### GESTION DES SESSIONS ET INVITATIONS
```text
POST   /api/sessions
  • Role: Création d'une nouvelle session de jeu
  • Utilisateur: Administrateur
  • Données envoyées: { 
      duration: number,           // minutes
      categories: string[],       // liste des catégories
      groups: string[],           // liste des groupes
      initialPoints: number,      // points de vie initiaux
      validationCodeCount: number // nombre de codes à générer
    }
  • Données retournées: { 
      id: string, 
      validationCodes: string[], 
      unlimitedCode: string|null,
      startTime: string 
    }
  • Authentification nécessaire: Oui (token admin)
  • Opération Supabase correspondante: INSERT dans table `sessions`
  • Risque de sécurité: Faible (validation côté backend)

POST   /api/invitations/:code/join
  • Role: Validation d'un code d'invitation et rejoint la session
  • Utilisateur: Joueur souhaitant rejoindre une partie
  • Données envoyées: { playerName: string, groupName: string|null }
  • Données retournées: { 
      sessionId: string, 
      playerId: string, 
      session: {duration: number, categories: string[], groups: string[]},
      individualPoints: number 
    }
  • Authentification nécessaire: Non (code d'invitation sert d'authentification temporaire)
  • Opération Supabase correspondante: 
      1. Validation du code dans `sessions.validation_code` ou `sessions.unlimited_codes`
      2. INSERT dans table `players` 
      3. UPDATE de `sessions.validation_code` (suppression du code utilisé)
  • Risque de sécurité: Moyen (nécessite protection contre force brute sur les codes)

POST   /api/game/sessions/:sessionId/answer
  • Role: Soumission d'une réponse pour une question
  • Utilisateur: Joueur en cours de jeu
  • Données envoyées: { questionId: number, selectedOption: number }
  • Données retournées: { 
      isCorrect: boolean, 
      scoreChange: number, 
      lifeChange: number,
      consecutiveCorrect: number,
      eliminated: boolean 
    }
  • Authentification nécessaire: Oui (token joueur dérivé du playerId)
  • Opération Supabase correspondante:
      1. INSERT dans table `answers`
      2. UPDATE dans table `players` (score et individual_points)
  • Risque de sécurité: Élevé (c'est ici que se fait la validation - doit être implémenté avec soin)

GET    /api/game/sessions/:sessionId/state
  • Role: Récupération de l'état courant d'une session pour un joueur
  • Utilisateur: Joueur en cours de jeu
  • Données envoyées: { playerId: string }
  • Données retournées: { 
      timeLeft: number,        // secondes restantes
      currentQuestion: {id, text, options[]},
      score: number,
      individualPoints: number,
      consecutiveCorrect: number,
      answeredQuestions: number[]
    }
  • Authentification nécessaire: Oui (token joueur)
  • Opération Supabase correspondante: 
      SELECT depuis `sessions` + `players` + `answers` (jointures optimisées)
  • Risque de sécurité: Faible à moyen (données de jeu limitées)

GET    /api/game/sessions/:sessionId/ranking
  • Role: Récupération du classement d'une session
  • Utilisateur: Joueur ou spectateur
  • Données envoyées: { 
      viewMode: 'active'|'libre',  // pour distinguer sessions normales et Libre
      limit?: number               // optionnel, top N seulement
    }
  • Données retournées: [{ 
      groupName: string, 
      score: number, 
      playerCount: number,
      players: [{name: string, individualPoints: number}] 
    }]
  • Authentification nécessaire: Oui (pour éviter scraping excessif)
  • Opération Supabase correspondante: Agrégation complexe depuis `players` groupés par `group_name`
  • Risque de sécurité: Faible (informations déjà visibles dans l'interface actuelle)
```

### GESTION ADMINISTRATIVE
```text
GET    /api/admin/sessions
  • Role: Liste des sessions actives/recentes
  • Utilisateur: Administrateur
  • Données envoyées: { status?: 'active'|'finished', limit?: number }
  • Données retournées: [{id, name, status, startTime, duration, groups, playerCount}]
  • Authentification nécessaire: Oui (token admin)
  • Opération Supabase correspondante: SELECT depuis table `sessions` avec jointures comptage
  • Risque de sécurité: Faible

POST   /api/admin/sessions/:sessionId/stop
  • Role: Arrêt anticipé d'une session
  • Utilisateur: Administrateur
  • Données envoyées: Aucune
  • Données retournées: { success: boolean }
  • Authentification nécessaire: Oui (token admin)
  • Opération Supabase correspondante: UPDATE `sessions` SET status = 'finished' WHERE id = :sessionId
  • Risque de sécurité: Faible

DELETE   /api/admin/sessions/:sessionId
  • Role: Suppression définitive d'une session et de ses données
  • Utilisateur: Administrateur
  • Données envoyées: Aucune
  • Données retournées: { success: boolean }
  • Authentification nécessaire: Oui (token admin)
  • Opération Supabase correspondante: 
      DELETE FROM `answers` WHERE player_id IN (SELECT id FROM `players` WHERE session_id = :sessionId);
      DELETE FROM `players` WHERE session_id = :sessionId;
      DELETE FROM `sessions` WHERE id = :sessionId;
  • Risque de sécurité: Élevé (suppression définitive - nécessite confirmation)
```

## 8. ARCHITECTURE ADMIN FUTURE

Le futur `/admin` doit permettre progressivement :

```text
/admin

├── Tableau de bord
│   ├── Sessions actives
│   ├── Statistiques globales
│   └── Alertes et notifications
│
├── Niveaux
│   ├── Liste des niveaux disponibles
│   ├── Création/niveau
│   ├── Modification/niveau
│   └── Suppression/niveau
│
├── Matières
│   ├── Liste des matières par niveau
│   ├── Création/matière (liée à un niveau)
│   ├── Modification/matière
│   └── Suppression/matière
│
├── Banque de questions
│   ├── Recherche avancée (par catégorie, difficulté, texte)
│   ├── Création de question
│   ├── Modification de question
│   ├── Suppression de question
│   ├── Visualisation détaillée
│   └── Import massif (CSV/JSON/XLSX avec prévisualisation)
│
├── Invitations
│   ├── Génération de codes
│   ├── Suivi des utilisations
│   ├── Codes illimités (sessions Libre)
│   └── Historique des invitations
│
└── Sessions
    ├── Sessions actives avec détail
    ├── Sessions terminées avec résultats
    ├── Joueurs par session
    ├── Équipes et scores
    └── Classement exportable
```

**Transition depuis l'admin actuel**:
- L'admin actuel (`AdminScreen.tsx`) deviendra un client de cette nouvelle API
- Les états locaux seront remplacés par des données provenant du backend
- Les opérations directes sur Supabase seront remplacées par des appels API
- Le mot de passe admin en dur sera remplacé par une vérification via `/api/admin/login`

## 9. STRATÉGIE D'IMPORT MASSIF DES QUESTIONS

Pour répondre à l'exigence importante d'import massif:

```text
Fichier source (CSV/JSON/XLSX)
       ↓
Upload vers /api/admin/questions/import
       ↓
Prévisualisation (première étape - retourne les 10 premières lignes avec validation)
       ↓
Validation complète (vérifie :
       │   - catégorie inconnue → erreur
       │   - niveau inconnu → erreur (si applicable)
       │   - question vide → erreur
       │   - option manquante → erreur
       │   - réponse correcte invalide → erreur (index hors limites)
       │   - doublon → avertissement (question identique existe déjà)
       │   - format incorrect → erreur
       )
       ↓
Correction (interface permettant de corriger les erreurs ligne par ligne)
       ↓
Import transactionnel (tout ou rien - rollback en cas d'erreur)
       ↓
Questions disponibles dans la banque sécurisée
       ↓
Notification de fin d'import à l'administrateur
```

**Formats recommandés** (par ordre de préférence):
1. **JSON structuré** - Plus sûr, supporte l'imbrication, validation facile
2. **CSV** - Simple mais nécessite une validation stricte du nombre de colonnes
3. **XLSX** - À éviter si possible (complexité de parsing, risques de sécurité)
4. **Copier-coller depuis Excel** - À travers une zone de texte avec parsing délimité par tabulations

**Schéma JSON attendu pour l'import**:
```json
[
  {
    "category": "suites",
    "text": "Question texte ici",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 1,
    "difficulty": 2,  // optionnel: 1=facile, 2=moyen, 3=difficile
    "explanation": "Explication optionnelle de la réponse"
  }
]
```

## 10. MODÈLE FUTUR DES QUESTIONS

Évolution vers un modèle enrichi mais sécurisé:

```text
Niveau (optionnel, pour futur)
   ↓
Matière (liée au niveau)
   ↓
Question
   ├── id: number (UUID ou auto-incrément)
   ├── catégorie: string (ex: "suites", "series", "equa_diff")
   ├── énoncé: string
   ├── option A: string
   ├── option B: string
   ├── option C: string
   ├── option D: string
   ├── bonne réponse: number (0-3 index)  // JAMAIS envoyé au frontend avant réponse
   ├── explication: string|null          // Optionnelle, affichée après réponse
   ├── difficulté: number|null           // 1-3 pour adaptation futur
   └── créé_le: timestamp
```

**Sécurité de la bonne réponse**:
- Le `correctIndex` **NE DOIT JAMAIS** être inclus dans les réponses API destinées au frontend pendant le jeu
- Les endpoints utilisés par le frontend pendant le jeu retournent uniquement: `{ id, text, options[] }`
- La validation et le feedback se font exclusivement via `/api/game/sessions/:sessionId/answer`
- Après réponse, le frontend peut recevoir si besoin l'explication via un endpoint séparé ou inclus dans la réponse de validation

## 11. STRATÉGIE DE MIGRATION DU MOTEUR DE JEU

### Aujourd'hui (Tout frontend)
```text
React
  ↓
valide réponse (local correctIndex comparison)
  ↓
calcule score (+10 si correct)
  ↓
calcule vies (-1 si faux, +1 après 3 corrects consécutifs)
  ↓
écrit Supabase (INSERT answers, UPDATE players)
```

### Objectif (Architecture cible)
```text
React
  ↓
Smartnet (/api/game/sessions/:sessionId/answer)
  ↓
valide réponse (vérification correctIndex sécurisée)
  ↓
calcule score (selon règles configurables)
  ↓
calcule vies (selon règles configurables)
  ↓
Supabase (INSERT answers, UPDATE players)
  ↓
résultat sécurisé vers React
```

### Plan de migration par étapes (sans casser le jeu actuel)

**Phase 2A: Backend minimal + validation**
- Créer backend Smartnet basique
- Implémenter `/api/admin/login` pour remplacer le mot de passe en dur
- Frontend continue tout le reste en local, utilise seulement le nouvel endpoint d'authentification

**Phase 2B: Banque de questions sécurisée**
- Créer table `questions` dans Supabase
- Migrer les questions statiques vers cette table
- Implémenter `/api/questions` (sans correctIndex) pour le chargement des questions
- Frontend utilise maintenant l'API pour obtenir les questions (sans les bonnes réponses)

**Phase 2C: Validation des réponses**
- Implémenter `/api/game/sessions/:sessionId/answer`
- Frontend envoie questionId et selectedOption au lieu de vérifier localement
- Backend vérifie la réponse, calcule score/vies, met à jour Supabase
- Frontend reçoit les changements à appliquer à son état local

**Phase 2C: Score et vies côté serveur**
- Déplacer entièrement les calculs de score et de vies vers le backend
- Le backend retourne le nouvel état complet (score, individualPoints, etc.)
- Frontend ne fait plus aucun calcul, se contente d'appliquer les valeurs retournées

**Phase 2D: Gestion des sessions complète**
- Déplacer création/suppression/arrêt de sessions vers le backend
- Implémenter les endpoints de gestion des sessions
- Frontend ne fait plus d'opérations directes sur la table `sessions`

**Phase 2E: Classement et statistiques**
- Déplacer les agrégations de classement vers le backend
- Optimiser les requêtes pour réduire la charge Supabase
- Mettre en cache les résultats fréquents si nécessaire

**Phase 2F: Import massif et gestion complète des questions**
- Implémenter l'import massif de questions
- Compléter l'interface de gestion de la banque de questions
- Retirer complètement le fichier `src/data/questions.ts`

À chaque phase, il doit être possible de revenir en arrière facilement en cas de problème, car:
1. Le frontend conserve ses capacités locales tant que l'appel API échoue ou retourne une erreur
2. Une bascule de configuration peut permettre d'utiliser soit le backend soit le mode local
3. Les données Supabase restent compatibles avec les deux modes

## 12. STRATÉGIE MULTIPLAYER

Le système actuel possède déjà:
- Groupes (équipes)
- Joueurs
- Scores individuels
- Scores de groupe
- Classement
- Sessions
- Invitations

**Ce qui peut rester tel quel**:
- Structure de base des tables (`sessions`, `players`, `answers`)
- Concept de groupes et de scores de groupe
- Système d'invitations via codes
- Méthode de récupération du classement (à optimiser toutefois)

**Ce qui devra évoluer**:
- **Logique de validation**: Doit être centralisée et atomique pour prévenir les conditions de course
  - Exemple: Deux joueurs soumettant une réponse presque simultanément pour le même slot de code d'invitation
- **Gestion du temps**: Les compteurs doivent être cohérents entre joueurs
  - Solution: Le temps officiel vient du backend, pas du localStorage du joueur
- **Éviter la triche**: Toutes les décisions critiques doivent venir du backend
  - Validation des réponses
  - Attribution des points et des vies
  - Détermination de l'élimination
  - Génération et validation des codes d'invitation

**Approce proposée**:
1. Toutes les mutations d'état critique passent par des transactions Supabase ou des procédures stockées
2. Le backend sérialise les opérations critiques lorsqu'absolument nécessaire
3. Utilisation des fonctionnalités en temps réel de Supabase pour pousser les mises à jour aux joueurs
4. Validation côté backend de chaque action prétendue par un joueur (jamais de confiance aveugle)

## 13. SUPABASE ET RLS - COMPARAISON DES OPTIONS

### Option A: Accès mixte (Frontend limité + Backend complet)
```text
Frontend
  → Supabase directement pour:
      - Lectures publiques non sensibles (ex: liste des catégories disponibles)
      - Abonnements réaltime pour les données déjà filtrées et sécurisées
      - Certaines lectures optimisées si prouvées sûres

Backend
  → Supabase pour toutes les écritures sensibles
  → Supabase pour les lectures nécessitant une logique métier complexe
  → Supabase pour toutes les opérations de modification
```

**Avantages**:
- Certaines lectures peuvent être plus rapides (accès direct)
- Moins de charge sur le backend pour les opérations triviales
- Possibilité d'utiliser les fonctionnalités réaltime de Supabase pour certaines données

**Inconvénients**:
- Complexité accrue de gestion de la sécurité (nécessite définir précisément ce qui peut être accédé directement)
- Risque de fuite de données si les règles RLS sont mal configurées
- Plus difficile à auditer et à maintenir
- Nécessite de maintenir deux modèles d'accès aux données

### Option B: Accès exclusivement via backend (Recommandé)
```text
Frontend
  → Backend uniquement (aucun accès direct à Supabase)

Backend
  → Supabase pour toutes les opérations (lectures ET écritures)
```

**Avantages**:
- Sécurité maximale: aucune clé d'accès Supabase n'atteint le frontend
- Simplicité architecturale: un seul point d'accès aux données
- Plus facile à auditer et à maintenir
- Possibilité d'implémenter des couches de caching sophistiquées
- Meilleure maîtrise des performances et des quotas Supabase
- Évolution plus facile vers d'autres bases de données si nécessaire

**Inconvénients**:
- Légère latence supplémentaire pour toutes les opérations
- Charge accrue sur le backend (mais généralement négligeable pour ce type d'application)
- Nécessité de bien penser les stratégies de caching

**Recommandation**: **Option B** pour Amphix Game, car:
1. L'application n'a pas besoin de performances ultra-élevées
2. La sécurité est la priorité absolue donnée la nature éducative du jeu
3. La simplicité opérationnelle réduit les risques d'erreurs
4. Cela permet une migration progressive plus sûre
5. La clé `service_role` reste totalement sécurisée côté backend

**Important**: Quelle que soit l'option choisie, la clé `service_role` Supabase, si elle est utilisée, devra rester exclusivement côté backend et ne devra JAMAIS être exposée au frontend.

## 14. AUTHENTIFICATION ADMIN

### Remplacement du système actuel:
```text
mot de passe dans React
```

par :

```text
React /admin
      ↓
Smartnet (/api/admin/login)
      ↓
vérification serveur (comparaison de hash bcrypt)
      ↓
session sécurisée (JWT ou cookie httpOnly)
```

**Éléments à proposer**:
- **Stockage du mot de passe**: Hash bcrypt stocké en variable d'environnement sécurisée (`ADMIN_PASSWORD_HASH`)
  - Jamais de mot de passe en clair, même temporairement
  - Le hash est généré une fois et stocké de façon permanente
- **Mécanisme d'authentification**: 
  - JWT court (15-30 min) avec refresh token optionnel
  - OU cookie httpOnly sécurisé (recommandé pour prévenir XSS)
- **Expiration**: Session limitée dans le temps avec renouvellement silencieux
- **Logout**: Invalidation explicite du token/côté serveur
- **Protection des routes**: Middleware qui vérifie la validité de l'authentification sur toutes les routes admin
- **Protection API**: Même mécanisme d'authentification pour toutes les routes sensibles
- **Tentatives échouées**: Limitation du taux pour prévenir les attaques par force brute
- **Audit**: Journalisation des tentatives de connexion (succès et échecs)

**Ne PAS faire**:
- Stocker le mot de passe admin en clair dans aucune variable d'environnement
- Utiliser une authentification basée uniquement sur le frontend
- Exposer quelque forme que ce soit de la clé ou du hash du mot de passe dans le bundle frontend
- Avoir des sessions d'une durée illimitée ou excessivement longue

## 15. RISQUES IDENTIFIÉS

### Risques techniques
1. **Latence supplémentaire**: Chaque interaction jeu nécessite maintenant un aller-retour au backend
   - *Atténuation*: Optimiser les requêtes, utiliser le caching approprié, garder les temps de réponse sous 100ms
   
2. **Point de défaillance unique**: Si le backend tombe, tout le jeu est affecté
   - *Atténuation*: Mettre en place une surveillance appropriée, prévoir des redémarrages automatiques
   
3. **Complexité accrue**: Plus de composants à maintenir et à déployer
   - *Atténuation*: Garder l'architecture aussi simple que possible, bien documenter les interfaces

### Risques de sécurité
1. **Exposition accidentelle de la clé service_role**
   - *Atténuation*: Revues de code régulières, scans de secrets, variables d'environnement protégées
   
2. **Attaques par force brute sur les codes d'invitation**
   - *Atténuation*: Limitation du taux, codes suffisamment longs (6+ chiffres), expiration après utilisation
   
3. **Injection SQL ou NoSQL malgré l'utilisation de Supabase**
   - *Atténuation*: Utiliser les méthodes natives du SDK Supabase, jamais de construction manuelle de requêtes
   
4. **XSS via les questions générées par les utilisateurs**
   - *Atténuation*: Échappement approprié lors de l'affichage, politique de sécurité de contenu (CSP)

### Risques opérationnels
1. **Difficulté de débogage en production**
   - *Atténuation*: Journalisation structurée, niveaux de log appropriés, outils de surveillance
   
2. **Migration complexe nécessitant une fenêtre de maintenance**
   - *Atténuation*: Stratégie de migration par étapes avec possibilité de retour arrière
   
3. **Coût supplémentaire lié à l'hébergement du backend**
   - *Atténuation*: Commencer avec une instance minimale, scaler uniquement si nécessaire

## 16. PLAN DE MIGRATION PAR ÉTAPES

### Phase 2A: Fondation et authentification (Semaine 1)
- [ ] Créer repository backend Smartnet
- [ ] Mettre en place serveur Node.js/Express de base
- [ ] Implémenter `/api/admin/login` avec vérification de hash bcrypt
- [ ] Stocker le hash du mot de passe admin en variable d'environnement sécurisée
- [ ] Modifier `App.tsx` pour utiliser le nouvel endpoint d'authentification
- [ ] Vérifier que l'authentification admin fonctionne comme avant
- [ ] Garder toutes les autres fonctionnalités en mode local frontend

### Phase 2B: Banque de questions sécurisée (Semaine 2)
- [ ] Créer table `questions` dans Supabase avec schéma adapté
- [ ] Migrer les 92 questions actuelles de `src/data/questions.ts` vers cette table
- [ ] Implémenter `/api/questions` endpoint (retourne questions sans correctIndex)
- [ ] Modifier `QuizScreen.tsx` pour récupérer les questions via l'API
- [ ] Vérifier que le chargement des questions fonctionne comme avant
- [ ] Optionnel: Garder `src/data/questions.ts` comme fallback pendant la transition

### Phase 2C: Validation des réponses et logique de jeu (Semaine 3)
- [ ] Implémenter `/api/game/sessions/:sessionId/answer` endpoint
- [ ] Déplacer la validation de réponse (vérification correctIndex) vers le backend
- [ ] Déplacer le calcul de score (+10 points par bonne réponse)
- [ ] Déplacer le calcul de vies (-1 pour mauvaise réponse, +1 après 3 bonnes consécutives)
- [ ] Backend gère les mises à jour Supabase (INSERT answers, UPDATE players)
- [ ] Frontend envoie seulement { questionId, selectedOption } et applique les changements reçus
- [ ] Vérifier que le déroulement du jeu est identique à avant

### Phase 2D: Gestion complète des sessions (Semaine 4)
- [ ] Implémenter les endpoints de gestion des sessions:
  - `/api/sessions` (création)
  - `/api/admin/sessions` (liste)
  - `/api/admin/sessions/:sessionId/stop` (arrêt)
  - `/api/admin/sessions/:sessionId` (suppression)
- [ ] Déplacer la logique de création/suppression d'invitations vers le backend
- [ ] Modifier `AdminScreen.tsx` pour utiliser les nouveaux endpoints
- [ ] Vérifier que la création et gestion de sessions fonctionne comme avant
- [ ] Garder la possibilité de revenir au mode local en cas de problème

### Phase 2E: Classement et optimisations (Semaine 5)
- [ ] Implémenter `/api/game/sessions/:sessionId/ranking` endpoint
- [ ] Déplacer l'agrégation du classement vers le backend
- [ ] Optimiser les requêtes pour de meilleures performances
- [ ] Modifier `LiveRankingScreen.tsx` pour utiliser l'API
- [ ] Vérifier que l'affichage du classement est identique à avant

### Phase 2F: Fonctionnalités avancées et nettoyage (Semaine 6)
- [ ] Implémenter `/api/admin/questions/import` pour l'import massif
- [ ] Créer l'interface de prévisualisation et validation dans l'admin
- [ ] Compléter les fonctionnalités de gestion de la banque de questions (recherche, modification, suppression)
- [ ] Retirer définitivement `src/data/questions.ts`
- [ ] Nettoyer le code frontend des vestiges locaux inutilisés
- [ ] Effectuer des tests de charge et de sécurité complets

### Phase 2G: Polissage et préparation production (Semaine 7)
- [ ] Revue de sécurité complète
- [ ] Tests de pénétration basiques
- [ ] Optimisation des performances finales
- [ ] Documentation complète de l'API
- [ ] Plan de récupération après sinistre
- [ ] Checklist de mise en production

## 17. CRITÈRES DE RÉUSSITE

À la fin de cette phase, je veux uniquement un rapport d'architecture.

Le jeu actuel doit fonctionner exactement comme avant après chaque étape de migration.

Vérifications à effectuer après chaque phase:
- [ ] TypeScript compile sans erreurs
- [ ] Build frontend réussi (`npm run build`)
- [ ] Aucune modification directe de Supabase (en dehors des migrations prévues)
- [ ] Aucune migration de données non planifiée
- [ ] Aucune modification du moteur de jeu visible par l'utilisateur
- [ ] Aucune régression évidente dans les fonctionnalités existantes
- [ ] Les nouvelles fonctionnalités backend sont optionnelles et peuvent être désactivées

## 18. LIVRABLE FINAL

Ce document: `AMPHIX_GAME_PHASE2_ARCHITECTURE.md` contient:
1. État actuel détaillé du projet
2. Architecture actuelle avec flux de données
3. Architecture cible proposée
4. Analyse des opérations sensibles à migrer
5. Contraintes Smartnet à vérifier auprès de l'hébergeur
6. Proposition d'architecture backend Smartnet
7. Contrat API détaillé proposé
8. Vision de l'architecture admin future
9. Stratégie d'import massif des questions
10. Modèle futur des questions sécurisé
11. Stratégie de migration du moteur de jeu par étapes
12. Analyse de la compatibilité multiplayer
13. Comparaison des options Supabase/RLS avec recommandation
14. Plan d'authentification admin sécurisé
15. Risques identifiés et stratégies d'atténuation
16. Plan de migration par étapes sur 7 semaines
17. Critères de réussite pour validation
18. Prochaines actions recommandées

## 19. PROCHAINES ACTIONS RECOMMANDÉES

1. **Vérifier auprès de Smartnet** les contraintes listées en section 5
2. **Choisir la stack technique** basée sur les réponses reçues (Node.js confirmé ou alternative)
3. **Commencer la Phase 2A** dès validation de l'environnement technique
4. **Mettre en place un environnement de développement séparé** pour le backend
5. **Définir les variables d'environnement de sécurité** nécessaires:
   - `ADMIN_PASSWORD_HASH` (hash bcrypt du mot de passe admin)
   - `SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY` (exclusivement backend)
   - `JWT_SECRET` (si utilisant JWT)
   - `NODE_ENV=production`
   - `PORT` (si non fourni par l'hébergeur)
6. **Préparer la stratégie de sauvegarde** avant toute migration de données

---
*Ce rapport d'architecture prépare la transition vers un backend sécurisé sans modifier le fonctionnement actuel du jeu. Chaque étape est conçue pour être réversible afin de minimiser les risques pendant la migration.*