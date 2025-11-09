// src/components/FilterBar.jsx
import React, { useEffect, useState } from "react";

export default function FilterBar({ onChange, extraRightControls }) {
  const [chips] = useState(["AI", "Materials", "Manufacturing", "Biotech", "Energy"]);
  const [filters, setFilters] = useState({
    q: "",
    location: "Any",
    price: "Any",
  });

  useEffect(() => {
    onChange?.({ q: "", location: "Any", price: "Any", tags: [] });
  }, [onChange]);

  const update = (next) => {
    setFilters((prev) => {
      const merged = { ...prev, ...next };
      onChange?.({ ...merged, tags: [] });
      return merged;
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        {/* Search */}
        <input
          type="text"
          value={filters.q}
          onChange={(e) => update({ q: e.target.value })}
          placeholder="Search expertise, keywords..."
          className="border border-gray-300 rounded-md px-3 py-2 text-sm flex-1 min-w-[260px]"
        />

        {/* Location */}
        <select
          value={filters.location}
          onChange={(e) => update({ location: e.target.value })}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          title="Location"
        >
          <option value="Any">Location</option>
          <option value="DE">DE</option>
          <option value="CH">CH</option>
          <option value="PL">PL</option>
        </select>

        {/* Price (label says Price, not Any ✅) */}
        <select
          value={filters.price}
          onChange={(e) => update({ price: e.target.value })}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          title="Price"
        >
          <option value="Any">Price</option>
          <option value="lt-200">&lt; 200€/h</option>
          <option value="200-300">200–300€/h</option>
          <option value="gt-300">&gt; 300€/h</option>
        </select>

        {extraRightControls && (
          <div className="flex items-center gap-2">{extraRightControls}</div>
        )}
      </div>

      {/* Chips (visual only) */}
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