# AI Workload Scheduler

Distributed AI workload scheduler and hardware performance analyzer built using the MERN stack and Python.  
This project simulates intelligent task allocation across compute nodes while monitoring hardware utilization, queue management, and execution performance in real time.

---

# Features

- Dynamic AI workload scheduling
- ML-based workload prediction
- Real-time node monitoring
- Queue management system
- Hardware utilization tracking
- Dashboard analytics and visualization
- Node-Python integration
- REST API support
- MongoDB Atlas integration
- Responsive frontend dashboard

---

# Tech Stack

## Frontend
- React.js
- Vite
- Axios
- Tailwind CSS
- Socket.io Client

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Socket.io

## AI Engine
- Python
- Pandas
- Machine Learning-based scheduler

---

# System Architecture

```text
Frontend Dashboard (React)
            ↓
Backend API Server (Express.js)
            ↓
Scheduler Service Layer
            ↓
Python AI Engine
            ↓
MongoDB Atlas Database
```

---

# Project Structure

```text
ai-workload-scheduler/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env.example
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── services/
│   ├── server.js
│   └── .env.example
│
├── ai-engine/
│   ├── core/
│   ├── models/
│   └── train_model.py
│
├── screenshots/
├── README.md
└── .gitignore
```

---

# Core Functionalities

## Task Scheduling
The scheduler distributes AI workloads dynamically across available compute nodes based on utilization and predicted execution performance.

## Hardware Performance Monitoring
Tracks:
- CPU utilization
- Memory utilization
- Task execution time
- Node workload distribution

## ML-Based Prediction
A Python-based prediction engine estimates scheduling efficiency and workload balancing.

## Real-Time Dashboard
Frontend dashboard visualizes:
- Active tasks
- Node utilization
- Scheduler decisions
- Queue statistics

---

# API Endpoints

## GET `/api/tasks`
Returns all workload tasks.

---

## POST `/api/tasks`
Creates a new AI workload task.

### Example Request

```json
{
  "taskName": "Image Classification",
  "priority": "High",
  "requiredMemory": 2048
}
```

---

## GET `/api/scheduler`
Returns scheduling and node allocation details.

---

# Installation and Setup

## Clone Repository

```bash
git clone https://github.com/mdfaiz9630-prog/Inventeron-Project-AI-Workload-Scheduler-.git
cd Inventeron-Project-AI-Workload-Scheduler-
```

---

# Configure Environment Variables

## Backend Environment

Create:

```text
backend/.env
```

using:

```text
backend/.env.example
```

Example:

```env
MONGO_URI=your_mongodb_connection_string
PORT=8000
```

---

## Frontend Environment

Create:

```text
frontend/.env
```

using:

```text
frontend/.env.example
```

Example:

```env
VITE_API_URL=http://localhost:8000
VITE_SOCKET_URL=http://localhost:8000
```

---

# Install Dependencies

From repository root:

```bash
npm install
npm run install:all
```

---

# Run Application

Start backend and frontend together:

```bash
npm run dev
```

---

# Application URLs

## Frontend

```text
http://localhost:5173
```

(or next available port)

---

## Backend

```text
http://localhost:8000
```

(or PORT configured in backend/.env)

---

# Build for Production

## Frontend

```bash
cd frontend
npm run build
```

## Backend

```bash
cd backend
npm start
```

---

# Screenshots

## Dashboard Preview

Add screenshots inside:

```text
screenshots/
```

Example:

```md
![Dashboard](screenshots/dashboard.png)
```

---

# Future Improvements

- Kubernetes-based workload orchestration
- GPU-aware scheduling
- Docker container deployment
- Authentication and RBAC
- Real-time alert system
- Advanced ML prediction models
- Multi-cluster scheduling

---

# Learning Outcomes

Through this project, I gained hands-on experience in:
- Distributed systems concepts
- MERN stack development
- REST API design
- Real-time communication using Socket.io
- Node-Python integration
- AI workload management
- Performance monitoring and analytics
- Deployment workflows

---

# Author

Mohammed Faizan

GitHub:
https://github.com/mdfaiz9630-prog
