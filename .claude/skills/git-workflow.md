---
name: git-workflow
description: Git workflow skill for job-tracker. Use this whenever the user wants to create a branch, commit, push, create a PR, or do anything related to Git in this project. Always follow these conventions when suggesting git commands or branch names.
---

# Git Workflow — Job Tracker

## Branch Naming Convention

Branches must follow this pattern based on the area of work:

| Area | Pattern | Example |
|---|---|---|
| Frontend feature | `feature/fe/<name>` | `feature/fe/kanban-board` |
| Backend feature | `feature/be/<name>` | `feature/be/auth-jwt` |
| Frontend bugfix | `fix/fe/<name>` | `fix/fe/job-card-status` |
| Backend bugfix | `fix/be/<name>` | `fix/be/pagination-query` |
| Refactor | `refactor/fe/<name>` or `refactor/be/<name>` | `refactor/be/clean-arch-layer` |
| Chore / config | `chore/<name>` | `chore/update-deps` |

**Rules:**
- Use **kebab-case** (lowercase, hyphens) — no spaces, no underscores
- **Keep names short and to the point** — 2 to 4 words max, no filler words
- Always branch off from `develop`, never from `main`

**Good vs Bad branch names:**
```
✅ feature/fe/kanban-board
✅ feature/be/auth-jwt
✅ fix/fe/job-card-status

❌ feature/fe/add-the-new-kanban-board-with-drag-and-drop
❌ feature/be/implement-authentication-using-jwt-tokens
❌ fix/fe/fixing-the-issue-with-job-card-status-not-updating
```

```bash
# Always start from develop
git checkout develop
git pull origin develop
git checkout -b feature/fe/<name>
```

**Rule: always create the branch before writing any code.** Do not start coding until the branch exists.

**Exception — gitignored files:** Changes to files matched by `.gitignore` (e.g. `.env`, `.env.*`, `node_modules/`, `dist/`, `*.local`) require **no branch and no commit**. These files must never be pushed to GitHub as they may contain secrets or generated output. Apply changes directly without any git ceremony.

---

## Claude's Role in Git

**Claude must never run git commands directly.** All git operations (branch creation, staging, committing, pushing) are performed manually by the user.

After completing each logical unit of work, Claude outputs the exact commands to copy-paste in this format:

```
Files to commit:
  git add src/components/KanbanBoard.tsx
  git add src/components/JobCard.tsx

Commit message:
  feat(kanban): add KanbanColumn

Reason: one line explaining why these files belong together.
```

Commit after every logical unit — a component, an endpoint, a fix. Do not accumulate changes across multiple units before committing.

---

## Commit Message Convention

Follow **Conventional Commits** format:

```
<type>(<scope>): <short description>
```

### Types

| Type | When to use |
|---|---|
| `feat` | Adding a new feature |
| `fix` | Fixing a bug |
| `refactor` | Code restructure, no behavior change |
| `style` | Formatting, CSS, UI tweaks (no logic change) |
| `chore` | Config, dependencies, tooling |
| `docs` | Documentation changes |
| `test` | Adding or updating tests |
| `perf` | Performance improvements |

### Scope (optional but recommended)

Scope should answer **"which feature/module?"** — not which layer or which side (fe/be).
The branch name already tells us that (`feature/fe/...`, `feature/be/...`).

Use the feature or module name directly:

- `kanban` — Kanban board
- `jobs` — job management
- `auth` — authentication
- `analytics` — analytics
- `ai` — AI integration (OpenAI)
- `db` — database / migrations

Only add `fe/` or `be/` prefix when **both sides change in the same feature** and you need to distinguish them clearly:

```bash
# Same feature, both sides changing → prefix helps
feat(fe/kanban): add drag-and-drop UI
feat(be/kanban): add PATCH endpoint for status update

# Only one side changing → short scope is enough
feat(kanban): add KanbanColumn component
fix(auth): redirect on token expiry
refactor(jobs): extract job filter logic
```

### Examples

```bash
feat(kanban): add drag-and-drop job card
feat(jobs): add PATCH endpoint for job status
fix(auth): handle token expiry redirect
refactor(jobs): move filter logic to Application layer
chore: update EF Core to latest version
feat(ai): integrate OpenAI for resume optimization
```

**Rules:**
- Use **present tense**, imperative mood: "add" not "added" or "adds"
- Description must be **2–4 words maximum** — if you need more words, the commit is doing too much; split it
- No period at the end
- **No filler words** — avoid "implement", "update", "some", "various", "misc"

**Good vs Bad commit messages:**
```
✅ feat(kanban): add JobCard
✅ feat(jobs): add type definitions
✅ fix(auth): handle token expiry

❌ feat(kanban): add drag-and-drop job card component with status badge
❌ feat(jobs): add shared TypeScript types and stage constants
❌ feat(dashboard): add DashboardPage, wire routes, fix lint errors
```

If a description naturally needs more than 4 words, it means the commit contains too many unrelated changes. Split into smaller commits, each described in 2–4 words.

---

## Atomic Commits — Always Split Your Work

**NEVER commit a pile of unrelated files in one go.** Each commit must represent one logical, self-contained change.

### Why atomic commits matter
- Makes code review faster and clearer
- Easier to revert a specific change without affecting others
- Git history becomes a readable story of what was built and why

### How to think about splitting commits

Ask yourself: *"Can I describe this commit in 2–4 words without using 'and'?"*
If you need "and", or need more than 4 words, it should be two (or more) commits.

### Build/lint fixes are always a separate commit

After completing a feature commit, if `npm run build` or `npm run lint` reveals errors, the fixes **must go in their own commit** — never mixed back into the feature commit.

```
✅ Correct flow:
  feat(kanban): add Board component       ← feature work
  fix(kanban): remove unused import       ← build/lint fix, separate commit

❌ Wrong — mixing feature + fix in one commit:
  feat(dashboard): add DashboardPage, wire routes, fix lint errors
```

This keeps the feature commit clean and makes the fix traceable on its own.

```
❌ feat(fe): add kanban board and fix auth redirect and update styles
✅ feat(kanban): add kanban board layout
✅ fix(auth): redirect to login on token expiry
✅ style(kanban): update job card spacing
```

### Stage selectively — never use `git add .` blindly

```bash
# Add only related files
git add src/components/KanbanBoard.tsx
git add src/components/JobCard.tsx
git commit -m "feat(kanban): add kanban board layout"

# Then commit the next logical change separately
git add src/hooks/useJobStatus.ts
git commit -m "feat(kanban): add useJobStatus hook for drag-and-drop"

# Use interactive staging to pick specific lines/hunks
git add -p src/someFile.tsx
```

### Practical examples of splitting commits

**Scenario: Building the Kanban board feature**
```bash
# ✅ Split into logical units
git commit -m "feat(kanban): add KanbanColumn component"
git commit -m "feat(kanban): add JobCard with status badge"
git commit -m "feat(kanban): wire drag-and-drop with React DnD"
git commit -m "feat(jobs): add PATCH /jobs/:id/status endpoint"
git commit -m "feat(kanban): connect drag-and-drop to API"

# ❌ Never do this
git add .
git commit -m "feat: kanban board"  # ← meaningless, unreviewable
```

---

## PR & Merge Workflow

### Standard flow

```bash
# 1. Create branch from develop
git checkout develop && git pull origin develop
git checkout -b feature/fe/<name>

# 2. Work and commit
git add .
git commit -m "feat(fe/<scope>): <description>"

# 3. Push branch
git push origin feature/fe/<name>

# 4. Create PR on GitHub
# Base branch: develop
# Title: same format as commit message
# Add description of what changed and why
```

### Before creating a PR, always:
- [ ] Pull latest `develop` and rebase if needed
- [ ] Make sure the app builds without errors
- [ ] Remove console.logs and debug code
- [ ] PR title follows Conventional Commits format

```bash
# Rebase onto latest develop before PR
git fetch origin
git rebase origin/develop
```

### PR Title format
Same as commit message convention:
```
feat(kanban): add drag-and-drop job card
fix(jobs): fix pagination returning wrong total count
```

### Merge strategy
- Merge PRs into `develop` only (never directly into `main`)
- Use **Squash and Merge** to keep history clean
- `main` is production-ready — only merge from `develop` via release PR

---

## Branch Protection Summary

```
main      ← production, protected — never push directly
develop   ← integration branch — merge PRs here
feature/* ← your working branches
fix/*     ← bugfix branches
```

---

## Quick Reference

```bash
# Start new feature
git checkout develop && git pull origin develop
git checkout -b feature/fe/<name>

# Stage selectively — never blindly add everything
git add <only related files>
git commit -m "feat(kanban): <what you did>"
# Repeat for each logical change

# Push and open PR
git push origin feature/fe/<name>
# → Go to GitHub → New Pull Request → base: develop

# Update branch with latest develop
git fetch origin
git rebase origin/develop
```
