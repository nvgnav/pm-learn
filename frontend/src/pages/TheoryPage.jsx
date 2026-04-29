import { useState } from "react";
import PageLayout from "../components/PageLayout";
import TheoryTimePage from "./TheoryTimePage";
import "../styles/study.css";

const theoryTopics = [
  {
    id: "time-management",
    number: 1,
    title: "Управление временем проекта",
    description:
      "Сетевые модели, критический путь, резервы времени, модель «дуга–работа» и «узел–работа».",
  },
];

export default function TheoryPage() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  if (selectedTopic === "time-management") {
    return <TheoryTimePage onBack={() => setSelectedTopic(null)} />;
  }

  return (
    <PageLayout title="Теория" activePage="theory">
      <div className="tm-page">
        <section className="tm-hero">
          <span className="tm-badge">Теория</span>
          <h1>Краткие теоретические материалы по дисциплине</h1>
          <p>
            Выберите тему, чтобы открыть полный теоретический материал с
            формулами, таблицами и схемами.
          </p>
        </section>

        <section className="tm-section">
          <h2>Темы</h2>

          <div className="study-topic-list">
            {theoryTopics.map((topic) => (
              <button
                key={topic.id}
                type="button"
                className="study-topic-button"
                onClick={() => setSelectedTopic(topic.id)}
              >
                <span className="study-topic-number">{topic.number}</span>

                <span>
                  <span className="study-topic-title">{topic.title}</span>
                  <span className="study-topic-description">
                    {topic.description}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}