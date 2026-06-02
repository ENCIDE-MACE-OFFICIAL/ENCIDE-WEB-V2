export const departments = ["CS", "AIML", "DS(A)", "DS(B)", "CIVIL", "MECH"];

// EDIT THE SCORES BELOW FOR EACH EVENT. 
// Change the numbers (currently 0) to update the scoreboard.
// The overall scores are automatically calculated by summing these event scores!
export const eventsData = [
  {
    id: "ai-or-not-ai",
    name: "Ai or Not Ai?",
    scores: { CS: 100, AIML: 34, "DS(A)": 53, "DS(B)": 80, CIVIL: 20, MECH: 40 }
  },
  {
    id: "geoguessr",
    name: "GEOGUESSR: CAMPUS & TECH EDITION",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, CIVIL: 0, MECH: 0 }
  },
  {
    id: "photo-caption",
    name: "Photo and Caption Contest",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, CIVIL: 0, MECH: 0 }
  },
  {
    id: "prompt-golf",
    name: "Prompt Golf",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, CIVIL: 0, MECH: 0 }
  },
  {
    id: "wikipedia-speedrun",
    name: "WIKIPEDIA SPEEDRUN (The Tech Rabbit Hole)",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, CIVIL: 0, MECH: 0 }
  },
  {
    id: "typing-competition",
    name: "Typing Competition",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, CIVIL: 0, MECH: 0 }
  },
  {
    id: "ai-story-generator",
    name: "AI Story Generator",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, CIVIL: 0, MECH: 0 }
  },
  {
    id: "poster-designing",
    name: "Poster Designing",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, CIVIL: 0, MECH: 0 }
  },
  {
    id: "reel-making",
    name: "Reel Making",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, CIVIL: 0, MECH: 0 }
  },
  {
    id: "debugging",
    name: "Debugging",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, CIVIL: 0, MECH: 0 }
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing Challenge",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, CIVIL: 0, MECH: 0 }
  }
];

// Helper to compile the data into the format needed by Recharts
const compileScoreboardData = () => {
  const overallScores = { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, CIVIL: 0, MECH: 0 };
  
  const formattedEvents = eventsData.map(evt => {
    const scoresArray = departments.map(dept => {
      const scoreVal = Number(evt.scores[dept]) || 0;
      overallScores[dept] += scoreVal;
      return { department: dept, score: scoreVal };
    });
    return {
      id: evt.id,
      name: evt.name,
      scores: scoresArray
    };
  });

  const overallArray = departments.map(dept => ({
    department: dept,
    score: overallScores[dept]
  }));

  return {
    overall: overallArray,
    events: formattedEvents
  };
};

export const scoreboardData = compileScoreboardData();
