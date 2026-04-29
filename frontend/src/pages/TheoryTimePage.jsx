import "../styles/study.css";
import PageLayout from "../components/PageLayout";
import {
  lectureContent,
  timeManagementSections,
} from "../data/timeManagementTheory";
import { diagramMap } from "../components/theory/TimeManagementDiagrams";

const downloadFileName = "Upravlenie_vremenem_proekta.doc";

function scrollToBlock(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function Formula({ formula, text }) {
  return (
    <p className="tm-formula-line">
      <span className="tm-formula">{formula}</span>
      {text && (
        <>
          <span className="tm-dash"> — </span>
          <span>{text}</span>
        </>
      )}
    </p>
  );
}

function TableBlock({ table }) {
  return (
    <div className="tm-table-scroll">
      <table className="tm-table">
        <thead>
          <tr>
            {table.columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LectureContent() {
  return (
    <section className="tm-lecture-content">
      <h2>Содержание лекции</h2>

      <div className="tm-lecture-list">
        {lectureContent.map((item) => (
          <button
            key={`${item.title}-${item.page}`}
            type="button"
            className="tm-lecture-row"
            onClick={() => scrollToBlock(item.targetId)}
          >
            <span
              className={[
                "tm-lecture-title",
                item.bold ? "bold" : "",
                item.italic ? "italic" : "",
              ].join(" ")}
            >
              {item.title}
            </span>

            <span className="tm-dots" />
            <span className="tm-page-number">{item.page}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function SideToc({ onBack }) {
  return (
    <aside className="tm-side-toc">
      <button type="button" className="tm-back-button" onClick={onBack}>
        ← К темам
      </button>

      <h3>Содержание</h3>

      {lectureContent.map((item, index) => (
        <button
          key={`${item.title}-${index}`}
          type="button"
          onClick={() => scrollToBlock(item.targetId)}
        >
          <span>{index + 1}</span>
          {item.title}
        </button>
      ))}
    </aside>
  );
}

function renderBlock(block, index) {
  if (block.type === "paragraph") {
    return <p key={index}>{block.text}</p>;
  }

  if (block.type === "subtitle") {
    return <h3 key={index}>{block.text}</h3>;
  }

  if (block.type === "list") {
    return (
      <ol key={index}>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    );
  }

  if (block.type === "bullets") {
    return (
      <ul key={index}>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "formula") {
    return <Formula key={index} formula={block.formula} text={block.text} />;
  }

  if (block.type === "formulaGroup") {
    return (
      <div key={index} className="tm-formula-group">
        {block.title && <h3>{block.title}</h3>}
        {block.items.map((item) => (
          <Formula key={item.formula} formula={item.formula} text={item.text} />
        ))}
      </div>
    );
  }

  if (block.type === "table") {
    return <TableBlock key={index} table={block.table} />;
  }

  if (block.type === "diagram") {
    return <div key={index}>{diagramMap[block.name]}</div>;
  }

  if (block.type === "note") {
    return (
      <div key={index} className="tm-note">
        {block.text}
      </div>
    );
  }

  return null;
}

export default function TheoryTimePage({ onBack }) {
  return (
    <PageLayout title="Теория" activePage="theory">
      <div className="tm-page">
        <section className="tm-hero">
          <button type="button" className="tm-top-back" onClick={onBack}>
            ← К списку тем
          </button>

          <span className="tm-badge">Теория</span>
          <h1>Управление временем проекта</h1>
          <p>
            Материал лекции по сетевому планированию проекта: модель
            «дуга–работа», модель «узел–работа», расчёт сетевой модели,
            критический путь, резервы времени, ступенчатый метод и лаги.
          </p>
        </section>

        <LectureContent />

        <section className="tm-download-section">
          <div>
            <h2>Полный файл теории</h2>
            <p>
              Полный документ лекции со всеми страницами, схемами, формулами и
              таблицами можно скачать отдельно.
            </p>
          </div>

          <a className="tm-download" href={`/theory/${downloadFileName}`} download>
            Скачать документ
          </a>
        </section>

        <div className="tm-layout">
          <SideToc onBack={onBack} />

          <main className="tm-content">
            {timeManagementSections.map((section) => (
              <section id={section.id} key={section.id} className="tm-section">
                <h2>{section.title}</h2>
                {section.blocks.map((block, index) => renderBlock(block, index))}
              </section>
            ))}
          </main>
        </div>
      </div>
    </PageLayout>
  );
}