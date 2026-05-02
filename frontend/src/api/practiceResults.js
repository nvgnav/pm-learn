import { getToken } from "./auth";

const API_URL = "http://127.0.0.1:8001";

export async function savePracticeResult(payload) {
  const token = getToken();

  const response = await fetch(`${API_URL}/practice-results/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Не удалось сохранить результат практической работы");
  }

  return response.json();
}

export async function getPracticeResults() {
  const token = getToken();

  const response = await fetch(`${API_URL}/practice-results/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Не удалось загрузить результаты");
  }

  return response.json();
}