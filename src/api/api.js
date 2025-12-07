// src/api/api.js
export async function apiRequest(path, method = "GET", body = null, token = null) {
  console.log("API вызов:", path, method, body, token);

  // заглушки для теста
  if (path === "/login" && method === "POST") {
    return { token: "fake-jwt-token" }; // всегда успешный вход
  }
  if (path === "/projects" && method === "GET") {
    return [
      { id: 1, title: "Тестовый проект 1", description: "Описание 1" },
      { id: 2, title: "Тестовый проект 2", description: "Описание 2" }
    ];
  }
  if (path === "/projects" && method === "POST") {
    return { success: true };
  }
  return {};
}