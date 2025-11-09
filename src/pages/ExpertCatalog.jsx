// src/pages/ExpertCatalog.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpertCard from "../components/ExpertCard.jsx";
import Modal from "../components/Modal.jsx";
import FilterBar from "../components/FilterBar.jsx";
import { experts as expertsDataFile } from "../data/mockData.js";

// Format currency safely
const fmtCurrency = (val, currency = "EUR") =>
  new Intl.NumberFormat(undefined, { style: "currency", currency }).format(val);

// Try to get a numeric hourly rate from various shapes (number, "250", "€250/h")
const getHourly = (exp) => {
  if (typeof exp.hourlyRate === "number") return exp.hourlyRate;
  if (typeof exp.price === "number") return exp.price;
  if (typeof exp.price === "string") {
    const m = exp.price.replace(",", ".").match(/(\d+(\.\d+)?)/);
    if (m) return parseFloat(m[1]);
  }
  return 0;
};

function TeamPanel({ team, setTeam, projectDescription, setProjectDescription, onStartFlow }) {
  const total = useMemo(
    () =>
      team.reduce((sum, m) => {
        const h = Number.isFinite(m.hours) ? m.hours : 0;
        return sum + Math.max(0, h) * getHourly(m);
      }, 0),
    [team]
  );

  const updateHours = (id, hours) =>
    setTeam((prev) => prev.map((m) => (m.id === id ? { ...m, hours } : m)));

  const removeMember = (id) =>
    setTeam((prev) => prev.filter((m) => m.id !== id));

  return (
    <aside className="w-full lg:w-96 shrink-0 bg-white rounded-2xl border border-gray-200 p-5 shadow-sm h-max sticky top-4">
      <h3 className="font-semibold text-primary text-lg">Your team</h3>
      <p className="text-xs text-gray-500 mt-1">
        Add experts, set hours, and review total cost.
      </p>

      <div className="mt-4 space-y-3">
        {team.length === 0 && (
          <div className="text-sm text-gray-500">No experts added yet.</div>
        )}
        {team.map((m) => (
          <div
            key={m.id}
            className="border border-gray-200 rounded-xl p-3 flex items-center justify-between gap-3"
          >
            <div>
              <div className="font-medium text-gray-800">{m.name}</div>
              <div className="text-xs text-gray-500">
                {fmtCurrency(getHourly(m))}/h
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                step={0.5}
                value={m.hours}
                onChange={(e) => updateHours(m.id, parseFloat(e.target.value))}
                className="w-20 border border-gray-300 rounded-md px-2 py-1 text-sm"
                placeholder="Hours"
                title="Estimated hours"
              />
              <button
                className="text-xs text-red-600 hover:underline"
                onClick={() => removeMember(m.id)}
                type="button"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Estimated total</span>
          <span className="font-semibold">{fmtCurrency(total)}</span>
        </div>
      </div>

      {team.length > 0 && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Describe your problem or project
          </label>
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className="mt-1 w-full min-h-[100px] border border-gray-300 rounded-md px-3 py-2 text-sm"
            placeholder="Briefly describe the context, goals, constraints, and timeline…"
          />
          <p className="text-xs text-gray-500 mt-1">
            This helps experts prepare and propose a schedule.
          </p>
        </div>
      )}

      <div className="mt-4 space-y-2">
        <button
          className="w-full rounded-xl px-3 py-2 bg-primary text-white hover:opacity-90 disabled:opacity-50"
          disabled={team.length === 0 || projectDescription.trim().length === 0}
          type="button"
          onClick={() => onStartFlow && onStartFlow({ team, projectDescription })}
        >
          Continue
        </button>

        <p className="text-[11px] text-gray-500">
          Continue to step through calendar sync, pick a slot, confirm payment, and submit the request to your selected experts.
        </p>
      </div>
    </aside>
  );
}

function FlowDialog({
  open,
  step,
  onClose,
  onStepChange,
  team,
  projectDescription,
  onFinish,
}) {
  const clonedTeam = Array.isArray(team) ? team : [];
  const totalHours = clonedTeam.reduce((sum, member) => sum + (Number(member.hours) || 0), 0);
  const totalCost = clonedTeam.reduce(
    (sum, member) => sum + (Number(member.hours) || 0) * getHourly(member),
    0
  );

  const steps = useMemo(() => {
    const teamList = (
      <div className="mt-4">
        <h4 className="font-semibold text-sm text-primary uppercase tracking-wide">Selected experts</h4>
        <div className="mt-2 space-y-2">
          {clonedTeam.map((member) => (
            <div
              key={member.id || member.name}
              className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2 text-sm"
            >
              <div>
                <div className="font-medium text-gray-800">{member.name}</div>
                <div className="text-xs text-gray-500">
                  {fmtCurrency(getHourly(member))}/h · {(Number(member.hours) || 0).toFixed(1)}h
                </div>
              </div>
              <div className="font-medium text-gray-800">
                {fmtCurrency((Number(member.hours) || 0) * getHourly(member))}
              </div>
            </div>
          ))}
          {!clonedTeam.length && (
            <div className="text-sm text-gray-500">No experts were selected.</div>
          )}
        </div>
      </div>
    );

    return [
      {
        title: "Calendar sync request",
        body: (
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              We package your project brief and proposed hours so each expert can review availability. Your note will be sent
              along with the request:
            </p>
            <blockquote className="border-l-4 border-primary/40 bg-primary/5 px-4 py-2 text-gray-600 italic">
              {projectDescription || "(No description provided)"}
            </blockquote>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Availability checks go out instantly to every expert on your list.</li>
              <li>Experts confirm the proposed slot or offer alternatives.</li>
              <li>Once everyone agrees, invites land in all calendars automatically.</li>
            </ol>
            {teamList}
          </div>
        ),
      },
      {
        title: "Reserve consultation slots",
        body: (
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              Choose a slot that works for the whole team. AdventIQ coordinates individual calendar holds so everyone sees the
              same options.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Pick the primary time that suits your project timeline.</li>
              <li>Optional alternates can be suggested for experts that are unavailable.</li>
              <li>A recap email with the selected slot is stored in your dashboard.</li>
            </ul>
            <div className="rounded-xl border border-dashed border-primary/40 bg-primary/5 px-4 py-3 text-sm text-primary">
              Calendar sync keeps all parties aligned—no manual emailing required.
            </div>
          </div>
        ),
      },
      {
        title: "Confirm & mock pay",
        body: (
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              Review the projected spend before committing. In this prototype payment is mocked, but the totals reflect what
              would be authorised.
            </p>
            <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Total hours</span>
                <span className="font-medium text-gray-800">{totalHours.toFixed(1)}h</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                <span>Estimated charge</span>
                <span className="font-semibold text-primary">{fmtCurrency(totalCost)}</span>
              </div>
              <p className="mt-3 text-xs text-gray-500">
                A payment hold would be created now and captured after the session. For the prototype we simply note the total.
              </p>
            </div>
            {teamList}
          </div>
        ),
      },
      {
        title: "Send to experts for approval",
        body: (
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              Great! The request is queued for your experts. They can approve, counter, or decline directly from their AdventIQ
              workspace.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Each expert sees the brief, proposed slot, and payment summary.</li>
              <li>You receive notifications as approvals arrive or if new times are suggested.</li>
              <li>The consultation appears in "Orders" for experts to action.</li>
            </ul>
            <div className="rounded-xl border border-primary/40 bg-primary/5 px-4 py-3 text-sm text-primary">
              Track progress in the expert approval list to see who has responded.
            </div>
          </div>
        ),
      },
    ];
  }, [clonedTeam, projectDescription, totalCost, totalHours]);

  if (!open || !steps.length) return null;

  const safeStep = Math.min(Math.max(step, 0), steps.length - 1);
  const current = steps[safeStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-6 py-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Step {safeStep + 1} of {steps.length}
            </div>
            <h3 className="text-xl font-semibold text-primary">{current.title}</h3>
          </div>
          <button
            type="button"
            className="h-10 w-10 rounded-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
            onClick={onClose}
            aria-label="Close flow"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">{current.body}</div>

        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-4">
          <div className="flex items-center gap-1">
            {steps.map((_, idx) => (
              <span
                key={idx}
                className={`h-2 w-8 rounded-full ${idx <= safeStep ? "bg-primary" : "bg-gray-200"}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onStepChange(Math.max(0, safeStep - 1))}
              className={`px-3 py-1.5 rounded-lg border text-sm ${
                safeStep === 0 ? "border-gray-200 text-gray-300 cursor-not-allowed" : "hover:bg-gray-100"
              }`}
              disabled={safeStep === 0}
            >
              Back
            </button>

            {safeStep === steps.length - 1 ? (
              <button
                type="button"
                className="px-4 py-1.5 rounded-lg bg-primary text-white text-sm hover:opacity-90"
                onClick={onFinish}
              >
                View approval queue
              </button>
            ) : (
              <button
                type="button"
                className="px-4 py-1.5 rounded-lg bg-primary text-white text-sm hover:opacity-90"
                onClick={() => onStepChange(Math.min(steps.length - 1, safeStep + 1))}
              >
                Next step
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExpertCatalog() {
  const navigate = useNavigate();

  const experts = useMemo(() => {
    return Array.isArray(expertsDataFile) && expertsDataFile.length
      ? expertsDataFile
      : [
          {
            id: 1,
            name: "Dr. Jane Doe",
            tags: ["AI", "Manufacturing"],
            price: "€250/h",
            rating: 4.8,
            location: "—",
            availability: ["Mon AM", "Tue PM"],
            bio: "AI for industrial optimization.",
            languages: ["EN", "DE"],
          },
          {
            id: 2,
            name: "Prof. Alan Smith",
            tags: ["Materials", "Energy"],
            price: "220",
            rating: 4.6,
            location: "—",
            availability: ["Wed AM", "Thu PM"],
            bio: "Battery materials specialist.",
            languages: ["EN"],
          },
          {
            id: 3,
            name: "Dr. Linh Nguyen",
            tags: ["Biotech"],
            price: 200,
            rating: 4.7,
            location: "—",
            availability: ["Fri AM"],
            bio: "Cell culture & downstream processing.",
            languages: ["EN", "PL"],
          },
        ];
  }, []);

  // Keep your FilterBar state
  const [filterState, setFilterState] = useState({
    q: "",
    tags: [],
    location: "Any",
    price: "Any",
  });

  // New: extra filters inside FilterBar (lifting state here)
  const [minRating, setMinRating] = useState("");
  const [language, setLanguage] = useState("");

  // Modal
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  // Team + project
  const [team, setTeam] = useState([]);
  const [projectDescription, setProjectDescription] = useState("");

  const [flowOpen, setFlowOpen] = useState(false);
  const [flowStep, setFlowStep] = useState(0);
  const [flowSnapshot, setFlowSnapshot] = useState({ team: [], projectDescription: "" });

  const onView = (exp) => {
    setActive(exp);
    setOpen(true);
  };

  const onSelect = (exp) => {
    if (!exp || exp.id == null) {
      console.warn("Select & Book clicked but expert has no id", exp);
      return;
    }
    sessionStorage.setItem("booking_expertId", String(exp.id));
    navigate(`/booking/${exp.id}`);
  };

  const onAddToTeam = (exp) => {
    if (!exp) return;
    setTeam((prev) => {
      if (prev.some((m) => m.id === exp.id)) return prev;
      return [...prev, { ...exp, hours: 1 }];
    });
  };

  // Filters: add rating/language checks
  const filtered = useMemo(() => {
    const q = (filterState.q || "").toLowerCase();
    return experts.filter((e) => {
      const hay = `${e.name || ""} ${e.location || ""} ${(e.tags || []).join(" ")} ${(e.bio || "")}`.toLowerCase();
      const matchesQ = hay.includes(q);

      const matchesRating =
        !minRating || (typeof e.rating === "number" && e.rating >= parseFloat(minRating));

      const matchesLang =
        !language || (Array.isArray(e.languages) && e.languages.includes(language));

      return matchesQ && matchesRating && matchesLang;
    });
  }, [experts, filterState.q, minRating, language]);

  const startFlow = ({ team: flowTeam = [], projectDescription: desc = "" }) => {
    setFlowSnapshot({
      team: flowTeam.map((member) => ({ ...member })),
      projectDescription: desc,
    });
    setFlowStep(0);
    setFlowOpen(true);
  };

  const closeFlow = () => {
    setFlowOpen(false);
  };

  const finishFlow = () => {
    setFlowOpen(false);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-sm text-gray-500 mb-2">Dashboard / Consultation</div>
      <h1 className="text-2xl md:text-3xl font-bold text-primary">Fast consultation experts</h1>
      <p className="text-gray-600 mt-2 max-w-3xl text-sm md:text-base">
        Compare focus areas, see the headline description, and check ratings in one view. Select an expert to reserve a time slot and trigger the calendar sync request.
      </p>

      {/* FilterBar with extra controls passed in */}
      <div className="mt-5">
        <FilterBar
          onChange={setFilterState}
          extraRightControls={
            <div className="flex items-center gap-2">
              <select
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                title="Minimum rating"
              >
                <option value="">Rating</option>
                <option value="4.0">4.0+</option>
                <option value="4.5">4.5+</option>
                <option value="4.8">4.8+</option>
              </select>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                title="Language"
              >
                <option value="">Language</option>
                <option value="EN">EN</option>
                <option value="DE">DE</option>
                <option value="PL">PL</option>
              </select>
            </div>
          }
        />
      </div>

      {/* Main content */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
        {/* Cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((e) => (
            <ExpertCard
              key={e.id || e.name}
              expert={e}
              onView={onView}
              onSelect={onSelect}
              onAddToTeam={() => onAddToTeam(e)}  // icon button inside card
              hourlyRate={getHourly(e)}
            />
          ))}

          {filtered.length === 0 && (
            <div className="sm:col-span-2 xl:col-span-3 bg-white border border-gray-200 rounded-xl p-6 text-gray-600 text-sm">
              No experts found with current filters. Try resetting your search.
            </div>
          )}
        </div>

        {/* Team panel */}
        <TeamPanel
          team={team}
          setTeam={setTeam}
          projectDescription={projectDescription}
          setProjectDescription={setProjectDescription}
          onStartFlow={startFlow}
        />
      </div>

      {/* Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={active?.name || "Expert"}
        footer={
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg border hover:bg-gray-50" onClick={() => setOpen(false)}>
              Close
            </button>
            <button
              className="px-3 py-1.5 rounded-lg bg-primary text-white"
              onClick={() => {
                setOpen(false);
                onSelect(active);
              }}
            >
              Select &amp; Book
            </button>
          </div>
        }
      >
        <div className="text-sm text-gray-700">
          <p>{active?.bio || "Expert profile preview."}</p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <div className="text-gray-500">Price</div>
              <div className="font-medium">{active?.price ?? "—"}</div>
            </div>
            <div>
              <div className="text-gray-500">Rating</div>
              <div className="font-medium">{active?.rating ?? "—"}</div>
            </div>
            <div>
              <div className="text-gray-500">Location</div>
              <div className="font-medium">{active?.location || "—"}</div>
            </div>
            <div>
              <div className="text-gray-500">Availability</div>
              <div className="font-medium text-xs">
                {(active?.availability || []).join(" · ") || "—"}
              </div>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {(active?.tags || []).map((t) => (
              <span key={t} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs">
                {t}
              </span>
            ))}
          </div>
          {Array.isArray(active?.languages) && active.languages.length > 0 && (
            <div className="mt-3 text-xs text-gray-600">
              <span className="text-gray-500">Languages: </span>
              {active.languages.join(" / ")}
            </div>
          )}
        </div>
      </Modal>

      <FlowDialog
        open={flowOpen}
        step={flowStep}
        onClose={closeFlow}
        onStepChange={setFlowStep}
        team={flowSnapshot.team}
        projectDescription={flowSnapshot.projectDescription}
        onFinish={finishFlow}
      />
    </div>
  );
}
