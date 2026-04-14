import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../api/auth";

export default function HomePage() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState("");

  const isAdmin = user?.role === "admin";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function handleSelect(page) {
    setSelectedPage(page);
    setMenuOpen(false);
  }

  const pageContent = useMemo(() => {
    switch (selectedPage) {
      case "theory":
        return {
          title: "Теоретические материалы",
          text: "В этом разделе будут размещены теоретические материалы по дисциплине. Пользователь сможет открывать темы, изучать их по модулям и возвращаться к нужным разделам в любое время.",
        };
      case "practice":
        return {
          title: "Практические задания",
          text: "В этом разделе будут доступны практические задания. Здесь можно будет читать условие, выполнять работу и отправлять решение на проверку.",
        };
      case "results":
        return {
          title: "Мои результаты",
          text: "Здесь будет отображаться прогресс пользователя: количество выполненных заданий, текущие оценки, статусы проверок и общая успеваемость.",
        };
      case "profile":
        return {
          title: "Профиль пользователя",
          text: `ФИО: ${user?.full_name || "Не указано"}. Email: ${
            user?.email || "Не указан"
          }. Учебная группа: ${user?.group_name || "Не указана"}. Роль: ${
            user?.role || "Не указана"
          }.`,
        };
      case "students":
        return {
          title: "Результаты студентов",
          text: "Этот раздел доступен администратору. Здесь позже можно вывести список студентов, результаты по заданиям, баллы, статусы проверки и общий прогресс по каждому обучающемуся.",
        };
      default:
        return null;
    }
  }, [selectedPage, user]);

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

        <button className="side-menu-item" onClick={() => handleSelect("theory")}>
          Теория
        </button>

        <button className="side-menu-item" onClick={() => handleSelect("practice")}>
          Практика
        </button>

        <button className="side-menu-item" onClick={() => handleSelect("results")}>
          Мои результаты
        </button>

        <button className="side-menu-item" onClick={() => handleSelect("profile")}>
          Профиль
        </button>

        {isAdmin && (
          <button className="side-menu-item" onClick={() => handleSelect("students")}>
            Результаты студентов
          </button>
        )}

        <button className="side-menu-item logout-btn" onClick={handleLogout}>
          Выход
        </button>
      </div>

      <main className="home-main">
        {!pageContent ? (
          <div className="home-dashboard">
            <section className="welcome-block">
              <h1>Добро пожаловать в PM-Learn</h1>
              <p className="welcome-text">
                PM-Learn — это учебная информационная система, предназначенная для
                изучения теории, выполнения практических заданий и отслеживания
                результатов обучения в одном месте.
              </p>
            </section>

            <section className="user-summary">
              <div className="summary-card">
                <div className="summary-label">Пользователь</div>
                <div className="summary-value">{user?.full_name || "Не указано"}</div>
              </div>

              <div className="summary-card">
                <div className="summary-label">Роль</div>
                <div className="summary-value">{user?.role || "Не указана"}</div>
              </div>

              <div className="summary-card">
                <div className="summary-label">Группа</div>
                <div className="summary-value">{user?.group_name || "—"}</div>
              </div>

              <div className="summary-card">
                <div className="summary-label">Статус</div>
                <div className="summary-value">Активный доступ</div>
              </div>
            </section>

            <section className="welcome-cards">
              <div className="welcome-card">
                <h3>Теория</h3>
                <p>
                  Изучение учебных материалов по темам, модулям и разделам курса.
                </p>
              </div>

              <div className="welcome-card">
                <h3>Практика</h3>
                <p>
                  Выполнение практических заданий, отправка решений и получение
                  проверки.
                </p>
              </div>

              <div className="welcome-card">
                <h3>Результаты</h3>
                <p>
                  Просмотр прогресса, баллов, статусов и общей успеваемости по
                  выполненным работам.
                </p>
              </div>

              <div className="welcome-card">
                <h3>Профиль</h3>
                <p>
                  Просмотр информации о пользователе, его роли и принадлежности к
                  учебной группе.
                </p>
              </div>
            </section>

            <section className="info-grid">
              <div className="info-box">
                <h2>Что можно сделать в системе</h2>
                <p>
                  Пользователь может открывать материалы, переходить к заданиям,
                  просматривать результаты, а в дальнейшем — отправлять решения и
                  получать обратную связь по выполненным работам.
                </p>
              </div>

              <div className="info-box">
                <h2>Быстрый старт</h2>
                <p>
                  Для начала работы откройте меню слева, выберите нужный раздел и
                  перейдите к теории, практике или просмотру результатов.
                </p>
              </div>
            </section>

            <section className="bottom-note">
              <h2>Назначение платформы</h2>
              <p>
                Система создаётся как единое пространство для учебного процесса:
                изучение материалов, выполнение заданий, контроль прогресса и
                централизованный доступ к результатам обучения.
              </p>
            </section>
          </div>
        ) : (
          <div className="content-block">
            <h1>{pageContent.title}</h1>
            <p>{pageContent.text}</p>
          </div>
        )}
      </main>
    </div>
  );
}