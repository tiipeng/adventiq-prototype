// src/pages/ExpertCatalog.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpertCard from "../components/ExpertCard.jsx";
import Modal from "../components/Modal.jsx";
import FilterBar from "../components/FilterBar.jsx";
import { experts as expertsDataFile } from "../data/mockData.js";

// Utility to format price if you later switch to numeric hourlyRate
const fmtCurrency = (val, currency = "EUR") => {
  if (typeof val === "number") {
    return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(val);
  }
  return val || "—";
};

// --- Right-side Team Panel (inline component for simplicity) ---
function TeamPanel({
  team,
  setTeam,
  projectDescription,
  setProjectDescription,
  onSyncCalendars,
  currency = "EUR",
}) {
  // Try to parse numeric hourly price if price is a string like "€250/h"
  const parseHourly = (member) => {
    if (typeof member.hourlyRate === "number") return member.hourlyRate;
    if (typeof member.price === "string") {
      const m = member.price.match(/(\d+(\.\d+)?)/);
      return m ? parseFloat(m[1]) : 0;
    }
    return 0;
  };

  const total = useMemo(
    () =>
      team.reduce((sum, m) => {
        const hours = isNaN(m.hours) || m.hours <= 0 ? 0 : m.hours;
        return sum + hours * parseHourly(m);
      }, 0),
    [team]
  );

  const updateHours = (id, hours) =>
    setTeam((prev) => prev.map((m) => (m.id === id ? { ...m, hours } : m)));

  const removeMember = (id) => setTeam((prev) => prev.filter((m) => m.id !== id));

  return (
    <aside className="w-full lg:w-96 shrink-0 bg-white rounded-2xl border border-gray-200 p-5 shadow-sm h-max sticky top-4">
      <h3 className="font-semibold text-primary text-lg">Your team</h3>
      <p className="text-xs text-gray-500 mt-1">Add experts, set hours, and review total cost.</p>

      {/* Team list */}
      <div className="mt-4 space-y-3">
        {team.length === 0 && <div className="text-sm text-gray-500">No experts added yet.</div>}
        {team.map((m) => (
          <div
            key={m.id}
            className="border border-gray-200 rounded-xl p-3 flex items-center justify-between gap-3"
          >
            <div>
              <div className="font-medium text-gray-800">{m.name}</div>
              <div className="text-xs text-gray-500">
                {fmtCurrency(parseHourly(m), currency)}/h
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
                title="Remove"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cost summary */}
      <div className="mt-4 border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Estimated total</span>
          <span className="font-semibold">{fmtCurrency(total, currency)}</span>
        </div>
      </div>

      {/* Project description */}
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

      {/* Actions */}
      <div className="mt-4 space-y-2">
        <button
          className="w-full rounded-xl px-3 py-2 border border-gray-300 text-gray-800 hover:bg-gray-50"
          onClick={onSyncCalendars}
          type="button"
          title="Placeholder – will be wired later"
        >
          Synchronize calendars (placeholder)
        </button>

        <button
          className="w-full rounded-xl px-3 py-2 bg-primary text-white hover:opacity-90 disabled:opacity-50"
          disabled={team.length === 0 || projectDescription.trim().length === 0}
          type="button"
          onClick={() => {
            alert(
              "Submitted!\n\nTeam:\n" +
                team.map((m) => `• ${m.name} – ${m.hours || 0}h`).join("\n") +
                `\n\nProject:\n${projectDescription}`
            );
          }}
        >
          Continue
        </button>

        <p className="text-[11px] text-gray-500">
          “Synchronize calendars” is a placeholder. Later we’ll integrate availability and generate
          a Teams/Meet link based on overlaps.
        </p>
      </div>
    </aside>
  );
}

export default function ExpertCatalog() {
  const navigate = useNavigate();

  // Use imported mock or fallback
  const experts = useMemo(() => {
    return Array.isArray(expertsDataFile) && expertsDataFile.length
      ? expertsDataFile
      : [
          {
            id: 1,
            name: "Dr. Jane Bauer",
            tags: ["AI", "Manufacturing"],
            price: "€250/h",
            rating: 4.8,
            location: "Berlin, DE",
            availability: ["Mon AM", "Tue PM"],
            bio: "AI for industrial optimization.",
            // languages: ["EN", "DE"], // <- add to your mockData to enable language filter
          },
          {
            id: 2,
            name: "Prof. Alan Smith",
            tags: ["Materials", "Energy"],
            price: "€220/h",
            rating: 4.6,
            location: "Zürich, CH",
            availability: ["Wed AM", "Thu PM"],
            bio: "Battery materials specialist.",
            // languages: ["EN"], // <- add to your mockData to enable language filter
          },
        ];
  }, []);

  // Existing FilterBar state
  const [filterState, setFilterState] = useState({
    q: "",
    tags: [],
    location: "Any",
    price: "Any",
  });

  // New filters: min rating + language
  const [minRating, setMinRating] = useState("");
  const [language, setLanguage] = useState("");

  // Modal state
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  // Team state + project description
  const [team, setTeam] = useState([]);
  const [projectDescription, setProjectDescription] = useState("");

  // Actions for Modal
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

  // Add to team (no duplicates)
  const onAddToTeam = (exp) => {
    if (!exp) return;
    setTeam((prev) => {
      if (prev.some((m) => m.id === exp.id)) return prev;
      return [...prev, { ...exp, hours: 1 }];
    });
  };

  // Optional simple filter + new rating/language filters
  const filtered = useMemo(() => {
    const q = (filterState.q || "").toLowerCase();

    return experts.filter((e) => {
      const hay = `${e.name || ""} ${e.location || ""} ${(e.tags || []).join(" ")} ${(e.bio || "")}`.toLowerCase();
      const matchesQuery = hay.includes(q);

      const matchesRating =
        !minRating || (typeof e.rating === "number" && e.rating >= parseFloat(minRating));

      const matchesLanguage =
        !language ||
        (Array.isArray(e.languages) && e.languages.includes(language));

      return matchesQuery && matchesRating && matchesLanguage;
    });
  }, [experts, filterState.q, minRating, language]);

  const onSyncCalendars = () => {
    alert(
      "Calendar sync is a placeholder.\n\nFuture flow:\n• Collect availability from each expert\n• Compute overlaps\n• Propose options and create a Teams/Meet link"
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-sm text-gray-500 mb-2">Dashboard / Consultation</div>
      <h1 className="text-2xl md:text-3xl font-bold text-primary">Browse Experts</h1>
      <p className="text-gray-600 mt-2">
        Explore our catalogue. Filters are visual only (prototype).
      </p>

      {/* Top controls */}
      <div className="mt-5 flex flex-col gap-3">
        {/* Existing FilterBar (kept) */}
        <FilterBar onChange={setFilterState} />

        {/* New: rating + language filters */}
        <div className="flex flex-wrap items-center gap-2">
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
      </div>

      {/* Main content: list + team panel */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        {/* Experts list */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((e) => (
            <div key={e.id || e.name} className="space-y-2">
              {/* Keep your existing ExpertCard with onView/onSelect */}
              <ExpertCard expert={e} onView={onView} onSelect={onSelect} />

              {/* Short bio snippet under each person */}
              {e.bio && (
                <p className="text-xs text-gray-600 line-clamp-2">
                  {e.bio}
                </p>
              )}

              {/* Add to team button */}
              <div className="flex">
                <button
                  className="ml-auto rounded-xl px-3 py-2 bg-primary text-white hover:opacity-90"
                  type="button"
                  onClick={() => onAddToTeam(e)}
                  title="Add expert to team"
                >
                  Add to team
                </button>
              </div>
            </div>
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
          onSyncCalendars={onSyncCalendars}
        />
      </div>

      {/* Modal with more info (kept) */}
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
              <div className="font-medium">{active?.price || "€250/h"}</div>
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
          {/* Optionally show languages if present */}
          {Array.isArray(active?.languages) && active.languages.length > 0 && (
            <div className="mt-3 text-xs text-gray-600">
              <span className="text-gray-500">Languages: </span>
              {active.languages.join(" / ")}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
