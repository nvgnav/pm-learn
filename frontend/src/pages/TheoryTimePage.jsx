import PageLayout from "../components/PageLayout";

function ArcWorkDiagram() {
  return (
    <div className="diagram-card">
      <h3>Модель «дуга–работа»</h3>

      <svg viewBox="0 0 800 220" className="theory-svg">
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#2f6fb1" />
          </marker>
        </defs>

        <circle cx="150" cy="110" r="30" fill="#edf5fd" stroke="#2f6fb1" strokeWidth="3" />
        <circle cx="450" cy="110" r="30" fill="#edf5fd" stroke="#2f6fb1" strokeWidth="3" />

        <text x="140" y="116" className="svg-node-text">i</text>
        <text x="440" y="116" className="svg-node-text">j</text>

        <line
          x1="180"
          y1="110"
          x2="420"
          y2="110"
          stroke="#2f6fb1"
          strokeWidth="4"
          markerEnd="url(#arrow)"
        />

        <text x="270" y="72" className="svg-label">Операция A</text>

        <text x="90" y="180" className="svg-small">Начальное событие</text>
        <text x="380" y="180" className="svg-small">Конечное событие</text>
      </svg>

      <p className="diagram-note">
        В модели «дуга–работа» операция изображается стрелкой, а событие — узлом.
        Начало следующей работы связано с завершением предшествующих работ.
      </p>
    </div>
  );
}

function FakeWorkDiagram() {
  return (
    <div className="diagram-card">
      <h3>Фиктивная операция</h3>

      <svg viewBox="0 0 900 260" className="theory-svg">
        <defs>
          <marker id="arrow2" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#2f6fb1" />
          </marker>
        </defs>

        <text x="150" y="30" className="svg-label">Неверно</text>

        <circle cx="120" cy="120" r="25" fill="#edf5fd" stroke="#2f6fb1" strokeWidth="3" />
        <circle cx="300" cy="120" r="25" fill="#edf5fd" stroke="#2f6fb1" strokeWidth="3" />

        <line x1="145" y1="110" x2="275" y2="110" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arrow2)" />
        <line x1="145" y1="130" x2="275" y2="130" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arrow2)" />

        <text x="190" y="95" className="svg-small">A</text>
        <text x="190" y="160" className="svg-small">B</text>

        <text x="600" y="30" className="svg-label">Верно</text>

        <circle cx="520" cy="80" r="25" fill="#edf5fd" stroke="#2f6fb1" strokeWidth="3" />
        <circle cx="700" cy="80" r="25" fill="#edf5fd" stroke="#2f6fb1" strokeWidth="3" />
        <circle cx="700" cy="180" r="25" fill="#edf5fd" stroke="#2f6fb1" strokeWidth="3" />
        <circle cx="850" cy="130" r="25" fill="#edf5fd" stroke="#2f6fb1" strokeWidth="3" />

        <line x1="545" y1="80" x2="675" y2="80" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arrow2)" />
        <line x1="545" y1="95" x2="675" y2="170" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arrow2)" />
        <line x1="725" y1="80" x2="825" y2="130" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arrow2)" />
        <line
          x1="725"
          y1="180"
          x2="825"
          y2="130"
          stroke="#2f6fb1"
          strokeWidth="4"
          strokeDasharray="6 6"
          markerEnd="url(#arrow2)"
        />

        <text x="600" y="65" className="svg-small">A</text>
        <text x="600" y="190" className="svg-small">B</text>
        <text x="760" y="65" className="svg-small">C</text>
        <text x="740" y="205" className="svg-small">Фиктивная</text>
      </svg>

      <p className="diagram-note">
        Фиктивные операции вводятся для правильного отображения логических связей
        и однозначного задания работ, не требуя времени и ресурсов.
      </p>
    </div>
  );
}

function ForwardBackwardDiagram() {
  return (
    <div className="diagram-card">
      <h3>Прямой и обратный проход</h3>

      <div className="passes-grid">
        <div className="mini-box">
          <h4>Прямой проход</h4>
          <p>
            Определяются ранние сроки событий и работ, начиная от исходного
            события и двигаясь к завершающему.
          </p>
          <div className="formula-box">ES(j) = max(ES(i) + d(i,j))</div>
        </div>

        <div className="mini-box">
          <h4>Обратный проход</h4>
          <p>
            Определяются поздние сроки, начиная от завершающего события и двигаясь
            в обратном направлении.
          </p>
          <div className="formula-box">LF(i) = min(LF(j) - d(i,j))</div>
        </div>
      </div>
    </div>
  );
}

function CriticalPathDiagram() {
  return (
    <div className="diagram-card">
      <h3>Критический путь</h3>

      <svg viewBox="0 0 900 250" className="theory-svg">
        <defs>
          <marker id="arrow3" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#2f6fb1" />
          </marker>
        </defs>

        {[100, 250, 400, 550, 700].map((x, i) => (
          <circle key={i} cx={x} cy="130" r="28" fill="#edf5fd" stroke="#2f6fb1" strokeWidth="3" />
        ))}

        <line x1="128" y1="130" x2="222" y2="130" stroke="#d94b4b" strokeWidth="5" markerEnd="url(#arrow3)" />
        <line x1="278" y1="130" x2="372" y2="130" stroke="#d94b4b" strokeWidth="5" markerEnd="url(#arrow3)" />
        <line x1="428" y1="130" x2="522" y2="130" stroke="#d94b4b" strokeWidth="5" markerEnd="url(#arrow3)" />
        <line x1="578" y1="130" x2="672" y2="130" stroke="#d94b4b" strokeWidth="5" markerEnd="url(#arrow3)" />

        <text x="300" y="200" className="svg-small red-text">
          Критический путь проекта
        </text>
      </svg>

      <p className="diagram-note">
        Критический путь определяет минимально возможную продолжительность
        проекта. Задержка любой критической операции сдвигает срок завершения
        всего проекта.
      </p>
    </div>
  );
}

function FloatCards() {
  const items = [
    {
      title: "Полный резерв",
      text: "Максимальная задержка работы без сдвига общего срока завершения проекта.",
    },
    {
      title: "Свободный резерв",
      text: "Максимальная задержка работы без влияния на раннее начало последующих работ.",
    },
    {
      title: "Независимый резерв",
      text: "Запас времени, не влияющий ни на предшествующие, ни на последующие работы.",
    },
    {
      title: "Гарантированный резерв",
      text: "Допустимая задержка без изменения срока проекта при запаздывании предшествующих работ.",
    },
  ];

  return (
    <div className="diagram-card">
      <h3>Резервы времени</h3>

      <div className="reserve-grid">
        {items.map((item) => (
          <div key={item.title} className="reserve-card">
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function NodeWorkDiagram() {
  return (
    <div className="diagram-card">
      <h3>Модель «узел–работа»</h3>

      <svg viewBox="0 0 760 220" className="theory-svg">
        <defs>
          <marker id="arrow4" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#2f6fb1" />
          </marker>
        </defs>

        <rect x="70" y="80" rx="18" ry="18" width="90" height="56" fill="#edf5fd" stroke="#2f6fb1" strokeWidth="3" />
        <rect x="240" y="50" rx="18" ry="18" width="90" height="56" fill="#edf5fd" stroke="#2f6fb1" strokeWidth="3" />
        <rect x="240" y="140" rx="18" ry="18" width="90" height="56" fill="#edf5fd" stroke="#2f6fb1" strokeWidth="3" />
        <rect x="430" y="80" rx="18" ry="18" width="90" height="56" fill="#edf5fd" stroke="#2f6fb1" strokeWidth="3" />
        <rect x="610" y="80" rx="18" ry="18" width="90" height="56" fill="#edf5fd" stroke="#2f6fb1" strokeWidth="3" />

        <line x1="160" y1="108" x2="240" y2="78" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arrow4)" />
        <line x1="160" y1="108" x2="240" y2="168" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arrow4)" />
        <line x1="330" y1="78" x2="430" y2="108" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arrow4)" />
        <line x1="330" y1="168" x2="430" y2="108" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arrow4)" />
        <line x1="520" y1="108" x2="610" y2="108" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arrow4)" />

        <text x="110" y="114" className="svg-node-text">A</text>
        <text x="280" y="84" className="svg-node-text">B</text>
        <text x="280" y="174" className="svg-node-text">C</text>
        <text x="470" y="114" className="svg-node-text">D</text>
        <text x="650" y="114" className="svg-node-text">E</text>
      </svg>

      <p className="diagram-note">
        В модели «узел–работа» сами работы обозначаются узлами, а связи между
        ними отображают отношения предшествования.
      </p>
    </div>
  );
}

function StepMethodDiagram() {
  return (
    <div className="diagram-card">
      <h3>Ступенчатый метод и лаги</h3>

      <svg viewBox="0 0 900 260" className="theory-svg">
        <rect x="80" y="60" width="180" height="40" rx="12" fill="#6ea0d4" />
        <rect x="260" y="110" width="180" height="40" rx="12" fill="#4d82c3" />
        <rect x="440" y="160" width="180" height="40" rx="12" fill="#6ea0d4" />

        <text x="108" y="86" className="svg-small white-text">Выкопать траншею</text>
        <text x="302" y="136" className="svg-small white-text">Уложить трубу</text>
        <text x="466" y="186" className="svg-small white-text">Засыпать траншею</text>

        <line x1="260" y1="80" x2="260" y2="110" stroke="#2f6fb1" strokeWidth="3" />
        <line x1="440" y1="130" x2="440" y2="160" stroke="#2f6fb1" strokeWidth="3" />

        <rect x="700" y="80" width="150" height="36" rx="12" fill="#dbe8f6" stroke="#2f6fb1" strokeWidth="2" />
        <rect x="700" y="160" width="150" height="36" rx="12" fill="#dbe8f6" stroke="#2f6fb1" strokeWidth="2" />

        <text x="720" y="103" className="svg-small">Начало–начало</text>
        <text x="735" y="183" className="svg-small">Окончание</text>

        <line
          x1="775"
          y1="116"
          x2="775"
          y2="160"
          stroke="#d94b4b"
          strokeWidth="3"
          strokeDasharray="6 6"
        />

        <text x="755" y="145" className="svg-small red-text">лаг</text>
      </svg>

      <p className="diagram-note">
        Ступенчатый метод позволяет начинать следующую работу до полного
        завершения предыдущей. Лаг показывает временной сдвиг между связанными
        операциями.
      </p>
    </div>
  );
}

export default function TheoryTimePage() {
  return (
    <PageLayout activePage="theory">
      <div className="theory-page">
        <section className="content-block">
          <h1>Управление временем проекта</h1>
          <p>
            Сетевой график проекта раскрывает внутренние связи между работами,
            служит основой для календарного планирования и помогает определять
            порядок выполнения операций. Рассматриваются модели «дуга–работа»
            и «узел–работа», критический путь и резервы времени.
          </p>
        </section>

        <section className="theory-section">
          <h2>1. Модель «дуга–работа»</h2>
          <p>
            В этой модели операция изображается ориентированной стрелкой, а событие —
            узлом. Событие отражает момент времени, когда завершаются одни работы
            и могут начаться другие.
          </p>
          <ArcWorkDiagram />
          <FakeWorkDiagram />
        </section>

        <section className="theory-section">
          <h2>2. Расчёт сетевой модели</h2>
          <p>
            После построения сети выполняется расчёт сроков: прямой проход
            используется для ранних сроков, обратный — для поздних.
          </p>
          <ForwardBackwardDiagram />
        </section>

        <section className="theory-section">
          <h2>3. Критический путь</h2>
          <p>
            Критический путь определяет минимально возможную продолжительность
            проекта. Задержка любой критической операции сдвигает срок завершения
            всего проекта.
          </p>
          <CriticalPathDiagram />
        </section>

        <section className="theory-section">
          <h2>4. Резервы времени</h2>
          <p>
            Для некритических операций рассчитываются полный, свободный,
            независимый и гарантированный резервы времени.
          </p>
          <FloatCards />
        </section>

        <section className="theory-section">
          <h2>5. Модель «узел–работа»</h2>
          <p>
            В модели «узел–работа» сами работы обозначаются узлами, а дуги
            отображают отношения предшествования.
          </p>
          <NodeWorkDiagram />
        </section>

        <section className="theory-section">
          <h2>6. Адаптация сетей к реальности</h2>
          <p>
            На практике используется ступенчатый метод и лаги, когда последующая
            операция может начинаться не только после полного завершения предыдущей.
          </p>
          <StepMethodDiagram />
        </section>
      </div>
    </PageLayout>
  );
}