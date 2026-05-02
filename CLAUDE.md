# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Role

You are a **senior software engineer** on this project. Apply production-level thinking to every task: write clean, maintainable code; enforce security best practices; keep architecture consistent; flag trade-offs clearly; and push back on shortcuts that create long-term debt.

---

## Project Overview

### Problem

Job seekers today often apply to dozens — sometimes hundreds — of positions across many different companies. Keeping track of which jobs you applied to, when you applied, what stage each application is at, and what interviews are coming up is genuinely difficult to manage manually.

### Solution

**Job Tracker** is a web application that gives users a single place to manage all their job applications. Users can log every application they submit, track its current status (Applied → Interview → Offer / Rejected), and record interview details — so nothing slips through the cracks.

The application is **industry-agnostic**: it is designed for anyone actively job-hunting, not just software engineers.

### Tech stack

A monorepo with an ASP.NET Core 10 backend and a React 19 + TypeScript frontend, connected via JWT-authenticated REST API.

```
apps/
├── api/   # ASP.NET Core Web API — Clean Architecture
└── web/   # React + Vite SPA
```

| Layer | Technologies |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS 4, TanStack Query (React Query), Zustand, React Router, Axios |
| Backend | ASP.NET Core 10, Entity Framework Core, PostgreSQL, FluentValidation, AutoMapper, BCrypt, JWT Bearer |
| Database | PostgreSQL |
| Planned integrations | OpenAI API — resume optimization, cover letter generation |

---

## Features & Roadmap

### Implemented
- Job application CRUD (title, company, URL, description, salary range, remote status)
- Job status tracking: `Applied → Interview → Offer / Rejected`
- Interview management (round, scheduled time, notes) linked to jobs
- JWT authentication (register / login / me)
- Role-based access control (`SuperAdmin`, `User`)

### Planned
- **Kanban board** — drag-and-drop cards by status (`PATCH /api/jobs/{id}/status`)
- **Analytics dashboard** — application count, interview rate, offer rate KPIs
- **AI features** (OpenAI) — resume optimization against a job description; auto-generated cover letters

> When implementing new features, check this roadmap first. Architecture decisions (data model, API shape, component structure) should not conflict with planned items above.

---

## Commands

### Backend (`apps/api/`)

```bash
# Run the API (listens on https://localhost:5001)
dotnet run --project src/JobTracker.Api/JobTracker.Api.csproj

# Build
dotnet build

# Add EF Core migration
dotnet ef migrations add <MigrationName> --project src/JobTracker.Infrastructure --startup-project src/JobTracker.Api

# Apply migrations manually (also runs automatically on startup)
dotnet ef database update --project src/JobTracker.Infrastructure --startup-project src/JobTracker.Api
```

### Frontend (`apps/web/`)

```bash
npm run dev      # Vite dev server on port 5173
npm run build    # TypeScript compile + Vite bundle
npm run lint     # ESLint check
npm run preview  # Serve the built dist/
```

### Frontend environment

Set `VITE_API_BASE_URL` to point at the backend (defaults to `http://localhost:5000`).

---

## Backend Architecture

Clean Architecture with four projects:

| Layer | Project | Responsibility |
|---|---|---|
| Domain | `JobTracker.Domain` | Entities, enums, repository interfaces — no external deps |
| Application | `JobTracker.Application` | Services, DTOs, AutoMapper profiles, FluentValidation validators |
| Infrastructure | `JobTracker.Infrastructure` | EF Core DbContext, repository implementations, UnitOfWork, data seeding, JWT token service |
| API | `JobTracker.Api` | Controllers, middleware, DI wiring (`Installers.cs`), startup (`Program.cs`) |

### Folder structure

```
apps/api/src/
├── JobTracker.Api/                          # Entry point
│   ├── Controllers/
│   │   ├── AuthController.cs
│   │   ├── InterviewsController.cs
│   │   ├── JobsController.cs
│   │   └── UsersController.cs
│   ├── Properties/
│   │   └── launchSettings.json
│   ├── Installers.cs                        # DI wiring
│   ├── Program.cs
│   ├── appsettings.json
│   └── appsettings.Development.json
├── JobTracker.Application/                  # Business logic
│   ├── Auth/
│   │   ├── IAuthService.cs
│   │   ├── AuthService.cs
│   │   ├── IJwtTokenService.cs
│   │   ├── Dto/
│   │   └── Validation/
│   ├── Users/
│   │   ├── IUserService.cs / UserService.cs
│   │   ├── Dto/
│   │   ├── Mapping/
│   │   └── Validation/
│   ├── Jobs/
│   │   ├── IJobService.cs / JobService.cs
│   │   ├── Dto/
│   │   ├── Mapping/
│   │   └── Validation/
│   ├── Interviews/
│   │   ├── IInterviewService.cs / InterviewService.cs
│   │   ├── Dto/
│   │   ├── Mapping/
│   │   └── Validation/
│   └── DependencyInjection.cs
├── JobTracker.Domain/                       # Core — no external deps
│   ├── Common/
│   │   └── BaseEntity.cs
│   ├── Entities/
│   │   ├── User.cs / Role.cs / UserRole.cs
│   │   ├── Job.cs
│   │   └── Interview.cs
│   ├── Enums/
│   │   ├── JobStatus.cs
│   │   └── RemoteStatus.cs
│   └── Interfaces/
│       ├── IGenericRepository.cs
│       ├── IUnitOfWork.cs
│       └── IUserRepository.cs
└── JobTracker.Infrastructure/               # Data access
    ├── Data/
    │   ├── JobTrackerDbContext.cs
    │   ├── DataSeeder.cs
    │   └── Configurations/                  # EF entity configs
    ├── Migrations/
    ├── Repositories/
    │   ├── GenericRepository.cs
    │   ├── UnitOfWork.cs
    │   └── UserRepository.cs
    ├── Services/
    │   └── JwtTokenService.cs
    └── DependencyInjection.cs
```

Each feature in `JobTracker.Application` follows the same sub-structure: `Dto/`, `Mapping/`, `Validation/`, interface + implementation.

### Key patterns

**Unit of Work + Generic Repository**
`IUnitOfWork` is injected into services. Repositories are accessed via `_unitOfWork.Repository<TEntity>()`. All changes are persisted with a single `await _unitOfWork.SaveChangesAsync()`. Manual transaction support is available via `BeginTransactionAsync / CommitAsync / RollbackAsync`.

**Service layer**
Services own all business logic. Controllers are thin: they extract `userId` from JWT claims and delegate to services. Services return booleans (`true` = success, `false` = not found) for mutations, and typed DTOs or `null` for queries.

**User isolation**
`userId` is never trusted from the request body. Controllers read it from `User.FindFirst(ClaimTypes.NameIdentifier)` and pass it explicitly to services. AutoMapper profiles explicitly ignore `UserId` when mapping `CreateJobDto` / `UpdateJobDto`.

**DTO conventions**
- `Create{Entity}Dto` — excludes Id, timestamps, UserId
- `Update{Entity}Dto` — excludes Id, timestamps, UserId
- `{Entity}Dto` — the read/response shape; includes Id and timestamps
- `AuthResponseDto` — wraps token + user info on login/register

**Validation**
FluentValidation validators are named `{Dto}Validator` (e.g., `CreateJobDtoValidator`) and auto-registered from the Application assembly. Validators enforce URL format, salary min ≤ max, and required fields.

**AutoMapper**
Profiles live in `JobTracker.Application` and are registered via `AddAutoMapper(Assembly.GetExecutingAssembly())`. Each entity has its own `*MappingProfile`.

**Authentication / Authorization**
JWT Bearer authentication. Token claims: `NameIdentifier` (userId), `Name` (fullName), `Email`, `Jti`, `Role`. RBAC policies: `SuperAdminOnly` and `UserOnly`. Passwords hashed with BCrypt.

**Database seeding**
`DataSeeder.SeedAsync()` runs on startup and creates default roles (`SuperAdmin`, `User`) and demo accounts:
- `superadmin@jobtracker.dev` / `SuperAdmin@123`
- `user@jobtracker.dev` / `User@123456`

**Configuration**
- `appsettings.json` — `JwtSettings` (Secret, Issuer, Audience, ExpiryMinutes), `AllowedOrigins`
- `appsettings.Development.json` — `ConnectionStrings:DefaultConnection` (PostgreSQL)
- CORS policy is named `AllowFrontend`; origins come from `AllowedOrigins` config key

### Controller conventions

```csharp
[Authorize]
[Route("api/[controller]")]
public class JobsController : ControllerBase
{
    // 1. Extract userId from token
    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    if (userId is null) return Unauthorized();

    // 2. Delegate to service
    var result = await _jobService.CreateAsync(dto, Guid.Parse(userId));

    // 3. Return appropriate status
    // POST → CreatedAtAction(...)
    // PUT/PATCH/DELETE → NoContent()
    // Not found → NotFound()
}
```

### Database schema highlights

- **Enums stored as strings**: `JobStatus` (Applied, Interview, Offer, Rejected) and `RemoteStatus` (Onsite, Hybrid, Remote)
- **Salary**: `SalaryMin` / `SalaryMax` as `decimal(18,2)`, not a single varchar range
- **Compound index**: `(UserId, Status)` on Jobs for filtered queries
- **Cascade deletes**: User → Jobs → Interviews, User → UserRoles
- **Migrations location**: `src/JobTracker.Infrastructure/Migrations/`

---

## Frontend Architecture

Feature-based layout is scaffolded but not yet populated. Current active code:

| Path | Purpose |
|---|---|
| `src/lib/axios.ts` | Axios instance; adds `Authorization: Bearer` from `localStorage`; clears token + redirects to `/login` on 401 |
| `src/lib/react-query.ts` | `QueryClient` config — `staleTime: 5min`, `retry: 1`, `refetchOnWindowFocus: false` |
| `src/routes/index.tsx` | React Router config |
| `src/utils/cn.ts` | `clsx` + `tailwind-merge` helper for className merging |
| `src/stores/` | Zustand stores (empty — add auth state here) |
| `src/features/` | Feature modules — each feature owns its components, hooks, and queries |

### Folder structure

```
apps/web/src/
├── main.tsx
├── App.tsx
├── index.css
├── assets/                  # Static images (hero.png, etc.)
├── lib/
│   ├── axios.ts             # Axios instance with auth interceptor
│   └── react-query.ts       # QueryClient config
├── routes/
│   └── index.tsx            # React Router config
├── utils/
│   └── cn.ts                # clsx + tailwind-merge helper
├── components/              # Shared UI components
├── hooks/                   # Shared custom hooks
├── stores/                  # Zustand stores (auth state goes here)
├── types/                   # Shared TypeScript types
├── pages/                   # Page-level components
└── features/                # Feature modules
    ├── auth/
    ├── jobs/
    └── board/
```

Each feature module under `features/` owns its own components, hooks, and API queries — colocated together rather than scattered by type.

**Token lifecycle**: stored in `localStorage`; injected per-request by the Axios interceptor; cleared on 401.

**Styling**: Tailwind CSS 4. CSS custom properties defined in `index.css`: `--color-primary`, `--color-background`, `--font-inter`, `--font-outfit`. Use the `cn()` utility for conditional class merging.

**Path alias**: `@` resolves to `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`).

---

## Git Workflow

> Always read and follow `.claude/skills/git-workflow.md` for full branch naming, commit conventions, and Claude's role in git operations.
