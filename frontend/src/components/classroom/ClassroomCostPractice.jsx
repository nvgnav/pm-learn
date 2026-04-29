import {
  costPracticeSections,
  documentDownload,
} from "../../data/classroom";

function scrollToBlock(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function renderCell(cell) {
  if (cell && typeof cell === "object") {
    return <span className={cell.red ? "tm-red" : ""}>{cell.value}</span>;
  }

  return cell;
}

function FormulaBlock({ formulas }) {
  return (
    <div className="tm-formula-group">
      {formulas.map((formula, index) => (
        <p key={index} className="tm-formula-line">
          <span className="tm-formula">{formula}</span>
        </p>
      ))}
    </div>
  );
}

function DataTable({ table }) {
  return (
    <div className="tm-table-scroll">
      <table className="tm-table">
        <thead>
          <tr>
            {table.headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`}>{renderCell(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NetworkDiagram({ variant = "one" }) {
  const redEdges =
    variant === "three"
      ? [
          "1-2",
          "2-3",
          "3-4",
          "4-6",
          "6-7",
          "7-9",
          "9-10",
          "2-5",
          "5-6",
          "6-8",
          "8-10",
        ]
      : ["1-2", "2-3", "3-4", "4-6", "6-7", "7-9", "9-10"];

  const edgeClass = (id) =>
    redEdges.includes(id) ? "tm-edge-red" : "tm-edge";

  return (
    <div className="tm-scheme-card">
      <svg viewBox="0 0 900 430" className="tm-network-svg">
        <defs>
          <marker
            id="arrow-blue"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="#174f86" />
          </marker>

          <marker
            id="arrow-red"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="#e11818" />
          </marker>
        </defs>

        <line className={edgeClass("1-2")} x1="90" y1="210" x2="210" y2="110" />
        <line className={edgeClass("1-3")} x1="90" y1="210" x2="330" y2="210" />
        <line className={edgeClass("1-4")} x1="90" y1="210" x2="210" y2="310" />

        <line className={edgeClass("2-3")} x1="210" y1="110" x2="330" y2="210" />
        <line className={edgeClass("2-5")} x1="210" y1="110" x2="500" y2="110" />

        <line className={edgeClass("3-4")} x1="330" y1="210" x2="210" y2="310" />

        <line className={edgeClass("4-6")} x1="210" y1="310" x2="500" y2="210" />
        <line className={edgeClass("4-7")} x1="210" y1="310" x2="500" y2="310" />

        <line className={edgeClass("5-6")} x1="500" y1="110" x2="500" y2="210" />
        <line className={edgeClass("5-8")} x1="500" y1="110" x2="700" y2="110" />

        <line className={edgeClass("6-7")} x1="500" y1="210" x2="500" y2="310" />
        <line className={edgeClass("6-8")} x1="500" y1="210" x2="700" y2="110" />
        <line className={edgeClass("6-9")} x1="500" y1="210" x2="700" y2="310" />

        <line className={edgeClass("7-9")} x1="500" y1="310" x2="700" y2="310" />

        <line className={edgeClass("8-9")} x1="700" y1="110" x2="700" y2="310" />
        <line className={edgeClass("8-10")} x1="700" y1="110" x2="830" y2="210" />

        <line className={edgeClass("9-10")} x1="700" y1="310" x2="830" y2="210" />

        {[
          ["1", 90, 210],
          ["2", 210, 110],
          ["3", 330, 210],
          ["4", 210, 310],
          ["5", 500, 110],
          ["6", 500, 210],
          ["7", 500, 310],
          ["8", 700, 110],
          ["9", 700, 310],
          ["10", 830, 210],
        ].map(([label, x, y]) => (
          <g key={label}>
            <circle cx={x} cy={y} r="34" className="tm-node" />
            <line
              x1={x - 24}
              y1={y - 24}
              x2={x + 24}
              y2={y + 24}
              className="tm-node-line"
            />
            <line
              x1={x + 24}
              y1={y - 24}
              x2={x - 24}
              y2={y + 24}
              className="tm-node-line"
            />
            <text x={x} y={y - 8} textAnchor="middle" className="tm-node-text">
              {label}
            </text>
          </g>
        ))}

        <text x="142" y="138" className="tm-edge-label">7</text>
        <text x="270" y="135" className="tm-edge-label">3</text>
        <text x="284" y="198" className="tm-edge-label tm-red-text">1</text>
        <text x="160" y="205" className="tm-edge-label">4</text>
        <text x="250" y="260" className="tm-edge-label tm-red-text">2</text>
        <text x="360" y="280" className="tm-edge-label">6</text>
        <text x="360" y="326" className="tm-edge-label">7</text>
        <text x="516" y="162" className="tm-edge-label">4</text>
        <text x="596" y="97" className="tm-edge-label">7</text>
        <text x="516" y="262" className="tm-edge-label tm-red-text">4</text>
        <text x="595" y="152" className="tm-edge-label">5</text>
        <text x="610" y="248" className="tm-edge-label">3</text>
        <text x="592" y="326" className="tm-edge-label tm-red-text">6</text>
        <text x="716" y="210" className="tm-edge-label">4</text>
        <text x="762" y="135" className="tm-edge-label">9</text>
        <text x="762" y="280" className="tm-edge-label tm-red-text">5</text>
      </svg>
    </div>
  );
}

function SimpleGraph({ type }) {
  return (
    <div className="tm-scheme-card">
      <svg viewBox="0 0 640 300" className="tm-graph-svg">
        {type === "triangle" && (
          <>
            <line x1="80" y1="240" x2="560" y2="240" className="tm-axis" />
            <line x1="120" y1="250" x2="290" y2="55" className="tm-graph-line" />
            <line x1="290" y1="55" x2="520" y2="240" className="tm-graph-line" />
            <line x1="290" y1="55" x2="290" y2="240" className="tm-dash" />
            <text x="64" y="62" className="tm-graph-label">f(D)</text>
            <text x="560" y="260" className="tm-graph-label">D</text>
            <text x="112" y="270" className="tm-graph-label">Dкр</text>
            <text x="278" y="270" className="tm-graph-label">Dн</text>
            <text x="500" y="270" className="tm-graph-label">Dmax</text>
          </>
        )}

        {type === "normal-left" && (
          <>
            <line x1="60" y1="240" x2="580" y2="240" className="tm-axis" />
            <path
              d="M70 238 C150 235, 180 160, 245 90 C300 35, 370 85, 430 170 C470 220, 530 238, 570 238"
              className="tm-graph-line"
            />
            <path
              d="M70 238 C150 235, 180 160, 245 90 L245 240 L70 240 Z"
              className="tm-red-fill"
            />
            <text x="260" y="270" className="tm-graph-label">T = 31</text>
          </>
        )}

        {type === "normal-range" && (
          <>
            <line x1="60" y1="240" x2="580" y2="240" className="tm-axis" />
            <path
              d="M70 238 C150 235, 180 160, 245 90 C300 35, 370 85, 430 170 C470 220, 530 238, 570 238"
              className="tm-graph-line"
            />
            <path
              d="M190 240 C215 150, 245 90, 300 72 C350 60, 405 130, 450 240 Z"
              className="tm-red-fill"
            />
            <text x="188" y="270" className="tm-graph-label">29</text>
            <text x="440" y="270" className="tm-graph-label">35</text>
          </>
        )}
      </svg>
    </div>
  );
}

function SchemeBlock({ scheme }) {
  if (scheme.type === "network") {
    return (
      <>
        <h3>{scheme.title}</h3>
        <NetworkDiagram variant={scheme.variant} />
      </>
    );
  }

  if (scheme.type === "graph") {
    return (
      <>
        <h3>{scheme.title}</h3>
        <SimpleGraph type={scheme.variant} />
      </>
    );
  }

  return (
    <div className="tm-note">
      <h3>{scheme.title}</h3>
      <pre>{scheme.content}</pre>
    </div>
  );
}

function SectionContent({ section }) {
  return (
    <>
      {section.text?.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}

      {section.scheme && <SchemeBlock scheme={section.scheme} />}

      {section.schemes?.map((scheme) => (
        <SchemeBlock key={scheme.title} scheme={scheme} />
      ))}

      {section.formulas && <FormulaBlock formulas={section.formulas} />}

      {section.textAfter?.map((paragraph, index) => (
        <p key={`text-after-${index}`}>{paragraph}</p>
      ))}

      {section.formulasAfter && (
        <FormulaBlock formulas={section.formulasAfter} />
      )}

      {section.tables?.map((table) => (
        <div key={table.title}>
          <h3>{table.title}</h3>
          <DataTable table={table} />
        </div>
      ))}

      {section.solution?.map((item, index) => (
        <div key={index} className="tm-note">
          {item}
        </div>
      ))}

      {section.note && <div className="tm-note">{section.note}</div>}

      {section.important && <div className="tm-note">{section.important}</div>}
    </>
  );
}

function getTocType(title) {
  if (title.startsWith("Часть") || title.startsWith("Задание")) {
    return "bold";
  }

  return "italic";
}

function DocumentContent() {
  return (
    <section className="tm-lecture-content">
      <h2>Содержание документа</h2>

      <div className="tm-lecture-list">
        {costPracticeSections.map((section, index) => {
          const tocType = getTocType(section.title);

          return (
            <button
              key={section.id}
              type="button"
              className="tm-lecture-row"
              onClick={() => scrollToBlock(section.id)}
            >
              <span className={`tm-lecture-title ${tocType}`}>
                {section.title}
              </span>

              <span className="tm-dots"></span>

              <span className="tm-page-number">{index + 1}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default function ClassroomCostPractice({ onBack }) {
  return (
    <main className="tm-page">
      <section className="tm-hero">
        <button className="tm-top-back" onClick={onBack}>
          ← К списку тем
        </button>

        <span className="tm-badge">Аудиторная работа</span>

        <h1>Учёт случайности при управлении проектами</h1>

        <p>
          Материал по учёту случайности при управлении проектами: случайная
          длительность работ, случайная стоимость, зависимость стоимости от
          времени, вероятности и доверительные интервалы.
        </p>
      </section>

      <DocumentContent />

      <section className="tm-download-section">
        <div>
          <h2>Полный файл аудиторной работы</h2>
          <p>
            Полный документ аудиторной работы со всеми страницами, схемами,
            формулами, таблицами и расчётами можно скачать отдельно.
          </p>
        </div>

        <a className="tm-download" href={documentDownload.href} download>
          Скачать документ
        </a>
      </section>

      <div className="tm-layout">
        <aside className="tm-side-toc">
          <button className="tm-back-button" onClick={onBack}>
            ← К темам
          </button>

          <h3>Содержание</h3>

          {costPracticeSections.map((section, index) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToBlock(section.id)}
            >
              <span>{index + 1}</span>
              {section.title}
            </button>
          ))}
        </aside>

        <div className="tm-content">
          {costPracticeSections.map((section) => (
            <section key={section.id} id={section.id} className="tm-section">
              <h2>{section.title}</h2>
              <SectionContent section={section} />
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}