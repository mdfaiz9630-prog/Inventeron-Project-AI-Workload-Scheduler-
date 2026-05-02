import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

// GET tasks
export const getTasks = () => API.get("/tasks");

// CREATE task
export const createTask = (data) => API.post("/tasks", data);

// scheduler (if you use it)
export const getScheduler = () => API.get("/scheduler");