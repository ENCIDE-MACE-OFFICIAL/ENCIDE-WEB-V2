export const departments = ["CS", "AIML", "DS(A)", "DS(B)","EEE", "ECE" ,"CIVIL", "MECH"];

// EDIT THE SCORES BELOW FOR EACH EVENT. 
// Change the numbers (currently 0) to update the scoreboard.
// The overall scores are automatically calculated by summing these event scores!
export const eventsData = [
  {
    id: "ai-or-not-ai",
    name: "Ai or Not Ai?",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0,"EEE":0, "ECE":0 ,CIVIL: 0, MECH: 0 },
    winners: [
      { name: "N/A", department: "N/A" },
      { name: "N/A", department: "N/A" },
      { name: "N/A", department: "N/A)" }
    ]
  },
  {
    id: "geoguessr",
    name: "GEOGUESSR: CAMPUS & TECH EDITION",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, "EEE":0, "ECE":0 ,CIVIL: 0, MECH: 0 },
    winners: [
      { name: "Aromal Sanil", department: "CS" },
      { name: "Sai Madhav", department: "DS(B)" },
      { name: "Affan Ahamed", department: "DS(A)" }
    ]
  },
  {
    id: "photo-caption",
    name: "Photo and Caption Contest",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, "EEE":0, "ECE":0 ,CIVIL: 0, MECH: 0 },
    winners: [
      { name: "N/A", department: "N/A" },
      { name: "N/A", department: "N/A" },
      { name: "N/A", department: "N/A" }
    ]
  },
  {
    id: "prompt-golf",
    name: "Prompt Golf",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, "EEE":0, "ECE":0 ,CIVIL: 0, MECH: 0 },
    winners: [
      { name: "N/A", department: "N/A" },
      { name: "N/A", department: "N/A" },
      { name: "N/A", department: "N/A" }
    ]
  },
  {
    id: "wikipedia-speedrun",
    name: "WIKIPEDIA SPEEDRUN (The Tech Rabbit Hole)",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, "EEE":0, "ECE":0 ,CIVIL: 0, MECH: 0 },
    winners: [
      { name: "N/A", department: "N/A" },
      { name: "N/A", department: "N/A" },
      { name: "N/A", department: "N/A" }
    ]
  },
  {
    id: "typing-competition",
    name: "Typing Competition",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, "EEE":0, "ECE":0 ,CIVIL: 0, MECH: 0 },
    winners: [
      { name: "N/A", department: "N/A" },
      { name: "N/A", department: "N/A" },
      { name: "N/A", department: "N/A" }
    ]
  },
  {
    id: "ai-story-generator",
    name: "AI Story Generator",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, "EEE":0, "ECE":0 ,CIVIL: 0, MECH: 0 },
    winners: [
      { name: "N/A", department: "N/A" },
      { name: "N/A", department: "N/A" },
      { name: "N/A", department: "N/A" }
    ]
  },
  {
    id: "poster-designing",
    name: "Poster Designing",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, "EEE":0, "ECE":0 ,CIVIL: 0, MECH: 0 },
    winners: [
      { name: "N/A", department: "N/A" },
      { name: "N/A", department: "N/A" },
      { name: "N/A", department: "N/A" }
    ]
  },
  {
    id: "reel-making",
    name: "Reel Making",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, "EEE":0, "ECE":0 ,CIVIL: 0, MECH: 0 },
    winners: [
      { name: "N/A", department: "N/A" },
      { name: "N/A", department: "N/A" },
      { name: "N/A", department: "N/A" }
    ]
  },
  {
    id: "debugging",
    name: "Debugging",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, "EEE":0, "ECE":0 ,CIVIL: 0, MECH: 0 },
    winners: [
      { name: "N/A", department: "N/A" },
      { name: "N/A", department: "N/A" },
      { name: "N/A", department: "N/A" }
    ]
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing Challenge",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, "EEE":0, "ECE":0 ,CIVIL: 0, MECH: 0 },
    winners: [
      { name: "N/A", department: "N/A" },
      { name: "N/A", department: "N/A" },
      { name: "N/A", department: "N/A" }
    ]
  }
];

// Helper to compile the data into the format needed by Recharts
const compileScoreboardData = () => {
  const overallScores = { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, "EEE":0, "ECE":0 ,CIVIL: 0, MECH: 0 };
  
  const formattedEvents = eventsData.map(evt => {
    const scoresArray = departments.map(dept => {
      const scoreVal = Number(evt.scores[dept]) || 0;
      overallScores[dept] += scoreVal;
      return { department: dept, score: scoreVal };
    });
    return {
      id: evt.id,
      name: evt.name,
      scores: scoresArray,
      winners: evt.winners
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
