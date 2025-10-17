// src/components/AvailabilityCalendarMock.jsx
import React, { useMemo, useState } from "react";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const WEEK = ["Mo","Tu","We","Th","Fr","Sa","Su"];

export default function AvailabilityCalendarMock({
  value,               // 'YYYY-MM-DD'
  onSelectDay,         // (dateStr) => void
  selectedSlots = [],  // string[]
  onToggleSlot,        // (slot) => void
  allAvail = {},       // { 'YYYY-MM-DD': ['09:00', ...] }
}) {
  const today = new Date();
  const [offset, setOffset] = useState(0);
  const view = useMemo(() => {
    const first = new Date(today.getFullYear(), today.getMonth() + offset, 1);
    const year = first.getFullYear();
    const month = first.getMonth();
    const firstWeekday = (first.getDay() + 6) % 7; // Monday start
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length < 35) cells.push(null);
    return { year, month, cells };
  }, [today, offset]);

  const fmt = (y, m, d) => `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  const active = value;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button className="w-8 h-8 rounded-lg border hover:bg-gray-50" onClick={() => setOffset(o => o - 1)} aria-label="Prev month">‹</button>
        <div className="text-sm font-medium text-primary">{MONTHS[view.month]} {view.year}</div>
        <button className="w-8 h-8 rounded-lg border hover:bg-gray-50" onClick={() => setOffset(o => o + 1)} aria-label="Next month">›</button>
      </div>

      {/* Week header */}
      <div className="grid grid-cols-7 gap-1 mb-1 text-[11px] text-gray-500">
        {WEEK.map(w => <div key={w} className="text-center">{w}</div>)}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-1">
        {view.cells.map((d, idx) => {
          const disabled = d === null;
          const dateStr = d ? fmt(view.year, view.month, d) : null;
          const isActive = dateStr && active === dateStr;
          const hasAvail = dateStr && (allAvail[dateStr]?.length > 0);
          return (
            <button
              key={idx}
              disabled={disabled}
              onClick={() => d && onSelectDay && onSelectDay(dateStr)}
              className={`h-10 rounded-lg border text-sm ${disabled ? "opacity-20" : "hover:bg-gray-50"} ${isActive ? "bg-primary text-white border-primary" : ""} ${hasAvail && !isActive ? "ring-1 ring-accent" : ""}`}
            >
              {d || ""}
            </button>
          );
        })}
      </div>

      {/* Slots section is handled in parent (ExpertAvailability) */}
    </div>
  );
}
