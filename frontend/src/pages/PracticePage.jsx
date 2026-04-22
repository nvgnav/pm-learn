import { useMemo, useState } from "react";
import PageLayout from "../components/PageLayout";

const variants = [
  {
    id: 1,
    title: "Вариант 1",
    type: "узел–работа",
    description:
      "Для каждого события определить ранние и поздние сроки, резерв события. Для каждой работы определить ES, EF, LS, LF, полный и свободный резерв.",
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
    description:
      "Выполнить полный расчёт сетевой модели и свести результаты в таблицу.",
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
    description:
      "Построить расчёт сроков выполнения работ, определить критический путь и резервы времени.",
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
];

const practiceTopics = [
  {
    id: "time-management",
    title: "Управление временем проекта",
    description:
      "Самостоятельный расчёт сетевой модели по случайному варианту.",
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
      TF: 0,
      FF: 0,
      critical: false,
      level: 0,
    });
  });

  const inDegree = new Map();
  rows.forEach((row) => {
    inDegree.set(row.work, row.prev.length);
  });

  const queue = rows.filter((row) => row.prev.length === 0).map((row) => row.work);
  const topo = [];

  while (queue.length > 0) {
    const current = queue.shift();
    topo.push(current);

    const currentNode = map.get(current);

    currentNode.next.forEach((succ) => {
      inDegree.set(succ, inDegree.get(succ) - 1);
      if (inDegree.get(succ) === 0) {
        queue.push(succ);
      }
    });
  }

  topo.forEach((workId) => {
    const node = map.get(workId);

    node.ES =
      node.prev.length === 0
        ? 0
        : Math.max(...node.prev.map((pred) => map.get(pred).EF));

    node.EF = node.ES + node.duration;

    node.level =
      node.prev.length === 0
        ? 0
        : Math.max(...node.prev.map((pred) => map.get(pred).level)) + 1;
  });

  const projectDuration = Math.max(...rows.map((row) => map.get(row.work).EF));

  [...topo].reverse().forEach((workId) => {
    const node = map.get(workId);

    node.LF =
      node.next.length === 0
        ? projectDuration
        : Math.min(...node.next.map((succ) => map.get(succ).LS));

    node.LS = node.LF - node.duration;
    node.TF = node.LS - node.ES;

    node.FF =
      node.next.length === 0
        ? projectDuration - node.EF
        : Math.min(...node.next.map((succ) => map.get(succ).ES)) - node.EF;

    node.critical = node.TF === 0;
  });

  const resultRows = rows.map((row) => map.get(row.work));
  const criticalPath = topo.filter((id) => map.get(id).critical);

  return {
    rows: resultRows,
    projectDuration,
    criticalPath,
  };
}

function buildGraphLayout(rows) {
  const levels = {};

  rows.forEach((row) => {
    const level = row.level;
    if (!levels[level]) {
      levels[level] = [];
    }
    levels[level].push(row);
  });

  const levelKeys = Object.keys(levels)
    .map(Number)
    .sort((a, b) => a - b);

  const positions = {};
  const nodeWidth = 150;
  const nodeHeight = 70;
  const startX = 60;
  const startY = 60;
  const gapX = 220;
  const gapY = 110;

  levelKeys.forEach((level) => {
    levels[level].forEach((row, index) => {
      positions[row.work] = {
        x: startX + level * gapX,
        y: startY + index * gapY,
        width: nodeWidth,
        height: nodeHeight,
      };
    });
  });

  const maxLevel = levelKeys.length > 0 ? Math.max(...levelKeys) : 0;
  const maxRowsInLevel = Math.max(...levelKeys.map((lvl) => levels[lvl].length), 1);

  return {
    positions,
    svgWidth: startX + (maxLevel + 1) * gapX + 160,
    svgHeight: startY + maxRowsInLevel * gapY + 80,
  };
}

function VariantGraph({ rows }) {
  const { positions, svgWidth, svgHeight } = buildGraphLayout(rows);

  return (
    <div className="diagram-card">
      <h3>Схема варианта</h3>

      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="theory-svg">
        <defs>
          <marker
            id="graphArrow"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="#2f6fb1" />
          </marker>
        </defs>

        {rows.flatMap((row) =>
          row.next.map((succ) => {
            const from = positions[row.work];
            const to = positions[succ];

            if (!from || !to) {
              return null;
            }

            const x1 = from.x + from.width;
            const y1 = from.y + from.height / 2;
            const x2 = to.x;
            const y2 = to.y + to.height / 2;
            const midX = (x1 + x2) / 2;

            return (
              <path
                key={`${row.work}-${succ}`}
                d={`M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2 - 8} ${y2}`}
                fill="none"
                stroke="#2f6fb1"
                strokeWidth="3"
                markerEnd="url(#graphArrow)"
              />
            );
          })
        )}

        {rows.map((row) => {
          const pos = positions[row.work];

          return (
            <g key={row.work}>
              <rect
                x={pos.x}
                y={pos.y}
                width={pos.width}
                height={pos.height}
                rx="16"
                ry="16"
                fill={row.critical ? "#f7dede" : "#edf5fd"}
                stroke={row.critical ? "#d94b4b" : "#2f6fb1"}
                strokeWidth="3"
              />
              <text x={pos.x + 16} y={pos.y + 26} className="svg-small">
                Работа {row.work}
              </text>
              <text x={pos.x + 16} y={pos.y + 50} className="svg-small">
                t = {row.duration}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function ResultTable({ rows }) {
  return (
    <div className="table-card">
      <table className="variant-table">
        <thead>
          <tr>
            <th>Работа</th>
            <th>Предшественники</th>
            <th>Последователи</th>
            <th>Длительность</th>
            <th>ES</th>
            <th>EF</th>
            <th>LS</th>
            <th>LF</th>
            <th>TF</th>
            <th>FF</th>
            <th>Критическая</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.work}>
              <td>{row.work}</td>
              <td>{row.prev.length ? row.prev.join(", ") : "—"}</td>
              <td>{row.next.length ? row.next.join(", ") : "—"}</td>
              <td>{row.duration}</td>
              <td>{row.ES}</td>
              <td>{row.EF}</td>
              <td>{row.LS}</td>
              <td>{row.LF}</td>
              <td>{row.TF}</td>
              <td>{row.FF}</td>
              <td>{row.critical ? "Да" : "Нет"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PracticePage() {
  const [selectedTopic] = useState(practiceTopics[0]);
  const [variant, setVariant] = useState(() => pickRandomVariant());

  const calculation = useMemo(() => calculateSchedule(variant.rows), [variant]);

  function loadNewVariant() {
    setVariant(pickRandomVariant());
  }

  return (
    <PageLayout activePage="practice">
      <div className="theory-page">
        <section className="content-block">
          <h1>Практические работы</h1>
          <p>
            Выберите тему и выполните расчёт по случайному варианту.
            Вариант можно обновлять кнопкой ниже.
          </p>
        </section>

        <section className="topics-grid">
          <div className="topic-card active-topic">
            <h3>{selectedTopic.title}</h3>
            <p>{selectedTopic.description}</p>
          </div>
        </section>

        <section className="variant-toolbar">
          <div className="summary-card">
            <div className="summary-label">Текущий вариант</div>
            <div className="summary-value">{variant.title}</div>
          </div>

          <div className="summary-card">
            <div className="summary-label">Тип модели</div>
            <div className="summary-value">{variant.type}</div>
          </div>

          <div className="summary-card">
            <div className="summary-label">Длительность проекта</div>
            <div className="summary-value">{calculation.projectDuration}</div>
          </div>

          <button
            type="button"
            className="submit-btn variant-btn"
            onClick={loadNewVariant}
          >
            Загрузить другой вариант
          </button>
        </section>

        <section className="content-block">
          <h2>{variant.title}</h2>
          <p>{variant.description}</p>
        </section>

        <VariantGraph rows={calculation.rows} />

        <section className="content-block">
          <h2>Что нужно сделать</h2>
          <ul className="task-list">
            <li>Определить ранние сроки начала и окончания работ.</li>
            <li>Определить поздние сроки начала и окончания работ.</li>
            <li>Найти критический путь проекта.</li>
            <li>Рассчитать полный резерв времени для каждой работы.</li>
            <li>Рассчитать свободный резерв времени для каждой работы.</li>
            <li>Свести все результаты в итоговую таблицу.</li>
          </ul>
        </section>

        <section className="content-block">
          <h2>Критический путь</h2>
          <p>
            {calculation.criticalPath.length > 0
              ? calculation.criticalPath.join(" → ")
              : "Не определён"}
          </p>
        </section>

        <ResultTable rows={calculation.rows} />
      </div>
    </PageLayout>
  );
}