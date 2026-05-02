import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import "../styles/study.css";

const STORAGE_KEY = "pm_practice_state";

function sumErrors(errorsGroup = {}, fields = []) {
  return Object.values(errorsGroup).reduce((sum, item) => {
    return sum + fields.filter((field) => item?.[field]).length;
  }, 0);
}

function buildResults(variant, errors) {
  if (!variant || !errors) return [];

  if (variant.type === "aon") {
    return [
      { title: "Исходные данные работ", description: "Ошибки в названии работы или длительности.", count: sumErrors(errors.works, ["work", "duration"]) },
      { title: "Ранние сроки работ", description: "Ошибки в ES и EF.", count: sumErrors(errors.works, ["ES", "EF"]) },
      { title: "Поздние сроки работ", description: "Ошибки в LS и LF.", count: sumErrors(errors.works, ["LS", "LF"]) },
      { title: "Резерв времени", description: "Ошибки в резерве работы.", count: sumErrors(errors.works, ["reserve"]) },
      { title: "Критические работы", description: "Ошибки в определении критичности работы.", count: sumErrors(errors.works, ["critical"]) },
    ];
  }

  return [
    { title: "События сетевого графика", description: "Ошибки в ES, LF и T.", count: sumErrors(errors.events, ["ES", "LF", "T"]) },
    { title: "Структура работ", description: "Ошибки в пути работы i→j или длительности Dij.", count: sumErrors(errors.works, ["path", "Dij"]) },
    { title: "Ранние сроки работ", description: "Ошибки в ES и EF.", count: sumErrors(errors.works, ["ES", "EF"]) },
    { title: "Поздние сроки работ", description: "Ошибки в LS и LF.", count: sumErrors(errors.works, ["LS", "LF"]) },
    { title: "Резервы времени", description: "Ошибки в TF, SF, FF и IF.", count: sumErrors(errors.works, ["TF", "SF", "FF", "IF"]) },
  ];
}

function countTotalErrors(variant, errors) {
  return buildResults(variant, errors).reduce((sum, group) => sum + group.count, 0);
}

export default function ResultsPage({ onBack }) {
  const [state, setState] = useState(null);
  const [openTopic, setOpenTopic] = useState(false);
  const [openAttemptIndex, setOpenAttemptIndex] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      setState(null);
      return;
    }

    try {
      setState(JSON.parse(saved));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      setState(null);
    }
  }, []);

  const attempts = state?.attempts || [];

  return (
    <PageLayout title="Результаты" activePage="results">
      <main className="tm-page">
        <section className="tm-hero">
          {onBack && (
            <button type="button" className="tm-top-back" onClick={onBack}>
              ← Назад к заданию
            </button>
          )}

          <span className="tm-badge">Результаты</span>

          <h1>Результаты проверок</h1>

          <p>
            Здесь сохраняются попытки прохождения практической работы по теме.
          </p>
        </section>

        <section className="tm-section">
          <h2>Темы</h2>

          <div className="study-topic-list">
            <button
              type="button"
              className="study-topic-button"
              onClick={() => setOpenTopic((prev) => !prev)}
            >
              <span className="study-topic-number">1</span>

              <span>
                <span className="study-topic-title">
                  Управление временем проекта
                </span>

                <span className="study-topic-description">
                  {attempts.length
                    ? `Сохранено попыток: ${attempts.length}`
                    : "Пока нет сохранённых попыток."}
                </span>
              </span>
            </button>
          </div>

          {openTopic && (
            <div className="practice-results-list">
              {attempts.length === 0 && (
                <div className="practice-result-card">
                  <div>
                    <h3>Попыток пока нет</h3>
                    <p>Сначала откройте практику и нажмите кнопку «Проверить».</p>
                  </div>
                </div>
              )}

              {attempts.map((attempt, index) => {
                const totalErrors = countTotalErrors(attempt.variant, attempt.errors);
                const groups = buildResults(attempt.variant, attempt.errors);
                const isOpen = openAttemptIndex === index;

                return (
                  <div key={attempt.id} className="practice-result-attempt">
                    <button
                      type="button"
                      className="study-topic-button"
                      onClick={() =>
                        setOpenAttemptIndex(isOpen ? null : index)
                      }
                    >
                      <span className="study-topic-number">{index + 1}</span>

                      <span>
                        <span className="study-topic-title">
                          Попытка {index + 1}: {attempt.variant?.title}
                        </span>

                        <span className="study-topic-description">
                          Ошибок: {totalErrors}. Дата: {attempt.date}
                        </span>
                      </span>
                    </button>

                    {isOpen && (
                      <div className="practice-results-list">
                        {groups.map((group) => (
                          <div
                            key={group.title}
                            className={
                              group.count > 0
                                ? "practice-result-card practice-result-card-error"
                                : "practice-result-card"
                            }
                          >
                            <div>
                              <h3>{group.title}</h3>
                              <p>{group.description}</p>
                            </div>

                            <span className="practice-result-count">
                              {group.count}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </PageLayout>
  );
}