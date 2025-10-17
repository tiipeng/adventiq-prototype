// src/pages/ExpertOrders.jsx
import React, { useMemo, useState } from "react";
import BookingRequestCard from "../components/BookingRequestCard.jsx";

// Static import (no top-level await)
import { bookings as bookingsFromData } from "../data/mockData.js";

const FILTERS = ["All", "Pending", "Approved", "Rejected"];

export default function ExpertOrders() {
  // Use imported data or fallback
  const initial =
    Array.isArray(bookingsFromData) && bookingsFromData.length
      ? bookingsFromData
      : [
          {
            id: "b1",
            customer: "ACME GmbH",
            topic: "AI in manufacturing",
            date: "2025-11-04",
            time: "10:30",
            tier: "Premium",
            duration: "1.5h",
            notes: "Scope discussion",
            status: "pending",
          },
          {
            id: "b2",
            customer: "NovaTech",
            topic: "Materials fatigue",
            date: "2025-11-10",
            time: "14:00",
            tier: "Standard",
            duration: "2h",
            notes: "Review test data",
            status: "approved",
          },
          {
            id: "b3",
            customer: "BioLabs",
            topic: "Assay validation",
            date: "2025-11-18",
            time: "09:00",
            tier: "Premium",
            duration: "1h",
            notes: "Short sync",
            status: "rejected",
          },
        ];

  const [filter, setFilter] = useState("All");
  const [local, setLocal] = useState(initial);

  const filtered = useMemo(() => {
    if (filter === "All") return local;
    return local.filter((r) => r.status.toLowerCase() === filter.toLowerCase());
  }, [filter, local]);

  const updateStatus = (id, status) => {
    setLocal((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-primary">Orders</h1>
      <p className="text-gray-600 mt-2">Approve / reject incoming booking requests. Visual only.</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full border text-sm ${
                active ? "bg-primary text-white border-primary" : "hover:bg-gray-50"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4">
        {filtered.map((req) => (
          <BookingRequestCard
            key={req.id}
            request={req}
            onApprove={() => updateStatus(req.id, "approved")}
            onReject={() => updateStatus(req.id, "rejected")}
          />
        ))}
        {!filtered.length && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-gray-600 text-sm">
            No requests in this filter.
          </div>
        )}
      </div>
    </div>
  );
}
