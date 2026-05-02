# Inventeron-Project-AI-Workload-Scheduler-
Distributed AI Workload Scheduler and Hardware Performance Analyzer built using the MERN stack.

## Run Locally

### 1) Configure environment files

- Create `backend/.env` from `backend/.env.example`
- Create `frontend/.env` from `frontend/.env.example`

Example values:

```bash
# backend/.env
MONGO_URI=your_mongodb_connection_string
PORT=8000
```

```bash
# frontend/.env
VITE_API_URL=http://localhost:8000
VITE_SOCKET_URL=http://localhost:8000
```

### 2) Install dependencies

From repository root:

```bash
npm install
npm run install:all
```

### 3) Start app (backend + frontend)

From repository root:

```bash
npm run dev
```

Frontend runs on Vite (typically `http://localhost:5173` or next free port).  
Backend runs on `http://localhost:8000` (or `PORT` from `backend/.env`).
