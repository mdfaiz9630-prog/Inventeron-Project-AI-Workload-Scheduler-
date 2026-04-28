import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

// GET tasks
export const getTasks = () => API.get("/tasks");

// CREATE task
export const createTask = (data) => API.post("/tasks", data);

// scheduler (if you use it)
export const getScheduler = () => API.get("/scheduler");