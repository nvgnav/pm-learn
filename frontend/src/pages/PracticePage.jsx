import { useMemo, useState } from "react";
import PageLayout from "../components/PageLayout";
import "../styles/study.css";

const variants = [
  {
    id: 1,
    title: "Вариант 1",
    type: "узел–работа",
    rows: [
      { work: "A", next: ["B", "C"], prev: [], duration: 4 },
      { work: "B", next: ["D"], prev: ["A"], duration: 8 },
      { work: "C", next: ["E", "F", "G", "H"], prev: ["A"], duration: 6 },
      { work: "D", next: ["F", "G", "H"], prev: ["B"], duration: 2 },
      { work: "E", next: ["I"], prev: ["C"], duration: 4 },
      { work: "F", next: ["I"], prev: ["C", "D"], duration: 8 },
      { work: "G", next: ["K"], prev: ["C", "D"], duration: 6 },
      { work: "H", next: ["J"], prev: ["C", "D"], duration: 3 },
      { work: "I", next: ["K"], prev: ["E", "F"], duration: 4 },
      { work: "J", next: ["K"], prev: ["H"], duration: 5 },
      { work: "K", next: ["L", "M"], prev: ["G", "I", "J"], duration: 6 },
      { work: "L", next: ["N"], prev: ["K"], duration: 8 },
      { work: "M", next: [], prev: ["K"], duration: 3 },
      { work: "N", next: ["O"], prev: ["L"], duration: 8 },
      { work: "O", next: [], prev: ["N"], duration: 2 },
    ],
  },
  {
    id: 2,
    title: "Вариант 2",
    type: "узел–работа",
    rows: [
      { work: "A", next: ["D"], prev: [], duration: 10 },
      { work: "B", next: ["C", "H"], prev: [], duration: 8 },
      { work: "C", next: ["E", "F", "G"], prev: ["B"], duration: 12 },
      { work: "D", next: ["K"], prev: ["A"], duration: 8 },
      { work: "E", next: ["K"], prev: ["C"], duration: 7 },
      { work: "F", next: ["J"], prev: ["C"], duration: 6 },
      { work: "G", next: ["I", "L"], prev: ["C"], duration: 7 },
      { work: "H", next: ["I", "L"], prev: ["B"], duration: 8 },
      { work: "I", next: ["J"], prev: ["G", "H"], duration: 9 },
      { work: "J", next: ["M", "N"], prev: ["F", "I"], duration: 4 },
      { work: "K", next: ["M", "N"], prev: ["D", "E"], duration: 10 },
      { work: "L", next: ["M", "N"], prev: ["G", "H"], duration: 11 },
      { work: "M", next: [], prev: ["J", "K", "L"], duration: 10 },
      { work: "N", next: ["O"], prev: ["J", "K", "L"], duration: 4 },
      { work: "O", next: [], prev: ["N"], duration: 8 },
    ],
  },
  {
    id: 3,
    title: "Вариант 3",
    type: "узел–работа",
    rows: [
      { work: "A", next: ["C", "D"], prev: [], duration: 5 },
      { work: "B", next: ["F"], prev: [], duration: 7 },
      { work: "C", next: ["E"], prev: ["A"], duration: 9 },
      { work: "D", next: ["H", "I"], prev: ["A"], duration: 7 },
      { work: "E", next: ["G"], prev: ["C"], duration: 11 },
      { work: "F", next: ["J"], prev: ["B"], duration: 3 },
      { work: "G", next: ["K"], prev: ["E"], duration: 7 },
      { work: "H", next: ["K"], prev: ["D"], duration: 13 },
      { work: "I", next: ["L"], prev: ["D"], duration: 11 },
      { work: "J", next: ["L"], prev: ["F"], duration: 9 },
      { work: "K", next: ["O"], prev: ["G", "H"], duration: 7 },
      { work: "L", next: ["O", "M"], prev: ["I", "J"], duration: 15 },
      { work: "M", next: ["N"], prev: ["L"], duration: 13 },
      { work: "N", next: ["P"], prev: ["M"], duration: 9 },
      { work: "O", next: ["P"], prev: ["L", "K"], duration: 8 },
      { work: "P", next: [], prev: ["N", "O"], duration: 7 },
    ],
  },
  {
    id: 4,
    title: "Вариант 4",
    type: "узел–работа",
    rows: [
      { work: "A", next: ["B", "C"], prev: [], duration: 3 },
      { work: "B", next: ["E"], prev: ["A"], duration: 11 },
      { work: "C", next: ["D", "F"], prev: ["A"], duration: 4 },
      { work: "D", next: ["G", "I"], prev: ["C"], duration: 7 },
      { work: "E", next: ["G", "I"], prev: ["B"], duration: 3 },
      { work: "F", next: ["H", "L"], prev: ["C"], duration: 10 },
      { work: "G", next: ["H", "L"], prev: ["D", "E"], duration: 3 },
      { work: "H", next: ["K", "O"], prev: ["F", "G"], duration: 6 },
      { work: "I", next: ["K", "O"], prev: ["D", "E"], duration: 4 },
      { work: "J", next: ["K", "O"], prev: [], duration: 9 },
      { work: "K", next: ["M"], prev: ["H", "I", "J"], duration: 5 },
      { work: "L", next: ["M"], prev: ["F", "G"], duration: 9 },
      { work: "M", next: ["N"], prev: ["K", "L"], duration: 4 },
      { work: "N", next: [], prev: ["M"], duration: 7 },
      { work: "O", next: [], prev: ["H", "I", "J"], duration: 8 },
    ],
  },
  {
    id: 5,
    title: "Вариант 5",
    type: "узел–работа",
    rows: [
      { work: "A", next: ["C", "D", "E"], prev: [], duration: 6 },
      { work: "B", next: ["F"], prev: [], duration: 8 },
      { work: "C", next: ["J"], prev: ["A"], duration: 10 },
      { work: "D", next: ["G", "H", "I"], prev: ["A"], duration: 6 },
      { work: "E", next: ["F"], prev: ["A"], duration: 8 },
      { work: "F", next: ["G", "H", "I"], prev: ["B", "E"], duration: 10 },
      { work: "G", next: ["J"], prev: ["D", "F"], duration: 6 },
      { work: "H", next: ["K", "L"], prev: ["D", "F"], duration: 10 },
      { work: "I", next: ["N"], prev: ["D", "F"], duration: 12 },
      { work: "J", next: ["K", "L"], prev: ["C", "G"], duration: 8 },
      { work: "K", next: ["M"], prev: ["H", "J"], duration: 6 },
      { work: "L", next: ["N"], prev: ["H", "J"], duration: 14 },
      { work: "M", next: ["O"], prev: ["K"], duration: 8 },
      { work: "N", next: ["P"], prev: ["I", "L"], duration: 4 },
      { work: "O", next: [], prev: ["M"], duration: 6 },
      { work: "P", next: [], prev: ["N"], duration: 8 },
    ],
  },
];

function pickRandomVariant() {
  return variants[Math.floor(Math.random() * variants.length)];
}

function calculateSchedule(rows) {
  const map = new Map();

  rows.forEach((row) => {
    map.set(row.work, {
      ...row,
      ES: 0,
      EF: 0,
      LS: 0,
      LF: 0,
      reserve: 0,
      critical: false,
    });
  });

  const inDegree = new Map();

  rows.forEach((row) => {
    inDegree.set(row.work, row.prev.length);
  });

  const queue = rows
    .filter((row) => row.prev.length === 0)
    .map((row) => row.work);

  const topo = [];

  while (queue.length > 0) {
    const current = queue.shift();
    topo.push(current);

    map.get(current).next.forEach((next) => {
      inDegree.set(next, inDegree.get(next) - 1);

      if (inDegree.get(next) === 0) {
        queue.push(next);
      }
    });
  }

  topo.forEach((id) => {
    const node = map.get(id);

    node.ES =
      node.prev.length === 0
        ? 0
        : Math.max(...node.prev.map((prev) => map.get(prev).EF));

    node.EF = node.ES + node.duration;
  });

  const projectDuration = Math.max(...topo.map((id) => map.get(id).EF));

  [...topo].reverse().forEach((id) => {
    const node = map.get(id);

    node.LF =
      node.next.length === 0
        ? projectDuration
        : Math.min(...node.next.map((next) => map.get(next).LS));

    node.LS = node.LF - node.duration;
    node.reserve = node.LS - node.ES;
    node.critical = node.reserve === 0;
  });

  return {
    rows: rows.map((row) => map.get(row.work)),
    projectDuration,
    criticalPath: topo.filter((id) => map.get(id).critical),
  };
}

function VariantTable({ rows }) {
  return (
    <div className="tm-table-scroll">
      <table className="tm-table">
        <thead>
          <tr>
            <th>Работа</th>
            <th>Последователи</th>
            <th>Предшественники</th>
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
          {rows.map((row) => (
            <tr key={row.work}>
              <td>{row.work}</td>
              <td>{row.next.length ? row.next.join(", ") : "нет"}</td>
              <td>{row.prev.length ? row.prev.join(", ") : "нет"}</td>
              <td>{row.duration}</td>
              <td>{row.ES}</td>
              <td>{row.EF}</td>
              <td>{row.LS}</td>
              <td>{row.LF}</td>
              <td>{row.reserve}</td>
              <td>{row.critical ? "Да" : "Нет"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PracticeTopicPage({ variant, onBack, onChangeVariant }) {
  const calculation = useMemo(() => {
    return calculateSchedule(variant.rows);
  }, [variant]);

  return (
    <PageLayout title="Практические работы" activePage="practice">
      <main className="tm-page">
        <section className="tm-hero">
          <button className="tm-top-back" onClick={onBack}>
            ← К списку тем
          </button>

          <span className="tm-badge">Практическая работа</span>

          <h1>Управление временем проекта</h1>

          <p>
            Случайный вариант модели «узел–работа» из файла с вариантами.
            Необходимо выполнить расчёт сетевой модели, определить ранние и
            поздние сроки, резервы времени и критический путь.
          </p>
        </section>

        <section className="tm-section">
          <h2>Случайный вариант</h2>

          <div className="tm-note">
            <strong>{variant.title}</strong>
            <br />
            Тип модели: {variant.type}
            <br />
            Длительность проекта: {calculation.projectDuration}
            <br />
            Критический путь:{" "}
            {calculation.criticalPath.length
              ? calculation.criticalPath.join(" → ")
              : "не определён"}
          </div>

          <button type="button" className="tm-download" onClick={onChangeVariant}>
            Получить другой вариант
          </button>
        </section>

        <section className="tm-section">
          <h2>Задание</h2>

          <p>
            Для каждой работы необходимо определить ранние сроки начала и
            окончания работы, поздние сроки начала и окончания работы, а также
            резерв времени.
          </p>

          <div className="tm-formula-group">
            <p className="tm-formula-line">
              <span className="tm-formula">EF = ES + t</span>
            </p>
            <p className="tm-formula-line">
              <span className="tm-formula">LS = LF − t</span>
            </p>
            <p className="tm-formula-line">
              <span className="tm-formula">R = LS − ES = LF − EF</span>
            </p>
          </div>
        </section>

        <section className="tm-section">
          <h2>Исходные данные варианта</h2>
          <VariantTable rows={calculation.rows} />
        </section>
      </main>
    </PageLayout>
  );
}

export default function PracticePage() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [variant, setVariant] = useState(null);

  function openTopic() {
    setSelectedTopic("time-management");
    setVariant(pickRandomVariant());
  }

  function backToTopics() {
    setSelectedTopic(null);
    setVariant(null);
  }

  function changeVariant() {
    setVariant(pickRandomVariant());
  }

  if (selectedTopic === "time-management" && variant) {
    return (
      <PracticeTopicPage
        variant={variant}
        onBack={backToTopics}
        onChangeVariant={changeVariant}
      />
    );
  }

  return (
    <PageLayout title="Практические работы" activePage="practice">
      <main className="tm-page">
        <section className="tm-hero">
          <span className="tm-badge">Практические работы</span>

          <h1>Практические работы по дисциплине</h1>

          <p>
            Выберите тему, чтобы открыть практическую работу и получить
            случайный вариант для решения.
          </p>
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
                  Случайный вариант модели «узел–работа» из файла с вариантами.
                </span>
              </span>
            </button>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}