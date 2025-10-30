// src/components/ExpertCard.jsx
import React from "react";

export default function ExpertCard({
  expert,
  onView,
  onSelect,
  onAddToTeam,      // ✅ new (optional)
  hourlyRate,       // optional, for consistent price display
}) {
  const initials =
    (expert?.name || "")
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "EX";

  const priceDisplay =
    typeof expert.price === "string"
      ? expert.price
      : typeof expert.price === "number"
      ? expert.price
      : typeof hourlyRate === "number"
      ? `${hourlyRate}`
      : "—";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm h-full flex flex-col">
      {/* Header row */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
          {initials}
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-gray-900 truncate">{expert?.name}</div>
          <div className="text-xs text-gray-500 truncate">{expert?.title || ""}</div>
        </div>
      </div>

      {/* Meta */}
      <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
        <div>
          <div className="text-gray-500 text-xs">Rating</div>
          <div className="font-medium">
            {typeof expert.rating === "number" ? `★ ${expert.rating}` : "—"}
          </div>
        </div>
        <div>
          <div className="text-gray-500 text-xs">Price</div>
          <div className="font-medium">{priceDisplay}</div>
        </div>
        <div>
          <div className="text-gray-500 text-xs">Location</div>
          <div className="font-medium">{expert?.location || "—"}</div>
        </div>
      </div>

      {/* Actions row */}
      <div className="mt-3 flex gap-2">
        <button
          className="px-3 py-1.5 rounded-lg border text-sm hover:bg-gray-50"
          onClick={() => onView?.(expert)}
          type="button"
        >
          View details
        </button>
        <button
          className="px-3 py-1.5 rounded-lg bg-primary text-white text-sm"
          onClick={() => onSelect?.(expert)}
          type="button"
        >
          Select &amp; Book
        </button>
      </div>

      {/* Optional: short bio preview */}
      {expert?.bio && (
        <p className="mt-3 text-xs text-gray-600 line-clamp-2">{expert.bio}</p>
      )}

      {/* Add to team INSIDE the card */}
      {onAddToTeam && (
        <div className="mt-3">
          <button
            className="w-full rounded-xl px-3 py-2 bg-primary text-white hover:opacity-90"
            type="button"
            onClick={() => onAddToTeam(expert)}
          >
            Add to team
          </button>
        </div>
      )}
    </div>
  );
}
