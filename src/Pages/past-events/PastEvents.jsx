import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPastEvents } from "../../lib/getEvents";
import { EventsColumn } from "../../components/ui/events-columns";
const PastEventsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
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
            <div className="flex md:hidden justify-center gap-4 mt-8 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] h-[600px] overflow-hidden w-full">
              <EventsColumn events={mobileCol1} duration={25} direction="up" className="flex-1 w-1/2" />
              <EventsColumn events={mobileCol2} duration={30} direction="down" className="flex-1 w-1/2" />
            </div>

            {/* Desktop Layout (3 Columns) */}
            <div className="hidden md:flex justify-center gap-6 lg:gap-8 mt-12 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] h-[750px] overflow-hidden max-w-[1400px] mx-auto w-full">
              <EventsColumn events={deskCol1} duration={35} direction="up" />
              <EventsColumn events={deskCol2} duration={42} direction="down" className="mt-12" />
              <EventsColumn events={deskCol3} duration={38} direction="up" />
            </div>
          </>
        )}
      </div>
    </section>
  );
};
export default PastEventsSection;
