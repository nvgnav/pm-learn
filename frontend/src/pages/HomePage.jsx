import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../api/auth";
import PageLayout from "../components/PageLayout";

export default function HomePage() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const isAdmin = user?.role === "admin";

  return (
    <PageLayout activePage="home">
      <div className="home-dashboard">
        <section className="welcome-block">
          <h1>Добро пожаловать в PM-Learn</h1>
          <p className="welcome-text">
            PM-Learn — это учебная информационная система, объединяющая
            теоретические материалы, практические и аудиторные работы,
            а также результаты обучения в едином интерфейсе.
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
            <p>Изучение теоретических материалов по разделам дисциплины.</p>
          </div>

          <div className="welcome-card" onClick={() => navigate("/practice")}>
            <h3>Практические работы</h3>
            <p>Самостоятельное выполнение заданий по случайному варианту.</p>
          </div>

          <div className="welcome-card" onClick={() => navigate("/classroom")}>
            <h3>Аудиторные работы</h3>
            <p>Разбор заданий по случайности времени, стоимости и рискам проекта.</p>
          </div>

          <div className="welcome-card" onClick={() => navigate("/results")}>
            <h3>Результаты</h3>
            <p>Просмотр текущего прогресса и результатов выполненных работ.</p>
          </div>

          <div className="welcome-card" onClick={() => navigate("/profile")}>
            <h3>Профиль</h3>
            <p>Просмотр данных пользователя, роли и учебной группы.</p>
          </div>
        </section>

        {isAdmin && (
          <section className="admin-section">
            <div className="welcome-card" onClick={() => navigate("/students")}>
              <h3>Результаты студентов</h3>
              <p>Переход к общей информации по успеваемости студентов.</p>
            </div>
          </section>
        )}

        <section className="info-grid">
          <div className="info-box">
            <h2>Назначение системы</h2>
            <p>
              Система предназначена для организации учебного процесса:
              предоставления доступа к материалам, выполнения расчётных заданий
              и централизованного хранения результатов обучения.
            </p>
          </div>

          <div className="info-box">
            <h2>Начало работы</h2>
            <p>
              Для начала работы выберите нужный раздел с главной страницы
              или откройте меню в левом верхнем углу.
            </p>
          </div>
        </section>

        <section className="bottom-note">
          <h2>Функциональные возможности</h2>
          <p>
            Платформа объединяет теорию, практику, аудиторные задания,
            результаты пользователей и административный контроль.
          </p>
        </section>
      </div>
    </PageLayout>
  );
}