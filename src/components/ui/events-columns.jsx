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
                className="group rounded-lg border border-neutral-800/80 bg-neutral-900/60 backdrop-blur-md shadow-xl shadow-red-500/5 w-full md:w-72 lg:w-[340px] xl:w-[380px] overflow-hidden hover:border-red-500/40 hover:bg-neutral-900/80 transition-all duration-300 cursor-pointer" 
                key={`${index}-${i}`}
                onClick={() => props.onEventClick && props.onEventClick(event)}
              >
                <div className="relative aspect-square w-full overflow-hidden shrink-0">
                  <LazyImage
                    src={event.image}
                    alt={event.title}
                    containerClassName="w-full h-full"
                  />
                </div>
                <div className="p-2 md:p-5 flex flex-col h-full">
                  <h3 className="font-display text-sm lg:text-xl font-bold text-white mb-2 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-neutral-400 text-xs lg:text-sm line-clamp-2 md:line-clamp-3">
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
