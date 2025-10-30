// src/components/ExpertCard.jsx
import React from "react";

export default function ExpertCard({
  expert,
  onView,
  onSelect,
  onAddToTeam,      // optional
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
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
          {initials}
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-gray-900 truncate">
            {expert?.name}
          </div>
          <div className="text-xs text-gray-500 truncate">
            {expert?.title || ""}
          </div>
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

      {/* Actions — one line, compact + icon on the right */}
      <div className="mt-3 flex items-center gap-2">
        <button
          className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm hover:bg-gray-50"
          onClick={() => onView?.(expert)}
          type="button"
        >
          View details
        </button>

        <button
          className="px-3 py-1.5 rounded-lg bg-primary text-white text-sm hover:opacity-90"
          onClick={() => onSelect?.(expert)}
          type="button"
        >
          Select &amp; Book
        </button>

        {onAddToTeam && (
          <button
            className="ml-auto p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            type="button"
            aria-label="Add to team"
            title="Add to team"
            onClick={() => onAddToTeam(expert)}
          >
            {/* Plus icon */}
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-700"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        )}
      </div>

      {/* Optional bio snippet */}
      {expert?.bio && (
        <p className="mt-3 text-xs text-gray-600 line-clamp-2">{expert.bio}</p>
      )}
    </div>
  );
}
