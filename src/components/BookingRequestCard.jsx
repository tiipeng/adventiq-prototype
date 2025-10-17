// src/components/BookingRequestCard.jsx
import React, { useState } from "react";

const STATUS_STYLES = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default function BookingRequestCard({ request, onApprove, onReject }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-primary">{request.customer}</h3>
            <span className={`text-xs px-2 py-0.5 rounded ${STATUS_STYLES[request.status] || "bg-gray-100 text-gray-700"}`}>{request.status}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{request.topic}</p>
          <div className="mt-2 grid sm:grid-cols-3 gap-2 text-sm">
            <div><span className="text-gray-500">Date/Time</span><div className="font-medium">{request.date} {request.time}</div></div>
            <div><span className="text-gray-500">Tier</span><div className="font-medium">{request.tier}</div></div>
            <div><span className="text-gray-500">Duration</span><div className="font-medium">{request.duration}</div></div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded-lg border text-sm hover:bg-gray-50" onClick={() => setOpen(v => !v)}>
            {open ? "Hide" : "Details"}
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-green-600 text-white text-sm" onClick={onApprove}>Approve</button>
          <button className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-sm" onClick={onReject}>Reject</button>
        </div>
      </div>

      {open && (
        <div className="mt-3 border-t pt-3 text-sm text-gray-700">
          <div><span className="text-gray-500">Notes: </span>{request.notes || "—"}</div>
          <p className="text-xs text-gray-500 mt-2">
            Upon Approve, T&C and NDA take effect (contract between Customer and Expert/Leader starts).
          </p>
        </div>
      )}
    </div>
  );
}
