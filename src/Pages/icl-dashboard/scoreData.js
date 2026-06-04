export const departments = ["CS", "AIML", "DS(A)", "DS(B)","EEE", "ECE" ,"CIVIL", "MECH"];

// EDIT THE SCORES BELOW FOR EACH EVENT. 
// Change the numbers (currently 0) to update the scoreboard.
// The overall scores are automatically calculated by summing these event scores!
export const eventsData = [
  {
    id: "ai-or-not-ai",
    name: "Ai or Not Ai?",
    scores: { CS: 100, AIML: 34, "DS(A)": 53, "DS(B)": 80,"EEE":46, "ECE":71 ,CIVIL: 20, MECH: 40 },
    winners: [
      { name: "Alex Mercer", department: "CS" },
      { name: "Sophia Chen", department: "DS(B)" },
      { name: "Marcus Johnson", department: "DS(A)" }
    ]
  },
  {
    id: "geoguessr",
    name: "GEOGUESSR: CAMPUS & TECH EDITION",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, "EEE":0, "ECE":0 ,CIVIL: 0, MECH: 0 },
    winners: [
      { name: "Ethan Hunt", department: "CS" },
      { name: "Mia Wallace", department: "AIML" },
      { name: "Oliver Queen", department: "DS(A)" }
    ]
  },
  {
    id: "photo-caption",
    name: "Photo and Caption Contest",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, "EEE":0, "ECE":0 ,CIVIL: 0, MECH: 0 },
    winners: [
      { name: "Lucas Scott", department: "CS" },
      { name: "Emma Swan", department: "AIML" },
      { name: "Aria Montgomery", department: "DS(A)" }
    ]
  },
  {
    id: "prompt-golf",
    name: "Prompt Golf",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, "EEE":0, "ECE":0 ,CIVIL: 0, MECH: 0 },
    winners: [
      { name: "Leo Valdez", department: "CS" },
      { name: "Piper McLean", department: "AIML" },
      { name: "Jason Grace", department: "DS(A)" }
    ]
  },
  {
    id: "wikipedia-speedrun",
    name: "WIKIPEDIA SPEEDRUN (The Tech Rabbit Hole)",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, "EEE":0, "ECE":0 ,CIVIL: 0, MECH: 0 },
    winners: [
      { name: "Percy Jackson", department: "CS" },
      { name: "Annabeth Chase", department: "AIML" },
      { name: "Grover Underwood", department: "DS(A)" }
    ]
  },
  {
    id: "typing-competition",
    name: "Typing Competition",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, "EEE":0, "ECE":0 ,CIVIL: 0, MECH: 0 },
    winners: [
      { name: "Barry Allen", department: "CS" },
      { name: "Iris West", department: "AIML" },
      { name: "Cisco Ramon", department: "DS(A)" }
    ]
  },
  {
    id: "ai-story-generator",
    name: "AI Story Generator",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, "EEE":0, "ECE":0 ,CIVIL: 0, MECH: 0 },
    winners: [
      { name: "Tony Stark", department: "CS" },
      { name: "Bruce Banner", department: "AIML" },
      { name: "Peter Parker", department: "DS(A)" }
    ]
  },
  {
    id: "poster-designing",
    name: "Poster Designing",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, "EEE":0, "ECE":0 ,CIVIL: 0, MECH: 0 },
    winners: [
      { name: "Steve Rogers", department: "CS" },
      { name: "Natasha Romanoff", department: "AIML" },
      { name: "Clint Barton", department: "DS(A)" }
    ]
  },
  {
    id: "reel-making",
    name: "Reel Making",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, "EEE":0, "ECE":0 ,CIVIL: 0, MECH: 0 },
    winners: [
      { name: "Clark Kent", department: "CS" },
      { name: "Lois Lane", department: "AIML" },
      { name: "Jimmy Olsen", department: "DS(A)" }
    ]
  },
  {
    id: "debugging",
    name: "Debugging",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, "EEE":0, "ECE":0 ,CIVIL: 0, MECH: 0 },
    winners: [
      { name: "Bruce Wayne", department: "CS" },
      { name: "Dick Grayson", department: "AIML" },
      { name: "Barbara Gordon", department: "DS(A)" }
    ]
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing Challenge",
    scores: { CS: 0, AIML: 0, "DS(A)": 0, "DS(B)": 0, "EEE":0, "ECE":0 ,CIVIL: 0, MECH: 0 },
    winners: [
      { name: "Diana Prince", department: "CS" },
      { name: "Arthur Curry", department: "AIML" },
      { name: "Victor Stone", department: "DS(A)" }
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
