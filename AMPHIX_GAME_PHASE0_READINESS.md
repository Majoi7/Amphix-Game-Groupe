# AMPHIX GAME — PHASE 0: ÉTAT DE PRÉPARATION À LA SÉCURISATION

## 1. ANALYSE DES RISQUES

### Risques confirmés (vérifiés dans le code réel)

| Risque | Emplacement | Opérations concernées | Niveau |
|--------|-------------|----------------------|--------|
| **Mot de passe admin en dur** | `src/App.tsx:9` | Accès à `/admin` via prompt | Critique |
| **Clé Supabase anon en dur de secours** | `src/lib/supabase.ts:3-4` | Connexions Supabase lorsque variables d'environnement manquantes | Critique |
| **RLS désactivé sur toutes les tables** | `src/components/SQLInstruction.tsx:44-46` | Toutes les lectures/écritures sur `sessions`, `players`, `answers` | Critique |
| **Test avec credentials exposés** | `app/applet/test-supabase.ts:3-4` | Connexion de test à Supabase | Critique |
| **Calcul du score côté client** | `src/App.tsx:1208` | Mise à jour du score de groupe (+10/bonne réponse) | Moyen |
| **Calcul des vies côté client** | `src/App.tsx:1210, 1218` | Gestion des vies individuelles (-1/erreur, +1 après 3 correctes) | Moyen |
| **Écriture directe dans Supabase depuis le frontend** | `src/App.tsx:1231-1241` | INSERT answers, UPDATE players | Élevé |

### Risques supposés (nécessitent vérification Supabase)

| Risque | Base de supposition | Niveau |
|--------|-------------------|--------|
| **Politiques RLS manquantes** | Absence de politiques dans le code frontend + SQLInstruction montrant DISABLE | Critique |
| **Clé service_role non protégée** | Risque théorique si des fonctions backend Smartnet étaient utilisées | Élevé |
| **Exposition des bonnes réponses via XSS théorique** | Structure permettant l'accès à `questions[currentIdx].correctIndex` | Faible |

### Points impossibles à vérifier (sans accès Supabase)

| Point | Raison de l'impossibilité |
|-------|--------------------------|
| **État actuel des politiques RLS** | Requiert accès administrateur Supabase |
| **Existence de politiques personnalisées** | Nécessite inspection directe de la base |
| **Données historiques dans les tables** | Requiert accès en lecture Supabase |
| **Configuration de l'authentification anonyme** | Paramètre Supabase uniquement visible en interface |
| **Limites et alertes configurées** | Configuration spécifique au projet Supabase |

## 2. FICHIERS ET OPERATIONS CONCERNÉES

### Accès administration non sécurisé
- **Fichier**: `src/App.tsx`
- **Ligne**: 9 (`const ADMIN_PASSWORD = 'elite';`)
- **Opération**: Vérification du mot de passe via `prompt()` ligne 304
- **Impact**: Toute personne inspectant le code source peut accéder à l'administration

### Clés Supabase exposées
- **Fichier**: `src/lib/supabase.ts`
- **Lignes**: 3-4 (valeurs de secours hardcodées)
- **Fichier**: `app/applet/test-supabase.ts`
- **Lignes**: 3-4 (credentials de test hardcodées)
- **Opération**: Initialisation du client Supabase
- **Impact**: Risque d'exposition si variables d'environnement manquantes ou lors de tests

### Calcul de jeu côté client (à migrer vers backend sécurisé)
- **Fichier**: `src/App.tsx`
- **Fonction**: `QuizScreen.handleCheck()` (lignes 1197-1242)
- **Opérations**:
  - Ligne 1201: Détermination de la correctness (`selectedOpt === questions[currentIdx].correctIndex`)
  - Ligne 1208: Calcul du score (`newScore += POINTS_PER_QUESTION`)
  - Ligne 1210: Gain de vie (`newIndividualPoints += 1`)
  - Ligne 1218: Perte de vie (`newIndividualPoints = Math.max(0, newIndividualPoints - 1)`)
  - Lignes 1231-1241: Écriture dans Supabase (INSERT answers, UPDATE players)
- **Fonction**: `QuizScreen.handleContinue()` (lignes 1244-1256)
- **Opération**: Ligne 1245: Détermination de l'élimination (`individualPoints === 0`)

### Opérations de session côté client (à migrer vers backend sécurisé)
- **Fichier**: `src/components/AdminScreen.tsx`
- **Fonction**: `startSession()` (lignes 268-296)
- **Opérations**: Ligne 276-285: INSERT dans table `sessions`
- **Fonction**: `stopSession()` (lignes 299-306)
- **Opération**: Ligne 302: UPDATE table `sessions` (status = 'finished')
- **Fichier**: `src/App.tsx` (EntryScreen logic)
- **Fonction**: `handleValidateCode()` (lignes 698-753)
- **Opérations**: Lignes 708-712, 724-729: SELECT sessions
- **Opérations**: Lignes 714-715, 732-733: Traitement des codes
- **Opérations**: Ligne 741: SET session
- **Opérations**: Ligne 778-780: UPDATE sessions (validation_code)

## 3. PRÉREQUIS À CONFIRMER AUPRÈS DE SMARTNET

### Technologies et environnement d'exécution
1. **Support Node.js** : Quelle version minimale est supportée ? (Recommandé: ≥18.x)
2. **Framework compatible** : Express.js est-il supporté ou autorisé ?
3. **Variables d'environnement** : Comment définir des variables sécurisées dans leur plateforme ?
4. **Accès sortant** : Autorisation d'effectuer des requêtes HTTPS vers les domaines Supabase (*.supabase.co)
5. **Port d'écoute** : Fournissent-ils une variable d'environnement `PORT` ou faut-il configurer un port spécifique ?
6. **Processus persistants** : Autorisent-ils les processus de longue durée (daemons) ou nécessitent-ils leur gestionnaire de processus ?
7. **Journaux et monitoring** : Offrent-ils des journaux d'accès et des métriques de performance de base ?
8. **Méthodes de déploiement** : Supportent-ils le déploiement via Git, FTP ou panneau web ?
9. **Accès serveur** : Fournissent-ils un accès SSH ou équivalent pour la gestion avancée ?
10. **Certificats SSL/TLS** : Fournissent-ils des certificats gratuits (Let's Encrypt) ou autorisent-ils les personnalisés ?

### Ressources et limites
11. **Limites CPU/RAM** : Quelles sont les allocations par instance ?
12. **Bande passante** : Quelles sont les limites de transfert de données mensuelles ?
13. **Stockage** : Quelle capacité de stockage est disponible pour les logs et fichiers temporaires ?
14. **Scalabilité** : Supportent-ils le scaling vertical ou horizontal ?
15. **Temps de réponse** : Quelle latence attendre vers les APIs Supabase depuis leur région ?

## 4. ACTIONS SUPABASE À EFFECTUER (ORDRE RECOMMANDÉ)

**IMPORTANT : Aucune de ces actions ne doit être exécutée maintenant - uniquement en préparation pour quand vous autoriserez les modifications**

### Phase de préparation (avant activation RLS)
1. **Documenter l'état actuel** :
   - Prendre un schéma complet de la base (tables, colonnes, types)
   - Noter les valeurs actuelles critiques (sans exposer les données)
   - Vérifier l'absence de politiques RLS existantes

2. **Préparer le schéma de migration** :
   - Créer les scripts SQL pour ajouter les colonnes de configuration nécessaires
   - Préparer la création de la nouvelle table `questions` (si décision de migration)
   - Préparer les scripts d'insertion des questions depuis le fichier statique

3. **Valider la connectivité** :
   - Confirmer que les credentials actuirels fonctionnent depuis une connexion externe
   - Vérifier les permissions du compte anon actuel

### Phase d'activation sécurisée RLS (à faire en maintenance programmée)
4. **Sauvegarde préventive** :
   - Effectuer une sauvegarde complète de la base Supabase
   - Vérifier l'intégrité de la sauvegarde

5. **Activation progressive du RLS** :
   - Commencer par une table non critique pour tester
   - Activer RLS sur chaque table une par une
   - Pour chaque table :
     a. Créer les politiques SELECT nécessaires pour les opérations lectures publiques
     b. Créer les politiques MODIFY réservées au service_role
     c. Tester en mode restreint avant activation complète

6. **Configuration de la publication réaltime** :
   - Recréer la publication supabase_realtime avec toutes les tables nécessaires
   - Vérifier que les abonnements frontend fonctionnent toujours

7. **Nettoyage** :
   - Supprimer le fichier de test avec credentials exposés (`app/applet/test-supabase.ts`)
   - Retirer les valeurs de secours hardcodées dans `src/lib/supabase.ts`

## 5. VARIABLES D'ENVIRONNEMENT REQUISSES

### Frontend (.env.local) - NE JAMAIS COMMITTER
```
VITE_SUPABASE_URL=[URL de votre projet Supabase]
VITE_SUPABASE_ANON_KEY=[Clé anon Supabase - accès lecture seule restreinte]
VITE_SMARTNET_API_URL=[URL de votre backend Smartnet si utilisée]
VITE_ADMIN_PASSWORD_HASH=[Hash bcrypt du mot de passe admin - NE JAMAIS mettre le mot de passe en clair]
```

### Backend Smartnet (Node.js/Express) - NE JAMAIS COMMITTER
```
SUPABASE_URL=[URL de votre projet Supabase]
SUPABASE_SERVICE_ROLE_KEY=[Clé service_role Supabase - opérations privilegiées ONLY]
ADMIN_PASSWORD=[Mot de passe admin en clair pour hashage initial - supprimé après création du hash]
JWT_SECRET=[Secret cryptographique fort pour les tokens]
NODE_ENV=production
PORT=[Port d'écoute - généralement fourni par l'hébergeur]
```

**Note Critique** : Le mot de passe admin ne doit JAMAIS apparaître en clair dans aucune variable d'environnement persistante. Seul le hash doit être stocké.

## 6. TESTS NÉCESSAIRES

### Avant chaque modification
1. **Tests de régression fonctionnelle** :
   - Vérifier que le lancement de session fonctionne
   - Confirmer que la validation de code d'accès fonctionne
   - S'assurer que le jeu démarre et se termine correctement
   - Valider que l'affichage du score et des vies est correct
   - Confirmer que le classement en temps réel fonctionne

2. **Tests de sécurité de base** :
   - Vérifier que l'accès admin demande bien une authentification
   - Confirmer que aucune donnée sensible n'apparaît dans le code source bundle
   - Tester les scénarios d'échec (mauvais code, mauvais mot de passe admin)

### Après chaque modification
1. **Tests de parité fonctionnelle** :
   - Comparer les comportements avant/après modification sur scénarios identiques
   - Valider que les scores, vies et éliminations sont identiques
   - S'assurer que le classement est mis à jour correctement

2. **Tests de charge et de concurrence** :
   - Simuler plusieurs joueurs rejoignant la même session
   - Tester les scénarios de validation de code simultanée
   - Vérifier l'absence de course conditions sur les scores

3. **Tests de sécurité spécifiques** :
   - Tenter d'accéder à l'admin sans authentification (doit échouer)
   - Vérifier que l'inspection du code source ne révèle pas de secrets
   - Confirmer que les erreurs ne divulguent pas d'informations sensibles

### Tests de retour arrière
- Pouvoir rétablir rapidement la version précédente en cas de problème critique
- Vérifier que toutes les fonctions essentielles restent opérationnelles

## 7. PLAN DE RETOUR ARRIÈRE

### Pour chaque modification déployée
1. **Sauvegarde préventive** : Créer un point de restauration avant modification
2. **Déploiement progressif** : Utiliser le déploiement bleu/vert ou des feature flags si possible
3. **Surveillance active** : Monitorer les logs et métriques pendant 30 minutes après déploiement
4. **Procédure de retour** :
   - Réactiver immédiatement la version précédente
   - Vérifier la restauration des fonctionnalités essentielles
   - Communiquer l'incident selon les procédures établies

### Scénarios de retour arrière spécifiques
- **Échec de l'authentification admin** : Restaurer le mot de passe en dur temporairement
- **Problème de connexion Supabase** : Réactiver les valeurs de secours (temporairement)
- **Dysfonctionnement du calcul de jeu** : Réactiver la logique frontend comme fallback
- **Problème de RLS** : Désactiver temporairement RLS sur les tables affectées

## 8. DÉCISIONS REQUIRANT VOTRE ACCORD

### Architecture et sécurité
1. **[ ] Validation de l'approche de sécurisation proposée** (mot de passe en variable d'environnement + hash)
2. **[ ] Approbation de la suppression définitive des valeurs de secours hardcodées**
3. **[ ] Accord pour retirer le fichier de test avec credentials exposés**
4. **[ ] Validation de l'approche de migration progressive du calcul de jeu vers backend**

### Gestion des mots de passe et authentification
5. **[ ] Préférence pour le stockage du mot de passe admin** :
   - [ ] Hash bcrypt en variable d'environnement (recommandé)
   - [ ] Authentification externe (OAuth/SSO) - nécessite spécification
   - [ ] Autre méthode à préciser : _______________________

### Migration logique de jeu
6. **[ ] Ordre de migration préféré** :
   - [ ] Phase 1: Validation des réponses uniquement
   - [ ] Phase 2: Validation + calcul des scores
   - [ ] Phase 3: Validation + calcul des scores + calcul des vies
   - [ ] Migration complète en une étape

### Seuils et valeurs du jeu
7. **[ ] Valeurs à rendre configurables via la configuration de session** :
   - [ ] Points par question (actuellement 10 en dur)
   - [ ] Nombre de bonnes réponses consécutives pour gagner une vie (actuellement 3 en dur)
   - [ ] Représentation des vies illimitées (actuellement 1000 en dur)
   - [ ] Aucune pour l'instant - garder les valeurs en dur
   - [ ] Autres : _________________________________

### Planning et priorités
8. **[ ] Priorités d'implémentation initiales** :
   - [ ] Sécurisation de l'accès admin (priorité absolue)
   - [ ] Sécurisation des clés Supabase
   - [ ] Migration de la validation des réponses vers backend sécurisé
   - [ ] Mise en place des politiques RLS de base
   - [ ] Préparation de la migration de la banque de questions
   - [ ] Autre priorité à préciser : ___________________

## 9. LISTE DES ACTIONS IMMÉDIATES (APRÈS VOTRE ACCORD)

1. **Création des variables d'environnement sécurisées** dans les plateformes appropriées
2. **Suppression du fichier de test exposant des credentials** : `app/applet/test-supabase.ts`
3. **Retrait des valeurs de secours hardcodées** dans `src/lib/supabase.ts`
4. **Remplacement du mot de passe admin en dur** par lecture de variable d'environnement
5. **Mise en place de la validation d'authentification admin via backend Smartnet** (à développer)

### Actions à NE PAS effectuer sans accord explicite
- Aucune modification de la logique de jeu (scores, vies, éliminations)
- Aucune modification de la structure des sessions ou du classement
- Aucune activation de RLS sur les tables Supabase
- Aucune migration de la banque de questions vers Supabase
- Aucune ajout de fonctionnalités académiques (niveaux/matières)
- Aucune implémentation de l'importation en masse de questions

---
*Ce rapport est basé sur l'analyse du code réel d'Amphix Game. Aucune connexion à Supabase ou exécution de SQL n'a été effectuée pour établir ces constatations.*