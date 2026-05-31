const DEPARTMENT_COLORS = {
  CSE: "from-blue-600 via-blue-500 to-blue-400 shadow-blue-500/50",
  ECE: "from-cyan-600 via-cyan-500 to-cyan-400 shadow-cyan-500/50",
  MECH: "from-emerald-600 via-emerald-500 to-emerald-400 shadow-emerald-500/50",
  CIVIL: "from-orange-600 via-orange-500 to-orange-400 shadow-orange-500/50",
  EEE: "from-violet-600 via-violet-500 to-violet-400 shadow-violet-500/50",
  DS: "from-amber-600 via-amber-500 to-amber-400 shadow-amber-500/50",
  AIML: "from-teal-600 via-teal-500 to-teal-400 shadow-teal-500/50",
};

const DEPARTMENT_TEXT_COLORS = {
  CSE: "text-blue-300",
  ECE: "text-cyan-300",
  MECH: "text-emerald-300",
  CIVIL: "text-orange-300",
  EEE: "text-violet-300",
  DS: "text-amber-300",
  AIML: "text-teal-300",
};

const DEPARTMENT_HOVER_COLORS = {
  CSE: "hover:from-blue-500 hover:via-blue-400 hover:to-blue-300",
  ECE: "hover:from-cyan-500 hover:via-cyan-400 hover:to-cyan-300",
  MECH: "hover:from-emerald-500 hover:via-emerald-400 hover:to-emerald-300",
  CIVIL: "hover:from-orange-500 hover:via-orange-400 hover:to-orange-300",
  EEE: "hover:from-violet-500 hover:via-violet-400 hover:to-violet-300",
  DS: "hover:from-amber-500 hover:via-amber-400 hover:to-amber-300",
  AIML: "hover:from-teal-500 hover:via-teal-400 hover:to-teal-300",
};

const BarChart = ({ data, title, showValues = true }) => {
  const maxValue = Math.max(...data.map(item => item.value), 0) || 100;

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-bold text-white mb-8">{title}</h3>}
      <div className="flex items-end justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-8 h-48 sm:h-56 md:h-64 lg:h-80 px-2 sm:px-4">
        {data.map((item, index) => {
          const deptName = item.name;
          const gradientClass = DEPARTMENT_COLORS[deptName] || DEPARTMENT_COLORS.CSE;
          const textColorClass = DEPARTMENT_TEXT_COLORS[deptName] || DEPARTMENT_TEXT_COLORS.CSE;
          const hoverClass = DEPARTMENT_HOVER_COLORS[deptName] || DEPARTMENT_HOVER_COLORS.CSE;

          return (
            <div key={index} className="flex flex-col items-center gap-2 flex-1 max-w-16 sm:max-w-20 md:max-w-24 lg:max-w-28">
              <div className="flex items-end justify-center h-32 sm:h-40 md:h-48 lg:h-64 w-full">
                <div
                  className={`w-full bg-gradient-to-t ${gradientClass} rounded-t-xl transition-all duration-500 relative group ${hoverClass} shadow-lg`}
                  style={{
                    height: `${(item.value / maxValue) * 100}%`,
                    minHeight: '20px'
                  }}
                >
                  {showValues && (
                    <span className={`absolute -top-6 sm:-top-7 md:-top-8 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm font-bold ${textColorClass} whitespace-nowrap`}>
                      {item.value}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-xs sm:text-sm font-bold text-white text-center break-words">{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BarChart;
