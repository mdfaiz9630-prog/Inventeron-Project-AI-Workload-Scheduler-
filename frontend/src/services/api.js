import axios from "axios";

export const API = axios.create({
  baseURL: "/api",
});

// GET tasks
export const getTasks = () => API.get("/tasks");

// CREATE task
export const createTask = (data) => API.post("/tasks", data);

// scheduler (if you use it)
export const getScheduler = () => API.get("/scheduler");