// src/pages/ExpertCatalog.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpertCard from "../components/ExpertCard.jsx";
import Modal from "../components/Modal.jsx";
import FilterBar from "../components/FilterBar.jsx";
import { experts as expertsDataFile } from "../data/mockData.js";

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
          },
        ];
  }, []);

  const [filterState, setFilterState] = useState({
    q: "",
    tags: [],
    location: "Any",
    price: "Any",
  });

  // Optional simple filter (won’t break if fields missing)
  const filtered = useMemo(() => {
    const q = filterState.q.toLowerCase();
    return experts.filter((e) => {
      const hay =
        `${e.name || ""} ${e.location || ""} ${(e.tags || []).join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [experts, filterState.q]);

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const onView = (exp) => {
    setActive(exp);
    setOpen(true);
  };

  const onSelect = (exp) => {
    if (!exp || exp.id == null) {
      console.warn("Select & Book clicked but expert has no id", exp);
      return;
    }
    // Store last selected id for convenience (optional)
    sessionStorage.setItem("booking_expertId", String(exp.id));
    navigate(`/booking/${exp.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-sm text-gray-500 mb-2">Dashboard / Consultation</div>
      <h1 className="text-2xl md:text-3xl font-bold text-primary">Browse Experts</h1>
      <p className="text-gray-600 mt-2">
        Explore our catalogue. Filters are visual only (prototype).
      </p>

      <div className="mt-5">
        <FilterBar onChange={setFilterState} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((e) => (
          <ExpertCard key={e.id || e.name} expert={e} onView={onView} onSelect={onSelect} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-6 bg-white border border-gray-200 rounded-xl p-6 text-gray-600 text-sm">
          No experts found with current filters. Try resetting your search.
        </div>
      )}

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
        </div>
      </Modal>
    </div>
  );
}
