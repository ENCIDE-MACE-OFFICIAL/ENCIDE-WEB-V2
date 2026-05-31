import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Zap, Star } from "lucide-react";
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

const SAMPLE_DEPARTMENT_SCORES = [
  { name: "CSE", value: 850 },
  { name: "ECE", value: 720 },
  { name: "MECH", value: 680 },
  { name: "CIVIL", value: 590 },
  { name: "EEE", value: 710 },
  { name: "DS", value: 750 },
  { name: "AIML", value: 800 },
];

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

const DEPARTMENT_COLORS = {
  CSE: { bg: "from-blue-900/60 to-blue-800/60", border: "border-blue-500/60", text: "text-blue-300", accent: "text-blue-400", icon: "bg-blue-600/30" },
  ECE: { bg: "from-cyan-900/60 to-cyan-800/60", border: "border-cyan-500/60", text: "text-cyan-300", accent: "text-cyan-400", icon: "bg-cyan-600/30" },
  MECH: { bg: "from-emerald-900/60 to-emerald-800/60", border: "border-emerald-500/60", text: "text-emerald-300", accent: "text-emerald-400", icon: "bg-emerald-600/30" },
  CIVIL: { bg: "from-orange-900/60 to-orange-800/60", border: "border-orange-500/60", text: "text-orange-300", accent: "text-orange-400", icon: "bg-orange-600/30" },
  EEE: { bg: "from-violet-900/60 to-violet-800/60", border: "border-violet-500/60", text: "text-violet-300", accent: "text-violet-400", icon: "bg-violet-600/30" },
  DS: { bg: "from-amber-900/60 to-amber-800/60", border: "border-amber-500/60", text: "text-amber-300", accent: "text-amber-400", icon: "bg-amber-600/30" },
  AIML: { bg: "from-teal-900/60 to-teal-800/60", border: "border-teal-500/60", text: "text-teal-300", accent: "text-teal-400", icon: "bg-teal-600/30" },
};

const IclDashboard = ({ onLoad }) => {
  const navigate = useNavigate();

  if (onLoad) onLoad();

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
          className="flex flex-col items-center justify-center text-center mb-16 mt-12"
        >
          <div className="flex items-center justify-center gap-6 mb-3 w-full">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#cf30a1]/40" />
            <div className="flex items-center justify-center gap-3">
              <Trophy className="w-10 h-10" style={{ color: "#ffa1d2" }} />
              <SplitText
                text="ICL Tournament"
                tag="h1"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black"
                delay={80}
                duration={0.8}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                style={{ color: "#ffa1d2" }}
              />
              <Trophy className="w-10 h-10" style={{ color: "#ffa1d2" }} />
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#cf30a1]/40" />
          </div>
          <p className="text-[#ffa1d2]/60 text-base">Live Results & Rankings</p>
        </motion.div>

        {/* Overall Scoreboard & Leaderboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Overall Scores Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-[#cf30a1]/20 to-[#cf30a1]/10 backdrop-blur-xl border border-[#cf30a1]/40 hover:border-[#cf30a1]/60 transition-all"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Zap className="w-5 h-5" style={{ color: "#cf30a1" }} />
              <h2 className="text-xl font-bold text-white">Overall Scores</h2>
            </div>
            <BarChart data={SAMPLE_DEPARTMENT_SCORES} />
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="space-y-3"
          >
            {SAMPLE_DEPARTMENT_SCORES.sort((a, b) => b.value - a.value).map((dept, index) => {
              const colors = DEPARTMENT_COLORS[dept.name];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.04 }}
                  className={`p-4 rounded-lg bg-gradient-to-br ${colors.bg} backdrop-blur-sm border ${colors.border} hover:border-opacity-100 transition-all cursor-pointer group`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${colors.icon}`} />
                      <h3 className="font-bold text-white text-sm">{dept.name}</h3>
                    </div>
                    <Star className={`w-3 h-3 ${colors.text} group-hover:scale-110 transition-transform`} />
                  </div>
                  <p className={`text-lg font-black ${colors.accent}`}>{dept.value}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-12 p-6 rounded-2xl bg-gradient-to-br from-[#cf30a1]/20 to-[#cf30a1]/10 backdrop-blur-xl border border-[#cf30a1]/40"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 text-center">Current Leaderboard</h2>
          <div className="space-y-2">
            {SAMPLE_DEPARTMENT_SCORES.sort((a, b) => b.value - a.value).map((dept, index) => {
              const colors = DEPARTMENT_COLORS[dept.name];
              const percentage = (dept.value / Math.max(...SAMPLE_DEPARTMENT_SCORES.map(d => d.value))) * 100;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.04 }}
                  className={`p-4 rounded-lg bg-gradient-to-r ${colors.bg} backdrop-blur-sm border ${colors.border} hover:border-opacity-100 transition-all group`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(to bottom right, #cf30a1, #a01a6b)` }}>
                        <div className="w-full h-full flex items-center justify-center font-bold text-white text-sm">
                          {index + 1}
                        </div>
                      </div>
                      <h3 className="font-bold text-white text-sm">{dept.name}</h3>
                    </div>
                    <span className={`text-lg font-black ${colors.accent}`}>{dept.value}</span>
                  </div>
                  <div className="w-full bg-neutral-800/60 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${colors.bg} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Events Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-4xl font-bold text-white mb-12 text-center">All Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {EVENTS.map((event, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + index * 0.02 }}
                whileHover={{ scale: 1.05, y: -5, rotate: 1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/icl-dashboard/event/${encodeURIComponent(event)}`)}
                className="p-6 rounded-xl bg-gradient-to-br from-[#cf30a1]/25 to-[#cf30a1]/12 backdrop-blur-sm border border-[#cf30a1]/40 hover:border-[#cf30a1]/70 hover:from-[#cf30a1]/35 hover:to-[#cf30a1]/20 transition-all cursor-pointer text-left group flex flex-col justify-between min-h-36"
                style={{ boxShadow: "0 8px 32px rgba(207, 48, 161, 0.12), 0 0 1px rgba(207, 48, 161, 0.1)" }}
              >
                <h3 className="font-bold text-white group-hover:text-[#cf30a1] transition-colors line-clamp-3 text-lg leading-tight">
                  {event}
                </h3>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#cf30a1]/40 to-[#cf30a1]/25 group-hover:from-[#cf30a1]/60 group-hover:to-[#cf30a1]/40 flex items-center justify-center transition-all group-hover:translate-x-1 mt-3">
                  <span className="text-[#cf30a1] font-bold text-lg">→</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default IclDashboard;
