import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../api/auth";

export default function StudyLayout({
  title,
  children,
  activeSection = "practice",
}) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = useMemo(() => getCurrentUser(), []);
  const isAdmin = user?.role === "admin";

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  function goTo(path) {
    setMenuOpen(false);
    navigate(path);
  }

  return (
    <div className="home-page">
      <header className="home-header">
        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Открыть меню"
        >
          ⋯
        </button>

        <div className="home-header-title">PM-Learn</div>
      </header>

      <aside className={`side-menu ${menuOpen ? "open" : ""}`}>
        <div className="side-menu-title">Меню</div>

        <button
          type="button"
          className={`side-menu-item ${activeSection === "home" ? "selected" : ""}`}
          onClick={() => goTo("/home")}
        >
          Главная
        </button>

        <button
          type="button"
          className={`side-menu-item ${activeSection === "theory" ? "selected" : ""}`}
          onClick={() => goTo("/theory")}
        >
          Теория
        </button>

        <button
          type="button"
          className={`side-menu-item ${activeSection === "practice" ? "selected" : ""}`}
          onClick={() => goTo("/practice")}
        >
          Практика
        </button>

        <button
          type="button"
          className={`side-menu-item ${activeSection === "results" ? "selected" : ""}`}
          onClick={() => goTo("/results")}
        >
          Мои результаты
        </button>

        <button
          type="button"
          className={`side-menu-item ${activeSection === "profile" ? "selected" : ""}`}
          onClick={() => goTo("/profile")}
        >
          Профиль
        </button>

        {isAdmin && (
          <button
            type="button"
            className={`side-menu-item ${activeSection === "students" ? "selected" : ""}`}
            onClick={() => goTo("/students")}
          >
            Результаты студентов
          </button>
        )}

        <button
          type="button"
          className="side-menu-item logout-btn"
          onClick={handleLogout}
        >
          Выход
        </button>
      </aside>

      <main className="home-main">
        <div className="content-block">
          <h1>{title}</h1>
          {children}
        </div>
      </main>
    </div>
  );
}