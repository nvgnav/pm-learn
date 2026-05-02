export function checkSolution(variantId, student) {
  const correct = solutions[variantId];

  const errors = [];

  // --- проверка событий ---
  for (const eventId in correct.events) {
    const correctEvent = correct.events[eventId];
    const studentEvent = student.events?.[eventId];

    if (!studentEvent) {
      errors.push({
        type: "missing_event",
        message: `Событие ${eventId} не заполнено`,
      });
      continue;
    }

    if (studentEvent.ES !== correctEvent.ES) {
      errors.push({
        type: "event_ES",
        message: `Ошибка в ES события ${eventId}: должно быть ${correctEvent.ES}`,
      });
    }

    if (studentEvent.LF !== correctEvent.LF) {
      errors.push({
        type: "event_LF",
        message: `Ошибка в LF события ${eventId}: должно быть ${correctEvent.LF}`,
      });
    }
  }

  // --- проверка работ ---
  for (const workId in correct.works) {
    const correctWork = correct.works[workId];
    const studentWork = student.works?.[workId];

    if (!studentWork) {
      errors.push({
        type: "missing_work",
        message: `Работа ${workId} не заполнена`,
      });
      continue;
    }

    for (const field of ["ES", "EF", "LS", "LF", "TF", "FF", "IF", "SF"]) {
      if (studentWork[field] !== correctWork[field]) {
        errors.push({
          type: "work_field",
          message: `Ошибка в ${field} работы ${workId}: должно быть ${correctWork[field]}`,
        });
      }
    }
  }

  // --- проверка критического пути ---
  const studentPath = student.criticalPath || [];
  const correctPath = correct.criticalPath;

  if (JSON.stringify(studentPath) !== JSON.stringify(correctPath)) {
    errors.push({
      type: "critical_path",
      message: `Неверный критический путь`,
    });
  }

  return {
    isCorrect: errors.length === 0,
    errors,
  };
}