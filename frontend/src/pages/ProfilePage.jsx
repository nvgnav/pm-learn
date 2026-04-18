import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../api/auth";

export default function ProfilePage() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdmin = user?.role === "admin";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="home-page">
      <header className="home-header">
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ⋯
        </button>
        <div className="home-header-title">PM-Learn</div>
      </header>

      <div className={`side-menu ${menuOpen ? "open" : ""}`}>
        <div className="side-menu-title">Меню</div>
        <button className="side-menu-item" onClick={() => navigate("/home")}>
          Главная
        </button>
        <button className="side-menu-item" onClick={() => navigate("/theory")}>
          Теория
        </button>
        <button className="side-menu-item" onClick={() => navigate("/practice")}>
          Практика
        </button>
        <button className="side-menu-item" onClick={() => navigate("/results")}>
          Мои результаты
        </button>
        <button className="side-menu-item selected" onClick={() => navigate("/profile")}>
          Профиль
        </button>
        {isAdmin && (
          <button className="side-menu-item" onClick={() => navigate("/students")}>
            Результаты студентов
          </button>
        )}
        <button className="side-menu-item logout-btn" onClick={handleLogout}>
          Выход
        </button>
      </div>

      <main className="home-main">
        <div className="content-block">
          <h1>Профиль пользователя</h1>
          <p>
            ФИО: {user?.full_name || "Не указано"}.
            <br />
            Email: {user?.email || "Не указан"}.
            <br />
            Учебная группа: {user?.group_name || "Не указана"}.
            <br />
            Роль: {user?.role || "Не указана"}.
          </p>
        </div>
      </main>
    </div>
  );
}