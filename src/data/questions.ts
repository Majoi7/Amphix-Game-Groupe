export const ALL_QUESTIONS = [
  {
    id: 1,
    category: "suites",
    text: String.raw`D’après la Définition 1.1, une suite numérique est une application de :`,
    options: [
      String.raw`$\mathbb{R}$ vers $\mathbb{N}$`,
      String.raw`$\mathbb{N}$ vers $\mathbb{R}$`,
      String.raw`$\mathbb{N}$ vers $\mathbb{N}$`,
      String.raw`$\mathbb{R}$ vers $\mathbb{R}$`
    ],
    correctIndex: 1
  },
  {
    id: 2,
    category: "suites",
    text: String.raw`Dans l’exemple de la suite définie par $u_n = (-1)^n$, l’ensemble des valeurs de la suite est :`,
    options: [
      String.raw`$\{0, 1\}$`,
      String.raw`$\{-1, 1\}$`,
      String.raw`$\{-1, 0, 1\}$`,
      String.raw`$]-1, 1[$`
    ],
    correctIndex: 1
  },
  {
    id: 3,
    category: "suites",
    text: String.raw`Selon la Définition 1.3, une suite constante vérifie :`,
    options: [
      String.raw`$\forall n \geq n_0,\ u_n = 0$`,
      String.raw`$\forall n \geq n_0,\ u_n = u_{n_0}$`,
      String.raw`Il existe $a \in \mathbb{R}$ tel que $\forall n \geq n_0,\ u_n = a$`,
      String.raw`La suite est à la fois majorée et minorée`
    ],
    correctIndex: 2
  },
  {
    id: 4,
    category: "suites",
    text: String.raw`Le produit de la suite $u_n = \frac{1}{n}$ et $v_n = \sqrt{n}$ (Exemple 1.7) donne la suite de terme général :`,
    options: [
      String.raw`$\sqrt{n}$`,
      String.raw`$\frac{1}{\sqrt{n}}$`,
      String.raw`$n$`,
      String.raw`$\frac{1}{n^2}$`
    ],
    correctIndex: 1
  },
  {
    id: 5,
    category: "suites",
    text: String.raw`Une suite est bornée si et seulement si :`,
    options: [
      String.raw`Elle est majorée`,
      String.raw`Elle est minorée`,
      String.raw`La suite des valeurs absolues est majorée (Proposition 1.14)`,
      String.raw`Elle est monotone`
    ],
    correctIndex: 2
  },
  {
    id: 6,
    category: "suites",
    text: String.raw`La suite $u_n = e^{-n}$ est :`,
    options: [
      String.raw`Croissante`,
      String.raw`Strictement décroissante`,
      String.raw`Constante`,
      String.raw`Non monotone`
    ],
    correctIndex: 1
  },
  {
    id: 7,
    category: "suites",
    text: String.raw`D’après la Définition 1.18, une suite $(u_n)$ converge vers $\ell$ si :`,
    options: [
      String.raw`$\forall \varepsilon > 0,\ \exists N_0,\ \forall n \geq N_0,\ |u_n - \ell| > \varepsilon$`,
      String.raw`$\forall \varepsilon > 0,\ \exists N_0,\ \forall n \geq N_0,\ |u_n - \ell| \leq \varepsilon$`,
      String.raw`$\forall \varepsilon > 0,\ \exists N_0,\ \forall n \geq N_0,\ |u_n - \ell| < \varepsilon$`,
      String.raw`$\forall \varepsilon > 0,\ \forall N_0,\ \exists n \geq N_0,\ |u_n - \ell| < \varepsilon$`
    ],
    correctIndex: 2
  },
  {
    id: 8,
    category: "suites",
    text: String.raw`Une suite convergente est :`,
    options: [
      String.raw`Toujours majorée mais pas forcément minorée`,
      String.raw`Toujours bornée`,
      String.raw`Toujours croissante`,
      String.raw`Jamais bornée`
    ],
    correctIndex: 1
  },
  {
    id: 9,
    category: "suites",
    text: String.raw`La suite $u_n = (-1)^n$ est :`,
    options: [
      String.raw`Convergente vers $0$`,
      String.raw`Divergente (pas de limite)`,
      String.raw`Convergente vers $1$`,
      String.raw`Convergente vers $-1$`
    ],
    correctIndex: 1
  },
  {
    id: 10,
    category: "suites",
    text: String.raw`Selon le corollaire 1.32, si une suite possède deux sous-suites convergeant vers deux limites différentes, alors la suite :`,
    options: [
      String.raw`Converge vers leur moyenne`,
      String.raw`Est divergente`,
      String.raw`Converge vers la plus grande limite`,
      String.raw`Est de Cauchy`
    ],
    correctIndex: 1
  },
  {
    id: 11,
    category: "suites",
    text: String.raw`Le théorème de Bolzano-Weierstrass affirme que toute suite réelle bornée :`,
    options: [
      String.raw`Converge`,
      String.raw`Possède une sous-suite convergente`,
      String.raw`Est de Cauchy`,
      String.raw`Est monotone`
    ],
    correctIndex: 1
  },
  {
    id: 12,
    category: "suites",
    text: String.raw`Deux suites $(u_n)$ et $(v_n)$ sont adjacentes si :`,
    options: [
      String.raw`Elles sont toutes deux convergentes`,
      String.raw`$u_n$ est croissante, $v_n$ décroissante et $u_n - v_n \to 0$`,
      String.raw`$u_n$ et $v_n$ sont bornées`,
      String.raw`$u_n \leq v_n$ pour tout $n$`
    ],
    correctIndex: 1
  },
  {
    id: 13,
    category: "suites",
    text: String.raw`La suite $u_n = \sum_{k=0}^{n} \dfrac{1}{k!}$ et $v_n = u_n + \dfrac{1}{n!}$ sont adjacentes. Quelle est leur limite commune ?`,
    options: [
      String.raw`$e$`,
      String.raw`$\pi$`,
      String.raw`$1$`,
      String.raw`$2$`
    ],
    correctIndex: 0
  },
  {
    id: 14,
    category: "suites",
    text: String.raw`Une suite est de Cauchy si :`,
    options: [
      String.raw`$\forall \varepsilon > 0,\ \exists N_0,\ \forall p,q \geq N_0,\ |u_p - u_q| < \varepsilon$`,
      String.raw`$\forall \varepsilon > 0,\ \exists N_0,\ \forall n \geq N_0,\ |u_n - \ell| < \varepsilon$`,
      String.raw`Elle est convergente`,
      String.raw`Elle est bornée`
    ],
    correctIndex: 0
  },
  {
    id: 15,
    category: "suites",
    text: String.raw`Dans $\mathbb{R}$, une suite est convergente si et seulement si elle est :`,
    options: [
      String.raw`Bornée`,
      String.raw`Monotone`,
      String.raw`De Cauchy`,
      String.raw`Strictement croissante`
    ],
    correctIndex: 2
  },
  {
    id: 16,
    category: "suites",
    text: String.raw`Une suite arithmétique de raison $r$ vérifie :`,
    options: [
      String.raw`$u_{n+1} = u_n \times r$`,
      String.raw`$u_{n+1} = u_n + r$`,
      String.raw`$u_{n+1} = r \times u_n + 1$`,
      String.raw`$u_n = u_0 + n^2 r$`
    ],
    correctIndex: 1
  },
  {
    id: 17,
    category: "suites",
    text: String.raw`La proposition 1.43 indique que pour une suite géométrique de raison $\alpha$, $u_n = \alpha^{n-p}u_p$. Si $u_0 = 3$ et $\alpha = 2$, alors $u_4$ vaut :`,
    options: [
      String.raw`$24$`,
      String.raw`$48$`,
      String.raw`$12$`,
      String.raw`$6$`
    ],
    correctIndex: 1
  },
  {
    id: 18,
    category: "suites",
    text: String.raw`Une suite arithmético-géométrique est définie par $u_{n+1} = \alpha u_n + r$. Si $\alpha = 1$, la suite est :`,
    options: [
      String.raw`Géométrique`,
      String.raw`Arithmétique`,
      String.raw`Constante`,
      String.raw`Harmonique`
    ],
    correctIndex: 1
  },
  {
    id: 19,
    category: "suites",
    text: String.raw`Pour la suite $u_{n+1} = 2u_n - 3$, le point fixe $\theta$ est solution de :`,
    options: [
      String.raw`$x = 2x + 3$`,
      String.raw`$x = 2x - 3$`,
      String.raw`$x = 2x$`,
      String.raw`$x = 3x - 2$`
    ],
    correctIndex: 1
  },
  {
    id: 20,
    category: "suites",
    text: String.raw`Le théorème du point fixe (Théorème 1.49) affirme que si $u_{n+1} = f(u_n)$ converge vers $\ell$ et $f$ continue en $\ell$, alors :`,
    options: [
      String.raw`$f(\ell) = u_0$`,
      String.raw`$f(\ell) = \ell$`,
      String.raw`$f(\ell) = 0$`,
      String.raw`$f'(\ell) = 0$`
    ],
    correctIndex: 1
  },
  {
    id: 21,
    category: "suites",
    text: String.raw`Dans l’exercice 1.51, $f(t) = \sqrt{t + 6}$ sur $I = [1,3]$, $f$ est croissante et $f(I) \subset I$. On en déduit que la suite définie par $u_0 = 1$, $u_{n+1} = f(u_n)$ :`,
    options: [
      String.raw`Diverge`,
      String.raw`Est monotone et reste dans $I$`,
      String.raw`N’est pas définie`,
      String.raw`Est géométrique`
    ],
    correctIndex: 1
  },
  {
    id: 22,
    category: "suites",
    text: String.raw`Une récurrence linéaire d’ordre 2 est de la forme $u_{n+2} = a u_{n+1} + b u_n$. L’équation caractéristique associée est :`,
    options: [
      String.raw`$x^2 = ax + b$`,
      String.raw`$x^2 + ax + b = 0$`,
      String.raw`$ax^2 + bx = 0$`,
      String.raw`$x^2 = a + bx$`
    ],
    correctIndex: 0
  },
  {
    id: 23,
    category: "suites",
    text: String.raw`Si l’équation caractéristique a deux racines réelles distinctes $q_1$ et $q_2$, alors la suite s’écrit :`,
    options: [
      String.raw`$u_n = (\alpha n + \beta) q_1^n$`,
      String.raw`$u_n = \alpha q_1^n + \beta q_2^n$`,
      String.raw`$u_n = r^n\bigl(\alpha \cos(n\theta) + \beta \sin(n\theta)\bigr)$`,
      String.raw`$u_n = \alpha n^2 + \beta n$`
    ],
    correctIndex: 1
  },
  {
    id: 24,
    category: "suites",
    text: String.raw`On dit que $u_n = O(v_n)$ si :`,
    options: [
      String.raw`$\frac{u_n}{v_n} \to 0$`,
      String.raw`Il existe une suite bornée $\beta_n$ telle que $u_n = \beta_n v_n$ à partir d’un certain rang`,
      String.raw`$u_n - v_n \to 0$`,
      String.raw`$u_n = v_n$ pour tout $n$`
    ],
    correctIndex: 1
  },
  {
    id: 25,
    category: "suites",
    text: String.raw`La notation $u_n = o(v_n)$ signifie que :`,
    options: [
      String.raw`$\frac{u_n}{v_n} \to 1$`,
      String.raw`$\frac{u_n}{v_n} \to 0$ (lorsque $v_n \neq 0$)`,
      String.raw`$u_n$ est bornée`,
      String.raw`$u_n$ et $v_n$ sont équivalentes`
    ],
    correctIndex: 1
  },
  {
    id: 26,
    category: "suites",
    text: String.raw`Deux suites sont équivalentes ($u_n \sim v_n$) si et seulement si :`,
    options: [
      String.raw`$u_n - v_n \to 0$`,
      String.raw`$\frac{u_n}{v_n} \to 1$ (à partir d’un rang où $v_n \neq 0$)`,
      String.raw`$u_n = O(v_n)$ et $v_n = O(u_n)$`,
      String.raw`$u_n = v_n$`
    ],
    correctIndex: 1
  },
  {
    id: 27,
    category: "suites",
    text: String.raw`D’après la Remarque 1.69, un polynôme non nul est équivalent à :`,
    options: [
      String.raw`Son terme constant`,
      String.raw`Son terme de plus bas degré`,
      String.raw`Son terme de plus haut degré`,
      String.raw`La somme de tous ses termes`
    ],
    correctIndex: 2
  },
  {
    id: 28,
    category: "suites",
    text: String.raw`La proposition 1.72 indique que si $u_n \to 0$, alors $\sin(u_n) \sim$ :`,
    options: [
      String.raw`$u_n^2$`,
      String.raw`$u_n$`,
      String.raw`$1 - \cos(u_n)$`,
      String.raw`$e^{u_n} - 1$`
    ],
    correctIndex: 1
  },
  {
    id: 29,
    category: "suites",
    text: String.raw`Selon le théorème 1.71, lequel est négligeable devant les autres ?`,
    options: [
      String.raw`$n!$`,
      String.raw`$a^n$ avec $a > 1$`,
      String.raw`$n^\alpha$ avec $\alpha > 0$`,
      String.raw`$(\ln n)^\beta$ avec $\beta > 0$`
    ],
    correctIndex: 3
  },
  {
    id: 30,
    category: "suites",
    text: String.raw`La règle de d’Alembert pour les suites (proposition 1.70) dit que si $\lim_{n\to+\infty} \dfrac{u_{n+1}}{u_n} = \ell < 1$ pour une suite positive, alors :`,
    options: [
      String.raw`$u_n \to +\infty$`,
      String.raw`$u_n \to 0$`,
      String.raw`$u_n$ converge vers $\ell$`,
      String.raw`On ne peut rien conclure`
    ],
    correctIndex: 1
  },
  {
    id: 31,
    category: "series",
    text: String.raw`La série de terme général $u_n$ est convergente si la suite des sommes partielles $S_n$ :`,
    options: [
      String.raw`Est bornée`,
      String.raw`Est monotone`,
      String.raw`Converge dans $K$`,
      String.raw`Tend vers $0$`
    ],
    correctIndex: 2
  },
  {
    id: 32,
    category: "series",
    text: String.raw`Une condition nécessaire de convergence d’une série $\sum u_n$ est :`,
    options: [
      String.raw`$u_n$ est bornée`,
      String.raw`$\lim_{n\to+\infty} u_n = 0$`,
      String.raw`$u_n \geq 0$`,
      String.raw`$S_n$ est de Cauchy`
    ],
    correctIndex: 1
  },
  {
    id: 33,
    category: "series",
    text: String.raw`La série harmonique $\sum \frac{1}{n}$ est :`,
    options: [
      String.raw`Convergente`,
      String.raw`Absolument convergente`,
      String.raw`Divergente`,
      String.raw`Alternée convergente`
    ],
    correctIndex: 2
  },
  {
    id: 34,
    category: "series",
    text: String.raw`La série de terme général $u_n = \dfrac{n+1}{n-1}$ ($n \geq 2$) est divergente car :`,
    options: [
      String.raw`$u_n \to 1 \neq 0$`,
      String.raw`$u_n$ n’est pas bornée`,
      String.raw`$u_n$ est alternée`,
      String.raw`La suite des sommes partielles n’est pas majorée`
    ],
    correctIndex: 0
  },
  {
    id: 35,
    category: "series",
    text: String.raw`Une série à termes positifs converge si et seulement si :`,
    options: [
      String.raw`$u_n \to 0$`,
      String.raw`La suite des sommes partielles est majorée`,
      String.raw`$u_n \leq \frac{1}{n}$`,
      String.raw`Le terme général décroît`
    ],
    correctIndex: 1
  },
  {
    id: 36,
    category: "series",
    text: String.raw`La règle de comparaison pour les séries à termes positifs dit que si $0 \leq u_n \leq v_n$ et $\sum v_n$ converge, alors :`,
    options: [
      String.raw`$\sum u_n$ diverge`,
      String.raw`$\sum u_n$ converge`,
      String.raw`On ne peut rien dire`,
      String.raw`$\sum u_n$ converge absolument`
    ],
    correctIndex: 1
  },
  {
    id: 37,
    category: "series",
    text: String.raw`Si $\lim_{n\to+\infty} \dfrac{u_n}{v_n} = \ell \in ]0, +\infty[$, alors les séries $\sum u_n$ et $\sum v_n$ :`,
    options: [
      String.raw`Sont toutes deux divergentes`,
      String.raw`Sont de même nature (toutes deux convergentes ou toutes deux divergentes)`,
      String.raw`Convergent vers $\ell$`,
      String.raw`Sont absolument convergentes`
    ],
    correctIndex: 1
  },
  {
    id: 38,
    category: "series",
    text: String.raw`La série de Riemann $\sum \frac{1}{n^\alpha}$ converge si et seulement si :`,
    options: [
      String.raw`$\alpha > 0$`,
      String.raw`$\alpha \geq 1$`,
      String.raw`$\alpha > 1$`,
      String.raw`$\alpha < 1$`
    ],
    correctIndex: 2
  },
  {
    id: 39,
    category: "series",
    text: String.raw`D’après le critère de Cauchy pour les séries (Théorème 2.18), si $\lim_{n\to+\infty} \sqrt[n]{u_n} = \lambda < 1$ pour une série à termes positifs, alors la série :`,
    options: [
      String.raw`Diverge`,
      String.raw`Converge`,
      String.raw`Converge absolument`,
      String.raw`Il faut $\lambda = 0$ pour conclure`
    ],
    correctIndex: 1
  },
  {
    id: 40,
    category: "series",
    text: String.raw`Le critère de d’Alembert utilise la limite $\lim_{n\to+\infty} \dfrac{u_{n+1}}{u_n}$. Si cette limite est supérieure à $1$, la série :`,
    options: [
      String.raw`Converge`,
      String.raw`Diverge`,
      String.raw`Converge absolument`,
      String.raw`Le critère ne s’applique pas`
    ],
    correctIndex: 1
  },
  {
    id: 41,
    category: "series",
    text: String.raw`Pour la série de terme général $u_n = \left(\dfrac{n+1}{2n}\right)^n$, en utilisant la racine $n$-ième, on trouve $\sqrt[n]{u_n} = \dfrac{n+1}{2n} \to \dfrac{1}{2}$. La série est donc :`,
    options: [
      String.raw`Divergente`,
      String.raw`Convergente`,
      String.raw`Semi-convergente`,
      String.raw`Le critère ne permet pas de conclure`
    ],
    correctIndex: 1
  },
  {
    id: 42,
    category: "series",
    text: String.raw`Une série $\sum u_n$ est absolument convergente si :`,
    options: [
      String.raw`$u_n \to 0$`,
      String.raw`$\sum u_n$ converge`,
      String.raw`$\sum |u_n|$ converge`,
      String.raw`$u_n \geq 0$`
    ],
    correctIndex: 2
  },
  {
    id: 43,
    category: "series",
    text: String.raw`Toute série absolument convergente est :`,
    options: [
      String.raw`Divergente`,
      String.raw`Convergente`,
      String.raw`Alternée`,
      String.raw`De Riemann`
    ],
    correctIndex: 1
  },
  {
    id: 44,
    category: "series",
    text: String.raw`Une série convergente mais non absolument convergente est dite :`,
    options: [
      String.raw`Absolument convergente`,
      String.raw`Semi-convergente`,
      String.raw`Grossièrement divergente`,
      String.raw`Harmonique`
    ],
    correctIndex: 1
  },
  {
    id: 45,
    category: "series",
    text: String.raw`La série $\sum \frac{1}{(1+i)^n}$ est :`,
    options: [
      String.raw`Divergente`,
      String.raw`Convergente mais pas absolument`,
      String.raw`Absolument convergente`,
      String.raw`Non définie`
    ],
    correctIndex: 2
  },
  {
    id: 46,
    category: "series",
    text: String.raw`La règle d’Abel (Proposition 2.28) s’applique à $\sum a_n b_n$ avec $a_n$ décroissante tendant vers $0$ et les sommes partielles de $b_n$ bornées. Elle garantit :`,
    options: [
      String.raw`La convergence absolue`,
      String.raw`La divergence`,
      String.raw`La convergence (simple)`,
      String.raw`La convergence uniforme`
    ],
    correctIndex: 2
  },
  {
    id: 47,
    category: "series",
    text: String.raw`Une série alternée dont le terme général décroît en valeur absolue vers $0$ :`,
    options: [
      String.raw`Diverge toujours`,
      String.raw`Converge (critère spécial des séries alternées)`,
      String.raw`Converge absolument`,
      String.raw`Peut diverger ou converger selon le signe`
    ],
    correctIndex: 1
  },
  {
    id: 48,
    category: "series",
    text: String.raw`Pour une série alternée convergente satisfaisant le critère spécial, le reste $R_n$ vérifie :`,
    options: [
      String.raw`$|R_n| \leq |u_{n+1}|$`,
      String.raw`$R_n = 0$`,
      String.raw`$|R_n| \leq |u_0|$`,
      String.raw`$R_n$ est du signe de $u_n$`
    ],
    correctIndex: 0
  },
  {
    id: 49,
    category: "series",
    text: String.raw`La série $\sum \frac{(-1)^n}{n^\alpha}$ ($\alpha > 0$) converge pour :`,
    options: [
      String.raw`Tout $\alpha > 0$`,
      String.raw`$\alpha > 1$ seulement`,
      String.raw`$\alpha \geq 1$`,
      String.raw`$\alpha < 1$`
    ],
    correctIndex: 0
  },
  {
    id: 50,
    category: "series",
    text: String.raw`Dans l’exemple de la série de terme général $u_n = \dfrac{\cos(n)}{\sqrt{n}}$, on peut montrer la convergence en utilisant :`,
    options: [
      String.raw`Le critère de d’Alembert`,
      String.raw`La règle d’Abel (avec $a_n = \frac{1}{\sqrt{n}}$ et $b_n = \cos(n)$)`,
      String.raw`La comparaison avec Riemann`,
      String.raw`La convergence absolue`
    ],
    correctIndex: 1
  },
  {
    id: 51,
    category: "series",
    text: String.raw`La série géométrique $\sum q^n$ converge si :`,
    options: [
      String.raw`$|q| > 1$`,
      String.raw`$|q| < 1$`,
      String.raw`$q = 1$`,
      String.raw`$q = -1$`
    ],
    correctIndex: 1
  },
  {
    id: 52,
    category: "series",
    text: String.raw`La somme de la série géométrique convergente $\sum_{n=0}^{+\infty} q^n$ est :`,
    options: [
      String.raw`$\frac{1}{1+q}$`,
      String.raw`$\frac{1}{1-q}$`,
      String.raw`$\frac{q}{1-q}$`,
      String.raw`$1 + q$`
    ],
    correctIndex: 1
  },
  {
    id: 53,
    category: "series",
    text: String.raw`Le critère de comparaison avec une intégrale (Proposition 2.15) affirme que si $f$ est positive et décroissante sur $[a,+\infty[$, alors $\sum f(n)$ et $\int_a^{+\infty} f(x)\,dx$ :`,
    options: [
      String.raw`Ont la même somme`,
      String.raw`Sont de même nature`,
      String.raw`Convergent toujours`,
      String.raw`Divergent toujours`
    ],
    correctIndex: 1
  },
  {
    id: 54,
    category: "series",
    text: String.raw`La série $\sum_{n\geq 1} \frac{1}{n^2}$ est :`,
    options: [
      String.raw`Divergente`,
      String.raw`Convergente (Riemann, $\alpha = 2 > 1$)`,
      String.raw`Convergente mais sa somme est $1$`,
      String.raw`Semi-convergente`
    ],
    correctIndex: 1
  },
  {
    id: 55,
    category: "series",
    text: String.raw`Si $\lim_{n\to+\infty} n^\alpha u_n = \ell$ avec $0 < \ell < +\infty$ et $\alpha > 1$, alors :`,
    options: [
      String.raw`La série diverge`,
      String.raw`La série converge`,
      String.raw`On ne peut rien dire`,
      String.raw`La série converge seulement si $\ell = 0$`
    ],
    correctIndex: 1
  },
  {
    id: 56,
    category: "series",
    text: String.raw`La condition nécessaire $u_n \to 0$ n’est pas suffisante pour la convergence. L’exemple donné dans le cours est :`,
    options: [
      String.raw`$\sum \frac{1}{n^2}$`,
      String.raw`$\sum \frac{1}{n}$ (série harmonique)`,
      String.raw`$\sum \frac{1}{2^n}$`,
      String.raw`$\sum (-1)^n$`
    ],
    correctIndex: 1
  },
  {
    id: 57,
    category: "series",
    text: String.raw`Le terme général de la série des sommes partielles $S_n$ pour $\sum n$ est :`,
    options: [
      String.raw`$n$`,
      String.raw`$\frac{n(n+1)}{2}$`,
      String.raw`$\frac{n(n-1)}{2}$`,
      String.raw`$n^2$`
    ],
    correctIndex: 1
  },
  {
    id: 58,
    category: "series",
    text: String.raw`Une série complexe $\sum z_n$ avec $z_n = x_n + iy_n$ converge si et seulement si :`,
    options: [
      String.raw`$\sum x_n$ et $\sum y_n$ convergent`,
      String.raw`$\sum |z_n|$ converge`,
      String.raw`$z_n \to 0$`,
      String.raw`$x_n$ et $y_n$ sont bornées`
    ],
    correctIndex: 0
  },
  {
    id: 59,
    category: "series",
    text: String.raw`La série $\sum \frac{\cos(n)}{n}$ est :`,
    options: [
      String.raw`Absolument convergente`,
      String.raw`Convergente (par Abel)`,
      String.raw`Divergente`,
      String.raw`Semi-convergente`
    ],
    correctIndex: 1
  },
  {
    id: 60,
    category: "series",
    text: String.raw`Pour une série satisfaisant le critère de d’Alembert avec $\dfrac{u_{n+1}}{u_n} \to 1$ par valeurs supérieures, on conclut que la série :`,
    options: [
      String.raw`Converge`,
      String.raw`Diverge`,
      String.raw`Converge absolument`,
      String.raw`Le critère ne permet pas de conclure`
    ],
    correctIndex: 1
  },
  {
    id: 61,
    category: "equa_diff",
    text: String.raw`Selon la Définition 0.1, l'ordre d'une équation différentielle est défini par :`,
    options: [
      String.raw`L'exposant de la fonction $y$`,
      String.raw`L'ordre le plus élevé de la fonction dérivée`,
      String.raw`Le degré du polynôme caractéristique`,
      String.raw`Le nombre de variables`
    ],
    correctIndex: 1
  },
  {
    id: 62,
    category: "equa_diff",
    text: String.raw`Une équation différentielle de la forme $P(x)\,dx = Q(y)\,dy$ est appelée :`,
    options: [
      String.raw`Équation homogène`,
      String.raw`Équation de Bernoulli`,
      String.raw`Équation à variables séparables`,
      String.raw`Équation de Riccati`
    ],
    correctIndex: 2
  },
  {
    id: 63,
    category: "equa_diff",
    text: String.raw`Pour résoudre une équation différentielle homogène du premier ordre $y' = f\left(\dfrac{y}{x}\right)$, on utilise généralement le changement de variable :`,
    options: [
      String.raw`$z = \frac{x}{y}$`,
      String.raw`$z = \frac{y}{x}$`,
      String.raw`$z = xy$`,
      String.raw`$z = y - x$`
    ],
    correctIndex: 1
  },
  {
    id: 64,
    category: "equa_diff",
    text: String.raw`La solution générale d'une équation différentielle linéaire avec second membre $y = y_H(x) + y_p(x)$ est la somme de :`,
    options: [
      String.raw`La solution de l'équation homogène et d'une constante`,
      String.raw`La solution de l'équation homogène et d'une solution particulière`,
      String.raw`Deux solutions particulières linéairement indépendantes`,
      String.raw`La solution triviale et la solution de l'équation caractéristique`
    ],
    correctIndex: 1
  },
  {
    id: 65,
    category: "equa_diff",
    text: String.raw`Une équation de Bernoulli est de la forme $y' + p(x)y = q(x)y^\alpha$. Quel changement de variable permet de la ramener à une équation linéaire ?`,
    options: [
      String.raw`$z = y^\alpha$`,
      String.raw`$z = y^{1-\alpha}$`,
      String.raw`$z = \ln(y)$`,
      String.raw`$z = \frac{1}{y}$`
    ],
    correctIndex: 1
  },
  {
    id: 66,
    category: "equa_diff",
    text: String.raw`Pour l'équation de Bernoulli $y' - 2xy = -2xy^2$, la valeur de $\alpha$ est $2$. Le changement de variable approprié est donc :`,
    options: [
      String.raw`$z = y^2$`,
      String.raw`$z = \frac{1}{y}$`,
      String.raw`$z = \sqrt{y}$`,
      String.raw`$z = \ln(y)$`
    ],
    correctIndex: 1
  },
  {
    id: 67,
    category: "equa_diff",
    text: String.raw`Une équation différentielle de Riccati (forme $y' + a(x)y = b(x)y^2 + c(x)$) peut être ramenée à une équation de Bernoulli si l'on connaît :`,
    options: [
      String.raw`Une solution de l'équation homogène`,
      String.raw`Les racines de l'équation caractéristique`,
      String.raw`Une solution particulière $y_0$`,
      String.raw`La primitive de $c(x)$`
    ],
    correctIndex: 2
  },
  {
    id: 68,
    category: "equa_diff",
    text: String.raw`Pour une équation différentielle du second ordre $ay'' + by' + cy = 0$, l'équation caractéristique associée est :`,
    options: [
      String.raw`$ax^2 + bx + c = d(x)$`,
      String.raw`$ar^2 + br + c = 0$`,
      String.raw`$\frac{a}{r^2} + \frac{b}{r} + c = 0$`,
      String.raw`$ar + b = 0$`
    ],
    correctIndex: 1
  },
  {
    id: 69,
    category: "equa_diff",
    text: String.raw`Si l'équation caractéristique $ar^2 + br + c = 0$ admet une solution double $r_0$, la solution générale de l'équation homogène est :`,
    options: [
      String.raw`$y = \lambda e^{r_0 x}$`,
      String.raw`$y = (A + Bx)e^{r_0 x}$`,
      String.raw`$y = \lambda_1 \cos(r_0 x) + \lambda_2 \sin(r_0 x)$`,
      String.raw`$y = \lambda e^{x/r_0}$`
    ],
    correctIndex: 1
  },
  {
    id: 70,
    category: "equa_diff",
    text: String.raw`Si l'équation caractéristique admet deux solutions complexes conjuguées $\alpha \pm i\beta$, la solution générale est de la forme :`,
    options: [
      String.raw`$y = e^{\alpha x}\bigl(A\cos(\beta x) + B\sin(\beta x)\bigr)$`,
      String.raw`$y = e^{\beta x}\bigl(A\cos(\alpha x) + B\sin(\alpha x)\bigr)$`,
      String.raw`$y = (A + Bx)e^{\alpha x}\cos(\beta x)$`,
      String.raw`$y = Ae^{\alpha x} + Be^{\beta x}$`
    ],
    correctIndex: 0
  },
  {
    id: 71,
    category: "equa_diff",
    text: String.raw`Soit l'équation $y'' + 2y' + 3y = x^2 + 2$. Sous quelle forme doit-on chercher une solution particulière pour le second membre polynomial (avec $c \neq 0$) ?`,
    options: [
      String.raw`$p(x) = ax + b$`,
      String.raw`$p(x) = ax^2 + bx + c$`,
      String.raw`$p(x) = ax^3 + bx^2 + cx + d$`,
      String.raw`$p(x) = A\cos(x) + B\sin(x)$`
    ],
    correctIndex: 1
  },
  {
    id: 72,
    category: "equa_diff",
    text: String.raw`Lors de la recherche d'une solution particulière pour $ay'' + by' + cy = d(x)$, la méthode où l'on pose $y_p(x) = \alpha(x)y_1(x) + \beta(x)y_2(x)$ s'appelle :`,
    options: [
      String.raw`La méthode des coefficients indéterminés`,
      String.raw`La méthode d'Euler`,
      String.raw`La méthode de variation des constantes`,
      String.raw`La transformation de Laplace`
    ],
    correctIndex: 2
  },
  {
    id: 73,
    category: "equa_diff",
    text: String.raw`Quel est l'ordre de l'équation différentielle $(1+x^2)y''y' - 2xy^2 + y' = 0$ (Exemple 0.2) ?`,
    options: [
      String.raw`$1$`,
      String.raw`$2$`,
      String.raw`$3$`,
      String.raw`$4$`
    ],
    correctIndex: 1
  },
  {
    id: 74,
    category: "equa_diff",
    text: String.raw`D'après la Définition 0.2, intégrer une équation différentielle consiste à :`,
    options: [
      String.raw`Trouver la dérivée la plus élevée`,
      String.raw`Trouver une fonction $y = \varphi(x)$ vérifiant l'équation`,
      String.raw`Trouver les constantes arbitraires d'intégration`,
      String.raw`Déterminer les racines de l'équation caractéristique`
    ],
    correctIndex: 1
  },
  {
    id: 75,
    category: "equa_diff",
    text: String.raw`Si $P$ et $Q$ sont continues, l'équation à variables séparables $P(x)\,dx = Q(y)\,dy$ admet pour intégrales les solutions de l'équation (Théorème 0.1) :`,
    options: [
      String.raw`$F(x) = G(y) + c$`,
      String.raw`$F(x) + G(y) = c$`,
      String.raw`$F(x) \times G(y) = c$`,
      String.raw`$\frac{F(x)}{G(y)} = c$`
    ],
    correctIndex: 0
  },
  {
    id: 76,
    category: "equa_diff",
    text: String.raw`La résolution de l'équation $x + yy' = 0$ (Exemple 0.4.1) conduit à l'équation des courbes intégrales suivante :`,
    options: [
      String.raw`$y = ce^{-x}$`,
      String.raw`$y = \pm\sqrt{2c - x^2}$`,
      String.raw`$y = cx$`,
      String.raw`$y = \ln|x| + c$`
    ],
    correctIndex: 1
  },
  {
    id: 77,
    category: "equa_diff",
    text: String.raw`En posant $z = \dfrac{y}{x}$, l'équation homogène $y' = f\left(\dfrac{y}{x}\right)$ se ramène à une équation à variables séparables de la forme (Équation 0.6) :`,
    options: [
      String.raw`$\frac{dx}{x} = \frac{dz}{f(z) - z}$`,
      String.raw`$\frac{dx}{x} = f(z)\,dz$`,
      String.raw`$dx = \bigl(f(z) - z\bigr)\,dz$`,
      String.raw`$\frac{dx}{x} = \frac{f(z)}{z}\,dz$`
    ],
    correctIndex: 0
  },
  {
    id: 78,
    category: "equa_diff",
    text: String.raw`La solution générale d'une équation différentielle linéaire du premier ordre sans second membre $y' + A(x)y = 0$ est :`,
    options: [
      String.raw`$y = \lambda e^{F(x)}$`,
      String.raw`$y = \lambda e^{-F(x)}$ où $F$ est une primitive de $A$`,
      String.raw`$y = \lambda \int A(x)\,dx$`,
      String.raw`$y =$ constante`
    ],
    correctIndex: 1
  },
  {
    id: 79,
    category: "equa_diff",
    text: String.raw`Dans la méthode de variation de la constante pour $y' + A(x)y = B(x)$, on cherche une solution particulière sous la forme :`,
    options: [
      String.raw`$y_p(x) = \lambda e^{-F(x)}$ avec $\lambda$ constante`,
      String.raw`$y_p(x) = \lambda(x)e^{-F(x)}$ avec $\lambda(x)$ fonction à déterminer`,
      String.raw`$y_p(x) = A(x)e^{B(x)}$`,
      String.raw`$y_p(x) = B(x)e^{A(x)}$`
    ],
    correctIndex: 1
  },
  {
    id: 80,
    category: "equa_diff",
    text: String.raw`Que devient l'équation de Bernoulli $y' + p(x)y = q(x)y^\alpha$ si $\alpha = 0$ ?`,
    options: [
      String.raw`Une équation à variables séparables`,
      String.raw`Une équation linéaire sans second membre`,
      String.raw`Une équation différentielle linéaire avec second membre`,
      String.raw`Une équation homogène`
    ],
    correctIndex: 2
  },
  {
    id: 81,
    category: "equa_diff",
    text: String.raw`Quel est le changement de variable correct pour résoudre une équation de Bernoulli $y' + p(x)y = q(x)y^\alpha$ avec $\alpha \notin \{0, 1\}$ ?`,
    options: [
      String.raw`$z(x) = y(x)^\alpha$`,
      String.raw`$z(x) = y(x)^{1-\alpha}$`,
      String.raw`$z(x) = \ln(y(x))$`,
      String.raw`$z(x) = \frac{1}{y(x)}$`
    ],
    correctIndex: 1
  },
  {
    id: 82,
    category: "equa_diff",
    text: String.raw`Si $y_0$ est une solution particulière d'une équation de Riccati, le changement de variable $z = \dfrac{1}{y - y_0}$ permet d'obtenir :`,
    options: [
      String.raw`Une équation différentielle linéaire du premier ordre en $z$`,
      String.raw`Une équation homogène`,
      String.raw`Une équation à variables séparables`,
      String.raw`Une autre équation de Riccati`
    ],
    correctIndex: 0
  },
  {
    id: 83,
    category: "equa_diff",
    text: String.raw`L'équation différentielle $y'' + y = 0$ a pour solutions $y_1 = \sin(x)$ et $y_2 = \cos(x)$. Sa solution générale est :`,
    options: [
      String.raw`$y = \lambda\sin(x)$`,
      String.raw`$y = \mu\cos(x)$`,
      String.raw`$y = \lambda\sin(x) + \mu\cos(x)$`,
      String.raw`$y = e^x\bigl(\lambda\sin(x) + \mu\cos(x)\bigr)$`
    ],
    correctIndex: 2
  },
  {
    id: 84,
    category: "equa_diff",
    text: String.raw`Si on connaît une solution particulière non nulle $y_1$ de $ay'' + by' + cy = 0$, on peut chercher une seconde solution indépendante sous la forme :`,
    options: [
      String.raw`$y_2(x) = y_1(x) +$ constante`,
      String.raw`$y_2(x) = e^{y_1(x)}$`,
      String.raw`$y_2(x) = z(x)y_1(x)$ où $z$ est une fonction inconnue`,
      String.raw`$y_2(x) = y_1'(x)$`
    ],
    correctIndex: 2
  },
  {
    id: 85,
    category: "equa_diff",
    text: String.raw`Pour l'équation $y'' - 4y' + 4y = 0$ (Exemple 0.9), la solution générale est :`,
    options: [
      String.raw`$y = Ae^{2x} + Be^{-2x}$`,
      String.raw`$y = (A + Bx)e^{2x}$`,
      String.raw`$y = e^{2x}\bigl(A\cos(x) + B\sin(x)\bigr)$`,
      String.raw`$y = A\cos(2x) + B\sin(2x)$`
    ],
    correctIndex: 1
  },
  {
    id: 86,
    category: "equa_diff",
    text: String.raw`Dans la méthode de variation des constantes pour $ay'' + by' + cy = d(x)$, on cherche $y_p = \alpha(x)y_1 + \beta(x)y_2$. Quelles conditions doivent satisfaire $\alpha$ et $\beta$ ?`,
    options: [
      String.raw`$$\begin{aligned} \alpha'y_1 + \beta'y_2 &= 0 \\ \alpha'y_1' + \beta'y_2' &= \dfrac{d(x)}{a} \end{aligned}$$`,
      String.raw`$$\begin{aligned} \alpha y_1' + \beta y_2' &= 0 \\ \alpha'y_1 + \beta'y_2 &= d(x) \end{aligned}$$`,
      String.raw`$$\begin{aligned} \alpha'y_1 + \beta'y_2 &= \dfrac{d(x)}{a} \\ \alpha'y_1' + \beta'y_2' &= 0 \end{aligned}$$`,
      String.raw`$$\begin{aligned} \alpha' &= d(x) \\ \beta' &= \dfrac{d(x)}{a} \end{aligned}$$`
    ],
    correctIndex: 0
  },
  {
    id: 87,
    category: "equa_diff",
    text: String.raw`Pour résoudre $ay'' + by' = d(x)$ où $d(x)$ est un polynôme (cas $c = 0$, $b \neq 0$), on cherche un polynôme solution $p(x)$ tel que :`,
    options: [
      String.raw`$\deg(p) = \deg(d) - 1$`,
      String.raw`$\deg(p) = \deg(d)$`,
      String.raw`$\deg(p) = \deg(d) + 1$`,
      String.raw`$\deg(p) = \deg(d) + 2$`
    ],
    correctIndex: 2
  },
  {
    id: 88,
    category: "equa_diff",
    text: String.raw`Pour $ay'' + by' + cy = \alpha\cos(mx) + \beta\sin(mx)$, si $im$ est racine de l'équation caractéristique ($\varphi(im) = 0$), la solution particulière s'écrit sous la forme :`,
    options: [
      String.raw`$y_p(x) = p\cos(mx) + q\sin(mx)$`,
      String.raw`$y_p(x) = x\bigl(p\cos(mx) + q\sin(mx)\bigr)$`,
      String.raw`$y_p(x) = x^2\bigl(p\cos(mx) + q\sin(mx)\bigr)$`,
      String.raw`$y_p(x) = e^{mx}\bigl(p\cos(mx) + q\sin(mx)\bigr)$`
    ],
    correctIndex: 1
  },
  {
    id: 89,
    category: "equa_diff",
    text: String.raw`Pour l'équation $y'' + y = \sin(x)$ (Exemple 0.12), on a $\varphi(i) = 0$. La forme de la solution particulière est :`,
    options: [
      String.raw`$y_p(x) = p\cos(x) + q\sin(x)$`,
      String.raw`$y_p(x) = x\bigl(p\cos(x) + q\sin(x)\bigr)$`,
      String.raw`$y_p(x) = Ae^x\sin(x)$`,
      String.raw`$y_p(x) = p\cos^2(x) + q\sin^2(x)$`
    ],
    correctIndex: 1
  },
  {
    id: 90,
    category: "equa_diff",
    text: String.raw`Pour résoudre $ay'' + by' + cy = \lambda e^{mx}$, si $m$ est racine double de l'équation caractéristique ($\varphi(m) = \varphi'(m) = 0$), on cherche $y_p$ sous la forme :`,
    options: [
      String.raw`$y_p(x) = Ae^{mx}$`,
      String.raw`$y_p(x) = Axe^{mx}$`,
      String.raw`$y_p(x) = Ax^2 e^{mx}$`,
      String.raw`$y_p(x) = Ae^{mx} + B$`
    ],
    correctIndex: 2
  },
  {
    id: 91,
    category: "equa_diff",
    text: String.raw`Soit l'équation $y'' - 3y' + 2y = 4e^{3x}$ (Exemple 0.13). Sachant que $m = 3$ n'est pas racine de $r^2 - 3r + 2 = 0$, la solution particulière est sous la forme :`,
    options: [
      String.raw`$y_p(x) = Cxe^{3x}$`,
      String.raw`$y_p(x) = Ce^{3x}$`,
      String.raw`$y_p(x) = Cx^2 e^{3x}$`,
      String.raw`$y_p(x) = (Cx + D)e^{3x}$`
    ],
    correctIndex: 1
  },
  {
    id: 92,
    category: "equa_diff",
    text: String.raw`Quel principe utilise-t-on pour trouver une solution particulière à l'équation $ay'' + by' + cy = d_1(x) + d_2(x)$ ?`,
    options: [
      String.raw`Le principe de multiplication`,
      String.raw`Le principe de séparation des variables`,
      String.raw`Le principe de superposition`,
      String.raw`Le principe d'homogénéité`
    ],
    correctIndex: 2
  },

  // Questions "Algèbre de Boole" — à coller dans ALL_QUESTIONS (après la question id 92)

  {
    id: 93,
    category: "algebre_boole",
    text: String.raw`L'algèbre de Boole est un système algébrique constitué de l'ensemble :`,
    options: [
      String.raw`$\{0, 1\}$`,
      String.raw`$\{0, 1, 2\}$`,
      String.raw`$\mathbb{N}$`,
      String.raw`$\{-1, 0, 1\}$`
    ],
    correctIndex: 0
  },
  {
    id: 94,
    category: "algebre_boole",
    text: String.raw`Une variable booléenne est une variable qui peut prendre :`,
    options: [
      String.raw`Toute valeur réelle`,
      String.raw`Les valeurs entières positives`,
      String.raw`Uniquement la valeur $0$ ou la valeur $1$`,
      String.raw`Une valeur comprise entre $0$ et $1$`
    ],
    correctIndex: 2
  },
  {
    id: 95,
    category: "algebre_boole",
    text: String.raw`Combien d'opérateurs de base possède l'algèbre de Boole ?`,
    options: [
      String.raw`$2$`,
      String.raw`$4$`,
      String.raw`$5$`,
      String.raw`$3$`
    ],
    correctIndex: 3
  },
  {
    id: 96,
    category: "algebre_boole",
    text: String.raw`Quels sont les trois opérateurs de base de l'algèbre de Boole ?`,
    options: [
      String.raw`NON, XOR, NAND`,
      String.raw`NON, ET, OU`,
      String.raw`ET, OU, NOR`,
      String.raw`NON, NAND, NOR`
    ],
    correctIndex: 1
  },
  {
    id: 97,
    category: "algebre_boole",
    text: String.raw`Qui est à l'origine de l'algèbre de Boole ?`,
    options: [
      String.raw`Un physicien français`,
      String.raw`Un informaticien américain`,
      String.raw`Le mathématicien anglais George Boole (1815 – 1864)`,
      String.raw`Un mathématicien allemand`
    ],
    correctIndex: 2
  },

  // ===== 2. Opérateurs de base =====
  {
    id: 98,
    category: "algebre_boole",
    text: String.raw`L'opérateur NON (complément) appliqué à $a = 0$ donne :`,
    options: [
      String.raw`$0$`,
      String.raw`$1$`,
      String.raw`Indéfini`,
      String.raw`$a$`
    ],
    correctIndex: 1
  },
  {
    id: 99,
    category: "algebre_boole",
    text: String.raw`L'opérateur NON a pour effet de :`,
    options: [
      String.raw`Garder la valeur de la variable`,
      String.raw`Mettre la variable à $0$ toujours`,
      String.raw`Inverser (complémenter) la valeur de la variable`,
      String.raw`Mettre la variable à $1$ toujours`
    ],
    correctIndex: 2
  },
  {
    id: 100,
    category: "algebre_boole",
    text: String.raw`L'opérateur ET ($a \cdot b$) retourne $1$ si :`,
    options: [
      String.raw`$a$ ou $b$ est à $1$`,
      String.raw`$a$ et $b$ sont tous les deux à $1$`,
      String.raw`$a$ et $b$ sont à $0$`,
      String.raw`$a$ est différent de $b$`
    ],
    correctIndex: 1
  },
  {
    id: 101,
    category: "algebre_boole",
    text: String.raw`L'opérateur OU ($a + b$) retourne $1$ si :`,
    options: [
      String.raw`$a$ et $b$ sont à $1$ seulement`,
      String.raw`$a$ et $b$ sont à $0$`,
      String.raw`$a$ est différent de $b$ seulement`,
      String.raw`Au moins l'une des deux variables est à $1$`
    ],
    correctIndex: 3
  },
  {
    id: 102,
    category: "algebre_boole",
    text: String.raw`Quelle notation représente l'opérateur OU ?`,
    options: [
      String.raw`$a \cdot b$`,
      String.raw`$a + b$`,
      String.raw`$\bar{a}$`,
      String.raw`$ab$`
    ],
    correctIndex: 1
  },
  {
    id: 103,
    category: "algebre_boole",
    text: String.raw`Quelle notation représente l'opérateur ET ?`,
    options: [
      String.raw`$a + b$`,
      String.raw`$\bar{a}$`,
      String.raw`$a \cdot b$ ou $ab$`,
      String.raw`$\frac{a}{b}$`
    ],
    correctIndex: 2
  },
  {
    id: 104,
    category: "algebre_boole",
    text: String.raw`En algèbre de Boole, $1 + 1$ vaut :`,
    options: [
      String.raw`$0$`,
      String.raw`$1$`,
      String.raw`$2$`,
      String.raw`$10$`
    ],
    correctIndex: 1
  },
  {
    id: 105,
    category: "algebre_boole",
    text: String.raw`En algèbre de Boole, $1 \cdot 0$ vaut :`,
    options: [
      String.raw`$1$`,
      String.raw`$0$`,
      String.raw`$2$`,
      String.raw`Indéfini`
    ],
    correctIndex: 1
  },
  {
    id: 106,
    category: "algebre_boole",
    text: String.raw`Le complément de $1$ (NON $1$) vaut :`,
    options: [
      String.raw`$0$`,
      String.raw`$1$`,
      String.raw`$2$`,
      String.raw`Indéfini`
    ],
    correctIndex: 0
  },

  // ===== 3. Tables de vérité des opérateurs =====
  {
    id: 107,
    category: "algebre_boole",
    text: String.raw`Dans la table de vérité de ET, la sortie vaut $1$ uniquement pour :`,
    options: [
      String.raw`$a = 0$ et $b = 0$`,
      String.raw`$a = 1$ et $b = 0$`,
      String.raw`$a = 0$ et $b = 1$`,
      String.raw`$a = 1$ et $b = 1$`
    ],
    correctIndex: 3
  },
  {
    id: 108,
    category: "algebre_boole",
    text: String.raw`Dans la table de vérité de ET (2 variables), combien de lignes donnent le résultat $1$ ?`,
    options: [
      String.raw`$1$`,
      String.raw`$2$`,
      String.raw`$3$`,
      String.raw`$4$`
    ],
    correctIndex: 0
  },
  {
    id: 109,
    category: "algebre_boole",
    text: String.raw`Dans la table de vérité de OU (2 variables), combien de lignes donnent le résultat $1$ ?`,
    options: [
      String.raw`$1$`,
      String.raw`$2$`,
      String.raw`$3$`,
      String.raw`$4$`
    ],
    correctIndex: 2
  },
  {
    id: 110,
    category: "algebre_boole",
    text: String.raw`Dans la table de vérité de OU, la seule ligne qui donne $0$ est :`,
    options: [
      String.raw`$a = 0$ et $b = 0$`,
      String.raw`$a = 1$ et $b = 1$`,
      String.raw`$a = 0$ et $b = 1$`,
      String.raw`$a = 1$ et $b = 0$`
    ],
    correctIndex: 0
  },
  {
    id: 111,
    category: "algebre_boole",
    text: String.raw`Une table de vérité pour une fonction à $p$ variables contient :`,
    options: [
      String.raw`$p$ lignes`,
      String.raw`$2p$ lignes`,
      String.raw`$2^p$ lignes`,
      String.raw`$p^2$ lignes`
    ],
    correctIndex: 2
  },
  {
    id: 112,
    category: "algebre_boole",
    text: String.raw`Combien de lignes contient la table de vérité d'une fonction à 3 variables ?`,
    options: [
      String.raw`$3$`,
      String.raw`$6$`,
      String.raw`$9$`,
      String.raw`$8$`
    ],
    correctIndex: 3
  },
  {
    id: 113,
    category: "algebre_boole",
    text: String.raw`Combien de lignes contient la table de vérité d'une fonction à 2 variables ?`,
    options: [
      String.raw`$2$`,
      String.raw`$4$`,
      String.raw`$6$`,
      String.raw`$8$`
    ],
    correctIndex: 1
  },
  {
    id: 114,
    category: "algebre_boole",
    text: String.raw`Combien de lignes contient la table de vérité d'une fonction à 4 variables ?`,
    options: [
      String.raw`$8$`,
      String.raw`$12$`,
      String.raw`$16$`,
      String.raw`$32$`
    ],
    correctIndex: 2
  },

  // ===== 4. Propriétés de base =====
  {
    id: 115,
    category: "algebre_boole",
    text: String.raw`La propriété d'involution s'écrit : le complément du complément de $a$ est égal à :`,
    options: [
      String.raw`$\bar{a}$`,
      String.raw`$a$`,
      String.raw`$0$`,
      String.raw`$1$`
    ],
    correctIndex: 1
  },
  {
    id: 116,
    category: "algebre_boole",
    text: String.raw`Idempotence : $a + a$ est égal à :`,
    options: [
      String.raw`$2a$`,
      String.raw`$1$`,
      String.raw`$a$`,
      String.raw`$0$`
    ],
    correctIndex: 2
  },
  {
    id: 117,
    category: "algebre_boole",
    text: String.raw`Idempotence : $a \cdot a$ est égal à :`,
    options: [
      String.raw`$a^2$`,
      String.raw`$0$`,
      String.raw`$1$`,
      String.raw`$a$`
    ],
    correctIndex: 3
  },
  {
    id: 118,
    category: "algebre_boole",
    text: String.raw`Complémentarité : $a \cdot \bar{a}$ est égal à :`,
    options: [
      String.raw`$1$`,
      String.raw`$0$`,
      String.raw`$a$`,
      String.raw`$\bar{a}$`
    ],
    correctIndex: 1
  },
  {
    id: 119,
    category: "algebre_boole",
    text: String.raw`Complémentarité : $a + \bar{a}$ est égal à :`,
    options: [
      String.raw`$0$`,
      String.raw`$a$`,
      String.raw`$\bar{a}$`,
      String.raw`$1$`
    ],
    correctIndex: 3
  },
  {
    id: 120,
    category: "algebre_boole",
    text: String.raw`Élément neutre du ET : $a \cdot 1$ est égal à :`,
    options: [
      String.raw`$0$`,
      String.raw`$a$`,
      String.raw`$1$`,
      String.raw`$\bar{a}$`
    ],
    correctIndex: 1
  },
  {
    id: 121,
    category: "algebre_boole",
    text: String.raw`Élément neutre du OU : $a + 0$ est égal à :`,
    options: [
      String.raw`$0$`,
      String.raw`$1$`,
      String.raw`$a$`,
      String.raw`$\bar{a}$`
    ],
    correctIndex: 2
  },
  {
    id: 122,
    category: "algebre_boole",
    text: String.raw`Élément absorbant du OU : $a + 1$ est égal à :`,
    options: [
      String.raw`$1$`,
      String.raw`$a$`,
      String.raw`$0$`,
      String.raw`$\bar{a}$`
    ],
    correctIndex: 0
  },
  {
    id: 123,
    category: "algebre_boole",
    text: String.raw`Élément absorbant du ET : $a \cdot 0$ est égal à :`,
    options: [
      String.raw`$a$`,
      String.raw`$1$`,
      String.raw`$\bar{a}$`,
      String.raw`$0$`
    ],
    correctIndex: 3
  },
  {
    id: 124,
    category: "algebre_boole",
    text: String.raw`Associativité : $(a + b) + c$ est égal à :`,
    options: [
      String.raw`$a + (b + c)$`,
      String.raw`$a \cdot (b \cdot c)$`,
      String.raw`$a + b \cdot c$`,
      String.raw`$(a \cdot b) + c$`
    ],
    correctIndex: 0
  },
  {
    id: 125,
    category: "algebre_boole",
    text: String.raw`Distributivité : $a \cdot (b + c)$ est égal à :`,
    options: [
      String.raw`$a + b \cdot c$`,
      String.raw`$a \cdot b + a \cdot c$`,
      String.raw`$a \cdot b \cdot c$`,
      String.raw`$(a + b) \cdot c$`
    ],
    correctIndex: 1
  },
  {
    id: 126,
    category: "algebre_boole",
    text: String.raw`Distributivité du OU sur le ET : $a + (b \cdot c)$ est égal à :`,
    options: [
      String.raw`$(a + b) \cdot c$`,
      String.raw`$a + b + c$`,
      String.raw`$(a + b) \cdot (a + c)$`,
      String.raw`$a \cdot b + a \cdot c$`
    ],
    correctIndex: 2
  },

  // ===== 5. Règles de De Morgan et optimisations =====
  {
    id: 127,
    category: "algebre_boole",
    text: String.raw`Règle de De Morgan : $\overline{a \cdot b}$ est égal à :`,
    options: [
      String.raw`$\bar{a} \cdot \bar{b}$`,
      String.raw`$\bar{a} + \bar{b}$`,
      String.raw`$a + b$`,
      String.raw`$a \cdot \bar{b}$`
    ],
    correctIndex: 1
  },
  {
    id: 128,
    category: "algebre_boole",
    text: String.raw`Règle de De Morgan : $\overline{a + b}$ est égal à :`,
    options: [
      String.raw`$\bar{a} + \bar{b}$`,
      String.raw`$a \cdot b$`,
      String.raw`$\bar{a} \cdot \bar{b}$`,
      String.raw`$a + \bar{b}$`
    ],
    correctIndex: 2
  },
  {
    id: 129,
    category: "algebre_boole",
    text: String.raw`D'après De Morgan, $\overline{a \cdot \bar{b}}$ est égal à :`,
    options: [
      String.raw`$\bar{a} + b$`,
      String.raw`$\bar{a} \cdot b$`,
      String.raw`$a + \bar{b}$`,
      String.raw`$a \cdot \bar{b}$`
    ],
    correctIndex: 0
  },
  {
    id: 130,
    category: "algebre_boole",
    text: String.raw`Optimisation : $a + \bar{a} \cdot b$ est égal à :`,
    options: [
      String.raw`$a \cdot b$`,
      String.raw`$\bar{a}$`,
      String.raw`$b$`,
      String.raw`$a + b$`
    ],
    correctIndex: 3
  },
  {
    id: 131,
    category: "algebre_boole",
    text: String.raw`Simplification : $a \cdot b + a \cdot \bar{b}$ (en factorisant $a$) est égal à :`,
    options: [
      String.raw`$a$`,
      String.raw`$b$`,
      String.raw`$1$`,
      String.raw`$a \cdot b$`
    ],
    correctIndex: 0
  },
  {
    id: 132,
    category: "algebre_boole",
    text: String.raw`Simplification : $a \cdot b + \bar{a} \cdot b$ (en factorisant $b$) est égal à :`,
    options: [
      String.raw`$a$`,
      String.raw`$1$`,
      String.raw`$b$`,
      String.raw`$0$`
    ],
    correctIndex: 2
  },
  {
    id: 133,
    category: "algebre_boole",
    text: String.raw`Simplification : $(a + b) \cdot (a + \bar{b})$ est égal à :`,
    options: [
      String.raw`$b$`,
      String.raw`$a$`,
      String.raw`$1$`,
      String.raw`$a + b$`
    ],
    correctIndex: 1
  },
  {
    id: 134,
    category: "algebre_boole",
    text: String.raw`Pour simplifier une expression, il faut utiliser :`,
    options: [
      String.raw`Les propriétés de l'algèbre de Boole`,
      String.raw`Uniquement des calculs numériques`,
      String.raw`La dérivation`,
      String.raw`Les récurrences`
    ],
    correctIndex: 0
  },

  // ===== 6. Fonctions logiques =====
  {
    id: 135,
    category: "algebre_boole",
    text: String.raw`Une fonction logique prend en entrée une ou plusieurs variables booléennes et retourne :`,
    options: [
      String.raw`Un nombre réel`,
      String.raw`Une liste de valeurs`,
      String.raw`Un entier quelconque`,
      String.raw`Une valeur booléenne`
    ],
    correctIndex: 3
  },
  {
    id: 136,
    category: "algebre_boole",
    text: String.raw`Quelles sont les deux méthodes pour définir une fonction logique ?`,
    options: [
      String.raw`Par un graphe ou par un arbre`,
      String.raw`Par son expression logique ou par sa table de vérité`,
      String.raw`Par une dérivée ou par une primitive`,
      String.raw`Par une suite ou par une série`
    ],
    correctIndex: 1
  },
  {
    id: 137,
    category: "algebre_boole",
    text: String.raw`Une table de vérité définit :`,
    options: [
      String.raw`Uniquement les variables d'entrée`,
      String.raw`La valeur de la fonction pour chaque combinaison possible des variables d'entrée`,
      String.raw`Seulement les valeurs où la fonction vaut $1$`,
      String.raw`Le nombre de portes logiques`
    ],
    correctIndex: 1
  },
  {
    id: 138,
    category: "algebre_boole",
    text: String.raw`Deux fonctions logiques sont identiques si :`,
    options: [
      String.raw`Elles ont le même nombre de variables`,
      String.raw`Elles ont le même nombre de termes`,
      String.raw`Leurs tables de vérité sont identiques`,
      String.raw`Elles ont le même nom`
    ],
    correctIndex: 2
  },
  {
    id: 139,
    category: "algebre_boole",
    text: String.raw`À partir d'une expression logique, on peut :`,
    options: [
      String.raw`Toujours déterminer sa table de vérité`,
      String.raw`Jamais déterminer sa table de vérité`,
      String.raw`Déterminer la table seulement pour 2 variables`,
      String.raw`Déterminer la table seulement si $f = 1$`
    ],
    correctIndex: 0
  },
  {
    id: 140,
    category: "algebre_boole",
    text: String.raw`Si $f(a,b) = a + \bar{b}$, alors $f(0,0)$ vaut :`,
    options: [
      String.raw`$0$`,
      String.raw`$1$`,
      String.raw`Indéfini`,
      String.raw`$a$`
    ],
    correctIndex: 1
  },
  {
    id: 141,
    category: "algebre_boole",
    text: String.raw`Si $f(a,b,c) = (a + b) \cdot c$, alors $f(0,0,1)$ vaut :`,
    options: [
      String.raw`$1$`,
      String.raw`$c$`,
      String.raw`$a$`,
      String.raw`$0$`
    ],
    correctIndex: 3
  },

  // ===== 7. Formes canoniques =====
  {
    id: 142,
    category: "algebre_boole",
    text: String.raw`Un minterme est un groupe des variables (éventuellement complémentées) liées par des :`,
    options: [
      String.raw`ET`,
      String.raw`OU`,
      String.raw`NON uniquement`,
      String.raw`Additions`
    ],
    correctIndex: 0
  },
  {
    id: 143,
    category: "algebre_boole",
    text: String.raw`Un maxterme est un groupe des variables (éventuellement complémentées) liées par des :`,
    options: [
      String.raw`ET`,
      String.raw`Multiplications`,
      String.raw`OU`,
      String.raw`NON uniquement`
    ],
    correctIndex: 2
  },
  {
    id: 144,
    category: "algebre_boole",
    text: String.raw`La première forme canonique d'une fonction est :`,
    options: [
      String.raw`L'intersection (ET) de maxtermes`,
      String.raw`L'union (OU) de mintermes`,
      String.raw`L'union (OU) de maxtermes`,
      String.raw`L'intersection (ET) de mintermes`
    ],
    correctIndex: 1
  },
  {
    id: 145,
    category: "algebre_boole",
    text: String.raw`La seconde forme canonique d'une fonction est :`,
    options: [
      String.raw`L'union (OU) de mintermes`,
      String.raw`L'union (OU) de maxtermes`,
      String.raw`L'intersection (ET) de maxtermes`,
      String.raw`L'intersection (ET) de mintermes`
    ],
    correctIndex: 2
  },
  {
    id: 146,
    category: "algebre_boole",
    text: String.raw`Lequel est un minterme complet pour une fonction à 3 variables $a$, $b$, $c$ ?`,
    options: [
      String.raw`$a \cdot b$`,
      String.raw`$a + b + c$`,
      String.raw`$a + \bar{b}$`,
      String.raw`$a \cdot \bar{b} \cdot c$`
    ],
    correctIndex: 3
  },
  {
    id: 147,
    category: "algebre_boole",
    text: String.raw`Lequel est un maxterme complet pour une fonction à 3 variables $a$, $b$, $c$ ?`,
    options: [
      String.raw`$a \cdot b \cdot c$`,
      String.raw`$a + \bar{b} + c$`,
      String.raw`$a \cdot \bar{b}$`,
      String.raw`$a + b$`
    ],
    correctIndex: 1
  },
  {
    id: 148,
    category: "algebre_boole",
    text: String.raw`Pour faire apparaître la variable manquante $c$ dans le terme $a \cdot b$, on utilise le fait que :`,
    options: [
      String.raw`$c + \bar{c} = 1$`,
      String.raw`$c \cdot \bar{c} = 1$`,
      String.raw`$c + c = 0$`,
      String.raw`$c \cdot c = 0$`
    ],
    correctIndex: 0
  },
  {
    id: 149,
    category: "algebre_boole",
    text: String.raw`Le terme $a \cdot b$ devient, pour être complet avec la variable $c$ :`,
    options: [
      String.raw`$a \cdot b \cdot c$`,
      String.raw`$a \cdot b + c$`,
      String.raw`$a \cdot b \cdot (c + \bar{c})$`,
      String.raw`$a \cdot b \cdot \bar{c}$`
    ],
    correctIndex: 2
  },

  // ===== 8. Table de vérité <-> fonction =====
  {
    id: 150,
    category: "algebre_boole",
    text: String.raw`Pour obtenir la première forme canonique à partir d'une table de vérité, on prend les lignes où $f$ vaut :`,
    options: [
      String.raw`$0$`,
      String.raw`$1$`,
      String.raw`$0$ et $1$`,
      String.raw`Aucune`
    ],
    correctIndex: 1
  },
  {
    id: 151,
    category: "algebre_boole",
    text: String.raw`Dans un minterme construit depuis une ligne de la table, une variable égale à $1$ est notée :`,
    options: [
      String.raw`$X_i$ (non complémentée)`,
      String.raw`$\bar{X}_i$ (complémentée)`,
      String.raw`$0$`,
      String.raw`$1$`
    ],
    correctIndex: 0
  },
  {
    id: 152,
    category: "algebre_boole",
    text: String.raw`Dans un minterme construit depuis une ligne de la table, une variable égale à $0$ est notée :`,
    options: [
      String.raw`$X_i$ (non complémentée)`,
      String.raw`$1$`,
      String.raw`$\bar{X}_i$ (complémentée)`,
      String.raw`$0$`
    ],
    correctIndex: 2
  },
  {
    id: 153,
    category: "algebre_boole",
    text: String.raw`La ligne $a = 1$, $b = 0$, $c = 1$ de la table donne le minterme :`,
    options: [
      String.raw`$a \cdot b \cdot c$`,
      String.raw`$\bar{a} \cdot \bar{b} \cdot c$`,
      String.raw`$a \cdot \bar{b} \cdot \bar{c}$`,
      String.raw`$a \cdot \bar{b} \cdot c$`
    ],
    correctIndex: 3
  },
  {
    id: 154,
    category: "algebre_boole",
    text: String.raw`La ligne $a = 0$, $b = 0$, $c = 1$ de la table donne le minterme :`,
    options: [
      String.raw`$\bar{a} \cdot \bar{b} \cdot c$`,
      String.raw`$a \cdot b \cdot \bar{c}$`,
      String.raw`$\bar{a} \cdot b \cdot c$`,
      String.raw`$a \cdot \bar{b} \cdot \bar{c}$`
    ],
    correctIndex: 0
  },
  {
    id: 155,
    category: "algebre_boole",
    text: String.raw`Une fonction à 3 variables a 5 lignes à $1$ dans sa table de vérité. Sa première forme canonique contient combien de mintermes ?`,
    options: [
      String.raw`$3$`,
      String.raw`$5$`,
      String.raw`$8$`,
      String.raw`$2$`
    ],
    correctIndex: 1
  },
  {
    id: 156,
    category: "algebre_boole",
    text: String.raw`Pour calculer la fonction sous la première forme canonique, on fait :`,
    options: [
      String.raw`Le ET des mintermes`,
      String.raw`Le OU des maxtermes`,
      String.raw`Le OU des mintermes`,
      String.raw`Le ET des maxtermes`
    ],
    correctIndex: 2
  },

  // ===== 9. Minimisation =====
  {
    id: 157,
    category: "algebre_boole",
    text: String.raw`La minimisation d'une fonction logique permet de :`,
    options: [
      String.raw`Augmenter le nombre de variables`,
      String.raw`L'écrire avec moins de termes et moins de portes logiques`,
      String.raw`La rendre plus compliquée`,
      String.raw`La convertir en décimal`
    ],
    correctIndex: 1
  },
  {
    id: 158,
    category: "algebre_boole",
    text: String.raw`Quelles sont les deux méthodes de simplification d'une fonction logique vues en cours ?`,
    options: [
      String.raw`Euler et Laplace`,
      String.raw`Dérivation et intégration`,
      String.raw`Les propriétés de l'algèbre de Boole et les tableaux de Karnaugh`,
      String.raw`Récurrence et Cauchy`
    ],
    correctIndex: 2
  },
  {
    id: 159,
    category: "algebre_boole",
    text: String.raw`Les formes canoniques d'une fonction logique sont :`,
    options: [
      String.raw`Toujours des formes minimales`,
      String.raw`Une définition correcte de la fonction, mais pas forcément simplifiée`,
      String.raw`Incorrectes`,
      String.raw`Valables seulement pour 2 variables`
    ],
    correctIndex: 1
  },

  // ===== 10. Tableaux de Karnaugh =====
  {
    id: 160,
    category: "algebre_boole",
    text: String.raw`Le tableau de Karnaugh est :`,
    options: [
      String.raw`Une représentation particulière de la table de vérité d'une fonction logique`,
      String.raw`Un arbre de décision`,
      String.raw`Une équation différentielle`,
      String.raw`Un graphe orienté`
    ],
    correctIndex: 0
  },
  {
    id: 161,
    category: "algebre_boole",
    text: String.raw`Dans un tableau de Karnaugh, le passage d'une case à une case adjacente modifie la valeur de :`,
    options: [
      String.raw`Toutes les variables`,
      String.raw`Deux variables`,
      String.raw`Aucune variable`,
      String.raw`Une seule variable`
    ],
    correctIndex: 3
  },
  {
    id: 162,
    category: "algebre_boole",
    text: String.raw`Dans un tableau de Karnaugh, l'ordre des colonnes pour 2 variables ($ab$) est :`,
    options: [
      String.raw`$\texttt{00},\ \texttt{01},\ \texttt{10},\ \texttt{11}$`,
      String.raw`$\texttt{00},\ \texttt{01},\ \texttt{11},\ \texttt{10}$`,
      String.raw`$\texttt{00},\ \texttt{11},\ \texttt{01},\ \texttt{10}$`,
      String.raw`$\texttt{01},\ \texttt{00},\ \texttt{10},\ \texttt{11}$`
    ],
    correctIndex: 1
  },
  {
    id: 163,
    category: "algebre_boole",
    text: String.raw`Le tableau de Karnaugh se referme sur lui-même, ce qui signifie que :`,
    options: [
      String.raw`La colonne la plus à gauche est voisine de la colonne la plus à droite`,
      String.raw`Seules les lignes sont voisines`,
      String.raw`Les cases ne sont jamais voisines`,
      String.raw`Seules les diagonales sont voisines`
    ],
    correctIndex: 0
  },
  {
    id: 164,
    category: "algebre_boole",
    text: String.raw`Les bits à $1$ du tableau de Karnaugh sont regroupés en blocs rectangulaires de taille :`,
    options: [
      String.raw`Quelconque`,
      String.raw`Toujours $2$`,
      String.raw`Un multiple de $3$`,
      String.raw`Une puissance de $2$ ($1$, $2$, $4$, $8$, ...)`
    ],
    correctIndex: 3
  },
  {
    id: 165,
    category: "algebre_boole",
    text: String.raw`Dans un tableau de Karnaugh, tous les bits à $1$ doivent être :`,
    options: [
      String.raw`Englobés dans au moins un bloc`,
      String.raw`Englobés dans un seul bloc exactement`,
      String.raw`Laissés isolés`,
      String.raw`Remplacés par des $0$`
    ],
    correctIndex: 0
  },
  {
    id: 166,
    category: "algebre_boole",
    text: String.raw`Un bit à $1$ d'un tableau de Karnaugh peut-il appartenir à plusieurs blocs ?`,
    options: [
      String.raw`Non, jamais`,
      String.raw`Oui`,
      String.raw`Seulement s'il est sur un bord`,
      String.raw`Seulement pour 2 variables`
    ],
    correctIndex: 1
  },
  {
    id: 167,
    category: "algebre_boole",
    text: String.raw`Pour simplifier au maximum, les blocs créés doivent être :`,
    options: [
      String.raw`Les plus petits possibles`,
      String.raw`De taille $1$`,
      String.raw`Les plus gros possibles`,
      String.raw`De taille $3$`
    ],
    correctIndex: 2
  },
  {
    id: 168,
    category: "algebre_boole",
    text: String.raw`Pour trouver le terme associé à un bloc, on conserve :`,
    options: [
      String.raw`Les variables qui prennent les valeurs $0$ et $1$`,
      String.raw`Toutes les variables`,
      String.raw`Aucune variable`,
      String.raw`Seulement les variables qui ne changent pas de valeur dans le bloc`
    ],
    correctIndex: 3
  },
  {
    id: 169,
    category: "algebre_boole",
    text: String.raw`Dans un bloc, une variable qui reste à $1$ est notée :`,
    options: [
      String.raw`$a$ (non complémentée)`,
      String.raw`$\bar{a}$ (complémentée)`,
      String.raw`$0$`,
      String.raw`Elle est ignorée`
    ],
    correctIndex: 0
  },
  {
    id: 170,
    category: "algebre_boole",
    text: String.raw`Dans un bloc, une variable qui reste à $0$ est notée :`,
    options: [
      String.raw`$a$ (non complémentée)`,
      String.raw`$1$`,
      String.raw`Elle est ignorée`,
      String.raw`$\bar{a}$ (complémentée)`
    ],
    correctIndex: 3
  },
  {
    id: 171,
    category: "algebre_boole",
    text: String.raw`Le terme logique associé à un bloc est :`,
    options: [
      String.raw`Le ET des variables qui ne changent pas`,
      String.raw`Le OU des variables qui ne changent pas`,
      String.raw`Le ET des variables qui changent`,
      String.raw`Le OU des variables qui changent`
    ],
    correctIndex: 0
  },
  {
    id: 172,
    category: "algebre_boole",
    text: String.raw`La fonction simplifiée finale est obtenue en faisant :`,
    options: [
      String.raw`Le ET des termes des blocs`,
      String.raw`Le OU des termes des blocs`,
      String.raw`Le NON des termes des blocs`,
      String.raw`Le produit des variables`
    ],
    correctIndex: 1
  },
  {
    id: 173,
    category: "algebre_boole",
    text: String.raw`Dans un tableau de Karnaugh, les variables qui prennent à la fois les valeurs $0$ et $1$ dans un bloc sont :`,
    options: [
      String.raw`Conservées`,
      String.raw`Complémentées`,
      String.raw`Ignorées (non significatives)`,
      String.raw`Doublées`
    ],
    correctIndex: 2
  },
  {
    id: 174,
    category: "algebre_boole",
    text: String.raw`Combien de cases contient un tableau de Karnaugh à 3 variables ?`,
    options: [
      String.raw`$4$`,
      String.raw`$6$`,
      String.raw`$3$`,
      String.raw`$8$`
    ],
    correctIndex: 3
  },
  {
    id: 175,
    category: "algebre_boole",
    text: String.raw`Combien de cases contient un tableau de Karnaugh à 4 variables ?`,
    options: [
      String.raw`$16$`,
      String.raw`$8$`,
      String.raw`$12$`,
      String.raw`$4$`
    ],
    correctIndex: 0
  },
  {
    id: 176,
    category: "algebre_boole",
    text: String.raw`Pour $f(a,b) = a + b$, le tableau de Karnaugh à 2 variables contient combien de $1$ ?`,
    options: [
      String.raw`$1$`,
      String.raw`$2$`,
      String.raw`$3$`,
      String.raw`$4$`
    ],
    correctIndex: 2
  },
  {
    id: 177,
    category: "algebre_boole",
    text: String.raw`Dans un tableau à 3 variables, un bloc de 4 cases donne un terme comportant :`,
    options: [
      String.raw`1 variable`,
      String.raw`2 variables`,
      String.raw`3 variables`,
      String.raw`Aucune variable`
    ],
    correctIndex: 0
  },
  {
    id: 178,
    category: "algebre_boole",
    text: String.raw`Dans un tableau à 3 variables, un bloc de 2 cases donne un terme comportant :`,
    options: [
      String.raw`1 variable`,
      String.raw`3 variables`,
      String.raw`2 variables`,
      String.raw`Aucune variable`
    ],
    correctIndex: 2
  },
  {
    id: 179,
    category: "algebre_boole",
    text: String.raw`Dans un tableau à 3 variables, un bloc de 1 seule case donne un terme comportant :`,
    options: [
      String.raw`1 variable`,
      String.raw`2 variables`,
      String.raw`Aucune variable`,
      String.raw`3 variables`
    ],
    correctIndex: 3
  },
  {
    id: 180,
    category: "algebre_boole",
    text: String.raw`Dans un tableau à 3 variables, si les 8 cases valent $1$ (un seul bloc de 8), la fonction vaut :`,
    options: [
      String.raw`Toujours $1$`,
      String.raw`Toujours $0$`,
      String.raw`$a$`,
      String.raw`$a + b$`
    ],
    correctIndex: 0
  },
  {
    id: 181,
    category: "algebre_boole",
    text: String.raw`Dans un tableau à 4 variables, un bloc de 8 cases donne un terme comportant :`,
    options: [
      String.raw`2 variables`,
      String.raw`1 variable`,
      String.raw`3 variables`,
      String.raw`4 variables`
    ],
    correctIndex: 1
  },
  {
    id: 182,
    category: "algebre_boole",
    text: String.raw`Dans l'exemple du cours (3 variables), le bloc de 4 cases où $a$ reste à $1$ donne le terme :`,
    options: [
      String.raw`$\bar{a}$`,
      String.raw`$b$`,
      String.raw`$a$`,
      String.raw`$c$`
    ],
    correctIndex: 2
  }, 
  // Questions "Conversion dans les bases" — à coller dans ALL_QUESTIONS (après la question id 182)

  {
    id: 183,
    category: "conversion_bases",
    text: String.raw`Un bit est le plus petit élément d'information. Il peut prendre combien de valeurs ?`,
    options: [
      String.raw`$1$`,
      String.raw`$2$`,
      String.raw`$8$`,
      String.raw`$10$`
    ],
    correctIndex: 1
  },
  {
    id: 184,
    category: "conversion_bases",
    text: String.raw`Avec $n$ bits, on peut obtenir combien de représentations différentes ?`,
    options: [
      String.raw`$n$`,
      String.raw`$2n$`,
      String.raw`$n^2$`,
      String.raw`$2^n$`
    ],
    correctIndex: 3
  },
  {
    id: 185,
    category: "conversion_bases",
    text: String.raw`Avec 3 bits, combien de représentations différentes peut-on obtenir ?`,
    options: [
      String.raw`$6$`,
      String.raw`$8$`,
      String.raw`$9$`,
      String.raw`$16$`
    ],
    correctIndex: 1
  },
  {
    id: 186,
    category: "conversion_bases",
    text: String.raw`Avec 4 bits, combien de représentations différentes peut-on obtenir ?`,
    options: [
      String.raw`$16$`,
      String.raw`$8$`,
      String.raw`$4$`,
      String.raw`$32$`
    ],
    correctIndex: 0
  },
  {
    id: 187,
    category: "conversion_bases",
    text: String.raw`Un octet est un paquet de :`,
    options: [
      String.raw`4 bits`,
      String.raw`16 bits`,
      String.raw`8 bits`,
      String.raw`32 bits`
    ],
    correctIndex: 2
  },
  {
    id: 188,
    category: "conversion_bases",
    text: String.raw`Un quartet est un paquet de :`,
    options: [
      String.raw`2 bits`,
      String.raw`4 bits`,
      String.raw`8 bits`,
      String.raw`16 bits`
    ],
    correctIndex: 1
  },
  {
    id: 189,
    category: "conversion_bases",
    text: String.raw`Un octet contient combien de quartets ?`,
    options: [
      String.raw`$1$`,
      String.raw`$4$`,
      String.raw`$8$`,
      String.raw`$2$`
    ],
    correctIndex: 3
  },
  {
    id: 190,
    category: "conversion_bases",
    text: String.raw`Un système 32 bits peut traiter simultanément combien d'octets ?`,
    options: [
      String.raw`$4$`,
      String.raw`$8$`,
      String.raw`$16$`,
      String.raw`$32$`
    ],
    correctIndex: 0
  },
  {
    id: 191,
    category: "conversion_bases",
    text: String.raw`Un entier non signé codé sur 8 bits a pour valeur maximale :`,
    options: [
      String.raw`$256$`,
      String.raw`$127$`,
      String.raw`$255$`,
      String.raw`$128$`
    ],
    correctIndex: 2
  },

  // ===== 2. Poids fort / poids faible =====
  {
    id: 192,
    category: "conversion_bases",
    text: String.raw`Dans l'écriture d'un nombre, le bit de poids fort est situé :`,
    options: [
      String.raw`À droite`,
      String.raw`À gauche`,
      String.raw`Au milieu`,
      String.raw`N'importe où`
    ],
    correctIndex: 1
  },
  {
    id: 193,
    category: "conversion_bases",
    text: String.raw`Dans l'écriture d'un nombre, le bit de poids faible est situé :`,
    options: [
      String.raw`À gauche`,
      String.raw`Au milieu`,
      String.raw`À droite`,
      String.raw`N'importe où`
    ],
    correctIndex: 2
  },
  {
    id: 194,
    category: "conversion_bases",
    text: String.raw`Le chiffre de poids fort est :`,
    options: [
      String.raw`Le chiffre le moins significatif`,
      String.raw`Le chiffre le plus significatif`,
      String.raw`Le chiffre $0$`,
      String.raw`Le chiffre $1$`
    ],
    correctIndex: 1
  },
  {
    id: 195,
    category: "conversion_bases",
    text: String.raw`Le poids d'un chiffre de rang $r$ dans une base $b$ est donné par :`,
    options: [
      String.raw`$b \times r$`,
      String.raw`$r^b$`,
      String.raw`$b^{r-1}$`,
      String.raw`$b + r$`
    ],
    correctIndex: 2
  },
  {
    id: 196,
    category: "conversion_bases",
    text: String.raw`Dans le nombre décimal $358$, quel est le poids du chiffre $5$ ?`,
    options: [
      String.raw`$1$`,
      String.raw`$10$`,
      String.raw`$100$`,
      String.raw`$5$`
    ],
    correctIndex: 1
  },
  {
    id: 197,
    category: "conversion_bases",
    text: String.raw`Dans le nombre décimal $358$, quel est le chiffre de poids fort ?`,
    options: [
      String.raw`$8$`,
      String.raw`$5$`,
      String.raw`$3$`,
      String.raw`$358$`
    ],
    correctIndex: 2
  },

  // ===== 3. Les bases et leurs symboles =====
  {
    id: 198,
    category: "conversion_bases",
    text: String.raw`Quels symboles utilise la base 2 (binaire) ?`,
    options: [
      String.raw`$0$ et $1$`,
      String.raw`$0$ à $7$`,
      String.raw`$0$ à $9$`,
      String.raw`$0$ à $9$ et $\mathrm{A}$ à $\mathrm{F}$`
    ],
    correctIndex: 0
  },
  {
    id: 199,
    category: "conversion_bases",
    text: String.raw`Quels symboles utilise la base 8 (octale) ?`,
    options: [
      String.raw`$0$ et $1$`,
      String.raw`$0$ à $8$`,
      String.raw`$0$ à $7$`,
      String.raw`$0$ à $9$`
    ],
    correctIndex: 2
  },
  {
    id: 200,
    category: "conversion_bases",
    text: String.raw`Quels symboles utilise la base 16 (hexadécimale) ?`,
    options: [
      String.raw`$0$ à $9$`,
      String.raw`$0$ à $9$ et $\mathrm{A}$ à $\mathrm{F}$`,
      String.raw`$0$ à $7$ et $\mathrm{A}$ à $\mathrm{F}$`,
      String.raw`$\mathrm{A}$ à $\mathrm{P}$`
    ],
    correctIndex: 1
  },
  {
    id: 201,
    category: "conversion_bases",
    text: String.raw`En hexadécimal, la lettre $\mathrm{A}$ représente la valeur décimale :`,
    options: [
      String.raw`$9$`,
      String.raw`$11$`,
      String.raw`$10$`,
      String.raw`$16$`
    ],
    correctIndex: 2
  },
  {
    id: 202,
    category: "conversion_bases",
    text: String.raw`En hexadécimal, la lettre $\mathrm{F}$ représente la valeur décimale :`,
    options: [
      String.raw`$15$`,
      String.raw`$16$`,
      String.raw`$14$`,
      String.raw`$12$`
    ],
    correctIndex: 0
  },
  {
    id: 203,
    category: "conversion_bases",
    text: String.raw`Quelle lettre hexadécimale correspond à la valeur décimale $13$ ?`,
    options: [
      String.raw`$\mathrm{B}$`,
      String.raw`$\mathrm{C}$`,
      String.raw`$\mathrm{E}$`,
      String.raw`$\mathrm{D}$`
    ],
    correctIndex: 3
  },
  {
    id: 204,
    category: "conversion_bases",
    text: String.raw`Quelle lettre hexadécimale correspond à la valeur décimale $11$ ?`,
    options: [
      String.raw`$\mathrm{B}$`,
      String.raw`$\mathrm{A}$`,
      String.raw`$\mathrm{C}$`,
      String.raw`$\mathrm{D}$`
    ],
    correctIndex: 0
  },

  // ===== 4. Petits nombres : tableau des bases =====
  {
    id: 205,
    category: "conversion_bases",
    text: String.raw`Le nombre binaire $(101)_2$ vaut en décimal :`,
    options: [
      String.raw`$3$`,
      String.raw`$4$`,
      String.raw`$5$`,
      String.raw`$6$`
    ],
    correctIndex: 2
  },
  {
    id: 206,
    category: "conversion_bases",
    text: String.raw`Le nombre binaire $(1000)_2$ vaut en décimal :`,
    options: [
      String.raw`$8$`,
      String.raw`$4$`,
      String.raw`$10$`,
      String.raw`$16$`
    ],
    correctIndex: 0
  },
  {
    id: 207,
    category: "conversion_bases",
    text: String.raw`Le nombre binaire $(1010)_2$ vaut en décimal :`,
    options: [
      String.raw`$8$`,
      String.raw`$12$`,
      String.raw`$9$`,
      String.raw`$10$`
    ],
    correctIndex: 3
  },
  {
    id: 208,
    category: "conversion_bases",
    text: String.raw`Le nombre binaire $(1100)_2$ vaut en décimal :`,
    options: [
      String.raw`$12$`,
      String.raw`$10$`,
      String.raw`$14$`,
      String.raw`$11$`
    ],
    correctIndex: 0
  },
  {
    id: 209,
    category: "conversion_bases",
    text: String.raw`Le nombre binaire $(1111)_2$ vaut en décimal :`,
    options: [
      String.raw`$16$`,
      String.raw`$14$`,
      String.raw`$15$`,
      String.raw`$13$`
    ],
    correctIndex: 2
  },
  {
    id: 210,
    category: "conversion_bases",
    text: String.raw`Le nombre décimal $7$ s'écrit en binaire :`,
    options: [
      String.raw`$(110)_2$`,
      String.raw`$(111)_2$`,
      String.raw`$(101)_2$`,
      String.raw`$(1000)_2$`
    ],
    correctIndex: 1
  },
  {
    id: 211,
    category: "conversion_bases",
    text: String.raw`Le nombre décimal $9$ s'écrit en binaire :`,
    options: [
      String.raw`$(1001)_2$`,
      String.raw`$(1010)_2$`,
      String.raw`$(1000)_2$`,
      String.raw`$(1011)_2$`
    ],
    correctIndex: 0
  },
  {
    id: 212,
    category: "conversion_bases",
    text: String.raw`Le nombre décimal $12$ s'écrit en binaire :`,
    options: [
      String.raw`$(1010)_2$`,
      String.raw`$(1011)_2$`,
      String.raw`$(1101)_2$`,
      String.raw`$(1100)_2$`
    ],
    correctIndex: 3
  },
  {
    id: 213,
    category: "conversion_bases",
    text: String.raw`Le nombre décimal $8$ s'écrit en octal :`,
    options: [
      String.raw`$(8)_8$`,
      String.raw`$(10)_8$`,
      String.raw`$(7)_8$`,
      String.raw`$(11)_8$`
    ],
    correctIndex: 1
  },
  {
    id: 214,
    category: "conversion_bases",
    text: String.raw`Le nombre décimal $15$ s'écrit en octal :`,
    options: [
      String.raw`$(15)_8$`,
      String.raw`$(16)_8$`,
      String.raw`$(17)_8$`,
      String.raw`$\mathrm{F}_8$`
    ],
    correctIndex: 2
  },

  // ===== 5. Binaire -> décimal =====
  {
    id: 215,
    category: "conversion_bases",
    text: String.raw`Pour convertir un nombre binaire en décimal, on utilise la formule :`,
    options: [
      String.raw`$N = \sum a_i \times 2^i$`,
      String.raw`$N = \sum a_i + 2^i$`,
      String.raw`$N = \sum \frac{a_i}{2^i}$`,
      String.raw`$N = \sum a_i \times 10^i$`
    ],
    correctIndex: 0
  },
  {
    id: 216,
    category: "conversion_bases",
    text: String.raw`Le nombre binaire $(1011001)_2$ vaut en décimal :`,
    options: [
      String.raw`$87$`,
      String.raw`$89$`,
      String.raw`$91$`,
      String.raw`$93$`
    ],
    correctIndex: 1
  },
  {
    id: 217,
    category: "conversion_bases",
    text: String.raw`Le nombre binaire $(11111111)_2$ vaut en décimal :`,
    options: [
      String.raw`$256$`,
      String.raw`$127$`,
      String.raw`$254$`,
      String.raw`$255$`
    ],
    correctIndex: 3
  },
  {
    id: 218,
    category: "conversion_bases",
    text: String.raw`Le nombre binaire $(10000000)_2$ vaut en décimal :`,
    options: [
      String.raw`$128$`,
      String.raw`$64$`,
      String.raw`$256$`,
      String.raw`$127$`
    ],
    correctIndex: 0
  },

  // ===== 6. Décimal -> binaire =====
  {
    id: 219,
    category: "conversion_bases",
    text: String.raw`Pour convertir un nombre décimal en binaire par la méthode des divisions, on divise successivement par :`,
    options: [
      String.raw`$10$`,
      String.raw`$8$`,
      String.raw`$2$`,
      String.raw`$16$`
    ],
    correctIndex: 2
  },
  {
    id: 220,
    category: "conversion_bases",
    text: String.raw`Dans la méthode des divisions par $2$, quelle valeur forme la représentation binaire ?`,
    options: [
      String.raw`Les quotients`,
      String.raw`Les restes`,
      String.raw`Les diviseurs`,
      String.raw`La somme des quotients`
    ],
    correctIndex: 1
  },
  {
    id: 221,
    category: "conversion_bases",
    text: String.raw`Dans la méthode des divisions par $2$, le dernier reste obtenu correspond au bit de :`,
    options: [
      String.raw`Poids faible`,
      String.raw`Poids fort`,
      String.raw`Signe`,
      String.raw`Parité`
    ],
    correctIndex: 1
  },
  {
    id: 222,
    category: "conversion_bases",
    text: String.raw`Le nombre décimal $13$ s'écrit en binaire :`,
    options: [
      String.raw`$(1011)_2$`,
      String.raw`$(1110)_2$`,
      String.raw`$(1101)_2$`,
      String.raw`$(1001)_2$`
    ],
    correctIndex: 2
  },
  {
    id: 223,
    category: "conversion_bases",
    text: String.raw`Le nombre décimal $20$ s'écrit en binaire :`,
    options: [
      String.raw`$(10100)_2$`,
      String.raw`$(10010)_2$`,
      String.raw`$(11000)_2$`,
      String.raw`$(10101)_2$`
    ],
    correctIndex: 0
  },
  {
    id: 224,
    category: "conversion_bases",
    text: String.raw`Le nombre décimal $25$ s'écrit en binaire :`,
    options: [
      String.raw`$(10101)_2$`,
      String.raw`$(11001)_2$`,
      String.raw`$(11010)_2$`,
      String.raw`$(10011)_2$`
    ],
    correctIndex: 1
  },
  {
    id: 225,
    category: "conversion_bases",
    text: String.raw`Le nombre décimal $255$ s'écrit en binaire :`,
    options: [
      String.raw`$(10000000)_2$`,
      String.raw`$(11111110)_2$`,
      String.raw`$(01111111)_2$`,
      String.raw`$(11111111)_2$`
    ],
    correctIndex: 3
  },
  {
    id: 226,
    category: "conversion_bases",
    text: String.raw`Le nombre décimal $397$ s'écrit en binaire (exemple du cours) :`,
    options: [
      String.raw`$(110001101)_2$`,
      String.raw`$(101100011)_2$`,
      String.raw`$(110011001)_2$`,
      String.raw`$(100110101)_2$`
    ],
    correctIndex: 0
  },
  {
    id: 227,
    category: "conversion_bases",
    text: String.raw`Pour la méthode de reconnaissance des puissances de $2$, on s'aide de la suite :`,
    options: [
      String.raw`$1, 2, 3, 4, 5, 6, 7, 8$`,
      String.raw`$128, 64, 32, 16, 8, 4, 2, 1$`,
      String.raw`$100, 50, 25, 12, 6, 3, 2, 1$`,
      String.raw`$256, 128, 64, 32, 16, 8, 4, 2$`
    ],
    correctIndex: 1
  },

  // ===== 7. Hexadécimal <-> binaire <-> décimal =====
  {
    id: 228,
    category: "conversion_bases",
    text: String.raw`Pour passer du binaire à l'hexadécimal, on regroupe les bits par paquets de :`,
    options: [
      String.raw`$2$`,
      String.raw`$3$`,
      String.raw`$8$`,
      String.raw`$4$`
    ],
    correctIndex: 3
  },
  {
    id: 229,
    category: "conversion_bases",
    text: String.raw`Pourquoi regroupe-t-on les bits par 4 pour passer en hexadécimal ?`,
    options: [
      String.raw`Car $16 = 2^4$`,
      String.raw`Car $4 = 2^2$`,
      String.raw`Car $8 = 2^3$`,
      String.raw`Car $10 = 2^4$`
    ],
    correctIndex: 0
  },
  {
    id: 230,
    category: "conversion_bases",
    text: String.raw`Le quartet binaire $(1011)_2$ correspond au chiffre hexadécimal :`,
    options: [
      String.raw`$\mathrm{A}_{16}$`,
      String.raw`$\mathrm{B}_{16}$`,
      String.raw`$\mathrm{C}_{16}$`,
      String.raw`$\mathrm{D}_{16}$`
    ],
    correctIndex: 1
  },
  {
    id: 231,
    category: "conversion_bases",
    text: String.raw`Le quartet binaire $(1111)_2$ correspond au chiffre hexadécimal :`,
    options: [
      String.raw`$\mathrm{E}_{16}$`,
      String.raw`$9_{16}$`,
      String.raw`$\mathrm{F}_{16}$`,
      String.raw`$\mathrm{A}_{16}$`
    ],
    correctIndex: 2
  },
  {
    id: 232,
    category: "conversion_bases",
    text: String.raw`Le nombre binaire $(1010\ 0110)_2$ s'écrit en hexadécimal :`,
    options: [
      String.raw`$\mathrm{A6}_{16}$`,
      String.raw`$\mathrm{6A}_{16}$`,
      String.raw`$\mathrm{A5}_{16}$`,
      String.raw`$\mathrm{B6}_{16}$`
    ],
    correctIndex: 0
  },
  {
    id: 233,
    category: "conversion_bases",
    text: String.raw`Le nombre binaire $(1111\ 1111)_2$ s'écrit en hexadécimal :`,
    options: [
      String.raw`$\mathrm{EE}_{16}$`,
      String.raw`$\mathrm{F0}_{16}$`,
      String.raw`$\mathrm{0F}_{16}$`,
      String.raw`$\mathrm{FF}_{16}$`
    ],
    correctIndex: 3
  },
  {
    id: 234,
    category: "conversion_bases",
    text: String.raw`Le nombre hexadécimal $\mathrm{3F}_{16}$ s'écrit en binaire :`,
    options: [
      String.raw`$(0011\ 1111)_2$`,
      String.raw`$(1111\ 0011)_2$`,
      String.raw`$(0011\ 1110)_2$`,
      String.raw`$(0111\ 1111)_2$`
    ],
    correctIndex: 0
  },
  {
    id: 235,
    category: "conversion_bases",
    text: String.raw`Le nombre hexadécimal $\mathrm{86A}_{16}$ s'écrit en binaire (exemple du cours) :`,
    options: [
      String.raw`$(1010\ 0110\ 1000)_2$`,
      String.raw`$(1000\ 0110\ 1010)_2$`,
      String.raw`$(1000\ 1010\ 0110)_2$`,
      String.raw`$(0110\ 1000\ 1010)_2$`
    ],
    correctIndex: 1
  },
  {
    id: 236,
    category: "conversion_bases",
    text: String.raw`Le nombre hexadécimal $(10)_{16}$ vaut en décimal :`,
    options: [
      String.raw`$10$`,
      String.raw`$8$`,
      String.raw`$15$`,
      String.raw`$16$`
    ],
    correctIndex: 3
  },
  {
    id: 237,
    category: "conversion_bases",
    text: String.raw`Le nombre hexadécimal $\mathrm{1F}_{16}$ vaut en décimal :`,
    options: [
      String.raw`$31$`,
      String.raw`$16$`,
      String.raw`$30$`,
      String.raw`$15$`
    ],
    correctIndex: 0
  },
  {
    id: 238,
    category: "conversion_bases",
    text: String.raw`Le nombre hexadécimal $\mathrm{2A}_{16}$ vaut en décimal :`,
    options: [
      String.raw`$22$`,
      String.raw`$40$`,
      String.raw`$42$`,
      String.raw`$12$`
    ],
    correctIndex: 2
  },
  {
    id: 239,
    category: "conversion_bases",
    text: String.raw`Le nombre hexadécimal $\mathrm{FF}_{16}$ vaut en décimal :`,
    options: [
      String.raw`$256$`,
      String.raw`$255$`,
      String.raw`$225$`,
      String.raw`$240$`
    ],
    correctIndex: 1
  },
  {
    id: 240,
    category: "conversion_bases",
    text: String.raw`Pour convertir $\mathrm{6A1E}_{16}$ (hexadécimal) en décimal, on calcule :`,
    options: [
      String.raw`$6 \times 10^3 + 10 \times 10^2 + 1 \times 10^1 + 14 \times 10^0$`,
      String.raw`$6 \times 2^3 + 10 \times 2^2 + 1 \times 2^1 + 14 \times 2^0$`,
      String.raw`$6 \times 16^3 + 10 \times 16^2 + 1 \times 16^1 + 14 \times 16^0$`,
      String.raw`$6 + 10 + 1 + 14$`
    ],
    correctIndex: 2
  },
  {
    id: 241,
    category: "conversion_bases",
    text: String.raw`Le nombre hexadécimal $\mathrm{6A1E}_{16}$ vaut en décimal :`,
    options: [
      String.raw`$27166$`,
      String.raw`$24576$`,
      String.raw`$27616$`,
      String.raw`$26176$`
    ],
    correctIndex: 0
  },
  {
    id: 242,
    category: "conversion_bases",
    text: String.raw`Dans le nombre hexadécimal $\mathrm{6A1E}_{16}$, le poids du chiffre $6$ est :`,
    options: [
      String.raw`$16$`,
      String.raw`$256$`,
      String.raw`$4096$`,
      String.raw`$6$`
    ],
    correctIndex: 2
  },

  // ===== 8. Nombres fractionnaires =====
  {
    id: 243,
    category: "conversion_bases",
    text: String.raw`Dans un nombre fractionnaire en base $b$, les chiffres après la virgule ont pour poids :`,
    options: [
      String.raw`$b^1, b^2, b^3, \ldots$`,
      String.raw`$b^{-1}, b^{-2}, b^{-3}, \ldots$`,
      String.raw`$b^0, b^1, b^2, \ldots$`,
      String.raw`$1, 2, 3, \ldots$`
    ],
    correctIndex: 1
  },
  {
    id: 244,
    category: "conversion_bases",
    text: String.raw`En binaire, $2^{-1}$ vaut :`,
    options: [
      String.raw`$0{,}1$`,
      String.raw`$2$`,
      String.raw`$0{,}25$`,
      String.raw`$0{,}5$`
    ],
    correctIndex: 3
  },
  {
    id: 245,
    category: "conversion_bases",
    text: String.raw`En binaire, $2^{-2}$ vaut :`,
    options: [
      String.raw`$0{,}25$`,
      String.raw`$0{,}5$`,
      String.raw`$0{,}125$`,
      String.raw`$0{,}2$`
    ],
    correctIndex: 0
  },
  {
    id: 246,
    category: "conversion_bases",
    text: String.raw`En binaire, $2^{-3}$ vaut :`,
    options: [
      String.raw`$0{,}25$`,
      String.raw`$0{,}0625$`,
      String.raw`$0{,}125$`,
      String.raw`$0{,}3$`
    ],
    correctIndex: 2
  },
  {
    id: 247,
    category: "conversion_bases",
    text: String.raw`Le nombre binaire $(0{,}1)_2$ vaut en décimal :`,
    options: [
      String.raw`$0{,}1$`,
      String.raw`$0{,}5$`,
      String.raw`$1$`,
      String.raw`$0{,}25$`
    ],
    correctIndex: 1
  },
  {
    id: 248,
    category: "conversion_bases",
    text: String.raw`Le nombre binaire $(0{,}101)_2$ vaut en décimal :`,
    options: [
      String.raw`$0{,}625$`,
      String.raw`$0{,}5$`,
      String.raw`$0{,}75$`,
      String.raw`$0{,}375$`
    ],
    correctIndex: 0
  },
  {
    id: 249,
    category: "conversion_bases",
    text: String.raw`Le nombre binaire $(0{,}11)_2$ vaut en décimal :`,
    options: [
      String.raw`$0{,}5$`,
      String.raw`$0{,}25$`,
      String.raw`$0{,}6$`,
      String.raw`$0{,}75$`
    ],
    correctIndex: 3
  },
  {
    id: 250,
    category: "conversion_bases",
    text: String.raw`Pour convertir la partie fractionnaire d'un nombre décimal en binaire, on la multiplie successivement par :`,
    options: [
      String.raw`$10$`,
      String.raw`$2$`,
      String.raw`$16$`,
      String.raw`$8$`
    ],
    correctIndex: 1
  },
  {
    id: 251,
    category: "conversion_bases",
    text: String.raw`Lors des multiplications successives par $2$, chaque bit obtenu correspond à :`,
    options: [
      String.raw`La partie entière du résultat ($0$ ou $1$)`,
      String.raw`La partie fractionnaire du résultat`,
      String.raw`Le résultat complet`,
      String.raw`Le reste de la division`
    ],
    correctIndex: 0
  },
  {
    id: 252,
    category: "conversion_bases",
    text: String.raw`On arrête les multiplications par $2$ quand :`,
    options: [
      String.raw`On a obtenu 8 bits`,
      String.raw`La partie entière est égale à $1$`,
      String.raw`La partie fractionnaire devient nulle (ou que la précision souhaitée est atteinte)`,
      String.raw`Le résultat dépasse $10$`
    ],
    correctIndex: 2
  },
  {
    id: 253,
    category: "conversion_bases",
    text: String.raw`Le nombre décimal $0{,}5$ s'écrit en binaire :`,
    options: [
      String.raw`$(0{,}01)_2$`,
      String.raw`$(0{,}11)_2$`,
      String.raw`$(0{,}001)_2$`,
      String.raw`$(0{,}1)_2$`
    ],
    correctIndex: 3
  },
  {
    id: 254,
    category: "conversion_bases",
    text: String.raw`Le nombre décimal $0{,}25$ s'écrit en binaire :`,
    options: [
      String.raw`$(0{,}01)_2$`,
      String.raw`$(0{,}1)_2$`,
      String.raw`$(0{,}11)_2$`,
      String.raw`$(0{,}001)_2$`
    ],
    correctIndex: 0
  },
  {
    id: 255,
    category: "conversion_bases",
    text: String.raw`Le nombre décimal $0{,}75$ s'écrit en binaire :`,
    options: [
      String.raw`$(0{,}01)_2$`,
      String.raw`$(0{,}101)_2$`,
      String.raw`$(0{,}11)_2$`,
      String.raw`$(0{,}111)_2$`
    ],
    correctIndex: 2
  },
  {
    id: 256,
    category: "conversion_bases",
    text: String.raw`Le nombre décimal $0{,}375$ s'écrit en binaire :`,
    options: [
      String.raw`$(0{,}011)_2$`,
      String.raw`$(0{,}101)_2$`,
      String.raw`$(0{,}110)_2$`,
      String.raw`$(0{,}0111)_2$`
    ],
    correctIndex: 0
  },
  {
    id: 257,
    category: "conversion_bases",
    text: String.raw`Le nombre décimal $0{,}6875$ s'écrit en binaire (exemple du cours) :`,
    options: [
      String.raw`$(0{,}1101)_2$`,
      String.raw`$(0{,}1011)_2$`,
      String.raw`$(0{,}1001)_2$`,
      String.raw`$(0{,}1110)_2$`
    ],
    correctIndex: 1
  },
  {
    id: 258,
    category: "conversion_bases",
    text: String.raw`La conversion d'un nombre fractionnaire décimal en binaire est exacte uniquement si :`,
    options: [
      String.raw`Le nombre est supérieur à $1$`,
      String.raw`On utilise au moins 8 bits`,
      String.raw`La partie fractionnaire finit par devenir nulle`,
      String.raw`Le nombre est négatif`
    ],
    correctIndex: 2
  },
  {
    id: 259,
    category: "conversion_bases",
    text: String.raw`Pour convertir $1470{,}7890625$ en binaire, on convertit séparément :`,
    options: [
      String.raw`La partie entière (divisions par $2$) et la partie fractionnaire (multiplications par $2$)`,
      String.raw`Uniquement la partie entière`,
      String.raw`Uniquement la partie fractionnaire`,
      String.raw`Le nombre entier en le multipliant par $2$`
    ],
    correctIndex: 0
  }, 

  // Questions "Structures algébriques — Groupes, Anneaux et Corps" (questions d'application, inspirées du TD)
// À coller dans ALL_QUESTIONS (après la question id 259)

  {
    id: 260,
    category: "structures_algebriques",
    text: String.raw`Sur $\mathbb{R}$, on définit $a \star b = ab - (a + b) + 2$. Que vaut $2 \star 3$ ?`,
    options: [
      String.raw`$1$`,
      String.raw`$3$`,
      String.raw`$5$`,
      String.raw`$6$`
    ],
    correctIndex: 1
  },
  {
    id: 261,
    category: "structures_algebriques",
    text: String.raw`Avec la loi $a \star b = ab - (a + b) + 2$, que vaut $3 \star 3$ ?`,
    options: [
      String.raw`$5$`,
      String.raw`$3$`,
      String.raw`$6$`,
      String.raw`$9$`
    ],
    correctIndex: 0
  },
  {
    id: 262,
    category: "structures_algebriques",
    text: String.raw`Pour la loi $a \star b = ab - (a + b) + 2$, l'élément neutre est :`,
    options: [
      String.raw`$0$`,
      String.raw`$1$`,
      String.raw`$2$`,
      String.raw`$-2$`
    ],
    correctIndex: 2
  },
  {
    id: 263,
    category: "structures_algebriques",
    text: String.raw`Pour la loi $a \star b = ab - (a + b) + 2$, quel réel n'a pas de symétrique ?`,
    options: [
      String.raw`$0$`,
      String.raw`$1$`,
      String.raw`$2$`,
      String.raw`$3$`
    ],
    correctIndex: 1
  },
  {
    id: 264,
    category: "structures_algebriques",
    text: String.raw`Pour la loi $a \star b = ab - (a + b) + 2$, le symétrique de $3$ est :`,
    options: [
      String.raw`$\frac{3}{2}$`,
      String.raw`$\frac{1}{3}$`,
      String.raw`$-3$`,
      String.raw`$\frac{2}{3}$`
    ],
    correctIndex: 0
  },
  {
    id: 265,
    category: "structures_algebriques",
    text: String.raw`Pour la loi $a \star b = ab - (a + b) + 2$, le réel $0$ est son propre symétrique car $0 \star 0$ vaut :`,
    options: [
      String.raw`$0$`,
      String.raw`$1$`,
      String.raw`$2$`,
      String.raw`$-2$`
    ],
    correctIndex: 2
  },

  // ===== 2. Loi x * y = x + y − xy sur ℝ (Exercice 2) =====
  {
    id: 266,
    category: "structures_algebriques",
    text: String.raw`Sur $\mathbb{R}$, on définit $x \star y = x + y - xy$. Que vaut $2 \star 3$ ?`,
    options: [
      String.raw`$-1$`,
      String.raw`$1$`,
      String.raw`$5$`,
      String.raw`$11$`
    ],
    correctIndex: 0
  },
  {
    id: 267,
    category: "structures_algebriques",
    text: String.raw`Pour la loi $x \star y = x + y - xy$, l'élément neutre est :`,
    options: [
      String.raw`$1$`,
      String.raw`$0$`,
      String.raw`$-1$`,
      String.raw`Il n'y en a pas`
    ],
    correctIndex: 1
  },
  {
    id: 268,
    category: "structures_algebriques",
    text: String.raw`Pour la loi $x \star y = x + y - xy$, que vaut $1 \star x$ pour tout réel $x$ ?`,
    options: [
      String.raw`$x$`,
      String.raw`$0$`,
      String.raw`$1$`,
      String.raw`$-x$`
    ],
    correctIndex: 2
  },
  {
    id: 269,
    category: "structures_algebriques",
    text: String.raw`Pour la loi $x \star y = x + y - xy$, quel réel n'est pas symétrisable ?`,
    options: [
      String.raw`$0$`,
      String.raw`$1$`,
      String.raw`$2$`,
      String.raw`$-1$`
    ],
    correctIndex: 1
  },
  {
    id: 270,
    category: "structures_algebriques",
    text: String.raw`Pour la loi $x \star y = x + y - xy$, le symétrique de $2$ est :`,
    options: [
      String.raw`$2$`,
      String.raw`$-2$`,
      String.raw`$\frac{1}{2}$`,
      String.raw`$0$`
    ],
    correctIndex: 0
  },
  {
    id: 271,
    category: "structures_algebriques",
    text: String.raw`Pour la loi $x \star y = x + y - xy$, le symétrique de $3$ est :`,
    options: [
      String.raw`$-3$`,
      String.raw`$\frac{3}{2}$`,
      String.raw`$\frac{1}{3}$`,
      String.raw`$\frac{2}{3}$`
    ],
    correctIndex: 1
  },
  {
    id: 272,
    category: "structures_algebriques",
    text: String.raw`Avec $f(x) = 1 - x$ et la loi $x \star y = x + y - xy$, on a $f(x \star y)$ égal à :`,
    options: [
      String.raw`$f(x) + f(y)$`,
      String.raw`$f(x) \times f(y)$`,
      String.raw`$f(x) - f(y)$`,
      String.raw`$\frac{f(x)}{f(y)}$`
    ],
    correctIndex: 1
  },

  // ===== 3. Loi x * y = xy + (x² − 1)(y² − 1) sur ℝ (Exercice 3) =====
  {
    id: 273,
    category: "structures_algebriques",
    text: String.raw`Sur $\mathbb{R}$, on définit $x \star y = xy + (x^2 - 1)(y^2 - 1)$. Que vaut $2 \star 3$ ?`,
    options: [
      String.raw`$6$`,
      String.raw`$24$`,
      String.raw`$30$`,
      String.raw`$36$`
    ],
    correctIndex: 2
  },
  {
    id: 274,
    category: "structures_algebriques",
    text: String.raw`Pour la loi $x \star y = xy + (x^2 - 1)(y^2 - 1)$, que vaut $1 \star x$ ?`,
    options: [
      String.raw`$0$`,
      String.raw`$1$`,
      String.raw`$x$`,
      String.raw`$x^2$`
    ],
    correctIndex: 2
  },
  {
    id: 275,
    category: "structures_algebriques",
    text: String.raw`Pour la loi $x \star y = xy + (x^2 - 1)(y^2 - 1)$, l'élément neutre est :`,
    options: [
      String.raw`$0$`,
      String.raw`$1$`,
      String.raw`$-1$`,
      String.raw`$2$`
    ],
    correctIndex: 1
  },
  {
    id: 276,
    category: "structures_algebriques",
    text: String.raw`Pour la loi $x \star y = xy + (x^2 - 1)(y^2 - 1)$, on trouve $(2 \star 3) \star 5$ et $2 \star (3 \star 5)$. Que peut-on en conclure ?`,
    options: [
      String.raw`Les deux valent $21726$ : la loi est associative`,
      String.raw`Elles valent $21726$ et $128958$ : la loi n'est pas associative`,
      String.raw`Les deux valent $150$ : la loi est associative`,
      String.raw`Elles valent $150$ et $207$ : la loi est commutative`
    ],
    correctIndex: 1
  },
  {
    id: 277,
    category: "structures_algebriques",
    text: String.raw`Pour la loi $x \star y = xy + (x^2 - 1)(y^2 - 1)$, $(\mathbb{R}, \star)$ est-il un groupe ?`,
    options: [
      String.raw`Oui`,
      String.raw`Non, car la loi n'est pas associative`,
      String.raw`Non, car il n'y a pas d'élément neutre`,
      String.raw`Non, car la loi n'est pas commutative`
    ],
    correctIndex: 1
  },
  {
    id: 278,
    category: "structures_algebriques",
    text: String.raw`Pour la loi $x \star y = xy + (x^2 - 1)(y^2 - 1)$, les solutions de $2 \star x = 2$ sont :`,
    options: [
      String.raw`$x = 1$ seulement`,
      String.raw`$x = 1$ et $x = -\frac{5}{3}$`,
      String.raw`$x = 0$ et $x = 2$`,
      String.raw`$x = -1$ et $x = \frac{5}{3}$`
    ],
    correctIndex: 1
  },
  {
    id: 279,
    category: "structures_algebriques",
    text: String.raw`Pour la loi $x \star y = xy + (x^2 - 1)(y^2 - 1)$, les solutions de $2 \star x = 5$ sont :`,
    options: [
      String.raw`$x = \frac{4}{3}$ et $x = -2$`,
      String.raw`$x = 1$`,
      String.raw`$x = \frac{5}{2}$`,
      String.raw`$x = -\frac{4}{3}$ et $x = 2$`
    ],
    correctIndex: 0
  },
  {
    id: 280,
    category: "structures_algebriques",
    text: String.raw`Pour la loi $x \star y = xy + (x^2 - 1)(y^2 - 1)$, le réel $2$ admet :`,
    options: [
      String.raw`Aucun symétrique`,
      String.raw`Exactement un symétrique`,
      String.raw`Deux symétriques distincts`,
      String.raw`Une infinité de symétriques`
    ],
    correctIndex: 2
  },

  // ===== 4. Autres lois et symétriques usuels =====
  {
    id: 281,
    category: "structures_algebriques",
    text: String.raw`Sur $\mathbb{R}$, on définit $x \star y = x + y - 2$. L'élément neutre est :`,
    options: [
      String.raw`$0$`,
      String.raw`$2$`,
      String.raw`$-2$`,
      String.raw`$1$`
    ],
    correctIndex: 1
  },
  {
    id: 282,
    category: "structures_algebriques",
    text: String.raw`Pour la loi $x \star y = x + y - 2$, le symétrique de $5$ est :`,
    options: [
      String.raw`$-5$`,
      String.raw`$\frac{1}{5}$`,
      String.raw`$-3$`,
      String.raw`$-1$`
    ],
    correctIndex: 3
  },
  {
    id: 283,
    category: "structures_algebriques",
    text: String.raw`Dans $(\mathbb{Z}, \times)$, quels éléments sont symétrisables ?`,
    options: [
      String.raw`Tous les entiers`,
      String.raw`Seulement $1$ et $-1$`,
      String.raw`Seulement $1$`,
      String.raw`Tous sauf $0$`
    ],
    correctIndex: 1
  },
  {
    id: 284,
    category: "structures_algebriques",
    text: String.raw`Dans $(\mathbb{Q}^*, \times)$, le symétrique de $\frac{3}{4}$ est :`,
    options: [
      String.raw`$-\frac{3}{4}$`,
      String.raw`$\frac{4}{3}$`,
      String.raw`$\frac{3}{4}$`,
      String.raw`$-\frac{4}{3}$`
    ],
    correctIndex: 1
  },
  {
    id: 285,
    category: "structures_algebriques",
    text: String.raw`Dans $(\mathbb{R}, \times)$, quel élément n'a pas d'inverse ?`,
    options: [
      String.raw`$1$`,
      String.raw`$0$`,
      String.raw`$-1$`,
      String.raw`$2$`
    ],
    correctIndex: 1
  },

  // ===== 5. Groupes, anneaux, corps : exemples =====
  {
    id: 286,
    category: "structures_algebriques",
    text: String.raw`Lequel de ces ensembles n'est PAS un groupe pour la loi indiquée ?`,
    options: [
      String.raw`$(\mathbb{Z}, +)$`,
      String.raw`$(\mathbb{Q}^*, \times)$`,
      String.raw`$(\mathbb{N}, +)$`,
      String.raw`$(\mathbb{R}, +)$`
    ],
    correctIndex: 2
  },
  {
    id: 287,
    category: "structures_algebriques",
    text: String.raw`Lequel de ces ensembles est un groupe pour la loi indiquée ?`,
    options: [
      String.raw`$(\mathbb{N}, +)$`,
      String.raw`$(\mathbb{Z}, \times)$`,
      String.raw`$(\mathbb{R}, \times)$`,
      String.raw`$(\mathbb{R}^*, \times)$`
    ],
    correctIndex: 3
  },
  {
    id: 288,
    category: "structures_algebriques",
    text: String.raw`$(\mathbb{Z}, +, \times)$ est un anneau mais pas un corps. Pourquoi ?`,
    options: [
      String.raw`Car $\times$ n'est pas commutative`,
      String.raw`Car des éléments non nuls comme $2$ n'ont pas d'inverse dans $\mathbb{Z}$`,
      String.raw`Car $\times$ n'a pas d'élément neutre`,
      String.raw`Car $\times$ n'est pas associative`
    ],
    correctIndex: 1
  },
  {
    id: 289,
    category: "structures_algebriques",
    text: String.raw`Lequel de ces ensembles est un corps pour l'addition et la multiplication usuelles ?`,
    options: [
      String.raw`$\mathbb{N}$`,
      String.raw`$\mathbb{Z}$`,
      String.raw`$\mathbb{Q}$`,
      String.raw`$2\mathbb{Z}$`
    ],
    correctIndex: 2
  },
  {
    id: 290,
    category: "structures_algebriques",
    text: String.raw`Lequel de ces ensembles n'est PAS un corps pour l'addition et la multiplication usuelles ?`,
    options: [
      String.raw`$\mathbb{Q}$`,
      String.raw`$\mathbb{R}$`,
      String.raw`$\mathbb{C}$`,
      String.raw`$\mathbb{Z}$`
    ],
    correctIndex: 3
  },
  {
    id: 291,
    category: "structures_algebriques",
    text: String.raw`Quel anneau est intègre sans être un corps ?`,
    options: [
      String.raw`$\mathbb{Z}$`,
      String.raw`$\mathbb{Q}$`,
      String.raw`$\mathbb{R}$`,
      String.raw`$\mathbb{C}$`
    ],
    correctIndex: 0
  },

  // ===== 6. Sous-groupes, sous-anneaux, idéaux =====
  {
    id: 292,
    category: "structures_algebriques",
    text: String.raw`Lequel de ces ensembles est un sous-groupe de $(\mathbb{Z}, +)$ ?`,
    options: [
      String.raw`$\mathbb{N}$`,
      String.raw`$2\mathbb{Z}$`,
      String.raw`$\{0, 1\}$`,
      String.raw`$\{1, 2, 3\}$`
    ],
    correctIndex: 1
  },
  {
    id: 293,
    category: "structures_algebriques",
    text: String.raw`Pourquoi $\mathbb{N}$ n'est-il pas un sous-groupe de $(\mathbb{Z}, +)$ ?`,
    options: [
      String.raw`Car $0$ n'appartient pas à $\mathbb{N}$`,
      String.raw`Car $\mathbb{N}$ n'est pas stable par addition`,
      String.raw`Car les opposés des entiers non nuls n'appartiennent pas à $\mathbb{N}$`,
      String.raw`Car $\mathbb{N}$ est infini`
    ],
    correctIndex: 2
  },
  {
    id: 294,
    category: "structures_algebriques",
    text: String.raw`Lequel de ces ensembles est un sous-groupe de $(\mathbb{R}^*, \times)$ ?`,
    options: [
      String.raw`$\{-1, 1\}$`,
      String.raw`$\{0, 1\}$`,
      String.raw`$\{1, 2\}$`,
      String.raw`$\{-1, 2\}$`
    ],
    correctIndex: 0
  },
  {
    id: 295,
    category: "structures_algebriques",
    text: String.raw`Lequel de ces ensembles n'est PAS un sous-groupe de $(\mathbb{Z}, +)$ ?`,
    options: [
      String.raw`$2\mathbb{Z}$`,
      String.raw`$3\mathbb{Z}$`,
      String.raw`$2\mathbb{Z} \cup 3\mathbb{Z}$`,
      String.raw`$6\mathbb{Z}$`
    ],
    correctIndex: 2
  },
  {
    id: 296,
    category: "structures_algebriques",
    text: String.raw`Dans $(\mathbb{Z}, +)$, le sous-groupe engendré par $4$ est :`,
    options: [
      String.raw`$4\mathbb{Z}$`,
      String.raw`$\mathbb{Z}$`,
      String.raw`$2\mathbb{Z}$`,
      String.raw`$8\mathbb{Z}$`
    ],
    correctIndex: 0
  },
  {
    id: 297,
    category: "structures_algebriques",
    text: String.raw`L'intersection des sous-groupes $2\mathbb{Z}$ et $3\mathbb{Z}$ de $(\mathbb{Z}, +)$ est :`,
    options: [
      String.raw`$5\mathbb{Z}$`,
      String.raw`$6\mathbb{Z}$`,
      String.raw`$\mathbb{Z}$`,
      String.raw`$\{0\}$`
    ],
    correctIndex: 1
  },
  {
    id: 298,
    category: "structures_algebriques",
    text: String.raw`$\mathbb{Z}$ est un sous-anneau de $\mathbb{Q}$. Est-ce aussi un sous-corps de $\mathbb{Q}$ ?`,
    options: [
      String.raw`Oui`,
      String.raw`Non, car $2$ n'a pas d'inverse dans $\mathbb{Z}$`,
      String.raw`Non, car $\mathbb{Z}$ n'est pas stable par addition`,
      String.raw`Non, car $0$ n'appartient pas à $\mathbb{Z}$`
    ],
    correctIndex: 1
  },
  {
    id: 299,
    category: "structures_algebriques",
    text: String.raw`Lequel de ces ensembles est un idéal de l'anneau $\mathbb{Z}$ ?`,
    options: [
      String.raw`$\mathbb{N}$`,
      String.raw`$\{0, 1\}$`,
      String.raw`$5\mathbb{Z}$`,
      String.raw`$\{1, 2, 3\}$`
    ],
    correctIndex: 2
  },
  {
    id: 300,
    category: "structures_algebriques",
    text: String.raw`$\mathbb{Z}$ est-il un idéal de l'anneau $\mathbb{Q}$ ?`,
    options: [
      String.raw`Oui`,
      String.raw`Non, car $\frac{1}{2} \times 1 = \frac{1}{2}$ n'appartient pas à $\mathbb{Z}$`,
      String.raw`Non, car $\mathbb{Z}$ n'est pas un sous-groupe de $(\mathbb{Q}, +)$`,
      String.raw`Non, car $0$ n'appartient pas à $\mathbb{Z}$`
    ],
    correctIndex: 1
  },

  // ===== 7. Les ensembles ℤ[√7], H et ℚ[√2] (Exercices 4, 7, 8) =====
  {
    id: 301,
    category: "structures_algebriques",
    text: String.raw`Dans $\mathbb{Z}[\sqrt{7}]$, que vaut $(1 + \sqrt{7})(2 + \sqrt{7})$ ?`,
    options: [
      String.raw`$9 + 3\sqrt{7}$`,
      String.raw`$2 + 7\sqrt{7}$`,
      String.raw`$3 + 9\sqrt{7}$`,
      String.raw`$9 + \sqrt{7}$`
    ],
    correctIndex: 0
  },
  {
    id: 302,
    category: "structures_algebriques",
    text: String.raw`Soit $\varphi(a + b\sqrt{7}) = a - b\sqrt{7}$. Que vaut $\varphi\bigl(\varphi(3 + 2\sqrt{7})\bigr)$ ?`,
    options: [
      String.raw`$3 - 2\sqrt{7}$`,
      String.raw`$-3 - 2\sqrt{7}$`,
      String.raw`$3 + 2\sqrt{7}$`,
      String.raw`$-3 + 2\sqrt{7}$`
    ],
    correctIndex: 2
  },
  {
    id: 303,
    category: "structures_algebriques",
    text: String.raw`Soit $H = \{x + y\sqrt{3} : x,y \in \mathbb{Z},\ x^2 - 3y^2 = 1\}$. Lequel de ces nombres appartient à $H$ ?`,
    options: [
      String.raw`$1 + \sqrt{3}$`,
      String.raw`$2 + \sqrt{3}$`,
      String.raw`$3 + \sqrt{3}$`,
      String.raw`$1 + 2\sqrt{3}$`
    ],
    correctIndex: 1
  },
  {
    id: 304,
    category: "structures_algebriques",
    text: String.raw`Dans le groupe $(H, \times)$, l'inverse de $2 + \sqrt{3}$ est :`,
    options: [
      String.raw`$-2 - \sqrt{3}$`,
      String.raw`$2 - \sqrt{3}$`,
      String.raw`$\frac{1}{2} + \sqrt{3}$`,
      String.raw`$\sqrt{3} - 1$`
    ],
    correctIndex: 1
  },
  {
    id: 305,
    category: "structures_algebriques",
    text: String.raw`Que vaut $(2 + \sqrt{3})^2$ ? (On obtient encore un élément de $H$.)`,
    options: [
      String.raw`$7 + 4\sqrt{3}$`,
      String.raw`$7 + 2\sqrt{3}$`,
      String.raw`$4 + 4\sqrt{3}$`,
      String.raw`$1 + 4\sqrt{3}$`
    ],
    correctIndex: 0
  },
  {
    id: 306,
    category: "structures_algebriques",
    text: String.raw`Dans le corps $\mathbb{Q}[\sqrt{2}]$, l'inverse de $1 + \sqrt{2}$ est :`,
    options: [
      String.raw`$1 - \sqrt{2}$`,
      String.raw`$-1 + \sqrt{2}$`,
      String.raw`$\frac{1}{2} + \sqrt{2}$`,
      String.raw`$\frac{\sqrt{2}}{2}$`
    ],
    correctIndex: 1
  },
  {
    id: 307,
    category: "structures_algebriques",
    text: String.raw`Dans le corps $\mathbb{Q}[\sqrt{2}]$, l'inverse de $3 + \sqrt{2}$ est :`,
    options: [
      String.raw`$\frac{3 + \sqrt{2}}{7}$`,
      String.raw`$3 - \sqrt{2}$`,
      String.raw`$\frac{3 - \sqrt{2}}{7}$`,
      String.raw`$\frac{\sqrt{2} - 3}{7}$`
    ],
    correctIndex: 2
  },

  // ===== 8. Morphismes =====
  {
    id: 308,
    category: "structures_algebriques",
    text: String.raw`Laquelle de ces applications est un morphisme de groupes de $(\mathbb{R}, +)$ dans $(\mathbb{R}, +)$ ?`,
    options: [
      String.raw`$x \mapsto x + 1$`,
      String.raw`$x \mapsto x^2$`,
      String.raw`$x \mapsto |x|$`,
      String.raw`$x \mapsto 2x$`
    ],
    correctIndex: 3
  },
  {
    id: 309,
    category: "structures_algebriques",
    text: String.raw`Soit $f : (\mathbb{Z}, +) \to (\mathbb{Z}, +)$ définie par $f(x) = 3x$. Que vaut $f(-4)$ ?`,
    options: [
      String.raw`$12$`,
      String.raw`$-12$`,
      String.raw`$-7$`,
      String.raw`$-1$`
    ],
    correctIndex: 1
  },
  {
    id: 310,
    category: "structures_algebriques",
    text: String.raw`Pour le morphisme $\exp : (\mathbb{R}, +) \to (\mathbb{R}^*_+, \times)$, l'image de l'élément neutre $0$ est :`,
    options: [
      String.raw`$0$`,
      String.raw`$1$`,
      String.raw`$e$`,
      String.raw`$-1$`
    ],
    correctIndex: 1
  },
  {
    id: 311,
    category: "structures_algebriques",
    text: String.raw`Soit $f : (\mathbb{Z}, +) \to (\mathbb{Z}, +)$ définie par $f(x) = 5x$. Son noyau $\operatorname{Ker}(f)$ est :`,
    options: [
      String.raw`$\{0\}$`,
      String.raw`$5\mathbb{Z}$`,
      String.raw`$\mathbb{Z}$`,
      String.raw`$\{1\}$`
    ],
    correctIndex: 0
  },
  {
    id: 312,
    category: "structures_algebriques",
    text: String.raw`L'application $f(x) = 5x$ de $(\mathbb{Z}, +)$ dans $(\mathbb{Z}, +)$ est :`,
    options: [
      String.raw`Injective mais pas surjective`,
      String.raw`Surjective mais pas injective`,
      String.raw`Bijective`,
      String.raw`Ni injective ni surjective`
    ],
    correctIndex: 0
  },
  {
    id: 313,
    category: "structures_algebriques",
    text: String.raw`Soit $f : (\mathbb{C}^*, \times) \to (\mathbb{R}^*_+, \times)$, $z \mapsto |z|$. Son noyau est :`,
    options: [
      String.raw`$\{1\}$`,
      String.raw`$\{-1, 1\}$`,
      String.raw`$\{z : |z| = 1\}$`,
      String.raw`$\mathbb{R}^*_+$`
    ],
    correctIndex: 2
  },
  {
    id: 314,
    category: "structures_algebriques",
    text: String.raw`L'application $f(x) = 2x$ de $(\mathbb{Z}, +, \times)$ dans $(\mathbb{Z}, +, \times)$ est-elle un morphisme d'anneaux ?`,
    options: [
      String.raw`Oui`,
      String.raw`Non, car $f(1) = 2 \neq 1$`,
      String.raw`Non, car $f(0) \neq 0$`,
      String.raw`Non, car $f$ n'est pas additive`
    ],
    correctIndex: 1
  },

  // ===== 9. Groupe symétrique Sₙ : généralités =====
  {
    id: 315,
    category: "structures_algebriques",
    text: String.raw`Combien d'éléments contient le groupe symétrique $S_3$ ?`,
    options: [
      String.raw`$3$`,
      String.raw`$6$`,
      String.raw`$9$`,
      String.raw`$12$`
    ],
    correctIndex: 1
  },
  {
    id: 316,
    category: "structures_algebriques",
    text: String.raw`Combien d'éléments contient le groupe symétrique $S_4$ ?`,
    options: [
      String.raw`$12$`,
      String.raw`$16$`,
      String.raw`$24$`,
      String.raw`$8$`
    ],
    correctIndex: 2
  },
  {
    id: 317,
    category: "structures_algebriques",
    text: String.raw`Combien d'éléments contient le groupe symétrique $S_5$ ?`,
    options: [
      String.raw`$25$`,
      String.raw`$60$`,
      String.raw`$24$`,
      String.raw`$120$`
    ],
    correctIndex: 3
  },
  {
    id: 318,
    category: "structures_algebriques",
    text: String.raw`Le groupe symétrique $S_3$ est-il commutatif ?`,
    options: [
      String.raw`Oui`,
      String.raw`Non`,
      String.raw`Seulement si on se limite aux cycles`,
      String.raw`On ne peut pas savoir`
    ],
    correctIndex: 1
  },

  // ===== 10. Cycles =====
  {
    id: 319,
    category: "structures_algebriques",
    text: String.raw`Dans $S_5$, le cycle $(1\ 3\ 5)$ envoie $1$ sur :`,
    options: [
      String.raw`$1$`,
      String.raw`$3$`,
      String.raw`$5$`,
      String.raw`$2$`
    ],
    correctIndex: 1
  },
  {
    id: 320,
    category: "structures_algebriques",
    text: String.raw`Dans $S_5$, le cycle $(1\ 3\ 5)$ envoie $5$ sur :`,
    options: [
      String.raw`$3$`,
      String.raw`$5$`,
      String.raw`$1$`,
      String.raw`$4$`
    ],
    correctIndex: 2
  },
  {
    id: 321,
    category: "structures_algebriques",
    text: String.raw`Dans $S_5$, l'ensemble des points fixes du cycle $(1\ 3\ 5)$ est :`,
    options: [
      String.raw`$\{1, 3, 5\}$`,
      String.raw`$\{2, 4\}$`,
      String.raw`$\{1, 2\}$`,
      String.raw`$\varnothing$`
    ],
    correctIndex: 1
  },
  {
    id: 322,
    category: "structures_algebriques",
    text: String.raw`Dans $S_5$, le support du cycle $(1\ 3\ 5)$ est :`,
    options: [
      String.raw`$\{2, 4\}$`,
      String.raw`$\{1, 3, 5\}$`,
      String.raw`$\{1, 2, 3, 4, 5\}$`,
      String.raw`$\{1\}$`
    ],
    correctIndex: 1
  },
  {
    id: 323,
    category: "structures_algebriques",
    text: String.raw`L'inverse du cycle $(1\ 3\ 5)$ est :`,
    options: [
      String.raw`$(1\ 3\ 5)$`,
      String.raw`$(1\ 3)$`,
      String.raw`$(3\ 5)$`,
      String.raw`$(1\ 5\ 3)$`
    ],
    correctIndex: 3
  },
  {
    id: 324,
    category: "structures_algebriques",
    text: String.raw`Soit $\sigma = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 3 & 1 \end{pmatrix}$ ($\sigma(1) = 2$, $\sigma(2) = 3$, $\sigma(3) = 1$). Que vaut $\sigma^{-1}(1)$ ?`,
    options: [
      String.raw`$1$`,
      String.raw`$2$`,
      String.raw`$3$`,
      String.raw`Impossible à calculer`
    ],
    correctIndex: 2
  },
  {
    id: 325,
    category: "structures_algebriques",
    text: String.raw`Dans $S_3$, soit $\sigma = (1\ 2)$ et $\tau = (2\ 3)$. Que vaut $\sigma\tau(1)$ ?`,
    options: [
      String.raw`$1$`,
      String.raw`$2$`,
      String.raw`$3$`,
      String.raw`Non défini`
    ],
    correctIndex: 1
  },
  {
    id: 326,
    category: "structures_algebriques",
    text: String.raw`Dans $S_3$, le produit $\sigma\tau$ de $\sigma = (1\ 2)$ et $\tau = (2\ 3)$ est :`,
    options: [
      String.raw`$(1\ 2\ 3)$`,
      String.raw`$(1\ 3\ 2)$`,
      String.raw`$(1\ 2)$`,
      String.raw`L'identité`
    ],
    correctIndex: 0
  },
  {
    id: 327,
    category: "structures_algebriques",
    text: String.raw`Les permutations $(1\ 2)$ et $(3\ 4)$ de $S_4$ :`,
    options: [
      String.raw`Commutent car leurs supports sont disjoints`,
      String.raw`Ne commutent pas`,
      String.raw`Sont égales`,
      String.raw`Sont inverses l'une de l'autre`
    ],
    correctIndex: 0
  },

  // ===== 11. Ordre d'une permutation =====
  {
    id: 328,
    category: "structures_algebriques",
    text: String.raw`Quel est l'ordre du cycle $(1\ 2\ 3\ 4)$ ?`,
    options: [
      String.raw`$2$`,
      String.raw`$4$`,
      String.raw`$3$`,
      String.raw`$24$`
    ],
    correctIndex: 1
  },
  {
    id: 329,
    category: "structures_algebriques",
    text: String.raw`Quel est l'ordre de la permutation $(1\ 2)(3\ 4)$ ?`,
    options: [
      String.raw`$4$`,
      String.raw`$2$`,
      String.raw`$1$`,
      String.raw`$3$`
    ],
    correctIndex: 1
  },
  {
    id: 330,
    category: "structures_algebriques",
    text: String.raw`Quel est l'ordre de la permutation $(1\ 2)(3\ 4\ 5)$ ?`,
    options: [
      String.raw`$5$`,
      String.raw`$6$`,
      String.raw`$3$`,
      String.raw`$2$`
    ],
    correctIndex: 1
  },
  {
    id: 331,
    category: "structures_algebriques",
    text: String.raw`Quel est l'ordre de la permutation $(1\ 2\ 3)(4\ 5\ 6\ 7)$ ?`,
    options: [
      String.raw`$7$`,
      String.raw`$4$`,
      String.raw`$12$`,
      String.raw`$3$`
    ],
    correctIndex: 2
  },

  // ===== 12. Signature =====
  {
    id: 332,
    category: "structures_algebriques",
    text: String.raw`Quelle est la signature d'une transposition ?`,
    options: [
      String.raw`$1$`,
      String.raw`$-1$`,
      String.raw`$0$`,
      String.raw`$2$`
    ],
    correctIndex: 1
  },
  {
    id: 333,
    category: "structures_algebriques",
    text: String.raw`Quelle est la signature d'un 3-cycle ?`,
    options: [
      String.raw`$-1$`,
      String.raw`$1$`,
      String.raw`$3$`,
      String.raw`$0$`
    ],
    correctIndex: 1
  },
  {
    id: 334,
    category: "structures_algebriques",
    text: String.raw`Quelle est la signature d'un 4-cycle ?`,
    options: [
      String.raw`$-1$`,
      String.raw`$1$`,
      String.raw`$4$`,
      String.raw`$0$`
    ],
    correctIndex: 0
  },
  {
    id: 335,
    category: "structures_algebriques",
    text: String.raw`Le produit de deux permutations impaires est une permutation :`,
    options: [
      String.raw`Paire`,
      String.raw`Impaire`,
      String.raw`Toujours l'identité`,
      String.raw`On ne peut pas savoir`
    ],
    correctIndex: 0
  },
  {
    id: 336,
    category: "structures_algebriques",
    text: String.raw`Quelle est la signature d'un produit de 3 transpositions ?`,
    options: [
      String.raw`$-1$`,
      String.raw`$1$`,
      String.raw`$3$`,
      String.raw`$0$`
    ],
    correctIndex: 0
  },
  {
    id: 337,
    category: "structures_algebriques",
    text: String.raw`Une permutation qui s'écrit comme produit de 4 transpositions est :`,
    options: [
      String.raw`Paire`,
      String.raw`Impaire`,
      String.raw`L'identité`,
      String.raw`Un cycle de longueur 4`
    ],
    correctIndex: 0
  },
  {
    id: 338,
    category: "structures_algebriques",
    text: String.raw`Combien d'inversions possède la permutation $\begin{pmatrix} 1 & 2 & 3 \\ 3 & 2 & 1 \end{pmatrix}$ de $S_3$ ?`,
    options: [
      String.raw`$1$`,
      String.raw`$2$`,
      String.raw`$3$`,
      String.raw`$0$`
    ],
    correctIndex: 2
  },

  // ===== 13. Exercice 5 : σ = (1 2 3 4 5 6 / 3 1 5 2 6 4) et τ = (1 2 3 4 5 6 / 3 5 2 4 1 6) =====
  {
    id: 339,
    category: "structures_algebriques",
    text: String.raw`Soit $\sigma = \begin{pmatrix} 1 & 2 & 3 & 4 & 5 & 6 \\ 3 & 1 & 5 & 2 & 6 & 4 \end{pmatrix}$ dans $S_6$. Combien d'inversions possède $\sigma$ ?`,
    options: [
      String.raw`$3$`,
      String.raw`$4$`,
      String.raw`$5$`,
      String.raw`$6$`
    ],
    correctIndex: 2
  },
  {
    id: 340,
    category: "structures_algebriques",
    text: String.raw`Soit $\sigma = \begin{pmatrix} 1 & 2 & 3 & 4 & 5 & 6 \\ 3 & 1 & 5 & 2 & 6 & 4 \end{pmatrix}$ dans $S_6$. $\sigma$ s'écrit :`,
    options: [
      String.raw`Un 6-cycle $(1\ 3\ 5\ 6\ 4\ 2)$`,
      String.raw`Le produit de deux 3-cycles`,
      String.raw`Un 5-cycle`,
      String.raw`Une transposition`
    ],
    correctIndex: 0
  },
  {
    id: 341,
    category: "structures_algebriques",
    text: String.raw`Soit $\sigma = \begin{pmatrix} 1 & 2 & 3 & 4 & 5 & 6 \\ 3 & 1 & 5 & 2 & 6 & 4 \end{pmatrix}$. Quel est l'ordre de $\sigma$ ?`,
    options: [
      String.raw`$4$`,
      String.raw`$5$`,
      String.raw`$6$`,
      String.raw`$3$`
    ],
    correctIndex: 2
  },
  {
    id: 342,
    category: "structures_algebriques",
    text: String.raw`Soit $\tau = \begin{pmatrix} 1 & 2 & 3 & 4 & 5 & 6 \\ 3 & 5 & 2 & 4 & 1 & 6 \end{pmatrix}$ dans $S_6$. $\tau$ s'écrit :`,
    options: [
      String.raw`Un 4-cycle $(1\ 3\ 2\ 5)$`,
      String.raw`Un 6-cycle`,
      String.raw`Le produit de deux transpositions`,
      String.raw`Un 3-cycle`
    ],
    correctIndex: 0
  },
  {
    id: 343,
    category: "structures_algebriques",
    text: String.raw`Soit $\tau = \begin{pmatrix} 1 & 2 & 3 & 4 & 5 & 6 \\ 3 & 5 & 2 & 4 & 1 & 6 \end{pmatrix}$. Quels sont ses points fixes ?`,
    options: [
      String.raw`$\{1, 2\}$`,
      String.raw`$\{4, 6\}$`,
      String.raw`$\{3, 5\}$`,
      String.raw`Aucun`
    ],
    correctIndex: 1
  },
  {
    id: 344,
    category: "structures_algebriques",
    text: String.raw`Le produit $\sigma\tau$ de $\sigma$ et $\tau$ (Exercice 5) est le produit de deux 3-cycles disjoints. Son ordre est donc :`,
    options: [
      String.raw`$3$`,
      String.raw`$6$`,
      String.raw`$9$`,
      String.raw`$2$`
    ],
    correctIndex: 0
  },
  {
    id: 345,
    category: "structures_algebriques",
    text: String.raw`Les permutations $\sigma$ et $\tau$ de l'Exercice 5 sont toutes les deux impaires. Que peut-on dire de $\sigma\tau$ ?`,
    options: [
      String.raw`Elle est paire`,
      String.raw`Elle est impaire`,
      String.raw`Elle est l'identité`,
      String.raw`Elle n'a pas de signature`
    ],
    correctIndex: 0
  },

  // ===== 14. Exercice 6 : permutation de S₁₀ =====
  {
    id: 346,
    category: "structures_algebriques",
    text: String.raw`Soit $$\sigma = \begin{pmatrix} 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 \\ 4 & 8 & 5 & 9 & 7 & 10 & 2 & 3 & 1 & 6 \end{pmatrix}$$ dans $S_{10}$. Sa décomposition en cycles à supports disjoints est :`,
    options: [
      String.raw`$(1\ 4)(2\ 8\ 3)(5\ 7)(6\ 10\ 9)$`,
      String.raw`$(1\ 4\ 9\ 6)(2\ 8\ 3\ 5\ 7)$`,
      String.raw`$(1\ 4\ 9)(2\ 8\ 3\ 5\ 7)(6\ 10)$`,
      String.raw`$(1\ 9\ 4)(2\ 7\ 5\ 3\ 8)(6\ 10)$`
    ],
    correctIndex: 2
  },
  {
    id: 347,
    category: "structures_algebriques",
    text: String.raw`Pour $\sigma = (1\ 4\ 9)(2\ 8\ 3\ 5\ 7)(6\ 10)$, quel est l'ordre de $\sigma$ ?`,
    options: [
      String.raw`$15$`,
      String.raw`$30$`,
      String.raw`$60$`,
      String.raw`$10$`
    ],
    correctIndex: 1
  },
  {
    id: 348,
    category: "structures_algebriques",
    text: String.raw`Pour $\sigma = (1\ 4\ 9)(2\ 8\ 3\ 5\ 7)(6\ 10)$, quelle est la signature de $\sigma$ ?`,
    options: [
      String.raw`$1$`,
      String.raw`$-1$`,
      String.raw`$3$`,
      String.raw`$30$`
    ],
    correctIndex: 1
  },
  {
    id: 349,
    category: "structures_algebriques",
    text: String.raw`Pour $$\sigma = \begin{pmatrix} 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 \\ 4 & 8 & 5 & 9 & 7 & 10 & 2 & 3 & 1 & 6 \end{pmatrix}$$ combien d'inversions possède $\sigma$ ?`,
    options: [
      String.raw`$25$`,
      String.raw`$26$`,
      String.raw`$27$`,
      String.raw`$28$`
    ],
    correctIndex: 2
  },
  {
    id: 350,
    category: "structures_algebriques",
    text: String.raw`Pour $\sigma$ d'ordre $30$, on a $\sigma^{2021} = \sigma^{11}$ (car $2021 = 30 \times 67 + 11$). Que vaut $\sigma^{2021}(1)$ avec $\sigma = (1\ 4\ 9)(2\ 8\ 3\ 5\ 7)(6\ 10)$ ?`,
    options: [
      String.raw`$4$`,
      String.raw`$9$`,
      String.raw`$1$`,
      String.raw`$8$`
    ],
    correctIndex: 1
  },
  {
    id: 351,
    category: "structures_algebriques",
    text: String.raw`Avec $\sigma = (1\ 4\ 9)(2\ 8\ 3\ 5\ 7)(6\ 10)$ et $\sigma^{2021} = \sigma^{11}$, que vaut $\sigma^{2021}(2)$ ?`,
    options: [
      String.raw`$8$`,
      String.raw`$2$`,
      String.raw`$3$`,
      String.raw`$7$`
    ],
    correctIndex: 0
  },
  {
    id: 352,
    category: "structures_algebriques",
    text: String.raw`Avec $\sigma = (1\ 4\ 9)(2\ 8\ 3\ 5\ 7)(6\ 10)$ et $\sigma^{2021} = \sigma^{11}$, que vaut $\sigma^{2021}(6)$ ?`,
    options: [
      String.raw`$6$`,
      String.raw`$10$`,
      String.raw`$1$`,
      String.raw`$2$`
    ],
    correctIndex: 1
  },

  // ===== 15. Ordres et sous-groupes (Lagrange) =====
  {
    id: 353,
    category: "structures_algebriques",
    text: String.raw`Dans un groupe fini d'ordre $12$, quel peut être l'ordre d'un sous-groupe ?`,
    options: [
      String.raw`$5$`,
      String.raw`$7$`,
      String.raw`$8$`,
      String.raw`$6$`
    ],
    correctIndex: 3
  },
  {
    id: 354,
    category: "structures_algebriques",
    text: String.raw`Dans un groupe fini d'ordre $10$, quel peut être l'ordre d'un élément ?`,
    options: [
      String.raw`$3$`,
      String.raw`$4$`,
      String.raw`$5$`,
      String.raw`$6$`
    ],
    correctIndex: 2
  },
  {
    id: 355,
    category: "structures_algebriques",
    text: String.raw`Dans un groupe fini d'ordre $7$, quels sont les ordres possibles pour un sous-groupe ?`,
    options: [
      String.raw`$1$ ou $7$ seulement`,
      String.raw`$2$ ou $5$`,
      String.raw`$3$ ou $4$`,
      String.raw`Tous les entiers de $1$ à $7$`
    ],
    correctIndex: 0
  },
  {
    id: 356,
    category: "structures_algebriques",
    text: String.raw`Dans $S_3$, le sous-groupe engendré par un 3-cycle a pour ordre :`,
    options: [
      String.raw`$2$`,
      String.raw`$3$`,
      String.raw`$6$`,
      String.raw`$1$`
    ],
    correctIndex: 1
  },
  //==================aaaa============
// Questions "Calcul propositionnel" (chapitre 11, pages 89 à 95)
// À coller dans ALL_QUESTIONS, après la question id 356.
// Nouvelle catégorie : "calcul_propositionnel"


  // ===== 1. Propositions =====
  {
    id: 357,
    category: "calcul_propositionnel",
    text: String.raw`Une proposition est un énoncé auquel on peut attribuer :`,
    options: [
      String.raw`Une couleur`,
      String.raw`Une valeur de vérité : vrai ou faux`,
      String.raw`Un nombre réel`,
      String.raw`Une réponse à une question`
    ],
    correctIndex: 1
  },
  {
    id: 358,
    category: "calcul_propositionnel",
    text: String.raw`Lequel de ces énoncés est une proposition ?`,
    options: [
      String.raw`Quelle heure est-il ?`,
      String.raw`Ferme la porte !`,
      String.raw`Henri IV est mort assassiné en 1610`,
      String.raw`Peut-être demain`
    ],
    correctIndex: 2
  },
  {
    id: 359,
    category: "calcul_propositionnel",
    text: String.raw`La proposition « Henri IV est mort assassiné en 1610 » est :`,
    options: [
      String.raw`Vraie`,
      String.raw`Fausse`,
      String.raw`Indéterminée`,
      String.raw`Ce n'est pas une proposition`
    ],
    correctIndex: 0
  },
  {
    id: 360,
    category: "calcul_propositionnel",
    text: String.raw`La proposition « Napoléon Bonaparte a été guillotiné en 1852 » est :`,
    options: [
      String.raw`Vraie`,
      String.raw`Fausse`,
      String.raw`Indéterminée`,
      String.raw`Ce n'est pas une proposition`
    ],
    correctIndex: 1
  },

  // ===== 2. Principes =====
  {
    id: 361,
    category: "calcul_propositionnel",
    text: String.raw`Le principe de non-contradiction affirme que :`,
    options: [
      String.raw`Une proposition est toujours vraie`,
      String.raw`Une proposition ne peut pas être simultanément vraie et fausse`,
      String.raw`Une proposition est vraie ou fausse, sans autre possibilité`,
      String.raw`Une proposition peut n'être ni vraie ni fausse`
    ],
    correctIndex: 1
  },
  {
    id: 362,
    category: "calcul_propositionnel",
    text: String.raw`Le principe du tiers-exclu affirme que :`,
    options: [
      String.raw`Une proposition ne peut pas être vraie et fausse à la fois`,
      String.raw`Une proposition est toujours fausse`,
      String.raw`Une proposition est vraie ou fausse, il n'y a pas d'autre possibilité`,
      String.raw`Une proposition peut avoir trois valeurs de vérité`
    ],
    correctIndex: 2
  },

  // ===== 3. Symboles des connecteurs =====
  {
    id: 363,
    category: "calcul_propositionnel",
    text: String.raw`Quel symbole représente le connecteur « ou » (disjonction) ?`,
    options: [
      String.raw`$\land$`,
      String.raw`$\neg$`,
      String.raw`$\lor$`,
      String.raw`$\Rightarrow$`
    ],
    correctIndex: 2
  },
  {
    id: 364,
    category: "calcul_propositionnel",
    text: String.raw`Quel symbole représente le connecteur « et » (conjonction) ?`,
    options: [
      String.raw`$\lor$`,
      String.raw`$\land$`,
      String.raw`$\Leftrightarrow$`,
      String.raw`$\neg$`
    ],
    correctIndex: 1
  },
  {
    id: 365,
    category: "calcul_propositionnel",
    text: String.raw`Quel symbole représente le connecteur « non » (négation) ?`,
    options: [
      String.raw`$\neg$`,
      String.raw`$\land$`,
      String.raw`$\lor$`,
      String.raw`$\Rightarrow$`
    ],
    correctIndex: 0
  },
  {
    id: 366,
    category: "calcul_propositionnel",
    text: String.raw`Quel symbole représente le connecteur « si… alors » (implication) ?`,
    options: [
      String.raw`$\Leftrightarrow$`,
      String.raw`$\land$`,
      String.raw`$\Rightarrow$`,
      String.raw`$\lor$`
    ],
    correctIndex: 2
  },
  {
    id: 367,
    category: "calcul_propositionnel",
    text: String.raw`Quel symbole représente le connecteur « si et seulement si » (équivalence) ?`,
    options: [
      String.raw`$\Rightarrow$`,
      String.raw`$\Leftrightarrow$`,
      String.raw`$\lor$`,
      String.raw`$\neg$`
    ],
    correctIndex: 1
  },

  // ===== 4. Disjonction =====
  {
    id: 368,
    category: "calcul_propositionnel",
    text: String.raw`Si $P$ est fausse et $Q$ est vraie, alors $P \lor Q$ est :`,
    options: [
      String.raw`Fausse`,
      String.raw`Vraie`,
      String.raw`Indéfinie`,
      String.raw`On ne peut pas savoir`
    ],
    correctIndex: 1
  },
  {
    id: 369,
    category: "calcul_propositionnel",
    text: String.raw`$P \lor Q$ est fausse si et seulement si :`,
    options: [
      String.raw`$P$ est fausse`,
      String.raw`$Q$ est fausse`,
      String.raw`$P$ et $Q$ sont toutes les deux fausses`,
      String.raw`$P$ et $Q$ sont toutes les deux vraies`
    ],
    correctIndex: 2
  },
  {
    id: 370,
    category: "calcul_propositionnel",
    text: String.raw`Dans le cours, le « ou » logique signifie, sauf indication contraire :`,
    options: [
      String.raw`L'un ou l'autre, mais pas les deux`,
      String.raw`Les deux cas peuvent se produire`,
      String.raw`Ni l'un ni l'autre`,
      String.raw`Toujours faux`
    ],
    correctIndex: 1
  },

  // ===== 5. Conjonction =====
  {
    id: 371,
    category: "calcul_propositionnel",
    text: String.raw`$P \land Q$ est vraie si et seulement si :`,
    options: [
      String.raw`$P$ est vraie`,
      String.raw`$Q$ est vraie`,
      String.raw`$P$ ou $Q$ est vraie`,
      String.raw`$P$ et $Q$ sont toutes les deux vraies`
    ],
    correctIndex: 3
  },
  {
    id: 372,
    category: "calcul_propositionnel",
    text: String.raw`Si $P$ est vraie et $Q$ est fausse, alors $P \land Q$ est :`,
    options: [
      String.raw`Vraie`,
      String.raw`Fausse`,
      String.raw`Indéfinie`,
      String.raw`Égale à $P$`
    ],
    correctIndex: 1
  },
  {
    id: 373,
    category: "calcul_propositionnel",
    text: String.raw`En shell, « commande1 && commande2 » exécute commande2 seulement si commande1 réussit. Quel connecteur logique cela rappelle-t-il ?`,
    options: [
      String.raw`Le « ou »`,
      String.raw`Le « et »`,
      String.raw`Le « non »`,
      String.raw`L'équivalence`
    ],
    correctIndex: 1
  },

  // ===== 6. Négation =====
  {
    id: 374,
    category: "calcul_propositionnel",
    text: String.raw`Si $P$ est vraie, alors $\neg P$ est :`,
    options: [
      String.raw`Vraie`,
      String.raw`Fausse`,
      String.raw`Indéfinie`,
      String.raw`Égale à $P$`
    ],
    correctIndex: 1
  },

  // ===== 7. Implication =====
  {
    id: 375,
    category: "calcul_propositionnel",
    text: String.raw`Si $P$ est vraie et $Q$ est fausse, alors $P \Rightarrow Q$ est :`,
    options: [
      String.raw`Vraie`,
      String.raw`Fausse`,
      String.raw`Indéfinie`,
      String.raw`Égale à $Q$`
    ],
    correctIndex: 1
  },
  {
    id: 376,
    category: "calcul_propositionnel",
    text: String.raw`L'implication $P \Rightarrow Q$ est fausse uniquement lorsque :`,
    options: [
      String.raw`$P$ est fausse et $Q$ est vraie`,
      String.raw`$P$ est fausse et $Q$ est fausse`,
      String.raw`$P$ est vraie et $Q$ est vraie`,
      String.raw`$P$ est vraie et $Q$ est fausse`
    ],
    correctIndex: 3
  },
  {
    id: 377,
    category: "calcul_propositionnel",
    text: String.raw`Lorsque $P$ est fausse, la proposition « Si $P$, alors $Q$ » est :`,
    options: [
      String.raw`Toujours vraie`,
      String.raw`Toujours fausse`,
      String.raw`Égale à $Q$`,
      String.raw`Égale à $\neg Q$`
    ],
    correctIndex: 0
  },
  {
    id: 378,
    category: "calcul_propositionnel",
    text: String.raw`La proposition « si la terre est plate, alors la lune est carrée » est :`,
    options: [
      String.raw`Fausse`,
      String.raw`Vraie (car la prémisse est fausse)`,
      String.raw`Indéterminée`,
      String.raw`Ce n'est pas une proposition`
    ],
    correctIndex: 1
  },
  {
    id: 379,
    category: "calcul_propositionnel",
    text: String.raw`La proposition « s'il pleut en ce moment alors il pleut en ce moment » est :`,
    options: [
      String.raw`Vraie`,
      String.raw`Fausse`,
      String.raw`Vraie seulement s'il pleut`,
      String.raw`Indéterminée`
    ],
    correctIndex: 0
  },

  // ===== 8. Équivalence =====
  {
    id: 380,
    category: "calcul_propositionnel",
    text: String.raw`$P \Leftrightarrow Q$ est vraie lorsque :`,
    options: [
      String.raw`$P$ et $Q$ ont la même valeur de vérité`,
      String.raw`$P$ et $Q$ ont des valeurs de vérité différentes`,
      String.raw`$P$ est vraie`,
      String.raw`$Q$ est fausse`
    ],
    correctIndex: 0
  },
  {
    id: 381,
    category: "calcul_propositionnel",
    text: String.raw`Si $P$ et $Q$ sont toutes les deux fausses, alors $P \Leftrightarrow Q$ est :`,
    options: [
      String.raw`Fausse`,
      String.raw`Indéfinie`,
      String.raw`Vraie`,
      String.raw`Égale à $\neg P$`
    ],
    correctIndex: 2
  },

  // ===== 9. Traduction symbolique (M = fort en Maths, C = fort en Chimie) =====
  {
    id: 382,
    category: "calcul_propositionnel",
    text: String.raw`Avec $M$ = « Jean est fort en Maths » et $C$ = « Jean est fort en Chimie », « Jean est fort en Maths mais faible en Chimie » s'écrit :`,
    options: [
      String.raw`$M \lor \neg C$`,
      String.raw`$M \land \neg C$`,
      String.raw`$\neg M \land C$`,
      String.raw`$M \Rightarrow C$`
    ],
    correctIndex: 1
  },
  {
    id: 383,
    category: "calcul_propositionnel",
    text: String.raw`Avec les mêmes notations, « Jean n'est fort ni en Maths ni en Chimie » s'écrit :`,
    options: [
      String.raw`$\neg M \lor \neg C$`,
      String.raw`$M \land C$`,
      String.raw`$\neg M \land \neg C$`,
      String.raw`$\neg M \Rightarrow \neg C$`
    ],
    correctIndex: 2
  },

  // ===== 10. Variables et formules =====
  {
    id: 384,
    category: "calcul_propositionnel",
    text: String.raw`Une variable propositionnelle est :`,
    options: [
      String.raw`Un nombre entier`,
      String.raw`Un symbole (en général une lettre majuscule) qui remplace une proposition`,
      String.raw`Un connecteur logique`,
      String.raw`Une table de vérité`
    ],
    correctIndex: 1
  },
  {
    id: 385,
    category: "calcul_propositionnel",
    text: String.raw`Combien de lignes contient la table de vérité d'une formule qui dépend de $3$ variables ?`,
    options: [
      String.raw`$3$`,
      String.raw`$6$`,
      String.raw`$9$`,
      String.raw`$8$`
    ],
    correctIndex: 3
  },
  {
    id: 386,
    category: "calcul_propositionnel",
    text: String.raw`Dans $\neg A \land B \Rightarrow C$, quel connecteur est prioritaire (appliqué en premier) ?`,
    options: [
      String.raw`$\Rightarrow$`,
      String.raw`$\land$`,
      String.raw`$\neg$`,
      String.raw`Aucun, ils ont tous la même priorité`
    ],
    correctIndex: 2
  },
  //==================aaaa============
  // Questions supplémentaires de logique (ids 387 à 436)
// À coller dans ALL_QUESTIONS, après la question id 386.
// Nouvelles catégories : "calcul_predicats", "methode_resolution"
// (les autres questions sont dans "calcul_propositionnel")

  // =====================================================
  // Série 1 : mini-exercices d'application (ids 387 à 406)
  // =====================================================
  {
    id: 387,
    category: "calcul_propositionnel",
    text: String.raw`Soit $M$ (« Jean est fort en Maths ») et $C$ (« Jean est fort en Chimie »). Comment formaliser « Jean est fort en Maths mais faible en Chimie » ?`,
    options: [
      String.raw`$M \lor \neg C$`,
      String.raw`$M \land \neg C$`,
      String.raw`$\neg M \land C$`,
      String.raw`$M \Rightarrow \neg C$`
    ],
    correctIndex: 1
  },
  {
    id: 388,
    category: "calcul_propositionnel",
    text: String.raw`Avec les mêmes variables $M$ et $C$, quelle formule représente « Jean n'est fort ni en Maths ni en Chimie » ?`,
    options: [
      String.raw`$M \lor C$`,
      String.raw`$(\neg M) \land (\neg C)$`,
      String.raw`$\neg M \lor \neg C$`,
      String.raw`$\neg(M \land C)$`
    ],
    correctIndex: 1
  },
  {
    id: 389,
    category: "calcul_propositionnel",
    text: String.raw`Quelle formule traduit « Jean est fort en Maths s'il est fort en Chimie » ?`,
    options: [
      String.raw`$M \land C$`,
      String.raw`$M \lor C$`,
      String.raw`$M \Rightarrow C$`,
      String.raw`$C \Rightarrow M$`
    ],
    correctIndex: 3
  },
  {
    id: 390,
    category: "calcul_propositionnel",
    text: String.raw`Avec $P$ : « il pleut », $F$ : « il fait froid » et $S$ : « je sors », la phrase « S'il pleut ou s'il fait froid je ne sors pas » s'écrit $(P \lor F) \Rightarrow \neg S$. Quelle est sa négation ?`,
    options: [
      String.raw`$(P \lor F) \land S$`,
      String.raw`$(P \lor F) \land \neg S$`,
      String.raw`$\neg P \land \neg F \land S$`,
      String.raw`$(\neg P \land \neg F) \lor S$`
    ],
    correctIndex: 0
  },
  {
    id: 391,
    category: "calcul_propositionnel",
    text: String.raw`Parmi ces formules, laquelle est une tautologie ?`,
    options: [
      String.raw`$(P \lor Q) \Rightarrow (P \land Q)$`,
      String.raw`$P \Rightarrow (P \Rightarrow Q)$`,
      String.raw`$(P \land Q) \Rightarrow P$`,
      String.raw`$P \land \neg P$`
    ],
    correctIndex: 2
  },
  {
    id: 392,
    category: "calcul_propositionnel",
    text: String.raw`La fonction de vérité de $F = P \Rightarrow Q$ est $\Phi_F = \overline{p} + q$. Que vaut $\Phi_F$ si $p = 1$ et $q = 0$ ?`,
    options: [
      String.raw`$1$`,
      String.raw`$0$`,
      String.raw`Indéterminé`,
      String.raw`$-1$`
    ],
    correctIndex: 1
  },
  {
    id: 393,
    category: "calcul_propositionnel",
    text: String.raw`À quelle formule la proposition $P \Rightarrow Q$ est-elle logiquement équivalente ?`,
    options: [
      String.raw`$Q \Rightarrow P$`,
      String.raw`$\neg P \Rightarrow \neg Q$`,
      String.raw`$\neg Q \Rightarrow \neg P$`,
      String.raw`$\neg(P \land Q)$`
    ],
    correctIndex: 2
  },
  {
    id: 394,
    category: "calcul_propositionnel",
    text: String.raw`Soit $N$ (« Un étudiant a de bonnes notes ») et $T$ (« Un étudiant travaille »). Comment formaliser « C'est seulement si un étudiant travaille qu'il a de bonnes notes » ?`,
    options: [
      String.raw`$T \Rightarrow N$`,
      String.raw`$N \Rightarrow T$`,
      String.raw`$N \Leftrightarrow T$`,
      String.raw`$N \land \neg T$`
    ],
    correctIndex: 1
  },
  {
    id: 395,
    category: "calcul_propositionnel",
    text: String.raw`Comment interpréter, avec les règles de priorité, l'expression $\neg A \land B \Rightarrow C$ ?`,
    options: [
      String.raw`$\neg (A \land (B \Rightarrow C))$`,
      String.raw`$((\neg A) \land B) \Rightarrow C$`,
      String.raw`$\neg A \land (B \Rightarrow C)$`,
      String.raw`$\neg (A \land B) \Rightarrow C$`
    ],
    correctIndex: 1
  },
  {
    id: 396,
    category: "calcul_propositionnel",
    text: String.raw`Quelle est la valeur de vérité de « $\pi$ vaut $4$ implique que la somme des angles d'un triangle vaut $182^\circ$ » ?`,
    options: [
      String.raw`Fausse`,
      String.raw`Vraie (la prémisse est fausse)`,
      String.raw`Impossible à déterminer`,
      String.raw`C'est une antilogie`
    ],
    correctIndex: 1
  },
  {
    id: 397,
    category: "calcul_propositionnel",
    text: String.raw`Soit $F = A \land \neg A$. Que vaut sa fonction de vérité $\Phi_F(a)$ ?`,
    options: [
      String.raw`$1$ (tautologie)`,
      String.raw`$0$ (antilogie, car $a \cdot \overline{a} = 0$)`,
      String.raw`$a$`,
      String.raw`$\overline{a}$`
    ],
    correctIndex: 1
  },
  {
    id: 398,
    category: "calcul_propositionnel",
    text: String.raw`D'après le théorème de la validité, $\{G_1\} \models G_2 \Rightarrow H$ est équivalent à :`,
    options: [
      String.raw`$\{G_1, G_2\} \models H$`,
      String.raw`$\{H\} \models G_1 \land G_2$`,
      String.raw`$\models G_1 \land H$`,
      String.raw`$\{G_1, H\} \models G_2$`
    ],
    correctIndex: 0
  },
  {
    id: 399,
    category: "calcul_propositionnel",
    text: String.raw`Comment se nomme la règle d'inférence qui permet de déduire $Q$ à partir de $\{P, P \Rightarrow Q\}$ ?`,
    options: [
      String.raw`La contraposée`,
      String.raw`Le modus ponens`,
      String.raw`Le modus tollens`,
      String.raw`La disjonction des cas`
    ],
    correctIndex: 1
  },
  {
    id: 400,
    category: "calcul_propositionnel",
    text: String.raw`La formule $(P \lor \neg Q) \land (\neg P \lor Q)$ est équivalente à :`,
    options: [
      String.raw`Une contradiction`,
      String.raw`$P \Leftrightarrow Q$`,
      String.raw`$P \lor Q$`,
      String.raw`$P \Rightarrow Q$`
    ],
    correctIndex: 1
  },
  {
    id: 401,
    category: "calcul_propositionnel",
    text: String.raw`Combien de lignes possède la table de vérité d'une formule dépendant de $4$ variables $P, Q, R, S$ ?`,
    options: [
      String.raw`$8$`,
      String.raw`$16$`,
      String.raw`$32$`,
      String.raw`$64$`
    ],
    correctIndex: 1
  },
  {
    id: 402,
    category: "calcul_predicats",
    text: String.raw`En logique des prédicats, comment formaliser « Personne n'est parfait » (avec $p(x)$ : « $x$ est parfait ») ?`,
    options: [
      String.raw`$\exists x \,.\, p(x)$`,
      String.raw`$\neg \exists x \,.\, p(x)$`,
      String.raw`$\forall x \,.\, p(x)$`,
      String.raw`$\exists x \,.\, \neg p(x)$`
    ],
    correctIndex: 1
  },
  {
    id: 403,
    category: "calcul_predicats",
    text: String.raw`Quelle est la négation de $\forall x \,.\, (p(x) \Rightarrow q(x))$ ?`,
    options: [
      String.raw`$\forall x \,.\, (p(x) \land \neg q(x))$`,
      String.raw`$\exists x \,.\, (p(x) \land \neg q(x))$`,
      String.raw`$\exists x \,.\, (\neg p(x) \lor q(x))$`,
      String.raw`$\forall x \,.\, (\neg p(x) \Rightarrow \neg q(x))$`
    ],
    correctIndex: 1
  },
  {
    id: 404,
    category: "methode_resolution",
    text: String.raw`Lors de la skolémisation, un quantificateur $\exists y$ précédé d'un seul quantificateur $\forall x$ est :`,
    options: [
      String.raw`Supprimé et $y$ est remplacé par une constante $c$`,
      String.raw`Supprimé et $y$ est remplacé par un terme $f(x)$`,
      String.raw`Transformé en $\forall y$`,
      String.raw`Laissé inchangé`
    ],
    correctIndex: 1
  },
  {
    id: 405,
    category: "methode_resolution",
    text: String.raw`Dans la méthode de résolution, avec $C_1 = a \lor b$ et $C_2 = \neg a \lor c$, quelle est la résolvante $Res(C_1, C_2)$ ?`,
    options: [
      String.raw`$a \lor c$`,
      String.raw`$b \lor c$`,
      String.raw`$a \lor \neg a$`,
      String.raw`La clause vide $\square$`
    ],
    correctIndex: 1
  },
  {
    id: 406,
    category: "methode_resolution",
    text: String.raw`Que signifie l'obtention de la clause vide $\square$ lors de la résolution d'un ensemble de clauses ?`,
    options: [
      String.raw`L'ensemble est une tautologie`,
      String.raw`L'ensemble de clauses est contradictoire`,
      String.raw`Il y a une erreur dans les unifications`,
      String.raw`Les variables n'ont pas de solution dans l'univers du discours`
    ],
    correctIndex: 1
  },

  // =====================================================
  // Série 2 : questions de cours très faciles (ids 407 à 436)
  // =====================================================
  {
    id: 407,
    category: "calcul_propositionnel",
    text: String.raw`Qu'est-ce qu'une proposition en logique ?`,
    options: [
      String.raw`Une phrase interrogative sans réponse`,
      String.raw`Un énoncé auquel on peut attribuer une valeur de vérité (vrai ou faux)`,
      String.raw`Une suite de chiffres aléatoires`,
      String.raw`Une commande informatique`
    ],
    correctIndex: 1
  },
  {
    id: 408,
    category: "calcul_propositionnel",
    text: String.raw`Que stipule le principe de non-contradiction ?`,
    options: [
      String.raw`Une proposition est toujours vraie`,
      String.raw`Une proposition change de valeur selon le temps`,
      String.raw`Une proposition ne peut pas être simultanément vraie et fausse`,
      String.raw`Il existe une infinité de valeurs de vérité`
    ],
    correctIndex: 2
  },
  {
    id: 409,
    category: "calcul_propositionnel",
    text: String.raw`Que stipule le principe du tiers-exclu ?`,
    options: [
      String.raw`Une proposition est soit vraie, soit fausse, sans autre possibilité`,
      String.raw`Une proposition est toujours vraie à un tiers`,
      String.raw`Les propositions fausses sont exclues du calcul`,
      String.raw`Deux propositions ne peuvent jamais être égales`
    ],
    correctIndex: 0
  },
  {
    id: 410,
    category: "calcul_propositionnel",
    text: String.raw`Dans la disjonction $P \lor Q$, quand la proposition est-elle fausse ?`,
    options: [
      String.raw`Lorsque $P$ est vraie et $Q$ est fausse`,
      String.raw`Lorsque les deux propositions sont vraies`,
      String.raw`Lorsque $P$ et $Q$ sont toutes les deux fausses`,
      String.raw`Lorsque $P$ est fausse et $Q$ est vraie`
    ],
    correctIndex: 2
  },
  {
    id: 411,
    category: "calcul_propositionnel",
    text: String.raw`Dans la conjonction $P \land Q$, quand la proposition est-elle vraie ?`,
    options: [
      String.raw`Si et seulement si $P$ et $Q$ sont toutes les deux vraies`,
      String.raw`Si l'une des deux propositions est vraie`,
      String.raw`Si les deux propositions sont fausses`,
      String.raw`Jamais`
    ],
    correctIndex: 0
  },
  {
    id: 412,
    category: "calcul_propositionnel",
    text: String.raw`Quelle est la valeur de $\neg P$ si $P$ est fausse ?`,
    options: [
      String.raw`Fausse`,
      String.raw`Vraie`,
      String.raw`Neutre`,
      String.raw`Indéterminée`
    ],
    correctIndex: 1
  },
  {
    id: 413,
    category: "calcul_propositionnel",
    text: String.raw`Dans l'implication $P \Rightarrow Q$, si la prémisse $P$ est fausse, que peut-on dire de l'implication ?`,
    options: [
      String.raw`Elle est nécessairement fausse`,
      String.raw`Elle est vraie, quelle que soit la valeur de $Q$`,
      String.raw`Elle dépend uniquement de $Q$`,
      String.raw`Elle n'a pas de sens`
    ],
    correctIndex: 1
  },
  {
    id: 414,
    category: "calcul_propositionnel",
    text: String.raw`Dans l'équivalence $P \Leftrightarrow Q$, quand l'équivalence est-elle vraie ?`,
    options: [
      String.raw`Uniquement lorsque les deux propositions sont vraies`,
      String.raw`Uniquement lorsque les deux propositions sont fausses`,
      String.raw`Lorsque $P$ et $Q$ ont la même valeur de vérité`,
      String.raw`Lorsque $P$ est vraie et $Q$ est fausse`
    ],
    correctIndex: 2
  },
  {
    id: 415,
    category: "calcul_propositionnel",
    text: String.raw`Qu'est-ce qu'une variable propositionnelle ?`,
    options: [
      String.raw`Un nombre entier variable`,
      String.raw`Un symbole (souvent une lettre majuscule) qui peut représenter n'importe quelle proposition`,
      String.raw`Un connecteur logique complexe`,
      String.raw`Une table de vérité infinie`
    ],
    correctIndex: 1
  },
  {
    id: 416,
    category: "calcul_propositionnel",
    text: String.raw`Une formule propositionnelle comme $A \Rightarrow B$ possède-t-elle une valeur de vérité fixe ?`,
    options: [
      String.raw`Oui, elle est toujours vraie`,
      String.raw`Oui, elle est toujours fausse`,
      String.raw`Non, en général sa valeur dépend des valeurs des variables`,
      String.raw`Oui, elle dépend du système décimal`
    ],
    correctIndex: 2
  },
  {
    id: 417,
    category: "calcul_propositionnel",
    text: String.raw`Quel connecteur est prioritaire d'après les règles de priorité ?`,
    options: [
      String.raw`L'implication $\Rightarrow$`,
      String.raw`La conjonction $\land$`,
      String.raw`La négation $\neg$`,
      String.raw`L'équivalence $\Leftrightarrow$`
    ],
    correctIndex: 2
  },
  {
    id: 418,
    category: "calcul_propositionnel",
    text: String.raw`Les opérateurs $\lor$ et $\land$ sont-ils associatifs ?`,
    options: [
      String.raw`Oui`,
      String.raw`Non, jamais`,
      String.raw`Seulement pour les variables négatives`,
      String.raw`Uniquement si le nombre de variables est pair`
    ],
    correctIndex: 0
  },
  {
    id: 419,
    category: "calcul_propositionnel",
    text: String.raw`L'implication $\Rightarrow$ est-elle associative ?`,
    options: [
      String.raw`Oui, $A \Rightarrow (B \Rightarrow C)$ est égal à $(A \Rightarrow B) \Rightarrow C$`,
      String.raw`Non, les parenthèses sont obligatoires`,
      String.raw`Oui, si $A$ est vraie`,
      String.raw`Seulement dans le calcul des prédicats`
    ],
    correctIndex: 1
  },
  {
    id: 420,
    category: "calcul_propositionnel",
    text: String.raw`Combien de lignes comporte la table de vérité d'une formule qui dépend de $n$ variables ?`,
    options: [
      String.raw`$n$ lignes`,
      String.raw`$2n$ lignes`,
      String.raw`$2^n$ lignes`,
      String.raw`$n^2$ lignes`
    ],
    correctIndex: 2
  },
  {
    id: 421,
    category: "calcul_propositionnel",
    text: String.raw`Comment appelle-t-on une formule propositionnelle toujours vraie, quelles que soient les valeurs de ses variables ?`,
    options: [
      String.raw`Une antilogie`,
      String.raw`Une tautologie`,
      String.raw`Une contradiction`,
      String.raw`Une variable libre`
    ],
    correctIndex: 1
  },
  {
    id: 422,
    category: "calcul_propositionnel",
    text: String.raw`Qu'est-ce qu'une antilogie ?`,
    options: [
      String.raw`Une formule toujours vraie`,
      String.raw`Une formule dont la fonction de vérité est la fonction nulle (toujours fausse)`,
      String.raw`Une formule sans connecteur`,
      String.raw`Une formule équivalente à une tautologie`
    ],
    correctIndex: 1
  },
  {
    id: 423,
    category: "calcul_propositionnel",
    text: String.raw`Quand dit-on qu'une formule $A$ est une conséquence logique de $\{F_1, \ldots, F_n\}$ ?`,
    options: [
      String.raw`Si $A$ est toujours fausse quand les $F_i$ sont vraies`,
      String.raw`Chaque fois que tous les $F_i$ sont vrais simultanément, $A$ est vraie aussi`,
      String.raw`Si $A$ possède plus de variables que les $F_i$`,
      String.raw`Si $A$ est un axiome`
    ],
    correctIndex: 1
  },
  {
    id: 424,
    category: "calcul_propositionnel",
    text: String.raw`Que signifie la notation $\{F_1, F_2\} \models A$ ?`,
    options: [
      String.raw`$A$ implique $F_1$ et $F_2$`,
      String.raw`$A$ est une conséquence logique de $\{F_1, F_2\}$`,
      String.raw`$A$ est une tautologie indépendante de $F_1$ et $F_2$`,
      String.raw`$F_1$ et $F_2$ sont des antilogies`
    ],
    correctIndex: 1
  },
  {
    id: 425,
    category: "calcul_propositionnel",
    text: String.raw`Quand deux formules $F$ et $G$ sont-elles dites équivalentes ($F \approx G$) ?`,
    options: [
      String.raw`Si $F$ est une tautologie et $G$ une antilogie`,
      String.raw`Si $G$ est conséquence logique de $F$ et $F$ est conséquence logique de $G$`,
      String.raw`Si elles ont le même nombre de variables`,
      String.raw`Si leur conjonction est une tautologie`
    ],
    correctIndex: 1
  },
  {
    id: 426,
    category: "calcul_propositionnel",
    text: String.raw`Que dit le théorème de substitution ?`,
    options: [
      String.raw`On peut remplacer n'importe quelle variable par un nombre`,
      String.raw`Si $F$ est une tautologie, toute formule $F^*$ obtenue en remplaçant ses variables par des formules est aussi une tautologie`,
      String.raw`On ne peut jamais remplacer une variable par une formule`,
      String.raw`La réciproque du théorème est toujours vraie`
    ],
    correctIndex: 1
  },
  {
    id: 427,
    category: "calcul_propositionnel",
    text: String.raw`Que permet le théorème de la validité ?`,
    options: [
      String.raw`Supprimer tous les connecteurs logiques`,
      String.raw`Transformer $\{G_1, \ldots, G_{n-1}\} \models G_n \Rightarrow H$ en $\{G_1, \ldots, G_n\} \models H$ (et réciproquement)`,
      String.raw`Calculer directement le nombre de lignes d'une table de vérité`,
      String.raw`Prouver qu'une formule est une antilogie`
    ],
    correctIndex: 1
  },
  {
    id: 428,
    category: "calcul_propositionnel",
    text: String.raw`Pourquoi la méthode des tables de vérité montre-t-elle ses limites pour de grands systèmes ?`,
    options: [
      String.raw`Parce qu'elle utilise trop de lettres minuscules`,
      String.raw`Parce que le nombre de lignes $2^n$ croît de façon exponentielle avec le nombre de variables`,
      String.raw`Parce qu'elle ne fonctionne qu'avec un seul connecteur`,
      String.raw`Parce qu'elle interdit les parenthèses`
    ],
    correctIndex: 1
  },
  {
    id: 429,
    category: "calcul_propositionnel",
    text: String.raw`Le calcul propositionnel s'intéresse uniquement :`,
    options: [
      String.raw`À la grammaire et à l'orthographe des phrases`,
      String.raw`Aux valeurs de vérité et à la structure des phrases (connecteurs), sans tenir compte du sens`,
      String.raw`À la traduction du français en anglais`,
      String.raw`À la longueur des phrases`
    ],
    correctIndex: 1
  },
  {
    id: 430,
    category: "calcul_propositionnel",
    text: String.raw`Quelle est la contraposée de l'implication $P \Rightarrow Q$ ?`,
    options: [
      String.raw`$Q \Rightarrow P$`,
      String.raw`$\neg P \Rightarrow \neg Q$`,
      String.raw`$\neg Q \Rightarrow \neg P$`,
      String.raw`$P \Leftrightarrow Q$`
    ],
    correctIndex: 2
  },
  {
    id: 431,
    category: "calcul_propositionnel",
    text: String.raw`Comment appelle-t-on le connecteur « ou » ($\lor$) ?`,
    options: [
      String.raw`La conjonction`,
      String.raw`La disjonction logique`,
      String.raw`L'implication`,
      String.raw`La négation`
    ],
    correctIndex: 1
  },
  {
    id: 432,
    category: "calcul_propositionnel",
    text: String.raw`Comment appelle-t-on le connecteur « et » ($\land$) ?`,
    options: [
      String.raw`La conjonction logique`,
      String.raw`La disjonction`,
      String.raw`L'équivalence`,
      String.raw`L'antilogie`
    ],
    correctIndex: 0
  },
  {
    id: 433,
    category: "calcul_propositionnel",
    text: String.raw`Dans quel cas précis l'implication $P \Rightarrow Q$ est-elle fausse ?`,
    options: [
      String.raw`Quand $P$ est fausse et $Q$ est fausse`,
      String.raw`Quand $P$ est vraie et $Q$ est vraie`,
      String.raw`Quand $P$ est fausse et $Q$ est vraie`,
      String.raw`Quand $P$ est vraie et $Q$ est fausse`
    ],
    correctIndex: 3
  },
  {
    id: 434,
    category: "calcul_propositionnel",
    text: String.raw`Si une formule $F$ est une tautologie, comment le note-t-on ?`,
    options: [
      String.raw`$F \models$`,
      String.raw`$\models F$`,
      String.raw`$\vdash \vdash F$`,
      String.raw`$\approx F$`
    ],
    correctIndex: 1
  },
  {
    id: 435,
    category: "calcul_propositionnel",
    text: String.raw`Qu'associe-t-on à chaque variable propositionnelle pour obtenir une fonction de vérité ?`,
    options: [
      String.raw`Un nombre réel`,
      String.raw`Une variable booléenne ($0$ ou $1$, F ou V)`,
      String.raw`Un vecteur géométrique`,
      String.raw`Une constante de Skolem`
    ],
    correctIndex: 1
  },
  {
    id: 436,
    category: "calcul_propositionnel",
    text: String.raw`Quelle méthode, sans valeurs de vérité, le cours annonce-t-il pour aborder des problèmes plus complexes ?`,
    options: [
      String.raw`La méthode de comptage des mots`,
      String.raw`La théorie de la démonstration (déductions syntaxiques et règles formelles)`,
      String.raw`L'analyse graphique par histogramme`,
      String.raw`La traduction directe en code machine`
    ],
    correctIndex: 1
  },
//=========aaaa=======

// Questions "Calcul propositionnel" — pages 96 à 104 (ids 437 à 466)
// À coller dans ALL_QUESTIONS, après la question id 436.
// Catégories : "calcul_propositionnel" et "deduction_syntaxique" (nouvelle)

  // ===== Fonctions de vérité =====
  {
    id: 437,
    category: "calcul_propositionnel",
    text: String.raw`Si $F = \neg G$, quelle est la fonction de vérité de $F$ ?`,
    options: [
      String.raw`$\Phi_G$`,
      String.raw`$\overline{\Phi_G}$`,
      String.raw`$-\Phi_G$`,
      String.raw`$1 + \Phi_G$`
    ],
    correctIndex: 1
  },
  {
    id: 438,
    category: "calcul_propositionnel",
    text: String.raw`Si $F = G \lor H$, quelle est la fonction de vérité de $F$ ?`,
    options: [
      String.raw`$\Phi_G \cdot \Phi_H$`,
      String.raw`$\Phi_G + \Phi_H$`,
      String.raw`$\overline{\Phi_G} + \Phi_H$`,
      String.raw`$\overline{\Phi_G + \Phi_H}$`
    ],
    correctIndex: 1
  },
  {
    id: 439,
    category: "calcul_propositionnel",
    text: String.raw`Si $F = G \land H$, quelle est la fonction de vérité de $F$ ?`,
    options: [
      String.raw`$\Phi_G + \Phi_H$`,
      String.raw`$\overline{\Phi_G} \cdot \Phi_H$`,
      String.raw`$\Phi_G \cdot \Phi_H$`,
      String.raw`$\overline{\Phi_G \cdot \Phi_H}$`
    ],
    correctIndex: 2
  },
  {
    id: 440,
    category: "calcul_propositionnel",
    text: String.raw`Si $F = G \Rightarrow H$, quelle est la fonction de vérité de $F$ ?`,
    options: [
      String.raw`$\Phi_G + \overline{\Phi_H}$`,
      String.raw`$\overline{\Phi_G} + \Phi_H$`,
      String.raw`$\Phi_G \cdot \overline{\Phi_H}$`,
      String.raw`$\overline{\Phi_G} \cdot \Phi_H$`
    ],
    correctIndex: 1
  },
  {
    id: 441,
    category: "calcul_propositionnel",
    text: String.raw`En algèbre de Boole, la conjonction logique $\land$ correspond à :`,
    options: [
      String.raw`La somme booléenne`,
      String.raw`Le produit booléen`,
      String.raw`La négation booléenne`,
      String.raw`L'équivalence`
    ],
    correctIndex: 1
  },

  // ===== Tautologies =====
  {
    id: 442,
    category: "calcul_propositionnel",
    text: String.raw`Une tautologie est une formule dont la fonction de vérité est :`,
    options: [
      String.raw`La fonction nulle`,
      String.raw`La fonction constante égale à $1$`,
      String.raw`Égale à l'une de ses variables`,
      String.raw`Égale à sa propre négation`
    ],
    correctIndex: 1
  },
  {
    id: 443,
    category: "calcul_propositionnel",
    text: String.raw`Pour $F = A \Rightarrow A$, on a $\Phi_F(a) = \overline{a} + a$. Que vaut $\overline{a} + a$ ?`,
    options: [
      String.raw`$0$`,
      String.raw`$1$`,
      String.raw`$a$`,
      String.raw`$\overline{a}$`
    ],
    correctIndex: 1
  },
  {
    id: 444,
    category: "calcul_propositionnel",
    text: String.raw`La formule $(P \lor Q) \Rightarrow (P \land Q)$ est-elle une tautologie ?`,
    options: [
      String.raw`Oui`,
      String.raw`Non : pour $P$ vraie et $Q$ fausse, elle est fausse`,
      String.raw`Oui, car $P \lor Q$ est toujours vraie`,
      String.raw`Non, car c'est une antilogie`
    ],
    correctIndex: 1
  },
  {
    id: 445,
    category: "calcul_propositionnel",
    text: String.raw`La formule $P \Rightarrow (P \lor Q)$ est-elle une tautologie ?`,
    options: [
      String.raw`Non`,
      String.raw`Seulement si $Q$ est vraie`,
      String.raw`Oui`,
      String.raw`Seulement si $P$ est fausse`
    ],
    correctIndex: 2
  },
  {
    id: 446,
    category: "calcul_propositionnel",
    text: String.raw`La formule $P \Rightarrow (P \Rightarrow Q)$ est-elle une tautologie ?`,
    options: [
      String.raw`Oui`,
      String.raw`Non : pour $P$ vraie et $Q$ fausse, elle est fausse`,
      String.raw`Oui, car $P \Rightarrow Q$ est toujours vraie`,
      String.raw`Non, car elle n'a pas de table de vérité`
    ],
    correctIndex: 1
  },

  // ===== Antilogies =====
  {
    id: 447,
    category: "calcul_propositionnel",
    text: String.raw`Une antilogie est une formule dont la fonction de vérité est :`,
    options: [
      String.raw`La fonction constante égale à $1$`,
      String.raw`La fonction nulle`,
      String.raw`Égale à $a$`,
      String.raw`Égale à $\overline{a}$`
    ],
    correctIndex: 1
  },
  {
    id: 448,
    category: "calcul_propositionnel",
    text: String.raw`La formule $A \land \neg A$ a pour fonction de vérité $a \cdot \overline{a} = 0$. C'est donc :`,
    options: [
      String.raw`Une tautologie`,
      String.raw`Une antilogie`,
      String.raw`Ni une tautologie ni une antilogie`,
      String.raw`Une variable propositionnelle`
    ],
    correctIndex: 1
  },
  {
    id: 449,
    category: "calcul_propositionnel",
    text: String.raw`Si l'on remplace les variables d'une antilogie par des propositions, la proposition obtenue :`,
    options: [
      String.raw`Est toujours vraie`,
      String.raw`Est vraie une fois sur deux`,
      String.raw`Ne peut jamais être vraie`,
      String.raw`Est une tautologie`
    ],
    correctIndex: 2
  },

  // ===== Conséquences logiques =====
  {
    id: 450,
    category: "calcul_propositionnel",
    text: String.raw`Pour montrer $\{P, P \Rightarrow Q\} \models Q$, on remarque que $P$ et $P \Rightarrow Q$ sont simultanément vraies uniquement lorsque :`,
    options: [
      String.raw`$p = 0$ et $q = 0$`,
      String.raw`$p = 0$ et $q = 1$`,
      String.raw`$p = 1$ et $q = 0$`,
      String.raw`$p = 1$ et $q = 1$`
    ],
    correctIndex: 3
  },
  {
    id: 451,
    category: "calcul_propositionnel",
    text: String.raw`A-t-on $\{P \land Q\} \models P$ ?`,
    options: [
      String.raw`Oui : si $P \land Q$ est vraie, alors $P$ est vraie`,
      String.raw`Non : $P$ peut être fausse quand $P \land Q$ est vraie`,
      String.raw`Seulement si $Q$ est fausse`,
      String.raw`On ne peut pas savoir`
    ],
    correctIndex: 0
  },

  // ===== Équivalences =====
  {
    id: 452,
    category: "calcul_propositionnel",
    text: String.raw`On peut remplacer $\neg\neg A$ par $A$ dans une formule car :`,
    options: [
      String.raw`Ces deux formules sont équivalentes`,
      String.raw`$A$ est toujours vraie`,
      String.raw`$\neg\neg A$ est une antilogie`,
      String.raw`Les parenthèses sont facultatives`
    ],
    correctIndex: 0
  },
  {
    id: 453,
    category: "calcul_propositionnel",
    text: String.raw`Laquelle de ces formules est équivalente à $P \lor Q$ ?`,
    options: [
      String.raw`$\neg(\neg P \lor \neg Q)$`,
      String.raw`$\neg P \land \neg Q$`,
      String.raw`$\neg(\neg P \land \neg Q)$`,
      String.raw`$\neg P \lor \neg Q$`
    ],
    correctIndex: 2
  },
  {
    id: 454,
    category: "calcul_propositionnel",
    text: String.raw`Laquelle de ces formules est équivalente à $P \Rightarrow (Q \land R)$ ?`,
    options: [
      String.raw`$(P \Rightarrow Q) \lor (P \Rightarrow R)$`,
      String.raw`$(P \Rightarrow Q) \Rightarrow R$`,
      String.raw`$(P \land Q) \Rightarrow R$`,
      String.raw`$(P \Rightarrow Q) \land (P \Rightarrow R)$`
    ],
    correctIndex: 3
  },
  {
    id: 455,
    category: "calcul_propositionnel",
    text: String.raw`Les formules $P \Rightarrow Q$ et $(\neg P) \Rightarrow (\neg Q)$ sont-elles équivalentes ?`,
    options: [
      String.raw`Oui`,
      String.raw`Non : pour $P$ fausse et $Q$ vraie, la première est vraie et la seconde fausse`,
      String.raw`Oui, c'est la contraposée`,
      String.raw`Seulement si $P$ est vraie`
    ],
    correctIndex: 1
  },

  // ===== Substitution =====
  {
    id: 456,
    category: "calcul_propositionnel",
    text: String.raw`D'après le théorème de substitution, si $\models F$ alors $\models F^*$. La réciproque est-elle vraie en général ?`,
    options: [
      String.raw`Oui, toujours`,
      String.raw`Non, pas en général`,
      String.raw`Seulement pour deux variables`,
      String.raw`Oui, si $F^*$ contient plus de variables`
    ],
    correctIndex: 1
  },
  {
    id: 457,
    category: "calcul_propositionnel",
    text: String.raw`On obtient $F^* = (P \land \neg P) \Rightarrow Q$ à partir de $F = A \Rightarrow B$ en remplaçant $A$ par $P \land \neg P$ et $B$ par $Q$. $F^*$ est :`,
    options: [
      String.raw`Une antilogie`,
      String.raw`Ni une tautologie ni une antilogie`,
      String.raw`Une variable propositionnelle`,
      String.raw`Une tautologie (la prémisse est toujours fausse)`
    ],
    correctIndex: 3
  },
  {
    id: 458,
    category: "calcul_propositionnel",
    text: String.raw`Une formule contient $5$ variables propositionnelles. Combien de lignes a sa table de vérité ?`,
    options: [
      String.raw`$10$ lignes`,
      String.raw`$25$ lignes`,
      String.raw`$32$ lignes`,
      String.raw`$64$ lignes`
    ],
    correctIndex: 2
  },
  {
    id: 459,
    category: "calcul_propositionnel",
    text: String.raw`Si une partie d'une formule est, à elle seule, une tautologie, la partie correspondante de la fonction de vérité peut être remplacée par :`,
    options: [
      String.raw`$0$`,
      String.raw`$1$`,
      String.raw`$a$`,
      String.raw`$\overline{a}$`
    ],
    correctIndex: 1
  },

  // ===== Théorème de la validité =====
  {
    id: 460,
    category: "calcul_propositionnel",
    text: String.raw`Si $A \Rightarrow (B \Rightarrow C)$, $A \Rightarrow B$ et $A$ sont toutes vraies, alors :`,
    options: [
      String.raw`$C$ est fausse`,
      String.raw`$C$ est vraie`,
      String.raw`$B$ est fausse`,
      String.raw`On ne peut rien dire de $C$`
    ],
    correctIndex: 1
  },

  // ===== Conclusion du chapitre 11 =====
  {
    id: 461,
    category: "calcul_propositionnel",
    text: String.raw`Combien de lignes comporte la table de vérité d'une formule à $10$ variables ?`,
    options: [
      String.raw`$100$`,
      String.raw`$20$`,
      String.raw`$1024$`,
      String.raw`$512$`
    ],
    correctIndex: 2
  },
  {
    id: 462,
    category: "calcul_propositionnel",
    text: String.raw`Selon la conclusion du chapitre, les « raccourcis » de calcul des fonctions de vérité sont surtout utiles :`,
    options: [
      String.raw`Quand on opère « à la main »`,
      String.raw`Pour programmer des algorithmes de logique`,
      String.raw`Uniquement sur les machines 32 bits`,
      String.raw`Jamais`
    ],
    correctIndex: 0
  },

  // ===== Chapitre 12 : théorie de la démonstration =====
  {
    id: 463,
    category: "deduction_syntaxique",
    text: String.raw`Un axiome logique est :`,
    options: [
      String.raw`Une antilogie`,
      String.raw`Une tautologie qui sert de « point de départ » aux déductions`,
      String.raw`Une formule fausse`,
      String.raw`Une table de vérité`
    ],
    correctIndex: 1
  },
  {
    id: 464,
    category: "deduction_syntaxique",
    text: String.raw`Une règle d'inférence est une règle qui :`,
    options: [
      String.raw`À partir de formules prémisses, produit une formule conclusion`,
      String.raw`Calcule la table de vérité d'une formule`,
      String.raw`Supprime les parenthèses d'une formule`,
      String.raw`Remplace une formule par sa négation`
    ],
    correctIndex: 0
  },
  {
    id: 465,
    category: "deduction_syntaxique",
    text: String.raw`Quelle notation signifie « $F$ est un théorème » ?`,
    options: [
      String.raw`$\models F$`,
      String.raw`$\vdash F$`,
      String.raw`$F \approx$`,
      String.raw`$\neg F$`
    ],
    correctIndex: 1
  },
  {
    id: 466,
    category: "deduction_syntaxique",
    text: String.raw`Comment appelle-t-on la chaîne de déductions qui conduit à un théorème logique ?`,
    options: [
      String.raw`Une tautologie`,
      String.raw`Une antilogie`,
      String.raw`Une démonstration`,
      String.raw`Une table de vérité`
    ],
    correctIndex: 2
  }




];