import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../api/auth";

export default function PageLayout({
  title = "PM-Learn",
  children,
  activePage = "",
}) {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const isAdmin = user?.role === "admin";

  const [menuOpen, setMenuOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        setHeaderVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY.current) {
        setHeaderVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setHeaderVisible(true);
      }

      lastScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function goTo(path) {
    setMenuOpen(false);
    navigate(path);
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="home-page">
      <header
        className={`home-header ${headerVisible ? "header-show" : "header-hide"}`}
      >
        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ⋯
        </button>
        <div className="home-header-title">{title}</div>
      </header>

      <div className={`side-menu ${menuOpen ? "open" : ""}`}>
        <div className="side-menu-title">Меню</div>

        <button
          type="button"
          className={`side-menu-item ${activePage === "home" ? "selected" : ""}`}
          onClick={() => goTo("/home")}
        >
          Главная
        </button>

        <button
          type="button"
          className={`side-menu-item ${activePage === "theory" ? "selected" : ""}`}
          onClick={() => goTo("/theory")}
        >
          Теория
        </button>

        <button
          type="button"
          className={`side-menu-item ${activePage === "practice" ? "selected" : ""}`}
          onClick={() => goTo("/practice")}
        >
          Практические работы
        </button>

        <button
          type="button"
          className={`side-menu-item ${activePage === "classroom" ? "selected" : ""}`}
          onClick={() => goTo("/classroom")}
        >
          Аудиторные работы
        </button>

        <button
          type="button"
          className={`side-menu-item ${activePage === "results" ? "selected" : ""}`}
          onClick={() => goTo("/results")}
        >
          Мои результаты
        </button>

        <button
          type="button"
          className={`side-menu-item ${activePage === "profile" ? "selected" : ""}`}
          onClick={() => goTo("/profile")}
        >
          Профиль
        </button>

        {isAdmin && (
          <button
            type="button"
            className={`side-menu-item ${activePage === "students" ? "selected" : ""}`}
            onClick={() => goTo("/students")}
          >
            Результаты студентов
          </button>
        )}

        <button type="button" className="side-menu-item logout-btn" onClick={handleLogout}>
          Выход
        </button>
      </div>

      <main className="home-main">{children}</main>
    </div>
  );
}