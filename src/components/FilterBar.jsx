// src/components/FilterBar.jsx
import React, { useState } from "react";

export default function FilterBar({ onChange }) {
  const [q, setQ] = useState("");
  const [chips] = useState(["AI", "Materials", "Manufacturing", "Biotech", "Energy"]);

  // unified filter state
  const [minRating, setMinRating] = useState("");
  const [language, setLanguage] = useState("");
  const [location, setLocation] = useState("Any");
  const [price, setPrice] = useState("Any");

  const emit = (next = {}) =>
    onChange?.({
      q,
      minRating,
      language,
      location,
      price,
      ...next,
      tags: [], // keep prototype behavior
    });

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        {/* Search */}
        <input
          type="text"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            emit({ q: e.target.value });
          }}
          placeholder="Search expertise, keywords..."
          className="border border-gray-300 rounded-md px-3 py-2 text-sm flex-1 min-w-[260px]"
        />

        {/* Rating */}
        <select
          value={minRating}
          onChange={(e) => {
            setMinRating(e.target.value);
            emit({ minRating: e.target.value });
          }}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          title="Rating"
        >
          <option value="">Rating</option>
          <option value="4.0">4.0+</option>
          <option value="4.5">4.5+</option>
          <option value="4.8">4.8+</option>
        </select>

        {/* Language (only once ✅) */}
        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            emit({ language: e.target.value });
          }}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          title="Language"
        >
          <option value="">Language</option>
          <option value="EN">EN</option>
          <option value="DE">DE</option>
          <option value="PL">PL</option>
        </select>

        {/* Location */}
        <select
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            emit({ location: e.target.value });
          }}
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
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            emit({ price: e.target.value });
          }}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          title="Price"
        >
          <option value="Any">Price</option>
          <option value="lt-200">&lt; 200€/h</option>
          <option value="200-300">200–300€/h</option>
          <option value="gt-300">&gt; 300€/h</option>
        </select>
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