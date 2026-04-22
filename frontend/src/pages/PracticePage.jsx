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
      "Аудиторные работы: случайная длительность, случайная стоимость и зависимость стоимости от времени выполнения.",
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
    <div style={styles.card}>
      <h3 style={styles.sectionTitle}>Схема варианта</h3>
      <div style={{ overflowX: "auto" }}>
        <svg width={svgWidth} height={svgHeight} style={{ minWidth: svgWidth }}>
          <defs>
            <marker
              id="arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,6 L9,3 z" fill="#3d6fa8" />
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
                <g key={`${row.work}-${succ}`}>
                  <path
                    d={`M${x1},${y1} C${midX},${y1} ${midX},${y2} ${x2},${y2}`}
                    fill="none"
                    stroke="#3d6fa8"
                    strokeWidth="2.5"
                    markerEnd="url(#arrow)"
                  />
                </g>
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
                  fill={row.critical ? "#dff2ff" : "#f8fbff"}
                  stroke={row.critical ? "#2c7be5" : "#b8d1ea"}
                  strokeWidth={row.critical ? "2.5" : "1.5"}
                />
                <text
                  x={pos.x + pos.width / 2}
                  y={pos.y + 26}
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="700"
                  fill="#26476d"
                >
                  Работа {row.work}
                </text>
                <text
                  x={pos.x + pos.width / 2}
                  y={pos.y + 50}
                  textAnchor="middle"
                  fontSize="15"
                  fill="#4d6e95"
                >
                  t = {row.duration}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function ResultTable({ rows }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.sectionTitle}>Итоговая таблица расчёта</h3>
      <div style={{ overflowX: "auto" }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Работа</th>
              <th style={styles.th}>Предшественники</th>
              <th style={styles.th}>Последователи</th>
              <th style={styles.th}>Длительность</th>
              <th style={styles.th}>ES</th>
              <th style={styles.th}>EF</th>
              <th style={styles.th}>LS</th>
              <th style={styles.th}>LF</th>
              <th style={styles.th}>TF</th>
              <th style={styles.th}>FF</th>
              <th style={styles.th}>Критическая</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.work}>
                <td style={styles.td}>{row.work}</td>
                <td style={styles.td}>
                  {row.prev.length ? row.prev.join(", ") : "—"}
                </td>
                <td style={styles.td}>
                  {row.next.length ? row.next.join(", ") : "—"}
                </td>
                <td style={styles.td}>{row.duration}</td>
                <td style={styles.td}>{row.ES}</td>
                <td style={styles.td}>{row.EF}</td>
                <td style={styles.td}>{row.LS}</td>
                <td style={styles.td}>{row.LF}</td>
                <td style={styles.td}>{row.TF}</td>
                <td style={styles.td}>{row.FF}</td>
                <td style={styles.td}>{row.critical ? "Да" : "Нет"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InfoBox({ title, children }) {
  return (
    <section style={styles.card}>
      <h3 style={styles.sectionTitle}>{title}</h3>
      <div style={styles.textBlock}>{children}</div>
    </section>
  );
}

function Formula({ children }) {
  return <div style={styles.formula}>{children}</div>;
}

function BulletList({ items }) {
  return (
    <ul style={styles.list}>
      {items.map((item) => (
        <li key={item} style={styles.listItem}>
          {item}
        </li>
      ))}
    </ul>
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
    <PageLayout>
      <div style={styles.page}>
        <div style={styles.hero}>
          <h1 style={styles.pageTitle}>Практические работы</h1>
          <p style={styles.pageDescription}>
            На этой странице собраны аудиторные работы по теме управления временем
            проекта. Здесь есть и расчёт сетевой модели по случайному варианту, и
            подробный методический материал по случайной длительности, стоимости и
            зависимости стоимости от времени.
          </p>
        </div>

        <div style={styles.topicCard}>
          <div>
            <h2 style={styles.topicTitle}>{selectedTopic.title}</h2>
            <p style={styles.topicDescription}>{selectedTopic.description}</p>
          </div>
        </div>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Текущий вариант</div>
            <div style={styles.statValue}>{variant.title}</div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statLabel}>Тип модели</div>
            <div style={styles.statValue}>{variant.type}</div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statLabel}>Длительность проекта</div>
            <div style={styles.statValue}>{calculation.projectDuration}</div>
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <button style={styles.button} onClick={loadNewVariant}>
            Загрузить другой вариант
          </button>
        </div>

        <InfoBox title={variant.title}>
          <p>{variant.description}</p>
        </InfoBox>

        <InfoBox title="Что нужно сделать по варианту">
          <BulletList
            items={[
              "Определить ранние сроки начала и окончания работ.",
              "Определить поздние сроки начала и окончания работ.",
              "Найти критический путь проекта.",
              "Рассчитать полный резерв времени для каждой работы.",
              "Рассчитать свободный резерв времени для каждой работы.",
              "Свести все результаты в итоговую таблицу.",
            ]}
          />
        </InfoBox>

        <InfoBox title="Критический путь">
          <p style={{ fontWeight: 700, color: "#27507f" }}>
            {calculation.criticalPath.length > 0
              ? calculation.criticalPath.join(" → ")
              : "Не определён"}
          </p>
        </InfoBox>

        <VariantGraph rows={calculation.rows} />
        <ResultTable rows={calculation.rows} />

        <InfoBox title="Аудиторная работа. Общая логика">
          <p>
            В аудиторной работе по управлению временем проекта рассматриваются три
            большие части: случайная длительность работ, случайная стоимость работ
            и зависимость стоимости работы от времени её выполнения.
          </p>
          <BulletList
            items={[
              "Сначала анализируется случайная длительность работ проекта.",
              "Затем отдельно рассматривается случайная стоимость работ.",
              "После этого изучается зависимость стоимости от времени выполнения работы.",
              "Во всех случаях оцениваются математическое ожидание, дисперсия, вероятности и доверительные интервалы.",
            ]}
          />
        </InfoBox>

        <InfoBox title="Часть I. Длительность выполнения работы является случайной">
          <p>
            В первой части длительность каждой работы рассматривается как случайная
            величина. Для каждой работы заданы оптимистическая, номинальная и
            пессимистическая оценки времени выполнения.
          </p>
          <p>
            После расчёта характеристик отдельных работ определяется критический
            путь. Для длительности всего проекта суммируются параметры только
            критических работ. Такой подход прямо используется в вашем методическом
            материале. :contentReference[oaicite:2]{index=2}
          </p>
        </InfoBox>

        <InfoBox title="Часть I. Треугольный закон распределения">
          <p>
            Если случайная величина длительности работы имеет треугольный закон
            распределения, для каждой работы рассчитываются математическое
            ожидание, дисперсия и среднеквадратическое отклонение.
          </p>

          <Formula>M[T] = (a + m + b) / 3</Formula>
          <Formula>
            D[T] = (a² + m² + b² - am - ab - mb) / 18
          </Formula>
          <Formula>σ[T] = √D[T]</Formula>

          <p>
            Для длительности проекта используются только критические работы:
          </p>

          <Formula>M[Tпр] = Σ M[Tij]</Formula>
          <Formula>D[Tпр] = Σ D[Tij]</Formula>
          <Formula>σ[Tпр] = √D[Tпр]</Formula>

          <p>
            Важно: стандартные отклонения не складываются, складываются только
            дисперсии. Это прямо отмечено в документе. :contentReference[oaicite:3]{index=3}
          </p>
        </InfoBox>

        <InfoBox title="Часть I. Вероятность завершения проекта к сроку">
          <p>
            После нахождения параметров случайной длительности проекта она
            приближается нормальным распределением. Это позволяет определить
            вероятность завершить проект не позднее заданного времени.
          </p>

          <Formula>P(T ≤ t₀) = ∫ f(t) dt</Formula>
          <Formula>P(t₁ ≤ T ≤ t₂) = ∫ f(t) dt</Formula>

          <p>
            Также можно оценивать вероятность попадания длительности проекта в
            заданный интервал времени.
          </p>
        </InfoBox>

        <InfoBox title="Часть I. Доверительный интервал длительности проекта">
          <p>
            Для заданной надёжности γ определяется интервал около математического
            ожидания, в который длительность проекта попадёт с этой вероятностью.
          </p>

          <Formula>P(M[T] - Δ ≤ T ≤ M[T] + Δ) = γ</Formula>
          <Formula>Δ = z · σ[T]</Formula>

          <p>
            Чем выше надёжность, тем шире получается доверительный интервал.
          </p>
        </InfoBox>

        <InfoBox title="Часть I. Несколько критических путей">
          <p>
            Если в проекте наблюдается несколько критических путей, для анализа
            выбирают наиболее рискованный путь — путь с наибольшей дисперсией.
            Это тоже прямо зафиксировано в методичке. :contentReference[oaicite:4]{index=4}
          </p>
        </InfoBox>

        <InfoBox title="Часть I. Бета-распределение длительности">
          <p>
            На практике длительность работы часто задают β-распределением. Тогда
            используются формулы PERT:
          </p>

          <Formula>M[T] = (a + 4m + b) / 6</Formula>
          <Formula>σ[T] = (b - a) / 6</Formula>
          <Formula>D[T] = σ²[T]</Formula>

          <p>
            После этого снова рассчитываются параметры проекта, вероятности
            завершения и доверительные интервалы.
          </p>
        </InfoBox>

        <InfoBox title="Часть I. Что нужно показать в решении">
          <BulletList
            items={[
              "Исходный сетевой график.",
              "Таблицу длительностей работ.",
              "Формулы для треугольного закона и β-распределения.",
              "Расчёт M, D и σ для каждой работы.",
              "Определение критического пути.",
              "Параметры случайной длительности проекта.",
              "Вероятность завершения к сроку.",
              "Вероятность попадания во временной диапазон.",
              "Доверительные интервалы при заданных надёжностях.",
            ]}
          />
        </InfoBox>

        <InfoBox title="Часть II. Стоимость выполнения работы является случайной">
          <p>
            Во второй части случайной величиной становится стоимость выполнения
            работы. Здесь, в отличие от анализа времени, учитываются не только
            критические работы, а все работы проекта, потому что все они должны
            быть выполнены.
          </p>

          <Formula>M[Cпр] = Σ M[Cij]</Formula>
          <Formula>D[Cпр] = Σ D[Cij]</Formula>
          <Formula>σ[Cпр] = √D[Cпр]</Formula>

          <p>
            Сумма стоимостей всех работ называется прямыми затратами проекта.
            Такой порядок расчёта прямо указан в вашем файле. :contentReference[oaicite:5]{index=5}
          </p>
        </InfoBox>

        <InfoBox title="Часть II. Оценка вероятностей по стоимости">
          <p>
            После вычисления параметров суммарной стоимости проекта она также
            приближается нормальным законом распределения. На этой основе
            определяются:
          </p>

          <BulletList
            items={[
              "вероятность затратить на проект не более заданной суммы;",
              "вероятность того, что стоимость попадёт в заданный диапазон;",
              "доверительный интервал стоимости проекта.",
            ]}
          />

          <Formula>P(C ≤ c₀) = ∫ f(c) dc</Formula>
          <Formula>P(c₁ ≤ C ≤ c₂) = ∫ f(c) dc</Formula>
          <Formula>P(M[C] - Δ ≤ C ≤ M[C] + Δ) = γ</Formula>
        </InfoBox>

        <InfoBox title="Часть II. Треугольное и β-распределение стоимости">
          <p>
            В аудиторной работе стоимость анализируется как при треугольном
            законе распределения, так и при β-распределении. После этого
            сравниваются математические ожидания, дисперсии, вероятности и
            доверительные интервалы.
          </p>
        </InfoBox>

        <InfoBox title="Часть II. Что нужно показать в решении">
          <BulletList
            items={[
              "Таблицу исходных стоимостей работ.",
              "Расчёт M, D и σ стоимости по каждой работе.",
              "Суммарные прямые затраты как случайную величину.",
              "Вероятность не превысить заданную стоимость.",
              "Вероятность попасть в диапазон стоимости.",
              "Доверительные интервалы стоимости проекта.",
              "Сравнение треугольного закона и β-распределения.",
            ]}
          />
        </InfoBox>

        <InfoBox title="Часть III. Стоимость работы линейно зависит от времени выполнения">
          <p>
            В третьей части стоимость работы рассматривается как функция времени
            её выполнения, а время при этом является случайной величиной.
          </p>

          <p>Сначала используется линейная зависимость:</p>

          <Formula>C(t) = a + bt</Formula>

          <p>Тогда характеристики стоимости можно выразить через время:</p>

          <Formula>M[C] = a + b · M[T]</Formula>
          <Formula>D[C] = b² · D[T]</Formula>
        </InfoBox>

        <InfoBox title="Часть III. Ломаная линейная интерполяция">
          <p>
            Если одной прямой недостаточно, стоимость можно задавать двумя
            линейными участками: от оптимистической до номинальной точки и от
            номинальной до пессимистической. В документе этот подход отдельно
            показан для проекта и используется для взвешенной оценки стоимости. :contentReference[oaicite:6]{index=6}
          </p>
        </InfoBox>

        <InfoBox title="Часть III. Квадратичная зависимость стоимости от времени">
          <p>
            Более точная модель стоимости может быть задана квадратичной функцией:
          </p>

          <Formula>C(t) = a + bt + ct²</Formula>

          <p>
            Коэффициенты определяются по трём точкам: оптимистической,
            номинальной и пессимистической оценкам времени и соответствующим
            стоимостям.
          </p>

          <p>
            После этого рассчитываются математическое ожидание, дисперсия и
            стандартное отклонение стоимости проекта.
          </p>
        </InfoBox>

        <InfoBox title="Часть III. Что нужно показать в решении">
          <BulletList
            items={[
              "Линейную зависимость стоимости от времени.",
              "Коэффициенты интерполяции.",
              "Ломаную линейную модель, если она используется.",
              "Квадратичную модель стоимости.",
              "Расчёт характеристик стоимости через характеристики времени.",
              "Вероятности и доверительные интервалы.",
              "Сравнение линейной и квадратичной моделей.",
            ]}
          />
        </InfoBox>

        <InfoBox title="Шаблон оформления аудиторной работы">
          <BulletList
            items={[
              "Название задания и исходные данные.",
              "Указание используемого закона распределения.",
              "Формулы для расчёта характеристик отдельных работ.",
              "Таблица промежуточных вычислений.",
              "Параметры случайной величины проекта.",
              "Расчёт вероятностей.",
              "Доверительные интервалы.",
              "Краткий вывод по каждому разделу.",
            ]}
          />
        </InfoBox>

        <InfoBox title="Основные выводы по теме">
          <p>
            Учёт случайности в сроках и стоимости проекта существенно изменяет
            итоговую оценку проекта. При анализе времени учитываются критические
            работы, при анализе стоимости — все работы проекта. Выбор закона
            распределения и формы зависимости стоимости от времени влияет на
            вероятности, ширину доверительных интервалов и итоговый уровень риска
            проекта. :contentReference[oaicite:7]{index=7}
          </p>
        </InfoBox>
      </div>
    </PageLayout>
  );
}

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },

  hero: {
    background:
      "linear-gradient(135deg, rgba(235,244,255,1) 0%, rgba(248,251,255,1) 100%)",
    border: "1px solid #d8e6f5",
    borderRadius: 24,
    padding: "28px 28px 24px",
  },

  pageTitle: {
    margin: 0,
    fontSize: 34,
    lineHeight: 1.15,
    color: "#23476f",
  },

  pageDescription: {
    marginTop: 12,
    marginBottom: 0,
    fontSize: 17,
    lineHeight: 1.7,
    color: "#4a6e96",
    maxWidth: 1100,
  },

  topicCard: {
    background: "#ffffff",
    border: "1px solid #d8e6f5",
    borderRadius: 22,
    padding: 24,
    boxShadow: "0 8px 30px rgba(80, 120, 170, 0.08)",
  },

  topicTitle: {
    margin: 0,
    fontSize: 26,
    color: "#244b77",
  },

  topicDescription: {
    margin: "10px 0 0",
    lineHeight: 1.7,
    color: "#55779c",
    fontSize: 16,
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
  },

  statCard: {
    background: "#ffffff",
    border: "1px solid #d8e6f5",
    borderRadius: 20,
    padding: 20,
    boxShadow: "0 8px 24px rgba(80, 120, 170, 0.06)",
  },

  statLabel: {
    fontSize: 14,
    color: "#6d8cab",
    marginBottom: 8,
  },

  statValue: {
    fontSize: 24,
    fontWeight: 700,
    color: "#244b77",
  },

  button: {
    border: "none",
    background: "linear-gradient(135deg, #4d8fe6 0%, #3578d4 100%)",
    color: "#ffffff",
    borderRadius: 16,
    padding: "14px 22px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 10px 24px rgba(53, 120, 212, 0.24)",
  },

  card: {
    background: "#ffffff",
    border: "1px solid #d8e6f5",
    borderRadius: 22,
    padding: 24,
    boxShadow: "0 8px 24px rgba(80, 120, 170, 0.06)",
  },

  sectionTitle: {
    marginTop: 0,
    marginBottom: 14,
    fontSize: 22,
    color: "#244b77",
  },

  textBlock: {
    color: "#4b6f97",
    fontSize: 16,
    lineHeight: 1.75,
  },

  formula: {
    background: "#f4f9ff",
    border: "1px solid #d9e8f7",
    borderRadius: 16,
    padding: "12px 16px",
    margin: "12px 0",
    color: "#26476d",
    fontWeight: 600,
    overflowX: "auto",
  },

  list: {
    margin: "10px 0 0",
    paddingLeft: 22,
  },

  listItem: {
    marginBottom: 8,
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: 980,
  },

  th: {
    background: "#eef6ff",
    border: "1px solid #d8e6f5",
    padding: "12px 10px",
    textAlign: "left",
    color: "#26476d",
    fontSize: 14,
  },

  td: {
    border: "1px solid #d8e6f5",
    padding: "10px",
    color: "#4b6f97",
    fontSize: 14,
    verticalAlign: "top",
  },
};