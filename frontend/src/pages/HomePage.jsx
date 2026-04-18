import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../api/auth";

export default function HomePage() {
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
        <div className="home-dashboard">
          <section className="welcome-block">
            <h1>Добро пожаловать в PM-Learn</h1>
            <p className="welcome-text">
              PM-Learn — это учебная информационная система, предназначенная для
              организации процесса обучения. Система объединяет теоретические
              материалы, практические задания и результаты в едином интерфейсе.
            </p>
          </section>

          <section className="user-summary">
            <div className="summary-card">
              <div className="summary-label">Пользователь</div>
              <div className="summary-value">
                {user?.full_name || "Не указано"}
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-label">Роль</div>
              <div className="summary-value">
                {user?.role || "Не указана"}
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-label">Группа</div>
              <div className="summary-value">
                {user?.group_name || "—"}
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-label">Доступ</div>
              <div className="summary-value">Активен</div>
            </div>
          </section>

          <section className="welcome-cards">
            <div className="welcome-card" onClick={() => navigate("/theory")}>
              <h3>Теория</h3>
              <p>
                Изучение учебных материалов, структурированных по темам и
                модулям.
              </p>
            </div>

            <div className="welcome-card" onClick={() => navigate("/practice")}>
              <h3>Практика</h3>
              <p>
                Выполнение заданий и применение полученных знаний на практике.
              </p>
            </div>

            <div className="welcome-card" onClick={() => navigate("/results")}>
              <h3>Результаты</h3>
              <p>
                Контроль успеваемости и отслеживание прогресса обучения.
              </p>
            </div>

            <div className="welcome-card" onClick={() => navigate("/profile")}>
              <h3>Профиль</h3>
              <p>
                Просмотр информации о пользователе и его учебной группе.
              </p>
            </div>
          </section>

          {isAdmin && (
            <section className="admin-section">
              <div className="welcome-card" onClick={() => navigate("/students")}>
                <h3>Результаты студентов</h3>
                <p>
                  Переход к просмотру общей информации по успеваемости студентов.
                </p>
              </div>
            </section>
          )}

          <section className="info-grid">
            <div className="info-box">
              <h2>Назначение системы</h2>
              <p>
                Система предназначена для автоматизации учебного процесса:
                предоставления доступа к материалам, организации практических
                заданий и централизованного хранения результатов обучения.
              </p>
            </div>

            <div className="info-box">
              <h2>Начало работы</h2>
              <p>
                Для начала работы откройте меню в левом верхнем углу или выберите
                нужный раздел прямо на главной странице. Карточки позволяют быстро
                перейти к теории, практике, результатам и профилю.
              </p>
            </div>
          </section>

          <section className="bottom-note">
            <h2>Функциональные возможности</h2>
            <p>
              Платформа обеспечивает доступ к образовательному контенту,
              выполнение заданий, контроль результатов и управление учебным
              процессом через единый пользовательский интерфейс.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}