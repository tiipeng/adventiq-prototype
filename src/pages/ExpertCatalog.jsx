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
          Continue to consultation details
        </button>

        <p className="text-[11px] text-gray-500">
          We’ll carry this summary into the consultation brief so you can review and confirm the request without repeating the
          same details.
        </p>
      </div>
    </aside>
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
    const normalizedTeam = flowTeam.map((member) => ({
      id: member.id,
      name: member.name,
      hourlyRate: getHourly(member),
      tags: member.tags || [],
      location: member.location || "",
      rating: member.rating,
      price: member.price,
      availability: member.availability || [],
      hours: Number.isFinite(member.hours) ? Number(member.hours) : 1,
    }));

    try {
      sessionStorage.setItem("consultation_team", JSON.stringify(normalizedTeam));
      sessionStorage.setItem("consultation_projectDescription", desc || "");
      const estimatedTotal = normalizedTeam.reduce(
        (sum, member) => sum + (member.hourlyRate || 0) * (member.hours || 1),
        0
      );
      sessionStorage.setItem("consultation_estimatedTotal", String(estimatedTotal));
    } catch (error) {
      console.warn("Failed to persist consultation prefill", error);
    }
    navigate("/dashboard/consultation/details");
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

    </div>
  );
}
