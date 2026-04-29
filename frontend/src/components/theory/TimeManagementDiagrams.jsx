function SvgDefs() {
  return (
    <defs>
      <marker
        id="tm-arrow"
        markerWidth="10"
        markerHeight="10"
        refX="8"
        refY="3"
        orient="auto"
        markerUnits="strokeWidth"
      >
        <path d="M0,0 L0,6 L9,3 z" fill="#2f6fad" />
      </marker>
    </defs>
  );
}

function Diagram({ title, children, wide = false, tall = false }) {
  return (
    <figure className="tm-diagram-card">
      <figcaption className="tm-diagram-title">{title}</figcaption>
      <div className="tm-svg-wrap">
        <svg
          viewBox={
            tall
              ? "0 0 1180 560"
              : wide
                ? "0 0 1180 430"
                : "0 0 980 360"
          }
          className="tm-svg"
        >
          <SvgDefs />
          {children}
        </svg>
      </div>
    </figure>
  );
}

function Event({ x, y, label }) {
  return (
    <>
      <circle cx={x} cy={y} r="22" className="tm-svg-event" />
      <text x={x} y={y + 5} textAnchor="middle" className="tm-svg-node-text">
        {label}
      </text>
    </>
  );
}

function Work({ x, y, label, width = 110, height = 48 }) {
  return (
    <>
      <rect x={x} y={y} width={width} height={height} rx="6" className="tm-svg-work" />
      <text
        x={x + width / 2}
        y={y + height / 2 + 5}
        textAnchor="middle"
        className="tm-svg-node-text"
      >
        {label}
      </text>
    </>
  );
}

function WorkGrid({ x, y, id, es, ef, ls, lf, dur, tf, ff = "0" }) {
  return (
    <g>
      <rect x={x} y={y} width="86" height="66" className="tm-svg-work" />
      <line x1={x + 28} y1={y} x2={x + 28} y2={y + 66} className="tm-svg-grid-line" />
      <line x1={x + 58} y1={y} x2={x + 58} y2={y + 66} className="tm-svg-grid-line" />
      <line x1={x} y1={y + 22} x2={x + 86} y2={y + 22} className="tm-svg-grid-line" />
      <line x1={x} y1={y + 44} x2={x + 86} y2={y + 44} className="tm-svg-grid-line" />

      <text x={x + 14} y={y + 15} textAnchor="middle" className="tm-svg-small">{es}</text>
      <text x={x + 43} y={y + 15} textAnchor="middle" className="tm-svg-small">{id}</text>
      <text x={x + 72} y={y + 15} textAnchor="middle" className="tm-svg-small">{ef}</text>

      <text x={x + 14} y={y + 37} textAnchor="middle" className="tm-svg-small">{tf}</text>
      <text x={x + 43} y={y + 37} textAnchor="middle" className="tm-svg-small">{dur}</text>
      <text x={x + 72} y={y + 37} textAnchor="middle" className="tm-svg-small">{ff}</text>

      <text x={x + 14} y={y + 59} textAnchor="middle" className="tm-svg-small">{ls}</text>
      <text x={x + 43} y={y + 59} textAnchor="middle" className="tm-svg-small">{dur}</text>
      <text x={x + 72} y={y + 59} textAnchor="middle" className="tm-svg-small">{lf}</text>
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, label, dashed = false }) {
  return (
    <>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        className="tm-svg-arrow"
        strokeDasharray={dashed ? "7 6" : "0"}
        markerEnd="url(#tm-arrow)"
      />
      {label && (
        <text
          x={(x1 + x2) / 2}
          y={(y1 + y2) / 2 - 8}
          textAnchor="middle"
          className="tm-svg-label"
        >
          {label}
        </text>
      )}
    </>
  );
}

function Curve({ d, label, x, y, dashed = false }) {
  return (
    <>
      <path
        d={d}
        className="tm-svg-path"
        strokeDasharray={dashed ? "7 6" : "0"}
        markerEnd="url(#tm-arrow)"
      />
      {label && (
        <text x={x} y={y} textAnchor="middle" className="tm-svg-label">
          {label}
        </text>
      )}
    </>
  );
}

export function Figure1() {
  return (
    <Diagram title="Рис. 1. События и стрелки">
      <text x="235" y="42" textAnchor="middle" className="tm-svg-caption">
        а) Одна операция
      </text>
      <Event x={120} y={145} label="i" />
      <Event x={350} y={145} label="j" />
      <Arrow x1={142} y1={145} x2={326} y2={145} label="A" />
      <text x="120" y="215" textAnchor="middle" className="tm-svg-note">
        начальное событие
      </text>
      <text x="350" y="215" textAnchor="middle" className="tm-svg-note">
        конечное событие
      </text>

      <text x="720" y="42" textAnchor="middle" className="tm-svg-caption">
        б) Для начала C нужны A и B
      </text>
      <Event x={600} y={105} label="1" />
      <Event x={600} y={205} label="2" />
      <Event x={760} y={155} label="3" />
      <Event x={900} y={155} label="4" />
      <Arrow x1={622} y1={112} x2={738} y2={148} label="A" />
      <Arrow x1={622} y1={198} x2={738} y2={162} label="B" />
      <Arrow x1={782} y1={155} x2={876} y2={155} label="C" />
    </Diagram>
  );
}

export function Figure2() {
  return (
    <Diagram title="Рис. 2. Соединение событий: а) неверное; б) верное">
      <text x="240" y="52" textAnchor="middle" className="tm-svg-caption">
        а) неверно
      </text>
      <Event x={120} y={175} label="1" />
      <Event x={320} y={175} label="2" />
      <Curve d="M142 166 C190 95 250 95 298 166" label="A" x={220} y={105} />
      <Curve d="M142 184 C190 255 250 255 298 184" label="B" x={220} y={262} />

      <text x="725" y="52" textAnchor="middle" className="tm-svg-caption">
        б) верно
      </text>
      <Event x={565} y={175} label="1" />
      <Event x={710} y={115} label="2" />
      <Event x={710} y={235} label="3" />
      <Event x={870} y={175} label="4" />

      <Arrow x1={587} y1={166} x2={688} y2={124} label="A" />
      <Arrow x1={587} y1={184} x2={688} y2={226} label="B" />
      <Arrow x1={710} y1={137} x2={710} y2={213} label="D" dashed />
      <Arrow x1={732} y1={115} x2={848} y2={166} label="C" />
      <Arrow x1={732} y1={235} x2={848} y2={184} label="E" />
    </Diagram>
  );
}

export function Figure3() {
  return (
    <Diagram title="Рис. 3. Использование фиктивных стрелок">
      <text x="245" y="45" textAnchor="middle" className="tm-svg-caption">
        а) неверно
      </text>
      <Event x={105} y={125} label="1" />
      <Event x={105} y={245} label="2" />
      <Event x={280} y={185} label="3" />
      <Arrow x1={127} y1={132} x2={258} y2={177} label="A" />
      <Arrow x1={127} y1={238} x2={258} y2={193} label="B" />
      <Arrow x1={302} y1={177} x2={430} y2={120} label="C" />
      <Arrow x1={302} y1={193} x2={430} y2={250} label="E" />

      <text x="725" y="45" textAnchor="middle" className="tm-svg-caption">
        б) верно
      </text>
      <Event x={560} y={125} label="1" />
      <Event x={560} y={245} label="2" />
      <Event x={720} y={125} label="3" />
      <Event x={720} y={245} label="4" />
      <Event x={890} y={125} label="5" />
      <Event x={890} y={245} label="6" />
      <Arrow x1={582} y1={125} x2={698} y2={125} label="A" />
      <Arrow x1={582} y1={245} x2={698} y2={245} label="B" />
      <Arrow x1={720} y1={147} x2={720} y2={223} label="D" dashed />
      <Arrow x1={742} y1={125} x2={866} y2={125} label="C" />
      <Arrow x1={742} y1={245} x2={866} y2={245} label="E" />
    </Diagram>
  );
}

export function Figure4() {
  return (
    <Diagram title="Рис. 4. Упорядоченная сеть, пример 1" wide>
      <Event x={70} y={220} label="" />
      <Event x={210} y={110} label="" />
      <Event x={210} y={220} label="" />
      <Event x={210} y={330} label="" />

      <Event x={410} y={140} label="" />
      <Event x={410} y={235} label="" />
      <Event x={410} y={330} label="" />

      <Event x={620} y={175} label="" />
      <Event x={620} y={295} label="" />

      <Event x={820} y={145} label="" />
      <Event x={820} y={310} label="" />

      <Event x={1030} y={230} label="" />

      <Arrow x1={92} y1={207} x2={188} y2={123} label="A" />
      <Arrow x1={92} y1={220} x2={188} y2={220} label="B" />
      <Arrow x1={92} y1={233} x2={188} y2={317} label="C" />

      <Arrow x1={232} y1={110} x2={388} y2={140} label="D" />
      <Arrow x1={232} y1={220} x2={388} y2={235} label="E" />
      <Arrow x1={232} y1={330} x2={388} y2={330} label="F" />

      <Arrow x1={432} y1={140} x2={598} y2={175} label="H" />
      <Arrow x1={432} y1={235} x2={598} y2={180} label="D₃" dashed />
      <Arrow x1={432} y1={330} x2={598} y2={295} label="G" />

      <Arrow x1={642} y1={175} x2={798} y2={150} label="J" />
      <Arrow x1={642} y1={295} x2={798} y2={305} label="D₂" dashed />

      <Arrow x1={842} y1={145} x2={1008} y2={220} label="K" />
      <Arrow x1={842} y1={310} x2={1008} y2={240} label="L" />
    </Diagram>
  );
}

export function Figure5() {
  return (
    <Diagram title="Рис. 5. Нумерованная сеть, пример 1" wide>
      <Event x={70} y={215} label="1" />
      <Event x={220} y={120} label="3" />
      <Event x={220} y={215} label="2" />
      <Event x={220} y={315} label="5" />
      <Event x={430} y={165} label="4" />
      <Event x={430} y={260} label="6" />
      <Event x={640} y={120} label="7" />
      <Event x={820} y={130} label="8" />
      <Event x={1030} y={220} label="9" />

      <Arrow x1={92} y1={203} x2={198} y2={132} label="A" />
      <Arrow x1={92} y1={215} x2={198} y2={215} label="B" />
      <Arrow x1={92} y1={227} x2={198} y2={305} label="C" />

      <Arrow x1={242} y1={215} x2={408} y2={168} label="H" />
      <Arrow x1={242} y1={215} x2={408} y2={255} label="E" />
      <Arrow x1={242} y1={315} x2={618} y2={120} label="D₂" dashed />
      <Arrow x1={242} y1={315} x2={1008} y2={220} label="G" />

      <Arrow x1={452} y1={165} x2={618} y2={125} label="D₃" dashed />
      <Arrow x1={452} y1={260} x2={798} y2={132} label="J" />
      <Arrow x1={662} y1={120} x2={798} y2={130} label="K" />
      <Arrow x1={842} y1={130} x2={1008} y2={210} label="L" />

      <text x="550" y="395" textAnchor="middle" className="tm-svg-note">
        События пронумерованы так, чтобы номера возрастали по ходу проекта.
      </text>
    </Diagram>
  );
}

export function Figure6() {
  return (
    <Diagram title="Рис. 6. Эскиз и скорректированный график" wide>
      <text x="280" y="42" textAnchor="middle" className="tm-svg-caption">
        а) эскиз
      </text>

      <Event x={70} y={220} label="" />
      <Event x={180} y={220} label="" />
      <Event x={300} y={160} label="" />
      <Event x={300} y={280} label="" />
      <Event x={430} y={220} label="" />
      <Event x={550} y={220} label="" />

      <Arrow x1={92} y1={220} x2={158} y2={220} label="A" />
      <Arrow x1={202} y1={210} x2={278} y2={168} label="C" />
      <Arrow x1={202} y1={230} x2={278} y2={272} label="D" />
      <Arrow x1={322} y1={160} x2={408} y2={214} label="F" />
      <Arrow x1={322} y1={280} x2={408} y2={226} label="E" />
      <Arrow x1={452} y1={220} x2={528} y2={220} label="K" />

      <text x="830" y="42" textAnchor="middle" className="tm-svg-caption">
        б) скорректированный график
      </text>

      <Event x={650} y={120} label="1" />
      <Event x={750} y={120} label="2" />
      <Event x={850} y={120} label="3" />
      <Event x={750} y={280} label="4" />
      <Event x={850} y={280} label="5" />
      <Event x={1000} y={200} label="6" />

      <Arrow x1={672} y1={120} x2={728} y2={120} label="A" />
      <Arrow x1={772} y1={120} x2={828} y2={120} label="B" />
      <Arrow x1={850} y1={142} x2={850} y2={258} label="D" />
      <Arrow x1={772} y1={280} x2={828} y2={280} label="I" />
      <Arrow x1={872} y1={120} x2={978} y2={192} label="G" />
      <Arrow x1={872} y1={280} x2={978} y2={208} label="J" />
    </Diagram>
  );
}

export function Figure7() {
  return (
    <Diagram title="Рис. 7. Иллюстрация примера 3" wide>
      <Event x={80} y={220} label="0" />
      <Event x={230} y={320} label="1" />
      <Event x={300} y={220} label="2" />
      <Event x={500} y={320} label="3" />
      <Event x={500} y={100} label="4" />
      <Event x={720} y={225} label="5" />
      <Event x={1000} y={225} label="6" />

      <Arrow x1={102} y1={232} x2={208} y2={308} label="A 2" />
      <Arrow x1={102} y1={220} x2={278} y2={220} label="B 3" />
      <Arrow x1={252} y1={320} x2={478} y2={320} label="C 2" />
      <Arrow x1={322} y1={232} x2={478} y2={308} label="D 3" />
      <Arrow x1={322} y1={208} x2={478} y2={112} label="E 2" />
      <Arrow x1={500} y1={298} x2={500} y2={122} label="F 0" dashed />
      <Arrow x1={522} y1={110} x2={698} y2={218} label="K 5" />
      <Arrow x1={522} y1={320} x2={698} y2={232} label="G 3" />
      <Arrow x1={522} y1={320} x2={978} y2={232} label="H 2" />
      <Arrow x1={742} y1={225} x2={978} y2={225} label="L 6" />
    </Diagram>
  );
}

export function Figure8() {
  return (
    <Diagram title="Рис. 8. Сетевой график примера 3" wide>
      <Event x={80} y={220} label="0" />
      <Event x={230} y={320} label="1" />
      <Event x={300} y={220} label="2" />
      <Event x={500} y={320} label="3" />
      <Event x={500} y={100} label="4" />
      <Event x={720} y={225} label="5" />
      <Event x={1000} y={225} label="6" />

      <Arrow x1={102} y1={232} x2={208} y2={308} label="A 2" />
      <Arrow x1={102} y1={220} x2={278} y2={220} label="B 3" />
      <Arrow x1={252} y1={320} x2={478} y2={320} label="C 2" />
      <Arrow x1={322} y1={232} x2={478} y2={308} label="D 3" />
      <Arrow x1={322} y1={208} x2={478} y2={112} label="E 2" />
      <Arrow x1={500} y1={298} x2={500} y2={122} label="F 0" dashed />
      <Arrow x1={522} y1={110} x2={698} y2={218} label="K 5" />
      <Arrow x1={522} y1={320} x2={698} y2={232} label="G 3" />
      <Arrow x1={522} y1={320} x2={978} y2={232} label="H 2" />
      <Arrow x1={742} y1={225} x2={978} y2={225} label="L 6" />

      <path
        d="M80 220 L300 220 L500 320 L500 100 L720 225 L1000 225"
        className="tm-critical-line"
      />

      <text x="550" y="395" textAnchor="middle" className="tm-svg-note-red">
        Критический путь: B → D → F → I → L
      </text>
    </Diagram>
  );
}

export function Figure9() {
  return (
    <Diagram title="Рис. 9. Иллюстрация примера 4">
      <Event x={150} y={115} label="A" />
      <Event x={150} y={245} label="B" />
      <Event x={490} y={180} label="C" />
      <Event x={820} y={115} label="D" />
      <Event x={820} y={245} label="E" />

      <Arrow x1={172} y1={123} x2={468} y2={172} />
      <Arrow x1={172} y1={237} x2={468} y2={188} />
      <Arrow x1={512} y1={172} x2={798} y2={123} />
      <Arrow x1={512} y1={188} x2={798} y2={237} />

      <text x="490" y="325" textAnchor="middle" className="tm-svg-note">
        Работы A и B предшествуют C, а C предшествует D и E.
      </text>
    </Diagram>
  );
}

export function Figure10() {
  return (
    <Diagram title="Рис. 10. Сетевой график примера 5" wide>
      <Work x={40} y={190} label="Начало" width={110} />

      <Work x={210} y={80} label="A" />
      <Work x={210} y={190} label="B" />
      <Work x={210} y={300} label="C" />

      <Work x={430} y={80} label="D" />
      <Work x={430} y={190} label="E" />
      <Work x={430} y={300} label="F" />

      <Work x={650} y={145} label="G" />
      <Work x={650} y={255} label="H" />

      <Work x={870} y={190} label="Окончание" width={130} />

      <Arrow x1={150} y1={214} x2={210} y2={104} />
      <Arrow x1={150} y1={214} x2={210} y2={214} />
      <Arrow x1={150} y1={214} x2={210} y2={324} />

      <Arrow x1={320} y1={104} x2={430} y2={104} />
      <Arrow x1={320} y1={214} x2={430} y2={104} />
      <Arrow x1={320} y1={214} x2={430} y2={214} />
      <Arrow x1={320} y1={324} x2={430} y2={214} />
      <Arrow x1={320} y1={324} x2={430} y2={324} />

      <Arrow x1={540} y1={104} x2={650} y2={169} />
      <Arrow x1={540} y1={214} x2={650} y2={169} />
      <Arrow x1={540} y1={324} x2={650} y2={279} />

      <Arrow x1={760} y1={169} x2={870} y2={214} />
      <Arrow x1={760} y1={279} x2={870} y2={214} />
    </Diagram>
  );
}

export function Figure11() {
  return (
    <Diagram title="Рис. 11. Множества предшествующих и последующих работ">
      <text x="145" y="185" textAnchor="middle" className="tm-svg-caption">Pᵢ</text>
      <text x="835" y="185" textAnchor="middle" className="tm-svg-caption">Sᵢ</text>

      <Event x={275} y={95} label="" />
      <Event x={275} y={180} label="" />
      <Event x={275} y={265} label="" />

      <Event x={490} y={180} label="i" />

      <Event x={705} y={95} label="" />
      <Event x={705} y={180} label="" />
      <Event x={705} y={265} label="" />

      <Arrow x1={297} y1={104} x2={468} y2={172} />
      <Arrow x1={297} y1={180} x2={468} y2={180} />
      <Arrow x1={297} y1={256} x2={468} y2={188} />

      <Arrow x1={512} y1={172} x2={683} y2={104} />
      <Arrow x1={512} y1={180} x2={683} y2={180} />
      <Arrow x1={512} y1={188} x2={683} y2={256} />
    </Diagram>
  );
}

export function Figure12() {
  return (
    <Diagram title="Рис. 12. Иллюстрация примера 6" wide>
      <Work x={40} y={190} label="Начало" width={110} />

      <Work x={210} y={95} label="A" />
      <Work x={210} y={270} label="B" />

      <Work x={390} y={40} label="C" />
      <Work x={390} y={160} label="D" />
      <Work x={390} y={280} label="E" />

      <Work x={610} y={40} label="G" />
      <Work x={610} y={145} label="H" />
      <Work x={610} y={250} label="I" />
      <Work x={610} y={340} label="K" />

      <Work x={830} y={190} label="L" />
      <Work x={1010} y={190} label="Окончание" width={120} />

      <Arrow x1={150} y1={214} x2={210} y2={119} />
      <Arrow x1={150} y1={214} x2={210} y2={294} />

      <Arrow x1={320} y1={119} x2={390} y2={64} />
      <Arrow x1={320} y1={294} x2={390} y2={184} />
      <Arrow x1={320} y1={294} x2={390} y2={304} />

      <Arrow x1={500} y1={64} x2={610} y2={64} />
      <Arrow x1={500} y1={184} x2={610} y2={64} />
      <Arrow x1={500} y1={184} x2={610} y2={169} />
      <Arrow x1={500} y1={184} x2={610} y2={274} />
      <Arrow x1={500} y1={184} x2={610} y2={364} />
      <Arrow x1={500} y1={304} x2={610} y2={274} />
      <Arrow x1={500} y1={304} x2={610} y2={364} />

      <Arrow x1={720} y1={64} x2={830} y2={214} />
      <Arrow x1={720} y1={274} x2={830} y2={214} />
      <Arrow x1={940} y1={214} x2={1010} y2={214} />
    </Diagram>
  );
}

export function Figure13() {
  return (
    <Diagram title="Рис. 13. Ступенчатый метод" wide>
      <Work x={95} y={55} label="Траншея 1/3" width={140} />
      <Work x={355} y={55} label="Траншея 1/3" width={140} />
      <Work x={615} y={55} label="Траншея 1/3" width={140} />

      <Work x={160} y={180} label="Укладка трубы 1/3" width={170} />
      <Work x={420} y={180} label="Укладка трубы 1/3" width={170} />
      <Work x={680} y={180} label="Укладка трубы 1/3" width={170} />

      <Work x={225} y={305} label="Засыпка 1/3" width={140} />
      <Work x={485} y={305} label="Засыпка 1/3" width={140} />
      <Work x={745} y={305} label="Засыпка 1/3" width={140} />

      <Arrow x1={235} y1={79} x2={355} y2={79} />
      <Arrow x1={495} y1={79} x2={615} y2={79} />

      <Arrow x1={165} y1={103} x2={205} y2={180} />
      <Arrow x1={425} y1={103} x2={465} y2={180} />
      <Arrow x1={685} y1={103} x2={725} y2={180} />

      <Arrow x1={330} y1={204} x2={420} y2={204} />
      <Arrow x1={590} y1={204} x2={680} y2={204} />

      <Arrow x1={245} y1={228} x2={270} y2={305} />
      <Arrow x1={505} y1={228} x2={530} y2={305} />
      <Arrow x1={765} y1={228} x2={790} y2={305} />

      <Arrow x1={365} y1={329} x2={485} y2={329} />
      <Arrow x1={625} y1={329} x2={745} y2={329} />
    </Diagram>
  );
}

export function Figure14() {
  return (
    <Diagram title="Рис. 14. Сетевой график примера 6 с расчетами" tall>
      <WorkGrid x={30} y={240} id="St" es="0" ef="0" ls="0" lf="0" dur="0" tf="0" />

      <WorkGrid x={190} y={120} id="A" es="0" ef="2" ls="2" lf="4" dur="2" tf="2" />
      <WorkGrid x={190} y={330} id="B" es="0" ef="3" ls="0" lf="3" dur="3" tf="0" />

      <WorkGrid x={380} y={35} id="C" es="2" ef="4" ls="4" lf="6" dur="2" tf="2" ff="2" />
      <WorkGrid x={380} y={230} id="D" es="3" ef="6" ls="3" lf="6" dur="3" tf="0" />
      <WorkGrid x={380} y={365} id="E" es="3" ef="5" ls="4" lf="6" dur="2" tf="1" ff="1" />

      <WorkGrid x={600} y={40} id="G" es="6" ef="9" ls="10" lf="13" dur="3" tf="4" ff="4" />
      <WorkGrid x={600} y={180} id="H" es="6" ef="8" ls="17" lf="19" dur="2" tf="11" ff="11" />
      <WorkGrid x={600} y={315} id="I" es="6" ef="13" ls="6" lf="13" dur="7" tf="0" />
      <WorkGrid x={600} y={430} id="K" es="6" ef="11" ls="14" lf="19" dur="5" tf="8" ff="8" />

      <WorkGrid x={820} y={220} id="L" es="13" ef="19" ls="13" lf="19" dur="6" tf="0" />
      <WorkGrid x={1010} y={280} id="Fin" es="19" ef="19" ls="19" lf="19" dur="0" tf="0" />

      <Arrow x1={116} y1={260} x2={190} y2={150} />
      <Arrow x1={116} y1={280} x2={190} y2={360} />

      <Arrow x1={276} y1={150} x2={380} y2={65} />
      <Arrow x1={276} y1={360} x2={380} y2={260} />
      <Arrow x1={276} y1={360} x2={380} y2={395} />

      <Arrow x1={466} y1={65} x2={600} y2={70} />
      <Arrow x1={466} y1={260} x2={600} y2={70} />
      <Arrow x1={466} y1={260} x2={600} y2={210} />
      <Arrow x1={466} y1={260} x2={600} y2={345} />
      <Arrow x1={466} y1={260} x2={600} y2={460} />
      <Arrow x1={466} y1={395} x2={600} y2={345} />
      <Arrow x1={466} y1={395} x2={600} y2={460} />

      <Arrow x1={686} y1={70} x2={820} y2={250} />
      <Arrow x1={686} y1={345} x2={820} y2={250} />
      <Arrow x1={906} y1={250} x2={1010} y2={310} />
      <Arrow x1={686} y1={460} x2={1010} y2={310} />

      <path
        d="M73 273 L233 363 L423 263 L643 348 L863 253 L1053 313"
        className="tm-critical-line"
      />

      <text x="270" y="530" className="tm-svg-note">
        Обозначения в узле: ES | работа | EF / TF | d | FF / LS | d | LF
      </text>
    </Diagram>
  );
}

export function Figure15() {
  return (
    <Diagram title="Рис. 15. Использование лагов">
      <text x="490" y="45" textAnchor="middle" className="tm-svg-caption">
        Отношение «окончание–начало»
      </text>
      <Work x={250} y={70} label="X" width={90} />
      <Work x={560} y={70} label="Y" width={90} />
      <Arrow x1={340} y1={94} x2={560} y2={94} label="Лаг 2" />

      <text x="490" y="170" textAnchor="middle" className="tm-svg-caption">
        Отношение «начало–начало»
      </text>
      <Work x={245} y={205} label="X" width={90} />
      <Work x={480} y={260} label="Y" width={90} />
      <Curve d="M290 253 L290 284 L480 284" label="Лаг 3" x={385} y={276} />

      <Work x={650} y={205} label="X" width={90} />
      <Work x={805} y={260} label="Y" width={90} />
      <Curve d="M695 253 L695 284 L805 284" label="Лаг 5" x={755} y={276} />
    </Diagram>
  );
}

export function Figure16Lag() {
  return (
    <Diagram title="Комбинация отношений задержки">
      <Work x={260} y={85} label="X" width={110} />
      <Work x={560} y={210} label="Y" width={110} />

      <Curve d="M315 133 L315 235 L560 235" label="Лаг 2" x={430} y={226} />
      <Curve d="M370 109 L760 109 L760 235 L670 235" label="Лаг 4" x={570} y={101} />

      <text x="490" y="320" textAnchor="middle" className="tm-svg-note">
        Одна работа может быть связана с другой несколькими отношениями задержки.
      </text>
    </Diagram>
  );
}

export function Figure16() {
  return (
    <Diagram title="Рис. 16. Сетевой график с отношениями задержек" tall>
      <WorkGrid x={30} y={230} id="St" es="0" ef="0" ls="0" lf="0" dur="0" tf="0" />
      <WorkGrid x={165} y={230} id="A" es="0" ef="5" ls="0" lf="5" dur="5" tf="0" />
      <WorkGrid x={300} y={230} id="B" es="5" ef="15" ls="5" lf="15" dur="10" tf="0" />

      <WorkGrid x={460} y={95} id="C" es="15" ef="20" ls="20" lf="25" dur="5" tf="5" />
      <WorkGrid x={460} y={365} id="D" es="10" ef="25" ls="15" lf="30" dur="15" tf="5" />

      <WorkGrid x={625} y={230} id="E" es="15" ef="30" ls="15" lf="30" dur="15" tf="0" />
      <WorkGrid x={770} y={230} id="F" es="30" ef="40" ls="35" lf="45" dur="10" tf="5" />

      <WorkGrid x={920} y={365} id="G" es="25" ef="40" ls="30" lf="40" dur="15" tf="5" />
      <WorkGrid x={920} y={230} id="H" es="40" ef="50" ls="45" lf="50" dur="10" tf="0" />
      <WorkGrid x={1060} y={230} id="Fin" es="50" ef="50" ls="50" lf="50" dur="0" tf="0" />

      <Arrow x1={116} y1={263} x2={165} y2={263} />
      <Arrow x1={251} y1={263} x2={300} y2={263} />

      <Curve d="M386 248 L430 248 L430 128 L460 128" label="Лаг 10" x={430} y={110} />
      <Curve d="M386 278 L430 278 L430 398 L460 398" label="Лаг 5" x={430} y={420} />

      <Arrow x1={546} y1={128} x2={625} y2={263} label="Лаг 5" />
      <Arrow x1={546} y1={398} x2={920} y2={398} label="Лаг 10" />

      <Arrow x1={711} y1={263} x2={770} y2={263} />
      <Arrow x1={856} y1={263} x2={920} y2={263} />
      <Arrow x1={1006} y1={263} x2={1060} y2={263} />

      <Curve d="M1006 398 L1030 398 L1030 263 L1060 263" label="Лаг 10" x={1030} y={376} />

      <path
        d="M73 263 L208 263 L343 263 L668 263 L813 263 L963 263 L1103 263"
        className="tm-critical-line"
      />

      <text x="300" y="520" className="tm-svg-note">
        Обозначения в узле: ES | работа | EF / TF | d | FF / LS | d | LF
      </text>
    </Diagram>
  );
}

export const diagramMap = {
  figure1: <Figure1 />,
  figure2: <Figure2 />,
  figure3: <Figure3 />,
  figure4: <Figure4 />,
  figure5: <Figure5 />,
  figure6: <Figure6 />,
  figure7: <Figure7 />,
  figure8: <Figure8 />,
  figure9: <Figure9 />,
  figure10: <Figure10 />,
  figure11: <Figure11 />,
  figure12: <Figure12 />,
  figure13: <Figure13 />,
  figure14: <Figure14 />,
  figure15: <Figure15 />,
  figure16Lag: <Figure16Lag />,
  figure16: <Figure16 />,
};