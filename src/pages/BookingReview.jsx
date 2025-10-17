// src/pages/BookingReview.jsx
import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { experts as expertsFromData } from "../data/mockData.js";
import TierSelector from "../components/TierSelector.jsx";
import SummaryCard from "../components/SummaryCard.jsx";

export default function BookingReview() {
  const navigate = useNavigate();

  // Pull selections from Step 1 (stored in sessionStorage by Booking.jsx)
  const expertId = sessionStorage.getItem("booking_expertId");
  const date = sessionStorage.getItem("booking_date");
  const time = sessionStorage.getItem("booking_time");

  // Resolve expert
  const experts = Array.isArray(expertsFromData) ? expertsFromData : [];
  const expert = useMemo(
    () => experts.find((e) => String(e.id) === String(expertId)),
    [experts, expertId]
  );

  // Local tier & notes state (persist in session, UI-only)
  const [tier, setTier] = useState(() => sessionStorage.getItem("booking_tier") || "standard");
  const [notes, setNotes] = useState(() => sessionStorage.getItem("booking_notes") || "");

  useEffect(() => {
    sessionStorage.setItem("booking_tier", tier);
  }, [tier]);

  const canConfirm = Boolean(expert && date && time && tier);

  const onConfirm = () => {
    // Persist any notes and go to confirmation
    sessionStorage.setItem("booking_notes", notes || "");
    // Generate a mock reference for confirmation page
    const ref = `AIQ-2025-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`;
    sessionStorage.setItem("booking_ref", ref);
    navigate("/booking/confirmation");
  };

  if (!expert || !date || !time) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Incomplete booking</h1>
        <p className="text-gray-600 mt-2">
          We’re missing the expert or the selected time. Please go back and choose again.
        </p>
        <div className="mt-4">
          <button
            className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
            onClick={() => navigate(expertId ? `/booking/${expertId}` : "/dashboard/consultation/browse")}
          >
            Back to Step 1
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-sm text-gray-500 mb-2">Booking · Step 2 of 3</div>

      <h1 className="text-2xl md:text-3xl font-bold text-primary">Tier & Details</h1>
      <p className="text-gray-600 mt-2">
        Choose your service tier and add any optional context or materials.
      </p>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        {/* Left: Tier + notes */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold text-primary mb-3">Select a tier</h3>
          <TierSelector value={tier} onChange={setTier} />

          <div className="mt-6">
            <h3 className="font-semibold text-primary">Additional context / materials (optional)</h3>
            <textarea
              className="mt-2 w-full border rounded-lg px-3 py-2"
              rows={5}
              placeholder="Links, sample data, short brief… (not uploaded in this prototype)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        {/* Right: Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 h-fit">
          <SummaryCard expert={expert} dateTime={`${date} · ${time}`} tier={tier} />

          <div className="mt-4 flex gap-2">
            <button
              className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
              onClick={() => navigate(`/booking/${expertId}`)}
            >
              Back
            </button>
            <button
              className={`px-3 py-1.5 rounded-lg text-white ${
                canConfirm ? "bg-primary hover:opacity-90" : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={onConfirm}
              disabled={!canConfirm}
            >
              Confirm &amp; Mock Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
