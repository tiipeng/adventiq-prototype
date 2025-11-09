import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal.jsx";

const SESSION_EXPERTS = [
  {
    id: "exp-101",
    name: "Dr. Jane Bauer",
    specialty: "Materials fatigue",
    rate: 320,
  },
  {
    id: "exp-205",
    name: "Prof. Alan Smith",
    specialty: "Seat design QA",
    rate: 280,
  },
];

const BASE_DURATION_MINUTES = 60;
const MODERATOR_FEE = 150;

function toDateInputValue(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export default function ConsultationSession() {
  const navigate = useNavigate();
  const [extendModalOpen, setExtendModalOpen] = useState(false);
  const [expertConfirmations, setExpertConfirmations] = useState(() =>
    SESSION_EXPERTS.reduce((acc, expert) => {
      acc[expert.id] = false;
      return acc;
    }, {})
  );
  const defaultDueDate = useMemo(() => {
    const stored = sessionStorage.getItem("session_defaultDueDate");
    if (stored) return stored;
    const fallback = new Date();
    fallback.setDate(fallback.getDate() + 5);
    const iso = toDateInputValue(fallback);
    sessionStorage.setItem("session_defaultDueDate", iso);
    return iso;
  }, []);
  const [extraMinutes, setExtraMinutes] = useState(() => {
    const stored = sessionStorage.getItem("session_extraMinutes");
    return stored ? Number(stored) : 0;
  });
  const [reportDueDate, setReportDueDate] = useState(() => {
    const stored = sessionStorage.getItem("session_reportDueDate");
    return stored || defaultDueDate;
  });
  const [requiresSignOff, setRequiresSignOff] = useState(() => {
    const stored = sessionStorage.getItem("session_requiresSignoff");
    if (stored === "true" || stored === "false") {
      return stored === "true";
    }
    return false;
  });
  const [expertSignOff, setExpertSignOff] = useState(() => sessionStorage.getItem("session_expertSignoff") === "true");
  const [moderatorAdded, setModeratorAdded] = useState(() => sessionStorage.getItem("session_moderatorAdded") === "true");
  const [logEntries, setLogEntries] = useState(() => {
    try {
      const stored = sessionStorage.getItem("session_log");
      if (stored) return JSON.parse(stored);
    } catch (error) {
      console.error("Failed to parse session log", error);
    }
    return [
      {
        id: "log-0",
        time: "09:00",
        text: "Session started and waiting room unlocked for participants.",
      },
      {
        id: "log-1",
        time: "09:05",
        text: "Dr. Jane Bauer joined. Recording enabled for transcript delivery.",
      },
      {
        id: "log-2",
        time: "09:07",
        text: "Prof. Alan Smith joined. Shared CAD deck for reference.",
      },
    ];
  });

  const totalMinutes = BASE_DURATION_MINUTES + extraMinutes;
  const blendedRate = useMemo(() => {
    const totalRate = SESSION_EXPERTS.reduce((sum, expert) => sum + expert.rate, 0);
    return totalRate / SESSION_EXPERTS.length;
  }, []);
  const sessionSubtotal = (totalMinutes / 60) * blendedRate;
  const totalCost = sessionSubtotal + (moderatorAdded ? MODERATOR_FEE : 0);

  const remainingTime = useMemo(() => {
    const minutesLeft = Math.max(0, totalMinutes - 10);
    const hours = Math.floor(minutesLeft / 60);
    const minutes = minutesLeft % 60;
    return `${hours}h ${minutes}m remaining`;
  }, [totalMinutes]);

  useEffect(() => {
    sessionStorage.setItem("session_extraMinutes", String(extraMinutes));
  }, [extraMinutes]);
  useEffect(() => {
    sessionStorage.setItem("session_reportDueDate", reportDueDate);
  }, [reportDueDate]);
  useEffect(() => {
    sessionStorage.setItem("session_requiresSignoff", requiresSignOff ? "true" : "false");
  }, [requiresSignOff]);
  useEffect(() => {
    sessionStorage.setItem("session_expertSignoff", expertSignOff ? "true" : "false");
  }, [expertSignOff]);
  useEffect(() => {
    sessionStorage.setItem("session_moderatorAdded", moderatorAdded ? "true" : "false");
  }, [moderatorAdded]);
  useEffect(() => {
    sessionStorage.setItem("session_log", JSON.stringify(logEntries));
  }, [logEntries]);
  useEffect(() => {
    const summary = {
      experts: SESSION_EXPERTS,
      totalMinutes,
      extraMinutes,
      moderatorAdded,
      reportDueDate,
      totalCost,
      blendedRate,
      sessionSubtotal,
    };
    sessionStorage.setItem("session_summary", JSON.stringify(summary));
  }, [extraMinutes, moderatorAdded, reportDueDate, totalCost, totalMinutes, blendedRate, sessionSubtotal]);

  const resetExpertConfirmations = () => {
    setExpertConfirmations(
      SESSION_EXPERTS.reduce((acc, expert) => {
        acc[expert.id] = false;
        return acc;
      }, {})
    );
  };

  const handleExtendClick = () => {
    setExtendModalOpen(true);
  };

  const allExpertsConfirmed = SESSION_EXPERTS.every((expert) => expertConfirmations[expert.id]);

  const handleConfirmExtension = () => {
    if (!allExpertsConfirmed) return;
    setExtraMinutes((prev) => prev + 15);
    const now = new Date();
    setLogEntries((prev) => [
      {
        id: `log-${prev.length + 1}`,
        time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: "Client added 15 minutes to the session once both experts consented.",
      },
      ...prev,
    ]);
    resetExpertConfirmations();
    setExtendModalOpen(false);
  };

  const handleDueDateChange = (value) => {
    setReportDueDate(value);
    if (!value) {
      setRequiresSignOff(false);
      setExpertSignOff(false);
      return;
    }
    const selected = new Date(value);
    const baseline = new Date(defaultDueDate);
    if (selected < baseline) {
      setRequiresSignOff(true);
      setExpertSignOff(false);
    } else {
      setRequiresSignOff(false);
      setExpertSignOff(true);
    }
  };

  const handleSaveDueDate = () => {
    const now = new Date();
    setLogEntries((prev) => [
      {
        id: `log-${prev.length + 1}`,
        time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: `Client updated the report deadline to ${reportDueDate}.`,
      },
      ...prev,
    ]);
  };

  const toggleModerator = () => {
    setModeratorAdded((prev) => {
      const next = !prev;
      const now = new Date();
      setLogEntries((log) => [
        {
          id: `log-${log.length + 1}`,
          time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          text: next
            ? "Client added a meeting moderator for coordination and note taking."
            : "Client removed the meeting moderator from the invoice.",
        },
        ...log,
      ]);
      return next;
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">Live consultation</p>
          <h1 className="text-2xl font-bold text-primary">Seat durability triage · Session room</h1>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
        >
          Back to dashboard
        </button>
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <section className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-primary">Session controls</h2>
                <p className="text-sm text-gray-600">Manage timing, report expectations, and facilitation.</p>
              </div>
              <div className="text-right text-sm text-gray-500">
                <div>{remainingTime}</div>
                <div>{formatCurrency(totalCost)} projected</div>
              </div>
            </div>

            <div className="mt-5 grid md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-primary">Extend duration</h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700">+15 min</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Need more time with the experts? Add 15-minute increments. Each expert must approve before the timer
                  updates.
                </p>
                <button
                  onClick={handleExtendClick}
                  className="mt-3 w-full px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                >
                  Request +15 minutes
                </button>
              </div>

              <div className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-primary">Report deadline</h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600">Default {defaultDueDate}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Adjust when the written report is due. Shorter deadlines notify experts for approval automatically.
                </p>
                <div className="mt-3 space-y-2">
                  <input
                    type="date"
                    value={reportDueDate}
                    onChange={(event) => handleDueDateChange(event.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  {requiresSignOff ? (
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs px-3 py-2 rounded-lg">
                      Earlier due date selected. Experts must confirm before the change is applied.
                    </div>
                  ) : (
                    <div className="bg-green-50 border border-green-200 text-green-700 text-xs px-3 py-2 rounded-lg">
                      Deadline aligned or extended. Experts are automatically informed.
                    </div>
                  )}
                  {requiresSignOff && (
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={expertSignOff}
                        onChange={(event) => setExpertSignOff(event.target.checked)}
                        className="rounded"
                      />
                      Expert confirmation received
                    </label>
                  )}
                  <button
                    onClick={handleSaveDueDate}
                    disabled={requiresSignOff && !expertSignOff}
                    className={`w-full px-3 py-2 rounded-lg text-sm font-medium ${
                      requiresSignOff && !expertSignOff
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-primary text-white hover:bg-primary/90"
                    }`}
                  >
                    Save deadline update
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5 border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-primary">Meeting support</h3>
                <span className="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-700">Optional</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                No AdventIQ Leader? Add a moderator to steer the conversation, capture actions, and manage follow-ups.
                The fee is applied to your final invoice.
              </p>
              <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-sm text-gray-600">
                  {moderatorAdded ? "Moderator assigned for this session." : "Moderator not currently included."}
                </div>
                <button
                  onClick={toggleModerator}
                  className="px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                >
                  {moderatorAdded ? "Remove moderator" : `Add moderator (${formatCurrency(MODERATOR_FEE)})`}
                </button>
              </div>
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-primary">Activity log</h2>
              <span className="text-xs text-gray-500">Newest first</span>
            </div>
            <ul className="mt-4 space-y-3">
              {logEntries.map((entry) => (
                <li key={entry.id} className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                  <div className="text-xs uppercase tracking-wide text-gray-500">{entry.time}</div>
                  <p className="text-sm text-gray-700 mt-1">{entry.text}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-4">
          <section className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="text-lg font-semibold text-primary">Session overview</h2>
            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Session duration</span>
                <span>{totalMinutes} minutes</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Expert blend rate</span>
                <span>{formatCurrency(blendedRate)}/hr</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Moderator</span>
                <span>{moderatorAdded ? formatCurrency(MODERATOR_FEE) : "Not added"}</span>
              </div>
              <div className="flex items-center justify-between font-semibold text-primary">
                <span>Projected invoice</span>
                <span>{formatCurrency(totalCost)}</span>
              </div>
            </div>
            <button
              onClick={() => navigate("/dashboard/session/completion")}
              className="mt-4 w-full px-3 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
            >
              Close session & prepare invoice
            </button>
          </section>

          <section className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="text-lg font-semibold text-primary">Expert roster</h2>
            <ul className="mt-3 space-y-3 text-sm text-gray-600">
              {SESSION_EXPERTS.map((expert) => (
                <li key={expert.id} className="border border-gray-200 rounded-xl px-3 py-2">
                  <div className="font-medium text-primary">{expert.name}</div>
                  <div className="text-xs text-gray-500">{expert.specialty}</div>
                  <div className="text-xs text-gray-500">{formatCurrency(expert.rate)}/hr</div>
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate("/dashboard/report/review")}
              className="mt-4 w-full px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              View session report draft
            </button>
          </section>
        </aside>
      </div>

      <Modal
        open={extendModalOpen}
        onClose={() => {
          setExtendModalOpen(false);
          resetExpertConfirmations();
        }}
        title="Extend session by 15 minutes"
        footer={
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-gray-600">
              {allExpertsConfirmed ? "All experts consented." : "Expert consent required before extending."}
            </span>
            <button
              onClick={handleConfirmExtension}
              disabled={!allExpertsConfirmed}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                allExpertsConfirmed ? "bg-primary text-white hover:bg-primary/90" : "bg-gray-100 text-gray-400"
              }`}
            >
              Confirm extension
            </button>
          </div>
        }
      >
        <p className="text-sm text-gray-600">
          Each expert must agree before the platform extends the timer and updates projected costs.
        </p>
        <ul className="mt-4 space-y-3">
          {SESSION_EXPERTS.map((expert) => (
            <li key={expert.id} className="flex items-center justify-between border border-gray-200 rounded-xl px-3 py-2">
              <div>
                <div className="font-medium text-primary">{expert.name}</div>
                <div className="text-xs text-gray-500">{expert.specialty}</div>
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={Boolean(expertConfirmations[expert.id])}
                  onChange={(event) =>
                    setExpertConfirmations((prev) => ({
                      ...prev,
                      [expert.id]: event.target.checked,
                    }))
                  }
                  className="rounded"
                />
                Consent
              </label>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}
