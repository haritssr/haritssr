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
