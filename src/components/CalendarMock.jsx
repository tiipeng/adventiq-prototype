// src/components/CalendarMock.jsx
import React, { useMemo, useState } from "react";

/**
 * Simple, safe month calendar for the prototype.
 * Props:
 *  - value: string | null -> 'YYYY-MM-DD'
 *  - onChange: ({ date: 'YYYY-MM-DD' }) => void
 */
export default function CalendarMock({ value, onChange }) {
  const today = new Date();
  const [offset, setOffset] = useState(0);

  const view = useMemo(() => {
    const first = new Date(today.getFullYear(), today.getMonth() + offset, 1);
    const year = first.getFullYear();
    const month = first.getMonth(); // 0..11
    const firstWeekday = (first.getDay() + 6) % 7; // Monday=0
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells = [];
    for (let i = 0; i < firstWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    if (cells.length < 35) {
      while (cells.length < 35) cells.push(null);
    }
    if (cells.length > 42) {
      cells.length = 42;
    }

    return { year, month, cells };
  }, [today, offset]);

  const fmt = (y, m, d) =>
    `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const isActive = (y, m, d) => {
    if (!value || !d) return false;
    return value === fmt(y, m, d);
  };

  const WEEK = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handlePick = (d) => {
    if (!d) return;
    const dateStr = fmt(view.year, view.month, d);
    try {
      if (typeof onChange === "function") {
        onChange({ date: dateStr });
      }
    } catch (err) {
      // swallow errors to avoid white screen in prototype
      console.error("CalendarMock onChange error:", err);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          className="w-8 h-8 rounded-lg border hover:bg-gray-50"
          onClick={() => setOffset((o) => o - 1)}
          aria-label="Previous month"
          type="button"
        >
          ‹
        </button>
        <div className="text-sm font-medium text-primary">
          {MONTHS[view.month]} {view.year}
        </div>
        <button
          className="w-8 h-8 rounded-lg border hover:bg-gray-50"
          onClick={() => setOffset((o) => o + 1)}
          aria-label="Next month"
          type="button"
        >
          ›
        </button>
      </div>

      {/* Week header */}
      <div className="grid grid-cols-7 gap-1 mb-1 text-[11px] text-gray-500 select-none">
        {WEEK.map((w) => (
          <div key={w} className="text-center">
            {w}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-1">
        {view.cells.map((d, idx) => {
          const disabled = d === null;
          const active = isActive(view.year, view.month, d || 0);
          return (
            <button
              key={idx}
              type="button"
              disabled={disabled}
              onClick={() => handlePick(d)}
              className={[
                "h-10 rounded-lg border text-sm",
                disabled ? "opacity-20 cursor-default" : "hover:bg-gray-50",
                active ? "bg-primary text-white border-primary" : "",
              ].join(" ")}
            >
              {d || ""}
            </button>
          );
        })}
      </div>
    </div>
  );
}
