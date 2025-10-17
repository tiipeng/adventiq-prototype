// src/pages/BookingConfirmation.jsx
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { experts as expertsFromData } from "../data/mockData.js";
import SummaryCard from "../components/SummaryCard.jsx";

export default function BookingConfirmation() {
  const navigate = useNavigate();

  const expertId = sessionStorage.getItem("booking_expertId");
  const date = sessionStorage.getItem("booking_date");
  const time = sessionStorage.getItem("booking_time");
  const tier = sessionStorage.getItem("booking_tier") || "standard";
  const ref = sessionStorage.getItem("booking_ref") || "AIQ-2025-0000";

  const experts = Array.isArray(expertsFromData) ? expertsFromData : [];
  const expert = useMemo(
    () => experts.find((e) => String(e.id) === String(expertId)),
    [experts, expertId]
  );

  const goToMyBookings = () => {
    // No real route in prototype — send to dashboard as a stand-in
    navigate("/dashboard");
  };

  if (!expert || !date || !time) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Booking details missing</h1>
        <p className="text-gray-600 mt-2">Please restart the booking process.</p>
        <div className="mt-4">
          <button
            className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
            onClick={() => navigate("/dashboard/consultation/browse")}
          >
            Back to Experts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-sm text-gray-500 mb-2">Booking · Step 3 of 3</div>

      <div className="rounded-xl border border-green-200 bg-green-50 text-green-800 px-4 py-3">
        <div className="font-semibold">Booking confirmed (Prototype)</div>
        <div className="text-sm">Reference: <span className="font-mono">{ref}</span></div>
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="font-semibold text-primary">Summary</h2>
          <div className="mt-3">
            <SummaryCard expert={expert} dateTime={`${date} · ${time}`} tier={tier} />
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Payment and notifications are mocked in this prototype.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 h-fit">
          <h3 className="font-semibold text-primary">Next steps</h3>
          <ul className="mt-2 text-sm text-gray-700 list-disc pl-5 space-y-1">
            <li>We’ll notify the expert to confirm (mock).</li>
            <li>You’ll receive a calendar invite (mock).</li>
            <li>A summary/report will appear in “My Reports” (mock).</li>
          </ul>

          <div className="mt-4 flex flex-col gap-2">
            <button
              className="px-3 py-1.5 rounded-lg bg-primary text-white"
              onClick={goToMyBookings}
            >
              Go to My Bookings
            </button>
            <button
              className="px-3 py-1.5 rounded-lg border text-gray-400 cursor-not-allowed"
              disabled
              title="Disabled in prototype"
            >
              Download Confirmation (PDF)
            </button>
            <button
              className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
              onClick={() => navigate("/dashboard/consultation/browse")}
            >
              Book another expert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
