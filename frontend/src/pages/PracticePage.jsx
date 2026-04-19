import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../api/auth";
import "../styles/study.css";

const practiceTopics = [
  {
    id: "time-management-practice",
    title: "Практика: управление временем проекта",
    shortDescription:
      "Разбор структуры задания, что нужно посчитать и в каком порядке выполнять работу.",
    taskTitle: "Задание 1. Расчет сетевого графика проекта",
    sections: [
      {
        title: "Что нужно сделать",
        paragraphs: [
          "Для заданного сетевого графика в терминах «дуга–работа» необходимо выполнить полный расчет временных параметров проекта.",
          "По каждому событию нужно определить ранний срок наступления, поздний срок наступления и резерв времени события."
        ]
      },
      {
        title: "Что нужно найти для каждой работы",
        bullets: [
          "Ранний срок начала работы.",
          "Ранний срок окончания работы.",
          "Поздний срок начала работы.",
          "Поздний срок окончания работы.",
          "Полный резерв времени.",
          "Гарантированный резерв времени.",
          "Свободный резерв времени.",
          "Независимый резерв времени."
        ]
      },
      {
        title: "Порядок выполнения задания",
        bullets: [
          "Построить или внимательно прочитать исходный сетевой график.",
          "Выполнить прямой проход по сети и найти ранние сроки событий.",
          "Выполнить обратный проход и найти поздние сроки событий.",
          "Определить критический путь проекта.",
          "Для каждой работы вычислить ранние и поздние сроки.",
          "Для некритических работ найти все виды резервов времени.",
          "Свести результаты в итоговую таблицу."
        ]
      },
      {
        title: "Что должно быть в результате",
        paragraphs: [
          "В итоговом решении должен быть сам сетевой график с подписанными параметрами событий и таблица со всеми расчетами по работам.",
          "Если работа лежит на критическом пути, ее резерв времени должен быть равен нулю."
        ]
      },
      {
        title: "Как оформить решение на странице",
        bullets: [
          "Название задания.",
          "Краткое условие.",
          "Алгоритм решения.",
          "Список того, что нужно вычислить.",
          "Таблица результатов.",
          "Вывод по критическому пути и резервам."
        ]
      },
      {
        title: "Подсказка",
        paragraphs: [
          "Сейчас на странице подготовлена правильная структура практического блока под эту тему. Когда будем делать именно решение первого варианта, сюда уже можно добавить сам график, формулы, промежуточные вычисления и итоговую таблицу."
        ]
      }
    ]
  },
  {
    id: "next-practice",
    title: "Следующая практическая тема",
    shortDescription: "Пока заготовка для следующего практического задания.",
    taskTitle: "Следующее задание будет добавлено позже",
    sections: [
      {
        title: "Материал будет добавлен позже",
        paragraphs: [
          "Этот пункт оставлен специально, чтобы структура практики уже была такой же, как и у теории: с содержанием по темам и отдельным блоком текущего задания."
        ]
      }
    ]
  }
];

function SideMenu({ menuOpen, navigate, isAdmin, handleLogout, current }) {
  return (
    <div className={`side-menu ${menuOpen ? "open" : ""}`}>
      <div className="side-menu-title">Меню</div>

      <button className="side-menu-item" onClick={() => navigate("/home")}>
        Главная
      </button>

      <button
        className={`side-menu-item ${current === "theory" ? "selected" : ""}`}
        onClick={() => navigate("/theory")}
      >
        Теория
      </button>

      <button
        className={`side-menu-item ${current === "practice" ? "selected" : ""}`}
        onClick={() => navigate("/practice")}
      >
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
  );
}

export default function PracticePage() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTopicId, setActiveTopicId] = useState("time-management-practice");

  const isAdmin = user?.role === "admin";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const activeTopic = useMemo(
    () => practiceTopics.find((topic) => topic.id === activeTopicId) ?? practiceTopics[0],
    [activeTopicId]
  );

  return (
    <div className="home-page">
      <header className="home-header">
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ⋯
        </button>
        <div className="home-header-title">PM-Learn</div>
      </header>

      <SideMenu
        menuOpen={menuOpen}
        navigate={navigate}
        isAdmin={isAdmin}
        handleLogout={handleLogout}
        current="practice"
      />

      <main className="home-main">
        <div className="study-layout">
          <aside className="study-sidebar">
            <div className="study-sidebar-card">
              <div className="study-sidebar-title">Практика по темам</div>
              <div className="study-sidebar-subtitle">
                Структура такая же, как в теории.
              </div>

              <div className="study-topic-list">
                {practiceTopics.map((topic, index) => (
                  <button
                    key={topic.id}
                    className={`study-topic-button ${
                      topic.id === activeTopicId ? "active" : ""
                    }`}
                    onClick={() => setActiveTopicId(topic.id)}
                  >
                    <span className="study-topic-number">{index + 1}.</span>
                    <span>
                      <span className="study-topic-title">{topic.title}</span>
                      <span className="study-topic-description">
                        {topic.shortDescription}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <section className="study-content">
            <div className="study-hero">
              <div className="study-badge practice-badge">Практика</div>
              <h1>{activeTopic.taskTitle}</h1>
              <p>
                На этой странице собрана структура практического задания и логика его
                выполнения по теме.
              </p>
            </div>

            <article className="study-section-card practice-highlight">
              <h2>Краткое условие</h2>
              <p>
                Для заданного сетевого графика нужно найти параметры событий и работ,
                определить критический путь и оформить все результаты в таблицу.
              </p>
            </article>

            {activeTopic.sections.map((section) => (
              <article key={section.title} className="study-section-card">
                <h2>{section.title}</h2>

                {section.paragraphs?.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}

                {section.bullets?.length ? (
                  <ul className="study-list">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}

            <article className="study-section-card">
              <h2>Шаблон итоговой структуры решения</h2>
              <ol className="study-number-list">
                <li>Исходный сетевой график.</li>
                <li>Ранние сроки событий.</li>
                <li>Поздние сроки событий.</li>
                <li>Резервы времени событий.</li>
                <li>Параметры всех работ.</li>
                <li>Критический путь.</li>
                <li>Итоговая таблица.</li>
                <li>Краткий вывод.</li>
              </ol>
            </article>
          </section>
        </div>
      </main>
    </div>
  );
}