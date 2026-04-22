import { useMemo, useRef } from "react";
import PageLayout from "../components/PageLayout";
import "../styles/study.css";

const sections = [
  {
    id: "part1-intro",
    title: "Часть I. Длительность выполнения работы является случайной",
    paragraphs: [
      "В этой части рассматривается случайная длительность выполнения работ проекта.",
      "Материал разделён на три задания: модель «дуга–работа» с треугольным законом, модель с бета-распределением и модель «узел–работа».",
    ],
  },
  {
    id: "task1",
    title: "Задание 1. Сетевой график в терминах «дуга–работа»",
    paragraphs: [
      "Пусть задан сетевой график проекта в терминах «дуга–работа».",
      "Для каждой работы известны номинальная, оптимистичная и пессимистичная длительности.",
    ],
    diagram: "arc-graph",
  },
  {
    id: "table1",
    title: "Таблица 1. Длительности работ проекта с одним критическим путём",
    table: "table1",
  },
  {
    id: "triangular",
    title: "Треугольный закон распределения",
    paragraphs: [
      "Предполагается, что случайная величина длительности работы имеет треугольный закон распределения.",
      "Для него вычисляются математическое ожидание, дисперсия и среднее квадратическое отклонение.",
    ],
    formulas: [
      "M(T) = (a + m + b) / 3",
      "D(T) = (a² + m² + b² − a·m − a·b − m·b) / 18",
      "σ(T) = √D(T)",
    ],
    diagram: "triangular",
    note:
      "ЗАМЕЧАНИЕ: если разброс отсутствует, дисперсия такой работы равна нулю.",
  },
  {
    id: "triangular-stats",
    title: "Расчёт характеристик работ при треугольном законе",
    paragraphs: [
      "Ниже приведены вычисленные характеристики для каждой работы проекта.",
    ],
    table: "triangularStats",
  },
  {
    id: "critical-path",
    title: "Критический путь и характеристики длительности проекта",
    paragraphs: [
      "Для определения характеристик длительности всего проекта нужно выполнить расчёт сетевого графика и определить критический путь.",
      "Для данного проекта критический путь составляют работы: 1→2, 2→3, 3→4, 4→6, 6→7, 7→9, 9→10.",
      "Номинальная длительность проекта составляет 31 временную единицу.",
    ],
    formulas: [
      "M(Tпроект) = Σ M(Tk), где k — критические работы",
      "D(Tпроект) = Σ D(Tk), где k — критические работы",
      "σ(Tпроект) = √D(Tпроект)",
    ],
    highlight:
      "ВАЖНО: средние квадратические отклонения не складываются. Складывать можно только дисперсии.",
  },
  {
    id: "normal-law",
    title: "Нормальный закон распределения длительности проекта",
    paragraphs: [
      "Суммарная длительность проекта принимается приближённо нормально распределённой случайной величиной.",
      "Это позволяет решать задачи на вероятность завершения к сроку и на доверительный интервал длительности проекта.",
    ],
    formulas: [
      "Tпроект ~ N(μ, σ²)",
      "P(T ≤ t0)",
      "P(a ≤ T ≤ b)",
      "Iγ = [μ − xγ; μ + xγ]",
    ],
    diagram: "normal",
  },
  {
    id: "probability-tasks",
    title: "Задачи первого и второго вида",
    paragraphs: [
      "Задача первого вида: определить вероятность завершить проект не позднее заданного времени или вероятность попасть в заданный временной диапазон.",
      "Задача второго вида: при заданной надёжности определить доверительный интервал длительности проекта около математического ожидания.",
      "Если требуемое время завершения совпадает с математическим ожиданием, вероятность равна 0,5.",
      "Чем выше надёжность, тем шире доверительный интервал.",
    ],
  },
  {
    id: "many-critical",
    title: "Случай нескольких критических путей",
    paragraphs: [
      "Если в проекте несколько критических путей, анализ выполняют для самого рискованного случая.",
      "Обычно выбирают путь с наибольшей дисперсией, так как он обладает наибольшим разбросом и более высоким риском.",
    ],
    table: "manyCriticalPaths",
    highlight:
      "Для дальнейшей оценки выбирают критический путь с наибольшей дисперсией.",
  },
  {
    id: "task2",
    title: "Задание 2. Бета-распределение длительности работы",
    paragraphs: [
      "Во втором задании предполагается, что длительность работы имеет бета-распределение.",
      "Как и в случае треугольного закона, вычисляются математическое ожидание, дисперсия и среднее квадратическое отклонение.",
    ],
    formulas: [
      "M(T) = (a + 4m + b) / 6",
      "D(T) = ((b − a) / 6)²",
      "σ(T) = √D(T)",
    ],
    table: "betaStats",
  },
  {
    id: "beta-results",
    title: "Результаты для бета-распределения",
    paragraphs: [
      "При использовании бета-распределения математическое ожидание оказывается близким к случаю треугольного распределения, но дисперсия получается меньше.",
      "Из-за этого вероятности завершения в срок и доверительные интервалы отличаются от результатов, полученных для треугольного закона.",
    ],
  },
  {
    id: "task3",
    title: "Задание 3. Модель «узел–работа»",
    paragraphs: [
      "В третьем задании задана сетевая модель в терминах «узел–работа».",
      "Для неё нужно провести тот же анализ: оценить вероятность завершить проект к сроку, вероятность попасть в диапазон и определить доверительный интервал.",
    ],
    diagram: "nodework",
    table: "nodeWorkTable",
  },
];

const table1Rows = [
  ["1→2", "7", "4", "10"],
  ["1→3", "4", "3", "8"],
  ["1→4", "5", "3", "8"],
  ["2→3", "1", "1", "3"],
  ["2→5", "3", "2", "6"],
  ["3→4", "2", "1", "5"],
  ["4→6", "6", "4", "9"],
  ["4→7", "7", "4", "11"],
  ["5→6", "4", "2", "8"],
  ["5→8", "7", "3", "9"],
  ["6→7", "4", "3", "8"],
  ["6→8", "5", "3", "8"],
  ["6→9", "3", "2", "5"],
  ["7→9", "6", "4", "7"],
  ["8→9", "4", "2", "7"],
  ["8→10", "9", "5", "12"],
  ["9→10", "5", "4", "9"],
];

const triangularStatsRows = [
  ["1→2", "7,00", "1,50", "1,22"],
  ["1→3", "5,00", "1,17", "1,08"],
  ["1→4", "5,33", "1,06", "1,03"],
  ["2→3", "1,67", "0,22", "0,47"],
  ["2→5", "3,67", "0,72", "0,85"],
  ["3→4", "2,67", "0,72", "0,85"],
  ["4→6", "6,33", "1,06", "1,03"],
  ["4→7", "7,33", "2,06", "1,43"],
  ["5→6", "4,67", "1,56", "1,25"],
  ["5→8", "6,33", "1,56", "1,25"],
  ["6→7", "5,00", "1,17", "1,08"],
  ["6→8", "5,33", "1,06", "1,03"],
  ["6→9", "3,33", "0,39", "0,62"],
  ["7→9", "5,67", "0,39", "0,62"],
  ["8→9", "4,33", "1,06", "1,03"],
  ["8→10", "8,67", "2,06", "1,43"],
  ["9→10", "6,00", "1,17", "1,08"],
];

const manyCriticalRows = [
  ["Путь I", "34,33", "6,22", "2,49"],
  ["Путь II", "33,00", "6,00", "2,45"],
  ["Путь III", "32,33", "8,11", "2,85"],
];

const betaStatsRows = [
  ["1→2", "7,00", "1,00", "1,00"],
  ["1→3", "4,50", "0,69", "0,83"],
  ["1→4", "5,17", "0,69", "0,83"],
  ["2→3", "1,33", "0,11", "0,33"],
  ["2→5", "3,33", "0,44", "0,67"],
  ["3→4", "2,33", "0,44", "0,67"],
  ["4→6", "6,17", "0,69", "0,83"],
  ["4→7", "7,17", "1,36", "1,17"],
  ["5→6", "4,33", "1,00", "1,00"],
  ["5→8", "6,67", "1,00", "1,00"],
  ["6→7", "4,50", "0,69", "0,83"],
  ["6→8", "5,17", "0,69", "0,83"],
  ["6→9", "3,17", "0,25", "0,50"],
  ["7→9", "5,83", "0,25", "0,50"],
  ["8→9", "4,17", "0,69", "0,83"],
  ["8→10", "8,83", "1,36", "1,17"],
  ["9→10", "5,50", "0,69", "0,83"],
];

const nodeWorkRows = [
  ["A", "D", "нет", "10", "5", "14"],
  ["B", "C, H", "нет", "8", "6", "11"],
  ["C", "E, F, G", "B", "12", "8", "16"],
  ["D", "K", "A", "8", "4", "10"],
  ["E", "K", "C", "7", "4", "10"],
  ["F", "J", "C", "6", "4", "9"],
  ["G", "I, L", "C", "7", "3", "11"],
  ["H", "I, L", "B", "8", "5", "13"],
  ["I", "J", "G, H", "9", "7", "14"],
  ["J", "M, N", "F, I", "4", "3", "6"],
  ["K", "M, N", "D, E", "10", "6", "16"],
  ["L", "M, N", "G, H", "11", "6", "15"],
  ["M", "нет", "J, K, L", "10", "7", "15"],
  ["N", "O", "J, K, L", "4", "3", "7"],
  ["O", "нет", "N", "8", "4", "12"],
];

function ContentSidebar({ sections, onJump }) {
  return (
    <div className="study-sidebar-card">
      <div className="study-sidebar-title">Содержание</div>
      <div className="study-sidebar-subtitle">
        Пока только первая часть документа
      </div>

      <div className="study-topic-list">
        {sections.map((section, index) => (
          <button
            key={section.id}
            type="button"
            className="study-topic-button"
            onClick={() => onJump(section.id)}
          >
            <span className="study-topic-number">{index + 1}</span>
            <span>
              <span className="study-topic-title">{section.title}</span>
              <span className="study-topic-description">Перейти к разделу</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function NoteBox({ children }) {
  return <div className="study-note-box">{children}</div>;
}

function HighlightBox({ children }) {
  return <div className="study-highlight-box">{children}</div>;
}

function FormulaBlock({ items }) {
  return (
    <div className="formula-grid">
      {items.map((item, index) => (
        <div key={index} className="formula-card">
          {item}
        </div>
      ))}
    </div>
  );
}

function DataTable({ title, headers, rows }) {
  return (
    <div className="table-card">
      <h3>{title}</h3>
      <div className="table-scroll">
        <table className="variant-table">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ArcGraphDiagram() {
  return (
    <div className="diagram-card">
      <h3>Рисунок 1. Сетевой график проекта в терминах «дуга–работа»</h3>
      <svg viewBox="0 0 980 320" className="theory-svg">
        <defs>
          <marker id="arrowArc1" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#2f6fb1" />
          </marker>
        </defs>

        {[
          ["1", 70, 160],
          ["2", 190, 70],
          ["3", 190, 160],
          ["4", 190, 255],
          ["5", 360, 70],
          ["6", 520, 140],
          ["7", 680, 70],
          ["8", 680, 225],
          ["9", 835, 140],
          ["10", 930, 140],
        ].map(([label, x, y]) => (
          <g key={label}>
            <circle cx={x} cy={y} r="24" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
            <text x={label === "10" ? x - 14 : x - 8} y={y + 7} className="svg-node-text">
              {label}
            </text>
          </g>
        ))}

        <line x1="92" y1="150" x2="168" y2="82" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arrowArc1)" />
        <line x1="94" y1="160" x2="166" y2="160" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arrowArc1)" />
        <line x1="92" y1="170" x2="168" y2="243" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arrowArc1)" />

        <line x1="214" y1="70" x2="336" y2="70" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arrowArc1)" />
        <line x1="214" y1="160" x2="336" y2="82" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arrowArc1)" />
        <line x1="214" y1="255" x2="496" y2="148" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arrowArc1)" />

        <line x1="384" y1="82" x2="496" y2="132" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arrowArc1)" />

        <line x1="544" y1="132" x2="656" y2="82" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arrowArc1)" />
        <line x1="544" y1="140" x2="656" y2="225" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arrowArc1)" />
        <line x1="544" y1="148" x2="811" y2="144" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arrowArc1)" />

        <line x1="704" y1="78" x2="811" y2="132" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arrowArc1)" />
        <line x1="704" y1="225" x2="811" y2="148" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arrowArc1)" />
        <line x1="704" y1="232" x2="906" y2="148" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arrowArc1)" />
        <line x1="859" y1="140" x2="906" y2="140" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arrowArc1)" />

        {[
          ["1→2", 110, 105],
          ["1→3", 110, 148],
          ["1→4", 110, 235],
          ["2→5", 255, 54],
          ["3→4", 255, 122],
          ["4→6", 340, 228],
          ["5→6", 432, 96],
          ["6→7", 592, 92],
          ["6→8", 592, 220],
          ["6→9", 690, 126],
          ["7→9", 755, 94],
          ["8→9", 752, 205],
          ["8→10", 805, 230],
          ["9→10", 874, 124],
        ].map(([label, x, y]) => (
          <text key={label} x={x} y={y} className="svg-small">
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
}

function TriangularLawDiagram() {
  return (
    <div className="diagram-card">
      <h3>Вид треугольного закона плотности распределения</h3>
      <svg viewBox="0 0 760 280" className="theory-svg">
        <line x1="90" y1="220" x2="680" y2="220" stroke="#315f95" strokeWidth="3" />
        <line x1="90" y1="220" x2="90" y2="50" stroke="#315f95" strokeWidth="3" />

        <path d="M 170 220 L 360 90 L 600 220" fill="none" stroke="#2f6fb1" strokeWidth="5" />

        <line x1="170" y1="220" x2="170" y2="238" stroke="#315f95" strokeWidth="2" />
        <line x1="360" y1="220" x2="360" y2="238" stroke="#315f95" strokeWidth="2" />
        <line x1="600" y1="220" x2="600" y2="238" stroke="#315f95" strokeWidth="2" />

        <text x="163" y="258" className="svg-small">a</text>
        <text x="352" y="258" className="svg-small">m</text>
        <text x="592" y="258" className="svg-small">b</text>

        <text x="368" y="78" className="svg-small">f(x)</text>
        <text x="692" y="225" className="svg-small">x</text>
      </svg>
    </div>
  );
}

function NormalLawDiagram() {
  return (
    <div className="diagram-card">
      <h3>Нормальное распределение и доверительный интервал</h3>
      <svg viewBox="0 0 820 290" className="theory-svg">
        <line x1="90" y1="230" x2="730" y2="230" stroke="#315f95" strokeWidth="3" />
        <path
          d="M 130 230 C 210 230, 240 85, 410 85 C 580 85, 610 230, 690 230"
          fill="none"
          stroke="#2f6fb1"
          strokeWidth="5"
        />

        <line x1="305" y1="230" x2="305" y2="130" stroke="#d94b4b" strokeWidth="3" strokeDasharray="8 6" />
        <line x1="410" y1="230" x2="410" y2="85" stroke="#2f6fb1" strokeWidth="3" strokeDasharray="8 6" />
        <line x1="515" y1="230" x2="515" y2="130" stroke="#d94b4b" strokeWidth="3" strokeDasharray="8 6" />

        <text x="297" y="252" className="svg-small">a</text>
        <text x="402" y="252" className="svg-small">μ</text>
        <text x="507" y="252" className="svg-small">b</text>

        <text x="250" y="118" className="svg-small red-text">левая граница</text>
        <text x="377" y="70" className="svg-small">мат. ожидание</text>
        <text x="470" y="118" className="svg-small red-text">правая граница</text>
      </svg>
    </div>
  );
}

function NodeWorkDiagram() {
  return (
    <div className="diagram-card">
      <h3>Модель «узел–работа»</h3>
      <svg viewBox="0 0 980 340" className="theory-svg">
        <defs>
          <marker id="arrowNode1" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#2f6fb1" />
          </marker>
        </defs>

        {[
          ["A", 60, 180],
          ["B", 60, 70],
          ["C", 240, 70],
          ["D", 240, 250],
          ["E", 430, 35],
          ["F", 430, 120],
          ["G", 430, 205],
          ["H", 240, 155],
          ["I", 615, 115],
          ["J", 790, 115],
          ["K", 615, 30],
          ["L", 615, 230],
          ["M", 900, 50],
          ["N", 900, 175],
          ["O", 900, 285],
        ].map(([label, x, y]) => (
          <g key={label}>
            <rect x={x} y={y} width="90" height="48" rx="14" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
            <text x={x + 35} y={y + 30} className="svg-node-text">
              {label}
            </text>
          </g>
        ))}

        {[
          [150, 94, 240, 94],
          [150, 204, 240, 274],
          [330, 94, 430, 59],
          [330, 94, 430, 144],
          [330, 94, 430, 229],
          [330, 179, 615, 139],
          [330, 179, 615, 254],
          [520, 144, 790, 139],
          [520, 229, 615, 254],
          [520, 59, 615, 54],
          [705, 139, 790, 139],
          [705, 54, 900, 74],
          [705, 254, 900, 199],
          [880, 139, 900, 199],
          [945, 223, 945, 285],
        ].map((line, index) => (
          <line
            key={index}
            x1={line[0]}
            y1={line[1]}
            x2={line[2]}
            y2={line[3]}
            stroke="#2f6fb1"
            strokeWidth="3"
            markerEnd="url(#arrowNode1)"
          />
        ))}
      </svg>
    </div>
  );
}

function renderTable(id) {
  if (id === "table1") {
    return (
      <DataTable
        title="Таблица 1. Длительности работ проекта"
        headers={["Работа", "Номинальная", "Оптимистичная", "Пессимистичная"]}
        rows={table1Rows}
      />
    );
  }

  if (id === "triangularStats") {
    return (
      <DataTable
        title="Характеристики работ при треугольном законе"
        headers={["Работа", "M(T)", "D(T)", "σ(T)"]}
        rows={triangularStatsRows}
      />
    );
  }

  if (id === "manyCriticalPaths") {
    return (
      <DataTable
        title="Характеристики критических путей"
        headers={["Путь", "Мат. ожидание", "Дисперсия", "Среднекв. откл."]}
        rows={manyCriticalRows}
      />
    );
  }

  if (id === "betaStats") {
    return (
      <DataTable
        title="Характеристики работ при бета-распределении"
        headers={["Работа", "M(T)", "D(T)", "σ(T)"]}
        rows={betaStatsRows}
      />
    );
  }

  if (id === "nodeWorkTable") {
    return (
      <DataTable
        title="Таблица 3. Модель «узел–работа»"
        headers={[
          "Работа",
          "Последователи",
          "Предшественники",
          "Номинальная",
          "Оптимистичная",
          "Пессимистичная",
        ]}
        rows={nodeWorkRows}
      />
    );
  }

  return null;
}

function SectionBlock({ section, refsMap }) {
  return (
    <section
      id={section.id}
      ref={(element) => {
        refsMap.current[section.id] = element;
      }}
      className="study-section-card"
    >
      <h2>{section.title}</h2>

      {section.paragraphs?.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}

      {section.note && <NoteBox>{section.note}</NoteBox>}
      {section.highlight && <HighlightBox>{section.highlight}</HighlightBox>}
      {section.formulas && <FormulaBlock items={section.formulas} />}

      {section.diagram === "arc-graph" && <ArcGraphDiagram />}
      {section.diagram === "triangular" && <TriangularLawDiagram />}
      {section.diagram === "normal" && <NormalLawDiagram />}
      {section.diagram === "nodework" && <NodeWorkDiagram />}

      {section.table && renderTable(section.table)}
    </section>
  );
}

export default function ClassroomPage() {
  const sectionRefs = useRef({});

  const content = useMemo(() => sections, []);

  function handleJumpToSection(sectionId) {
    const section = sectionRefs.current[sectionId];
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  return (
    <PageLayout activePage="classroom">
      <div className="study-layout study-layout-narrow">
        <aside className="study-sidebar study-sidebar-narrow">
          <div className="study-sidebar-card">
            <div className="study-sidebar-title">Тема</div>
            <div className="study-sidebar-subtitle">
              Сейчас оформлена только первая часть документа
            </div>

            <div className="study-topic-list">
              <div className="study-topic-button active no-cursor">
                <span className="study-topic-number">1</span>
                <span>
                  <span className="study-topic-title">
                    Управление временем проекта
                  </span>
                  <span className="study-topic-description">
                    Часть I. Длительность выполнения работы является случайной
                  </span>
                </span>
              </div>
            </div>
          </div>

          <ContentSidebar sections={content} onJump={handleJumpToSection} />
        </aside>

        <section className="study-content">
          <div className="study-hero compact-hero">
            <div className="study-badge">Аудиторные работы</div>
            <h1>Управление временем проекта — Часть I</h1>
            <p>
              Здесь собрана только первая часть файла: аккуратно по заданиям,
              с формулами, таблицами и схемами, без смешивания со стоимостью
              проекта и частью III.
            </p>
          </div>

          {content.map((section) => (
            <SectionBlock
              key={section.id}
              section={section}
              refsMap={sectionRefs}
            />
          ))}
        </section>
      </div>
    </PageLayout>
  );
}