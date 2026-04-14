import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser, saveAuthData } from "../api/auth";

export default function AuthCard() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    full_name: "",
    group_name: "",
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
          group_name: form.group_name,
          email: form.email,
          password: form.password,
        });

        setSuccess("Регистрация прошла успешно. Теперь войдите.");
        setMode("login");
        setForm({
          full_name: "",
          group_name: "",
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

        setTimeout(() => {
          navigate("/home");
        }, 500);
      }
    } catch (err) {
      let message = "Ошибка запроса. Проверьте данные и повторите.";

      if (typeof err?.response?.data?.detail === "string") {
        message = err.response.data.detail;
      } else if (Array.isArray(err?.response?.data?.detail)) {
        message = err.response.data.detail.map((item) => item.msg).join(", ");
      } else if (err?.message) {
        message = err.message;
      }

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
            <>
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

              <div className="form-group">
                <label>Учебная группа</label>
                <input
                  type="text"
                  name="group_name"
                  placeholder="ИСТ-22-26"
                  value={form.group_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
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

          {mode === "login" && (
            <div className="admin-hint">
              Администратор: admin@pmlearn.com / SUPER_ADMIN_123_!PMLEARN
            </div>
          )}

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