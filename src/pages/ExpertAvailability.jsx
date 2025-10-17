// src/pages/ExpertAvailability.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AvailabilityCalendarMock from "../components/AvailabilityCalendarMock.jsx";

const SLOTS = ["09:00", "10:30", "14:00", "16:00"];

export default function ExpertAvailability() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(null); // 'YYYY-MM-DD'
  const [availability, setAvailability] = useState(() => JSON.parse(sessionStorage.getItem("availabilitySlots") || "{}"));
  const [banner, setBanner] = useState("");

  const selectedSlots = useMemo(() => availability[selectedDay] || [], [availability, selectedDay]);

  const toggleSlot = (slot) => {
    if (!selectedDay) return;
    setAvailability(prev => {
      const daySlots = new Set(prev[selectedDay] || []);
      if (daySlots.has(slot)) daySlots.delete(slot); else daySlots.add(slot);
      return { ...prev, [selectedDay]: Array.from(daySlots) };
    });
  };

  const save = () => {
    sessionStorage.setItem("availabilitySlots", JSON.stringify(availability));
    setBanner("Availability saved (prototype).");
    setTimeout(() => setBanner(""), 1200);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-primary">Availability</h1>
      <p className="text-gray-600 mt-2">Pick days and toggle time slots. Visual only; no backend.</p>

      {banner && <div className="mt-3 rounded bg-green-50 border border-green-200 text-green-800 px-3 py-2 text-sm">{banner}</div>}

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5">
          <AvailabilityCalendarMock
            value={selectedDay}
            onSelectDay={setSelectedDay}
            selectedSlots={selectedSlots}
            onToggleSlot={toggleSlot}
            allAvail={availability}
          />
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold text-primary">Time slots</h3>
          {!selectedDay && <p className="text-sm text-gray-500 mt-1">Select a day to edit slots.</p>}
          <div className="mt-3 flex flex-wrap gap-2">
            {SLOTS.map(s => {
              const active = selectedSlots.includes(s);
              return (
                <button
                  key={s}
                  onClick={() => toggleSlot(s)}
                  disabled={!selectedDay}
                  className={`px-3 py-1.5 rounded-lg border text-sm ${active ? "bg-primary text-white border-primary" : "hover:bg-gray-50"} ${!selectedDay ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {s}
                </button>
              );
            })}
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <button className="px-3 py-1.5 rounded-lg bg-primary text-white" onClick={save}>Save Availability</button>
            <button className="px-3 py-1.5 rounded-lg border" onClick={() => navigate("/expert/orders")}>See how bookings appear</button>
          </div>
        </div>
      </div>
    </div>
  );
}
