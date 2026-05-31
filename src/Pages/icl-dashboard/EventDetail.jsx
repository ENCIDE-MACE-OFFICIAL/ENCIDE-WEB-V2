import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Medal } from "lucide-react";
import { useEffect } from "react";
import BarChart from "../../components/BarChart";
import SplitText from "../../components/SplitText";

const EVENTS = [
  "AI or Not AI?",
  "GEOGUESSR: CAMPUS & TECH EDITION",
  "Photo and Caption Contest",
  "Prompt Golf",
  "WIKIPEDIA SPEEDRUN",
  "Typing Competition",
  "AI Story Generator",
  "Poster Designing",
  "Reel Making",
  "Debugging",
  "Digital Marketing Challenge",
  "Treasure Hunt",
];

const EVENT_DESCRIPTIONS = {
  "AI or Not AI?": "Spot real versus AI-generated media instantly!",
  "GEOGUESSR: CAMPUS & TECH EDITION": "Navigate tech locations faster than everyone else!",
  "Photo and Caption Contest": "Capture creativity, win through Instagram likes!",
  "Prompt Golf": "Minimal words, maximum AI output precision!",
  "WIKIPEDIA SPEEDRUN": "Race through hyperlinks, reach the target!",
  "Typing Competition": "Type fast and accurate to triumph!",
  "AI Story Generator": "Craft epic tales with perfect prompts!",
  "Poster Designing": "Create stunning visual masterpieces from scratch!",
  "Reel Making": "Produce engaging digital yearbook memories instantly!",
  "Debugging": "Hunt and crush code bugs fast!",
  "Digital Marketing Challenge": "Strategize and promote to total victory!",
  "Treasure Hunt": "Solve mind-bending clues, discover the treasure!",
};

const SAMPLE_EVENT_SCORES = {
  "AI or Not AI?": [
    { name: "CSE", value: 95 },
    { name: "ECE", value: 78 },
    { name: "MECH", value: 65 },
    { name: "CIVIL", value: 55 },
    { name: "EEE", value: 72 },
    { name: "DS", value: 88 },
    { name: "AIML", value: 92 },
  ],
  "GEOGUESSR: CAMPUS & TECH EDITION": [
    { name: "CSE", value: 80 },
    { name: "ECE", value: 88 },
    { name: "MECH", value: 72 },
    { name: "CIVIL", value: 65 },
    { name: "EEE", value: 75 },
    { name: "DS", value: 82 },
    { name: "AIML", value: 78 },
  ],
  "Photo and Caption Contest": [
    { name: "CSE", value: 75 },
    { name: "ECE", value: 82 },
    { name: "MECH", value: 78 },
    { name: "CIVIL", value: 70 },
    { name: "EEE", value: 68 },
    { name: "DS", value: 76 },
    { name: "AIML", value: 72 },
  ],
  "Prompt Golf": [
    { name: "CSE", value: 90 },
    { name: "ECE", value: 70 },
    { name: "MECH", value: 68 },
    { name: "CIVIL", value: 60 },
    { name: "EEE", value: 65 },
    { name: "DS", value: 80 },
    { name: "AIML", value: 85 },
  ],
  "WIKIPEDIA SPEEDRUN": [
    { name: "CSE", value: 85 },
    { name: "ECE", value: 80 },
    { name: "MECH", value: 75 },
    { name: "CIVIL", value: 70 },
    { name: "EEE", value: 78 },
    { name: "DS", value: 82 },
    { name: "AIML", value: 80 },
  ],
  "Typing Competition": [
    { name: "CSE", value: 92 },
    { name: "ECE", value: 88 },
    { name: "MECH", value: 84 },
    { name: "CIVIL", value: 79 },
    { name: "EEE", value: 86 },
    { name: "DS", value: 90 },
    { name: "AIML", value: 88 },
  ],
  "AI Story Generator": [
    { name: "CSE", value: 88 },
    { name: "ECE", value: 75 },
    { name: "MECH", value: 70 },
    { name: "CIVIL", value: 62 },
    { name: "EEE", value: 68 },
    { name: "DS", value: 80 },
    { name: "AIML", value: 86 },
  ],
  "Poster Designing": [
    { name: "CSE", value: 82 },
    { name: "ECE", value: 79 },
    { name: "MECH", value: 85 },
    { name: "CIVIL", value: 72 },
    { name: "EEE", value: 70 },
    { name: "DS", value: 78 },
    { name: "AIML", value: 75 },
  ],
  "Reel Making": [
    { name: "CSE", value: 78 },
    { name: "ECE", value: 85 },
    { name: "MECH", value: 88 },
    { name: "CIVIL", value: 75 },
    { name: "EEE", value: 80 },
    { name: "DS", value: 76 },
    { name: "AIML", value: 74 },
  ],
  "Debugging": [
    { name: "CSE", value: 94 },
    { name: "ECE", value: 76 },
    { name: "MECH", value: 60 },
    { name: "CIVIL", value: 52 },
    { name: "EEE", value: 70 },
    { name: "DS", value: 85 },
    { name: "AIML", value: 92 },
  ],
  "Digital Marketing Challenge": [
    { name: "CSE", value: 80 },
    { name: "ECE", value: 77 },
    { name: "MECH", value: 73 },
    { name: "CIVIL", value: 68 },
    { name: "EEE", value: 72 },
    { name: "DS", value: 78 },
    { name: "AIML", value: 76 },
  ],
  "Treasure Hunt": [
    { name: "CSE", value: 86 },
    { name: "ECE", value: 82 },
    { name: "MECH", value: 78 },
    { name: "CIVIL", value: 74 },
    { name: "EEE", value: 80 },
    { name: "DS", value: 84 },
    { name: "AIML", value: 82 },
  ],
};

const EVENT_WINNERS = {
  "AI or Not AI?": [
    { position: "1st", name: "Arpita Sharma", department: "CSE" },
    { position: "2nd", name: "Rajesh Kumar", department: "ECE" },
    { position: "3rd", name: "Priya Singh", department: "MECH" },
  ],
  "GEOGUESSR: CAMPUS & TECH EDITION": [
    { position: "1st", name: "Anmol Verma", department: "ECE" },
    { position: "2nd", name: "Kavya Reddy", department: "CSE" },
    { position: "3rd", name: "Aditya Patel", department: "MECH" },
  ],
  "Photo and Caption Contest": [
    { position: "1st", name: "Neha Gupta", department: "MECH" },
    { position: "2nd", name: "Rohan Das", department: "ECE" },
    { position: "3rd", name: "Sneha Desai", department: "CSE" },
  ],
  "Prompt Golf": [
    { position: "1st", name: "Arjun Singh", department: "CSE" },
    { position: "2nd", name: "Divya Chopra", department: "ECE" },
    { position: "3rd", name: "Vikram Nair", department: "CIVIL" },
  ],
  "WIKIPEDIA SPEEDRUN": [
    { position: "1st", name: "Harsh Mishra", department: "CSE" },
    { position: "2nd", name: "Deepika Rao", department: "ECE" },
    { position: "3rd", name: "Suresh Kumar", department: "MECH" },
  ],
  "Typing Competition": [
    { position: "1st", name: "Priya Joshi", department: "CSE" },
    { position: "2nd", name: "Nikhil Desai", department: "ECE" },
    { position: "3rd", name: "Ritika Singh", department: "MECH" },
  ],
  "AI Story Generator": [
    { position: "1st", name: "Sanjay Verma", department: "CSE" },
    { position: "2nd", name: "Anjali Kumar", department: "ECE" },
    { position: "3rd", name: "Ravi Patel", department: "CIVIL" },
  ],
  "Poster Designing": [
    { position: "1st", name: "Shreya Gupta", department: "MECH" },
    { position: "2nd", name: "Akshit Sharma", department: "ECE" },
    { position: "3rd", name: "Meera Singh", department: "CSE" },
  ],
  "Reel Making": [
    { position: "1st", name: "Tanvi Nair", department: "MECH" },
    { position: "2nd", name: "Aryan Chopra", department: "ECE" },
    { position: "3rd", name: "Karan Reddy", department: "CSE" },
  ],
  "Debugging": [
    { position: "1st", name: "Varun Singh", department: "CSE" },
    { position: "2nd", name: "Pooja Rao", department: "ECE" },
    { position: "3rd", name: "Amar Kumar", department: "MECH" },
  ],
  "Digital Marketing Challenge": [
    { position: "1st", name: "Shreya Kapoor", department: "CSE" },
    { position: "2nd", name: "Rohit Verma", department: "ECE" },
    { position: "3rd", name: "Nisha Patel", department: "MECH" },
  ],
  "Treasure Hunt": [
    { position: "1st", name: "Ashok Nair", department: "CSE" },
    { position: "2nd", name: "Divya Sharma", department: "ECE" },
    { position: "3rd", name: "Rishi Kumar", department: "MECH" },
  ],
};

const DEPARTMENT_COLORS = {
  CSE: { bg: "from-blue-900/40", border: "border-blue-500/40", text: "text-blue-300", accent: "text-blue-400", medal: "from-blue-600 to-blue-500" },
  ECE: { bg: "from-cyan-900/40", border: "border-cyan-500/40", text: "text-cyan-300", accent: "text-cyan-400", medal: "from-cyan-600 to-cyan-500" },
  MECH: { bg: "from-emerald-900/40", border: "border-emerald-500/40", text: "text-emerald-300", accent: "text-emerald-400", medal: "from-emerald-600 to-emerald-500" },
  CIVIL: { bg: "from-orange-900/40", border: "border-orange-500/40", text: "text-orange-300", accent: "text-orange-400", medal: "from-orange-600 to-orange-500" },
  EEE: { bg: "from-violet-900/40", border: "border-violet-500/40", text: "text-violet-300", accent: "text-violet-400", medal: "from-violet-600 to-violet-500" },
  DS: { bg: "from-amber-900/40", border: "border-amber-500/40", text: "text-amber-300", accent: "text-amber-400", medal: "from-amber-600 to-amber-500" },
  AIML: { bg: "from-teal-900/40", border: "border-teal-500/40", text: "text-teal-300", accent: "text-teal-400", medal: "from-teal-600 to-teal-500" },
};

const EventDetail = ({ onLoad }) => {
  const navigate = useNavigate();
  const { eventName } = useParams();
  const decodedEventName = decodeURIComponent(eventName);
  const eventData = SAMPLE_EVENT_SCORES[decodedEventName];
  const winners = EVENT_WINNERS[decodedEventName];

  useEffect(() => {
    if (onLoad) onLoad();
  }, [onLoad]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!EVENTS.includes(decodedEventName)) {
      navigate("/icl-dashboard");
    }
  }, [decodedEventName, navigate]);

  return (
    <div className="min-h-screen bg-neutral-950 relative overflow-hidden font-sans selection:bg-[#cf30a1]/30 shadow-[inset_-80px_0_80px_rgba(207,48,161,0.05),inset_80px_0_80px_rgba(207,48,161,0.05),inset_0_-80px_80px_rgba(207,48,161,0.05),inset_0_80px_80px_rgba(207,48,161,0.05)]" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(207,48,161,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(207,48,161,0.02) 0%, transparent 50%)" }}>
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 400 400%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 result=%22noise%22/%3E%3C/filter%3E%3Crect width=%22400%22 height=%22400%22 fill=%22white%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')" }} />
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#cf30a1]/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(207,48,161,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#cf30a1]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#cf30a1]/12 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-[#cf30a1]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-10"
        >
          <button
            onClick={() => navigate("/icl-dashboard")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-[#cf30a1]/10 transition-all group border border-[#cf30a1]/20"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
        </motion.div>

        {/* Event Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex flex-col items-center text-center"
        >
          <SplitText
            text={decodedEventName}
            tag="h1"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-center mb-3"
            delay={80}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            style={{ color: "#ffa1d2" }}
          />
          <p className="text-center text-[#ffa1d2]/70 text-sm max-w-3xl mx-auto leading-relaxed">
            {EVENT_DESCRIPTIONS[decodedEventName]}
          </p>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-8 rounded-2xl bg-gradient-to-br from-[#cf30a1]/20 to-[#cf30a1]/10 backdrop-blur-xl border border-[#cf30a1]/40 mb-10"
        >
          {eventData && <BarChart data={eventData} title="Department Scores" />}
        </motion.div>

        {/* Winners Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-lg bg-gradient-to-br from-[#cf30a1]/20 to-[#cf30a1]/10 backdrop-blur-xl border border-[#cf30a1]/40"
        >
          <div className="flex items-center justify-center gap-2 mb-5">
            <Trophy className="w-5 h-5" style={{ color: "#cf30a1" }} />
            <h2 className="text-lg font-bold text-white">Winners</h2>
          </div>

          <div className="space-y-3">
            {winners && winners.map((winner, index) => {
              const colors = DEPARTMENT_COLORS[winner.department];
              const isFirst = winner.position === "1st";

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + index * 0.08 }}
                  className={`p-5 rounded-xl bg-gradient-to-r ${colors.bg} to-transparent backdrop-blur-sm border ${colors.border} hover:border-opacity-100 transition-all group ${
                    isFirst ? "ring-2" : ""
                  }`}
                  style={isFirst ? { boxShadow: "0 0 20px rgba(207, 48, 161, 0.35)" } : {}}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className={`text-xs font-bold text-neutral-300 mb-1`}>
                        {winner.position} Place
                      </p>
                      <h3 className="text-sm font-bold text-white mb-2">{winner.name}</h3>
                      <div className="inline-block">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${colors.bg} border ${colors.border} ${colors.text}`}>
                          {winner.department}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetail;
