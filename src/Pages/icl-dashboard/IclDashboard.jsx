import { useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { scoreboardData } from './scoreData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: '#121212', border: '1px solid #27272a', borderRadius: '8px', padding: '8px 12px', boxShadow: '0 10px 30px -5px rgba(0,0,0,0.5)', fontFamily: 'Outfit' }}>
        <p style={{ color: '#71717a', marginBottom: '2px', fontSize: '10px' }}>{label}</p>
        <p style={{ fontSize: '13px', fontWeight: 'bold' }}>
          <span style={{ color: '#ffffff' }}>score : </span>
          <span style={{ color: '#ff0000' }}>{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const IclDashboard = ({ onLoad }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const eventParam = searchParams.get('event');
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    onLoad();
  }, [onLoad]);

  // Determine which data to show
  let currentTitle = "Overall Scoreboard";
  let chartData = scoreboardData.overall;
  let isOverall = true;
  let activeEventId = 'overall';
  let eventWinners = null;

  if (eventParam && eventParam !== 'overall') {
    const foundEvent = scoreboardData.events.find(e => e.id === eventParam);
    if (foundEvent) {
      currentTitle = foundEvent.name;
      chartData = foundEvent.scores;
      isOverall = false;
      activeEventId = eventParam;
      eventWinners = foundEvent.winners;
    }
  }

  const top3 = [...chartData].sort((a, b) => b.score - a.score).slice(0, 3);

  // Smooth scroll active tab into view on mobile
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector('.active-tab-btn');
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeEventId]);

  const handleCardClick = (id) => {
    navigate(`/icl-dashboard?event=${id}`);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f4f4f5] antialiased selection:bg-[#ff0000]/20 pb-24 font-outfit font-sans">
      {/* Import elegant Outfit Google font and add custom global utility styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        
        .font-outfit {
          font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        
        /* Premium custom scrollbar for horizontal tabs on mobile */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Sleek Low-Profile Header highlighting Club & Event in pure high-voltage Red (#ff0000) */}
      <header className="w-full border-b border-zinc-900 bg-[#0a0a0a] px-4 py-8 md:px-16 font-outfit">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end space-y-6 md:space-y-0">
          <div>
            <div className="text-[10px] font-bold tracking-[0.3em] text-[#ff0000] uppercase mb-2 font-mono">
              ENCIDE PRESENTS
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white uppercase leading-none">
              ICL 4.0 CHAMPIONSHIP
            </h1>
          </div>
          <div className="hidden md:flex flex-col text-left md:text-right border-l-2 md:border-l-0 md:border-r-2 border-[#ff0000] pl-4 md:pl-0 md:pr-4 py-1">
            <span className="text-[11px] font-bold tracking-widest text-zinc-300 uppercase">
              CODE WHAT YOU CAN'T
            </span>
            <span className="text-[9px] font-bold tracking-widest text-zinc-500 uppercase mt-1">
              STANDINGS & LEADERBOARD PORTAL
            </span>
          </div>
        </div>
      </header>

      {/* Premium Two-Column Layout */}
      <main className="max-w-7xl mx-auto px-4 md:px-16 py-12 font-outfit">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* Column 1: Left Navigation Catalog */}
          <div className="w-full lg:w-1/4 flex-shrink-0 relative">
            <h2 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-4 font-mono hidden lg:block">
              SELECT EVENT CATEGORY
            </h2>
            
            {/* Elegant Fade Overlays for Horizontal Swiping on Mobile */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none z-20 lg:hidden" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none z-20 lg:hidden" />
            
            {/* Scrollable event list */}
            <div 
              ref={scrollContainerRef}
              className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1 pb-4 lg:pb-0 no-scrollbar border-b lg:border-b-0 border-zinc-900 px-4 lg:px-0"
            >
              
              {/* Overall Standing Tab Button */}
              <button
                onClick={() => handleCardClick('overall')}
                className={`
                  active-tab-btn relative flex-shrink-0 flex items-center justify-start rounded-lg px-4 py-3.5 text-left transition-all duration-150 text-sm tracking-wide font-medium border border-transparent lg:w-full select-none
                  ${isOverall ? 'text-[#030303]' : 'bg-[#121212]/40 text-zinc-400 hover:text-white'}
                `}
              >
                {isOverall && (
                  <motion.div 
                    layoutId="activeTabOutline" 
                    className="absolute inset-0 bg-[#ff0000] rounded-lg z-0 shadow-[0_4px_20px_rgba(255,0,0,0.15)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <div className="relative z-10 flex items-center w-full">
                  <span className="font-semibold uppercase tracking-wider text-white">Overall Standings</span>
                </div>
              </button>

              {/* Individual Event Tab Buttons */}
              {scoreboardData.events.map((evt, idx) => {
                const isActive = activeEventId === evt.id;
                const paddedIndex = String(idx + 1).padStart(2, '0');
                return (
                  <button
                    key={evt.id}
                    onClick={() => handleCardClick(evt.id)}
                    className={`
                      relative flex-shrink-0 flex items-center justify-start rounded-lg px-4 py-3.5 text-left transition-all duration-150 text-sm tracking-wide font-medium border border-transparent lg:w-full select-none truncate
                      ${isActive ? 'active-tab-btn text-white' : 'bg-[#121212]/40 text-zinc-400 hover:text-white'}
                    `}
                    title={evt.name}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="activeTabOutline" 
                        className="absolute inset-0 bg-[#ff0000] rounded-lg z-0 shadow-[0_4px_20px_rgba(255,0,0,0.15)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <div className="relative z-10 flex items-center w-full truncate">
                      <span className={`truncate font-semibold uppercase tracking-wider`}>{evt.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column 2: Right Chart Main Window */}
          <div className="flex-grow w-full border border-zinc-900 bg-[#121212]/80 rounded-xl p-5 md:p-10 shadow-xl relative overflow-hidden">
            
            {/* Chart Header Information */}
            <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between border-b border-zinc-900 pb-6 mb-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white uppercase">
                  {currentTitle}
                </h3>
                <p className="text-zinc-500 text-xs font-mono mt-1.5 uppercase">
                  statistical Standing analytic metrics
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-2 text-[10px] font-mono tracking-wider border border-zinc-800 bg-[#1e1e1e]/80 px-3 py-1.5 rounded-md text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff0000] animate-pulse" />
                <span>FILTER:</span>
                <span className="text-white font-bold">{isOverall ? "ALL EVENTS SUM" : "EVENT TARGETED"}</span>
              </div>
            </div>

            {/* Top 3 Winners Cards */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {(isOverall ? top3 : (eventWinners || top3)).map((winner, idx) => {
                const title = isOverall ? winner.department : winner.name;
                const subtitle = isOverall ? "Department" : winner.department;
                const score = isOverall ? winner.score : (chartData.find(d => d.department === winner.department)?.score || 0);

                return (
                  <div key={idx} className={`flex flex-col p-4 rounded-xl border ${idx === 0 ? 'border-[#ff0000] bg-[#ff0000]/10' : 'border-zinc-800 bg-[#1e1e1e]/50'} relative overflow-hidden transition-transform duration-300 hover:scale-[1.02]`}>
                    {idx === 0 && <div className="absolute top-0 right-0 w-16 h-16 bg-[#ff0000] blur-[30px] rounded-full opacity-50" />}
                    <span className={`text-[10px] font-mono font-bold tracking-widest ${idx === 0 ? 'text-[#ff0000]' : 'text-zinc-500'} mb-1`}>
                      {idx === 0 ? "1ST PLACE" : idx === 1 ? "2ND PLACE" : "3RD PLACE"}
                    </span>
                    <div className="flex items-end justify-between mt-1 z-10">
                      <div>
                        <h4 className="text-xl font-bold text-white uppercase">{title}</h4>
                        <p className="text-[10px] text-zinc-400 uppercase tracking-wide">{subtitle}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-black text-white leading-none block">{score}</span>
                        <span className="text-[9px] font-mono text-zinc-500 block leading-none mt-1">PTS</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recharts Bar Graph */}
            <div className="relative z-10 w-full h-[320px] md:h-[480px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 15, right: 10, left: -25, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  
                  <XAxis 
                    dataKey="department" 
                    stroke="#27272a" 
                    tick={{ fill: '#a1a1aa', fontSize: 10, fontWeight: 600, fontFamily: 'Outfit' }}
                    tickMargin={12}
                    axisLine={{ stroke: '#27272a' }}
                    tickLine={false}
                    interval={0}
                  />
                  
                  <YAxis 
                    stroke="#27272a"
                    tick={{ fill: '#71717a', fontSize: 11, fontFamily: 'Outfit' }}
                    axisLine={false}
                    tickLine={false}
                    tickMargin={8}
                  />
                  
                  <Tooltip 
                    cursor={{ fill: 'rgba(255, 0, 0, 0.02)' }}
                    content={<CustomTooltip />}
                  />
                  
                  {/* Clean flat solid pure high-voltage Red color block matching the exact registration color theme (#ff0000) */}
                  <Bar 
                    dataKey="score" 
                    fill="#ff0000"
                    radius={[3, 3, 0, 0]}
                    maxBarSize={45}
                    animationDuration={400}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
          </div>

        </div>
      </main>
    </div>
  );
};

export default IclDashboard;
