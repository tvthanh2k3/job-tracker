# Job Tracker

A web app to track job applications — log positions, manage pipeline status (Applied → Interview → Offer / Rejected), schedule interviews, and leverage AI to optimize resumes and generate cover letters.

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

API: `https://localhost:5001` · Swagger: `https://localhost:5001/swagger`

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
│   ├── JobTracker.Infrastructure/   # EF Core, repositories, OpenAI
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
