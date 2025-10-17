// src/pages/Booking.jsx
import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryCard from "../components/SummaryCard.jsx";
import CalendarMock from "../components/CalendarMock.jsx";

// Try to use mock data file; ensure robust fallback
import { experts as expertsFromData } from "../data/mockData.js";

const TIME_SLOTS = ["09:00", "10:30", "14:00", "16:00"];

export default function Booking() {
  const navigate = useNavigate();
  const { expertId } = useParams();

  const experts = Array.isArray(expertsFromData) ? expertsFromData : [];
  const expert = useMemo(
    () => experts.find((e) => String(e.id) === String(expertId)),
    [experts, expertId]
  );

  // Selected date/time (keep in session to survive navigation)
  const [date, setDate] = useState(() => sessionStorage.getItem("booking_date") || "");
  const [time, setTime] = useState(() => sessionStorage.getItem("booking_time") || "");

  useEffect(() => {
    sessionStorage.setItem("booking_expertId", String(expertId || ""));
  }, [expertId]);

  const canContinue = Boolean(date && time && expert);

  const onContinue = () => {
    sessionStorage.setItem("booking_date", date);
    sessionStorage.setItem("booking_time", time);
    // clear tier from previous attempts
    sessionStorage.removeItem("booking_tier");
    navigate("/booking/review");
  };

  if (!expert) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Expert not found</h1>
        <p className="text-gray-600 mt-2">
          The selected expert could not be loaded in this prototype.
        </p>
        <div className="mt-4 flex gap-2">
          <button
            className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
            onClick={() => navigate("/dashboard/consultation/browse")}
          >
            Back to Experts
          </button>
          <button
            className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-2">Booking · Step 1 of 3</div>

      <h1 className="text-2xl md:text-3xl font-bold text-primary">Choose a time</h1>
      <p className="text-gray-600 mt-2">
        Pick a date and time slot for your consultation with {expert.name}.
      </p>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        {/* Left: Calendar + time slots */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5">
          <CalendarMock
            value={date}
            onChange={(val) => setDate(val?.date || "")}
          />

          <div className="mt-5">
            <h3 className="font-semibold text-primary mb-2">Time slots</h3>
            <div className="flex flex-wrap gap-2">
              {TIME_SLOTS.map((t) => {
                const active = t === time;
                return (
                  <button
                    key={t}
                    onClick={() => setTime(t)}
                    className={`px-3 py-1.5 rounded-lg border text-sm ${
                      active
                        ? "bg-primary text-white border-primary"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 h-fit">
          <SummaryCard
            expert={expert}
            dateTime={date && time ? `${date} · ${time}` : ""}
            tier={null}
          />

          <div className="mt-4 flex gap-2">
            <button
              className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <button
              className={`px-3 py-1.5 rounded-lg text-white ${
                canContinue ? "bg-primary hover:opacity-90" : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={onContinue}
              disabled={!canContinue}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
