import React from "react";
import { motion } from "framer-motion";
import LazyImage from "../LazyImage";

export const EventsColumn = (props) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: props.direction === "down" ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent"
      >
        {[...new Array(2).fill(0)].map((_, index) => (
          <React.Fragment key={index}>
            {props.events.map((event, i) => (
              <div 
                className="group rounded-xl border border-neutral-800/80 bg-neutral-900/60 backdrop-blur-md shadow-xl shadow-red-500/5 w-full md:w-72 lg:w-[340px] xl:w-[380px] overflow-hidden hover:border-red-500/40 hover:bg-neutral-900/80  transition-all duration-300" 
                key={`${index}-${i}`}
              >
                <div className="relative aspect-square w-full overflow-hidden shrink-0">
                  <LazyImage
                    src={event.image}
                    alt={event.title}
                    containerClassName="w-full h-full"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-neutral-900/95 border border-neutral-800 text-xs font-medium text-white backdrop-blur-md">
                    {event.tag}
                  </div>
                  {/* Date Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 text-xs text-neutral-300 bg-neutral-900/95 px-2.5 py-1 rounded-full border border-neutral-800 backdrop-blur-md">
                    {event.date && event.date.toDateString ? event.date.toDateString() : (new Date(event.date || Date.now())).toDateString()}
                  </div>
                </div>
                <div className="p-5 flex flex-col h-full">
                  <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-red-300 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-neutral-400 text-sm mb-6 line-clamp-3">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export const EventsRow = (props) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateX: props.direction === "right" ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-row gap-6 pr-6 bg-transparent w-max"
      >
        {[...new Array(2).fill(0)].map((_, index) => (
          <React.Fragment key={index}>
            {props.events.map((event, i) => (
              <div 
                className="group rounded-xl border border-neutral-800/80 bg-neutral-900/60 backdrop-blur-md shadow-xl shadow-red-500/5 w-[300px] md:w-72 lg:w-[340px] xl:w-[380px] shrink-0 overflow-hidden hover:border-red-500/40 hover:bg-neutral-900/80 transition-all duration-300" 
                key={`${index}-${i}`}
              >
                <div className="relative aspect-square w-full overflow-hidden shrink-0">
                  <LazyImage
                    src={event.image}
                    alt={event.title}
                    containerClassName="w-full h-full"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-neutral-900/95 border border-neutral-800 text-xs font-medium text-white backdrop-blur-md">
                    {event.tag}
                  </div>
                  {/* Date Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 text-xs text-neutral-300 bg-neutral-900/95 px-2.5 py-1 rounded-full border border-neutral-800 backdrop-blur-md">
                    {event.date && event.date.toDateString ? event.date.toDateString() : (new Date(event.date || Date.now())).toDateString()}
                  </div>
                </div>
                <div className="p-5 flex flex-col h-full">
                  <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-red-300 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-neutral-400 text-sm mb-6 line-clamp-3">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
