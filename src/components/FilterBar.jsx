// src/components/FilterBar.jsx
import React, { useState } from "react";

export default function FilterBar({
  onChange,
  extraRightControls, // ✅ new (optional)
}) {
  const [q, setQ] = useState("");
  const [chips] = useState(["AI", "Materials", "Manufacturing", "Biotech", "Energy"]);
  const [location, setLocation] = useState("Any");
  const [price, setPrice] = useState("Any");

  // bubble minimal state up (kept your original idea)
  const emit = (next) => onChange?.(next);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
      {/* top row: search + selects (left) / extra (right) */}
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="text"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            emit({ q: e.target.value, location, price, tags: [] });
          }}
          placeholder="Search expertise, keywords..."
          className="border border-gray-300 rounded-md px-3 py-2 text-sm flex-1 min-w-[260px]"
        />

        <select
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            emit({ q, location: e.target.value, price, tags: [] });
          }}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="Any">Any</option>
          <option value="DE">DE</option>
          <option value="CH">CH</option>
          <option value="PL">PL</option>
        </select>

        <select
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            emit({ q, location, price: e.target.value, tags: [] });
          }}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="Any">Any</option>
          <option value="lt-200">&lt; 200€/h</option>
          <option value="200-300">200–300€/h</option>
          <option value="gt-300">&gt; 300€/h</option>
        </select>

        {/* ✅ Right side slot so Rating/Language sit inside the same bar */}
        <div className="ml-auto flex items-center gap-2">
          {extraRightControls}
        </div>
      </div>

      {/* chips row (kept) */}
      <div className="mt-3 flex flex-wrap gap-2">
        {chips.map((c) => (
          <span
            key={c}
            className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
