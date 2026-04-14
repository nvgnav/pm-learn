import { useState } from "react";
import { loginUser, registerUser, saveAuthData } from "../api/auth";

export default function AuthCard() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (mode === "register") {
        await registerUser({
          full_name: form.full_name,
          email: form.email,
          password: form.password,
        });

        setSuccess("Регистрация прошла успешно. Теперь войдите.");
        setMode("login");
        setForm({
          full_name: "",
          email: form.email,
          password: "",
        });
      } else {
        const data = await loginUser({
          email: form.email,
          password: form.password,
        });

        saveAuthData(data);
        setSuccess(`Добро пожаловать, ${data.user.full_name}!`);
      }
    } catch (err) {
      const message =
        err?.response?.data?.detail ||
        "Ошибка запроса. Проверьте данные и повторите.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-title">
          {mode === "login" ? "Авторизация" : "Регистрация"}
        </div>

        <div className="auth-tabs">
          <button
            type="button"
            className={`tab-btn ${mode === "login" ? "active" : ""}`}
            onClick={() => {
              setMode("login");
              setError("");
              setSuccess("");
            }}
          >
            Вход
          </button>

          <button
            type="button"
            className={`tab-btn ${mode === "register" ? "active" : ""}`}
            onClick={() => {
              setMode("register");
              setError("");
              setSuccess("");
            }}
          >
            Регистрация
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === "register" && (
            <div className="form-group">
              <label>Фамилия Имя</label>
              <input
                type="text"
                name="full_name"
                placeholder="Иванов Иван"
                value={form.full_name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password"
              name="password"
              placeholder="Введите пароль"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          {error && <div className="message error-message">{error}</div>}
          {success && <div className="message success-message">{success}</div>}

          <button className="submit-btn" type="submit" disabled={loading}>
            {loading
              ? "Подождите..."
              : mode === "login"
              ? "Войти"
              : "Зарегистрироваться"}
          </button>
        </form>
      </div>
    </div>
  );
}