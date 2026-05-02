function isWrong(studentValue, correctValue) {
  return studentValue === "" || Number(studentValue) !== Number(correctValue);
}

function normalizeText(value) {
  return String(value || "").trim().toUpperCase();
}

function calculateAoaSolution(variant) {
  const events = {};
  const incoming = {};
  const outgoing = {};

  variant.events.forEach((event) => {
    events[event.id] = {
      id: event.id,
      ES: 0,
      LF: 0,
      T: 0,
    };

    incoming[event.id] = [];
    outgoing[event.id] = [];
  });

  variant.works.forEach((work) => {
    incoming[work.to].push(work);
    outgoing[work.from].push(work);
  });

  const eventIds = variant.events.map((event) => event.id);

  eventIds.forEach((id) => {
    if (incoming[id].length === 0) {
      events[id].ES = 0;
      return;
    }

    events[id].ES = Math.max(
      ...incoming[id].map((work) => events[work.from].ES + work.d)
    );
  });

  const projectDuration = Math.max(...eventIds.map((id) => events[id].ES));

  [...eventIds].reverse().forEach((id) => {
    if (outgoing[id].length === 0) {
      events[id].LF = projectDuration;
      return;
    }

    events[id].LF = Math.min(
      ...outgoing[id].map((work) => events[work.to].LF - work.d)
    );
  });

  eventIds.forEach((id) => {
    events[id].T = events[id].LF - events[id].ES;
  });

  const works = variant.works.map((work) => {
    const ES = events[work.from].ES;
    const EF = ES + work.d;
    const LF = events[work.to].LF;
    const LS = LF - work.d;

    return {
      from: work.from,
      to: work.to,
      d: work.d,
      ES,
      EF,
      LS,
      LF,
      TF: events[work.to].LF - events[work.from].ES - work.d,
      SF: events[work.to].LF - events[work.from].LF - work.d,
      FF: events[work.to].ES - events[work.from].ES - work.d,
      IF: events[work.to].ES - events[work.from].LF - work.d,
    };
  });

  return { events, works };
}

function calculateAonSolution(variant) {
  const map = new Map();

  variant.rows.forEach((row) => {
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

  variant.rows.forEach((row) => {
    inDegree.set(row.work, row.prev.length);
  });

  const queue = variant.rows
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

  return variant.rows.map((row) => map.get(row.work));
}

export function checkSolution(variant, studentData) {
  const errors = {
    events: {},
    works: {},
  };

  if (variant.type === "aoa") {
    const solution = calculateAoaSolution(variant);

    variant.events.forEach((event) => {
      const studentEvent = studentData.events[event.id] || {};
      const correctEvent = solution.events[event.id];

      errors.events[event.id] = {
        ES: isWrong(studentEvent.ES, correctEvent.ES),
        LF: isWrong(studentEvent.LF, correctEvent.LF),
        T: isWrong(studentEvent.T, correctEvent.T),
      };
    });

    solution.works.forEach((correctWork, index) => {
      const studentWork = studentData.works[index] || {};

      errors.works[index] = {
        path:
          Number(studentWork.from) !== Number(correctWork.from) ||
          Number(studentWork.to) !== Number(correctWork.to),

        Dij: isWrong(studentWork.Dij, correctWork.d),
        ES: isWrong(studentWork.ES, correctWork.ES),
        EF: isWrong(studentWork.EF, correctWork.EF),
        LS: isWrong(studentWork.LS, correctWork.LS),
        LF: isWrong(studentWork.LF, correctWork.LF),
        TF: isWrong(studentWork.TF, correctWork.TF),
        SF: isWrong(studentWork.SF, correctWork.SF),
        FF: isWrong(studentWork.FF, correctWork.FF),
        IF: isWrong(studentWork.IF, correctWork.IF),
      };
    });
  }

  if (variant.type === "aon") {
    const solution = calculateAonSolution(variant);

    solution.forEach((correctWork, index) => {
      const studentWork = studentData.works[index] || {};

      errors.works[index] = {
        work: normalizeText(studentWork.work) !== correctWork.work,
        duration: isWrong(studentWork.duration, correctWork.duration),
        ES: isWrong(studentWork.ES, correctWork.ES),
        EF: isWrong(studentWork.EF, correctWork.EF),
        LS: isWrong(studentWork.LS, correctWork.LS),
        LF: isWrong(studentWork.LF, correctWork.LF),
        reserve: isWrong(studentWork.reserve, correctWork.reserve),
        critical:
          normalizeText(studentWork.critical) !==
          (correctWork.critical ? "ДА" : "НЕТ"),
      };
    });
  }

  return errors;
}