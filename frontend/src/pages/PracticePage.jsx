import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import "../styles/study.css";

import { practiceVariants } from "../data/practice";
import NetworkGraph from "../components/practice/NetworkGraph";
import { checkSolution } from "../utils/checkPracticeSolution";
import ResultsPage from "./ResultsPage";
import { savePracticeResult } from "../api/practiceResults";

const variants = Object.values(practiceVariants);
const STORAGE_KEY = "pm_practice_state";

function pickRandomVariant() {
  return variants[Math.floor(Math.random() * variants.length)];
}

function getVariantTypeTitle(type) {
  if (type === "aoa") return "дуга–работа";
  if (type === "aon") return "узел–работа";
  return type;
}

function createEmptyStudentData(variant) {
  if (variant.type === "aon") {
    return {
      events: {},
      works: variant.rows.map(() => ({
        work: "",
        duration: "",
        ES: "",
        EF: "",
        LS: "",
        LF: "",
        reserve: "",
        critical: "",
      })),
    };
  }

  return {
    events: {},
    works: variant.works.map(() => ({
      from: "",
      to: "",
      Dij: "",
      ES: "",
      EF: "",
      LS: "",
      LF: "",
      TF: "",
      SF: "",
      FF: "",
      IF: "",
    })),
  };
}

function countErrors(result) {
  const eventErrors = Object.values(result.events || {}).reduce((sum, item) => {
    return sum + Object.values(item || {}).filter(Boolean).length;
  }, 0);

  const workErrors = Object.values(result.works || {}).reduce((sum, item) => {
    return sum + Object.values(item || {}).filter(Boolean).length;
  }, 0);

  return eventErrors + workErrors;
}

function TaskBlock({ type }) {
  if (type === "aon") {
    return (
      <section className="tm-section">
        <h2>Задание</h2>

        <div className="tm-text">
          <p>Задан сетевой график в терминах «узел–работа».</p>

          <p>
            Для каждой работы необходимо определить все основные временные
            характеристики:
          </p>

          <ul className="tm-list">
            <li>
              ранние сроки начала и окончания работы —{" "}
              <span className="tm-formula">ES</span>,{" "}
              <span className="tm-formula">EF</span>;
            </li>

            <li>
              поздние сроки начала и окончания работы —{" "}
              <span className="tm-formula">LS</span>,{" "}
              <span className="tm-formula">LF</span>;
            </li>

            <li>
              резерв времени работы —{" "}
              <span className="tm-formula">R = LS − ES = LF − EF</span>;
            </li>

            <li>определить, является ли работа критической.</li>
          </ul>

          <p>Результаты вычислений свести в таблицу.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="tm-section">
      <h2>Задание</h2>

      <div className="tm-text">
        <p>
          Для каждого события, заданного своим ID, определить и отобразить на
          сетевом графике:
        </p>

        <ol className="tm-list">
          <li>
            ранний срок начала <span className="tm-formula">ES</span>;
          </li>

          <li>
            поздний срок окончания <span className="tm-formula">LF</span>;
          </li>

          <li>
            резерв времени события <span className="tm-formula">T</span>.
          </li>
        </ol>

        <p>
          Для каждой работы определить все её возможные временные характеристики
          и резервы времени:
        </p>

        <ul className="tm-list">
          <li>
            ранние сроки начала и окончания работы —{" "}
            <span className="tm-formula">ES</span>,{" "}
            <span className="tm-formula">EF</span>;
          </li>

          <li>
            поздние сроки начала и окончания работы —{" "}
            <span className="tm-formula">LS</span>,{" "}
            <span className="tm-formula">LF</span>;
          </li>

          <li>
            полный, гарантированный, свободный и независимый резервы времени —{" "}
            <span className="tm-formula">TF</span>,{" "}
            <span className="tm-formula">SF</span>,{" "}
            <span className="tm-formula">FF</span>,{" "}
            <span className="tm-formula">IF</span>.
          </li>
        </ul>

        <p>Результаты вычислений свести в таблицу.</p>
      </div>
    </section>
  );
}

export default function PracticePage() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [variant, setVariant] = useState(null);
  const [studentData, setStudentData] = useState({ events: {}, works: [] });
  const [errors, setErrors] = useState(null);
  const [notes, setNotes] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);

      if (parsed.variantId && practiceVariants[parsed.variantId]) {
        const savedVariant = practiceVariants[parsed.variantId];

        setSelectedTopic("time-management");
        setVariant(savedVariant);
        setStudentData(parsed.studentData || createEmptyStudentData(savedVariant));
        setErrors(parsed.errors || null);
        setNotes(parsed.notes || "");
        setShowResults(parsed.showResults || false);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (!variant) return;

    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : {};

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...parsed,
        variantId: variant.id,
        studentData,
        errors,
        notes,
        showResults,
        attempts: parsed.attempts || [],
      })
    );
  }, [variant, studentData, errors, notes, showResults]);

  function openTopic() {
    const randomVariant = pickRandomVariant();

    setSelectedTopic("time-management");
    setVariant(randomVariant);
    setStudentData(createEmptyStudentData(randomVariant));
    setErrors(null);
    setNotes("");
    setShowResults(false);
    setSaveError("");
  }

  function backToTopics() {
    localStorage.removeItem(STORAGE_KEY);

    setSelectedTopic(null);
    setVariant(null);
    setStudentData({ events: {}, works: [] });
    setErrors(null);
    setNotes("");
    setShowResults(false);
    setSaveError("");
  }

  function changeVariant() {
    const randomVariant = pickRandomVariant();

    setVariant(randomVariant);
    setStudentData(createEmptyStudentData(randomVariant));
    setErrors(null);
    setNotes("");
    setShowResults(false);
    setSaveError("");
  }

  async function handleCheck() {
    const result = checkSolution(variant, studentData);
    const totalErrors = countErrors(result);

    setErrors(result);
    setSaveError("");

    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : {};

    const attempt = {
      id: Date.now(),
      date: new Date().toLocaleString("ru-RU"),
      variant,
      errors: result,
      studentData,
      totalErrors,
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...parsed,
        variantId: variant.id,
        studentData,
        errors: result,
        notes,
        showResults: true,
        attempts: [...(parsed.attempts || []), attempt],
      })
    );

    try {
      await savePracticeResult({
        variant_id: variant.id,
        variant_title: variant.title,
        variant_type: variant.type,
        student_data: studentData,
        errors: result,
        total_errors: totalErrors,
      });
    } catch (error) {
      console.error(error);
      setSaveError("Результат сохранён локально, но не записан в базу данных.");
    }

    setShowResults(true);
  }

  function updateEvent(id, field, value) {
    const preparedValue = value === "" ? "" : Number(value);

    setStudentData((prev) => {
      const currentEvent = {
        ...prev.events[id],
        [field]: preparedValue,
      };

      if (
        currentEvent.ES !== undefined &&
        currentEvent.ES !== "" &&
        currentEvent.LF !== undefined &&
        currentEvent.LF !== ""
      ) {
        currentEvent.T = Number(currentEvent.LF) - Number(currentEvent.ES);
      }

      return {
        ...prev,
        events: {
          ...prev.events,
          [id]: currentEvent,
        },
      };
    });
  }

  function updateWork(index, field, value) {
    const preparedValue =
      field === "from" ||
      field === "to" ||
      field === "work" ||
      field === "critical" ||
      value === ""
        ? value
        : Number(value);

    setStudentData((prev) => {
      const updatedWorks = [...prev.works];

      updatedWorks[index] = {
        ...updatedWorks[index],
        [field]: preparedValue,
      };

      return {
        ...prev,
        works: updatedWorks,
      };
    });
  }

  if (showResults && variant && errors) {
    return (
      <ResultsPage
        variant={variant}
        errors={errors}
        onBack={() => setShowResults(false)}
      />
    );
  }

  if (selectedTopic === "time-management" && variant) {
    return (
      <PageLayout title="Практические работы" activePage="practice">
        <main className="tm-page">
          <section className="tm-hero">
            <button type="button" className="tm-top-back" onClick={backToTopics}>
              ← К списку тем
            </button>

            <span className="tm-badge">Практическая работа</span>

            <h1>Управление временем проекта</h1>

            <p>Заполните таблицы и определите параметры сетевой модели.</p>
          </section>

          <section className="tm-section">
            <h2>Случайный вариант</h2>

            <p className="tm-text-block">
              <strong>{variant.title}</strong>
              <br />
              Тип модели: {getVariantTypeTitle(variant.type)}
            </p>

            <button type="button" className="tm-download" onClick={changeVariant}>
              Получить другой вариант
            </button>
          </section>

          {variant.type === "aoa" && (
            <section className="tm-section">
              <h2>Сетевой график</h2>

              <NetworkGraph
                variant={variant}
                studentData={studentData}
                errors={errors}
              />
            </section>
          )}

          <TaskBlock type={variant.type} />

          {variant.type === "aon" && (
            <section className="tm-section">
              <h2>Исходные данные варианта</h2>

              <div className="tm-table-scroll">
                <table className="tm-table tm-practice-table">
                  <thead>
                    <tr>
                      <th>Работа</th>
                      <th>Последователи</th>
                      <th>Предшественники</th>
                      <th>Длительность</th>
                    </tr>
                  </thead>

                  <tbody>
                    {variant.rows.map((row) => (
                      <tr key={row.work}>
                        <td>{row.work}</td>
                        <td>{row.next.length ? row.next.join(", ") : "нет"}</td>
                        <td>{row.prev.length ? row.prev.join(", ") : "нет"}</td>
                        <td>{row.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {variant.type === "aoa" && (
            <section className="tm-section">
              <h2>События</h2>

              <div className="tm-table-scroll">
                <table className="tm-table tm-practice-table tm-events-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>ES</th>
                      <th>LF</th>
                      <th>T</th>
                    </tr>
                  </thead>

                  <tbody>
                    {variant.events.map((event) => (
                      <tr key={event.id}>
                        <td>{event.id}</td>

                        {["ES", "LF", "T"].map((field) => (
                          <td key={field}>
                            <input
                              className={`tm-practice-input ${
                                errors?.events?.[event.id]?.[field]
                                  ? "input-error"
                                  : ""
                              }`}
                              value={studentData.events[event.id]?.[field] ?? ""}
                              onChange={(e) =>
                                updateEvent(event.id, field, e.target.value)
                              }
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {variant.type === "aoa" && (
            <section className="tm-section">
              <h2>Работы</h2>

              <div className="tm-table-scroll">
                <table className="tm-table tm-practice-table">
                  <thead>
                    <tr>
                      <th>Работа</th>
                      <th>Dij</th>
                      <th>ES</th>
                      <th>EF</th>
                      <th>LS</th>
                      <th>LF</th>
                      <th>TF</th>
                      <th>SF</th>
                      <th>FF</th>
                      <th>IF</th>
                    </tr>
                  </thead>

                  <tbody>
                    {studentData.works.map((work, index) => (
                      <tr key={index}>
                        <td>
                          <div className="tm-path-cell">
                            <input
                              className={`tm-practice-input tm-path-input ${
                                errors?.works?.[index]?.path
                                  ? "input-error"
                                  : ""
                              }`}
                              value={work.from}
                              onChange={(e) =>
                                updateWork(index, "from", e.target.value)
                              }
                            />

                            <span className="tm-path-arrow">→</span>

                            <input
                              className={`tm-practice-input tm-path-input ${
                                errors?.works?.[index]?.path
                                  ? "input-error"
                                  : ""
                              }`}
                              value={work.to}
                              onChange={(e) =>
                                updateWork(index, "to", e.target.value)
                              }
                            />
                          </div>
                        </td>

                        {[
                          "Dij",
                          "ES",
                          "EF",
                          "LS",
                          "LF",
                          "TF",
                          "SF",
                          "FF",
                          "IF",
                        ].map((field) => (
                          <td key={field}>
                            <input
                              className={`tm-practice-input ${
                                errors?.works?.[index]?.[field]
                                  ? "input-error"
                                  : ""
                              }`}
                              value={work[field] ?? ""}
                              onChange={(e) =>
                                updateWork(index, field, e.target.value)
                              }
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {variant.type === "aon" && (
            <section className="tm-section">
              <h2>Таблица решения</h2>

              <div className="tm-table-scroll">
                <table className="tm-table tm-practice-table">
                  <thead>
                    <tr>
                      <th>Работа</th>
                      <th>Длительность</th>
                      <th>ES</th>
                      <th>EF</th>
                      <th>LS</th>
                      <th>LF</th>
                      <th>Резерв</th>
                      <th>Критическая</th>
                    </tr>
                  </thead>

                  <tbody>
                    {studentData.works.map((work, index) => (
                      <tr key={index}>
                        {[
                          "work",
                          "duration",
                          "ES",
                          "EF",
                          "LS",
                          "LF",
                          "reserve",
                          "critical",
                        ].map((field) => (
                          <td key={field}>
                            <input
                              className={`tm-practice-input ${
                                field === "work" ? "tm-path-input" : ""
                              } ${
                                errors?.works?.[index]?.[field]
                                  ? "input-error"
                                  : ""
                              }`}
                              value={work[field] ?? ""}
                              placeholder={field === "critical" ? "Да/Нет" : ""}
                              onChange={(e) =>
                                updateWork(index, field, e.target.value)
                              }
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          <section className="tm-section">
            <button type="button" className="tm-download" onClick={handleCheck}>
              Проверить
            </button>

            {saveError && <p className="tm-error-text">{saveError}</p>}
          </section>

          <section className="tm-section">
            <h2>Мои заметки</h2>

            <textarea
              className="tm-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Пиши ход решения..."
            />
          </section>
        </main>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Практические работы" activePage="practice">
      <main className="tm-page">
        <section className="tm-hero">
          <span className="tm-badge">Практические работы</span>

          <h1>Практические работы по дисциплине</h1>

          <p>Выберите тему, чтобы открыть практическую работу.</p>
        </section>

        <section className="tm-section">
          <h2>Темы</h2>

          <div className="study-topic-list">
            <button
              type="button"
              className="study-topic-button"
              onClick={openTopic}
            >
              <span className="study-topic-number">1</span>

              <span>
                <span className="study-topic-title">
                  Управление временем проекта
                </span>

                <span className="study-topic-description">
                  Расчет сетевого графика
                </span>
              </span>
            </button>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}