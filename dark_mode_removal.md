# Remove dark mode

## Intended result

The site always uses its current light appearance, regardless of system settings or previously saved preferences.

## Changes

- Remove the theme switcher from desktop actions and mobile menus.
- Remove Light, Dark, and System commands from search, including their icons, descriptions, and selection logic.
- Delete the theme provider, bootstrap script, preference store, types, and command utilities.
- Simplify the root layout by removing theme wrappers and the hydration-warning suppression used by the bootstrap.
- Keep `color-scheme: light` and a fixed light browser theme color. Remove the unused dark browser-color constant.
- Remove dark token overrides, scrollbar overrides, palette remapping, component dark variants, and physics equation dark styles. Preserve their existing light styles.
- Update README descriptions of navigation and search.

## Compatibility

- Previously saved theme preferences become unused; no migration script is needed.
- Keep intentionally dark illustrations, color swatches, and historical writing intact.
- Preserve existing routes, layout spacing, and non-theme controls. The remaining top bar actions close the gap naturally.

## Verification

- Run full lint, typecheck, Knip, production Knip, and content validation.
- Search active source for leftover theme imports, dark selectors, system-theme listeners, and theme commands.
- Check Home, writing, Projects, design components, physics equations, Timer, and search using the existing server without launching another browser.
- Confirm light rendering with a previously saved dark preference, dark system settings, and JavaScript disabled.

## Assumption

“Delete dark mode” means removing the feature and its implementation completely, while retaining today’s light design.
