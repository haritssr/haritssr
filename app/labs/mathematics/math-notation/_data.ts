export const chapterTopics = [
  {
    chapter: "Numbers, sets, and intervals",
    tex: String.raw`x\in\mathbb{R},\quad -2\le x<4`,
    needs: "Number lines and Venn diagrams need drawing components.",
  },
  {
    chapter: "Exponents, roots, and logarithms",
    tex: String.raw`\sqrt[3]{8}=2,\quad \log_2 8=3`,
    needs:
      "Evaluating expressions and plotting growth need calculation or graphing logic.",
  },
  {
    chapter: "Equations and inequalities",
    tex: String.raw`|2x-1|\le3`,
    needs:
      "Finding solutions and shading solution regions need a solver or graph.",
  },
  {
    chapter: "Linear systems",
    tex: String.raw`\begin{cases}x+y=3\\2x-y=0\end{cases}`,
    needs:
      "Elimination, substitution, and intersecting-line or plane plots need separate logic.",
  },
  {
    chapter: "Quadratic equations and functions",
    tex: String.raw`x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}`,
    needs:
      "Finding roots and drawing a parabola need calculation and graphing.",
  },
  {
    chapter: "Functions, composition, and inverses",
    tex: String.raw`(f\circ g)(x)=f(g(x))`,
    needs:
      "Evaluating functions, finding inverses, and plotting curves need separate logic.",
  },
  {
    chapter: "Sequences and series",
    tex: String.raw`U_n=a+(n-1)d,\quad S_n=\sum_{k=1}^{n}U_k`,
    needs:
      "Generating terms, summing values, or calculating financial growth needs calculation.",
  },
  {
    chapter: "Polynomials",
    tex: String.raw`P(x)=(x-a)Q(x)+r`,
    needs:
      "Factoring, polynomial division, and finding roots need algebraic logic.",
  },
  {
    chapter: "Matrices",
    tex: String.raw`A=\begin{pmatrix}1&2\\3&4\end{pmatrix}`,
    needs:
      "Multiplication, determinants, and inverse matrices need calculation.",
  },
  {
    chapter: "Vectors",
    tex: String.raw`\vec{u}\cdot\vec{v}=|\vec{u}|\,|\vec{v}|\cos\theta`,
    needs:
      "Calculating components and drawing vector arrows need calculation and visualization.",
  },
  {
    chapter: "Trigonometry",
    tex: String.raw`\sin^2\theta+\cos^2\theta=1`,
    needs:
      "Evaluating ratios, plotting waves, and animating the unit circle need other tools.",
  },
  {
    chapter: "Plane geometry and circles",
    tex: String.raw`A=\pi r^2,\quad s=\frac{\alpha}{360^\circ}2\pi r`,
    needs:
      "Figures, constructions, arcs, sectors, and measurements need a diagram and calculation.",
  },
  {
    chapter: "Spatial geometry",
    tex: String.raw`V=\frac13\pi r^2h`,
    needs:
      "Solids, cross-sections, and spatial rotation need a drawing or a 3D visualization.",
  },
  {
    chapter: "Geometric transformations",
    tex: String.raw`T(x,y)=(x+a,y+b)`,
    needs:
      "Applying a transformation to points and animating it need calculation and drawing.",
  },
  {
    chapter: "Counting and probability",
    tex: String.raw`\binom{n}{r}=\frac{n!}{r!(n-r)!}`,
    needs:
      "Counting outcomes, evaluating probabilities, and drawing probability trees need other logic.",
  },
  {
    chapter: "Statistics",
    tex: String.raw`\bar{x}=\frac{\sum_{i=1}^{n}x_i}{n}`,
    needs:
      "Computing summaries, fitting models, and drawing histograms or scatter plots need data tools.",
  },
  {
    chapter: "Limits",
    tex: String.raw`\lim_{x\to0}\frac{\sin x}{x}=1`,
    needs:
      "The trigonometric example uses radians. Finding limits or illustrating approaching values needs reasoning or calculation.",
  },
  {
    chapter: "Derivatives",
    tex: String.raw`\frac{d}{dx}x^2=2x`,
    needs:
      "Differentiation, optimization, and tangent plots need algebraic or graphing logic.",
  },
  {
    chapter: "Integrals",
    tex: String.raw`\int_0^1x\,dx=\frac12`,
    needs:
      "Integration, numerical approximation, and shaded-area diagrams need other tools.",
  },
] as const;

export const sharedConcepts = [
  {
    concept: "Arithmetic and symbolic operations",
    notation: "Yes: operation symbols and supplied results.",
    task: "No automatic evaluation, simplification, factoring, or solving.",
    tool: "Calculation code or a computer algebra system.",
  },
  {
    concept: "Worked steps and proofs",
    notation: "Yes: aligned equations, annotations, and written steps.",
    task: "No automatic generation or validation of reasoning.",
    tool: "Authored explanations; checking logic suited to the task.",
  },
  {
    concept: "Graphs, diagrams, and charts",
    notation: "Yes for mathematical labels and equations.",
    task: "A formula does not automatically produce its graph or construction.",
    tool: "SVG, canvas, a plotting component, or a geometry tool.",
  },
  {
    concept: "Tables and data",
    notation: "Yes for formulas inside cells and matrix-style layouts.",
    task: "No data analysis or spreadsheet operations.",
    tool: "An HTML or React table plus data-processing code.",
  },
  {
    concept: "Interactive controls and animation",
    notation: "Yes: an app can render an updated expression.",
    task: "No sliders, drag gestures, or animation from TeX alone.",
    tool: "React state, controls, and drawing or animation logic.",
  },
  {
    concept: "Math input and answer checking",
    notation: "Yes: a submitted expression can be typeset.",
    task: "No built-in math keyboard or mathematical-equivalence check.",
    tool: "A math editor, expression parser, and answer-checking logic.",
  },
  {
    concept: "Custom commands and special packages",
    notation: "Depends on the renderer, configured macros, and extensions.",
    task: "A React wrapper does not add support for every LaTeX package.",
    tool: "Check command support; rewrite the input or configure a supported extension.",
  },
  {
    concept: "Complete LaTeX documents",
    notation:
      "Math fragments work; a whole document is outside the math renderer's input.",
    task: "No document compilation, page layout, bibliography, or arbitrary package loading.",
    tool: "A full LaTeX engine with the required packages; embed its output in the page.",
  },
] as const;
