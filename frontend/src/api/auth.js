import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function registerUser(payload) {
  const response = await api.post("/auth/register", payload);
  return response.data;
}

export async function loginUser(payload) {
  const response = await api.post("/auth/login", payload);
  return response.data;
}

export function saveAuthData(data) {
  localStorage.setItem("access_token", data.access_token ?? "");
  localStorage.setItem("token_type", data.token_type ?? "bearer");
  localStorage.setItem("user", JSON.stringify(data.user ?? null));
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;

    return parsed;
  } catch (error) {
    console.error("Не удалось прочитать пользователя из localStorage:", error);
    localStorage.removeItem("user");
    return null;
  }
}

export function getToken() {
  const token = localStorage.getItem("access_token");
  return token && token.trim() ? token : null;
}

export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("token_type");
  localStorage.removeItem("user");
}

export default api;