export const solutions = {
  variant1: {
    duration: 32,
    criticalPath: ["1-2", "2-4", "4-7", "7-9", "9-11"],

    events: {
      1: { ES: 0, LF: 0 },
      2: { ES: 5, LF: 5 },
      3: { ES: 2, LF: 6 },
      // ...
    },

    works: {
      "1-2": {
        ES: 0,
        EF: 5,
        LS: 0,
        LF: 5,
        TF: 0,
        FF: 0,
        IF: 0,
        SF: 0,
      },
      "1-3": {
        ES: 0,
        EF: 2,
        LS: 4,
        LF: 6,
        TF: 4,
        FF: 2,
        IF: 0,
        SF: 0,
      },
    },
  },

  variant2: {
    // аналогично
  },
};