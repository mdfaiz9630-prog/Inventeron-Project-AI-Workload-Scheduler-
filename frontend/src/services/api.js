import axios from "axios";

const API = axios.create({
 baseURL:"http://localhost:8000/api"
});

export const getTasks = () => API.get("/tasks");

export const getScheduler = () => API.get("/scheduler");