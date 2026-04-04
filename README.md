# Job Tracker

A comprehensive full-stack web application designed to help users manage and optimize their job application process. It acts as a personal productivity tool to track applied jobs, manage statuses via a Kanban board, analyze job search performance, and leverage AI to enhance CVs and Cover Letters.

## 🚀 Tech Stack

- **Frontend**: React + Tailwind CSS + TypeScript + React Query + Zustand
- **Backend**: ASP.NET Core Web API (using .NET 10)
- **Database**: PostgreSQL (via Entity Framework Core)
- **Architecture**: Client-Server (RESTful API communication)

## 🏗️ Technical Architecture Overview

The project adopts a clearly separated Client-Server architecture:
- **Frontend SPA**: The Frontend layer (React) is responsible for the UI, client-side data validation, and state management (Zustand for global state and React Query for server state caching).
- **Backend API**: The ASP.NET Core backend implements **Clean Architecture** (Api, Application, Domain, Infrastructure). This design strictly separates HTTP routing, application business logic, core entities, and database access.
- **Data Storage**: Postgres database for data integrity via Entity Framework Core.
- **Authentication**: Stateless JSON Web Tokens (JWT) mechanism.
- **External Integrations**: OpenAI API for analyzing and revamping Resumes and auto-generating Cover Letters.

---

## 📂 Folder Structure

### Frontend (`apps/web/`)
Currently, the UI source code uses the default React Vite initialization structure. In the next phases, the project will be expanded into a **Feature-based architecture**.

```text
src/
├── assets/             # Directory for static assets
├── App.css             # Styling for App component
├── App.tsx             # Root component of the application
├── index.css           # Tailwind CSS directives and base styles
└── main.tsx            # Entry point into index.html and UI initialization
```
*(In later phases, the frontend structure will be broken down into `features/`, `components/`, `hooks/`, `stores/`, `pages/` to handle business logic for Kanban board, Analytics, AI, etc.)*

### Backend (`apps/api/`)
The **Clean Architecture** is already set up, dividing specific responsibilities across codebase layers.

```text
src/
├── JobTracker.Api/           # Presentation Layer
│   # Handles HTTP requests/responses, Middleware, Controllers
├── JobTracker.Application/   # Application Layer
│   # Contains Use Cases, DTOs, Interfaces, specific business logic of the app
├── JobTracker.Domain/        # Domain Layer
│   # Data entities (User, Job, Interview), Core Exceptions
└── JobTracker.Infrastructure/# Infrastructure Layer
    # DbContext (Entity Framework Core), Repositories, API Integrations (OpenAI, Mail)
```

---

## 🗄️ Database Schema

**PostgreSQL Table Structure**

1. **Users**
   - `Id` (UUID, Primary Key)
   - `Email` (VARCHAR, Unique)
   - `PasswordHash` (VARCHAR)
   - `FullName` (VARCHAR)
   - `CreatedAt` (TIMESTAMP)

2. **Jobs**
   - `Id` (UUID, Primary Key)
   - `UserId` (UUID, Foreign Key -> Users.Id)
   - `Title` (VARCHAR(150))
   - `Company` (VARCHAR(150))
   - `Url` (TEXT)
   - `Description` (TEXT)
   - `SalaryRange` (VARCHAR(100))
   - `Status` (ENUM: _'Applied', 'Interview', 'Offer', 'Rejected'_)
   - `RemoteStatus` (ENUM: _'Onsite', 'Hybrid', 'Remote'_)
   - `CreatedAt` (TIMESTAMP), `UpdatedAt` (TIMESTAMP)

3. **Interviews (One-to-Many relationship with Jobs)**
   - `Id` (UUID, Primary Key)
   - `JobId` (UUID, Foreign Key -> Jobs.Id)
   - `ScheduledAt` (TIMESTAMP)
   - `Round` (VARCHAR) - e.g., "Technical Interview", "HR Round"
   - `Notes` (TEXT)

4. **AnalyticsMetrics (Optional - Caching or View)**
   - Tracked to minimize heavy computation queries and reduce resource load.

---

## 🛣️ API Design (RESTful Endpoints)

**Authentication**
- `POST   /api/auth/register` - Create a new account
- `POST   /api/auth/login`    - Verify credentials and return JWT token
- `GET    /api/auth/me`       - Return user info from Token Header

**Job Management (Jobs CRUD & Kanban)**
- `GET    /api/jobs`          - Get all user jobs (with Filtering, Pagination)
- `POST   /api/jobs`          - Create new job info
- `GET    /api/jobs/{id}`     - Get job details
- `PUT    /api/jobs/{id}`     - Update the entire job description file
- `PATCH  /api/jobs/{id}/status` - Update job Kanban status (Drag and drop)
- `DELETE /api/jobs/{id}`     - Delete job

**Analytics**
- `GET    /api/analytics/summary` - Get high-level KPI metrics (e.g., number of applications, interview rate)

**AI Integrations (AI API)**
- `POST   /api/ai/optimize-resume` - Input: current resume text + job description -> Result: optimized CV content
- `POST   /api/ai/generate-cover-letter` - Result: Flexible, tailored cover letter for that specific job

---
