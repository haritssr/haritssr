# Agent Guidelines

## Code Style Rules

### Block Statements

**Block statements are preferred in this position.**

Always use block statements (`{}`) instead of single-line statements for:
- `if` / `else` / `else if`
- `for` / `while` / `do while`
- `try` / `catch` / `finally`

**Good:**
```typescript
if (condition) {
  doSomething();
}

for (const item of items) {
  process(item);
}
```

**Bad:**
```typescript
if (condition) doSomething();

for (const item of items) process(item);
```

## Commit Guidelines

- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing tests
- chore: Changes to the build process or auxiliary tools and libraries such as documentation generation
- add: Adding new things

Template:
type(context): message
Example:
refactor(Breadcrumbs.tsx): make it scrollable at mobile size when it too long

[source](https://ec.europa.eu/component-library/v1.15.0/eu/docs/conventions/git/)
