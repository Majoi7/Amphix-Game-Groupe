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
  },

  // Questions "Algèbre de Boole" — à coller dans ALL_QUESTIONS (après la question id 92)

  {
    id: 93,
    category: "algebre_boole",
    text: "L'algèbre de Boole est un système algébrique constitué de l'ensemble :",
    options: ["{0, 1}", "{0, 1, 2}", "ℕ", "{−1, 0, 1}"],
    correctIndex: 0
  },
  {
    id: 94,
    category: "algebre_boole",
    text: "Une variable booléenne est une variable qui peut prendre :",
    options: [
      "Toute valeur réelle",
      "Les valeurs entières positives",
      "Uniquement la valeur 0 ou la valeur 1",
      "Une valeur comprise entre 0 et 1"
    ],
    correctIndex: 2
  },
  {
    id: 95,
    category: "algebre_boole",
    text: "Combien d'opérateurs de base possède l'algèbre de Boole ?",
    options: ["2", "4", "5", "3"],
    correctIndex: 3
  },
  {
    id: 96,
    category: "algebre_boole",
    text: "Quels sont les trois opérateurs de base de l'algèbre de Boole ?",
    options: ["NON, XOR, NAND", "NON, ET, OU", "ET, OU, NOR", "NON, NAND, NOR"],
    correctIndex: 1
  },
  {
    id: 97,
    category: "algebre_boole",
    text: "Qui est à l'origine de l'algèbre de Boole ?",
    options: [
      "Un physicien français",
      "Un informaticien américain",
      "Le mathématicien anglais George Boole (1815 – 1864)",
      "Un mathématicien allemand"
    ],
    correctIndex: 2
  },

  // ===== 2. Opérateurs de base =====
  {
    id: 98,
    category: "algebre_boole",
    text: "L'opérateur NON (complément) appliqué à a = 0 donne :",
    options: ["0", "1", "Indéfini", "a"],
    correctIndex: 1
  },
  {
    id: 99,
    category: "algebre_boole",
    text: "L'opérateur NON a pour effet de :",
    options: [
      "Garder la valeur de la variable",
      "Mettre la variable à 0 toujours",
      "Inverser (complémenter) la valeur de la variable",
      "Mettre la variable à 1 toujours"
    ],
    correctIndex: 2
  },
  {
    id: 100,
    category: "algebre_boole",
    text: "L'opérateur ET (a.b) retourne 1 si :",
    options: ["a ou b est à 1", "a et b sont tous les deux à 1", "a et b sont à 0", "a est différent de b"],
    correctIndex: 1
  },
  {
    id: 101,
    category: "algebre_boole",
    text: "L'opérateur OU (a + b) retourne 1 si :",
    options: [
      "a et b sont à 1 seulement",
      "a et b sont à 0",
      "a est différent de b seulement",
      "Au moins l'une des deux variables est à 1"
    ],
    correctIndex: 3
  },
  {
    id: 102,
    category: "algebre_boole",
    text: "Quelle notation représente l'opérateur OU ?",
    options: ["a.b", "a + b", "ā", "ab"],
    correctIndex: 1
  },
  {
    id: 103,
    category: "algebre_boole",
    text: "Quelle notation représente l'opérateur ET ?",
    options: ["a + b", "ā", "a.b ou ab", "a / b"],
    correctIndex: 2
  },
  {
    id: 104,
    category: "algebre_boole",
    text: "En algèbre de Boole, 1 + 1 vaut :",
    options: ["0", "1", "2", "10"],
    correctIndex: 1
  },
  {
    id: 105,
    category: "algebre_boole",
    text: "En algèbre de Boole, 1 . 0 vaut :",
    options: ["1", "0", "2", "Indéfini"],
    correctIndex: 1
  },
  {
    id: 106,
    category: "algebre_boole",
    text: "Le complément de 1 (NON 1) vaut :",
    options: ["0", "1", "2", "Indéfini"],
    correctIndex: 0
  },

  // ===== 3. Tables de vérité des opérateurs =====
  {
    id: 107,
    category: "algebre_boole",
    text: "Dans la table de vérité de ET, la sortie vaut 1 uniquement pour :",
    options: ["a = 0 et b = 0", "a = 1 et b = 0", "a = 0 et b = 1", "a = 1 et b = 1"],
    correctIndex: 3
  },
  {
    id: 108,
    category: "algebre_boole",
    text: "Dans la table de vérité de ET (2 variables), combien de lignes donnent le résultat 1 ?",
    options: ["1", "2", "3", "4"],
    correctIndex: 0
  },
  {
    id: 109,
    category: "algebre_boole",
    text: "Dans la table de vérité de OU (2 variables), combien de lignes donnent le résultat 1 ?",
    options: ["1", "2", "3", "4"],
    correctIndex: 2
  },
  {
    id: 110,
    category: "algebre_boole",
    text: "Dans la table de vérité de OU, la seule ligne qui donne 0 est :",
    options: ["a = 0 et b = 0", "a = 1 et b = 1", "a = 0 et b = 1", "a = 1 et b = 0"],
    correctIndex: 0
  },
  {
    id: 111,
    category: "algebre_boole",
    text: "Une table de vérité pour une fonction à p variables contient :",
    options: ["p lignes", "2p lignes", "2^p lignes", "p² lignes"],
    correctIndex: 2
  },
  {
    id: 112,
    category: "algebre_boole",
    text: "Combien de lignes contient la table de vérité d'une fonction à 3 variables ?",
    options: ["3", "6", "9", "8"],
    correctIndex: 3
  },
  {
    id: 113,
    category: "algebre_boole",
    text: "Combien de lignes contient la table de vérité d'une fonction à 2 variables ?",
    options: ["2", "4", "6", "8"],
    correctIndex: 1
  },
  {
    id: 114,
    category: "algebre_boole",
    text: "Combien de lignes contient la table de vérité d'une fonction à 4 variables ?",
    options: ["8", "12", "16", "32"],
    correctIndex: 2
  },

  // ===== 4. Propriétés de base =====
  {
    id: 115,
    category: "algebre_boole",
    text: "La propriété d'involution s'écrit : le complément du complément de a est égal à :",
    options: ["ā", "a", "0", "1"],
    correctIndex: 1
  },
  {
    id: 116,
    category: "algebre_boole",
    text: "Idempotence : a + a est égal à :",
    options: ["2a", "1", "a", "0"],
    correctIndex: 2
  },
  {
    id: 117,
    category: "algebre_boole",
    text: "Idempotence : a . a est égal à :",
    options: ["a²", "0", "1", "a"],
    correctIndex: 3
  },
  {
    id: 118,
    category: "algebre_boole",
    text: "Complémentarité : a . ā est égal à :",
    options: ["1", "0", "a", "ā"],
    correctIndex: 1
  },
  {
    id: 119,
    category: "algebre_boole",
    text: "Complémentarité : a + ā est égal à :",
    options: ["0", "a", "ā", "1"],
    correctIndex: 3
  },
  {
    id: 120,
    category: "algebre_boole",
    text: "Élément neutre du ET : a . 1 est égal à :",
    options: ["0", "a", "1", "ā"],
    correctIndex: 1
  },
  {
    id: 121,
    category: "algebre_boole",
    text: "Élément neutre du OU : a + 0 est égal à :",
    options: ["0", "1", "a", "ā"],
    correctIndex: 2
  },
  {
    id: 122,
    category: "algebre_boole",
    text: "Élément absorbant du OU : a + 1 est égal à :",
    options: ["1", "a", "0", "ā"],
    correctIndex: 0
  },
  {
    id: 123,
    category: "algebre_boole",
    text: "Élément absorbant du ET : a . 0 est égal à :",
    options: ["a", "1", "ā", "0"],
    correctIndex: 3
  },
  {
    id: 124,
    category: "algebre_boole",
    text: "Associativité : (a + b) + c est égal à :",
    options: ["a + (b + c)", "a . (b . c)", "a + b . c", "(a . b) + c"],
    correctIndex: 0
  },
  {
    id: 125,
    category: "algebre_boole",
    text: "Distributivité : a . (b + c) est égal à :",
    options: ["a + b . c", "a.b + a.c", "a . b . c", "(a + b) . c"],
    correctIndex: 1
  },
  {
    id: 126,
    category: "algebre_boole",
    text: "Distributivité du OU sur le ET : a + (b . c) est égal à :",
    options: ["(a + b) . c", "a + b + c", "(a + b) . (a + c)", "a.b + a.c"],
    correctIndex: 2
  },

  // ===== 5. Règles de De Morgan et optimisations =====
  {
    id: 127,
    category: "algebre_boole",
    text: "Règle de De Morgan : NON(a . b) est égal à :",
    options: ["ā . b̄", "ā + b̄", "a + b", "a . b̄"],
    correctIndex: 1
  },
  {
    id: 128,
    category: "algebre_boole",
    text: "Règle de De Morgan : NON(a + b) est égal à :",
    options: ["ā + b̄", "a . b", "ā . b̄", "a + b̄"],
    correctIndex: 2
  },
  {
    id: 129,
    category: "algebre_boole",
    text: "D'après De Morgan, NON(a . b̄) est égal à :",
    options: ["ā + b", "ā . b", "a + b̄", "a . b̄"],
    correctIndex: 0
  },
  {
    id: 130,
    category: "algebre_boole",
    text: "Optimisation : a + ā.b est égal à :",
    options: ["a . b", "ā", "b", "a + b"],
    correctIndex: 3
  },
  {
    id: 131,
    category: "algebre_boole",
    text: "Simplification : a.b + a.b̄ (en factorisant a) est égal à :",
    options: ["a", "b", "1", "a . b"],
    correctIndex: 0
  },
  {
    id: 132,
    category: "algebre_boole",
    text: "Simplification : a.b + ā.b (en factorisant b) est égal à :",
    options: ["a", "1", "b", "0"],
    correctIndex: 2
  },
  {
    id: 133,
    category: "algebre_boole",
    text: "Simplification : (a + b) . (a + b̄) est égal à :",
    options: ["b", "a", "1", "a + b"],
    correctIndex: 1
  },
  {
    id: 134,
    category: "algebre_boole",
    text: "Pour simplifier une expression, il faut utiliser :",
    options: [
      "Les propriétés de l'algèbre de Boole",
      "Uniquement des calculs numériques",
      "La dérivation",
      "Les récurrences"
    ],
    correctIndex: 0
  },

  // ===== 6. Fonctions logiques =====
  {
    id: 135,
    category: "algebre_boole",
    text: "Une fonction logique prend en entrée une ou plusieurs variables booléennes et retourne :",
    options: ["Un nombre réel", "Une liste de valeurs", "Un entier quelconque", "Une valeur booléenne"],
    correctIndex: 3
  },
  {
    id: 136,
    category: "algebre_boole",
    text: "Quelles sont les deux méthodes pour définir une fonction logique ?",
    options: [
      "Par un graphe ou par un arbre",
      "Par son expression logique ou par sa table de vérité",
      "Par une dérivée ou par une primitive",
      "Par une suite ou par une série"
    ],
    correctIndex: 1
  },
  {
    id: 137,
    category: "algebre_boole",
    text: "Une table de vérité définit :",
    options: [
      "Uniquement les variables d'entrée",
      "La valeur de la fonction pour chaque combinaison possible des variables d'entrée",
      "Seulement les valeurs où la fonction vaut 1",
      "Le nombre de portes logiques"
    ],
    correctIndex: 1
  },
  {
    id: 138,
    category: "algebre_boole",
    text: "Deux fonctions logiques sont identiques si :",
    options: [
      "Elles ont le même nombre de variables",
      "Elles ont le même nombre de termes",
      "Leurs tables de vérité sont identiques",
      "Elles ont le même nom"
    ],
    correctIndex: 2
  },
  {
    id: 139,
    category: "algebre_boole",
    text: "À partir d'une expression logique, on peut :",
    options: [
      "Toujours déterminer sa table de vérité",
      "Jamais déterminer sa table de vérité",
      "Déterminer la table seulement pour 2 variables",
      "Déterminer la table seulement si f = 1"
    ],
    correctIndex: 0
  },
  {
    id: 140,
    category: "algebre_boole",
    text: "Si f(a,b) = a + b̄, alors f(0,0) vaut :",
    options: ["0", "1", "Indéfini", "a"],
    correctIndex: 1
  },
  {
    id: 141,
    category: "algebre_boole",
    text: "Si f(a,b,c) = (a + b) . c, alors f(0,0,1) vaut :",
    options: ["1", "c", "a", "0"],
    correctIndex: 3
  },

  // ===== 7. Formes canoniques =====
  {
    id: 142,
    category: "algebre_boole",
    text: "Un minterme est un groupe des variables (éventuellement complémentées) liées par des :",
    options: ["ET", "OU", "NON uniquement", "Additions"],
    correctIndex: 0
  },
  {
    id: 143,
    category: "algebre_boole",
    text: "Un maxterme est un groupe des variables (éventuellement complémentées) liées par des :",
    options: ["ET", "Multiplications", "OU", "NON uniquement"],
    correctIndex: 2
  },
  {
    id: 144,
    category: "algebre_boole",
    text: "La première forme canonique d'une fonction est :",
    options: [
      "L'intersection (ET) de maxtermes",
      "L'union (OU) de mintermes",
      "L'union (OU) de maxtermes",
      "L'intersection (ET) de mintermes"
    ],
    correctIndex: 1
  },
  {
    id: 145,
    category: "algebre_boole",
    text: "La seconde forme canonique d'une fonction est :",
    options: [
      "L'union (OU) de mintermes",
      "L'union (OU) de maxtermes",
      "L'intersection (ET) de maxtermes",
      "L'intersection (ET) de mintermes"
    ],
    correctIndex: 2
  },
  {
    id: 146,
    category: "algebre_boole",
    text: "Lequel est un minterme complet pour une fonction à 3 variables a, b, c ?",
    options: ["a . b", "a + b + c", "a + b̄", "a . b̄ . c"],
    correctIndex: 3
  },
  {
    id: 147,
    category: "algebre_boole",
    text: "Lequel est un maxterme complet pour une fonction à 3 variables a, b, c ?",
    options: ["a . b . c", "a + b̄ + c", "a . b̄", "a + b"],
    correctIndex: 1
  },
  {
    id: 148,
    category: "algebre_boole",
    text: "Pour faire apparaître la variable manquante c dans le terme a.b, on utilise le fait que :",
    options: ["c + c̄ = 1", "c . c̄ = 1", "c + c = 0", "c . c = 0"],
    correctIndex: 0
  },
  {
    id: 149,
    category: "algebre_boole",
    text: "Le terme a.b devient, pour être complet avec la variable c :",
    options: ["a.b.c", "a.b + c", "a.b.(c + c̄)", "a.b.c̄"],
    correctIndex: 2
  },

  // ===== 8. Table de vérité <-> fonction =====
  {
    id: 150,
    category: "algebre_boole",
    text: "Pour obtenir la première forme canonique à partir d'une table de vérité, on prend les lignes où f vaut :",
    options: ["0", "1", "0 et 1", "Aucune"],
    correctIndex: 1
  },
  {
    id: 151,
    category: "algebre_boole",
    text: "Dans un minterme construit depuis une ligne de la table, une variable égale à 1 est notée :",
    options: ["Xi (non complémentée)", "X̄i (complémentée)", "0", "1"],
    correctIndex: 0
  },
  {
    id: 152,
    category: "algebre_boole",
    text: "Dans un minterme construit depuis une ligne de la table, une variable égale à 0 est notée :",
    options: ["Xi (non complémentée)", "1", "X̄i (complémentée)", "0"],
    correctIndex: 2
  },
  {
    id: 153,
    category: "algebre_boole",
    text: "La ligne a = 1, b = 0, c = 1 de la table donne le minterme :",
    options: ["a . b . c", "ā . b̄ . c", "a . b̄ . c̄", "a . b̄ . c"],
    correctIndex: 3
  },
  {
    id: 154,
    category: "algebre_boole",
    text: "La ligne a = 0, b = 0, c = 1 de la table donne le minterme :",
    options: ["ā . b̄ . c", "a . b . c̄", "ā . b . c", "a . b̄ . c̄"],
    correctIndex: 0
  },
  {
    id: 155,
    category: "algebre_boole",
    text: "Une fonction à 3 variables a 5 lignes à 1 dans sa table de vérité. Sa première forme canonique contient combien de mintermes ?",
    options: ["3", "5", "8", "2"],
    correctIndex: 1
  },
  {
    id: 156,
    category: "algebre_boole",
    text: "Pour calculer la fonction sous la première forme canonique, on fait :",
    options: [
      "Le ET des mintermes",
      "Le OU des maxtermes",
      "Le OU des mintermes",
      "Le ET des maxtermes"
    ],
    correctIndex: 2
  },

  // ===== 9. Minimisation =====
  {
    id: 157,
    category: "algebre_boole",
    text: "La minimisation d'une fonction logique permet de :",
    options: [
      "Augmenter le nombre de variables",
      "L'écrire avec moins de termes et moins de portes logiques",
      "La rendre plus compliquée",
      "La convertir en décimal"
    ],
    correctIndex: 1
  },
  {
    id: 158,
    category: "algebre_boole",
    text: "Quelles sont les deux méthodes de simplification d'une fonction logique vues en cours ?",
    options: [
      "Euler et Laplace",
      "Dérivation et intégration",
      "Les propriétés de l'algèbre de Boole et les tableaux de Karnaugh",
      "Récurrence et Cauchy"
    ],
    correctIndex: 2
  },
  {
    id: 159,
    category: "algebre_boole",
    text: "Les formes canoniques d'une fonction logique sont :",
    options: [
      "Toujours des formes minimales",
      "Une définition correcte de la fonction, mais pas forcément simplifiée",
      "Incorrectes",
      "Valables seulement pour 2 variables"
    ],
    correctIndex: 1
  },

  // ===== 10. Tableaux de Karnaugh =====
  {
    id: 160,
    category: "algebre_boole",
    text: "Le tableau de Karnaugh est :",
    options: [
      "Une représentation particulière de la table de vérité d'une fonction logique",
      "Un arbre de décision",
      "Une équation différentielle",
      "Un graphe orienté"
    ],
    correctIndex: 0
  },
  {
    id: 161,
    category: "algebre_boole",
    text: "Dans un tableau de Karnaugh, le passage d'une case à une case adjacente modifie la valeur de :",
    options: ["Toutes les variables", "Deux variables", "Aucune variable", "Une seule variable"],
    correctIndex: 3
  },
  {
    id: 162,
    category: "algebre_boole",
    text: "Dans un tableau de Karnaugh, l'ordre des colonnes pour 2 variables (ab) est :",
    options: ["00, 01, 10, 11", "00, 01, 11, 10", "00, 11, 01, 10", "01, 00, 10, 11"],
    correctIndex: 1
  },
  {
    id: 163,
    category: "algebre_boole",
    text: "Le tableau de Karnaugh se referme sur lui-même, ce qui signifie que :",
    options: [
      "La colonne la plus à gauche est voisine de la colonne la plus à droite",
      "Seules les lignes sont voisines",
      "Les cases ne sont jamais voisines",
      "Seules les diagonales sont voisines"
    ],
    correctIndex: 0
  },
  {
    id: 164,
    category: "algebre_boole",
    text: "Les bits à 1 du tableau de Karnaugh sont regroupés en blocs rectangulaires de taille :",
    options: ["Quelconque", "Toujours 2", "Un multiple de 3", "Une puissance de 2 (1, 2, 4, 8...)"],
    correctIndex: 3
  },
  {
    id: 165,
    category: "algebre_boole",
    text: "Dans un tableau de Karnaugh, tous les bits à 1 doivent être :",
    options: [
      "Englobés dans au moins un bloc",
      "Englobés dans un seul bloc exactement",
      "Laissés isolés",
      "Remplacés par des 0"
    ],
    correctIndex: 0
  },
  {
    id: 166,
    category: "algebre_boole",
    text: "Un bit à 1 d'un tableau de Karnaugh peut-il appartenir à plusieurs blocs ?",
    options: ["Non, jamais", "Oui", "Seulement s'il est sur un bord", "Seulement pour 2 variables"],
    correctIndex: 1
  },
  {
    id: 167,
    category: "algebre_boole",
    text: "Pour simplifier au maximum, les blocs créés doivent être :",
    options: ["Les plus petits possibles", "De taille 1", "Les plus gros possibles", "De taille 3"],
    correctIndex: 2
  },
  {
    id: 168,
    category: "algebre_boole",
    text: "Pour trouver le terme associé à un bloc, on conserve :",
    options: [
      "Les variables qui prennent les valeurs 0 et 1",
      "Toutes les variables",
      "Aucune variable",
      "Seulement les variables qui ne changent pas de valeur dans le bloc"
    ],
    correctIndex: 3
  },
  {
    id: 169,
    category: "algebre_boole",
    text: "Dans un bloc, une variable qui reste à 1 est notée :",
    options: ["a (non complémentée)", "ā (complémentée)", "0", "Elle est ignorée"],
    correctIndex: 0
  },
  {
    id: 170,
    category: "algebre_boole",
    text: "Dans un bloc, une variable qui reste à 0 est notée :",
    options: ["a (non complémentée)", "1", "Elle est ignorée", "ā (complémentée)"],
    correctIndex: 3
  },
  {
    id: 171,
    category: "algebre_boole",
    text: "Le terme logique associé à un bloc est :",
    options: [
      "Le ET des variables qui ne changent pas",
      "Le OU des variables qui ne changent pas",
      "Le ET des variables qui changent",
      "Le OU des variables qui changent"
    ],
    correctIndex: 0
  },
  {
    id: 172,
    category: "algebre_boole",
    text: "La fonction simplifiée finale est obtenue en faisant :",
    options: ["Le ET des termes des blocs", "Le OU des termes des blocs", "Le NON des termes des blocs", "Le produit des variables"],
    correctIndex: 1
  },
  {
    id: 173,
    category: "algebre_boole",
    text: "Dans un tableau de Karnaugh, les variables qui prennent à la fois les valeurs 0 et 1 dans un bloc sont :",
    options: ["Conservées", "Complémentées", "Ignorées (non significatives)", "Doublées"],
    correctIndex: 2
  },
  {
    id: 174,
    category: "algebre_boole",
    text: "Combien de cases contient un tableau de Karnaugh à 3 variables ?",
    options: ["4", "6", "3", "8"],
    correctIndex: 3
  },
  {
    id: 175,
    category: "algebre_boole",
    text: "Combien de cases contient un tableau de Karnaugh à 4 variables ?",
    options: ["16", "8", "12", "4"],
    correctIndex: 0
  },
  {
    id: 176,
    category: "algebre_boole",
    text: "Pour f(a,b) = a + b, le tableau de Karnaugh à 2 variables contient combien de 1 ?",
    options: ["1", "2", "3", "4"],
    correctIndex: 2
  },
  {
    id: 177,
    category: "algebre_boole",
    text: "Dans un tableau à 3 variables, un bloc de 4 cases donne un terme comportant :",
    options: ["1 variable", "2 variables", "3 variables", "Aucune variable"],
    correctIndex: 0
  },
  {
    id: 178,
    category: "algebre_boole",
    text: "Dans un tableau à 3 variables, un bloc de 2 cases donne un terme comportant :",
    options: ["1 variable", "3 variables", "2 variables", "Aucune variable"],
    correctIndex: 2
  },
  {
    id: 179,
    category: "algebre_boole",
    text: "Dans un tableau à 3 variables, un bloc de 1 seule case donne un terme comportant :",
    options: ["1 variable", "2 variables", "Aucune variable", "3 variables"],
    correctIndex: 3
  },
  {
    id: 180,
    category: "algebre_boole",
    text: "Dans un tableau à 3 variables, si les 8 cases valent 1 (un seul bloc de 8), la fonction vaut :",
    options: ["Toujours 1", "Toujours 0", "a", "a + b"],
    correctIndex: 0
  },
  {
    id: 181,
    category: "algebre_boole",
    text: "Dans un tableau à 4 variables, un bloc de 8 cases donne un terme comportant :",
    options: ["2 variables", "1 variable", "3 variables", "4 variables"],
    correctIndex: 1
  },
  {
    id: 182,
    category: "algebre_boole",
    text: "Dans l'exemple du cours (3 variables), le bloc de 4 cases où a reste à 1 donne le terme :",
    options: ["ā", "b", "a", "c"],
    correctIndex: 2
  }, 
  // Questions "Conversion dans les bases" — à coller dans ALL_QUESTIONS (après la question id 182)

  {
    id: 183,
    category: "conversion_bases",
    text: "Un bit est le plus petit élément d'information. Il peut prendre combien de valeurs ?",
    options: ["1", "2", "8", "10"],
    correctIndex: 1
  },
  {
    id: 184,
    category: "conversion_bases",
    text: "Avec n bits, on peut obtenir combien de représentations différentes ?",
    options: ["n", "2n", "n²", "2ⁿ"],
    correctIndex: 3
  },
  {
    id: 185,
    category: "conversion_bases",
    text: "Avec 3 bits, combien de représentations différentes peut-on obtenir ?",
    options: ["6", "8", "9", "16"],
    correctIndex: 1
  },
  {
    id: 186,
    category: "conversion_bases",
    text: "Avec 4 bits, combien de représentations différentes peut-on obtenir ?",
    options: ["16", "8", "4", "32"],
    correctIndex: 0
  },
  {
    id: 187,
    category: "conversion_bases",
    text: "Un octet est un paquet de :",
    options: ["4 bits", "16 bits", "8 bits", "32 bits"],
    correctIndex: 2
  },
  {
    id: 188,
    category: "conversion_bases",
    text: "Un quartet est un paquet de :",
    options: ["2 bits", "4 bits", "8 bits", "16 bits"],
    correctIndex: 1
  },
  {
    id: 189,
    category: "conversion_bases",
    text: "Un octet contient combien de quartets ?",
    options: ["1", "4", "8", "2"],
    correctIndex: 3
  },
  {
    id: 190,
    category: "conversion_bases",
    text: "Un système 32 bits peut traiter simultanément combien d'octets ?",
    options: ["4", "8", "16", "32"],
    correctIndex: 0
  },
  {
    id: 191,
    category: "conversion_bases",
    text: "Un entier non signé codé sur 8 bits a pour valeur maximale :",
    options: ["256", "127", "255", "128"],
    correctIndex: 2
  },

  // ===== 2. Poids fort / poids faible =====
  {
    id: 192,
    category: "conversion_bases",
    text: "Dans l'écriture d'un nombre, le bit de poids fort est situé :",
    options: ["À droite", "À gauche", "Au milieu", "N'importe où"],
    correctIndex: 1
  },
  {
    id: 193,
    category: "conversion_bases",
    text: "Dans l'écriture d'un nombre, le bit de poids faible est situé :",
    options: ["À gauche", "Au milieu", "À droite", "N'importe où"],
    correctIndex: 2
  },
  {
    id: 194,
    category: "conversion_bases",
    text: "Le chiffre de poids fort est :",
    options: [
      "Le chiffre le moins significatif",
      "Le chiffre le plus significatif",
      "Le chiffre 0",
      "Le chiffre 1"
    ],
    correctIndex: 1
  },
  {
    id: 195,
    category: "conversion_bases",
    text: "Le poids d'un chiffre de rang r dans une base b est donné par :",
    options: ["b × r", "r^b", "b^(r−1)", "b + r"],
    correctIndex: 2
  },
  {
    id: 196,
    category: "conversion_bases",
    text: "Dans le nombre décimal 358, quel est le poids du chiffre 5 ?",
    options: ["1", "10", "100", "5"],
    correctIndex: 1
  },
  {
    id: 197,
    category: "conversion_bases",
    text: "Dans le nombre décimal 358, quel est le chiffre de poids fort ?",
    options: ["8", "5", "3", "358"],
    correctIndex: 2
  },

  // ===== 3. Les bases et leurs symboles =====
  {
    id: 198,
    category: "conversion_bases",
    text: "Quels symboles utilise la base 2 (binaire) ?",
    options: ["0 et 1", "0 à 7", "0 à 9", "0 à 9 et A à F"],
    correctIndex: 0
  },
  {
    id: 199,
    category: "conversion_bases",
    text: "Quels symboles utilise la base 8 (octale) ?",
    options: ["0 et 1", "0 à 8", "0 à 7", "0 à 9"],
    correctIndex: 2
  },
  {
    id: 200,
    category: "conversion_bases",
    text: "Quels symboles utilise la base 16 (hexadécimale) ?",
    options: ["0 à 9", "0 à 9 et A à F", "0 à 7 et A à F", "A à P"],
    correctIndex: 1
  },
  {
    id: 201,
    category: "conversion_bases",
    text: "En hexadécimal, la lettre A représente la valeur décimale :",
    options: ["9", "11", "10", "16"],
    correctIndex: 2
  },
  {
    id: 202,
    category: "conversion_bases",
    text: "En hexadécimal, la lettre F représente la valeur décimale :",
    options: ["15", "16", "14", "12"],
    correctIndex: 0
  },
  {
    id: 203,
    category: "conversion_bases",
    text: "Quelle lettre hexadécimale correspond à la valeur décimale 13 ?",
    options: ["B", "C", "E", "D"],
    correctIndex: 3
  },
  {
    id: 204,
    category: "conversion_bases",
    text: "Quelle lettre hexadécimale correspond à la valeur décimale 11 ?",
    options: ["B", "A", "C", "D"],
    correctIndex: 0
  },

  // ===== 4. Petits nombres : tableau des bases =====
  {
    id: 205,
    category: "conversion_bases",
    text: "Le nombre binaire 101 vaut en décimal :",
    options: ["3", "4", "5", "6"],
    correctIndex: 2
  },
  {
    id: 206,
    category: "conversion_bases",
    text: "Le nombre binaire 1000 vaut en décimal :",
    options: ["8", "4", "10", "16"],
    correctIndex: 0
  },
  {
    id: 207,
    category: "conversion_bases",
    text: "Le nombre binaire 1010 vaut en décimal :",
    options: ["8", "12", "9", "10"],
    correctIndex: 3
  },
  {
    id: 208,
    category: "conversion_bases",
    text: "Le nombre binaire 1100 vaut en décimal :",
    options: ["12", "10", "14", "11"],
    correctIndex: 0
  },
  {
    id: 209,
    category: "conversion_bases",
    text: "Le nombre binaire 1111 vaut en décimal :",
    options: ["16", "14", "15", "13"],
    correctIndex: 2
  },
  {
    id: 210,
    category: "conversion_bases",
    text: "Le nombre décimal 7 s'écrit en binaire :",
    options: ["110", "111", "101", "1000"],
    correctIndex: 1
  },
  {
    id: 211,
    category: "conversion_bases",
    text: "Le nombre décimal 9 s'écrit en binaire :",
    options: ["1001", "1010", "1000", "1011"],
    correctIndex: 0
  },
  {
    id: 212,
    category: "conversion_bases",
    text: "Le nombre décimal 12 s'écrit en binaire :",
    options: ["1010", "1011", "1101", "1100"],
    correctIndex: 3
  },
  {
    id: 213,
    category: "conversion_bases",
    text: "Le nombre décimal 8 s'écrit en octal :",
    options: ["8", "10", "7", "11"],
    correctIndex: 1
  },
  {
    id: 214,
    category: "conversion_bases",
    text: "Le nombre décimal 15 s'écrit en octal :",
    options: ["15", "16", "17", "F"],
    correctIndex: 2
  },

  // ===== 5. Binaire -> décimal =====
  {
    id: 215,
    category: "conversion_bases",
    text: "Pour convertir un nombre binaire en décimal, on utilise la formule :",
    options: [
      "N = Σ aᵢ × 2ⁱ",
      "N = Σ aᵢ + 2ⁱ",
      "N = Σ aᵢ / 2ⁱ",
      "N = Σ aᵢ × 10ⁱ"
    ],
    correctIndex: 0
  },
  {
    id: 216,
    category: "conversion_bases",
    text: "Le nombre binaire 1011001 vaut en décimal :",
    options: ["87", "89", "91", "93"],
    correctIndex: 1
  },
  {
    id: 217,
    category: "conversion_bases",
    text: "Le nombre binaire 11111111 vaut en décimal :",
    options: ["256", "127", "254", "255"],
    correctIndex: 3
  },
  {
    id: 218,
    category: "conversion_bases",
    text: "Le nombre binaire 10000000 vaut en décimal :",
    options: ["128", "64", "256", "127"],
    correctIndex: 0
  },

  // ===== 6. Décimal -> binaire =====
  {
    id: 219,
    category: "conversion_bases",
    text: "Pour convertir un nombre décimal en binaire par la méthode des divisions, on divise successivement par :",
    options: ["10", "8", "2", "16"],
    correctIndex: 2
  },
  {
    id: 220,
    category: "conversion_bases",
    text: "Dans la méthode des divisions par 2, quelle valeur forme la représentation binaire ?",
    options: ["Les quotients", "Les restes", "Les diviseurs", "La somme des quotients"],
    correctIndex: 1
  },
  {
    id: 221,
    category: "conversion_bases",
    text: "Dans la méthode des divisions par 2, le dernier reste obtenu correspond au bit de :",
    options: ["Poids faible", "Poids fort", "Signe", "Parité"],
    correctIndex: 1
  },
  {
    id: 222,
    category: "conversion_bases",
    text: "Le nombre décimal 13 s'écrit en binaire :",
    options: ["1011", "1110", "1101", "1001"],
    correctIndex: 2
  },
  {
    id: 223,
    category: "conversion_bases",
    text: "Le nombre décimal 20 s'écrit en binaire :",
    options: ["10100", "10010", "11000", "10101"],
    correctIndex: 0
  },
  {
    id: 224,
    category: "conversion_bases",
    text: "Le nombre décimal 25 s'écrit en binaire :",
    options: ["10101", "11001", "11010", "10011"],
    correctIndex: 1
  },
  {
    id: 225,
    category: "conversion_bases",
    text: "Le nombre décimal 255 s'écrit en binaire :",
    options: ["10000000", "11111110", "01111111", "11111111"],
    correctIndex: 3
  },
  {
    id: 226,
    category: "conversion_bases",
    text: "Le nombre décimal 397 s'écrit en binaire (exemple du cours) :",
    options: ["110001101", "101100011", "110011001", "100110101"],
    correctIndex: 0
  },
  {
    id: 227,
    category: "conversion_bases",
    text: "Pour la méthode de reconnaissance des puissances de 2, on s'aide de la suite :",
    options: [
      "1, 2, 3, 4, 5, 6, 7, 8",
      "128, 64, 32, 16, 8, 4, 2, 1",
      "100, 50, 25, 12, 6, 3, 2, 1",
      "256, 128, 64, 32, 16, 8, 4, 2"
    ],
    correctIndex: 1
  },

  // ===== 7. Hexadécimal <-> binaire <-> décimal =====
  {
    id: 228,
    category: "conversion_bases",
    text: "Pour passer du binaire à l'hexadécimal, on regroupe les bits par paquets de :",
    options: ["2", "3", "8", "4"],
    correctIndex: 3
  },
  {
    id: 229,
    category: "conversion_bases",
    text: "Pourquoi regroupe-t-on les bits par 4 pour passer en hexadécimal ?",
    options: ["Car 16 = 2⁴", "Car 4 = 2²", "Car 8 = 2³", "Car 10 = 2⁴"],
    correctIndex: 0
  },
  {
    id: 230,
    category: "conversion_bases",
    text: "Le quartet binaire 1011 correspond au chiffre hexadécimal :",
    options: ["A", "B", "C", "D"],
    correctIndex: 1
  },
  {
    id: 231,
    category: "conversion_bases",
    text: "Le quartet binaire 1111 correspond au chiffre hexadécimal :",
    options: ["E", "9", "F", "A"],
    correctIndex: 2
  },
  {
    id: 232,
    category: "conversion_bases",
    text: "Le nombre binaire 1010 0110 s'écrit en hexadécimal :",
    options: ["A6", "6A", "A5", "B6"],
    correctIndex: 0
  },
  {
    id: 233,
    category: "conversion_bases",
    text: "Le nombre binaire 1111 1111 s'écrit en hexadécimal :",
    options: ["EE", "F0", "0F", "FF"],
    correctIndex: 3
  },
  {
    id: 234,
    category: "conversion_bases",
    text: "Le nombre hexadécimal 3F s'écrit en binaire :",
    options: ["0011 1111", "1111 0011", "0011 1110", "0111 1111"],
    correctIndex: 0
  },
  {
    id: 235,
    category: "conversion_bases",
    text: "Le nombre hexadécimal 86A s'écrit en binaire (exemple du cours) :",
    options: ["1010 0110 1000", "1000 0110 1010", "1000 1010 0110", "0110 1000 1010"],
    correctIndex: 1
  },
  {
    id: 236,
    category: "conversion_bases",
    text: "Le nombre hexadécimal 10 vaut en décimal :",
    options: ["10", "8", "15", "16"],
    correctIndex: 3
  },
  {
    id: 237,
    category: "conversion_bases",
    text: "Le nombre hexadécimal 1F vaut en décimal :",
    options: ["31", "16", "30", "15"],
    correctIndex: 0
  },
  {
    id: 238,
    category: "conversion_bases",
    text: "Le nombre hexadécimal 2A vaut en décimal :",
    options: ["22", "40", "42", "12"],
    correctIndex: 2
  },
  {
    id: 239,
    category: "conversion_bases",
    text: "Le nombre hexadécimal FF vaut en décimal :",
    options: ["256", "255", "225", "240"],
    correctIndex: 1
  },
  {
    id: 240,
    category: "conversion_bases",
    text: "Pour convertir 6A1E (hexadécimal) en décimal, on calcule :",
    options: [
      "6×10³ + 10×10² + 1×10¹ + 14×10⁰",
      "6×2³ + 10×2² + 1×2¹ + 14×2⁰",
      "6×16³ + 10×16² + 1×16¹ + 14×16⁰",
      "6 + 10 + 1 + 14"
    ],
    correctIndex: 2
  },
  {
    id: 241,
    category: "conversion_bases",
    text: "Le nombre hexadécimal 6A1E vaut en décimal :",
    options: ["27166", "24576", "27616", "26176"],
    correctIndex: 0
  },
  {
    id: 242,
    category: "conversion_bases",
    text: "Dans le nombre hexadécimal 6A1E, le poids du chiffre 6 est :",
    options: ["16", "256", "4096", "6"],
    correctIndex: 2
  },

  // ===== 8. Nombres fractionnaires =====
  {
    id: 243,
    category: "conversion_bases",
    text: "Dans un nombre fractionnaire en base b, les chiffres après la virgule ont pour poids :",
    options: ["b¹, b², b³...", "b⁻¹, b⁻², b⁻³...", "b⁰, b¹, b²...", "1, 2, 3..."],
    correctIndex: 1
  },
  {
    id: 244,
    category: "conversion_bases",
    text: "En binaire, 2⁻¹ vaut :",
    options: ["0,1", "2", "0,25", "0,5"],
    correctIndex: 3
  },
  {
    id: 245,
    category: "conversion_bases",
    text: "En binaire, 2⁻² vaut :",
    options: ["0,25", "0,5", "0,125", "0,2"],
    correctIndex: 0
  },
  {
    id: 246,
    category: "conversion_bases",
    text: "En binaire, 2⁻³ vaut :",
    options: ["0,25", "0,0625", "0,125", "0,3"],
    correctIndex: 2
  },
  {
    id: 247,
    category: "conversion_bases",
    text: "Le nombre binaire (0,1)₂ vaut en décimal :",
    options: ["0,1", "0,5", "1", "0,25"],
    correctIndex: 1
  },
  {
    id: 248,
    category: "conversion_bases",
    text: "Le nombre binaire (0,101)₂ vaut en décimal :",
    options: ["0,625", "0,5", "0,75", "0,375"],
    correctIndex: 0
  },
  {
    id: 249,
    category: "conversion_bases",
    text: "Le nombre binaire (0,11)₂ vaut en décimal :",
    options: ["0,5", "0,25", "0,6", "0,75"],
    correctIndex: 3
  },
  {
    id: 250,
    category: "conversion_bases",
    text: "Pour convertir la partie fractionnaire d'un nombre décimal en binaire, on la multiplie successivement par :",
    options: ["10", "2", "16", "8"],
    correctIndex: 1
  },
  {
    id: 251,
    category: "conversion_bases",
    text: "Lors des multiplications successives par 2, chaque bit obtenu correspond à :",
    options: [
      "La partie entière du résultat (0 ou 1)",
      "La partie fractionnaire du résultat",
      "Le résultat complet",
      "Le reste de la division"
    ],
    correctIndex: 0
  },
  {
    id: 252,
    category: "conversion_bases",
    text: "On arrête les multiplications par 2 quand :",
    options: [
      "On a obtenu 8 bits",
      "La partie entière est égale à 1",
      "La partie fractionnaire devient nulle (ou que la précision souhaitée est atteinte)",
      "Le résultat dépasse 10"
    ],
    correctIndex: 2
  },
  {
    id: 253,
    category: "conversion_bases",
    text: "Le nombre décimal 0,5 s'écrit en binaire :",
    options: ["0,01", "0,11", "0,001", "0,1"],
    correctIndex: 3
  },
  {
    id: 254,
    category: "conversion_bases",
    text: "Le nombre décimal 0,25 s'écrit en binaire :",
    options: ["0,01", "0,1", "0,11", "0,001"],
    correctIndex: 0
  },
  {
    id: 255,
    category: "conversion_bases",
    text: "Le nombre décimal 0,75 s'écrit en binaire :",
    options: ["0,01", "0,101", "0,11", "0,111"],
    correctIndex: 2
  },
  {
    id: 256,
    category: "conversion_bases",
    text: "Le nombre décimal 0,375 s'écrit en binaire :",
    options: ["0,011", "0,101", "0,110", "0,0111"],
    correctIndex: 0
  },
  {
    id: 257,
    category: "conversion_bases",
    text: "Le nombre décimal 0,6875 s'écrit en binaire (exemple du cours) :",
    options: ["0,1101", "0,1011", "0,1001", "0,1110"],
    correctIndex: 1
  },
  {
    id: 258,
    category: "conversion_bases",
    text: "La conversion d'un nombre fractionnaire décimal en binaire est exacte uniquement si :",
    options: [
      "Le nombre est supérieur à 1",
      "On utilise au moins 8 bits",
      "La partie fractionnaire finit par devenir nulle",
      "Le nombre est négatif"
    ],
    correctIndex: 2
  },
  {
    id: 259,
    category: "conversion_bases",
    text: "Pour convertir 1470,7890625 en binaire, on convertit séparément :",
    options: [
      "La partie entière (divisions par 2) et la partie fractionnaire (multiplications par 2)",
      "Uniquement la partie entière",
      "Uniquement la partie fractionnaire",
      "Le nombre entier en le multipliant par 2"
    ],
    correctIndex: 0
  }, 

  // Questions "Structures algébriques — Groupes, Anneaux et Corps" (questions d'application, inspirées du TD)
// À coller dans ALL_QUESTIONS (après la question id 259)

  {
    id: 260,
    category: "structures_algebriques",
    text: "Sur ℝ, on définit a ⋆ b = ab − (a + b) + 2. Que vaut 2 ⋆ 3 ?",
    options: ["1", "3", "5", "6"],
    correctIndex: 1
  },
  {
    id: 261,
    category: "structures_algebriques",
    text: "Avec la loi a ⋆ b = ab − (a + b) + 2, que vaut 3 ⋆ 3 ?",
    options: ["5", "3", "6", "9"],
    correctIndex: 0
  },
  {
    id: 262,
    category: "structures_algebriques",
    text: "Pour la loi a ⋆ b = ab − (a + b) + 2, l'élément neutre est :",
    options: ["0", "1", "2", "−2"],
    correctIndex: 2
  },
  {
    id: 263,
    category: "structures_algebriques",
    text: "Pour la loi a ⋆ b = ab − (a + b) + 2, quel réel n'a pas de symétrique ?",
    options: ["0", "1", "2", "3"],
    correctIndex: 1
  },
  {
    id: 264,
    category: "structures_algebriques",
    text: "Pour la loi a ⋆ b = ab − (a + b) + 2, le symétrique de 3 est :",
    options: ["3/2", "1/3", "−3", "2/3"],
    correctIndex: 0
  },
  {
    id: 265,
    category: "structures_algebriques",
    text: "Pour la loi a ⋆ b = ab − (a + b) + 2, le réel 0 est son propre symétrique car 0 ⋆ 0 vaut :",
    options: ["0", "1", "2", "−2"],
    correctIndex: 2
  },

  // ===== 2. Loi x * y = x + y − xy sur ℝ (Exercice 2) =====
  {
    id: 266,
    category: "structures_algebriques",
    text: "Sur ℝ, on définit x ⋆ y = x + y − xy. Que vaut 2 ⋆ 3 ?",
    options: ["−1", "1", "5", "11"],
    correctIndex: 0
  },
  {
    id: 267,
    category: "structures_algebriques",
    text: "Pour la loi x ⋆ y = x + y − xy, l'élément neutre est :",
    options: ["1", "0", "−1", "Il n'y en a pas"],
    correctIndex: 1
  },
  {
    id: 268,
    category: "structures_algebriques",
    text: "Pour la loi x ⋆ y = x + y − xy, que vaut 1 ⋆ x pour tout réel x ?",
    options: ["x", "0", "1", "−x"],
    correctIndex: 2
  },
  {
    id: 269,
    category: "structures_algebriques",
    text: "Pour la loi x ⋆ y = x + y − xy, quel réel n'est pas symétrisable ?",
    options: ["0", "1", "2", "−1"],
    correctIndex: 1
  },
  {
    id: 270,
    category: "structures_algebriques",
    text: "Pour la loi x ⋆ y = x + y − xy, le symétrique de 2 est :",
    options: ["2", "−2", "1/2", "0"],
    correctIndex: 0
  },
  {
    id: 271,
    category: "structures_algebriques",
    text: "Pour la loi x ⋆ y = x + y − xy, le symétrique de 3 est :",
    options: ["−3", "3/2", "1/3", "2/3"],
    correctIndex: 1
  },
  {
    id: 272,
    category: "structures_algebriques",
    text: "Avec f(x) = 1 − x et la loi x ⋆ y = x + y − xy, on a f(x ⋆ y) égal à :",
    options: ["f(x) + f(y)", "f(x) × f(y)", "f(x) − f(y)", "f(x) / f(y)"],
    correctIndex: 1
  },

  // ===== 3. Loi x * y = xy + (x² − 1)(y² − 1) sur ℝ (Exercice 3) =====
  {
    id: 273,
    category: "structures_algebriques",
    text: "Sur ℝ, on définit x ⋆ y = xy + (x² − 1)(y² − 1). Que vaut 2 ⋆ 3 ?",
    options: ["6", "24", "30", "36"],
    correctIndex: 2
  },
  {
    id: 274,
    category: "structures_algebriques",
    text: "Pour la loi x ⋆ y = xy + (x² − 1)(y² − 1), que vaut 1 ⋆ x ?",
    options: ["0", "1", "x", "x²"],
    correctIndex: 2
  },
  {
    id: 275,
    category: "structures_algebriques",
    text: "Pour la loi x ⋆ y = xy + (x² − 1)(y² − 1), l'élément neutre est :",
    options: ["0", "1", "−1", "2"],
    correctIndex: 1
  },
  {
    id: 276,
    category: "structures_algebriques",
    text: "Pour la loi x ⋆ y = xy + (x² − 1)(y² − 1), on trouve (2 ⋆ 3) ⋆ 5 et 2 ⋆ (3 ⋆ 5). Que peut-on en conclure ?",
    options: [
      "Les deux valent 21726 : la loi est associative",
      "Elles valent 21726 et 128958 : la loi n'est pas associative",
      "Les deux valent 150 : la loi est associative",
      "Elles valent 150 et 207 : la loi est commutative"
    ],
    correctIndex: 1
  },
  {
    id: 277,
    category: "structures_algebriques",
    text: "Pour la loi x ⋆ y = xy + (x² − 1)(y² − 1), (ℝ, ⋆) est-il un groupe ?",
    options: [
      "Oui",
      "Non, car la loi n'est pas associative",
      "Non, car il n'y a pas d'élément neutre",
      "Non, car la loi n'est pas commutative"
    ],
    correctIndex: 1
  },
  {
    id: 278,
    category: "structures_algebriques",
    text: "Pour la loi x ⋆ y = xy + (x² − 1)(y² − 1), les solutions de 2 ⋆ x = 2 sont :",
    options: ["x = 1 seulement", "x = 1 et x = −5/3", "x = 0 et x = 2", "x = −1 et x = 5/3"],
    correctIndex: 1
  },
  {
    id: 279,
    category: "structures_algebriques",
    text: "Pour la loi x ⋆ y = xy + (x² − 1)(y² − 1), les solutions de 2 ⋆ x = 5 sont :",
    options: ["x = 4/3 et x = −2", "x = 1", "x = 5/2", "x = −4/3 et x = 2"],
    correctIndex: 0
  },
  {
    id: 280,
    category: "structures_algebriques",
    text: "Pour la loi x ⋆ y = xy + (x² − 1)(y² − 1), le réel 2 admet :",
    options: ["Aucun symétrique", "Exactement un symétrique", "Deux symétriques distincts", "Une infinité de symétriques"],
    correctIndex: 2
  },

  // ===== 4. Autres lois et symétriques usuels =====
  {
    id: 281,
    category: "structures_algebriques",
    text: "Sur ℝ, on définit x ⋆ y = x + y − 2. L'élément neutre est :",
    options: ["0", "2", "−2", "1"],
    correctIndex: 1
  },
  {
    id: 282,
    category: "structures_algebriques",
    text: "Pour la loi x ⋆ y = x + y − 2, le symétrique de 5 est :",
    options: ["−5", "1/5", "−3", "−1"],
    correctIndex: 3
  },
  {
    id: 283,
    category: "structures_algebriques",
    text: "Dans (ℤ, ×), quels éléments sont symétrisables ?",
    options: ["Tous les entiers", "Seulement 1 et −1", "Seulement 1", "Tous sauf 0"],
    correctIndex: 1
  },
  {
    id: 284,
    category: "structures_algebriques",
    text: "Dans (ℚ*, ×), le symétrique de 3/4 est :",
    options: ["−3/4", "4/3", "3/4", "−4/3"],
    correctIndex: 1
  },
  {
    id: 285,
    category: "structures_algebriques",
    text: "Dans (ℝ, ×), quel élément n'a pas d'inverse ?",
    options: ["1", "0", "−1", "2"],
    correctIndex: 1
  },

  // ===== 5. Groupes, anneaux, corps : exemples =====
  {
    id: 286,
    category: "structures_algebriques",
    text: "Lequel de ces ensembles n'est PAS un groupe pour la loi indiquée ?",
    options: ["(ℤ, +)", "(ℚ*, ×)", "(ℕ, +)", "(ℝ, +)"],
    correctIndex: 2
  },
  {
    id: 287,
    category: "structures_algebriques",
    text: "Lequel de ces ensembles est un groupe pour la loi indiquée ?",
    options: ["(ℕ, +)", "(ℤ, ×)", "(ℝ, ×)", "(ℝ*, ×)"],
    correctIndex: 3
  },
  {
    id: 288,
    category: "structures_algebriques",
    text: "(ℤ, +, ×) est un anneau mais pas un corps. Pourquoi ?",
    options: [
      "Car × n'est pas commutative",
      "Car des éléments non nuls comme 2 n'ont pas d'inverse dans ℤ",
      "Car × n'a pas d'élément neutre",
      "Car × n'est pas associative"
    ],
    correctIndex: 1
  },
  {
    id: 289,
    category: "structures_algebriques",
    text: "Lequel de ces ensembles est un corps pour l'addition et la multiplication usuelles ?",
    options: ["ℕ", "ℤ", "ℚ", "2ℤ"],
    correctIndex: 2
  },
  {
    id: 290,
    category: "structures_algebriques",
    text: "Lequel de ces ensembles n'est PAS un corps pour l'addition et la multiplication usuelles ?",
    options: ["ℚ", "ℝ", "ℂ", "ℤ"],
    correctIndex: 3
  },
  {
    id: 291,
    category: "structures_algebriques",
    text: "Quel anneau est intègre sans être un corps ?",
    options: ["ℤ", "ℚ", "ℝ", "ℂ"],
    correctIndex: 0
  },

  // ===== 6. Sous-groupes, sous-anneaux, idéaux =====
  {
    id: 292,
    category: "structures_algebriques",
    text: "Lequel de ces ensembles est un sous-groupe de (ℤ, +) ?",
    options: ["ℕ", "2ℤ", "{0, 1}", "{1, 2, 3}"],
    correctIndex: 1
  },
  {
    id: 293,
    category: "structures_algebriques",
    text: "Pourquoi ℕ n'est-il pas un sous-groupe de (ℤ, +) ?",
    options: [
      "Car 0 n'appartient pas à ℕ",
      "Car ℕ n'est pas stable par addition",
      "Car les opposés des entiers non nuls n'appartiennent pas à ℕ",
      "Car ℕ est infini"
    ],
    correctIndex: 2
  },
  {
    id: 294,
    category: "structures_algebriques",
    text: "Lequel de ces ensembles est un sous-groupe de (ℝ*, ×) ?",
    options: ["{−1, 1}", "{0, 1}", "{1, 2}", "{−1, 2}"],
    correctIndex: 0
  },
  {
    id: 295,
    category: "structures_algebriques",
    text: "Lequel de ces ensembles n'est PAS un sous-groupe de (ℤ, +) ?",
    options: ["2ℤ", "3ℤ", "2ℤ ∪ 3ℤ", "6ℤ"],
    correctIndex: 2
  },
  {
    id: 296,
    category: "structures_algebriques",
    text: "Dans (ℤ, +), le sous-groupe engendré par 4 est :",
    options: ["4ℤ", "ℤ", "2ℤ", "8ℤ"],
    correctIndex: 0
  },
  {
    id: 297,
    category: "structures_algebriques",
    text: "L'intersection des sous-groupes 2ℤ et 3ℤ de (ℤ, +) est :",
    options: ["5ℤ", "6ℤ", "ℤ", "{0}"],
    correctIndex: 1
  },
  {
    id: 298,
    category: "structures_algebriques",
    text: "ℤ est un sous-anneau de ℚ. Est-ce aussi un sous-corps de ℚ ?",
    options: [
      "Oui",
      "Non, car 2 n'a pas d'inverse dans ℤ",
      "Non, car ℤ n'est pas stable par addition",
      "Non, car 0 n'appartient pas à ℤ"
    ],
    correctIndex: 1
  },
  {
    id: 299,
    category: "structures_algebriques",
    text: "Lequel de ces ensembles est un idéal de l'anneau ℤ ?",
    options: ["ℕ", "{0, 1}", "5ℤ", "{1, 2, 3}"],
    correctIndex: 2
  },
  {
    id: 300,
    category: "structures_algebriques",
    text: "ℤ est-il un idéal de l'anneau ℚ ?",
    options: [
      "Oui",
      "Non, car 1/2 × 1 = 1/2 n'appartient pas à ℤ",
      "Non, car ℤ n'est pas un sous-groupe de (ℚ, +)",
      "Non, car 0 n'appartient pas à ℤ"
    ],
    correctIndex: 1
  },

  // ===== 7. Les ensembles ℤ[√7], H et ℚ[√2] (Exercices 4, 7, 8) =====
  {
    id: 301,
    category: "structures_algebriques",
    text: "Dans ℤ[√7], que vaut (1 + √7)(2 + √7) ?",
    options: ["9 + 3√7", "2 + 7√7", "3 + 9√7", "9 + √7"],
    correctIndex: 0
  },
  {
    id: 302,
    category: "structures_algebriques",
    text: "Soit φ(a + b√7) = a − b√7. Que vaut φ(φ(3 + 2√7)) ?",
    options: ["3 − 2√7", "−3 − 2√7", "3 + 2√7", "−3 + 2√7"],
    correctIndex: 2
  },
  {
    id: 303,
    category: "structures_algebriques",
    text: "Soit H = {x + y√3 : x, y ∈ ℤ, x² − 3y² = 1}. Lequel de ces nombres appartient à H ?",
    options: ["1 + √3", "2 + √3", "3 + √3", "1 + 2√3"],
    correctIndex: 1
  },
  {
    id: 304,
    category: "structures_algebriques",
    text: "Dans le groupe (H, ×), l'inverse de 2 + √3 est :",
    options: ["−2 − √3", "2 − √3", "1/2 + √3", "√3 − 1"],
    correctIndex: 1
  },
  {
    id: 305,
    category: "structures_algebriques",
    text: "Que vaut (2 + √3)² ? (On obtient encore un élément de H.)",
    options: ["7 + 4√3", "7 + 2√3", "4 + 4√3", "1 + 4√3"],
    correctIndex: 0
  },
  {
    id: 306,
    category: "structures_algebriques",
    text: "Dans le corps ℚ[√2], l'inverse de 1 + √2 est :",
    options: ["1 − √2", "−1 + √2", "1/2 + √2", "√2 / 2"],
    correctIndex: 1
  },
  {
    id: 307,
    category: "structures_algebriques",
    text: "Dans le corps ℚ[√2], l'inverse de 3 + √2 est :",
    options: ["(3 + √2)/7", "3 − √2", "(3 − √2)/7", "(√2 − 3)/7"],
    correctIndex: 2
  },

  // ===== 8. Morphismes =====
  {
    id: 308,
    category: "structures_algebriques",
    text: "Laquelle de ces applications est un morphisme de groupes de (ℝ, +) dans (ℝ, +) ?",
    options: ["x ↦ x + 1", "x ↦ x²", "x ↦ |x|", "x ↦ 2x"],
    correctIndex: 3
  },
  {
    id: 309,
    category: "structures_algebriques",
    text: "Soit f : (ℤ, +) → (ℤ, +) définie par f(x) = 3x. Que vaut f(−4) ?",
    options: ["12", "−12", "−7", "−1"],
    correctIndex: 1
  },
  {
    id: 310,
    category: "structures_algebriques",
    text: "Pour le morphisme exp : (ℝ, +) → (ℝ*₊, ×), l'image de l'élément neutre 0 est :",
    options: ["0", "1", "e", "−1"],
    correctIndex: 1
  },
  {
    id: 311,
    category: "structures_algebriques",
    text: "Soit f : (ℤ, +) → (ℤ, +) définie par f(x) = 5x. Son noyau Ker(f) est :",
    options: ["{0}", "5ℤ", "ℤ", "{1}"],
    correctIndex: 0
  },
  {
    id: 312,
    category: "structures_algebriques",
    text: "L'application f(x) = 5x de (ℤ, +) dans (ℤ, +) est :",
    options: [
      "Injective mais pas surjective",
      "Surjective mais pas injective",
      "Bijective",
      "Ni injective ni surjective"
    ],
    correctIndex: 0
  },
  {
    id: 313,
    category: "structures_algebriques",
    text: "Soit f : (ℂ*, ×) → (ℝ*₊, ×), z ↦ |z|. Son noyau est :",
    options: ["{1}", "{−1, 1}", "{z : |z| = 1}", "ℝ*₊"],
    correctIndex: 2
  },
  {
    id: 314,
    category: "structures_algebriques",
    text: "L'application f(x) = 2x de (ℤ, +, ×) dans (ℤ, +, ×) est-elle un morphisme d'anneaux ?",
    options: [
      "Oui",
      "Non, car f(1) = 2 ≠ 1",
      "Non, car f(0) ≠ 0",
      "Non, car f n'est pas additive"
    ],
    correctIndex: 1
  },

  // ===== 9. Groupe symétrique Sₙ : généralités =====
  {
    id: 315,
    category: "structures_algebriques",
    text: "Combien d'éléments contient le groupe symétrique S₃ ?",
    options: ["3", "6", "9", "12"],
    correctIndex: 1
  },
  {
    id: 316,
    category: "structures_algebriques",
    text: "Combien d'éléments contient le groupe symétrique S₄ ?",
    options: ["12", "16", "24", "8"],
    correctIndex: 2
  },
  {
    id: 317,
    category: "structures_algebriques",
    text: "Combien d'éléments contient le groupe symétrique S₅ ?",
    options: ["25", "60", "24", "120"],
    correctIndex: 3
  },
  {
    id: 318,
    category: "structures_algebriques",
    text: "Le groupe symétrique S₃ est-il commutatif ?",
    options: ["Oui", "Non", "Seulement si on se limite aux cycles", "On ne peut pas savoir"],
    correctIndex: 1
  },

  // ===== 10. Cycles =====
  {
    id: 319,
    category: "structures_algebriques",
    text: "Dans S₅, le cycle (1 3 5) envoie 1 sur :",
    options: ["1", "3", "5", "2"],
    correctIndex: 1
  },
  {
    id: 320,
    category: "structures_algebriques",
    text: "Dans S₅, le cycle (1 3 5) envoie 5 sur :",
    options: ["3", "5", "1", "4"],
    correctIndex: 2
  },
  {
    id: 321,
    category: "structures_algebriques",
    text: "Dans S₅, l'ensemble des points fixes du cycle (1 3 5) est :",
    options: ["{1, 3, 5}", "{2, 4}", "{1, 2}", "∅"],
    correctIndex: 1
  },
  {
    id: 322,
    category: "structures_algebriques",
    text: "Dans S₅, le support du cycle (1 3 5) est :",
    options: ["{2, 4}", "{1, 3, 5}", "{1, 2, 3, 4, 5}", "{1}"],
    correctIndex: 1
  },
  {
    id: 323,
    category: "structures_algebriques",
    text: "L'inverse du cycle (1 3 5) est :",
    options: ["(1 3 5)", "(1 3)", "(3 5)", "(1 5 3)"],
    correctIndex: 3
  },
  {
    id: 324,
    category: "structures_algebriques",
    text: "Soit σ = (1 2 3 / 2 3 1) (σ(1)=2, σ(2)=3, σ(3)=1). Que vaut σ⁻¹(1) ?",
    options: ["1", "2", "3", "Impossible à calculer"],
    correctIndex: 2
  },
  {
    id: 325,
    category: "structures_algebriques",
    text: "Dans S₃, soit σ = (1 2) et τ = (2 3). Que vaut στ(1) ?",
    options: ["1", "2", "3", "Non défini"],
    correctIndex: 1
  },
  {
    id: 326,
    category: "structures_algebriques",
    text: "Dans S₃, le produit στ de σ = (1 2) et τ = (2 3) est :",
    options: ["(1 2 3)", "(1 3 2)", "(1 2)", "L'identité"],
    correctIndex: 0
  },
  {
    id: 327,
    category: "structures_algebriques",
    text: "Les permutations (1 2) et (3 4) de S₄ :",
    options: [
      "Commutent car leurs supports sont disjoints",
      "Ne commutent pas",
      "Sont égales",
      "Sont inverses l'une de l'autre"
    ],
    correctIndex: 0
  },

  // ===== 11. Ordre d'une permutation =====
  {
    id: 328,
    category: "structures_algebriques",
    text: "Quel est l'ordre du cycle (1 2 3 4) ?",
    options: ["2", "4", "3", "24"],
    correctIndex: 1
  },
  {
    id: 329,
    category: "structures_algebriques",
    text: "Quel est l'ordre de la permutation (1 2)(3 4) ?",
    options: ["4", "2", "1", "3"],
    correctIndex: 1
  },
  {
    id: 330,
    category: "structures_algebriques",
    text: "Quel est l'ordre de la permutation (1 2)(3 4 5) ?",
    options: ["5", "6", "3", "2"],
    correctIndex: 1
  },
  {
    id: 331,
    category: "structures_algebriques",
    text: "Quel est l'ordre de la permutation (1 2 3)(4 5 6 7) ?",
    options: ["7", "4", "12", "3"],
    correctIndex: 2
  },

  // ===== 12. Signature =====
  {
    id: 332,
    category: "structures_algebriques",
    text: "Quelle est la signature d'une transposition ?",
    options: ["1", "−1", "0", "2"],
    correctIndex: 1
  },
  {
    id: 333,
    category: "structures_algebriques",
    text: "Quelle est la signature d'un 3-cycle ?",
    options: ["−1", "1", "3", "0"],
    correctIndex: 1
  },
  {
    id: 334,
    category: "structures_algebriques",
    text: "Quelle est la signature d'un 4-cycle ?",
    options: ["−1", "1", "4", "0"],
    correctIndex: 0
  },
  {
    id: 335,
    category: "structures_algebriques",
    text: "Le produit de deux permutations impaires est une permutation :",
    options: ["Paire", "Impaire", "Toujours l'identité", "On ne peut pas savoir"],
    correctIndex: 0
  },
  {
    id: 336,
    category: "structures_algebriques",
    text: "Quelle est la signature d'un produit de 3 transpositions ?",
    options: ["−1", "1", "3", "0"],
    correctIndex: 0
  },
  {
    id: 337,
    category: "structures_algebriques",
    text: "Une permutation qui s'écrit comme produit de 4 transpositions est :",
    options: ["Paire", "Impaire", "L'identité", "Un cycle de longueur 4"],
    correctIndex: 0
  },
  {
    id: 338,
    category: "structures_algebriques",
    text: "Combien d'inversions possède la permutation (1 2 3 / 3 2 1) de S₃ ?",
    options: ["1", "2", "3", "0"],
    correctIndex: 2
  },

  // ===== 13. Exercice 5 : σ = (1 2 3 4 5 6 / 3 1 5 2 6 4) et τ = (1 2 3 4 5 6 / 3 5 2 4 1 6) =====
  {
    id: 339,
    category: "structures_algebriques",
    text: "Soit σ = (1 2 3 4 5 6 / 3 1 5 2 6 4) dans S₆. Combien d'inversions possède σ ?",
    options: ["3", "4", "5", "6"],
    correctIndex: 2
  },
  {
    id: 340,
    category: "structures_algebriques",
    text: "Soit σ = (1 2 3 4 5 6 / 3 1 5 2 6 4) dans S₆. σ s'écrit :",
    options: [
      "Un 6-cycle (1 3 5 6 4 2)",
      "Le produit de deux 3-cycles",
      "Un 5-cycle",
      "Une transposition"
    ],
    correctIndex: 0
  },
  {
    id: 341,
    category: "structures_algebriques",
    text: "Soit σ = (1 2 3 4 5 6 / 3 1 5 2 6 4). Quel est l'ordre de σ ?",
    options: ["4", "5", "6", "3"],
    correctIndex: 2
  },
  {
    id: 342,
    category: "structures_algebriques",
    text: "Soit τ = (1 2 3 4 5 6 / 3 5 2 4 1 6) dans S₆. τ s'écrit :",
    options: [
      "Un 4-cycle (1 3 2 5)",
      "Un 6-cycle",
      "Le produit de deux transpositions",
      "Un 3-cycle"
    ],
    correctIndex: 0
  },
  {
    id: 343,
    category: "structures_algebriques",
    text: "Soit τ = (1 2 3 4 5 6 / 3 5 2 4 1 6). Quels sont ses points fixes ?",
    options: ["{1, 2}", "{4, 6}", "{3, 5}", "Aucun"],
    correctIndex: 1
  },
  {
    id: 344,
    category: "structures_algebriques",
    text: "Le produit στ de σ et τ (Exercice 5) est le produit de deux 3-cycles disjoints. Son ordre est donc :",
    options: ["3", "6", "9", "2"],
    correctIndex: 0
  },
  {
    id: 345,
    category: "structures_algebriques",
    text: "Les permutations σ et τ de l'Exercice 5 sont toutes les deux impaires. Que peut-on dire de στ ?",
    options: ["Elle est paire", "Elle est impaire", "Elle est l'identité", "Elle n'a pas de signature"],
    correctIndex: 0
  },

  // ===== 14. Exercice 6 : permutation de S₁₀ =====
  {
    id: 346,
    category: "structures_algebriques",
    text: "Soit σ = (1 2 3 4 5 6 7 8 9 10 / 4 8 5 9 7 10 2 3 1 6) dans S₁₀. Sa décomposition en cycles à supports disjoints est :",
    options: [
      "(1 4)(2 8 3)(5 7)(6 10 9)",
      "(1 4 9 6)(2 8 3 5 7)",
      "(1 4 9)(2 8 3 5 7)(6 10)",
      "(1 9 4)(2 7 5 3 8)(6 10)"
    ],
    correctIndex: 2
  },
  {
    id: 347,
    category: "structures_algebriques",
    text: "Pour σ = (1 4 9)(2 8 3 5 7)(6 10), quel est l'ordre de σ ?",
    options: ["15", "30", "60", "10"],
    correctIndex: 1
  },
  {
    id: 348,
    category: "structures_algebriques",
    text: "Pour σ = (1 4 9)(2 8 3 5 7)(6 10), quelle est la signature de σ ?",
    options: ["1", "−1", "3", "30"],
    correctIndex: 1
  },
  {
    id: 349,
    category: "structures_algebriques",
    text: "Pour σ = (1 2 3 4 5 6 7 8 9 10 / 4 8 5 9 7 10 2 3 1 6), combien d'inversions possède σ ?",
    options: ["25", "26", "27", "28"],
    correctIndex: 2
  },
  {
    id: 350,
    category: "structures_algebriques",
    text: "Pour σ d'ordre 30, on a σ²⁰²¹ = σ¹¹ (car 2021 = 30 × 67 + 11). Que vaut σ²⁰²¹(1) avec σ = (1 4 9)(2 8 3 5 7)(6 10) ?",
    options: ["4", "9", "1", "8"],
    correctIndex: 1
  },
  {
    id: 351,
    category: "structures_algebriques",
    text: "Avec σ = (1 4 9)(2 8 3 5 7)(6 10) et σ²⁰²¹ = σ¹¹, que vaut σ²⁰²¹(2) ?",
    options: ["8", "2", "3", "7"],
    correctIndex: 0
  },
  {
    id: 352,
    category: "structures_algebriques",
    text: "Avec σ = (1 4 9)(2 8 3 5 7)(6 10) et σ²⁰²¹ = σ¹¹, que vaut σ²⁰²¹(6) ?",
    options: ["6", "10", "1", "2"],
    correctIndex: 1
  },

  // ===== 15. Ordres et sous-groupes (Lagrange) =====
  {
    id: 353,
    category: "structures_algebriques",
    text: "Dans un groupe fini d'ordre 12, quel peut être l'ordre d'un sous-groupe ?",
    options: ["5", "7", "8", "6"],
    correctIndex: 3
  },
  {
    id: 354,
    category: "structures_algebriques",
    text: "Dans un groupe fini d'ordre 10, quel peut être l'ordre d'un élément ?",
    options: ["3", "4", "5", "6"],
    correctIndex: 2
  },
  {
    id: 355,
    category: "structures_algebriques",
    text: "Dans un groupe fini d'ordre 7, quels sont les ordres possibles pour un sous-groupe ?",
    options: [
      "1 ou 7 seulement",
      "2 ou 5",
      "3 ou 4",
      "Tous les entiers de 1 à 7"
    ],
    correctIndex: 0
  },
  {
    id: 356,
    category: "structures_algebriques",
    text: "Dans S₃, le sous-groupe engendré par un 3-cycle a pour ordre :",
    options: ["2", "3", "6", "1"],
    correctIndex: 1
  }



];