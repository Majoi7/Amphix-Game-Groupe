# Migration LaTeX du quiz

## Données et garanties

Les 356 questions ont été converties en six passes, dans le fichier de référence `src/data/questions.ts`. Le fichier `src/data/questions.js` reste son réexport ; il n'a pas été transformé en une seconde banque.

Tous les champs `text` et toutes les options utilisent uniformément `String.raw` pour conserver les antislashs LaTeX. Les identifiants, les catégories, les `correctIndex`, le nombre et l'ordre des options sont conservés. La sauvegarde `src/data/questions.backup.js` contient le fichier original avant migration. Une comparaison AST confirme que **seuls les initialiseurs des champs `text` et `options` ont changé** : le reste du fichier de référence est conservé à l'identique.

| Catégorie | Questions | Identifiants |
|---|---:|---|
| `suites` | 30 | 1–30 |
| `series` | 30 | 31–60 |
| `equa_diff` | 32 | 61–92 |
| `algebre_boole` | 90 | 93–182 |
| `conversion_bases` | 77 | 183–259 |
| `structures_algebriques` | 97 | 260–356 |
| **Total** | **356** | **1–356** |

## Coquilles corrigées et interprétations

- **Q14, option A :** `|uₚ - uₚ|` devient `|u_p - u_q|`. Les quantificateurs portaient déjà sur `p,q` : c'est la définition de Cauchy attendue. Le `correctIndex` reste 0.
- **Q21, énoncé :** `√t + 6` est interprété comme `\sqrt{t+6}`, et non `\sqrt{t}+6`. Le texte affirme que `f([1,3])` reste dans `[1,3]`, ce qui est vrai pour la première expression (`[√7,3]`) et impossible pour la seconde. Cette correction de portée de la racine est signalée explicitement et reste à confirmer contre le cours original si celui-ci est disponible.
- **Q30, Q32, Q37, Q39, Q40 et Q55 :** les limites de suites ont reçu l'indication explicite `n\to+\infty`. La racine n-ième de Q39 remplace l'écriture équivalente à la puissance `1/n`.
- **Q86 :** les deux égalités de chaque option sont disposées sur deux lignes avec `aligned`. Leur conjonction et leur ordre sont conservés.
- **Q324, Q338–343, Q346 et Q349 :** les écritures `(... / ...)` sont des permutations à deux lignes, pas des quotients ; elles deviennent des matrices `pmatrix`. Les matrices à dix colonnes sont en mode centré `$$...$$`.
- **Q325–326 et produits de permutations :** la convention usuelle de composition de droite à gauche est conservée ; aucune inversion de l'ordre des facteurs.
- **Bases :** indices de base ajoutés lorsqu'ils étaient indiqués par le texte, virgules décimales françaises écrites `{,}`, groupements de bits conservés. Les distracteurs volontairement invalides en base 8 (Q213 `8`, Q214 `F`) restent invalides : ils n'ont pas été corrigés.
- **Q244–246 :** « En binaire » est compris comme une question sur les poids binaires, dont les options donnent des valeurs décimales. Aucune valeur ni réponse n'a été changée.
- **Fractions dans les options :** `\frac` est utilisé pour les réponses compactes ; `\dfrac` est réservé aux formules d'énoncé et aux systèmes lorsque la taille le permet. Tous les nombres proposés seuls dans les options sont rendus en mode mathématique, tandis que les références de cours et le texte français restent en prose.
- **Q151–152 :** `Xi` / `X̄i` désignent la variable indexée `X_i` et son complément, et non un produit par `i`.

## Réponses à revoir, sans changement de `correctIndex`

### Ambiguïtés vérifiées dans les premières catégories

Les lettres ci-dessous sont les positions originales A–D ; un `correctIndex` est toujours indexé à partir de zéro.

| Question | Réponse enregistrée | Point à revoir |
|---|---|---|
| **3** | C, index 2 | B (`u_n=u_{n_0}` pour tout indice) décrit aussi une suite constante sur son domaine. C est la formulation explicite souhaitée, mais B est équivalente. |
| **7** | C, index 2 | B (`≤ ε`) et C (`< ε`) sont des définitions équivalentes lorsque la condition vaut pour tout `ε>0`. Le QCM n'a donc pas une réponse mathématiquement unique. |
| **14** | A, index 0 | Après correction de la coquille, A est bien la définition de Cauchy ; pour les suites réelles, C (« Elle est convergente ») est aussi équivalente. Le QCM devrait demander explicitement la définition. |
| **32** | B, index 1 | A (terme général borné) et D (sommes partielles de Cauchy) sont aussi des conditions nécessaires d'une série convergente. |
| **34** | A, index 0 | D est également vraie : les termes sont >1, donc les sommes partielles ne sont pas majorées. A est le critère direct voulu, mais pas la seule justification vraie. |
| **36** | B, index 1 | D est également vraie : pour des termes positifs, convergence et convergence absolue coïncident. |
| **37** | B, index 1 | La comparaison par un rapport tendant vers un réel strictement positif demande des séries à termes positifs (ou de signe constant à partir d'un rang). Sans cette hypothèse, l'énoncé est faux : `v_n=(-1)^n/√n` converge, tandis que `u_n=v_n+1/n` diverge malgré `u_n/v_n→1`. |
| **39** | B, index 1 | C est également vraie puisque la série est à termes positifs. |
| **59** | B, index 1 | D (« Semi-convergente ») est également vraie. La série converge par Abel mais pas absolument : `|cos n|≥cos²n` et `cos²n=(1+cos(2n))/2`. |
| **65** | B, index 1 | Le changement `z=y^{1-α}` nécessite `α≠1`. Cette restriction, explicite en Q81, manque en Q65 ; pour `α=1`, l'équation est déjà linéaire et `z=1` n'est pas un changement inversible. |
| **88** | B, index 1 | Le facteur `x` suppose une racine `im` simple (en particulier `m≠0` dans le cas réel du second ordre). Si `m=0` et la racine 0 est double, il faut un facteur `x²`. L'hypothèse n'est pas explicitée. |
| **117** | D, index 3 | A (`a²`) et D (`a`) valent toutes deux `a·a` en algèbre de Boole. La réponse D exprime l'idempotence, mais A est un distracteur équivalent si la puissance désigne le produit booléen. |
| **141** | D, index 3 | `f(0,0,1)=0` est correct. Si l'option C « a » est évaluée aux entrées données, elle vaut aussi 0 ; la question est ambiguë entre une valeur numérique et une expression variable. |
| **258** | C, index 2 | La condition décrit une écriture binaire **finie** et exacte. Une écriture infinie peut représenter exactement un nombre sans que les multiplications terminent. |

Les identifiants à revoir sont donc **3, 7, 14, 32, 34, 36, 37, 39, 59, 65, 88, 117, 141, 258**, et **314** pour la convention de morphisme unitaire. Ces points concernent principalement l'unicité des réponses ou des hypothèses implicites, pas un index corrigé en secret.

Aucun de ces problèmes pédagogiques n'a été masqué en modifiant les réponses ou les distracteurs.

### Calculs prioritaires vérifiés : réponses enregistrées correctes

- **Q276 (index 1 / B)** : `2⋆3=30`, `3⋆5=207`, `(2⋆3)⋆5=150+899×24=21726`, `2⋆(3⋆5)=414+3×42848=128958`. Les valeurs et la conclusion de non-associativité sont correctes.
- **Q280 (index 2 / C)** : le neutre est `1` ; un symétrique de `2` satisfait `2⋆x=1`, soit `3x²+2x−4=0`. Les deux racines distinctes sont `(-1+√13)/3` et `(-1−√13)/3`. Il y a bien deux symétriques dans cette loi non associative.
- **Q339** : la permutation `[3,1,5,2,6,4]` a **5 inversions** et le cycle `(1 3 5 6 4 2)`. Les réponses des Q339–341 sont cohérentes.
- **Q344** : avec les permutations de l'exercice 5, `σ∘τ=(1 5 3)(2 6 4)`, donc l'ordre est bien `3`.
- **Q346–349** : `[4,8,5,9,7,10,2,3,1,6]=(1 4 9)(2 8 3 5 7)(6 10)`, d'ordre `30`, de signature `−1`, avec **27 inversions**. Q349 conserve donc son index 2 / C.
- **Q350–352** : `2021≡11 (mod 30)` ; les images de `1`, `2` et `6` sont respectivement **9**, **8**, **10**. Les trois réponses enregistrées sont correctes et inchangées.
- **Q240–241** : `6A1E₁₆=6×4096+10×256+1×16+14=27166`.
- **Q248, Q256, Q257** : les valeurs `0,625`, `0,375`, `0,6875` correspondent respectivement à `0,101₂`, `0,011₂`, `0,1011₂`.
- **Q127–133** : les sept identités de De Morgan et de simplification ont été vérifiées exhaustivement sur les quatre couples booléens `(a,b)`.

### Autre convention à préciser

- **Q314** : la réponse B est correcte pour des morphismes d'anneaux **unitaires**. Sans exigence de préserver le neutre multiplicatif, `f(x)=2x` reste non multiplicative (`f(1×1)=2` tandis que `f(1)f(1)=4`), mais la raison proposée `f(1)≠1` demande que la convention unitaire soit explicitée.

## Fichiers de la migration

### Modifiés

- `src/data/questions.ts` : les 356 questions, uniquement `text` et `options`.
- `src/App.tsx` : affichage de `currentQ.text` et des quatre options avec `MathText`, y compris leur état corrigé après réponse ; styles de flex adaptés au contenu mathématique. Recherche dans tout `src` : aucun autre écran n'affiche directement les énoncés/options (l'administration et le classement n'en affichent pas).
- `package.json` : commande `validate:latex` et extension de `test:frontend`, en préservant les dépendances déjà installées.

### Créés

- `src/data/questions.backup.js` : sauvegarde exacte de l'original, hors des imports de production.
- `src/components/MathText.jsx` et `src/components/MathText.css` : KaTeX mémorisé, `$...$` / `$$...$$`, texte React échappé, MathML accessible, formules centrées et défilement discret lorsque nécessaire.
- `src/lib/mathText.js` : parseur partagé entre rendu et validation.
- `scripts/validate-latex.mjs` : validation des banques réelles, délimiteurs, KaTeX strict, Unicode résiduel et structure.
- `src/lib/mathText.test.js`, `src/components/MathText.test.mjs`, `scripts/validate-latex.test.mjs` : 24 nouveaux tests.
- `scripts/preview-latex.html` : gabarit local Vite pour revoir les 53 questions complexes, sans connexion, écriture en base ou révélation des réponses. Ce fichier de test n'est pas une entrée du build de production.
- `LATEX_MIGRATION_REPORT.md` : ce rapport.

Les fichiers générés `graphify-out` ont été actualisés incrémentalement. Les autres modifications déjà présentes (serveur, déploiement, lockfile) n'ont pas été écrasées. Aucun commit ni push n'a été effectué.

## Contrôles finaux

- **`npm run validate:latex` : réussi, 0 erreur.** 356 questions, 1 780 chaînes, 1 627 expressions inline et 6 expressions display. Même ordre de questions, mêmes IDs/catégories/`correctIndex`, quatre options valides chacune.
- **`npm run test:frontend` : 40/40 tests réussis**, dont les 24 nouveaux tests de parseur, rendu React et validateur (échappement HTML, dollars échappés, expressions invalides, systèmes, matrices et protection des commandes HTML KaTeX).
- **Backend existant : 18/18 tests réussis.** Avec les tests frontend, **58 tests** ont réussi.
- **`npm run lint` : réussi.**
- **`npm run build` après intégration : réussi.** Les CSS et polices KaTeX sont dans le build. Avertissement Vite non bloquant : bundle principal ~998 ko, ~283 ko gzip ; aucune optimisation du découpage n'a été imposée dans cette migration.
- **`npm run server:build` : réussi**, après conversion des données.
- **Comparaison AST indépendante :** seules les valeurs de `text` et `options` ont changé ; tout le reste de la source de référence est conservé.
- **Contrôle Unicode indépendant plus strict :** aucun symbole mathématique Unicode n'est resté dans les 1 780 chaînes, même à l'intérieur des délimiteurs.
- **Contrôle Chrome local :** les 53 questions prioritaires (306 formules) ont été rendues avec le composant réel, dans un gabarit de boutons. Aux vraies largeurs **320 px et 390 px**, et sur bureau (**1 264 px de viewport**), aucun débordement horizontal de page/bouton et aucune erreur KaTeX. Les longues expressions défilent horizontalement (44 à 320 px, 31 à 390 px), sans réduire les fractions/matrices au point de les rendre illisibles. L'écran initial de l'application démarre aussi dans Chrome. Les captures de Q13 (somme), Q86 (système aligné) et Q129 (De Morgan) ont été inspectées ; des captures ciblées ont aussi été réalisées pour Q240, Q349 et Q350.
- **Limite de la vérification visuelle :** les questions ont été vérifiées dans le gabarit local, pas dans une partie authentifiée contre une base de production. Une première série de captures a rencontré un délai de fermeture Chrome après écriture d'une image ; les trois contrôles de layout avaient réussi et une seconde série isolée des cinq captures restantes a ensuite terminé avec succès.

### Relancer les contrôles

```sh
npm run validate:latex
npm test
npm run lint
npm run build
npm run server:build
```

Pour revoir la présentation : `npm run dev`, puis ouvrir `http://localhost:3000/scripts/preview-latex.html`. Ajouter `?id=86&width=390` pour un contrôle mobile ciblé ou `?width=320` pour toute la sélection. La page utilise uniquement les données locales et ne passe pas par l'API.

L'actualisation incrémentale du graphe a été effectuée en mode local `--update --code-only` : le mode complet demandait une clé API pour les documents non-code. Aucun service externe n'a été utilisé pour convertir les questions.
