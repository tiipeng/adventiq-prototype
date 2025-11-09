import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  if (!remaining) {
    return `${hours}h`;
  }
  return `${hours}h ${remaining}m`;
}

export default function ReportReview() {
  const navigate = useNavigate();
  const sessionSummary = useMemo(() => {
    try {
      const stored = sessionStorage.getItem("session_summary");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error("Unable to parse session summary", error);
    }
    return {};
  }, []);

  const [status, setStatus] = useState(() => sessionStorage.getItem("report_review_status") || "awaiting");
  const [clarificationCount, setClarificationCount] = useState(() => {
    const stored = sessionStorage.getItem("report_review_clarifications");
    return stored ? Number(stored) : 0;
  });
  const defaultDeadline = useMemo(() => {
    const stored = sessionStorage.getItem("report_review_deadline");
    if (stored) return new Date(stored);
    const due = new Date();
    due.setHours(due.getHours() + 36);
    sessionStorage.setItem("report_review_deadline", due.toISOString());
    return due;
  }, []);
  const [now, setNow] = useState(Date.now());
  const [issueType, setIssueType] = useState("quality");
  const [issueDetails, setIssueDetails] = useState(() => sessionStorage.getItem("report_review_issueDetails") || "");
  const [issueSubmitted, setIssueSubmitted] = useState(() => sessionStorage.getItem("report_review_issueSubmitted") === "true");
  const [activity, setActivity] = useState(() => {
    try {
      const stored = sessionStorage.getItem("report_review_activity");
      if (stored) return JSON.parse(stored);
    } catch (error) {
      console.error("Unable to parse review activity", error);
    }
    return [
      {
        id: "act-0",
        time: "Report uploaded",
        description: "Experts delivered the consultation summary and supporting attachments.",
      },
      {
        id: "act-1",
        time: "Auto-approval window",
        description: "You have 36 hours to approve or flag issues before the system auto-approves.",
      },
    ];
  });

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("report_review_status", status);
  }, [status]);
  useEffect(() => {
    sessionStorage.setItem("report_review_issueDetails", issueDetails);
  }, [issueDetails]);
  useEffect(() => {
    sessionStorage.setItem("report_review_issueSubmitted", issueSubmitted ? "true" : "false");
  }, [issueSubmitted]);
  useEffect(() => {
    sessionStorage.setItem("report_review_activity", JSON.stringify(activity));
  }, [activity]);
  useEffect(() => {
    sessionStorage.setItem("report_review_clarifications", String(clarificationCount));
  }, [clarificationCount]);

  const remaining = Math.max(0, defaultDeadline.getTime() - now);
  const autoApproved = remaining === 0 && status === "awaiting";

  useEffect(() => {
    if (autoApproved) {
      setStatus("approved");
      setActivity((prev) => [
        {
          id: `act-${prev.length + 1}`,
          time: new Date().toLocaleString(),
          description: "System auto-approved the report after 36 hours with no objections.",
        },
        ...prev,
      ]);
    }
  }, [autoApproved]);

  const hoursLeft = Math.floor(remaining / (1000 * 60 * 60));
  const minutesLeft = Math.floor((remaining / (1000 * 60)) % 60);
  const secondsLeft = Math.floor((remaining / 1000) % 60);

  const handleApprove = () => {
    setStatus("approved");
    const entry = {
      id: `act-${activity.length + 1}`,
      time: new Date().toLocaleString(),
      description: "Client approved the consultation report.",
    };
    setActivity((prev) => [entry, ...prev]);
  };

  const handleSubmitIssue = () => {
    if (!issueDetails.trim()) {
      return;
    }
    setStatus("flagged");
    setIssueSubmitted(true);
    const entry = {
      id: `act-${activity.length + 1}`,
      time: new Date().toLocaleString(),
      description: `Client flagged a ${issueType} issue for the expert team.`,
    };
    setActivity((prev) => [entry, ...prev]);
  };

  const handleClarification = () => {
    setClarificationCount((prev) => prev + 1);
    const entry = {
      id: `act-${activity.length + 1}`,
      time: new Date().toLocaleString(),
      description: "Client requested clarification while keeping the report in review.",
    };
    setActivity((prev) => [entry, ...prev]);
  };

  const expertNames = (sessionSummary?.experts || []).map((expert) => expert.name).join(" & ");

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">Report review</p>
          <h1 className="text-2xl font-bold text-primary">Consultation summary — Seat durability triage</h1>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
        >
          Back to dashboard
        </button>
      </div>

      <section className="mt-6 bg-white border border-gray-200 rounded-2xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-primary">Executive summary</h2>
            <p className="text-sm text-gray-600">
              {expertNames || "AdventIQ experts"} delivered their findings. Review the recommendations and approve or flag
              issues within 36 hours.
            </p>
          </div>
          <div className="text-right">
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                status === "approved"
                  ? "bg-green-100 text-green-700"
                  : status === "flagged"
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {status === "awaiting" && "Awaiting client action"}
              {status === "approved" && "Approved"}
              {status === "flagged" && "Problem solving loop"}
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Auto-approve in {String(hoursLeft).padStart(2, "0")}:{String(minutesLeft).padStart(2, "0")}:{
                String(secondsLeft).padStart(2, "0")
              }
            </div>
          </div>
        </div>

        <div className="mt-4 grid md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="border border-gray-200 rounded-xl p-3">
            <div className="text-xs uppercase text-gray-400">Report due date</div>
            <div className="font-medium text-primary">{sessionSummary?.reportDueDate || "Pending"}</div>
          </div>
          <div className="border border-gray-200 rounded-xl p-3">
            <div className="text-xs uppercase text-gray-400">Session duration</div>
            <div className="font-medium text-primary">{formatDuration(sessionSummary?.totalMinutes || 60)}</div>
          </div>
          <div className="border border-gray-200 rounded-xl p-3">
            <div className="text-xs uppercase text-gray-400">Projected invoice</div>
            <div className="font-medium text-primary">{formatCurrency(sessionSummary?.totalCost || 450)}</div>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-xl p-4">
            <h3 className="font-medium text-primary">Key recommendations</h3>
            <ul className="mt-3 space-y-2 list-disc list-inside text-sm text-gray-600">
              <li>Introduce a new aluminium alloy bracket to prevent fatigue fractures after 40k cycles.</li>
              <li>Deploy targeted QA audits on supplier lots flagged by predictive analytics.</li>
              <li>Stage a 3-week validation sprint with AdventIQ Labs to replicate seat stress scenarios.</li>
            </ul>
          </div>
          <div className="border border-gray-200 rounded-xl p-4">
            <h3 className="font-medium text-primary">Attachments</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li className="flex items-center justify-between">
                <span>Session recording & transcript.zip</span>
                <span className="text-xs text-gray-400">Download after approval</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Stress test data appendix.xlsx</span>
                <button className="text-xs text-primary">Preview</button>
              </li>
              <li className="flex items-center justify-between">
                <span>Moderator notes (if applicable)</span>
                <span className="text-xs text-gray-400">Shared post-payment</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={handleApprove}
            disabled={status === "approved"}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              status === "approved" ? "bg-gray-100 text-gray-400" : "bg-primary text-white hover:bg-primary/90"
            }`}
          >
            Approve report
          </button>
          <button
            onClick={handleClarification}
            className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm"
          >
            Request clarification ({clarificationCount})
          </button>
          <button
            onClick={() => setIssueSubmitted(false)}
            className="px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-sm"
          >
            Report a problem
          </button>
        </div>

        {(status === "flagged" || !issueSubmitted) && (
          <div className="mt-5 border border-red-200 bg-red-50 rounded-xl p-4 space-y-3">
            <h3 className="font-medium text-red-700">Problem solving loop</h3>
            <p className="text-sm text-red-700">
              Outline what went wrong so the experts can adjust the deliverable. AdventIQ will keep everyone notified
              until the issue is resolved.
            </p>
            <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
              <label className="space-y-1">
                <span className="text-xs uppercase text-gray-500">Issue category</span>
                <select
                  value={issueType}
                  onChange={(event) => setIssueType(event.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200"
                >
                  <option value="quality">Quality concern</option>
                  <option value="scope">Scope mismatch</option>
                  <option value="timing">Timeline issue</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label className="space-y-1">
                <span className="text-xs uppercase text-gray-500">Blocking severity</span>
                <select className="w-full px-3 py-2 rounded-lg border border-gray-200">
                  <option>Critical — deliverable unusable</option>
                  <option>Major — needs rework</option>
                  <option>Minor — clarification only</option>
                </select>
              </label>
            </div>
            <textarea
              rows={4}
              value={issueDetails}
              onChange={(event) => setIssueDetails(event.target.value)}
              placeholder="Describe the gap, expectations, or supporting evidence..."
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-gray-600">
                Experts and AdventIQ Ops receive real-time notifications until you mark the issue resolved.
              </div>
              <button
                onClick={handleSubmitIssue}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 text-sm"
              >
                Submit issue
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="mt-6 bg-white border border-gray-200 rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-primary">Activity timeline</h2>
          <span className="text-xs text-gray-500">Newest first</span>
        </div>
        <ul className="mt-4 space-y-3">
          {activity.map((entry) => (
            <li key={entry.id} className="border border-gray-200 rounded-xl px-4 py-3 bg-gray-50">
              <div className="text-xs uppercase tracking-wide text-gray-500">{entry.time}</div>
              <p className="text-sm text-gray-700 mt-1">{entry.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-6 flex flex-wrap gap-3 justify-end">
        <button
          onClick={() => navigate("/dashboard/session/completion")}
          className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm"
        >
          Proceed to completion
        </button>
        <button
          onClick={() => navigate("/dashboard/session/live")}
          className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 text-sm"
        >
          Return to session room
        </button>
      </div>
    </div>
  );
}
