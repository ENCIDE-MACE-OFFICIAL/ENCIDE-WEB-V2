import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  X,
  CheckCircle2,
  Loader2,
  Upload,
  QrCode,
  Clock,
  ImageIcon,
  Trash2,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

function Model({
  event,
  onClose,
  onConfirm,
  status,
  isRegistered,
  registrationStatus,
  memberCount,
  setMemberCount,
  teamName,
  setTeamName,
  members,
  setMembers,
  paymentFile,
  setPaymentFile,
  customAnswers,
  setCustomAnswers,
}) {
  const isChecking = status === "checking";
  const isSubmitting = status === "submitting";
  const isSuccess = status === "success";
  const isReady = status === "ready";

  const isPaidEvent = !!event.paymentQr;
  const paymentInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const isTeamNameValid = memberCount === 1 || teamName.trim().length > 0;

  const areMembersValid = members.slice(0, memberCount).every((m, index) => {
    if (index === 0) {
      return m.phone?.trim().length > 0;
    }

    return (
      m.name?.trim().length > 0 &&
      m.email?.trim().length > 0 &&
      m.phone?.trim().length > 0 &&
      m.college?.trim().length > 0 &&
      m.department?.trim().length > 0 &&
      m.semester?.trim().length > 0
    );
  });

  // For paid events, payment screenshot is required
  const isPaymentValid = !isPaidEvent || !!paymentFile;

  const customQuestions = event.customQuestions || [];

  const areCustomAnswersValid = customQuestions.every(
    (q) => !q.required || ((customAnswers?.[q.id] || "").trim().length > 0)
  );

  const isFormValid =
    isTeamNameValid &&
    areMembersValid &&
    isPaymentValid &&
    areCustomAnswersValid;

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type.startsWith("image/")) {
      setPaymentFile(dropped);
    }
  };

  // Determine what to show for already-registered users
  const getRegisteredMessage = () => {
    if (!isRegistered) return null;
    const s = registrationStatus || "approved";
    if (s === "pending") return "Payment Pending Approval";
    if (s === "rejected") return "Registration Rejected";
    return "Already Registered";
  };

  const getRegisteredDescription = () => {
    const s = registrationStatus || "approved";
    if (s === "pending")
      return "Your payment is being reviewed by the admin. You'll be approved once verified.";
    if (s === "rejected")
      return "Your registration was rejected. Please contact the organizer for details.";
    return "You're already registered for this event.";
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.2 }}
        className="relative bg-neutral-900 border border-red-500/20 rounded-2xl p-8 w-full max-w-md lg:max-w-2xl shadow-2xl max-h-[85vh] overflow-y-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#404040 #171717",
        }}
      >
        {/* Webkit Scrollbar */}
        <style>
          {`
            .custom-scroll::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scroll::-webkit-scrollbar-track {
              background: #171717;
            }
            .custom-scroll::-webkit-scrollbar-thumb {
              background-color: #404040;
              border-radius: 10px;
            }
          `}
        </style>

        <div className="custom-scroll">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 text-neutral-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-6">
            {isChecking && (
              <div className="flex flex-col items-center gap-4 text-neutral-400 py-12">
                <Loader2 className="w-8 h-8 animate-spin text-red-400" />
                <p>Checking registration...</p>
              </div>
            )}

            {(isReady || isSubmitting) && (
              <>
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-red-400" />
                </div>

                <h3 className="text-2xl font-bold text-white">
                  {isRegistered
                    ? getRegisteredMessage()
                    : "Confirm Registration"}
                </h3>

                {isRegistered ? (
                  <p className="text-neutral-400">
                    {getRegisteredDescription()}
                  </p>
                ) : (
                  <p className="text-neutral-400">
                    Register for{" "}
                    <span className="text-red-300 font-medium">
                      {event.title}
                    </span>
                  </p>
                )}

                <div className="bg-neutral-800/50 rounded-xl p-4 border border-neutral-800 space-y-3 text-sm text-neutral-300">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-red-400" />
                    {(() => {
                      const d = event.date;
                      if (!d) return "";
                      const dateObj = typeof d.toDate === 'function' ? d.toDate() : new Date(d);
                      const month = dateObj.toLocaleString("en-US", { month: "short" });
                      const day = dateObj.toLocaleString("en-US", { day: "2-digit" });
                      const weekday = dateObj.toLocaleString("en-US", { weekday: "short" });
                      const time = dateObj.toLocaleString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }).replace(":", ".");
                      const year = dateObj.getFullYear();
                      return `${month} ${day} ${weekday} ${time} ${year}`;
                    })()}
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-red-400" />
                    {event.location}
                  </div>
                </div>

                {/* Registration status badge for already-registered users */}
                {isRegistered && registrationStatus && (
                  <div
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium ${registrationStatus === "pending"
                        ? "bg-amber-500/5 border-amber-500/20 text-amber-400"
                        : registrationStatus === "rejected"
                          ? "bg-red-500/5 border-red-500/20 text-red-400"
                          : "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
                      }`}
                  >
                    {registrationStatus === "pending" && (
                      <Clock className="w-4 h-4" />
                    )}
                    {registrationStatus === "approved" && (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                    {registrationStatus === "rejected" && (
                      <X className="w-4 h-4" />
                    )}
                    Status:{" "}
                    {registrationStatus.charAt(0).toUpperCase() +
                      registrationStatus.slice(1)}
                  </div>
                )}

                {!isRegistered && (
                  <div className="space-y-5">
                    {/* Team Size */}
                    {!event.isIndividualEvent && (
                      <div>
                        <label className="text-sm text-neutral-400 block mb-2">
                          Team Size (Max 4)
                        </label>
                        <select
                          value={memberCount}
                          disabled={isSubmitting}
                          onChange={(e) => setMemberCount(Number(e.target.value))}
                          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500"
                        >
                          {[1, 2, 3, 4].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Team Name */}
                    {memberCount > 1 && (
                      <div>
                        <label className="text-sm text-neutral-400 block mb-2">
                          Team Name *
                        </label>
                        <input
                          type="text"
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                          disabled={isSubmitting}
                          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500"
                          placeholder="Enter team name"
                        />
                        {!isTeamNameValid && (
                          <p className="text-red-400 text-xs mt-1">
                            Team name is required
                          </p>
                        )}
                      </div>
                    )}

                    {/* Members */}
                    {members.slice(0, memberCount).map((member, index) => (
                      <div
                        key={index}
                        className="space-y-3 border border-neutral-800 p-4 rounded-lg"
                      >
                        <p className="text-sm text-neutral-400">
                          {index === 0 ? <>
                            {event.isIndividualEvent ? "your details (can be changed in you profile)" : "Team Lead"}
                          </> : `Member ${index + 1}`}
                        </p>

                        <input
                          type="text"
                          placeholder="Name"
                          value={member.name}
                          disabled={index === 0 || isSubmitting}
                          onChange={(e) => {
                            const updated = [...members];
                            updated[index].name = e.target.value;
                            setMembers(updated);
                          }}
                          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500"
                        />

                        <input
                          type="email"
                          placeholder="Email"
                          value={member.email}
                          disabled={index === 0 || isSubmitting}
                          onChange={(e) => {
                            const updated = [...members];
                            updated[index].email = e.target.value;
                            setMembers(updated);
                          }}
                          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500"
                        />

                        <input
                          type="text"
                          placeholder="Phone"
                          value={member.phone}
                          disabled={isSubmitting}
                          onChange={(e) => {
                            const updated = [...members];
                            updated[index].phone = e.target.value;
                            setMembers(updated);
                          }}
                          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500"
                        />

                        <input
                          type="text"
                          placeholder="College"
                          value={member.college || ""}
                          disabled={index === 0 || isSubmitting}
                          onChange={(e) => {
                            const updated = [...members];
                            updated[index].college = e.target.value;
                            setMembers(updated);
                          }}
                          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500"
                        />

                        <div className="flex gap-3">
                          <select
                            value={member.department || ""}
                            disabled={index === 0 || isSubmitting}
                            onChange={(e) => {
                              const updated = [...members];
                              updated[index].department = e.target.value;
                              setMembers(updated);
                            }}
                            className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500"
                          >
                            <option value="" disabled>Department</option>
                            {["CS", "AIML", "DS", "EEE", "ECE", "CIVIL", "MECH"].map((dept) => (
                              <option key={dept} value={dept}>{dept}</option>
                            ))}
                          </select>

                          <select
                            value={member.semester || ""}
                            disabled={index === 0 || isSubmitting}
                            onChange={(e) => {
                              const updated = [...members];
                              updated[index].semester = e.target.value;
                              setMembers(updated);
                            }}
                            className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500"
                          >
                            <option value="" disabled>Semester</option>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                              <option key={sem} value={sem}>{sem}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}

                    {/* Custom Questions */}
                    {customQuestions.length > 0 && (
                      <div className="space-y-4">
                        <p className="text-sm text-neutral-400 font-medium">
                          Additional Questions
                        </p>
                        {customQuestions.map((q) => (
                          <div
                            key={q.id}
                            className="space-y-3 border border-neutral-800 p-4 rounded-lg"
                          >
                            {q.type === "checkbox" ? (
                              <label className="flex items-start gap-3 cursor-pointer text-sm text-neutral-300">
                                <input
                                  type="checkbox"
                                  checked={customAnswers?.[q.id] === "Yes"}
                                  disabled={isSubmitting}
                                  onChange={(e) =>
                                    setCustomAnswers((prev) => ({
                                      ...prev,
                                      [q.id]: e.target.checked ? "Yes" : "",
                                    }))
                                  }
                                  className="accent-red-500 mt-0.5 shrink-0"
                                />
                                <span>
                                  {q.question}
                                  {q.required && (
                                    <span className="text-red-400"> *</span>
                                  )}
                                </span>
                              </label>
                            ) : (
                              <>
                                <label className="text-sm text-neutral-300">
                                  {q.question}
                                  {q.required && (
                                    <span className="text-red-400"> *</span>
                                  )}
                                </label>

                                {q.type === "mcq" ? (
                                  <div className="space-y-2">
                                    {(q.options || []).map((opt, oIdx) => (
                                      <label
                                        key={oIdx}
                                        className="flex items-center gap-3 cursor-pointer text-sm text-neutral-200"
                                      >
                                        <input
                                          type="radio"
                                          name={q.id}
                                          value={opt}
                                          checked={
                                            customAnswers?.[q.id] === opt
                                          }
                                          disabled={isSubmitting}
                                          onChange={() =>
                                            setCustomAnswers((prev) => ({
                                              ...prev,
                                              [q.id]: opt,
                                            }))
                                          }
                                          className="accent-red-500"
                                        />
                                        {opt}
                                      </label>
                                    ))}
                                  </div>
                                ) : q.type === "short_text" ? (
                                  <input
                                    type="text"
                                    value={customAnswers?.[q.id] || ""}
                                    disabled={isSubmitting}
                                    onChange={(e) =>
                                      setCustomAnswers((prev) => ({
                                        ...prev,
                                        [q.id]: e.target.value,
                                      }))
                                    }
                                    placeholder="Your answer"
                                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500"
                                  />
                                ) : (
                                  <textarea
                                    value={customAnswers?.[q.id] || ""}
                                    disabled={isSubmitting}
                                    onChange={(e) =>
                                      setCustomAnswers((prev) => ({
                                        ...prev,
                                        [q.id]: e.target.value,
                                      }))
                                    }
                                    placeholder="Your answer"
                                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500 min-h-[90px] resize-none"
                                  />
                                )}
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Payment Section — only for paid events */}
                    {isPaidEvent && (
                      <div className="space-y-4 border border-amber-500/20 bg-amber-500/5 rounded-xl p-5">
                        <div className="flex items-center gap-2 text-amber-400 font-medium text-sm">
                          <QrCode className="w-4 h-4" />
                          Payment Required
                        </div>

                        {/* QR Code Display */}
                        <div className="flex flex-col items-center gap-3">
                          <p className="text-xs text-neutral-400 text-center">
                            Scan the QR code below to make your payment, then
                            upload a screenshot of the confirmation.
                          </p>
                          <div className="bg-white rounded-xl p-3 shadow-lg">
                            <img
                              src={event.paymentQr}
                              alt="Payment QR Code"
                              className="w-48 h-48 object-contain"
                            />
                          </div>
                        </div>

                        {/* Payment Screenshot Upload */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-amber-400" />
                            Payment Screenshot *
                          </label>

                          {paymentFile ? (
                            <div className="relative group rounded-xl overflow-hidden border border-neutral-700 bg-neutral-950/30 h-[140px]">
                              <img
                                src={URL.createObjectURL(paymentFile)}
                                alt="Payment proof"
                                className="w-full h-full object-cover opacity-90"
                              />
                              <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  type="button"
                                  onClick={() =>
                                    paymentInputRef.current?.click()
                                  }
                                  className="p-1.5 rounded-lg bg-neutral-900/90 border border-neutral-700 text-neutral-300 hover:text-white hover:border-red-500/50 transition-all"
                                  title="Replace"
                                >
                                  <Upload className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setPaymentFile(null)}
                                  className="p-1.5 rounded-lg bg-neutral-900/90 border border-neutral-700 text-neutral-300 hover:text-red-400 hover:border-red-500/50 transition-all"
                                  title="Remove"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-medium flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                Screenshot attached
                              </div>
                            </div>
                          ) : (
                            <div
                              onDrop={handleDrop}
                              onDragOver={(e) => {
                                e.preventDefault();
                                setIsDragOver(true);
                              }}
                              onDragLeave={() => setIsDragOver(false)}
                              onClick={() =>
                                paymentInputRef.current?.click()
                              }
                              className={`rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 py-6 ${isDragOver
                                  ? "border-amber-500 bg-amber-500/5"
                                  : "border-neutral-700 bg-neutral-950/30 hover:border-neutral-600 hover:bg-neutral-950/50"
                                }`}
                            >
                              <div
                                className={`p-2 rounded-xl ${isDragOver
                                    ? "bg-amber-500/10"
                                    : "bg-neutral-800"
                                  } transition-colors`}
                              >
                                <Upload
                                  className={`w-5 h-5 ${isDragOver
                                      ? "text-amber-400"
                                      : "text-neutral-500"
                                    } transition-colors`}
                                />
                              </div>
                              <div className="text-center">
                                <p className="text-sm text-neutral-400">
                                  <span className="text-amber-400 font-medium">
                                    Upload screenshot
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-neutral-600 mt-1">
                                  PNG, JPG, WebP
                                </p>
                              </div>
                            </div>
                          )}

                          <input
                            ref={paymentInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) setPaymentFile(f);
                              e.target.value = "";
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-neutral-300 font-medium disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={onConfirm}
                    disabled={isSubmitting || !isFormValid}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-medium flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing
                      </>
                    ) : isRegistered ? (
                      "Close"
                    ) : (
                      "Confirm"
                    )}
                  </button>
                </div>
              </>
            )}

            {isSuccess && (
              <SuccessScreen
                isPaidEvent={isPaidEvent}
                whatsappRedirectUrl={event.whatsappRedirectUrl}
                onClose={onClose}
              />
            )}

            {status === "error" && (
              <div className="text-center text-red-400">
                Something went wrong. Please try again.
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SuccessScreen({ isPaidEvent, whatsappRedirectUrl, onClose }) {
  const trimmedUrl = (whatsappRedirectUrl || "").trim();
  const hasWhatsapp = !!trimmedUrl;
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!hasWhatsapp) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = trimmedUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasWhatsapp, trimmedUrl]);

  return (
    <div className="text-center space-y-6 py-6">
      <div
        className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${isPaidEvent
            ? "bg-amber-500/10 border border-amber-500/20"
            : "bg-green-500/10 border border-green-500/20"
          }`}
      >
        {isPaidEvent ? (
          <Clock className="w-8 h-8 text-amber-400" />
        ) : (
          <CheckCircle2 className="w-8 h-8 text-green-400" />
        )}
      </div>

      <h3 className="text-2xl font-bold text-white">
        {isPaidEvent
          ? "Registration Submitted!"
          : "Registration Successful!"}
      </h3>

      {isPaidEvent && (
        <p className="text-neutral-400 text-sm">
          Your payment proof has been submitted. An admin will review
          and approve your registration shortly.
        </p>
      )}

      {/* WhatsApp Redirect Section */}
      {hasWhatsapp && (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-green-400">
            <MessageCircle className="w-5 h-5" />
            <p className="text-sm font-medium">
              You will be redirected to join the WhatsApp group in{" "}
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 font-bold text-base">
                {countdown}
              </span>{" "}
              seconds
            </p>
          </div>

          <a
            href={whatsappRedirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium text-sm transition-all shadow-lg shadow-green-600/20 hover:shadow-green-600/40"
          >
            <ExternalLink className="w-4 h-4" />
            Join WhatsApp Group
          </a>
        </div>
      )}

      <button
        onClick={onClose}
        className="w-full px-4 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium"
      >
        Close
      </button>
    </div>
  );
}

export default Model;
