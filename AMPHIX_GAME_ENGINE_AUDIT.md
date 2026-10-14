# AMPHIX GAME — AUDIT ET PLAN D'ÉVOLUTION VERS UN BACKEND HÉBERGÉ

## 1. Architecture réelle actuelle et divergences avec l'audit précédent

Après vérification approfondie du dépôt, l'architecture actuelle correspond globalement à l'audit précédent avec quelques précisions importantes :

**Architecture réelle :**
- Frontend : React 19 avec Vite, TypeScript, TailwindCSS
- État global : Gestion centralisée dans App.tsx avec useState et useEffect
- Persistance : Supabase (PostgreSQL) comme unique backend
- Communication : Abonnements temps réel Supabase + requêtes REST périodiques
- Routage : Basé sur le hash URL (#/entry, #/quiz, #/arena, #/admin, #/live-ranking)
- Banque de questions : Fichier statique src/data/questions.ts (92 questions)

**Divergences mineures avec l'audit précédent :**
1. Le composant `LiveRankingScreen` accepte maintenant un paramètre `sessionType` pour distinguer les sessions normales des sessions "Libre"
2. La logique de génération des codes illimités a été améliorée pour créer automatiquement une session Libre si aucune n'existe
3. Le système de détection des joueurs éliminés utilise désormais un délai de 4 secondes avant suppression de l'affichage
4. L'intervalle de rafraîchissement périodique est passé de 10s à 30s pour réduire la charge sur Supabase
5. Les abonnements temps réel conservent un intervalle de secours de 30s (au lieu de 15s mentionné précédemment)

**Fichiers et fonctions exacts responsables :**

### Jeu, scores et vies
- **src/App.tsx** : 
  - `QuizScreen.handleCheck()` : Validation des réponses, calcul du score (+10 pts/bonne réponse), gestion des vies (-1 pour erreur, +1 après 3 bonnes consécutives)
  - `QuizScreen.handleContinue()` : Détermination de l'élimination (0 vies = éliminé)
  - Constante `POINTS_PER_QUESTION = 10` (ligne 11)

### Sessions
- **src/components/AdminScreen.tsx** :
  - `startSession()` : Création de la session dans Supabase avec durée (en secondes), catégories, codes, groupes, points initiaux
  - `stopSession()` : Mise à jour du statut à 'finished'
  - `refresh()` : Synchronisation avec Supabase toutes les 30s + abonnements temps réel

### Administration
- **src/components/AdminScreen.tsx** : Ensemble du composant
  - Gestion des catégories (cases à cocher)
  - Génération et gestion des codes d'accès (usage unique) et illimités (format AMPHIX-XXXX)
  - Configuration des groupes (ajout/suppression)
  - Définition des points initiaux et de la durée
  - Boutons de démarrage/arrêt de session

### Invitations
- Pas de système d'invitations explicite dans le code actuel
- Fonctionnement basé sur les codes d'accès générés par l'admin
- Les sessions "Libre" fonctionnent comme des invitations permanentes avec codes illimités

## 2. Risques de sécurité prioritaires

### Risques critiques
1. **Mot de passe admin en dur** (App.tsx ligne 10) : `const ADMIN_PASSWORD = 'elite';`
   - Exposé directement dans le frontend JavaScript
   - Toute personne inspectant le code peut accéder à l'administration

2. **Clé Supabase anon en dur de secours** (src/lib/supabase.ts lignes 3-4) :
   ```typescript
   const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://gugnlnzrkfkvqlouhhjo.supabase.co';
   const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   ```
   - Valeurs par défaut exposées si variables d'environnement manquantes
   - Permettrait à quiconque d'accéder directement à la base Supabase

3. **Absence de RLS (Row Level Security)** : 
   - SQLInstruction.tsx montre que le RLS est désactivé (lignes 44-46)
   - Aucune politique de sécurité définie pour limiter les accès

4. **Exposition potentielle des bonnes réponses** :
   - Bien que le code actuel ne révèle pas directement les bonnes réponses dans le frontend
   - La structure permet théoriquement qu'une personne malveillante modifie le frontend pour révéler `questions[currentIdx].correctIndex`

### Risques moyens
5. **Attaques par force brute sur les codes d'accès** :
   - Codes à 4 chiffres (1000-9999) = 9000 possibilités
   - Aucune limite de taux ou blocage après échecs multiples

6. **Données transmises en clair** :
   - Bien que Supabase utilise HTTPS, aucune vérification du niveau de TLS ou des en-têtes de sécurité
   - Absence de HSTS, CSP ou autres en-têtes de protection

## 3. Architecture cible recommandée

### Frontend (React/Vite)
- Conserver React 19 et Vite comme base
- Migrer la logique métier critique vers le backend
- Maintenir l'interface utilisateur identique pour préserver l'expérience
- Utiliser des variables d'environnement pour toutes les configurations sensibles
- Implémenter une couche de service pour isoler la logique de jeu du rendu

### Backend (Smartnet hébergé)
**Option Recommandée : Architecture hybride Supabase + fonctions edge**
- **Supabase** : Conserver pour la persistance et les abonnements temps réel
- **Fonctions personnalisées Smartnet** : Pour la logique métier critique nécessitant confidentialité
  - Validation des réponses
  - Calcul des scores et des vies
  - Détermination de l'élimination
  - Vérification des autorisations de session
- **Pourquoi cette approche ?**
  - Minimise les modifications du fonctionnement existant
  - Profite des forces de Supabase (réaltime, auth, stockage)
  - Résout les problèmes de sécurité en déplaçant la logique critique vers un environnement de confiance
  - Compatible avec l'hébergement Smartnet supposé supporter Node.js/Express

### Supabase
- Activer et configurer correctement le RLS (Row Level Security)
- Créer des politiques limitant l'accès selon le rôle (anon, authenticated, service_role)
- Considérer l'utilisation de fonctions Supabase pour certaines logique métier si les fonctions Smartnet ne sont pas immédiatement disponibles

## 4. Schéma de données cible proposé

### Table sessions (ajouts/modifications)
```sql
-- Colonnes existantes à conserver
id uuid PRIMARY KEY
start_time timestamp with time zone
duration_seconds int
status text
categories text
validation_code text
unlimited_codes text
groups text
initial_points int

-- Nouveaux colonnes de configuration
points_per_question int DEFAULT 10
consecutive_for_life int DEFAULT 3  -- Nombre de bonnes réponses consécutives pour gagner une vie
life_on_three_consecutive boolean DEFAULT true  -- Activer/désactiver le système de vies
show_immediate_feedback boolean DEFAULT true  -- Afficher immédiatement si réponse correcte/incorrecte
```

### Table players (ajouts)
```sql
-- Colonnes existantes à conserver
id uuid PRIMARY KEY
session_id uuid REFERENCES sessions(id)
name text
group_name text
individual_points int
group_score int
started_at timestamp with time zone
finished_at timestamp with time zone

-- Nouveaux colonnes de suivi
total_questions_answered int DEFAULT 0
correct_answers int DEFAULT 0
current_streak int DEFAULT 0
best_streak int DEFAULT 0
last_answer_at timestamp with time zone
```

### Table questions (nouvelle - migration depuis le fichier statique)
```sql
id serial PRIMARY KEY
external_id integer NOT NULL  -- Pour maintenir la compatibilité avec les réponses existantes
category varchar(50) NOT NULL
text text NOT NULL
option_a text NOT NULL
option_b text NOT NULL
option_c text NOT NULL
option_d text NOT NULL
correct_index integer NOT NULL CHECK (correct_index BETWEEN 0 AND 3)
difficulty_level varchar(20)  -- facultatif : 'easy', 'medium', 'hard'
explanation text  -- Explication de la bonne réponse
tags text[]  -- Tableau de mots-clés pour recherche/filtrage
is_active boolean DEFAULT true
created_at timestamp with time zone DEFAULT now()
updated_at timestamp with time zone DEFAULT now()
```

### Table answers (modifications pour supporter la nouvelle structure)
```sql
-- Colonnes existantes à conserver
id uuid PRIMARY KEY
player_id uuid REFERENCES players(id)
question_index int  -- Garder pour compatibilité avec les réponses historiques
selected_option int
is_correct boolean
created_at timestamp with time zone

-- Nouvelle colonne référence vers la table questions
question_id integer REFERENCES questions(id)  -- Nouvelle référence forte
```

### Nouveaux tables pour fonctionnalités avancées
```sql
-- Table pour les niveaux académiques
CREATE TABLE academic_levels (
    id serial PRIMARY KEY,
    name varchar(50) NOT NULL UNIQUE,  -- 'L1', 'L2', 'L3', 'M1', etc.
    description text,
    display_order int DEFAULT 0,
    is_active boolean DEFAULT true
);

-- Table pour les matières
CREATE TABLE subjects (
    id serial PRIMARY KEY,
    name varchar(100) NOT NULL,
    academic_level_id int REFERENCES academic_levels(id),
    code varchar(20) UNIQUE,  -- 'MATH101', 'PHYS201', etc.
    description text,
    is_active boolean DEFAULT true
);

-- Association questions-matières (beaucoup-à-beaucoup)
CREATE TABLE question_subjects (
    question_id int REFERENCES questions(id) ON DELETE CASCADE,
    subject_id int REFERENCES subjects(id) ON DELETE CASCADE,
    PRIMARY KEY (question_id, subject_id)
);

-- Table pour les sessions/invitations académiques
CREATE TABLE academic_sessions (
    id serial PRIMARY KEY,
    session_id uuid REFERENCES sessions(id),
    academic_level_id int REFERENCES academic_levels(id),
    subject_ids int[]  -- Tableau des matières autorisées pour cette session
);
```

### Index recommandés
```sql
-- Pour les performances des requêtes fréquentes
CREATE INDEX idx_sessions_status ON sessions(status);
CREATE INDEX idx_players_session_id ON players(session_id);
CREATE INDEX idx_players_individual_points ON players(individual_points);
CREATE INDEX idx_answers_player_id ON answers(player_id);
CREATE INDEX idx_answers_question_index ON answers(question_index);
CREATE INDEX idx_questions_category ON questions(category);
CREATE INDEX idx_questions_difficulty ON questions(difficulty_level);
```

## 5. Variables d'environnement nécessaires

### Frontend (.env.local)
```
VITE_SUPABASE_URL=[URL de votre projet Supabase]
VITE_SUPABASE_ANON_KEY=[Clé anon Supabase]
VITE_SMARTNET_API_URL=[URL de votre API Smartnet si utilisée]
VITE_ADMIN_PASSWORD=[Mot de passe admin sécurisé - NE JAMAIS mettre en dur]
```

### Backend Smartnet (si Node.js/Express)
```
SUPABASE_URL=[URL de votre projet Supabase]
SUPABASE_SERVICE_ROLE_KEY=[Clé service_role Supabase pour opérations privilegiées]
ADMIN_PASSWORD_HASH=[Hash bcrypt du mot de passe admin]
JWT_SECRET=[Secret pour les tokens JWT si authentification personnalisée]
NODE_ENV=production
PORT=[Port d'écoute, typiquement 3001 ou défini par l'hébergeur]
```

### Supabase (à configurier dans l'interface)
- Aucune variable d'environnement traditionnelle, mais configuration via l'interface :
  - Activer l'authentification anonyme si nécessaire
  - Configurer les politiques RLS
  - Définir les paramètres de réaltime

## 6. Vérifications auprès de Smartnet

Avant de choisir la méthode de déploiement, confirmer auprès de Smartnet :

1. **Technologies prises en charge :**
   - Supportent-ils Node.js ? Quelle version (minimale 18.x recommandée) ?
   - Supportent-ils Express.js ou autres frameworks Node.js ?
   - Autorisent-ils l'écoute sur un port spécifique ou fournissent-ils une variable d'environnement PORT ?

2. **Accès et déploiement :**
   - Fournissent-ils un accès SSH pour la gestion directe ?
   - Disposent-ils d'un panneau de contrôle/web pour le déploiement ?
   - Supportent-ils le déploiement via Git (push vers une branche spécifique) ?
   - Autorisent-ils les processus persistants (daemons) ou faut-il utiliser leur gestionnaire de processus ?

3. **Réseau et sécurité :**
   - Fournissent-ils un certificat SSL/TLS gratuit (Let's Encrypt) ?
   - Autorisent-ils la configuration de domaines personnalisés ?
   - Quelles sont les restrictions sur les connexions sortantes (pour accéder à Supabase) ?
   - Journalisent-ils les accès et fournissent-ils des outils de surveillance ?

4. **Base de données et stockage :**
   - Bien que nous utilisions Supabase, confirmer s'ils offrent des alternatives au cas où
   - Autorisent-ils l'accès à des bases externes (comme Supabase) depuis leur environnement ?
   - Quelles sont les limites de bande passante et de stockage ?

5. **Variables d'environnement :**
   - Comment définir les variables d'environnement sécurisées dans leur plateforme ?
   - Fournissent-ils un système de gestion des secrets intégré ?

6. **Scalabilité et performance :**
   - Quelles sont les limites de ressources (CPU, RAM) par instance ?
   - Supportent-ils le scaling horizontal ou vertical ?
   - Offrent-ils des journaux d'accès et des métriques de performance ?

## 7. Stratégie d'importation de questions en masse

### Format de fichier recommandé : CSV avec en-tête
```
external_id,category,text,option_a,option_b,option_c,option_d,correct_index,difficulty_level,explanation,tags
1,suites,"D’après la Définition 1.1, une suite numérique est une application de :","ℝ vers ℕ","ℕ vers ℝ","ℕ vers ℕ","ℝ vers ℝ",1,medium,"Une suite est une application de ℕ vers ℝ","["suites","définition"]"
2,suites,"Dans l’exemple de la suite définie par uₙ = (-1)ⁿ, l’ensemble des valeurs de la suite est :","{0, 1}","{−1, 1}","{−1, 0, 1}"]−1, 1[",1,facile,"L'alternance entre -1 et 1 donne l'ensemble {-1, 1}","["suites","exemple"]"
```

### Bibliothèque d'évaluation : `papaparse` (recommandée)
- Légère, rapide, bien maintenue
- Gère correctement les guillemets, les virgules dans les champs, les sauts de ligne
- Compatible avec React/Vite via import dynamique si nécessaire
- Alternative : `csv-parse` mais légèrement plus lourde

### Processus d'importation recommandé :
1. **Upload du fichier** : Interface admin pour sélectionner le fichier CSV
2. **Validation côté client** : 
   - Vérification de l'en-tête
   - Comptage des lignes
   - Détection préliminaire des erreurs évidentes
3. **Prévisualisation** : Affichage des 5 premières lignes avec possibilité de corriger
4. **Validation côté backend** :
   - Vérification de l'index de bonne réponse (0-3)
   - Vérification que toutes les colonnes obligatoires sont présentes
   - Détection des doublons par `external_id` ou par similarité de texte
   - Validation des catégories contre la liste autorisée
5. **Import transactionnel** : 
   - Utiliser une transaction Supabase ou des requêtes en batch
   - Reporter les lignes réussies vs échouées
   - Fournir un rapport détaillé de l'import
6. **Post-import** : 
   - Option pour ré-essayer les lignes échouées après correction
   - Possibilité de marquer certaines questions comme inactives plutôt que de les supprimer

### Mesures de sécurité pour l'import :
- Limiter la taille du fichier (ex: 5 Mo max)
- Valider le type MIME et l'extension
- Nettoyer les entrées pour éviter les injections (bien que les requêtes paramétrées Supabase protègent déjà)
- Journaliser les tentatives d'import pour audit
- Ne jamais exposer les bonnes réponses dans le frontend pendant ou après l'import

## 8. Plan de migration par phases

### Phase 0 : Préparation (aucune modification du code existant)
**Objectif** : Mettre en place l'infrastructure sans toucher au fonctionnement actuel
**Fichiers concernés** : Aucun (tout est nouveau)
**Changements envisagés** :
- Créer le projet Smartnet (Node.js/Express)
- Configurer la base Supabase avec le nouveau schéma
- Mettre en place les variables d'environnement
- Créer les scripts de migration SQL
**Tests** : Vérifier que la connexion Supabase fonctionne depuis Smartnet
**Risques** : Configuration incorrecte des credentials
**Retour arrière** : Simplement ne pas utiliser les nouvelles ressources

### Phase 1 : Sécurisation de l'accès admin
**Objectif** : Éliminer le mot de passe en dur et sécuriser l'accès administration
**Fichiers concernés** : 
- src/App.tsx (supprimer ADMIN_PASSWORD en dur)
- src/lib/supabase.ts (retirer les valeurs de secours)
**Changements envisagés** :
- Lire le mot de passe admin depuis une variable d'environnement VITE_ADMIN_PASSWORD
- Ajouter une vérification côté backend Smartnet pour les opérations admin sensibles
- Créer une endpoint Smartnet `/api/admin/validate` qui vérifie le mot de passe avec hash
**Tests** : 
- Vérifier que l'accès admin fonctionne avec le nouveau mot de passe
- Confirmer que le mot de passe n'apparaît plus dans le bundle JavaScript
- Tester les scénarios d'échec (mauvais mot de passe, variable manquante)
**Risques** : Blocage de l'accès admin si mauvaise configuration
**Retour arrière** : Remettre temporairement le mot de passe en dur si nécessaire

### Phase 2 : Migration de la logique de validation des réponses
**Objectif** : Déplacer la validation des réponses vers le backend sécurisé
**Fichiers concernés** :
- src/App.tsx : QuizScreen.handleCheck() et fonctions associées
- Création d'endpoints Smartnet : `/api/game/validate-answer`
**Changements envisagés** :
- Le frontend envoie : playerId, questionId, selectedOption
- Le backend vérifie : 
  - Que le joueur appartient bien à la session
  - Que la question existe et est active
  - Que la bonne réponse correspond à l'index enregistré
  - Que le joueur n'a pas déjà répondu à cette question
- Le backend retourne : isCorrect, nouveau score, nouvelles vies, statut d'élimination
- Le frontend met à jour l'interface en fonction de la réponse backend
**Tests** :
- Comparer les résultats avec l'implémentation actuelle pour s'assurer de l'équivalence
- Tester les cas limites (questions inexistantes, joueurs non autorisés, etc.)
- Vérifier la gestion des erreurs réseau
**Risques** : Désynchronisation entre frontend et backend
**Retour arrière** : Basculer vers la logique frontend si le backend échoue

### Phase 3 : Migration du calcul des scores et des vies
**Objectif** : Déplacer le calcul des scores et des vies vers le backend
**Fichiers concernés** : 
- src/App.tsx : logique de mise à jour du score et des vies dans handleCheck()
- src/App.tsx : logique de détection d'élimination dans handleContinue()
**Changements envisagés** :
- Étendre l'endpoint `/api/game/validate-answer` pour retourner l'état complet du joueur
- Le backend effectue tous les calculs : 
  - Score de groupe (+10 par bonne réponse)
  - Vies individuelles (-1 pour erreur, +1 après 3 bonnes consécutives)
  - Détection de l'élimination (0 vies)
  - Mise à jour des séries de bonnes réponses
- Le frontend reçoit l'état complet et le applique directement
**Tests** : 
- Vérifier l'équivalence parfaite avec le calcul frontend actuel
- Tester les scénarios de séries de vies
- Valider la gestion des cas edge (dépassement d'entier, etc.)
**Risques** : Formules de calcul différentes entre frontend et backend
**Retour arrière** : Garder le calcul frontend comme fallback si le backend ne répond pas

### Phase 4 : Gestion des sessions côté backend
**Objectif** : Déplacer la validation d'accès aux sessions vers le backend
**Fichiers concernés** :
- src/components/AdminScreen.tsx : fonctions startSession()/stopSession()
- src/components/EntryScreen.tsx : logique de validation des codes
- src/App.tsx : getActiveSession() et logique de chargement de session
**Changements envisagés** :
- Créer des endpoints Smartnet :
  - `/api/session/start` (admin seulement)
  - `/api/session/stop` (admin seulement)
  - `/api/session/validate-code` (pour l'entrée des joueurs)
  - `/api/session/active` (pour obtenir la session active)
- Le backend vérifie les autorisations et interagit directement avec Supabase
- Le frontend ne fait que présenter l'interface et afficher les résultats
**Tests** :
- Valider que toutes les opérations de session fonctionnent comme avant
- Tester les scénarios de concurrence (plusieurs admins, plusieurs joueurs)
- Vérifier la gestion des erreurs de connexion
**Risques** : Latence supplémentaire pour les opérations de session
**Retour arrière** : Maintenir les appels directs Supabase en parallèle avec fallback

### Phase 5 : Refonte de la banque de questions
**Objectif** : Migrer les questions du fichier statique vers la base de données Supabase
**Fichiers concernés** :
- src/data/questions.ts (à terme supprimé)
- src/App.tsx : logique de filtrage et de mélange des questions
**Changements envisagés** :
- Exporter les questions actuelles depuis questions.ts vers la nouvelle table questions
- Modifier la logique de QuizScreen.useEffect() pour récupérer les questions depuis Supabase
- Implémenter le filtrage par catégories, difficulté, etc.
- Garder le mélange aléatoire côté client pour préserver l'expérience
**Tests** :
- Vérifier que toutes les 92 questions sont présentes avec les mêmes propriétés
- Confirmer que le filtrage par catégories fonctionne identiquement
- Valider que le mélange aléatoire produit une distribution uniforme
**Risques** : Pertes de données ou incompatibilités lors de la migration
**Retour arrière** : Garder le fichier questions.ts comme fallback pendant la transition

### Phase 6 : Fonctionnalités académiques avancées
**Objectif** : Implémenter la gestion des niveaux, matières et invitations académiques
**Fichiers concernés** :
- src/components/AdminScreen.tsx : interface d'administration étendue
- Nouvelles pages/composants pour la gestion des niveaux/matières
**Changements envisagés** :
- Créer l'interface de gestion des niveaux académiques (L1, L2, L3, Master, etc.)
- Créer l'interface de gestion des matières par niveau
- Étendre la création de session pour sélectionner niveau/matière au lieu de catégories simples
- Mettre à jour la logique de filtrage des questions pour utiliser les nouvelles relations
**Tests** :
- Valider que les questions existantes sont correctement associées aux matières
- Tester la création de sessions avec différents niveaux/matières
- Vérifier que le filtrage fonctionne selon les nouvelles dimensions
**Risques** : Complexité accrue de l'interface d'administration
**Retour arrière** : Continuer à utiliser l'ancien système de catégories en parallèle

### Phase 7 : Optimisation et monitoring
**Objectif** : Optimiser les performances et ajouter le monitoring
**Fichiers concernés** : Tous les fichiers touchés précédemment
**Changements envisagés** :
- Ajouter la pagination et le caching là où approprié
- Implémenter le logging des parties importantes pour l'audit
- Ajouter des métriques de performance (temps de réponse, taux d'erreur)
- Optimiser les requêtes Supabase avec les index appropriés
**Tests** : 
- Test de charge avec simulateur de joueurs multiples
- Vérification de l'absence de régressions fonctionnelles
- Validation des temps de réponse acceptables
**Risques** : Sur-optimisation pouvant introduire des bogues
**Retour arrière** : Désactiver progressivement les optimisations si problèmes

## 9. Configurations à effectuer manuellement dans Supabase

Avant le développement, ces configurations doivent être faites manuellement dans l'interface Supabase ou via SQL :

1. **Réactiver le RLS (Row Level Security)** :
   ```sql
   ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
   ALTER TABLE players ENABLE ROW LEVEL SECURITY;
   ALTER TABLE answers ENABLE ROW LEVEL SECURITY;
   -- Répéter pour toutes les nouvelles tables créées
   ```

2. **Créer les politiques RLS de base** :
   ```sql
   -- Politique pour les sessions : lecture publique de toutes les sessions actives
   CREATE POLICY "sessions_select_public" ON sessions
   FOR SELECT USING (status = 'active');
   
   -- Politique pour les sessions : modification réservée au service_role
   CREATE POLICY "sessions_modify_service_role" ON sessions
   FOR ALL USING (auth.role() = 'service_role');
   
   -- Politique pour les joueurs : lecture publique des joueurs de la session
   CREATE POLICY "players_select_public" ON players
   FOR SELECT USING (EXISTS (
     SELECT 1 FROM sessions WHERE id = session_id AND status = 'active'
   ));
   
   -- Politique pour les joueurs : modification réservée au service_role
   CREATE POLICY "players_modify_service_role" ON players
   FOR ALL USING (auth.role() = 'service_role');
   
   -- Politique pour les réponses : lecture publique des réponses
   CREATE POLICY "answers_select_public" ON answers
   FOR SELECT USING (TRUE);
   
   -- Politique pour les réponses : insertion réservée au service_role ou aux joueurs authentifiés
   CREATE POLICY "answers_insert_secure" ON answers
   FOR INSERT WITH CHECK (
     auth.role() = 'service_role' OR 
     (EXISTS (
       SELECT 1 FROM players WHERE id = player_id AND session_id IN (
         SELECT id FROM sessions WHERE status = 'active'
       )
     ))
   );
   ```

3. **Activer la publication réaltime pour toutes les tables** :
   ```sql
   -- Supprimer la publication existante si nécessaire
   DO $$
   BEGIN
     IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
       DROP PUBLICATION supabase_realtime;
     END IF;
   END $$;
   
   -- Créer la nouvelle publication avec toutes les tables
   CREATE PUBLICATION supabase_realtime;
   ALTER PUBLICATION supabase_realtime ADD TABLE sessions, players, answers;
   -- Répéter pour toutes les nouvelles tables créées
   ```

4. **Insérer les données de questions depuis le fichier statique** :
   - Utiliser le fichier CSV généré à partir de questions.ts
   - Ou exécuter un script d'insertion basé sur le contenu du fichier

5. **Configurer l'authentification anonyme** (si nécessaire pour l'accès lecture publique) :
   - Dans l'interface Supabase > Authentication > Settings
   - Activer "Anonymous access" si vos politiques l'exigent
   - Sinon, prévoir une authentification personnalisée via votre backend Smartnet

6. **Définir les limites et alertes** :
   - Configurer les notifications d'utilisation élevée
   - Définir des alertes pour les requêtes lentes ou échouées
   - Mettre en place la sauvegarde régulière si nécessaire

## 10. Décisions nécessitant votre validation

Avant toute modification, les décisions suivantes nécessitent votre validation explicite :

1. **Choix de l'architecture backend** :
   - [ ] Architecture hybride Supabase + fonctions Smartnet (recommandée)
   - [ ] Migration complète vers un backend Smartnet personnalisé
   - [ ] Utilisation exclusive des fonctions Supabase
   - [ ] Autre solution à préciser : _________________________

2. **Niveau de sécurité du mot de passe admin** :
   - [ ] Variable d'environnement simple (moins sécurisé mais plus simple)
   - [ ] Hash bcrypt stocké en variable d'environnement (recommandé)
   - [ ] Authentification multifactorielle (plus complexe mais plus sécurisé)
   - [ ] Intégration avec un fournisseur d'identité externe (OAuth, etc.)

3. **Gestion des codes d'accès** :
   - [ ] Maintenir le système actuel de codes à 4 chiffres
   - [ ] Passer à des codes alphanumériques de 6 caractères minimum
   - [ ] Ajouter une limite de taux et blocage après échecs multiples
   - [ ] Implémenter une expiration temporelle des codes non utilisés

4. **Architecture de la nouvelle banque de questions** :
   - [ ] Schéma proposé avec niveaux académique et matières
   - [ ] Schéma simplifié avec seulement catégories et difficulté
   - [ ] Schéma entièrement plat avec tags de recherche seulement
   - [ ] Autre structure à préciser : _________________________

5. **Stratégie de migration des données historiques** :
   - [ ] Migrer toutes les données existantes vers le nouveau schéma
   - [ ] Maintenir les anciennes tables en parallèle pendant une période de transition
   - [ ] Ne conserver que les données agrégées (statistiques) et repartir à zéro pour les détails
   - [ ] Autre approche à préciser : _________________________

6. **Fonctionnalités à prioriser en phase initiale** :
   - [ ] Sécurisation de l'accès admin (priorité absolue)
   - [ ] Migration de la validation des réponses
   - [ ] Migration du calcul des scores et des vies
   - [ ] Mise en place du RLS et sécurisation de Supabase
   - [ ] Migration de la banque de questions vers Supabase
   - [ ] Implémentation de l'importation en masse de questions
   - [ ] Ajout des fonctionnalités académiques (niveaux/matières)

7. **Seuils et valeurs du jeu à rendre configurables** :
   - [ ] Points par question (actuellement 10 en dur)
   - [ ] Nombre de bonnes réponses consécutives pour gagner une vie (actuellement 3 en dur)
   - [ ] Représentation des vies illimitées (actuellement 1000 en dur)
   - [ ] Durée maximale des sessions
   - [ ] Nombre maximum de joueurs par session
   - [ ] Autres : ________________________________________

## CE QUE LE PROPRIÉTAIRE DOIT CONFIGURER EN PREMIER

### Actions Smartnet à vérifier/confirmer :
- [ ] Confirmation du support Node.js et version minimale
- [ ] Détails sur les méthodes de déploiement disponibles (Git, FTP, panneau web)
- [ ] Informations sur l'accès SSH ou équivalent pour la gestion serveur
- [ ] Confirmation de la possibilité de faire des requêtes sortantes vers Supabase
- [ ] Détails sur la gestion des variables d'environnement sécurisées
- [ ] Politique concernant les processus persistants et les tâches de fond
- [ ] Informations sur les certificats SSL/TLS et les domaines personnalisés
- [ ] Limites de ressources (CPU, RAM, bande passante) par instance

### Actions Supabase à effectuer immédiatement :
- [ ] Réactiver le RLS sur toutes les tables (sessions, players, answers)
- [ ] Créer les politiques RLS de base selon les recommandations ci-dessus
- [ ] Créer la publication réaltime pour toutes les tables
- [ ] Vérifier que l'URL et la clé anon fonctionnent correctement
- [ ] Préparer le schéma de base pour la nouvelle table questions
- [ ] Documenter les credentials actuels pour référence pendant la migration

### Informations qui restent à confirmer auprès de vous :
- [ ] Valeur actuelle du mot de passe admin 'elite' souhaitez-vous le garder ou en définir un nouveau ?
- [ ] Préférez-vous utiliser une authentification externe (Google, GitHub, etc.) pour l'admin ou garder un mot de passe simple ?
- [ ] Avez-vous des contraintes particulières concernant les technologies backend que Smartnet doit supporter ?
- [ ] Souhaitez-vous conserver exactement les mêmes règles de jeu ou êtes-vous ouvert à des ajustements mineurs pendant la migration ?
- [ ] Avez-vous déjà des données historiques dans Supabase que vous souhaitez absolument préserver ?
- [ ] Quel est votre budget approximatif pour l'hébergement Smartnet et les éventuels services additionnels ?
- [ ] Avez-vous une échéance particulière pour la mise en production de la version sécurisée ?