// src/pages/SuggestedExperts.jsx
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ExpertCard from "../components/ExpertCard.jsx";
import { experts as expertsDataFile } from "../data/mockData.js";

export default function SuggestedExperts() {
  const navigate = useNavigate();

  const experts = useMemo(() => {
    const base =
      Array.isArray(expertsDataFile) && expertsDataFile.length
        ? expertsDataFile
        : [
            {
              id: 1,
              name: "Dr. Jane Bauer",
              tags: ["AI", "Manufacturing"],
              price: "€250/h",
              rating: 4.8,
              location: "Berlin, DE",
            },
            {
              id: 2,
              name: "Prof. Alan Smith",
              tags: ["Materials", "Energy"],
              price: "€220/h",
              rating: 4.6,
              location: "Zürich, CH",
            },
            {
              id: 3,
              name: "Dr. Linh Nguyen",
              tags: ["Biotech", "Assays"],
              price: "€200/h",
              rating: 4.7,
              location: "Hamburg, DE",
            },
          ];
    // show a small curated slice
    return base.slice(0, 3);
  }, []);

  const onView = (exp) => {
    // In this prototype, we jump straight to booking when viewing details if you want.
    navigate(`/booking/${exp.id}`);
  };

  const onSelect = (exp) => {
    if (!exp || exp.id == null) {
      console.warn("Select & Book clicked but expert has no id", exp);
      return;
    }
    sessionStorage.setItem("booking_expertId", String(exp.id));
    navigate(`/booking/${exp.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-sm text-gray-500 mb-2">Dashboard / Consultation</div>
      <div className="rounded-xl border border-accent/30 bg-accent/10 text-[#0A2540] px-4 py-2 text-sm">
        These are mock suggestions for the prototype.
      </div>
      <h1 className="mt-4 text-2xl md:text-3xl font-bold text-primary">Suggested Experts</h1>
      <p className="text-gray-600 mt-2">Based on your answers (mock).</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {experts.map((e) => (
          <ExpertCard key={e.id || e.name} expert={e} onView={onView} onSelect={onSelect} />
        ))}
      </div>

      {!experts.length && (
        <div className="mt-6 bg-white border border-gray-200 rounded-xl p-6 text-gray-600 text-sm">
          No suggestions right now. Try the catalogue instead.
        </div>
      )}
    </div>
  );
}
