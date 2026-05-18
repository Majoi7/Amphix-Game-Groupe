export const ALL_QUESTIONS = [
  {
    id: 1,
    category: "suites",
    text: "D’après la Définition 1.1, une suite numérique est une application de :",
    options: ["ℝ vers ℕ", "ℕ vers ℝ", "ℕ vers ℕ", "ℝ vers ℝ"],
    correctIndex: 1
  },
  {
    id: 2,
    category: "suites",
    text: "Dans l’exemple de la suite définie par uₙ = (-1)ⁿ, l’ensemble des valeurs de la suite est :",
    options: ["{0, 1}", "{−1, 1}", "{−1, 0, 1}", "]−1, 1["],
    correctIndex: 1
  },
  {
    id: 3,
    category: "suites",
    text: "Selon la Définition 1.3, une suite constante vérifie :",
    options: [
      "∀n ≥ n₀, uₙ = 0",
      "∀n ≥ n₀, uₙ = uₙ₀",
      "Il existe a ∈ ℝ tel que ∀n ≥ n₀, uₙ = a",
      "La suite est à la fois majorée et minorée"
    ],
    correctIndex: 2
  },
  {
    id: 4,
    category: "suites",
    text: "Le produit de la suite uₙ = 1/n et vₙ = √n (Exemple 1.7) donne la suite de terme général :",
    options: ["√n", "1/√n", "n", "1/n²"],
    correctIndex: 1
  },
  {
    id: 5,
    category: "suites",
    text: "Une suite est bornée si et seulement si :",
    options: [
      "Elle est majorée",
      "Elle est minorée",
      "La suite des valeurs absolues est majorée (Proposition 1.14)",
      "Elle est monotone"
    ],
    correctIndex: 2
  },
  {
    id: 6,
    category: "suites",
    text: "La suite uₙ = e⁻ⁿ est :",
    options: ["Croissante", "Strictement décroissante", "Constante", "Non monotone"],
    correctIndex: 1
  },
  {
    id: 7,
    category: "suites",
    text: "D’après la Définition 1.18, une suite (uₙ) converge vers ℓ si :",
    options: [
      "∀ε > 0, ∃N₀, ∀n ≥ N₀, |uₙ - ℓ| > ε",
      "∀ε > 0, ∃N₀, ∀n ≥ N₀, |uₙ - ℓ| ≤ ε",
      "∀ε > 0, ∃N₀, ∀n ≥ N₀, |uₙ - ℓ| < ε",
      "∀ε > 0, ∀N₀, ∃n ≥ N₀, |uₙ - ℓ| < ε"
    ],
    correctIndex: 2
  },
  {
    id: 8,
    category: "suites",
    text: "Une suite convergente est :",
    options: ["Toujours majorée mais pas forcément minorée", "Toujours bornée", "Toujours croissante", "Jamais bornée"],
    correctIndex: 1
  },
  {
    id: 9,
    category: "suites",
    text: "La suite uₙ = (-1)ⁿ est :",
    options: ["Convergente vers 0", "Divergente (pas de limite)", "Convergente vers 1", "Convergente vers −1"],
    correctIndex: 1
  },
  {
    id: 10,
    category: "suites",
    text: "Selon le corollaire 1.32, si une suite possède deux sous-suites convergeant vers deux limites différentes, alors la suite :",
    options: ["Converge vers leur moyenne", "Est divergente", "Converge vers la plus grande limite", "Est de Cauchy"],
    correctIndex: 1
  },
  {
    id: 11,
    category: "suites",
    text: "Le théorème de Bolzano-Weierstrass affirme que toute suite réelle bornée :",
    options: ["Converge", "Possède une sous-suite convergente", "Est de Cauchy", "Est monotone"],
    correctIndex: 1
  },
  {
    id: 12,
    category: "suites",
    text: "Deux suites (uₙ) et (vₙ) sont adjacentes si :",
    options: [
      "Elles sont toutes deux convergentes",
      "uₙ est croissante, vₙ décroissante et uₙ - vₙ → 0",
      "uₙ et vₙ sont bornées",
      "uₙ ≤ vₙ pour tout n"
    ],
    correctIndex: 1
  },
  {
    id: 13,
    category: "suites",
    text: "La suite uₙ = Σ_{k=0}ⁿ 1/k! et vₙ = uₙ + 1/n! sont adjacentes. Quelle est leur limite commune ?",
    options: ["e", "π", "1", "2"],
    correctIndex: 0
  },
  {
    id: 14,
    category: "suites",
    text: "Une suite est de Cauchy si :",
    options: [
      "∀ε > 0, ∃N₀, ∀p,q ≥ N₀, |uₚ - uₚ| < ε",
      "∀ε > 0, ∃N₀, ∀n ≥ N₀, |uₙ - ℓ| < ε",
      "Elle est convergente",
      "Elle est bornée"
    ],
    correctIndex: 0
  },
  {
    id: 15,
    category: "suites",
    text: "Dans ℝ, une suite est convergente si et seulement si elle est :",
    options: ["Bornée", "Monotone", "De Cauchy", "Strictement croissante"],
    correctIndex: 2
  },
  {
    id: 16,
    category: "suites",
    text: "Une suite arithmétique de raison r vérifie :",
    options: [
      "uₙ₊₁ = uₙ × r",
      "uₙ₊₁ = uₙ + r",
      "uₙ₊₁ = r × uₙ + 1",
      "uₙ = u₀ + n² r"
    ],
    correctIndex: 1
  },
  {
    id: 17,
    category: "suites",
    text: "La proposition 1.43 indique que pour une suite géométrique de raison α, uₙ = αⁿ⁻ᵖ uₚ. Si u₀ = 3 et α = 2, alors u₄ vaut :",
    options: ["24", "48", "12", "6"],
    correctIndex: 1
  },
  {
    id: 18,
    category: "suites",
    text: "Une suite arithmético-géométrique est définie par uₙ₊₁ = α uₙ + r. Si α = 1, la suite est :",
    options: ["Géométrique", "Arithmétique", "Constante", "Harmonique"],
    correctIndex: 1
  },
  {
    id: 19,
    category: "suites",
    text: "Pour la suite uₙ₊₁ = 2uₙ - 3, le point fixe θ est solution de :",
    options: ["x = 2x + 3", "x = 2x - 3", "x = 2x", "x = 3x - 2"],
    correctIndex: 1
  },
  {
    id: 20,
    category: "suites",
    text: "Le théorème du point fixe (Théorème 1.49) affirme que si uₙ₊₁ = f(uₙ) converge vers ℓ et f continue en ℓ, alors :",
    options: ["f(ℓ) = u₀", "f(ℓ) = ℓ", "f(ℓ) = 0", "f'(ℓ) = 0"],
    correctIndex: 1
  },
  {
    id: 21,
    category: "suites",
    text: "Dans l’exercice 1.51, f(t) = √t + 6 sur I = [1,3], f est croissante et f(I) ⊂ I. On en déduit que la suite définie par u₀=1, uₙ₊₁=f(uₙ) :",
    options: ["Diverge", "Est monotone et reste dans I", "N’est pas définie", "Est géométrique"],
    correctIndex: 1
  },
  {
    id: 22,
    category: "suites",
    text: "Une récurrence linéaire d’ordre 2 est de la forme uₙ₊₂ = a uₙ₊₁ + b uₙ. L’équation caractéristique associée est :",
    options: ["x² = a x + b", "x² + a x + b = 0", "a x² + b x = 0", "x² = a + b x"],
    correctIndex: 0
  },
  {
    id: 23,
    category: "suites",
    text: "Si l’équation caractéristique a deux racines réelles distinctes q₁ et q₂, alors la suite s’écrit :",
    options: [
      "uₙ = (α n + β) q₁ⁿ",
      "uₙ = α q₁ⁿ + β q₂ⁿ",
      "uₙ = rⁿ (α cos nθ + β sin nθ)",
      "uₙ = α n² + β n"
    ],
    correctIndex: 1
  },
  {
    id: 24,
    category: "suites",
    text: "On dit que uₙ = O(vₙ) si :",
    options: [
      "uₙ / vₙ → 0",
      "Il existe une suite bornée βₙ telle que uₙ = βₙ vₙ à partir d’un certain rang",
      "uₙ - vₙ → 0",
      "uₙ = vₙ pour tout n"
    ],
    correctIndex: 1
  },
  {
    id: 25,
    category: "suites",
    text: "La notation uₙ = o(vₙ) signifie que :",
    options: [
      "uₙ / vₙ → 1",
      "uₙ / vₙ → 0 (lorsque vₙ ≠ 0)",
      "uₙ est bornée",
      "uₙ et vₙ sont équivalentes"
    ],
    correctIndex: 1
  },
  {
    id: 26,
    category: "suites",
    text: "Deux suites sont équivalentes (uₙ ∼ vₙ) si et seulement si :",
    options: [
      "uₙ - vₙ → 0",
      "uₙ / vₙ → 1 (à partir d’un rang où vₙ ≠ 0)",
      "uₙ = O(vₙ) et vₙ = O(uₙ)",
      "uₙ = vₙ"
    ],
    correctIndex: 1
  },
  {
    id: 27,
    category: "suites",
    text: "D’après la Remarque 1.69, un polynôme non nul est équivalent à :",
    options: [
      "Son terme constant",
      "Son terme de plus bas degré",
      "Son terme de plus haut degré",
      "La somme de tous ses termes"
    ],
    correctIndex: 2
  },
  {
    id: 28,
    category: "suites",
    text: "La proposition 1.72 indique que si uₙ → 0, alors sin(uₙ) ∼ :",
    options: ["uₙ²", "uₙ", "1 - cos(uₙ)", "e^{uₙ} - 1"],
    correctIndex: 1
  },
  {
    id: 29,
    category: "suites",
    text: "Selon le théorème 1.71, lequel est négligeable devant les autres ?",
    options: ["n!", "aⁿ avec a > 1", "n^α avec α > 0", "(ln n)^β avec β > 0"],
    correctIndex: 3
  },
  {
    id: 30,
    category: "suites",
    text: "La règle de d’Alembert pour les suites (proposition 1.70) dit que si lim uₙ₊₁/uₙ = ℓ < 1 pour une suite positive, alors :",
    options: ["uₙ → +∞", "uₙ → 0", "uₙ converge vers ℓ", "On ne peut rien conclure"],
    correctIndex: 1
  },
  {
    id: 31,
    category: "series",
    text: "La série de terme général uₙ est convergente si la suite des sommes partielles Sₙ :",
    options: ["Est bornée", "Est monotone", "Converge dans K", "Tend vers 0"],
    correctIndex: 2
  },
  {
    id: 32,
    category: "series",
    text: "Une condition nécessaire de convergence d’une série Σ uₙ est :",
    options: ["uₙ est bornée", "lim uₙ = 0", "uₙ ≥ 0", "Sₙ est de Cauchy"],
    correctIndex: 1
  },
  {
    id: 33,
    category: "series",
    text: "La série harmonique Σ 1/n est :",
    options: ["Convergente", "Absolument convergente", "Divergente", "Alternée convergente"],
    correctIndex: 2
  },
  {
    id: 34,
    category: "series",
    text: "La série de terme général uₙ = (n+1)/(n-1) (n ≥ 2) est divergente car :",
    options: [
      "uₙ → 1 ≠ 0",
      "uₙ n’est pas bornée",
      "uₙ est alternée",
      "La suite des sommes partielles n’est pas majorée"
    ],
    correctIndex: 0
  },
  {
    id: 35,
    category: "series",
    text: "Une série à termes positifs converge si et seulement si :",
    options: ["uₙ → 0", "La suite des sommes partielles est majorée", "uₙ ≤ 1/n", "Le terme général décroît"],
    correctIndex: 1
  },
  {
    id: 36,
    category: "series",
    text: "La règle de comparaison pour les séries à termes positifs dit que si 0 ≤ uₙ ≤ vₙ et Σ vₙ converge, alors :",
    options: ["Σ uₙ diverge", "Σ uₙ converge", "On ne peut rien dire", "Σ uₙ converge absolument"],
    correctIndex: 1
  },
  {
    id: 37,
    category: "series",
    text: "Si lim uₙ/vₙ = ℓ ∈ ]0, +∞[, alors les séries Σ uₙ et Σ vₙ :",
    options: [
      "Sont toutes deux divergentes",
      "Sont de même nature (toutes deux convergentes ou toutes deux divergentes)",
      "Convergent vers ℓ",
      "Sont absolument convergentes"
    ],
    correctIndex: 1
  },
  {
    id: 38,
    category: "series",
    text: "La série de Riemann Σ 1/n^α converge si et seulement si :",
    options: ["α > 0", "α ≥ 1", "α > 1", "α < 1"],
    correctIndex: 2
  },
  {
    id: 39,
    category: "series",
    text: "D’après le critère de Cauchy pour les séries (Théorème 2.18), si lim (uₙ)^{1/n} = λ < 1 pour une série à termes positifs, alors la série :",
    options: ["Diverge", "Converge", "Converge absolument", "Il faut λ = 0 pour conclure"],
    correctIndex: 1
  },
  {
    id: 40,
    category: "series",
    text: "Le critère de d’Alembert utilise la limite lim uₙ₊₁/uₙ. Si cette limite est supérieure à 1, la série :",
    options: ["Converge", "Diverge", "Converge absolument", "Le critère ne s’applique pas"],
    correctIndex: 1
  },
  {
    id: 41,
    category: "series",
    text: "Pour la série de terme général uₙ = ((n+1)/(2n))ⁿ, en utilisant la racine n-ième, on trouve ⁿ√(uₙ) = (n+1)/(2n) → 1/2. La série est donc :",
    options: ["Divergente", "Convergente", "Semi-convergente", "Le critère ne permet pas de conclure"],
    correctIndex: 1
  },
  {
    id: 42,
    category: "series",
    text: "Une série Σ uₙ est absolument convergente si :",
    options: ["uₙ → 0", "Σ uₙ converge", "Σ |uₙ| converge", "uₙ ≥ 0"],
    correctIndex: 2
  },
  {
    id: 43,
    category: "series",
    text: "Toute série absolument convergente est :",
    options: ["Divergente", "Convergente", "Alternée", "De Riemann"],
    correctIndex: 1
  },
  {
    id: 44,
    category: "series",
    text: "Une série convergente mais non absolument convergente est dite :",
    options: ["Absolument convergente", "Semi-convergente", "Grossièrement divergente", "Harmonique"],
    correctIndex: 1
  },
  {
    id: 45,
    category: "series",
    text: "La série Σ 1/(1+i)ⁿ est :",
    options: ["Divergente", "Convergente mais pas absolument", "Absolument convergente", "Non définie"],
    correctIndex: 2
  },
  {
    id: 46,
    category: "series",
    text: "La règle d’Abel (Proposition 2.28) s’applique à Σ aₙ bₙ avec aₙ décroissante tendant vers 0 et les sommes partielles de bₙ bornées. Elle garantit :",
    options: ["La convergence absolue", "La divergence", "La convergence (simple)", "La convergence uniforme"],
    correctIndex: 2
  },
  {
    id: 47,
    category: "series",
    text: "Une série alternée dont le terme général décroît en valeur absolue vers 0 :",
    options: [
      "Diverge toujours",
      "Converge (critère spécial des séries alternées)",
      "Converge absolument",
      "Peut diverger ou converger selon le signe"
    ],
    correctIndex: 1
  },
  {
    id: 48,
    category: "series",
    text: "Pour une série alternée convergente satisfaisant le critère spécial, le reste Rₙ vérifie :",
    options: ["|Rₙ| ≤ |uₙ₊₁|", "Rₙ = 0", "|Rₙ| ≤ |u₀|", "Rₙ est du signe de uₙ"],
    correctIndex: 0
  },
  {
    id: 49,
    category: "series",
    text: "La série Σ (-1)ⁿ/n^α (α > 0) converge pour :",
    options: ["Tout α > 0", "α > 1 seulement", "α ≥ 1", "α < 1"],
    correctIndex: 0
  },
  {
    id: 50,
    category: "series",
    text: "Dans l’exemple de la série de terme général uₙ = cos(n)/√n, on peut montrer la convergence en utilisant :",
    options: [
      "Le critère de d’Alembert",
      "La règle d’Abel (avec aₙ = 1/√n et bₙ = cos n)",
      "La comparaison avec Riemann",
      "La convergence absolue"
    ],
    correctIndex: 1
  },
  {
    id: 51,
    category: "series",
    text: "La série géométrique Σ qⁿ converge si :",
    options: ["|q| > 1", "|q| < 1", "q = 1", "q = -1"],
    correctIndex: 1
  },
  {
    id: 52,
    category: "series",
    text: "La somme de la série géométrique convergente Σ_{n=0}^{+∞} qⁿ est :",
    options: ["1/(1+q)", "1/(1-q)", "q/(1-q)", "1 + q"],
    correctIndex: 1
  },
  {
    id: 53,
    category: "series",
    text: "Le critère de comparaison avec une intégrale (Proposition 2.15) affirme que si f est positive et décroissante sur [a,+∞[, alors Σ f(n) et ∫_a^{+∞} f(x) dx :",
    options: ["Ont la même somme", "Sont de même nature", "Convergent toujours", "Divergent toujours"],
    correctIndex: 1
  },
  {
    id: 54,
    category: "series",
    text: "La série Σ_{n≥1} 1/n² est :",
    options: [
      "Divergente",
      "Convergente (Riemann, α=2>1)",
      "Convergente mais sa somme est 1",
      "Semi-convergente"
    ],
    correctIndex: 1
  },
  {
    id: 55,
    category: "series",
    text: "Si lim n^α uₙ = ℓ avec 0 < ℓ < +∞ et α > 1, alors :",
    options: ["La série diverge", "La série converge", "On ne peut rien dire", "La série converge seulement si ℓ = 0"],
    correctIndex: 1
  },
  {
    id: 56,
    category: "series",
    text: "La condition nécessaire uₙ → 0 n’est pas suffisante pour la convergence. L’exemple donné dans le cours est :",
    options: ["Σ 1/n²", "Σ 1/n (série harmonique)", "Σ 1/2ⁿ", "Σ (-1)ⁿ"],
    correctIndex: 1
  },
  {
    id: 57,
    category: "series",
    text: "Le terme général de la série des sommes partielles Sₙ pour Σ n est :",
    options: ["n", "n(n+1)/2", "n(n-1)/2", "n²"],
    correctIndex: 1
  },
  {
    id: 58,
    category: "series",
    text: "Une série complexe Σ zₙ avec zₙ = xₙ + i yₙ converge si et seulement si :",
    options: ["Σ xₙ et Σ yₙ convergent", "Σ |zₙ| converge", "zₙ → 0", "xₙ et yₙ sont bornées"],
    correctIndex: 0
  },
  {
    id: 59,
    category: "series",
    text: "La série Σ (cos n)/n est :",
    options: ["Absolument convergente", "Convergente (par Abel)", "Divergente", "Semi-convergente"],
    correctIndex: 1
  },
  {
    id: 60,
    category: "series",
    text: "Pour une série satisfaisant le critère de d’Alembert avec uₙ₊₁/uₙ → 1 par valeurs supérieures, on conclut que la série :",
    options: ["Converge", "Diverge", "Converge absolument", "Le critère ne permet pas de conclure"],
    correctIndex: 1
  },
  {
    id: 61,
    category: "equa_diff",
    text: "Selon la Définition 0.1, l'ordre d'une équation différentielle est défini par :",
    options: [
      "L'exposant de la fonction y",
      "L'ordre le plus élevé de la fonction dérivée",
      "Le degré du polynôme caractéristique",
      "Le nombre de variables"
    ],
    correctIndex: 1
  },
  {
    id: 62,
    category: "equa_diff",
    text: "Une équation différentielle de la forme P(x)dx = Q(y)dy est appelée :",
    options: [
      "Équation homogène",
      "Équation de Bernoulli",
      "Équation à variables séparables",
      "Équation de Riccati"
    ],
    correctIndex: 2
  },
  {
    id: 63,
    category: "equa_diff",
    text: "Pour résoudre une équation différentielle homogène du premier ordre y' = f(y/x), on utilise généralement le changement de variable :",
    options: [
      "z = x/y",
      "z = y/x",
      "z = xy",
      "z = y - x"
    ],
    correctIndex: 1
  },
  {
    id: 64,
    category: "equa_diff",
    text: "La solution générale d'une équation différentielle linéaire avec second membre y = y_H(x) + y_p(x) est la somme de :",
    options: [
      "La solution de l'équation homogène et d'une constante",
      "La solution de l'équation homogène et d'une solution particulière",
      "Deux solutions particulières linéairement indépendantes",
      "La solution triviale et la solution de l'équation caractéristique"
    ],
    correctIndex: 1
  },
  {
    id: 65,
    category: "equa_diff",
    text: "Une équation de Bernoulli est de la forme y' + p(x)y = q(x)y^α. Quel changement de variable permet de la ramener à une équation linéaire ?",
    options: [
      "z = y^α",
      "z = y^{1-α}",
      "z = ln(y)",
      "z = 1/y"
    ],
    correctIndex: 1
  },
  {
    id: 66,
    category: "equa_diff",
    text: "Pour l'équation de Bernoulli y' - 2xy = -2xy², la valeur de α est 2. Le changement de variable approprié est donc :",
    options: [
      "z = y²",
      "z = 1/y",
      "z = √y",
      "z = ln(y)"
    ],
    correctIndex: 1
  },
  {
    id: 67,
    category: "equa_diff",
    text: "Une équation différentielle de Riccati (forme y' + a(x)y = b(x)y² + c(x)) peut être ramenée à une équation de Bernoulli si l'on connaît :",
    options: [
      "Une solution de l'équation homogène",
      "Les racines de l'équation caractéristique",
      "Une solution particulière y₀",
      "La primitive de c(x)"
    ],
    correctIndex: 2
  },
  {
    id: 68,
    category: "equa_diff",
    text: "Pour une équation différentielle du second ordre ay'' + by' + cy = 0, l'équation caractéristique associée est :",
    options: [
      "ax² + bx + c = d(x)",
      "ar² + br + c = 0",
      "a/r² + b/r + c = 0",
      "ar + b = 0"
    ],
    correctIndex: 1
  },
  {
    id: 69,
    category: "equa_diff",
    text: "Si l'équation caractéristique ar² + br + c = 0 admet une solution double r₀, la solution générale de l'équation homogène est :",
    options: [
      "y = λ e^{r₀ x}",
      "y = (A + Bx) e^{r₀ x}",
      "y = λ₁ cos(r₀ x) + λ₂ sin(r₀ x)",
      "y = λ e^{x/r₀}"
    ],
    correctIndex: 1
  },
  {
    id: 70,
    category: "equa_diff",
    text: "Si l'équation caractéristique admet deux solutions complexes conjuguées α ± iβ, la solution générale est de la forme :",
    options: [
      "y = e^{α x} (A cos(β x) + B sin(β x))",
      "y = e^{β x} (A cos(α x) + B sin(α x))",
      "y = (A + Bx) e^{α x} cos(β x)",
      "y = A e^{α x} + B e^{β x}"
    ],
    correctIndex: 0
  },
  {
    id: 71,
    category: "equa_diff",
    text: "Soit l'équation y'' + 2y' + 3y = x² + 2. Sous quelle forme doit-on chercher une solution particulière pour le second membre polynomial (avec c ≠ 0) ?",
    options: [
      "p(x) = ax + b",
      "p(x) = ax² + bx + c",
      "p(x) = ax³ + bx² + cx + d",
      "p(x) = A cos(x) + B sin(x)"
    ],
    correctIndex: 1
  },
  {
    id: 72,
    category: "equa_diff",
    text: "Lors de la recherche d'une solution particulière pour ay'' + by' + cy = d(x), la méthode où l'on pose y_p(x) = α(x)y₁(x) + β(x)y₂(x) s'appelle :",
    options: [
      "La méthode des coefficients indéterminés",
      "La méthode d'Euler",
      "La méthode de variation des constantes",
      "La transformation de Laplace"
    ],
    correctIndex: 2
  },
  {
    id: 73,
    category: "equa_diff",
    text: "Quel est l'ordre de l'équation différentielle (1+x²)y''y' - 2xy² + y' = 0 (Exemple 0.2) ?",
    options: ["1", "2", "3", "4"],
    correctIndex: 1
  },
  {
    id: 74,
    category: "equa_diff",
    text: "D'après la Définition 0.2, intégrer une équation différentielle consiste à :",
    options: [
      "Trouver la dérivée la plus élevée",
      "Trouver une fonction y = φ(x) vérifiant l'équation",
      "Trouver les constantes arbitraires d'intégration",
      "Déterminer les racines de l'équation caractéristique"
    ],
    correctIndex: 1
  },
  {
    id: 75,
    category: "equa_diff",
    text: "Si P et Q sont continues, l'équation à variables séparables P(x)dx = Q(y)dy admet pour intégrales les solutions de l'équation (Théorème 0.1) :",
    options: [
      "F(x) = G(y) + c",
      "F(x) + G(y) = c",
      "F(x) × G(y) = c",
      "F(x)/G(y) = c"
    ],
    correctIndex: 0
  },
  {
    id: 76,
    category: "equa_diff",
    text: "La résolution de l'équation x + yy' = 0 (Exemple 0.4.1) conduit à l'équation des courbes intégrales suivante :",
    options: [
      "y = c e^{-x}",
      "y = ±√(2c - x²)",
      "y = cx",
      "y = ln|x| + c"
    ],
    correctIndex: 1
  },
  {
    id: 77,
    category: "equa_diff",
    text: "En posant z = y/x, l'équation homogène y' = f(y/x) se ramène à une équation à variables séparables de la forme (Équation 0.6) :",
    options: [
      "dx/x = dz / (f(z) - z)",
      "dx/x = f(z) dz",
      "dx = (f(z) - z) dz",
      "dx/x = (f(z) / z) dz"
    ],
    correctIndex: 0
  },
  {
    id: 78,
    category: "equa_diff",
    text: "La solution générale d'une équation différentielle linéaire du premier ordre sans second membre y' + A(x)y = 0 est :",
    options: [
      "y = λ e^{F(x)}",
      "y = λ e^{-F(x)} où F est une primitive de A",
      "y = λ ∫A(x)dx",
      "y = constante"
    ],
    correctIndex: 1
  },
  {
    id: 79,
    category: "equa_diff",
    text: "Dans la méthode de variation de la constante pour y' + A(x)y = B(x), on cherche une solution particulière sous la forme :",
    options: [
      "y_p(x) = λ e^{-F(x)} avec λ constante",
      "y_p(x) = λ(x) e^{-F(x)} avec λ(x) fonction à déterminer",
      "y_p(x) = A(x) e^{B(x)}",
      "y_p(x) = B(x) e^{A(x)}"
    ],
    correctIndex: 1
  },
  {
    id: 80,
    category: "equa_diff",
    text: "Que devient l'équation de Bernoulli y' + p(x)y = q(x)y^α si α = 0 ?",
    options: [
      "Une équation à variables séparables",
      "Une équation linéaire sans second membre",
      "Une équation différentielle linéaire avec second membre",
      "Une équation homogène"
    ],
    correctIndex: 2
  },
  {
    id: 81,
    category: "equa_diff",
    text: "Quel est le changement de variable correct pour résoudre une équation de Bernoulli y' + p(x)y = q(x)y^α avec α ∉ {0, 1} ?",
    options: [
      "z(x) = y(x)^α",
      "z(x) = y(x)^{1-α}",
      "z(x) = ln(y(x))",
      "z(x) = 1 / y(x)"
    ],
    correctIndex: 1
  },
  {
    id: 82,
    category: "equa_diff",
    text: "Si y₀ est une solution particulière d'une équation de Riccati, le changement de variable z = 1 / (y - y₀) permet d'obtenir :",
    options: [
      "Une équation différentielle linéaire du premier ordre en z",
      "Une équation homogène",
      "Une équation à variables séparables",
      "Une autre équation de Riccati"
    ],
    correctIndex: 0
  },
  {
    id: 83,
    category: "equa_diff",
    text: "L'équation différentielle y'' + y = 0 a pour solutions y₁ = sin x et y₂ = cos x. Sa solution générale est :",
    options: [
      "y = λ sin x",
      "y = µ cos x",
      "y = λ sin x + µ cos x",
      "y = e^{x}(λ sin x + µ cos x)"
    ],
    correctIndex: 2
  },
  {
    id: 84,
    category: "equa_diff",
    text: "Si on connaît une solution particulière non nulle y₁ de ay'' + by' + cy = 0, on peut chercher une seconde solution indépendante sous la forme :",
    options: [
      "y₂(x) = y₁(x) + constante",
      "y₂(x) = e^{y₁(x)}",
      "y₂(x) = z(x) y₁(x) où z est une fonction inconnue",
      "y₂(x) = y₁'(x)"
    ],
    correctIndex: 2
  },
  {
    id: 85,
    category: "equa_diff",
    text: "Pour l'équation y'' - 4y' + 4y = 0 (Exemple 0.9), la solution générale est :",
    options: [
      "y = A e^{2x} + B e^{-2x}",
      "y = (A + Bx) e^{2x}",
      "y = e^{2x}(A cos x + B sin x)",
      "y = A cos(2x) + B sin(2x)"
    ],
    correctIndex: 1
  },
  {
    id: 86,
    category: "equa_diff",
    text: "Dans la méthode de variation des constantes pour ay'' + by' + cy = d(x), on cherche y_p = α(x)y₁ + β(x)y₂. Quelles conditions doivent satisfaire α et β ?",
    options: [
      "α'y₁ + β'y₂ = 0 et α'y₁' + β'y₂' = d(x)/a",
      "α y₁' + β y₂' = 0 et α'y₁ + β'y₂ = d(x)",
      "α'y₁ + β'y₂ = d(x)/a et α'y₁' + β'y₂' = 0",
      "α' = d(x) et β' = d(x)/a"
    ],
    correctIndex: 0
  },
  {
    id: 87,
    category: "equa_diff",
    text: "Pour résoudre ay'' + by' = d(x) où d(x) est un polynôme (cas c = 0, b ≠ 0), on cherche un polynôme solution p(x) tel que :",
    options: [
      "deg(p) = deg(d) - 1",
      "deg(p) = deg(d)",
      "deg(p) = deg(d) + 1",
      "deg(p) = deg(d) + 2"
    ],
    correctIndex: 2
  },
  {
    id: 88,
    category: "equa_diff",
    text: "Pour ay'' + by' + cy = α cos(mx) + β sin(mx), si im est racine de l'équation caractéristique (φ(im) = 0), la solution particulière s'écrit sous la forme :",
    options: [
      "y_p(x) = p cos(mx) + q sin(mx)",
      "y_p(x) = x(p cos(mx) + q sin(mx))",
      "y_p(x) = x²(p cos(mx) + q sin(mx))",
      "y_p(x) = e^{mx}(p cos(mx) + q sin(mx))"
    ],
    correctIndex: 1
  },
  {
    id: 89,
    category: "equa_diff",
    text: "Pour l'équation y'' + y = sin x (Exemple 0.12), on a φ(i) = 0. La forme de la solution particulière est :",
    options: [
      "y_p(x) = p cos x + q sin x",
      "y_p(x) = x(p cos x + q sin x)",
      "y_p(x) = A e^x sin x",
      "y_p(x) = p cos²x + q sin²x"
    ],
    correctIndex: 1
  },
  {
    id: 90,
    category: "equa_diff",
    text: "Pour résoudre ay'' + by' + cy = λ e^{mx}, si m est racine double de l'équation caractéristique (φ(m) = φ'(m) = 0), on cherche y_p sous la forme :",
    options: [
      "y_p(x) = A e^{mx}",
      "y_p(x) = Ax e^{mx}",
      "y_p(x) = Ax² e^{mx}",
      "y_p(x) = A e^{mx} + B"
    ],
    correctIndex: 2
  },
  {
    id: 91,
    category: "equa_diff",
    text: "Soit l'équation y'' - 3y' + 2y = 4e^{3x} (Exemple 0.13). Sachant que m=3 n'est pas racine de r² - 3r + 2 = 0, la solution particulière est sous la forme :",
    options: [
      "y_p(x) = C x e^{3x}",
      "y_p(x) = C e^{3x}",
      "y_p(x) = C x² e^{3x}",
      "y_p(x) = (Cx + D)e^{3x}"
    ],
    correctIndex: 1
  },
  {
    id: 92,
    category: "equa_diff",
    text: "Quel principe utilise-t-on pour trouver une solution particulière à l'équation ay'' + by' + cy = d₁(x) + d₂(x) ?",
    options: [
      "Le principe de multiplication",
      "Le principe de séparation des variables",
      "Le principe de superposition",
      "Le principe d'homogénéité"
    ],
    correctIndex: 2
  }
];