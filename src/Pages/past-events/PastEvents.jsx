import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X, Calendar, MapPin, Tag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchPastEvents } from "../../lib/getEvents";
import { EventsColumn } from "../../components/ui/events-columns";
import LazyImage from "../../components/LazyImage";
const PastEventsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  const {
    data: pastEvents,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["past-events"],
    queryFn: fetchPastEvents,
    refetchOnWindowFocus: false,
  });

  const mobileCol1 = pastEvents ? pastEvents.filter((_, i) => i % 2 === 0) : [];
  const mobileCol2 = pastEvents ? pastEvents.filter((_, i) => i % 2 === 1) : [];

  const deskCol1 = pastEvents ? pastEvents.filter((_, i) => i % 3 === 0) : [];
  const deskCol2 = pastEvents ? pastEvents.filter((_, i) => i % 3 === 1) : [];
  const deskCol3 = pastEvents ? pastEvents.filter((_, i) => i % 3 === 2) : [];
  return (
    <section
      id="past-events"
      className="py-24 md:py-32 px-2 md:px-4 lg:px-8 xl:px-12 bg-neutral-950 relative overflow-hidden"
      ref={ref}
    >
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.05),transparent_25%)] pointer-events-none" />
      <div className="hidden md:block absolute top-1/4 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-2 md:px-4 relative z-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[500px]">
            <div className="w-12 h-12 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
            <p className="text-neutral-400 font-medium mt-4 animate-pulse">
              Loading events...
            </p>
          </div>
        ) : isError || !pastEvents || pastEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[500px] text-neutral-400">
            <p>Unable to load past events.</p>
          </div>
        ) : (
          <>
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="relative mb-16 md:mb-20"
            >
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
                  Our Legacy of{" "}
                  <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent drop-shadow-sm">
                    Excellence
                  </span>
                </h2>
                <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto">
                  A showcase of successful events that have shaped our community,
                  sparked innovation, and inspired hundreds of students.
                </p>
              </div>
            </motion.div>
            
            {/* Mobile Layout (2 Columns) */}
            <div className="flex md:hidden justify-center gap-2 md:gap-4 mt-8 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] h-[800px] overflow-hidden w-full">
              <EventsColumn events={mobileCol1} duration={25} direction="up" className="flex-1 w-1/2" onEventClick={setSelectedEvent} />
              <EventsColumn events={mobileCol2} duration={30} direction="down" className="flex-1 w-1/2" onEventClick={setSelectedEvent} />
            </div>

            {/* Desktop Layout (3 Columns) */}
            <div className="hidden md:flex justify-center gap-6 lg:gap-8 mt-12 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] h-[750px] overflow-hidden max-w-[1400px] mx-auto w-full">
              <EventsColumn events={deskCol1} duration={35} direction="up" onEventClick={setSelectedEvent} />
              <EventsColumn events={deskCol2} duration={42} direction="down" className="mt-12" onEventClick={setSelectedEvent} />
              <EventsColumn events={deskCol3} duration={38} direction="up" onEventClick={setSelectedEvent} />
            </div>
          </>
        )}
      </div>

      {/* Event Details Popup */}
      <AnimatePresence>
        {selectedEvent && (
          <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md" 
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-4xl max-h-[90vh] sm:max-h-[85vh] overflow-hidden shadow-2xl relative flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 md:bg-neutral-800/80 text-white hover:bg-red-600 md:hover:bg-red-600 transition-colors backdrop-blur-md z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-[45%] shrink-0 bg-black/40 flex items-center justify-center relative">
                {/* Background blur effect for atmosphere */}
                <div 
                  className="absolute inset-0 opacity-30 blur-2xl md:blur-3xl"
                  style={{ backgroundImage: `url(${selectedEvent.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
                <div className="relative w-full aspect-square md:p-6 lg:p-8 flex items-center justify-center">
                  <LazyImage 
                    src={selectedEvent.image} 
                    alt={selectedEvent.title}
                    containerClassName="w-full h-full relative z-10 md:rounded-xl md:shadow-2xl md:shadow-red-500/10 bg-transparent"
                    className="md:rounded-xl"
                    objectFit="object-contain"
                    duration="duration-[1000ms]"
                    skeletonDuration="duration-[700ms]"
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 md:p-8 lg:p-10 overflow-y-auto custom-scrollbar flex-1 flex flex-col bg-neutral-900 border-t md:border-t-0 md:border-l border-neutral-800">
                <div className="pr-10 md:pr-8">
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                    {selectedEvent.title}
                  </h3>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-neutral-300 mb-8 pb-6 border-b border-neutral-800">
                  {selectedEvent.tag && (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                      <Tag className="w-3.5 h-3.5" />
                      {selectedEvent.tag}
                    </span>
                  )}
                  {selectedEvent.date && (
                    <span className="flex items-center gap-1.5 bg-neutral-800/50 px-2.5 py-1 rounded-full border border-neutral-700/50">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      {typeof selectedEvent.date.toDateString === 'function' ? selectedEvent.date.toDateString() : new Date(selectedEvent.date).toDateString()}
                    </span>
                  )}
                  {selectedEvent.location && (
                    <span className="flex items-center gap-1.5 bg-neutral-800/50 px-2.5 py-1 rounded-full border border-neutral-700/50">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      {selectedEvent.location}
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">About the Event</h4>
                  <p className="text-neutral-400 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                    {selectedEvent.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
export default PastEventsSection;
