/* eslint-disable react/prop-types */
import { useState } from "react";
import { ClipboardList, Eye, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const details = [
  ["semester", "Semester"],
  ["branch", "Branch"],
  ["division", "Division"],
  ["phone", "Phone Number"],
  ["email", "Email"],
  ["firstPreference", "First Preference"],
  ["firstPreferenceReason", "Why (First Preference)"],
  ["secondPreference", "Second Preference"],
  ["secondPreferenceReason", "Why (Second Preference)"],
  ["whyJoin", "Why join ENCIDE?"],
  ["contribution", "What can you bring?"],
  ["technicalSkills", "Technical skills"],
  ["nonTechnicalSkills", "Non-technical skills"],
  ["initiative", "Suggested initiative"],
  ["selectionReason", "Why select you?"],
  ["timeCommitment", "Time commitment"],
];

const ExecomApplicationsTable = ({ applications, onDelete }) => {
  const [selectedApplication, setSelectedApplication] = useState(null);

  return (
    <>
      <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-neutral-800 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-500/10"><ClipboardList className="w-5 h-5 text-red-400" /></div>
          <h2 className="text-lg font-bold text-white">ExeCom Applications</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-400">
            <thead className="text-xs uppercase bg-neutral-900/50 text-neutral-500 font-medium">
              <tr><th className="px-6 py-4">Name</th><th className="px-6 py-4">Email</th><th className="px-6 py-4">First Preference</th><th className="px-6 py-4">Submitted</th><th className="px-6 py-4 text-right">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {applications.map((application) => (
                <motion.tr key={application.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-neutral-800/30 transition-colors group">
                  <td className="px-6 py-4 font-medium text-white">{application.fullName}</td>
                  <td className="px-6 py-4">{application.email}</td>
                  <td className="px-6 py-4">{application.firstPreference || "-"}</td>
                  <td className="px-6 py-4 font-mono text-xs text-neutral-500">{application.submittedAt}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setSelectedApplication(application)} className="p-2 rounded-lg hover:bg-red-500/10 text-neutral-400 hover:text-red-400" title="View Details"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => onDelete(application.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-neutral-400 hover:text-red-400" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {!applications.length && <p className="p-8 text-center text-neutral-500">No applications yet.</p>}
        </div>
      </div>

      <AnimatePresence>
        {selectedApplication && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
              <button onClick={() => setSelectedApplication(null)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-800 text-neutral-400"><X className="w-5 h-5" /></button>
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-white mb-6">{selectedApplication.fullName}</h3>
                <div className="space-y-5">
                  {details.map(([key, label]) => (
                    <div key={key}>
                      <p className="text-xs uppercase tracking-wide text-neutral-500 mb-1">{label}</p>
                      <p className="text-neutral-200 whitespace-pre-wrap">{selectedApplication[key] || "-"}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExecomApplicationsTable;
