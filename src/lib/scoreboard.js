export const departments = [
  "CS",
  "AIML",
  "DS(A)",
  "DS(B)",
  "EEE(A)",
  "EEE(B)",
  "ECE(A)",
  "ECE(B)",
  "CIVIL(A)",
  "CIVIL(B)",
  "MECH(A)",
  "MECH(B)"
];

export const createBlankScores = () =>
  departments.reduce((accumulator, department) => {
    accumulator[department] = 0;
    return accumulator;
  }, {});

export const createBlankWinners = () => [
  { name: "N/A", department: "N/A" },
  { name: "N/A", department: "N/A" },
  { name: "N/A", department: "N/A" },
];

export const defaultScoreboardEvents = [
  {
    id: "ai-or-not-ai",
    name: "Ai or Not Ai?",
    scores: createBlankScores(),
    winners: createBlankWinners(),
  },
  {
    id: "geoguessr",
    name: "GEOGUESSR: CAMPUS & TECH EDITION",
    scores: createBlankScores(),
    winners: [
      { name: "Aromal Sanil", department: "CS" },
      { name: "Sai Madhav", department: "DS(B)" },
      { name: "Affan Ahamed", department: "DS(A)" },
    ],
  },
  {
    id: "photo-caption",
    name: "Photo and Caption Contest",
    scores: createBlankScores(),
    winners: createBlankWinners(),
  },
  {
    id: "prompt-golf",
    name: "Prompt Golf",
    scores: createBlankScores(),
    winners: createBlankWinners(),
  },
  {
    id: "wikipedia-speedrun",
    name: "WIKIPEDIA SPEEDRUN (The Tech Rabbit Hole)",
    scores: createBlankScores(),
    winners: createBlankWinners(),
  },
  {
    id: "typing-competition",
    name: "Typing Competition",
    scores: createBlankScores(),
    winners: createBlankWinners(),
  },
  {
    id: "ai-story-generator",
    name: "AI Story Generator",
    scores: createBlankScores(),
    winners: createBlankWinners(),
  },
  {
    id: "poster-designing",
    name: "Poster Designing",
    scores: createBlankScores(),
    winners: createBlankWinners(),
  },
  {
    id: "reel-making",
    name: "Reel Making",
    scores: createBlankScores(),
    winners: createBlankWinners(),
  },
  {
    id: "debugging",
    name: "Debugging",
    scores: createBlankScores(),
    winners: createBlankWinners(),
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing Challenge",
    scores: createBlankScores(),
    winners: createBlankWinners(),
  },
];

export const normalizeScoreboardEvent = (event = {}, fallback = {}) => {
  const fallbackScores = fallback.scores || createBlankScores();
  const fallbackWinners = fallback.winners || createBlankWinners();

  const scores = departments.reduce((accumulator, department) => {
    const scoreValue = event.scores?.[department] ?? fallbackScores[department] ?? 0;
    accumulator[department] = Number(scoreValue) || 0;
    return accumulator;
  }, {});

  const winners = [0, 1, 2].map((index) => {
    const winner = event.winners?.[index] || fallbackWinners[index] || {};
    return {
      name: winner.name || "N/A",
      department: winner.department || "N/A",
    };
  });

  return {
    id: event.id || fallback.id || "",
    name: event.name || fallback.name || "",
    scores,
    winners,
  };
};

export const mergeScoreEvents = (sourceEvents = []) => {
  const sourceById = new Map(
    sourceEvents.filter((event) => event && event.id).map((event) => [event.id, event])
  );

  const mergedDefaults = defaultScoreboardEvents.map((baseEvent) =>
    normalizeScoreboardEvent(sourceById.get(baseEvent.id), baseEvent)
  );

  const extraEvents = sourceEvents
    .filter(
      (event) =>
        event && event.id && !defaultScoreboardEvents.some((baseEvent) => baseEvent.id === event.id)
    )
    .map((event) => normalizeScoreboardEvent(event));

  return [...mergedDefaults, ...extraEvents];
};

export const buildScoreboardData = (sourceEvents = defaultScoreboardEvents) => {
  const mergedEvents = mergeScoreEvents(sourceEvents);
  const overallScores = createBlankScores();

  const events = mergedEvents.map((event) => {
    const scores = departments.map((department) => {
      const score = Number(event.scores[department]) || 0;
      overallScores[department] += score;
      return { department, score };
    });

    return {
      id: event.id,
      name: event.name,
      scores,
      winners: event.winners,
    };
  });

  const overall = departments.map((department) => ({
    department,
    score: overallScores[department],
  }));

  return { overall, events };
};

export const defaultScoreboardData = buildScoreboardData();
