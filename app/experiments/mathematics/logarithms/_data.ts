export const logarithmRules = [
  {
    title: "Logarithm of one and of the base",
    formula: String.raw`{}^{a}\!\log 1=0,\qquad {}^{a}\!\log a=1`,
    explanation:
      "Ask which exponent produces one, then which produces the base itself.",
    steps: [
      String.raw`a^0=1\quad\Longrightarrow\quad {}^{a}\!\log 1=0`,
      String.raw`a^1=a\quad\Longrightarrow\quad {}^{a}\!\log a=1`,
    ],
    example: String.raw`{}^{7}\!\log 1=0,\qquad {}^{7}\!\log 7=1`,
  },
  {
    title: "Inverse identities",
    formula: String.raw`{}^{a}\!\log(a^t)=t,\qquad a^{{}^{a}\!\log x}=x`,
    explanation:
      "Exponentiation and logarithms undo each other when the bases match. The exponent can be any real number.",
    steps: [
      String.raw`a^t=x\quad\Longleftrightarrow\quad {}^{a}\!\log x=t`,
      String.raw`{}^{a}\!\log(a^t)=t`,
      String.raw`a^{{}^{a}\!\log x}=a^t=x`,
    ],
    example: String.raw`{}^{2}\!\log(2^{-3})=-3,\qquad 2^{{}^{2}\!\log 5}=5`,
  },
  {
    title: "Product rule",
    formula: String.raw`{}^{a}\!\log(xy)={}^{a}\!\log x+{}^{a}\!\log y`,
    explanation:
      "Multiplying powers with the same base adds their exponents. Here both factors must be positive.",
    steps: [
      String.raw`u={}^{a}\!\log x,\quad v={}^{a}\!\log y`,
      String.raw`x=a^u,\quad y=a^v`,
      String.raw`xy=a^u a^v=a^{u+v}`,
      String.raw`{}^{a}\!\log(xy)=u+v`,
    ],
    example: String.raw`{}^{2}\!\log(4\cdot8)=2+3=5`,
  },
  {
    title: "Quotient rule",
    formula: String.raw`{}^{a}\!\log\frac{x}{y}={}^{a}\!\log x-{}^{a}\!\log y`,
    explanation:
      "Dividing powers with the same base subtracts their exponents. Both numerator and denominator must be positive.",
    steps: [
      String.raw`u={}^{a}\!\log x,\quad v={}^{a}\!\log y`,
      String.raw`\frac{x}{y}=\frac{a^u}{a^v}=a^{u-v}`,
      String.raw`{}^{a}\!\log\frac{x}{y}=u-v`,
    ],
    example: String.raw`{}^{3}\!\log\frac{81}{3}=4-1=3`,
  },
  {
    title: "Power rule",
    formula: String.raw`{}^{a}\!\log(x^r)=r\,{}^{a}\!\log x`,
    explanation:
      "Raising a power to another power multiplies the exponents. This holds for any real exponent when the argument is positive.",
    steps: [
      String.raw`u={}^{a}\!\log x\quad\Longrightarrow\quad x=a^u`,
      String.raw`x^r=(a^u)^r=a^{ur}`,
      String.raw`{}^{a}\!\log(x^r)=ur=r\,{}^{a}\!\log x`,
    ],
    example: String.raw`{}^{2}\!\log(8^2)=2\cdot3=6`,
  },
  {
    title: "Root rule",
    formula: String.raw`{}^{a}\!\log\sqrt[n]{x}=\frac{1}{n}\,{}^{a}\!\log x`,
    explanation:
      "A root is a fractional power, so this follows directly from the power rule. The root index is a positive integer.",
    steps: [
      String.raw`\sqrt[n]{x}=x^{1/n}`,
      String.raw`{}^{a}\!\log\sqrt[n]{x}={}^{a}\!\log(x^{1/n})`,
      String.raw`{}^{a}\!\log(x^{1/n})=\frac{1}{n}\,{}^{a}\!\log x`,
    ],
    example: String.raw`{}^{2}\!\log\sqrt{16}=\frac12\cdot4=2`,
  },
  {
    title: "Reciprocal argument",
    formula: String.raw`{}^{a}\!\log\frac1x=-{}^{a}\!\log x`,
    explanation:
      "Taking the reciprocal changes the sign of the exponent. This is the power rule with exponent negative one.",
    steps: [
      String.raw`\frac1x=x^{-1}`,
      String.raw`{}^{a}\!\log(x^{-1})=-{}^{a}\!\log x`,
    ],
    example: String.raw`{}^{2}\!\log\frac18=-3`,
  },
  {
    title: "Change of base",
    formula: String.raw`{}^{a}\!\log x=\frac{{}^{b}\!\log x}{{}^{b}\!\log a}`,
    explanation:
      "Use any valid new base. The denominator is nonzero because the original base is not one. This is how a calculator evaluates other bases with natural logarithms.",
    steps: [
      String.raw`t={}^{a}\!\log x\quad\Longrightarrow\quad a^t=x`,
      String.raw`{}^{b}\!\log(a^t)={}^{b}\!\log x`,
      String.raw`t\,{}^{b}\!\log a={}^{b}\!\log x`,
      String.raw`t=\frac{{}^{b}\!\log x}{{}^{b}\!\log a}`,
    ],
    example: String.raw`{}^{2}\!\log 8=\frac{\ln 8}{\ln 2}=3`,
  },
  {
    title: "Reciprocal bases",
    formula: String.raw`{}^{a}\!\log b=\frac{1}{{}^{b}\!\log a}`,
    explanation:
      "Swapping a valid base and a valid argument gives the reciprocal. Both numbers must be positive and different from one.",
    steps: [
      String.raw`{}^{a}\!\log b=\frac{{}^{b}\!\log b}{{}^{b}\!\log a}`,
      String.raw`{}^{b}\!\log b=1`,
      String.raw`{}^{a}\!\log b=\frac{1}{{}^{b}\!\log a}`,
    ],
    example: String.raw`{}^{2}\!\log 8=3,\qquad {}^{8}\!\log 2=\frac13`,
  },
  {
    title: "Chain rule for bases",
    formula: String.raw`({}^{a}\!\log b)({}^{b}\!\log c)={}^{a}\!\log c`,
    explanation:
      "An intermediate base cancels through change of base. The intermediate number must be a valid base; the final argument only needs to be positive.",
    steps: [
      String.raw`{}^{b}\!\log c=\frac{{}^{a}\!\log c}{{}^{a}\!\log b}`,
      String.raw`({}^{a}\!\log b)\frac{{}^{a}\!\log c}{{}^{a}\!\log b}={}^{a}\!\log c`,
    ],
    example: String.raw`({}^{2}\!\log 8)({}^{8}\!\log 64)=3\cdot2=6`,
  },
  {
    title: "Powers in the base and argument",
    formula: String.raw`{}^{a^p}\!\log(x^q)=\frac{q}{p}\,{}^{a}\!\log x`,
    explanation:
      "Combine change of base with the power rule. The exponent on the base must be nonzero, otherwise the new base would be one.",
    steps: [
      String.raw`{}^{a^p}\!\log(x^q)=\frac{{}^{a}\!\log(x^q)}{{}^{a}\!\log(a^p)}`,
      String.raw`{}^{a}\!\log(x^q)=q\,{}^{a}\!\log x`,
      String.raw`{}^{a}\!\log(a^p)=p\ne0`,
      String.raw`{}^{a^p}\!\log(x^q)=\frac{q}{p}\,{}^{a}\!\log x`,
    ],
    example: String.raw`{}^{4}\!\log 8=\frac32\,{}^{2}\!\log 2=\frac32`,
  },
  {
    title: "Equal logarithms, equal arguments",
    formula: String.raw`{}^{a}\!\log x={}^{a}\!\log y\quad\Longleftrightarrow\quad x=y`,
    explanation:
      "For the same valid base, each output corresponds to exactly one positive input. This lets you solve logarithmic equations after checking the domain.",
    steps: [
      String.raw`{}^{a}\!\log x={}^{a}\!\log y=t`,
      String.raw`x=a^t,\quad y=a^t\quad\Longrightarrow\quad x=y`,
      String.raw`x=y\quad\Longrightarrow\quad {}^{a}\!\log x={}^{a}\!\log y`,
    ],
    example: String.raw`{}^{3}\!\log(x+1)={}^{3}\!\log 5\quad\Longrightarrow\quad x=4`,
  },
] as const;

export const logarithmExercises = [
  {
    title: "Evaluate a fractional argument",
    expression: String.raw`{}^{3}\!\log\frac1{27}`,
    steps: [
      String.raw`\frac1{27}=3^{-3}`,
      String.raw`{}^{3}\!\log\frac1{27}=-3`,
    ],
    explanation:
      "A logarithm can be negative. Its argument must still be positive.",
  },
  {
    title: "Expand a combined expression",
    expression: String.raw`{}^{a}\!\log\frac{x^2\sqrt y}{z}`,
    steps: [
      String.raw`{}^{a}\!\log(x^2)+{}^{a}\!\log\sqrt y-{}^{a}\!\log z`,
      String.raw`2\,{}^{a}\!\log x+\frac12\,{}^{a}\!\log y-{}^{a}\!\log z`,
    ],
    explanation:
      "Assume all three variables are positive. Apply quotient, product, and power rules in that order.",
  },
  {
    title: "Solve an exponential equation",
    expression: String.raw`3^{2t-1}=7`,
    steps: [
      String.raw`2t-1={}^{3}\!\log 7`,
      String.raw`t=\frac{1+{}^{3}\!\log 7}{2}\approx1.386`,
    ],
    explanation:
      "Take the logarithm with the same base to bring the unknown exponent down.",
  },
  {
    title: "Solve and reject the invalid root",
    expression: String.raw`{}^{2}\!\log x+{}^{2}\!\log(x-2)=3`,
    steps: [
      String.raw`x>0,\quad x-2>0\quad\Longrightarrow\quad x>2`,
      String.raw`{}^{2}\!\log\bigl(x(x-2)\bigr)=3`,
      String.raw`x(x-2)=8`,
      String.raw`x^2-2x-8=(x-4)(x+2)=0`,
      String.raw`x=4\quad\text{or}\quad x=-2`,
      String.raw`x>2\quad\Longrightarrow\quad x=4`,
    ],
    explanation:
      "Check the original arguments separately. The negative root makes both logarithms undefined over the reals, even though their product is positive.",
  },
] as const;
