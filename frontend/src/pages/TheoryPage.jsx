import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../api/auth";
import "../styles/study.css";

const theoryTopics = [
  {
    id: "time-management",
    title: "Управление временем проекта",
    shortDescription: "График, формулы и расчеты.",
    content: {
      intro:
        "Краткий материал по теме: сетевой график, прямой проход, обратный проход и определение критического пути.",
      graphImage: "/theory/graph20.png",
      graphAlt: "Сетевой график по теме управление временем проекта",
      directPass: {
        title: "Прямой проход",
        description:
          "Прямой проход выполняется от начального события к завершающему. Для каждого события определяется ранний срок его наступления.",
        formula: "ES₀ = 0,  ESⱼ = max(ESᵢ + Dᵢⱼ)",
        calculations: [
          "ES₁ = ES₀ + D₀₁ = 0 + 2 = 2",
          "ES₂ = ES₀ + D₀₂ = 0 + 3 = 3",
          "ES₃ = max{2 + 2; 3 + 3} = 6",
          "ES₄ = max{3 + 2; 6 + 0} = 6",
          "ES₅ = max{6 + 3; 6 + 7} = 13",
          "ES₆ = max{6 + 2; 6 + 5; 13 + 6} = 19"
        ]
      },
      backwardPass: {
        title: "Обратный проход",
        description:
          "Обратный проход выполняется от завершающего события к начальному. Для каждого события определяется поздний срок его наступления.",
        formula: "LFₙ = ESₙ,  LFᵢ = min(LFⱼ − Dᵢⱼ)",
        calculations: [
          "LF₆ = ES₆ = 19",
          "LF₅ = LF₆ − D₅₆ = 19 − 6 = 13",
          "LF₄ = min{13 − 7; 19 − 5} = 6",
          "LF₃ = min{6 − 0; 13 − 3; 19 − 2} = 6",
          "LF₂ = min{6 − 3; 6 − 2} = 3",
          "LF₁ = LF₃ − 2 = 4",
          "LF₀ = min{4 − 2; 3 − 3} = 0"
        ]
      },
      criticalPath: {
        title: "Критический путь",
        description:
          "Работа принадлежит критическому пути, если у нее отсутствует запас времени.",
        conditions: [
          "ESᵢ = LFᵢ",
          "ESⱼ = LFⱼ",
          "ESⱼ − ESᵢ = LFⱼ − LFᵢ = Dᵢⱼ"
        ],
        result:
          "Для данного примера критический путь включает операции: B, D, F, I, L."
      }
    }
  },
  {
    id: "next-topic",
    title: "Следующая тема",
    shortDescription: "Пока заготовка.",
    content: {
      intro: "Материал по следующей теме будет добавлен позже."
    }
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

function TheoryTopicContent({ topic }) {
  if (topic.id !== "time-management") {
    return (
      <>
        <div className="study-hero compact-hero">
          <div className="study-badge">Теория</div>
          <h1>{topic.title}</h1>
          <p>{topic.content.intro}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="study-hero compact-hero">
        <div className="study-badge">Теория</div>
        <h1>{topic.title}</h1>
        <p>{topic.content.intro}</p>
      </div>

      <article className="study-section-card">
        <h2>Сетевой график</h2>
        <div className="theory-image-card">
          <img
            src={topic.content.graphImage}
            alt={topic.content.graphAlt}
            className="theory-page-image"
          />
        </div>
      </article>

      <article className="study-section-card">
        <h2>{topic.content.directPass.title}</h2>
        <p>{topic.content.directPass.description}</p>

        <div className="formula-card single-formula">
          {topic.content.directPass.formula}
        </div>

        <div className="calc-list">
          {topic.content.directPass.calculations.map((item) => (
            <div key={item} className="calc-item">
              {item}
            </div>
          ))}
        </div>
      </article>

      <article className="study-section-card">
        <h2>{topic.content.backwardPass.title}</h2>
        <p>{topic.content.backwardPass.description}</p>

        <div className="formula-card single-formula">
          {topic.content.backwardPass.formula}
        </div>

        <div className="calc-list">
          {topic.content.backwardPass.calculations.map((item) => (
            <div key={item} className="calc-item">
              {item}
            </div>
          ))}
        </div>
      </article>

      <article className="study-section-card">
        <h2>{topic.content.criticalPath.title}</h2>
        <p>{topic.content.criticalPath.description}</p>

        <div className="formula-grid">
          {topic.content.criticalPath.conditions.map((item) => (
            <div key={item} className="formula-card">
              {item}
            </div>
          ))}
        </div>

        <div className="result-box">{topic.content.criticalPath.result}</div>
      </article>
    </>
  );
}

export default function TheoryPage() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTopicId, setActiveTopicId] = useState("time-management");

  const isAdmin = user?.role === "admin";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const activeTopic = useMemo(
    () => theoryTopics.find((topic) => topic.id === activeTopicId) ?? theoryTopics[0],
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
        current="theory"
      />

      <main className="home-main">
        <div className="study-layout">
          <aside className="study-sidebar">
            <div className="study-sidebar-card">
              <div className="study-sidebar-title">Темы</div>
              <div className="study-sidebar-subtitle">
                Краткие материалы по дисциплине
              </div>

              <div className="study-topic-list">
                {theoryTopics.map((topic, index) => (
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
            <TheoryTopicContent topic={activeTopic} />
          </section>
        </div>
      </main>
    </div>
  );
}