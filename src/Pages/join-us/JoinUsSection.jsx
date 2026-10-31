/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { motion, useInView } from "framer-motion";
import { CheckCircle, Send } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../../firebase";

const initialFormData = {
  fullName: "",
  semester: "",
  branch: "",
  division: "",
  phone: "",
  email: "",
  firstPreference: "",
  firstPreferenceReason: "",
  secondPreference: "",
  secondPreferenceReason: "",
  whyJoin: "",
  contribution: "",
  technicalSkills: "",
  nonTechnicalSkills: "",
  initiative: "",
  selectionReason: "",
  timeCommitment: "",
};

const teams = [
  "Media",
  "Documentation",
  "Web",
  "Design",
  "Community Engagement",
  "Events",
  "Sponsorship",
];

const questions = [
  ["whyJoin", "Why would you like to join ENCIDE?"],
  ["contribution", "What do you think you can bring to ENCIDE?"],
  ["technicalSkills", "What are your technical skills?"],
  ["nonTechnicalSkills", "What are your strongest non-technical skills?"],
  ["initiative", "Suggest one new initiative or event you'd like to introduce."],
  ["selectionReason", "Why should we select you for the ENCIDE ExeCom?"],
  ["timeCommitment", "How much time can you dedicate to ENCIDE?"],
];

const JoinUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "execom-applications"), {
        ...formData,
        status: "new",
        createdAt: serverTimestamp(),
      });
      setFormData(initialFormData);
      toast.success("Your application has been submitted!");
    } catch (error) {
      console.error("Error submitting Execom application:", error);
      toast.error("Unable to submit your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="join-us"
      ref={ref}
      className="relative overflow-hidden py-24 bg-[radial-gradient(circle_at_100%_20%,rgba(220,38,38,0.12),transparent_35%)]"
    >
      <Toaster position="top-center" />
      <div className="container mx-auto px-4 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-red-400 font-semibold uppercase tracking-[0.25em] text-sm mb-4">
            Be part of the team
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
            Join{" "}
            <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
              Us
            </span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
            Bring your ideas, skills, and enthusiasm to ENCIDE MACE. Tell us a
            little about yourself and our team will get in touch.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-4xl mx-auto bg-neutral-900/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-neutral-800 shadow-2xl"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your full name" />
            <Field label="Semester" name="semester" value={formData.semester} onChange={handleChange} placeholder="S5" />
            <Field label="Branch" name="branch" value={formData.branch} onChange={handleChange} placeholder="ECE" />
            <Field label="Div (if applicable)" name="division" value={formData.division} onChange={handleChange} placeholder="A" required={false} />
            <Field label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" />
            <Field label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-6">
              <PreferenceField label="First Preference" name="firstPreference" value={formData.firstPreference} onChange={handleChange} required />
              <TextAreaField label="Why?" name="firstPreferenceReason" value={formData.firstPreferenceReason} onChange={handleChange} placeholder="Why is this your first preference?" />
            </div>
            <div className="space-y-6">
              <PreferenceField label="Second Preference" name="secondPreference" value={formData.secondPreference} onChange={handleChange} required={false} />
              <TextAreaField label="Why?" name="secondPreferenceReason" value={formData.secondPreferenceReason} onChange={handleChange} placeholder="Why is this your second preference?" required={false} />
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {questions.map(([name, label]) => (
              <TextAreaField
                key={name}
                label={label}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder="Your answer..."
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
            {isSubmitting ? <CheckCircle className="h-5 w-5" /> : <Send className="h-5 w-5" />}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

const inputClassName = "flex h-11 w-full rounded-lg border border-neutral-800 bg-neutral-950/50 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50";

const Field = ({ label, name, type = "text", value, onChange, placeholder, required = true }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-neutral-300 mb-2">{label}</label>
    <input id={name} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} className={inputClassName} />
  </div>
);

const PreferenceField = ({ label, name, value, onChange, required }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-neutral-300 mb-2">{label}</label>
    <select id={name} name={name} value={value} onChange={onChange} required={required} className={inputClassName}>
      <option value="">Select a team</option>
      {teams.map((team) => <option key={team}>{team}</option>)}
    </select>
  </div>
);

const TextAreaField = ({ label, name, value, onChange, placeholder, required = true }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-neutral-300 mb-2">{label}</label>
    <textarea id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} rows={3} className="w-full rounded-lg border border-neutral-800 bg-neutral-950/50 px-3 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 resize-y" />
  </div>
);

export default JoinUsSection;
