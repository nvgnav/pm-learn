import { useMemo, useRef, useState } from "react";
import PageLayout from "../components/PageLayout";
import "../styles/study.css";

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

function ArcWorkBasicDiagram() {
  return (
    <div className="diagram-card">
      <h3>События и стрелки</h3>
      <svg viewBox="0 0 980 260" className="theory-svg">
        <defs>
          <marker id="arr1" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#2f6fb1" />
          </marker>
        </defs>

        <text x="170" y="32" className="svg-label">а) Одна операция</text>
        <circle cx="140" cy="120" r="28" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
        <circle cx="370" cy="120" r="28" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
        <line x1="168" y1="120" x2="342" y2="120" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arr1)" />
        <text x="245" y="98" className="svg-small">A</text>
        <text x="134" y="126" className="svg-node-text">i</text>
        <text x="364" y="126" className="svg-node-text">j</text>
        <text x="78" y="176" className="svg-small">начальное событие</text>
        <text x="310" y="176" className="svg-small">конечное событие</text>

        <text x="665" y="32" className="svg-label">б) Для старта C нужны A и B</text>
        <circle cx="560" cy="78" r="22" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
        <circle cx="560" cy="170" r="22" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
        <circle cx="730" cy="124" r="24" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
        <circle cx="900" cy="124" r="24" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />

        <line x1="582" y1="84" x2="706" y2="116" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arr1)" />
        <line x1="582" y1="164" x2="706" y2="132" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arr1)" />
        <line x1="754" y1="124" x2="872" y2="124" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arr1)" />

        <text x="632" y="78" className="svg-small">A</text>
        <text x="632" y="178" className="svg-small">B</text>
        <text x="810" y="108" className="svg-small">C</text>
      </svg>
    </div>
  );
}

function ArcWorkWrongCorrectDiagram() {
  return (
    <div className="diagram-card">
      <h3>Соединение событий: неверно и верно</h3>
      <svg viewBox="0 0 980 280" className="theory-svg">
        <defs>
          <marker id="arr2" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#2f6fb1" />
          </marker>
        </defs>

        <text x="175" y="32" className="svg-label">а) Неверно</text>
        <circle cx="120" cy="130" r="24" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
        <circle cx="310" cy="130" r="24" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
        <line x1="144" y1="120" x2="286" y2="120" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arr2)" />
        <line x1="144" y1="140" x2="286" y2="140" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arr2)" />
        <text x="205" y="104" className="svg-small">A</text>
        <text x="205" y="162" className="svg-small">B</text>

        <text x="660" y="32" className="svg-label">б) Верно</text>
        <circle cx="560" cy="82" r="24" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
        <circle cx="560" cy="178" r="24" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
        <circle cx="740" cy="82" r="24" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
        <circle cx="740" cy="178" r="24" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
        <circle cx="905" cy="130" r="24" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />

        <line x1="584" y1="82" x2="712" y2="82" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arr2)" />
        <line x1="584" y1="178" x2="712" y2="178" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arr2)" />
        <line x1="764" y1="82" x2="878" y2="122" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arr2)" />
        <line x1="764" y1="178" x2="878" y2="138" stroke="#2f6fb1" strokeWidth="4" strokeDasharray="8 6" markerEnd="url(#arr2)" />

        <text x="642" y="65" className="svg-small">A</text>
        <text x="642" y="201" className="svg-small">B</text>
        <text x="814" y="82" className="svg-small">C</text>
        <text x="785" y="204" className="svg-small">D (фиктивная)</text>
      </svg>
    </div>
  );
}

function LogicDiagram() {
  return (
    <div className="diagram-card">
      <h3>Использование фиктивных стрелок для логики</h3>
      <svg viewBox="0 0 980 300" className="theory-svg">
        <defs>
          <marker id="arr3" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#2f6fb1" />
          </marker>
        </defs>

        <text x="160" y="34" className="svg-label">а) Неверно</text>
        <circle cx="120" cy="90" r="22" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
        <circle cx="120" cy="200" r="22" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
        <circle cx="300" cy="145" r="22" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
        <circle cx="470" cy="145" r="22" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />

        <line x1="142" y1="90" x2="278" y2="138" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arr3)" />
        <line x1="142" y1="200" x2="278" y2="152" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arr3)" />
        <line x1="322" y1="145" x2="448" y2="145" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arr3)" />
        <text x="188" y="92" className="svg-small">A</text>
        <text x="187" y="210" className="svg-small">B</text>
        <text x="378" y="128" className="svg-small">C</text>

        <text x="700" y="34" className="svg-label">б) Верно</text>
        <circle cx="600" cy="82" r="22" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
        <circle cx="600" cy="200" r="22" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
        <circle cx="760" cy="82" r="22" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
        <circle cx="760" cy="200" r="22" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
        <circle cx="930" cy="82" r="22" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
        <circle cx="930" cy="200" r="22" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />

        <line x1="622" y1="82" x2="738" y2="82" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arr3)" />
        <line x1="622" y1="200" x2="738" y2="200" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arr3)" />
        <line x1="782" y1="82" x2="908" y2="82" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arr3)" />
        <line x1="782" y1="200" x2="908" y2="200" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arr3)" />
        <line x1="760" y1="104" x2="760" y2="178" stroke="#2f6fb1" strokeWidth="4" strokeDasharray="8 6" markerEnd="url(#arr3)" />

        <text x="675" y="65" className="svg-small">A</text>
        <text x="675" y="222" className="svg-small">B</text>
        <text x="842" y="65" className="svg-small">C</text>
        <text x="842" y="222" className="svg-small">E</text>
        <text x="714" y="146" className="svg-small">D</text>
      </svg>
    </div>
  );
}

function NumberingDiagram() {
  return (
    <div className="diagram-card">
      <h3>Нумерация событий сети</h3>
      <svg viewBox="0 0 980 280" className="theory-svg">
        <defs>
          <marker id="arr4" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#2f6fb1" />
          </marker>
        </defs>

        {[0, 1, 2, 3, 4, 5, 6].map((n, idx) => (
          <g key={n}>
            <circle
              cx={90 + idx * 135}
              cy={140}
              r="28"
              fill="#eef5fc"
              stroke="#2f6fb1"
              strokeWidth="3"
            />
            <text x={80 + idx * 135} y={147} className="svg-node-text">
              {n}
            </text>
          </g>
        ))}

        {[0, 1, 2, 3, 4, 5].map((_, idx) => (
          <line
            key={idx}
            x1={118 + idx * 135}
            y1="140"
            x2={197 + idx * 135}
            y2="140"
            stroke="#2f6fb1"
            strokeWidth="4"
            markerEnd="url(#arr4)"
          />
        ))}

        <text x="108" y="104" className="svg-small">ES0</text>
        <text x="244" y="104" className="svg-small">ES1</text>
        <text x="379" y="104" className="svg-small">ES2</text>
        <text x="514" y="104" className="svg-small">ES3</text>
        <text x="649" y="104" className="svg-small">ES4</text>
        <text x="784" y="104" className="svg-small">ES5</text>
        <text x="919" y="104" className="svg-small">ES6</text>
      </svg>
    </div>
  );
}

function CriticalPathDiagram() {
  return (
    <div className="diagram-card">
      <h3>Критический путь</h3>
      <svg viewBox="0 0 980 260" className="theory-svg">
        <defs>
          <marker id="arr5" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#2f6fb1" />
          </marker>
        </defs>

        <circle cx="80" cy="130" r="25" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
        <circle cx="220" cy="130" r="25" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
        <circle cx="360" cy="130" r="25" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
        <circle cx="500" cy="130" r="25" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
        <circle cx="640" cy="130" r="25" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
        <circle cx="780" cy="130" r="25" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
        <circle cx="920" cy="130" r="25" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />

        <line x1="105" y1="130" x2="195" y2="130" stroke="#d94b4b" strokeWidth="5" markerEnd="url(#arr5)" />
        <line x1="245" y1="130" x2="335" y2="130" stroke="#d94b4b" strokeWidth="5" markerEnd="url(#arr5)" />
        <line x1="385" y1="130" x2="475" y2="130" stroke="#d94b4b" strokeWidth="5" markerEnd="url(#arr5)" />
        <line x1="525" y1="130" x2="615" y2="130" stroke="#d94b4b" strokeWidth="5" markerEnd="url(#arr5)" />
        <line x1="665" y1="130" x2="755" y2="130" stroke="#d94b4b" strokeWidth="5" markerEnd="url(#arr5)" />
        <line x1="805" y1="130" x2="895" y2="130" stroke="#d94b4b" strokeWidth="5" markerEnd="url(#arr5)" />

        <text x="138" y="108" className="svg-small red-text">B</text>
        <text x="279" y="108" className="svg-small red-text">D</text>
        <text x="419" y="108" className="svg-small red-text">F</text>
        <text x="559" y="108" className="svg-small red-text">I</text>
        <text x="700" y="108" className="svg-small red-text">L</text>

        <text x="350" y="210" className="svg-label red-text">
          Критический путь: B → D → F → I → L
        </text>
      </svg>
    </div>
  );
}

function NodeWorkDiagram() {
  return (
    <div className="diagram-card">
      <h3>Модель «узел–работа»</h3>
      <svg viewBox="0 0 980 260" className="theory-svg">
        <defs>
          <marker id="arr6" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#2f6fb1" />
          </marker>
        </defs>

        <rect x="80" y="100" rx="18" ry="18" width="120" height="58" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
        <rect x="290" y="60" rx="18" ry="18" width="120" height="58" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
        <rect x="290" y="155" rx="18" ry="18" width="120" height="58" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
        <rect x="520" y="100" rx="18" ry="18" width="120" height="58" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />
        <rect x="760" y="100" rx="18" ry="18" width="140" height="58" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="3" />

        <line x1="200" y1="126" x2="290" y2="88" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arr6)" />
        <line x1="200" y1="132" x2="290" y2="184" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arr6)" />
        <line x1="410" y1="88" x2="520" y2="126" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arr6)" />
        <line x1="410" y1="184" x2="520" y2="132" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arr6)" />
        <line x1="640" y1="129" x2="760" y2="129" stroke="#2f6fb1" strokeWidth="4" markerEnd="url(#arr6)" />

        <text x="128" y="135" className="svg-node-text">A</text>
        <text x="338" y="95" className="svg-node-text">B</text>
        <text x="338" y="190" className="svg-node-text">C</text>
        <text x="568" y="135" className="svg-node-text">D</text>
        <text x="820" y="135" className="svg-node-text">Окончание</text>
      </svg>
    </div>
  );
}

function StepMethodDiagram() {
  return (
    <div className="diagram-card">
      <h3>Ступенчатый метод и лаги</h3>
      <svg viewBox="0 0 980 280" className="theory-svg">
        <rect x="80" y="70" width="210" height="42" rx="12" fill="#7da9d8" />
        <rect x="270" y="125" width="190" height="42" rx="12" fill="#4d82c3" />
        <rect x="435" y="180" width="230" height="42" rx="12" fill="#7da9d8" />

        <text x="105" y="97" className="svg-small white-text">Выкопать траншею</text>
        <text x="302" y="152" className="svg-small white-text">Уложить трубу</text>
        <text x="470" y="207" className="svg-small white-text">Засыпать траншею</text>

        <line x1="290" y1="112" x2="290" y2="125" stroke="#2f6fb1" strokeWidth="3" />
        <line x1="460" y1="167" x2="460" y2="180" stroke="#2f6fb1" strokeWidth="3" />

        <rect x="760" y="90" width="160" height="38" rx="12" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="2" />
        <rect x="760" y="180" width="160" height="38" rx="12" fill="#eef5fc" stroke="#2f6fb1" strokeWidth="2" />
        <text x="780" y="114" className="svg-small">Начало–начало</text>
        <text x="800" y="205" className="svg-small">Окончание</text>

        <line x1="840" y1="128" x2="840" y2="180" stroke="#d94b4b" strokeWidth="3" strokeDasharray="6 6" />
        <text x="818" y="160" className="svg-small red-text">лаг</text>
      </svg>
    </div>
  );
}

const theoryTopics = [
  {
    id: "time-management",
    title: "Управление временем проекта",
    shortDescription:
      "Полный теоретический материал по сетевым моделям, критическому пути и резервам времени.",
    sections: [
      {
        id: "intro",
        title: "1. Управление временем проекта",
        paragraphs: [
          "Сетевой график проекта раскрывает его внутренние связи, служит основой для календарного планирования работ и использования оборудования, облегчает взаимодействие менеджеров и исполнителей.",
          "Сетевая модель отображает взаимосвязи между операциями и порядок их выполнения, позволяя формализовать логику проекта.",
        ],
      },
      {
        id: "arc-model",
        title: "2. Модель «дуга–работа»",
        paragraphs: [
          "Для представления операции используется стрелка, направление которой соответствует процессу реализации проекта во времени.",
          "Отношение упорядочения между операциями задаётся с помощью событий. Событие — это момент времени, когда завершаются одни операции и начинаются другие.",
          "Начальная и конечная точки любой операции описываются парой событий: начальным и конечным.",
          "Операции, выходящие из некоторого события, не могут начаться, пока не завершены все операции, входящие в это событие.",
        ],
        diagram: <ArcWorkBasicDiagram />,
      },
      {
        id: "arc-network",
        title: "3. Сетевое представление проекта",
        paragraphs: [
          "Правило 1. Каждая операция в сети представляется одной дугой.",
          "Правило 2. Ни одна пара операций не должна определяться одинаковыми начальным и конечным событиями.",
          "Если две или более операций могут выполняться одновременно и при этом определялись бы одинаковой парой событий, вводится фиктивная операция.",
          "Фиктивные операции не требуют затрат времени и ресурсов, но позволяют однозначно задать логику следования.",
          "При включении каждой операции в сеть нужно ответить на три вопроса: какие операции должны завершиться перед ней, какие следуют после неё и какие могут выполняться одновременно с ней.",
        ],
        diagram: (
          <>
            <ArcWorkWrongCorrectDiagram />
            <LogicDiagram />
          </>
        ),
        formulas: [
          "Правило нумерации: номер начального события всегда меньше номера конечного.",
        ],
      },
      {
        id: "numbering",
        title: "4. Нумерация событий сети",
        paragraphs: [
          "Для правильной нумерации событий используется простой алгоритм.",
          "Шаг 1. Присвоить событию, в которое не входит ни одной дуги, начальный номер.",
          "Шаг 2. Присвоить следующий номер любому ненумерованному событию, для которого все предшествующие события уже занумерованы.",
          "Шаг 2 повторяется до тех пор, пока не будут занумерованы все события сети.",
        ],
        diagram: <NumberingDiagram />,
      },
      {
        id: "calc-arc",
        title: "5. Расчёт сетевой модели",
        paragraphs: [
          "Построение сети является первым шагом на пути к календарному плану проекта.",
          "Из-за наличия взаимосвязей между работами сроки начала и окончания операций определяются расчётным путём.",
          "В результате расчётов выделяются критические и некритические операции.",
          "Операция считается критической, если задержка её начала приводит к увеличению срока окончания всего проекта.",
          "Некритическая операция имеет резерв времени.",
        ],
      },
      {
        id: "critical-path",
        title: "6. Определение критического пути",
        paragraphs: [
          "Критический путь — это непрерывная последовательность критических операций, связывающих начальное и завершающее события сети.",
          "Он задаёт все критические операции проекта и минимально возможную длительность выполнения проекта.",
          "Расчёт критического пути включает два этапа: прямой проход и обратный проход.",
        ],
        formulas: [
          "ES₀ = 0",
          "ESⱼ = max(ESᵢ + Dᵢⱼ)",
          "LFₙ = ESₙ",
          "LFᵢ = min(LFⱼ − Dᵢⱼ)",
          "Условие 1: ESᵢ = LFᵢ",
          "Условие 2: ESⱼ = LFⱼ",
          "Условие 3: ESⱼ − ESᵢ = LFⱼ − LFᵢ = Dᵢⱼ",
        ],
        calculations: [
          "Первый этап (прямой проход): для каждого события вычисляется ранний срок его наступления ES.",
          "Второй этап (обратный проход): для каждого события вычисляется поздний срок его наступления LF.",
          "Операция принадлежит критическому пути, если она удовлетворяет всем трём условиям одновременно.",
          "В приведённом в лекции примере критический путь включает операции: B, D, F, I, L.",
        ],
        diagram: <CriticalPathDiagram />,
      },
      {
        id: "floats",
        title: "7. Определение резервов времени",
        paragraphs: [
          "После определения критического пути вычисляются резервы времени для некритических операций.",
          "Резерв времени является показателем гибкости планирования сроков некритических работ.",
          "Рассматриваются четыре показателя: полный, свободный, независимый и гарантированный резервы времени.",
          "Для критической операции резерв времени равен нулю.",
        ],
        formulas: [
          "ESᵢⱼ = ESᵢ",
          "EFᵢⱼ = ESᵢⱼ + Dᵢⱼ",
          "LFᵢⱼ = LFⱼ",
          "LSᵢⱼ = LFᵢⱼ − Dᵢⱼ",
          "TFᵢⱼ = LFⱼ − ESᵢ − Dᵢⱼ",
          "FFᵢⱼ = ESⱼ − ESᵢ − Dᵢⱼ",
          "IFᵢⱼ = ESⱼ − LFᵢ − Dᵢⱼ",
          "SFᵢⱼ = LFⱼ − LFᵢ − Dᵢⱼ",
        ],
        calculations: [
          "Полный резерв — максимальная задержка работы без сдвига срока завершения проекта.",
          "Свободный резерв — задержка работы без влияния на раннее начало последующих работ.",
          "Независимый резерв — задержка без влияния на предшествующие и последующие работы.",
          "Гарантированный резерв — допустимая задержка без нарушения конечного срока проекта при запаздывании предшествующих работ.",
        ],
      },
      {
        id: "node-model",
        title: "8. Модель «узел–работа»",
        paragraphs: [
          "В этой модели работы обозначаются узлами, а дуги показывают только отношения предшествования.",
          "Основные правила построения: сеть разворачивается слева направо, ни одна операция не может начаться, пока не выполнены все предшествующие, образование петель недопустимо.",
          "В таких моделях не возникает необходимости вводить фиктивные работы, но добавляются условные работы «Начало» и «Окончание» с нулевой продолжительностью.",
        ],
        diagram: <NodeWorkDiagram />,
      },
      {
        id: "node-network",
        title: "9. Сетевое представление проекта в модели «узел–работа»",
        paragraphs: [
          "При включении каждой работы в сетевую модель необходимо определить её непосредственных предшественников и последователей.",
          "Предшествующее множество работ P(i) — это множество работ, непосредственно предшествующих i-й работе.",
          "Непосредственно следующее множество S(i) — это множество работ, непосредственно следующих за i-й работой.",
        ],
      },
      {
        id: "node-calc",
        title: "10. Расчёт сетевой модели в «узел–работа»",
        paragraphs: [
          "Продолжительность i-й работы обозначим через dᵢ.",
          "ESᵢ — наиболее ранний возможный срок начала i-й работы.",
          "EFᵢ — наиболее ранний возможный срок окончания i-й работы.",
          "LFᵢ — наиболее поздний допустимый срок окончания i-й работы.",
          "LSᵢ = LFᵢ − dᵢ — наиболее поздний допустимый срок начала i-й работы.",
        ],
        formulas: [
          "Для условной работы «Начало»: ESstart = 0, dstart = 0",
          "ESᵢ = max(EFₖ), где k ∈ P(i)",
          "EFᵢ = ESᵢ + dᵢ",
          "Для условной работы «Окончание»: LFfin = EFfin",
          "LFᵢ = min(LSₘ), где m ∈ S(i)",
          "LSᵢ = LFᵢ − dᵢ",
        ],
      },
      {
        id: "node-floats",
        title: "11. Определение резервов времени в модели «узел–работа»",
        paragraphs: [
          "Резерв времени является показателем гибкости планирования сроков некритических работ.",
          "Полный резерв времени представляет собой максимальную задержку работы без задержки всего проекта.",
          "Свободный резерв времени показывает максимально возможную задержку, не влияющую на начало последующих работ.",
          "Работа считается критической, если её полный резерв равен нулю.",
        ],
        formulas: [
          "TFᵢ = LSᵢ − ESᵢ = LFᵢ − EFᵢ",
          "FFᵢ = min(ESₓ) − EFᵢ, где x ∈ S(i)",
          "Критическая работа: TFᵢ = 0",
        ],
      },
      {
        id: "adaptation",
        title: "12. Адаптация правил построения сетей к реальности",
        paragraphs: [
          "Предположение о том, что все предшествующие операции должны быть завершены на 100%, не всегда выполняется на практике.",
          "Часто выполнение одной операции перекрывает начало другой.",
          "В таких случаях применяются ступенчатый метод и лаги.",
        ],
      },
      {
        id: "step-method",
        title: "13. Ступенчатый метод",
        paragraphs: [
          "Ступенчатый метод позволяет разбить операцию на части так, чтобы последующая операция могла начаться быстрее.",
          "Это особенно полезно в случаях, когда часть работы уже позволяет стартовать следующему этапу.",
          "Базовое отношение в таком случае называется «окончание–начало».",
        ],
        diagram: <StepMethodDiagram />,
      },
      {
        id: "lags",
        title: "14. Использование задержек (лагов)",
        paragraphs: [
          "Лаг — это количество времени, на которое может быть отложено начало или окончание зависимой операции.",
          "Лаги повышают гибкость сетевого графика и позволяют корректнее описывать реальные зависимости проекта.",
          "Отношения «окончание–начало» применяются, когда следующая операция может начаться только спустя некоторое время после завершения предыдущей.",
          "Отношения «начало–начало» позволяют частично параллелить последовательные операции.",
          "Отношения «окончание–окончание» описывают зависимость окончания одной операции от окончания другой.",
          "Отношения «начало–окончание» описывают ситуацию, когда завершение одной операции зависит от начала другой.",
          "Одна и та же операция может быть связана сразу несколькими отношениями задержки.",
          "При любых типах задержек процедура расчёта сети остаётся прежней — меняется только способ влияния одной операции на начало или окончание другой.",
        ],
      },
    ],
  },
];

function TopicSidebar({ topics, activeTopicId, onSelect }) {
  return (
    <div className="study-sidebar-card">
      <div className="study-sidebar-title">Темы</div>
      <div className="study-sidebar-subtitle">
        Краткие теоретические материалы по дисциплине
      </div>

      <div className="study-topic-list">
        {topics.map((topic, index) => (
          <button
            key={topic.id}
            type="button"
            className={`study-topic-button ${activeTopicId === topic.id ? "active" : ""}`}
            onClick={() => onSelect(topic.id)}
          >
            <span className="study-topic-number">{index + 1}</span>
            <span>
              <span className="study-topic-title">{topic.title}</span>
              <span className="study-topic-description">
                {topic.shortDescription}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ContentSidebar({ sections, onJump }) {
  return (
    <div className="study-sidebar-card">
      <div className="study-sidebar-title">Содержание темы</div>
      <div className="study-sidebar-subtitle">
        Нажмите на пункт, чтобы перейти к нужному разделу
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
              <span className="study-topic-description">
                Переход к разделу теории
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
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

      {section.formulas && <FormulaBlock items={section.formulas} />}

      {section.calculations && (
        <div className="calc-list">
          {section.calculations.map((item, index) => (
            <div key={index} className="calc-item">
              {item}
            </div>
          ))}
        </div>
      )}

      {section.diagram}
    </section>
  );
}

export default function TheoryPage() {
  const [activeTopicId, setActiveTopicId] = useState("time-management");
  const sectionRefs = useRef({});

  const activeTopic = useMemo(() => {
    return theoryTopics.find((topic) => topic.id === activeTopicId) ?? theoryTopics[0];
  }, [activeTopicId]);

  function handleSelectTopic(topicId) {
    setActiveTopicId(topicId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

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
    <PageLayout activePage="theory">
      <div className="study-layout">
        <aside className="study-sidebar">
          <TopicSidebar
            topics={theoryTopics}
            activeTopicId={activeTopicId}
            onSelect={handleSelectTopic}
          />

          <ContentSidebar
            sections={activeTopic.sections}
            onJump={handleJumpToSection}
          />
        </aside>

        <section className="study-content">
          <div className="study-hero compact-hero">
            <div className="study-badge">Теория</div>
            <h1>{activeTopic.title}</h1>
            <p>
              Ниже приведён полный теоретический материал по теме с рисунками,
              формулами, пояснениями и переходами по содержанию.
            </p>
          </div>

          {activeTopic.sections.map((section) => (
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