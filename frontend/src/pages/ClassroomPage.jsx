import { useState } from "react";
import PageLayout from "../components/PageLayout";

function DistributionCards() {
  return (
    <div className="reserve-grid">
      <div className="reserve-card">
        <h4>Треугольное распределение</h4>
        <p>
          Используется для случайной длительности или стоимости работы при наличии
          оптимистичной, номинальной и пессимистичной оценок.
        </p>
      </div>
      <div className="reserve-card">
        <h4>Бета-распределение</h4>
        <p>
          Используется как более гибкая модель случайной длительности или
          стоимости выполнения работы.
        </p>
      </div>
    </div>
  );
}

function ProbabilityScheme() {
  return (
    <div className="diagram-card">
      <h3>Вероятность и доверительный интервал</h3>

      <svg viewBox="0 0 900 280" className="theory-svg">
        <path
          d="M100 220 C180 80, 320 50, 450 220 C560 70, 700 80, 800 220"
          fill="none"
          stroke="#2f6fb1"
          strokeWidth="4"
        />
        <line x1="120" y1="220" x2="780" y2="220" stroke="#315f95" strokeWidth="3" />
        <line x1="310" y1="220" x2="310" y2="110" stroke="#d94b4b" strokeWidth="3" strokeDasharray="6 6" />
        <line x1="450" y1="220" x2="450" y2="80" stroke="#2f6fb1" strokeWidth="3" strokeDasharray="6 6" />
        <line x1="600" y1="220" x2="600" y2="110" stroke="#d94b4b" strokeWidth="3" strokeDasharray="6 6" />

        <text x="302" y="245" className="svg-small">a</text>
        <text x="444" y="245" className="svg-small">μ</text>
        <text x="594" y="245" className="svg-small">b</text>

        <text x="265" y="96" className="svg-small red-text">левая граница</text>
        <text x="410" y="64" className="svg-small">мат. ожидание</text>
        <text x="548" y="96" className="svg-small red-text">правая граница</text>
      </svg>

      <p className="diagram-note">
        Для длительности и стоимости проекта оцениваются вероятность попадания
        в интервал и доверительный интервал при заданной надёжности.
      </p>
    </div>
  );
}

function CostTimeDiagram() {
  return (
    <div className="diagram-card">
      <h3>Линейная зависимость стоимости от времени</h3>

      <svg viewBox="0 0 860 280" className="theory-svg">
        <line x1="110" y1="230" x2="760" y2="230" stroke="#315f95" strokeWidth="3" />
        <line x1="110" y1="230" x2="110" y2="50" stroke="#315f95" strokeWidth="3" />

        <line x1="180" y1="200" x2="650" y2="90" stroke="#2f6fb1" strokeWidth="4" />
        <circle cx="260" cy="180" r="7" fill="#d94b4b" />
        <circle cx="580" cy="108" r="7" fill="#d94b4b" />

        <text x="180" y="165" className="svg-small">номинальная точка</text>
        <text x="520" y="92" className="svg-small">критическая / пессимистическая</text>

        <text x="45" y="60" className="svg-small">Стоимость</text>
        <text x="710" y="255" className="svg-small">Время</text>
        <text x="365" y="150" className="svg-label">C = a + b·t</text>
      </svg>

      <p className="diagram-note">
        В этой модели стоимость работы считается линейной функцией времени
        выполнения, которое является случайной величиной.
      </p>
    </div>
  );
}

const topics = [
  {
    id: "duration",
    title: "Случайная длительность работ",
    short: "Треугольное и бета-распределение длительности проекта.",
  },
  {
    id: "cost",
    title: "Случайная стоимость работ",
    short: "Анализ стоимости проекта как случайной величины.",
  },
  {
    id: "linear",
    title: "Стоимость зависит от времени",
    short: "Линейная функция стоимости от случайного времени выполнения.",
  },
];

export default function ClassroomPage() {
  const [selectedTopic, setSelectedTopic] = useState("duration");

  return (
    <PageLayout activePage="classroom">
      <div className="theory-page">
        <section className="content-block">
          <h1>Аудиторные работы</h1>
          <p>
            Выберите тему аудиторной работы. В этом разделе рассматриваются
            задачи по случайности длительности, стоимости и параметров проекта.
          </p>
        </section>

        <section className="topics-grid">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className={`topic-card ${selectedTopic === topic.id ? "active-topic" : ""}`}
              onClick={() => setSelectedTopic(topic.id)}
            >
              <h3>{topic.title}</h3>
              <p>{topic.short}</p>
            </div>
          ))}
        </section>

        {selectedTopic === "duration" && (
          <section className="theory-section">
            <div className="content-block">
              <h2>Часть I. Длительность выполнения работы является случайной</h2>
              <p>
                В этой теме рассматривается случайная длительность отдельных
                работ проекта. Для заданной сетевой модели нужно определять
                математическое ожидание, дисперсию, вероятность завершения проекта
                к заданному сроку и доверительный интервал времени выполнения.
              </p>
            </div>

            <DistributionCards />
            <ProbabilityScheme />

            <div className="content-block">
              <h2>Что требуется выполнить</h2>
              <p>
                Используя треугольное и бета-распределение, необходимо оценить:
                вероятность завершить проект не позднее заданного времени,
                вероятность попадания времени выполнения в интервал и
                доверительный интервал при заданной надёжности.
              </p>
            </div>
          </section>
        )}

        {selectedTopic === "cost" && (
          <section className="theory-section">
            <div className="content-block">
              <h2>Часть II. Стоимость выполнения работы является случайной</h2>
              <p>
                В этой теме анализируется случайная стоимость выполнения работ.
                В отличие от анализа времени, здесь учитываются все работы проекта,
                так как каждая из них входит в общую стоимость.
              </p>
            </div>

            <DistributionCards />
            <ProbabilityScheme />

            <div className="content-block">
              <h2>Что требуется выполнить</h2>
              <p>
                Нужно определить математическое ожидание и дисперсию стоимости
                проекта, вероятность уложиться в бюджет и доверительный интервал
                стоимости при различных уровнях надёжности.
              </p>
            </div>
          </section>
        )}

        {selectedTopic === "linear" && (
          <section className="theory-section">
            <div className="content-block">
              <h2>Часть III. Стоимость работы линейно зависит от времени</h2>
              <p>
                В данной теме стоимость работы задаётся линейным законом
                C = a + b·t, где время выполнения работы является случайной
                величиной. На основе этого рассчитываются характеристики стоимости
                всего проекта.
              </p>
            </div>

            <CostTimeDiagram />

            <div className="content-block">
              <h2>Что требуется выполнить</h2>
              <p>
                Нужно определить параметры линейной функции стоимости, а затем
                вычислить математическое ожидание, дисперсию и возможный разброс
                стоимости проекта при случайной длительности выполнения работ.
              </p>
            </div>
          </section>
        )}
      </div>
    </PageLayout>
  );
}