// src/pages/ExpertFlow.jsx
import React from "react";
import { Link } from "react-router-dom";

const FLOW_STEPS = [
  {
    id: "profile-setup",
    emoji: "1️⃣",
    accent: "from-amber-50 to-white border-amber-200",
    title: "Expert profile setup",
    summary:
      "Before any consultation request reaches you, AdventIQ requires a complete expert workspace so clients know what to expect.",
    details: [
      "Complete your profile with skills, specialties, hourly rate, and availability windows.",
      "Optionally mark yourself as a Premium Expert so premium-tier clients can invite you as a meeting moderator.",
      "Connect a calendar to keep your availability synchronised with calendar holds and session reminders.",
    ],
  },
  {
    id: "request-received",
    emoji: "🟡",
    accent: "from-yellow-50 to-white border-yellow-200",
    title: "Receiving a consultation request",
    summary:
      "When a client nominates you for a consultation, notifications and temporary holds keep the slot reserved while you decide.",
    details: [
      "All selected experts receive a notification with the request summary.",
      (
        <div key="hold">
          <div>Availability slot is temporarily blocked and shown as “pending request” to others:</div>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-600">
            <li>Up to 36 hours for experts likely to accept.</li>
            <li>24 hours if no response.</li>
            <li>Less than 24 hours when declined immediately.</li>
          </ul>
        </div>
      ),
      "Clients and other prospects see the slot as unavailable while the hold is active.",
    ],
  },
  {
    id: "request-review",
    emoji: "🟣",
    accent: "from-purple-50 to-white border-purple-200",
    title: "Reviewing the consultation request",
    summary: "Use the dashboard request card to inspect every aspect before committing.",
    details: [
      "View topic, client sector, problem area, timing, duration, and how many experts are invited.",
      "See if an AdventIQ Leader or meeting moderator is already assigned, plus any client attachments.",
      "Compensation defaults to the hourly rate but reflects custom arrangements when provided.",
      (
        <div key="decision-window">
          <div>Possible responses:</div>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-600">
            <li>Accept the request.</li>
            <li>Decline the engagement.</li>
            <li>Ignore – the platform auto-expires it after 24 hours.</li>
          </ul>
        </div>
      ),
    ],
  },
  {
    id: "decision-outcome",
    emoji: "🔵",
    accent: "from-sky-50 to-white border-sky-200",
    title: "Decision outcomes",
    summary: "Each decision instantly updates availability and client visibility.",
    details: [
      "Acceptance keeps the slot locked for the meeting and the client sees your acceptance in real time.",
      "Declining releases the slot and it becomes visible again for new requests.",
      "No response within 24 hours removes you from the request automatically.",
    ],
  },
  {
    id: "client-confirmation",
    emoji: "🟠",
    accent: "from-orange-50 to-white border-orange-200",
    title: "Confirmation phase",
    summary:
      "Once at least one expert accepts, the client confirms the booking and payment to finalise the session.",
    details: [
      "Client confirmation triggers the payment step; funds are held before sessions begin.",
      "On payment confirmation you receive a detailed notification with date, time, and client context.",
      "Calendar entries are created automatically, and any NDA or pre-approved agreements are surfaced for review.",
    ],
  },
  {
    id: "live-session",
    emoji: "⚪",
    accent: "from-gray-50 to-white border-gray-200",
    title: "Consultation session",
    summary:
      "Join the AdventIQ meeting room at the scheduled time and manage real-time adjustments without leaving the workspace.",
    details: [
      "Experts join the session directly from their dashboard link.",
      "If the client extends the session, a pop-up asks every expert to accept or decline additional time; declining ends only that expert’s participation at the original end time.",
      "Clients can tighten the report due date; experts must approve if the deadline is shorter than the default.",
      "When no AdventIQ Leader is present, a Premium expert can be designated as meeting moderator for coordination.",
    ],
  },
  {
    id: "report-prep",
    emoji: "🟣",
    accent: "from-purple-50 to-white border-purple-200",
    title: "After the session – Report preparation",
    summary: "Every engagement ends with a structured report so clients can act on the guidance provided.",
    details: [
      "Mandatory recommendations: analysis, insights, and key takeaways from the conversation.",
      "Optional next steps or service offers, including potential pricing for follow-on work.",
      "Upload the report within the agreed deadline via the platform uploader.",
    ],
  },
  {
    id: "report-review",
    emoji: "🟤",
    accent: "from-stone-50 to-white border-stone-200",
    title: "Report delivery and review",
    summary:
      "Clients are notified immediately and the platform monitors follow-up until everything is resolved.",
    details: [
      "The client receives a \"Your report is ready\" notification as soon as the upload completes.",
      "If there is no feedback within 36 hours, the report is auto-approved for you.",
      "Client issues trigger a feedback loop: you are notified, collaborate on fixes, and resubmit until resolved.",
    ],
  },
  {
    id: "finalisation",
    emoji: "🟢",
    accent: "from-emerald-50 to-white border-emerald-200",
    title: "Finalisation",
    summary:
      "Once the report is approved—explicitly or through the timeout—final payouts and documentation are released.",
    details: [
      "Payment confirmation arrives covering your share of the engagement.",
      "A final invoice summary is generated for your records and accounting.",
    ],
  },
];

export default function ExpertFlow() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div id="top" className="flex flex-col gap-6">
        <header>
          <div className="text-sm uppercase tracking-wide text-primary font-semibold">Expertflow</div>
          <h1 className="mt-2 text-3xl font-bold text-primary">Expert consultation lifecycle</h1>
          <p className="mt-3 text-gray-600 max-w-3xl">
            A detailed walk-through of how AdventIQ guides experts from onboarding to final payment. Share this
            with new experts or keep it handy as a checklist when responding to client consultations.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link
              to="/expert"
              className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 py-2 text-primary hover:bg-primary/20"
            >
              ← Back to expert dashboard
            </Link>
            <a
              href="#report-prep"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Skip to report preparation
            </a>
          </div>
        </header>

        <nav aria-label="Expertflow steps" className="rounded-2xl border border-gray-200 bg-white/70 p-5 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Fast reference</h2>
          <ol className="mt-3 grid gap-3 md:grid-cols-3">
            {FLOW_STEPS.map((step, index) => (
              <li key={step.id}>
                <a
                  href={`#${step.id}`}
                  className="flex h-full flex-col rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm text-gray-700 transition hover:border-primary/50 hover:text-primary"
                >
                  <span className="text-lg">{step.emoji}</span>
                  <span className="mt-2 font-semibold text-gray-900">Step {index + 1}</span>
                  <span className="mt-1 text-xs text-gray-500">{step.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-6">
          {FLOW_STEPS.map((step, index) => (
            <section
              key={step.id}
              id={step.id}
              className={`rounded-3xl border bg-gradient-to-br ${step.accent} p-6 shadow-sm transition hover:shadow-md`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                    Step {index + 1}
                  </div>
                  <h2 className="mt-1 text-2xl font-semibold text-primary">{step.emoji} {step.title}</h2>
                </div>
                <a
                  href="#top"
                  className="hidden rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-500 hover:text-primary md:inline"
                >
                  Back to top
                </a>
              </div>

              <p className="mt-3 text-gray-700">{step.summary}</p>

              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                {step.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary"></span>
                    <div className="leading-relaxed">{detail}</div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
