import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Prof. Eldo P Elias",
    role: "Faculty Advisor",
    image: "/team/EldoSir.png",
    bio: "A dedicated educator whose guidance keeps the club grounded and always moving in the right direction.",
    socials: { linkedin: "https://www.linkedin.com/in/eldo-elias-7a094941" },
  },
  {
    id: 2,
    name: "Amrita Suresh",
    role: "Director",
    image: "/team/Amritha Suresh_Director.jpg",
    bio: "A CSE(DS) student who leads with vision, bringing structure and purpose to everything ENCIDE does.",
    socials: { linkedin: "https://www.linkedin.com/in/amritha-suresh-0831a5284" },
  },
  {
    id: 3,
    name: "Jassim Mohammed Salim",
    role: "Secretary",
    image: "/team/Jassim-Secretary.jpg",
    bio: "An ECE student who keeps the gears turning behind the scenes — organized, reliable, and detail-oriented.",
    socials: { linkedin: "https://www.linkedin.com/in/jassim-mohammed-salim" },
  },
  {
    id: 4,
    name: "Haritheerth M",
    role: "Co-Director",
    image: "/team/HaritheerthM_CoDirector.webp",
    bio: "An ECE student who thrives on collaboration and ensures every initiative is executed with precision.",
    socials: { linkedin: "https://www.linkedin.com/in/haritheerth-m-15706a370" },
  },
  {
    id: 5,
    name: "Dhia Shams",
    role: "Co-Director",
    image: "/team/Dhia Shams_ Codirector.jpg",
    bio: "A CSE student who blends creativity with execution, helping shape the culture and direction of the club.",
    socials: { linkedin: "https://www.linkedin.com/in/dhia-shams" },
  },
  {
    id: 6,
    name: "Ryan Nelson",
    role: "Treasurer",
    image: "/team/RyanNelson.png",
    bio: "An ECE student who manages the club's finances with care, ensuring every rupee goes toward meaningful impact.",
    socials: { linkedin: "https://www.linkedin.com/in/ryan-nelson-340006330" },
  },
];

const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="team"
      className="py-24 bg-neutral-950 relative overflow-hidden"
      ref={ref}
    >
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.05),transparent_40%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-fuchsia-600/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
            Meet the{" "}
            <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
              Leaders
            </span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
            The passionate individuals who make ENCIDE the thriving community it
            is today.
          </p>
        </motion.div>

        {/* Team Grid — 3 columns × 2 rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:px-20 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group text-center"
            >
              {/* Image Container */}
              <div className="relative mb-6 mx-auto w-48 h-48">
                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-neutral-800 group-hover:border-red-500/50 transition-all duration-300 shadow-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover cursor-pointer transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Info */}
              <h3 className="font-display text-xl font-bold text-white mb-1 group-hover:text-red-300 transition-colors">
                {member.name}
              </h3>
              <p className="text-red-500 font-medium text-sm mb-3">
                {member.role}
              </p>
              <p className="text-neutral-400 text-sm mb-5 max-w-xs mx-auto leading-relaxed group-hover:text-neutral-300 transition-colors">
                {member.bio}
              </p>

              {/* Socials — LinkedIn only */}
              <div className="flex justify-center gap-3">
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-red-600 hover:text-white hover:border-red-500 transition-all duration-300 shadow-sm"
                  aria-label={`${member.name}'s LinkedIn`}
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
