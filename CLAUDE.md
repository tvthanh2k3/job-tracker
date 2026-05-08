# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Role

You are a **senior software engineer** on this project. Apply production-level thinking to every task: write clean, maintainable code; enforce security best practices; keep architecture consistent; flag trade-offs clearly; and push back on shortcuts that create long-term debt.

---

## Project Overview

Job seekers struggle to track dozens of applications across companies. **Job Tracker** solves this with a single, industry-agnostic web app to log applications, track status (Applied → Interview → Offer / Rejected), and record interviews.

Monorepo with an ASP.NET Core 10 backend (Clean Architecture) and a React 19 + TypeScript frontend, connected via JWT-authenticated REST API.

| Layer | Technologies |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS 4, TanStack Query, Zustand, React Router, Axios |
| Backend | ASP.NET Core 10, EF Core, PostgreSQL, FluentValidation, AutoMapper, BCrypt, JWT Bearer |

---

## Features & Roadmap

- Job application CRUD (title, company, URL, description, salary range, remote status)
- Job status tracking: `Applied → Interview → Offer / Rejected`
- Interview management (round, scheduled time, notes) linked to jobs
- JWT authentication (register / login / me)
- Role-based access control (`SuperAdmin`, `User`)
- **Kanban board** — drag-and-drop cards by status (`PATCH /api/jobs/{id}/status`)
- **Analytics dashboard** — application count, interview rate, offer rate KPIs
- **AI features** (OpenAI) — resume optimization against a job description; auto-generated cover letters

---

## Commands

### Backend (`apps/api/`)

```bash
dotnet run --project src/JobTracker.Api/JobTracker.Api.csproj   # https://localhost:5001

# Migrations require both flags — omitting --startup-project will fail
dotnet ef migrations add <Name> --project src/JobTracker.Infrastructure --startup-project src/JobTracker.Api
dotnet ef database update --project src/JobTracker.Infrastructure --startup-project src/JobTracker.Api
```

### Frontend (`apps/web/`)

```bash
npm run dev      # Vite dev server — port 5173
```

Set `VITE_API_BASE_URL` to point at the backend (defaults to `http://localhost:5000`).

---

## Backend Architecture

> Always read and follow `.claude/skills/api-csharp.md` when working on backend code.

Clean Architecture — four projects: `JobTracker.Domain` → `JobTracker.Application` → `JobTracker.Infrastructure` → `JobTracker.Api`.

### Application layer structure

Every feature under `JobTracker.Application` follows the same sub-structure — do not deviate:

```
<Feature>/
├── I<Feature>Service.cs
├── <Feature>Service.cs
├── Dto/
├── Mapping/       # AutoMapper profile
└── Validation/    # FluentValidation validators
```

### Key patterns

**Unit of Work + Generic Repository**
Inject `IUnitOfWork`; access repos via `_unitOfWork.Repository<TEntity>()`; persist with `await _unitOfWork.SaveChangesAsync()`. Manual transactions: `BeginTransactionAsync / CommitAsync / RollbackAsync`.

**Service layer**
Controllers are thin: extract `userId` from JWT claims, delegate to service. Services return `bool` for mutations (`true` = success, `false` = not found), typed DTO or `null` for queries.

**User isolation — never bypass this**
`userId` is never trusted from the request body. Always read from `User.FindFirst(ClaimTypes.NameIdentifier)` and pass explicitly to services. AutoMapper profiles must explicitly ignore `UserId` on `CreateJobDto` / `UpdateJobDto`.

**DTO conventions**
- `Create{Entity}Dto` / `Update{Entity}Dto` — no Id, timestamps, or UserId
- `{Entity}Dto` — read/response shape; includes Id and timestamps
- `AuthResponseDto` — wraps token + user info on login/register

**Validation**
FluentValidation validators named `{Dto}Validator`, auto-registered from the Application assembly. Enforce URL format, salary min ≤ max, required fields.

**AutoMapper**
Profiles in `JobTracker.Application`, registered via `AddAutoMapper(Assembly.GetExecutingAssembly())`.

**Authentication / Authorization**
JWT Bearer. Token claims: `NameIdentifier` (userId), `Name`, `Email`, `Jti`, `Role`. RBAC policies: `SuperAdminOnly`, `UserOnly`. Passwords hashed with BCrypt.

**Configuration**
- `appsettings.json` — `JwtSettings` (Secret, Issuer, Audience, ExpiryMinutes), `AllowedOrigins`
- `appsettings.Development.json` — `ConnectionStrings:DefaultConnection`
- CORS policy name: `AllowFrontend`; origins sourced from `AllowedOrigins` config key

**Database seeding**
`DataSeeder.SeedAsync()` runs on startup. Creates default roles and demo accounts — see `DataSeeder.cs` for credentials.

**Non-obvious schema decisions**
- Enums stored as **strings**, not ints: `JobStatus` (Applied, Interview, Offer, Rejected), `RemoteStatus` (Onsite, Hybrid, Remote)
- Salary stored as two `decimal(18,2)` columns (`SalaryMin`, `SalaryMax`) — not a single varchar range

**Controller pattern**
```csharp
var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
if (userId is null) return Unauthorized();
var result = await _jobService.CreateAsync(dto, Guid.Parse(userId));
// POST → CreatedAtAction | PUT/PATCH/DELETE → NoContent | not found → NotFound
```

---

## Frontend Architecture

> Always read and follow `.claude/skills/api-typescript.md` and `.claude/skills/frontend-design.md` when working on frontend code.

Feature-based layout under `src/features/` — each feature owns its components, hooks, and API queries. Do not scatter by type.

Every feature under `src/features/` follows the same sub-structure — do not deviate:

```
<feature>/
├── components/    # Feature-specific React components
├── hooks/         # Custom hooks (non-query logic)
└── queries/       # TanStack Query hooks (useQuery, useMutation)
```

| Path | Purpose |
|---|---|
| `src/lib/axios.ts` | Axios instance; injects `Authorization: Bearer` from `localStorage`; clears token + redirects to `/login` on 401 |
| `src/lib/react-query.ts` | `QueryClient` — `staleTime: 5min`, `retry: 1`, `refetchOnWindowFocus: false` |
| `src/routes/index.tsx` | React Router config |
| `src/utils/cn.ts` | `clsx` + `tailwind-merge` helper — use for all conditional class merging |
| `src/stores/` | Zustand stores (auth state lives here) |

**Styling**: Tailwind CSS 4. CSS custom properties in `index.css`: `--color-primary`, `--color-background`, `--font-inter`, `--font-outfit`.

**Path alias**: `@` resolves to `src/` (configured in `vite.config.ts` and `tsconfig.app.json`).

---

## Working Process

Before implementing any feature or change, Claude must follow this sequence strictly:

### Step 1 — Plan

Create a plan that covers:
- What the feature/change is and why
- A numbered list of every task to be done, each task mapping to exactly one commit
- For each task: the files that will be changed and the commit message

Format:

```
## Plan: <feature name>

**Branch:** `feature/fe/<name>`

| # | Task | Files | Commit message |
|---|------|-------|----------------|
| 1 | ... | `src/types/job.ts` | `refactor(jobs): drop saved stage` |
| 2 | ... | `src/components/Board.tsx` | `refactor(kanban): remove saved logic` |
```

**Wait for the user to approve the plan before proceeding.**

### Step 2 — Tasks

Once the plan is approved, use **TodoWrite** to create the task list from the plan. Each task = one commit unit.

### Step 3 — Branch

Suggest the branch name and wait for the user to create it. Do not write any code until the branch exists.

### Step 4 — Implement

Implement one task at a time. After finishing each task, output the commit suggestion and **stop** — wait for the user to commit manually and ask to continue before starting the next task.

---

## Git Workflow

> Always read and follow `.claude/skills/git-workflow.md` for full branch naming, commit conventions, and Claude's role in git operations.
