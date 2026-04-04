# Job Tracker (Công Cụ Theo Dõi Tìm Việc)

Một ứng dụng web toàn diện (full-stack) được thiết kế nhằm giúp người dùng quản lý và tối ưu hóa quá trình ứng tuyển việc làm. Nó hoạt động như một công cụ năng suất cá nhân giúp theo dõi các công việc đã ứng tuyển, quản lý trạng thái thông qua giao diện Kanban, phân tích hiệu suất tìm việc và tận dụng AI để cải thiện CV / Thư xin việc.

## 🚀 Công Nghệ Sử Dụng (Tech Stack)

- **Frontend**: React + Tailwind CSS + TypeScript + React Query + Zustand
- **Backend**: ASP.NET Core Web API (Sử dụng .NET 10)
- **Cơ Sở Dữ Liệu**: PostgreSQL (thông qua Entity Framework Core)
- **Kiến Trúc**: Client-Server (giao tiếp qua RESTful API)

## 🏗️ Kiến Trúc Hệ Thống Tổng Quan

Dự án áp dụng kiến trúc Client-Server đã được phân tách rõ ràng:
- **Frontend SPA**: Lớp Frontend (React) đảm nhiệm vai trò giao diện (UI), xác thực dữ liệu phía client, quản lý trạng thái (Zustand cho việc quản lý state toàn cục và React Query cho việc lưu trữ cache từ server).
- **Backend API**: Backend bằng ASP.NET Core áp dụng **Kiến trúc Clean Architecture** (Api, Application, Domain, Infrastructure). Thiết kế này tách biệt rõ ràng việc định tuyến HTTP, logic nghiệp vụ ứng dụng, các thực thể lõi, và việc truy cập cơ sở dữ liệu.
- **Lưu trữ dữ liệu**: Cơ sở dữ liệu Postgres cho tính toàn vẹn dữ liệu thông qua Entity Framework Core.
- **Xác thực**: Sử dụng cơ chế JSON Web Tokens (JWT) không trạng thái (stateless).
- **Tích hợp bên ngoài**: API OpenAI để phân tích làm mới Resume và tạo Cover Letter tự động.

---

## 📂 Cấu Trúc Thư Mục

### Frontend (`apps/web/`)
Hiện tại mã nguồn giao diện đang ở cấu trúc khởi tạo gốc của React Vite. Trong các bước tiếp theo, project sẽ được mở rộng ra theo hướng chia theo tính năng (**Feature-based architecture**).

```text
src/
├── assets/             # Thư mục lưu trữ assets tĩnh
├── App.css             # Định dạng style cho App component
├── App.tsx             # Component gốc của ứng dụng
├── index.css           # Khai báo Tailwind CSS và style cơ sở
└── main.tsx            # Điểm neo vào index.html và khởi tạo giao diện
```
*(Trong các phase sau, cấu trúc frontend sẽ được chia nhỏ thành `features/`, `components/`, `hooks/`, `stores/`, `pages/` để đáp ứng các nghiệp vụ quản lý Kanban board, Analytics, AI...)*

### Backend (`apps/api/`)
Kiến trúc **Clean Architecture** được thiết lập sẵn, phân chia trách nhiệm cụ thể giữa các hạ tầng mã nguồn.

```text
src/
├── JobTracker.Api/           # Lớp Giao Diện API (Presentation Layer)
│   # Xử lý các request/response từ HTTP, Middleware, Controllers
├── JobTracker.Application/   # Lớp Ứng Dụng (Application Layer)
│   # Chứa các Use Cases, DTOs, Interfaces, Logic nghiệp vụ cụ thể của app
├── JobTracker.Domain/        # Lớp Miền (Domain Layer)
│   # Các thực thể dữ liệu (Entities: User, Job, Interview), Exceptions vùng lõi
└── JobTracker.Infrastructure/# Lớp Hạ Tầng (Infrastructure Layer)
    # DbContext (Entity Framework Core), Repositories, API tích hợp (OpenAI, Mail)
```

---

## 🗄️ Lược Đồ Cơ Sở Dữ Liệu

**Cấu Trúc Bảng PostgreSQL**

1. **Users**
   - `Id` (UUID, Khóa chính)
   - `Email` (VARCHAR, Duy nhất)
   - `PasswordHash` (VARCHAR)
   - `FullName` (VARCHAR)
   - `CreatedAt` (TIMESTAMP)

2. **Jobs**
   - `Id` (UUID, Khóa chính)
   - `UserId` (UUID, Khóa ngoại -> Users.Id)
   - `Title` (VARCHAR(150))
   - `Company` (VARCHAR(150))
   - `Url` (TEXT)
   - `Description` (TEXT)
   - `SalaryRange` (VARCHAR(100))
   - `Status` (ENUM: _'Applied', 'Interview', 'Offer', 'Rejected'_)
   - `RemoteStatus` (ENUM: _'Onsite', 'Hybrid', 'Remote'_)
   - `CreatedAt` (TIMESTAMP), `UpdatedAt` (TIMESTAMP)

3. **Interviews (Liên kết One-to-Many với Jobs)**
   - `Id` (UUID, Khóa chính)
   - `JobId` (UUID, Khóa ngoại -> Jobs.Id)
   - `ScheduledAt` (TIMESTAMP)
   - `Round` (VARCHAR) - ví dụ: "Phỏng vấn kỹ thuật", "Vòng HR"
   - `Notes` (TEXT)

4. **AnalyticsMetrics (Tùy chọn - Caching hoặc View)**
   - Theo dõi để giảm thiểu tải tài nguyên do phải truy vấn tính toán thông số lớn.

---

## 🛣️ Thiết Kế API (RESTful Endpoints)

**Xác Thực (Authentication)**
- `POST   /api/auth/register` - Tạo tài khoản mới
- `POST   /api/auth/login`    - Kiểm tra thông tin và trả về mã JWT
- `GET    /api/auth/me`       - Trả về thông tin người dùng từ mã Token Header

**Quản lí Việc Làm (Jobs CRUD & Kanban)**
- `GET    /api/jobs`          - Lấy tất cả việc làm của người dùng (kèm Lọc, Phân trang)
- `POST   /api/jobs`          - Tạo thông tin việc làm mới
- `GET    /api/jobs/{id}`     - Lấy chi tiết công việc
- `PUT    /api/jobs/{id}`     - Cập nhật toàn bộ file mô tả công việc
- `PATCH  /api/jobs/{id}/status` - Cập nhật trạng thái Kanban của công việc (Kéo thả)
- `DELETE /api/jobs/{id}`     - Xóa công việc

**Phân Tích (Analytics)**
- `GET    /api/analytics/summary` - Lấy thông số tổng quan KPI (Ví dụ: số đơn ứng tuyển, tỷ lệ phỏng vấn)

**Tích Hợp Trí Tuệ Nhân Tạo (AI API)**
- `POST   /api/ai/optimize-resume` - Đầu vào: text resume hiện tại + mô tả công việc -> Kết quả: nội dung CV tối ưu
- `POST   /api/ai/generate-cover-letter` - Kết quả: Thư ứng tuyển linh hoạt dán cho công việc đó

---
