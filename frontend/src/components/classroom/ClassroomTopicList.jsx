const classroomTopics = [
  {
    id: "randomness-project-management",
    number: 1,
    title: "Учёт случайности при управлении проектами",
    description:
      "Случайная длительность работ, случайная стоимость, критические пути, вероятности и доверительные интервалы.",
  },
];

export default function ClassroomTopicList({ onOpenTopic }) {
  return (
    <main className="tm-page">
      <section className="tm-hero">
        <span className="tm-badge">Аудиторные работы</span>
        <h1>Аудиторные работы по дисциплине</h1>
        <p>
          Выберите тему, чтобы открыть материал с содержанием, формулами,
          таблицами, схемами, заданиями и расчётами.
        </p>
      </section>

      <section className="tm-section">
        <h2>Темы</h2>

        <div className="study-topic-list">
          {classroomTopics.map((topic) => (
            <button
              key={topic.id}
              type="button"
              className="study-topic-button"
              onClick={() => onOpenTopic(topic.id)}
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
    </main>
  );
}