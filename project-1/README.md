# Freelance Hub — Backend (Node.js + TypeScript + Express + MongoDB)

A small-scale gig marketplace backend featuring modular architecture, JWT authentication, role-based authorization, and clean service-based design.

## ✅ Overview
This project implements a secure backend API for a freelance job marketplace.  
Clients can create jobs, freelancers can submit proposals, and admins can approve or reject submissions.

The architecture uses TypeScript, Express, MongoDB (Mongoose), ESM import maps, and modular service separation.

## ✅ Features (Current & Upcoming)
### ✅ Completed (M0 + M1)
- Node.js + TypeScript + ESM setup  
- Clean project structure with import aliases  
- Environment variables via dotenv  
- Express server configured  
- MongoDB installed, configured, and connected  
- Reusable database connection module  

### 🔜 Upcoming (M2–M7)
- Users module (M2)  
- JWT Authentication (M3)  
- RBAC (admin, member) (M3)  
- Jobs CRUD (M4)  
- Proposals CRUD + Admin approvals (M5)  
- Frontend (React + Vite + Tailwind) (M6)  
- Security, validation, tests, OpenAPI docs, deployment (M7)

## ✅ Project Structure
```
src/
  server.ts
  databases/
    connect-mongo.ts
  routes/
    index.ts
  modules/
    users/
    auth/
    jobs/
    proposals/
  middlewares/
    auth.ts
    roles.ts
```

## ✅ Tech Stack
- Node.js + Express
- TypeScript (strict mode)
- MongoDB + Mongoose
- ESM import maps
- dotenv
- tsx for hot reloading

## ✅ Installation
### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd project-1
```

### 2️⃣ Install dependencies
```bash
npm install
```

## ✅ Environment Variables
Create a `.env` file:

```
PORT=4000
MONGO_URL=mongodb://127.0.0.1:27017/freelance_hub
JWT_SECRET=your-secret-key
```

## ✅ Running the Server
Start MongoDB manually (Windows example):

```powershell
& "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath C:\data\db
```

Start backend:

```bash
npm run dev
```

Expected output:

```
🟢 MongoDB connected
✅ Server running on http://localhost:4000
```

## ✅ API Health Check (M1)
```
GET /health
```

Response:
```json
{ "status": "ok" }
```

## ✅ Milestones
| Milestone | Status | Description |
|----------|--------|-------------|
| M0 – Foundation & Repo | ✅ Done | Setup Node + TS + server |
| M1 – MongoDB Integration | ✅ Done | Database connection |
| M2 – Users Module | 🔜 Next | User model + routes |
| M3 – Auth & RBAC | 🔜 | JWT, roles |
| M4 – Jobs CRUD | 🔜 | CRUD + ownership rules |
| M5 – Proposals Module | 🔜 | Submissions + approval |
| M6 – Frontend | 🔜 | React interface |
| M7 – Security & Deployment | 🔜 | Validation, tests, Docker |

## ✅ Scripts
```json
{
  "dev": "tsx watch src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
```

## ✅ Status
✅ Backend foundation complete  
✅ MongoDB connected  
➡️ Proceeding to M2: Users Module Foundations


