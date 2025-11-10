// src/pages/ConsultationDetails.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryCard from "../components/SummaryCard.jsx";

const SECTORS = [
  "Automotive",
  "Aerospace",
  "Biotech",
  "Chemicals",
  "Consumer Goods",
  "Energy",
  "Industrial Manufacturing",
  "Pharmaceuticals",
  "Technology",
  "Other",
];

const PROBLEM_AREAS = [
  "Quality / Production",
  "Research & Development",
  "Supply Chain",
  "Sustainability",
  "Operations",
  "Regulatory",
  "Commercial",
];

const LEADER_RATE = 180;

function parseTeamFromStorage() {
  try {
    const raw = sessionStorage.getItem("consultation_team");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((member) => member && member.name)
      .map((member) => ({
        ...member,
        hourlyRate: Number.isFinite(member.hourlyRate)
          ? member.hourlyRate
          : Number(member.hourlyRate) || 0,
        hours: Number.isFinite(member.hours)
          ? Math.min(Math.max(member.hours, 0.5), 2)
          : 1,
        manualHours:
          typeof member.manualHours === "boolean"
            ? member.manualHours
            : Number.isFinite(member.hours) && member.hours !== 1,
      }));
  } catch (error) {
    console.warn("Unable to parse stored consultation team", error);
    return [];
  }
}

function parseQuestionnairePrefill() {
  try {
    const raw = sessionStorage.getItem("consultation_questionnaire");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch (error) {
    console.warn("Unable to parse questionnaire prefill", error);
    return null;
  }
}

function parseAttachments() {
  try {
    const raw = sessionStorage.getItem("consultation_attachments");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("Unable to parse stored attachments", error);
    return [];
  }
}

export default function ConsultationDetails() {
  const navigate = useNavigate();

  const storedProjectDescription = useMemo(
    () => sessionStorage.getItem("consultation_projectDescription") || "",
    []
  );

  const questionnairePrefill = useMemo(() => parseQuestionnairePrefill(), []);

  const initialTeam = useMemo(() => parseTeamFromStorage(), []);
  const [team, setTeam] = useState(initialTeam);
  const [topic, setTopic] = useState(() => sessionStorage.getItem("consultation_topic") || "");
  const [sector, setSector] = useState(
    () => sessionStorage.getItem("consultation_sector") || questionnairePrefill?.field || ""
  );
  const [problemArea, setProblemArea] = useState(
    () => sessionStorage.getItem("consultation_problemArea") || ""
  );
  const [expectations, setExpectations] = useState(() => {
    const stored = sessionStorage.getItem("consultation_expectations");
    if (stored) return stored;
    if (questionnairePrefill?.goal) return questionnairePrefill.goal;
    if (storedProjectDescription) return storedProjectDescription;
    return "";
  });
  const [duration, setDuration] = useState(() => {
    const stored = parseFloat(sessionStorage.getItem("consultation_duration"));
    if (Number.isFinite(stored)) {
      return Math.min(Math.max(stored, 0.5), 2);
    }
    if (initialTeam.length) {
      const maxHours = Math.max(
        ...initialTeam.map((member) => (Number.isFinite(member.hours) ? member.hours : 0))
      );
      if (Number.isFinite(maxHours) && maxHours > 0) {
        return Math.min(Math.max(maxHours, 0.5), 2);
      }
    }
    return 1;
  });
  const [date, setDate] = useState(() => sessionStorage.getItem("consultation_date") || "");
  const [time, setTime] = useState(() => sessionStorage.getItem("consultation_time") || "");
  const [includeLeader, setIncludeLeader] = useState(
    () => sessionStorage.getItem("consultation_leader") === "true"
  );
  const [attachments, setAttachments] = useState(() => parseAttachments());
  const [saveState, setSaveState] = useState("idle");

  useEffect(() => {
    setTeam((prev) =>
      prev.map((member) =>
        member.manualHours
          ? member
          : { ...member, hours: Math.max(0.5, Math.min(2, duration)) }
      )
    );
  }, [duration]);

  const hoursRange = { min: 0.5, max: 2, step: 0.5 };

  const totalHourly = team.reduce((sum, member) => sum + (member.hourlyRate || 0), 0);

  const sessionCost = Math.max(duration, hoursRange.min) * totalHourly;
  const leaderCost = includeLeader ? Math.max(duration, hoursRange.min) * LEADER_RATE : 0;
  const grandTotal = sessionCost + leaderCost;

  const updateMemberHours = (id, hours) => {
    const normalized = Number.isFinite(hours)
      ? Math.min(Math.max(hours, hoursRange.min), hoursRange.max)
      : hoursRange.min;
    setTeam((prev) =>
      prev.map((member) =>
        member.id === id
          ? {
              ...member,
              hours: normalized,
              manualHours: true,
            }
          : member
      )
    );
  };

  const removeManualFlag = (id) => {
    setTeam((prev) =>
      prev.map((member) =>
        member.id === id
          ? {
              ...member,
              manualHours: false,
              hours: Math.max(0.5, Math.min(2, duration)),
            }
          : member
      )
    );
  };

  const onAttachFiles = (event) => {
    const files = Array.from(event.target.files || []).map((file) => ({
      name: file.name,
      size: file.size,
    }));
    if (!files.length) return;
    setAttachments((prev) => {
      const merged = [...prev];
      files.forEach((file) => {
        if (!merged.some((item) => item.name === file.name && item.size === file.size)) {
          merged.push(file);
        }
      });
      return merged;
    });
    event.target.value = "";
  };

  const removeAttachment = (name) => {
    setAttachments((prev) => prev.filter((item) => item.name !== name));
  };

  useEffect(() => {
    try {
      sessionStorage.setItem("consultation_projectDescription", expectations || "");
    } catch (error) {
      console.warn("Unable to sync project description", error);
    }
  }, [expectations, storedProjectDescription]);

  const persistState = () => {
    try {
      sessionStorage.setItem(
        "consultation_team",
        JSON.stringify(
          team.map((member) => ({
            ...member,
            manualHours: member.manualHours,
          }))
        )
      );
      sessionStorage.setItem("consultation_topic", topic);
      sessionStorage.setItem("consultation_sector", sector);
      sessionStorage.setItem("consultation_problemArea", problemArea);
      sessionStorage.setItem("consultation_expectations", expectations);
      sessionStorage.setItem("consultation_duration", String(duration));
      sessionStorage.setItem("consultation_date", date);
      sessionStorage.setItem("consultation_time", time);
      sessionStorage.setItem("consultation_leader", includeLeader ? "true" : "false");
      sessionStorage.setItem("consultation_attachments", JSON.stringify(attachments));
      sessionStorage.setItem("consultation_projectDescription", expectations || "");
      sessionStorage.setItem("consultation_estimatedTotal", String(grandTotal));
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 3000);
      return true;
    } catch (error) {
      console.error("Unable to persist consultation details", error);
      setSaveState("error");
      return false;
    }
  };

  const resetTeamHours = () => {
    setTeam((prev) =>
      prev.map((member) => ({
        ...member,
        manualHours: false,
        hours: Math.max(0.5, Math.min(2, duration)),
      }))
    );
  };

  const canSubmit = Boolean(
    team.length &&
      topic.trim() &&
      sector &&
      problemArea &&
      date &&
      time &&
      Math.max(duration, hoursRange.min) <= hoursRange.max
  );

  const continueToConfirmation = () => {
    if (!persistState()) return;
    if (!team.length) {
      navigate("/dashboard/consultation/browse");
      return;
    }
    const primary = team[0];
    if (primary?.id) {
      sessionStorage.setItem("booking_expertId", String(primary.id));
    }
    sessionStorage.setItem("booking_date", date);
    sessionStorage.setItem("booking_time", time);
    sessionStorage.setItem("booking_tier", includeLeader ? "premium" : "standard");
    navigate("/booking/review");
  };

  if (!team.length) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Add experts to begin</h1>
        <p className="text-gray-600 mt-2">
          Start in the expert catalogue to build your consultation team before filling in the detailed brief.
        </p>
        <div className="mt-4">
          <button
            type="button"
            className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
            onClick={() => navigate("/dashboard/consultation/browse")}
          >
            Go to expert catalogue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-sm text-gray-500 mb-2">Dashboard / Consultation / Details</div>
      <h1 className="text-2xl md:text-3xl font-bold text-primary">Consultation details &amp; budget</h1>
      <p className="text-gray-600 mt-2 max-w-3xl">
        Share the essentials of your challenge, attach supporting material, and confirm the projected spend before sending the
        request to experts.
      </p>

      {saveState === "saved" && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          Details saved. You can return to this page anytime from the catalogue.
        </div>
      )}

      {saveState === "error" && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          We couldn’t save the latest changes. Please try again.
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] items-start">
        <div className="space-y-6">
          <section className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
            <div>
              <h2 className="font-semibold text-primary text-lg">Brief</h2>
              <p className="text-sm text-gray-500">Required for experts to understand the scope.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Topic *</label>
              <input
                type="text"
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="e.g. Aluminium backrest fatigue in car seat"
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Client sector *</label>
                <select
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                  value={sector}
                  onChange={(event) => setSector(event.target.value)}
                >
                  <option value="">Select sector</option>
                  {SECTORS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Problem area *</label>
                <select
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                  value={problemArea}
                  onChange={(event) => setProblemArea(event.target.value)}
                >
                  <option value="">Select area</option>
                  {PROBLEM_AREAS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Project summary / expectations</label>
              {storedProjectDescription && (
                <p className="mt-1 text-xs text-gray-500">
                  Prefilled with the description you added in the catalogue. Update it here if anything changed — edits stay
                  synced for your experts.
                </p>
              )}
              <textarea
                className="mt-2 w-full min-h-[120px] border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Outline desired outcomes, success criteria, or known constraints…"
                value={expectations}
                onChange={(event) => setExpectations(event.target.value)}
              />
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
            <div>
              <h2 className="font-semibold text-primary text-lg">Scheduling</h2>
              <p className="text-sm text-gray-500">Pick a slot and define the consultation duration.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700">Date *</label>
                <input
                  type="date"
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700">Start time *</label>
                <input
                  type="time"
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700">Duration (hours)</label>
                <input
                  type="number"
                  step={hoursRange.step}
                  min={hoursRange.min}
                  max={hoursRange.max}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                  value={duration}
                onChange={(event) => {
                  const raw = parseFloat(event.target.value);
                  const normalized = Number.isFinite(raw)
                    ? Math.min(Math.max(raw, hoursRange.min), hoursRange.max)
                    : hoursRange.min;
                  setDuration(normalized);
                }}
                />
                <p className="text-xs text-gray-500 mt-1">Min 30 min · Max 2 h</p>
              </div>
            </div>

            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                className="rounded border-gray-300"
                checked={includeLeader}
                onChange={(event) => setIncludeLeader(event.target.checked)}
              />
              Add AdventIQ Leader (moderation & coordination)
            </label>
          </section>

          <section className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold text-primary text-lg">Team &amp; workload</h2>
                <p className="text-sm text-gray-500">Adjust expected hours for each expert if preparation goes beyond the live session.</p>
              </div>
              <button
                type="button"
                className="text-sm text-primary hover:underline"
                onClick={resetTeamHours}
              >
                Sync with duration
              </button>
            </div>

            <div className="space-y-4">
              {team.map((member) => (
                <div
                  key={member.id || member.name}
                  className="rounded-xl border border-gray-200 px-4 py-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <div className="font-medium text-gray-800">{member.name}</div>
                    <div className="text-xs text-gray-500">
                      {member.tags?.length ? member.tags.join(" · ") : "No tags listed"}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">€{member.hourlyRate}/h</div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <label className="text-xs text-gray-500 uppercase tracking-wide">Hours</label>
                    <input
                      type="number"
                      min={hoursRange.min}
                      max={hoursRange.max}
                      step={hoursRange.step}
                      className="w-24 border border-gray-300 rounded-lg px-3 py-1.5"
                      value={member.hours}
                      onChange={(event) => updateMemberHours(member.id, parseFloat(event.target.value) || hoursRange.min)}
                    />
                    {member.manualHours && (
                      <button
                        type="button"
                        className="text-xs text-primary hover:underline"
                        onClick={() => removeManualFlag(member.id)}
                      >
                        Link to duration
                      </button>
                    )}
                    <div className="text-sm font-medium text-gray-800">
                      €{((member.hourlyRate || 0) * (member.hours || duration)).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
            <div>
              <h2 className="font-semibold text-primary text-lg">Attachments (optional)</h2>
              <p className="text-sm text-gray-500">Upload supporting material such as drawings, reports, or datasets.</p>
            </div>

            <input type="file" multiple onChange={onAttachFiles} className="text-sm" />

            {attachments.length > 0 && (
              <ul className="space-y-2 text-sm">
                {attachments.map((file) => (
                  <li
                    key={file.name}
                    className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2"
                  >
                    <div>
                      <div className="font-medium text-gray-800">{file.name}</div>
                      {file.size ? (
                        <div className="text-xs text-gray-500">{Math.round(file.size / 1024)} KB</div>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      className="text-xs text-red-600 hover:underline"
                      onClick={() => removeAttachment(file.name)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <aside className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6 h-max sticky top-4">
          <div>
            <h2 className="font-semibold text-primary text-lg">Budget summary</h2>
            <p className="text-sm text-gray-500">Updated automatically based on duration and team.</p>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-center justify-between">
              <span>Session length</span>
              <span className="font-medium">{Math.max(duration, hoursRange.min).toFixed(1)} h</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Expert hourly total</span>
              <span className="font-medium">€{totalHourly.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Live session subtotal</span>
              <span className="font-medium">€{sessionCost.toFixed(2)}</span>
            </div>
            {includeLeader && (
              <div className="flex items-center justify-between text-[#0A2540]">
                <span>AdventIQ Leader</span>
                <span className="font-medium">€{leaderCost.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-gray-100 pt-3 flex items-center justify-between text-base font-semibold text-primary">
              <span>Estimated total</span>
              <span>€{grandTotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-500">
              Totals include only confirmed live time. Preparation hours entered above are stored for the expert quote.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-primary text-sm uppercase tracking-wide">Primary expert</h3>
            <SummaryCard
              expert={team[0]}
              dateTime={date && time ? `${date} · ${time}` : ""}
              tier={includeLeader ? "premium" : "standard"}
            />
          </div>

          <div className="space-y-2">
            <button
              type="button"
              className="w-full rounded-xl bg-primary text-white px-3 py-2 font-medium hover:opacity-90 disabled:opacity-60"
              onClick={continueToConfirmation}
              disabled={!canSubmit}
            >
              Save &amp; continue to confirmation
            </button>
            <button
              type="button"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
              onClick={persistState}
            >
              Save draft
            </button>
            <button
              type="button"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
              onClick={() => navigate("/dashboard/consultation/browse")}
            >
              Back to catalogue
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
