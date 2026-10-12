# JavaScript-to-CSS refactor candidates

Reviewed on 2026-10-11 against the current working tree, including uncommitted changes.

Yes, several parts can move presentation logic into CSS. Most are small improvements: React still owns application state, while CSS selects the appearance from existing HTML attributes. The strongest opportunity to remove a layout calculation is the shared number input. Larger replacements mostly involve experiments whose teaching purpose should be preserved.

This is an assessment; no application code has been refactored. Findings come from source inspection and documentation, without browser profiling. Performance benefits are estimates, not measured results.

## Recommended candidates

| Priority | Candidate | CSS approach | JavaScript that can go away |
| --- | --- | --- | --- |
| High | Number-input width | `field-sizing: content` with minimum and maximum widths | Character-count width calculation, subject to fallback policy |
| High | Current navigation and TOC link colors | `[aria-current]` selectors | Duplicate class-name conditionals |
| High | Selected answer and orbital buttons | `[aria-pressed="true"]` selectors | Selected-state class-name conditionals |
| Medium | Theme-option appearance | `:has(input:checked)` | Selected classes and conditional checkmark rendering |
| Medium | Sidebar content width | Flexbox | Open/closed content-width conditional |
| Medium | Task progress-ring appearance | CSS variables and `conic-gradient()` | Gradient-string assembly and running-color conditional |
| Consider separately | Smooth-scroll preference | `scroll-behavior` and a motion media query | Two reduced-motion queries in click/navigation handlers |

### 1. Let number inputs size themselves

**Location:** [components/NumberInput.tsx](components/NumberInput.tsx), line 21.

`inputStyle` calculates a width from `String(value).length`, then passes it through `--number-input-width`. CSS can size the rendered input text directly using `field-sizing: content`, with padding and width limits. Unlike counting the committed value, this can also follow the text being edited. Fixed `width` must be overridden for content sizing to work. [CSS field-sizing documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/field-sizing).

An illustrative component-scoped rule:

```css
.numberInput {
  width: 8ch;
  min-width: calc(3ch + 1.5rem);
  max-width: 100%;
}

@supports (field-sizing: content) {
  .numberInput {
    field-sizing: content;
    width: auto;
  }
}
```

Keep Base UI NumberField, value handling, validation, formatting, and increment/decrement behavior. Check empty values, negative numbers, decimals, scientific notation, long values, and matrix layouts. Verify the surrounding flex group allows the input to shrink.

**Tradeoff:** A fixed-width fallback permits removal of the calculation but changes sizing in older browsers. Retaining the existing calculated fallback preserves that behavior and leaves some JavaScript. Check the browser support required by the site before choosing.

### 2. Style current links from their existing semantic attribute

**Locations:**

- [components/TopBar.tsx](components/TopBar.tsx), line 105.
- [components/BottomBar.tsx](components/BottomBar.tsx), line 36.
- [components/ArticleContentsPanel.tsx](components/ArticleContentsPanel.tsx), line 63.
- [app/experiments/physics/atomic-orbitals/contents.tsx](app/experiments/physics/atomic-orbitals/contents.tsx), line 62.

These links already emit `aria-current`, but also calculate selected colors in JavaScript. Use a static class with attribute selectors, or Tailwind arbitrary attribute variants:

```css
.navigationLink {
  color: var(--color-muted);
}

.navigationLink[aria-current="page"],
.contentsLink[aria-current="location"] {
  color: var(--color-action);
}
```

Set each component's actual default color separately. In BottomBar, let the icon and caption inherit the link color. Preserve InternalLink's inline variant and account for its existing color utilities when replacing overrides.

**JavaScript retained:** Route matching and active-heading detection. CSS cannot infer Next.js's active route, and `:target` only reflects a URL fragment; it does not track the section reached by ordinary scrolling. The benefit is one source of selected appearance, rather than removing the client components.

### 3. Style selected buttons with `aria-pressed`

**Locations:**

- [app/experiments/mathematics/practice.tsx](app/experiments/mathematics/practice.tsx), line 34.
- [app/experiments/physics/atomic-orbitals/interactions.tsx](app/experiments/physics/atomic-orbitals/interactions.tsx), line 255.
- [app/experiments/physics/_components/OrbitalIllustration.tsx](app/experiments/physics/_components/OrbitalIllustration.tsx), line 111.
- [app/experiments/ui-explorations/masalah-to-feature/GraphView.tsx](app/experiments/ui-explorations/masalah-to-feature/GraphView.tsx), line 346.

Replace selected/unselected class branches with static classes and `aria-pressed:*` variants. The repository already demonstrates this in [double-slit-lab.tsx](app/experiments/physics/double-slit-interference/double-slit-lab.tsx) and [interval-lab.tsx](app/experiments/mathematics/number-systems/interval-lab.tsx).

Keep answer selection, correctness checks, live feedback, orbital calculations, filtering, and graph traversal in JavaScript. In GraphView, category colors and graph relationships remain data; only selected appearance moves to CSS. Preserve the intended precedence of selected, hover, and keyboard-focus styles.

### 4. Use the checked radio to style theme options

**Location:** [components/ThemeSwitcher.tsx](components/ThemeSwitcher.tsx), lines starting at 103.

Each label contains a controlled radio input. CSS `:has(input:checked)` can select its background, text color, and weight. Render each decorative CheckIcon consistently, hide it by default, and show it when its radio is checked. `:has()` lets the parent react to a matching descendant. [CSS :has() documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has).

Use `display: none` for the unselected icon if preserving the current layout is important. Keep keyboard-focus styles.

**JavaScript retained:** Preference state, localStorage, system-theme changes, setting `data-theme`, updating the theme-color meta element, and the Base UI popover. Moving option appearance into CSS does not replace the theme system.

### 5. Let flexbox assign the remaining sidebar width

**Location:** [app/experiments/tailwind-css/sidebar/demo.tsx](app/experiments/tailwind-css/sidebar/demo.tsx), line 53.

The content switches between `w-3/4` and `w-full` according to `open`. Give the sidebar `w-1/4 shrink-0` and the main content `min-w-0 flex-1`. Hiding the sidebar then automatically gives its space to the content, removing the width conditional.

**JavaScript retained:** The disclosure state and accessible toggle behavior. Follow the project's Base UI requirement when modernizing this continuing widget. A hidden-checkbox workaround would change its semantics and is unnecessary. Verify both pointer and keyboard activation; the existing button has both click and keydown toggles.

### 6. Move progress-ring colors and gradient construction into CSS

**Location:** `DonutProgress` in [app/experiments/ui-explorations/task/TaskItem.tsx](app/experiments/ui-explorations/task/TaskItem.tsx), line 334.

The ring currently builds a complete gradient string and chooses its running color in JavaScript. Pass a bounded numeric `--progress` and `data-running` attribute; let CSS own the gradient and colors:

```css
.progressRing {
  --ring-color: var(--color-muted);
  background: conic-gradient(
    var(--ring-color) calc(var(--progress) * 1%),
    var(--color-border) 0
  );
}

.progressRing[data-running="true"] {
  --ring-color: var(--color-action);
}
```

Keep progress clamping, elapsed-time updates, persistence, completion transitions, and the visible percentage in JavaScript. CSS animation cannot be the source of truth for a task timer. This is a small styling cleanup in a development-only experiment, with the additional benefit of using theme tokens.

## Candidates needing a separate behavior decision

### Smooth scrolling and reduced-motion preference

[components/ArticleTableOfContents.tsx](components/ArticleTableOfContents.tsx), lines starting at 276 and 380, duplicates a motion-preference query when navigating to a heading or scrolling to the top. [app/globals.css](app/globals.css) already has a reduced-motion override, but normal root scrolling is explicitly `auto`.

CSS could set smooth scrolling on the relevant scroller and switch it to `auto` under `prefers-reduced-motion: reduce`. JavaScript would retain the destination, focus handling, URL update, and sheet-close sequencing, while delegating motion to CSS. The root element controls viewport scrolling. [CSS scroll-behavior documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-behavior).

**Behavior review required:** Enabling root smooth scrolling also affects fragment navigation and other programmatic scrolling. Preserve immediate initial-hash positioning and route restoration; audit those paths before changing the default. This is less isolated than the selected-state refactors above.

### Native text balancing instead of a library

[app/experiments/react/react-wrap-balancer/demo.tsx](app/experiments/react/react-wrap-balancer/demo.tsx), line 13, is the only application import of `react-wrap-balancer`. A block with Tailwind `text-balance` can replace this text layout; [components/PageTitle.tsx](components/PageTitle.tsx) already uses it. Native balancing is best suited to short text, with browser-specific line limits. [CSS text-wrap documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-wrap).

The installed library already prefers native balancing when supported, so there is no basis to claim every browser currently runs its measurement fallback. Replacing it could remove the wrapper, hydration work, and dependency if its final import disappears.

**Content decision required:** This route explicitly teaches React Wrap Balancer. Keep the existing example, or deliberately turn it into a library-versus-native comparison with updated catalog copy. A silent replacement would misrepresent the experiment.

### Scroll-driven visual effects

The rocket in [app/experiments/browser/intersection-observer-api/demo.tsx](app/experiments/browser/intersection-observer-api/demo.tsx), line 91, could have a separate CSS `view()` animation example. However, a scroll-progress animation is different from launching a five-second animation when an observer reports visibility. Timeline support also requires checking browser compatibility. [CSS animation-timeline documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline).

Treat this as an additional experiment, not an equivalent refactor. Similarly, [components/useScrolledArticle.ts](components/useScrolledArticle.ts) controls which navigation and article title are rendered after a heading passes a measured threshold. That requires accessible visibility, route data, and coordination with dynamically arriving content; replacing it with opacity keyframes would not preserve the current behavior.

## Keep these responsibilities in JavaScript

| Code | Reason |
| --- | --- |
| [ArticleTableOfContents.tsx](components/ArticleTableOfContents.tsx) desktop media subscription | Selects Base UI Popover versus React Aria Sheet, including different focus and modal behavior; hiding duplicate widgets with CSS is not equivalent. |
| [OrbitalCanvas.tsx](app/experiments/physics/_components/OrbitalCanvas.tsx) and [confetti/demo.tsx](app/experiments/react/confetti/demo.tsx) sizing | Canvas drawing dimensions and projection need actual dimensions. CSS width alone can stretch the bitmap without updating the drawing. |
| [MotionDiagram.tsx](app/experiments/physics/motion-diagrams/MotionDiagram.tsx) | Calculates numeric outputs and SVG geometry; its animation frame batches input updates rather than running a decorative animation. |
| [ChangelogExplorer.tsx](components/ChangelogExplorer.tsx) and [utils/changelog.ts](utils/changelog.ts) | Date filtering, searching, pagination, and activity aggregation are data processing. |
| [corner-smoothing/demo.tsx](app/experiments/ui-explorations/corner-smoothing/demo.tsx) | Intentionally compares rounded corners, native CSS squircles, and adjustable Lisse paths. Removing path generation removes a comparison. |
| Search, clocks, stopwatch, PWA installation, and service-worker registration | Require application logic, elapsed time, or browser APIs. |

## Existing CSS patterns worth reusing

The codebase already uses CSS for responsive navigation, hover/focus/pressed feedback, shared elevation tokens, accordion chevron rotation, Base UI active-tab styling, popup transitions, and native squircle support detection. See [app/design](app/design), [components/Accordion.tsx](components/Accordion.tsx), [components/BottomBar.tsx](components/BottomBar.tsx), and [app/globals.css](app/globals.css).

Prefer existing Tailwind attribute variants for simple state styling and colocated CSS Modules for more involved rules. Keep genuinely global rules in `app/globals.css`, following the installed [Next.js CSS guide](node_modules/next/dist/docs/01-app/01-getting-started/11-css.md). Converting static server-rendered class maps or data-driven SVG coordinates to CSS variables alone does not establish a performance improvement.

## Suggested order and verification

Start with navigation, TOC, and selected-button styles, then theme-option appearance. Evaluate number-input sizing next because it changes layout and needs an older-browser fallback decision. Follow with the small sidebar and progress-ring cleanups. Handle smooth scrolling and educational-demo changes separately.

For implemented changes, verify keyboard focus, selected-state hover behavior, both themes, reduced motion, small screens, and long/empty input values in an already-running browser. Preserve Base UI widget behavior, InternalLink variants, and existing article heading anchors. Run the five required checks from [AGENTS.md](AGENTS.md); do not add test files or run an agent production build.
