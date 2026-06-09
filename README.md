# Job Tracker

[![CI](https://github.com/tvthanh2k3/job-tracker/actions/workflows/ci.yml/badge.svg)](https://github.com/tvthanh2k3/job-tracker/actions/workflows/ci.yml)

A web app to track job applications — log positions, manage pipeline status (Applied → Interview → Offer / Rejected), and schedule interviews.

**[Live Demo](https://salmon-water-0fed1e00f.7.azurestaticapps.net)**

## Features

### ✅ Implemented

- **Authentication** — register, login, profile via JWT; token injected automatically on every request
- **Role-based access control** — `SuperAdmin` and `User` roles
- **Job application CRUD** — title, company, URL, description, salary range, remote status
- **Job status tracking** — `Applied → Interview → Offer / Rejected`
- **Interview management** — round, scheduled time, notes; linked to a job
- **Kanban board** — drag-and-drop cards across status columns
- **List & Table views** — switch between views on the jobs page
- **Unit & Integration tests** — service layer + API endpoints (xUnit, NSubstitute, Testcontainers)
- **CI/CD** — GitHub Actions pipeline (build, lint, test on every push and PR; auto-deploy to Azure on merge to `main`)
- **Docker** — multi-stage Dockerfile; full stack runnable locally via `docker compose up`
- **Azure deployment** — API on App Service, PostgreSQL on Flexible Server, frontend on Static Web Apps

### 🚧 Roadmap

- **Analytics Dashboard** — KPI cards (total applications, interview rate, offer rate) + charts
- **AI features** — resume optimization against a job description; auto-generated cover letters
- **Pagination, filtering & sorting** for the jobs list

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS 4, TanStack Query, Zustand, React Router |
| Backend | ASP.NET Core 10, EF Core, PostgreSQL, JWT Bearer |

---

## Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [PostgreSQL](https://www.postgresql.org/) 16+

---

## Getting Started

### Backend

```bash
cd apps/api

# Edit src/JobTracker.Api/appsettings.Development.json → ConnectionStrings:DefaultConnection

dotnet ef database update --project src/JobTracker.Infrastructure --startup-project src/JobTracker.Api
dotnet run --project src/JobTracker.Api/JobTracker.Api.csproj
```

API: `https://localhost:5001` · Scalar docs: `https://localhost:5001/scalar/v1`

### Frontend

```bash
cd apps/web
npm install
npm run dev
```

Set `VITE_API_BASE_URL` in `.env` to point at the backend (default: `http://localhost:5000`).

App: `http://localhost:5173`

---

## Architecture

Clean Architecture backend + React SPA frontend with feature-based layout.

```
apps/
├── api/src/
│   ├── JobTracker.Domain/           # Entities, core exceptions
│   ├── JobTracker.Application/      # Use cases, DTOs, services
│   ├── JobTracker.Infrastructure/   # EF Core, repositories, JWT
│   └── JobTracker.Api/              # Controllers, middleware
└── web/src/
    ├── features/                    # Feature-based modules
    ├── stores/                      # Zustand global state
    └── lib/                         # Axios, React Query config
```

**Authentication:** Stateless JWT — token stored in `localStorage`, injected via Axios interceptor.

---

## License

MIT
