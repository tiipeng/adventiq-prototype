import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export default function ConsultationCompletion() {
  const navigate = useNavigate();
  const sessionSummary = useMemo(() => {
    try {
      const stored = sessionStorage.getItem("session_summary");
      if (stored) return JSON.parse(stored);
    } catch (error) {
      console.error("Unable to parse session summary", error);
    }
    return {};
  }, []);

  const experts = sessionSummary?.experts || [
    { id: "exp-101", name: "Dr. Jane Bauer", specialty: "Materials fatigue" },
    { id: "exp-205", name: "Prof. Alan Smith", specialty: "Seat design QA" },
  ];

  const [paymentStatus, setPaymentStatus] = useState(() => sessionStorage.getItem("completion_paymentStatus") || "pending");
  const [feedback, setFeedback] = useState(() => sessionStorage.getItem("completion_feedback") || "");
  const [sendReceipt, setSendReceipt] = useState(() => sessionStorage.getItem("completion_sendReceipt") !== "false");
  const [ratings, setRatings] = useState(() => {
    try {
      const stored = sessionStorage.getItem("completion_ratings");
      if (stored) return JSON.parse(stored);
    } catch (error) {
      console.error("Unable to parse ratings", error);
    }
    return experts.reduce((acc, expert) => {
      acc[expert.id] = 5;
      return acc;
    }, {});
  });
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(() => sessionStorage.getItem("completion_feedbackSubmitted") === "true");

  const moderatorFee = sessionSummary?.moderatorAdded ? 150 : 0;
  const extraTimeMinutes = sessionSummary?.extraMinutes || 0;
  const blendedRate = sessionSummary?.blendedRate || 300;
  const extraTimeCost = (extraTimeMinutes / 60) * blendedRate;
  const baseCost = sessionSummary?.sessionSubtotal || 300;
  const totalDue = (baseCost + extraTimeCost + moderatorFee).toFixed(2);

  const invoiceItems = [
    {
      id: "inv-base",
      label: "Consultation time",
      value: `${sessionSummary?.totalMinutes || 60} minutes @ ${formatCurrency(blendedRate)}/hr`,
      amount: baseCost,
    },
    {
      id: "inv-extra",
      label: "Additional time",
      value: `${extraTimeMinutes} minutes consented in-session`,
      amount: extraTimeCost,
    },
  ];
  if (moderatorFee) {
    invoiceItems.push({
      id: "inv-moderator",
      label: "Meeting moderator",
      value: "Session coordination & note taking",
      amount: moderatorFee,
    });
  }

  const handleMarkPaid = () => {
    setPaymentStatus("paid");
    sessionStorage.setItem("completion_paymentStatus", "paid");
  };

  const handleRatingChange = (expertId, value) => {
    setRatings((prev) => {
      const next = { ...prev, [expertId]: Number(value) };
      sessionStorage.setItem("completion_ratings", JSON.stringify(next));
      return next;
    });
  };

  const handleFeedbackSubmit = () => {
    if (!feedback.trim()) {
      return;
    }
    setFeedbackSubmitted(true);
    sessionStorage.setItem("completion_feedbackSubmitted", "true");
  };

  const handleFeedbackChange = (value) => {
    setFeedback(value);
    sessionStorage.setItem("completion_feedback", value);
  };

  const handleReceiptToggle = (value) => {
    setSendReceipt(value);
    sessionStorage.setItem("completion_sendReceipt", value ? "true" : "false");
  };

  const settlementBanner = paymentStatus === "paid"
    ? {
        tone: "bg-green-50 border-green-200 text-green-700",
        message: "Payment confirmed. Experts notified and moderator notes released.",
      }
    : {
        tone: "bg-yellow-50 border-yellow-200 text-yellow-800",
        message: "Payment pending. Capture at least 50% to release the final deliverables.",
      };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">Completion</p>
          <h1 className="text-2xl font-bold text-primary">Finalize consultation · Seat durability triage</h1>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
        >
          Back to dashboard
        </button>
      </div>

      <div className={`mt-6 border rounded-2xl p-4 ${settlementBanner.tone}`}>
        <div className="text-sm font-medium">{settlementBanner.message}</div>
        <div className="text-xs mt-1">
          Invoice total {formatCurrency(Number(totalDue) || 0)} · Due upon receipt · Receipt email {sendReceipt ? "enabled" : "disabled"}
        </div>
      </div>

      <section className="mt-6 bg-white border border-gray-200 rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-primary">Invoice summary</h2>
          <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-500 cursor-not-allowed" disabled>
            Download invoice (coming soon)
          </button>
        </div>
        <div className="mt-4 divide-y border border-gray-200 rounded-xl overflow-hidden">
          {invoiceItems.map((item) => (
            <div key={item.id} className="px-4 py-3 flex items-center justify-between text-sm text-gray-600">
              <div>
                <div className="font-medium text-primary">{item.label}</div>
                <div className="text-xs text-gray-500">{item.value}</div>
              </div>
              <div className="font-medium text-primary">{formatCurrency(item.amount || 0)}</div>
            </div>
          ))}
          <div className="px-4 py-3 flex items-center justify-between text-sm font-semibold bg-gray-50 text-primary">
            <span>Total due</span>
            <span>{formatCurrency(Number(totalDue) || 0)}</span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={handleMarkPaid}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              paymentStatus === "paid" ? "bg-gray-100 text-gray-400" : "bg-primary text-white hover:bg-primary/90"
            }`}
            disabled={paymentStatus === "paid"}
          >
            Mark as paid
          </button>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={sendReceipt}
              onChange={(event) => handleReceiptToggle(event.target.checked)}
              className="rounded"
            />
            Email receipt to stakeholders
          </label>
        </div>
      </section>

      <section className="mt-6 bg-white border border-gray-200 rounded-2xl p-5">
        <h2 className="text-lg font-semibold text-primary">Rate your experts</h2>
        <p className="text-sm text-gray-600">Share quick scores so AdventIQ can refine matches in the future.</p>
        <div className="mt-4 space-y-3">
          {experts.map((expert) => (
            <div key={expert.id} className="border border-gray-200 rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="font-medium text-primary">{expert.name}</div>
                <div className="text-xs text-gray-500">{expert.specialty}</div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Score</span>
                <select
                  value={ratings[expert.id] ?? 5}
                  onChange={(event) => handleRatingChange(expert.id, event.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200"
                >
                  {[5, 4, 3, 2, 1].map((score) => (
                    <option key={score} value={score}>
                      {score} — {score === 5 ? "Excellent" : score === 4 ? "Great" : score === 3 ? "Okay" : score === 2 ? "Fair" : "Poor"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
        <h2 className="text-lg font-semibold text-primary">Share feedback</h2>
        <textarea
          rows={4}
          value={feedback}
          onChange={(event) => handleFeedbackChange(event.target.value)}
          placeholder="What worked well? Where can we improve the consultation experience?"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-gray-600">
            {feedbackSubmitted ? "Feedback received. Thank you!" : "Submit feedback to help AdventIQ improve future engagements."}
          </div>
          <button
            onClick={handleFeedbackSubmit}
            className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm"
          >
            {feedbackSubmitted ? "Update feedback" : "Submit feedback"}
          </button>
        </div>
      </section>

      <section className="mt-6 bg-white border border-gray-200 rounded-2xl p-5">
        <h2 className="text-lg font-semibold text-primary">Next steps</h2>
        <ul className="mt-3 space-y-2 list-disc list-inside text-sm text-gray-600">
          <li>Schedule a follow-up consultation if additional implementation support is required.</li>
          <li>Share the invoice and report internally with procurement and engineering stakeholders.</li>
          <li>Invite colleagues to rate the consultation to enhance AdventIQ recommendations.</li>
        </ul>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/dashboard/consultation/browse")}
            className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm"
          >
            Rebook experts
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 text-sm"
          >
            Finish and return to dashboard
          </button>
        </div>
      </section>
    </div>
  );
}
