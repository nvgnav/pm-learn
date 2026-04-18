import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../api/auth";

export default function StudentsPage() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [menuOpen, setMenuOpen] = useState(false);

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
        <button className="side-menu-item" onClick={() => navigate("/profile")}>
          Профиль
        </button>
        {user?.role === "admin" && (
          <button className="side-menu-item selected" onClick={() => navigate("/students")}>
            Результаты студентов
          </button>
        )}
        <button className="side-menu-item logout-btn" onClick={handleLogout}>
          Выход
        </button>
      </div>

      <main className="home-main">
        <div className="content-block">
          <h1>Результаты студентов</h1>
          <p>
            Этот раздел доступен только администратору. Здесь позже можно будет
            выводить общую информацию по студентам, их результатам, оценкам и
            текущему прогрессу.
          </p>
        </div>
      </main>
    </div>
  );
}