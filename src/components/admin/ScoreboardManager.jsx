import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Save, Trophy, X } from "lucide-react";
import {
  departments,
  defaultScoreboardEvents,
  normalizeScoreboardEvent,
} from "../../lib/scoreboard";

const createEditableEvent = (event) => ({
  id: event.id,
  name: event.name,
  scores: departments.reduce((accumulator, department) => {
    accumulator[department] = event.scores?.[department] ?? 0;
    return accumulator;
  }, {}),
  winners: Array.from({ length: 3 }, (_, index) => {
    const winner = event.winners?.[index] || {};
    return {
      name: winner.name || "",
      department: winner.department || departments[0] || "",
    };
  }),
});

const mergeScoreboardEvents = (savedEvents = []) => {
  const savedById = new Map(
    savedEvents.filter((event) => event && event.id).map((event) => [event.id, event])
  );

  return defaultScoreboardEvents.map((baseEvent) =>
    normalizeScoreboardEvent(savedById.get(baseEvent.id), baseEvent)
  );
};

const ScoreInput = ({ department, value, onChange }) => (
  <label className="space-y-1.5">
    <span className="block text-xs font-medium text-neutral-400 uppercase tracking-wider">
      {department}
    </span>
    <input
      type="number"
      min="0"
      value={value}
      onChange={(event) => onChange(department, event.target.value)}
      className="w-full rounded-lg border border-neutral-700 bg-neutral-950/40 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-red-500/60 focus:ring-1 focus:ring-red-500/40"
    />
  </label>
);

const ScoreboardManager = ({ events, onSave, isLoading = false }) => {
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState(null);

  const mergedEvents = useMemo(() => mergeScoreboardEvents(events), [events]);

  useEffect(() => {
    if (!editingEvent) return;

    const latestEvent = mergedEvents.find((event) => event.id === editingEvent.id);
    if (latestEvent) {
      setFormData(createEditableEvent(latestEvent));
    }
  }, [editingEvent, mergedEvents]);

  const handleOpenEditor = (event) => {
    const editableEvent = createEditableEvent(event);
    setEditingEvent(editableEvent);
    setFormData(editableEvent);
  };

  const handleScoreChange = (department, value) => {
    setFormData((current) => ({
      ...current,
      scores: {
        ...current.scores,
        [department]: value,
      },
    }));
  };

  const handleWinnerChange = (index, field, value) => {
    setFormData((current) => {
      const winners = [...current.winners];
      winners[index] = {
        ...winners[index],
        [field]: value,
      };

      return {
        ...current,
        winners,
      };
    });
  };

  const handleClose = () => {
    setEditingEvent(null);
    setFormData(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData) return;

    try {
      await onSave({
        ...formData,
        scores: departments.reduce((accumulator, department) => {
          accumulator[department] = Number(formData.scores[department]) || 0;
          return accumulator;
        }, {}),
        winners: formData.winners.map((winner) => ({
          name: winner.name.trim() || "N/A",
          department: winner.department.trim() || "N/A",
        })),
      });
      handleClose();
    } catch (error) {
      console.error("Error saving scoreboard:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-red-400 font-medium">
              Scoreboard Control
            </p>
            <h2 className="text-2xl font-bold text-white mt-2">
              Edit event scores and winners
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              Update the leaderboard shown on the public ICL dashboard.
            </p>
          </div>
          {isLoading && (
            <span className="inline-flex items-center gap-2 self-start rounded-full border border-neutral-700 bg-neutral-950/40 px-3 py-1 text-xs text-neutral-400">
              <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
              Syncing scoreboard
            </span>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {mergedEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-neutral-800 bg-neutral-950/40 p-5 shadow-lg shadow-black/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                    Event
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-white">
                    {event.name}
                  </h3>
                </div>
                <button
                  onClick={() => handleOpenEditor(event)}
                  className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/20 hover:text-white"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </button>
              </div>

              <div className="mt-4 rounded-lg border border-neutral-800 bg-neutral-900/70 p-3">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neutral-500">
                  <Trophy className="h-3.5 w-3.5 text-amber-400" />
                  Top Winners
                </div>
                <div className="mt-3 space-y-2">
                  {event.winners.map((winner, index) => (
                    <div
                      key={`${event.id}-${index}`}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium text-white">
                          {winner.name || "N/A"}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {winner.department || "N/A"}
                        </p>
                      </div>
                      <span className="text-xs text-neutral-500">
                        {index + 1}
                        {index === 0 ? "st" : index === 1 ? "nd" : "rd"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-neutral-500">
                {departments.map((department) => (
                  <div
                    key={`${event.id}-${department}`}
                    className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-3 py-2"
                  >
                    <span className="block uppercase tracking-wider text-[10px]">
                      {department}
                    </span>
                    <span className="mt-1 block text-base font-semibold text-white">
                      {event.scores?.[department] ?? 0}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {formData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 border-b border-neutral-800 p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                    Editing scoreboard
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-white">
                    {formData.name}
                  </h3>
                </div>
                <button
                  onClick={handleClose}
                  className="rounded-full border border-neutral-700 p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form id="scoreboard-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
                <div className="space-y-8">
                  <section>
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-400">
                        Department Scores
                      </h4>
                      <p className="mt-1 text-sm text-neutral-500">
                        Edit the points awarded to each department for this event.
                      </p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                      {departments.map((department) => (
                        <ScoreInput
                          key={department}
                          department={department}
                          value={formData.scores[department]}
                          onChange={handleScoreChange}
                        />
                      ))}
                    </div>
                  </section>

                  <section>
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-400">
                        Winners
                      </h4>
                      <p className="mt-1 text-sm text-neutral-500">
                        Set the top three winners for the event.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {formData.winners.map((winner, index) => (
                        <div
                          key={`${formData.id}-winner-${index}`}
                          className="rounded-xl border border-neutral-800 bg-neutral-950/40 p-4"
                        >
                          <div className="mb-3 flex items-center justify-between">
                            <span className="text-sm font-semibold text-white">
                              {index + 1}
                              {index === 0 ? "st" : index === 1 ? "nd" : "rd"} Place
                            </span>
                          </div>
                          <div className="grid gap-4 md:grid-cols-2">
                            <label className="space-y-1.5">
                              <span className="block text-xs font-medium text-neutral-400 uppercase tracking-wider">
                                Winner Name
                              </span>
                              <input
                                type="text"
                                value={winner.name}
                                onChange={(event) =>
                                  handleWinnerChange(index, "name", event.target.value)
                                }
                                placeholder="Enter winner name"
                                className="w-full rounded-lg border border-neutral-700 bg-neutral-950/40 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-red-500/60 focus:ring-1 focus:ring-red-500/40"
                              />
                            </label>

                            <label className="space-y-1.5">
                              <span className="block text-xs font-medium text-neutral-400 uppercase tracking-wider">
                                Department
                              </span>
                              <select
                                value={winner.department}
                                onChange={(event) =>
                                  handleWinnerChange(index, "department", event.target.value)
                                }
                                className="w-full rounded-lg border border-neutral-700 bg-neutral-950/40 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-red-500/60 focus:ring-1 focus:ring-red-500/40"
                              >
                                {departments.map((department) => (
                                  <option key={department} value={department}>
                                    {department}
                                  </option>
                                ))}
                                <option value="N/A">N/A</option>
                              </select>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </form>

              <div className="flex items-center justify-end gap-3 border-t border-neutral-800 bg-neutral-950/60 p-6">
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-lg border border-neutral-700 px-4 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  form="scoreboard-form"
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                >
                  <Save className="h-4 w-4" />
                  Save Scoreboard
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScoreboardManager;