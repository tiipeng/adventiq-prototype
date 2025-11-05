// src/components/ExpertCard.jsx
import React from "react";

export default function ExpertCard({
  expert,
  onView,
  onSelect,
  onAddToTeam, // optional
  hourlyRate, // optional, for consistent price display
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
      ? `${expert.price} €/h`
      : typeof hourlyRate === "number"
      ? `${hourlyRate} €/h`
      : "—";

  const tags = Array.isArray(expert?.tags)
    ? expert.tags
    : expert?.expertise
    ? String(expert.expertise)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const description = expert?.headline || expert?.bio || "";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
            {initials}
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-gray-900 truncate">{expert?.name}</div>
            <div className="text-xs text-gray-500 truncate">
              {expert?.title || expert?.headline || tags.join(" · ")}
            </div>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">
          <svg
            width="12"
            height="12"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M10 1.5l2.472 5.507 5.528.403-4.172 3.66 1.3 5.43L10 13.69l-5.128 2.81 1.3-5.43-4.172-3.66 5.528-.403L10 1.5z" />
          </svg>
          {typeof expert?.rating === "number" ? expert.rating.toFixed(1) : "—"}
        </span>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {description && (
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
      )}

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-gray-500 text-xs uppercase tracking-wide">Price</div>
          <div className="font-medium">{priceDisplay}</div>
        </div>
        <div>
          <div className="text-gray-500 text-xs uppercase tracking-wide">Location</div>
          <div className="font-medium">{expert?.location || "Remote"}</div>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <button
          className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm hover:bg-gray-50"
          onClick={() => onView?.(expert)}
          type="button"
        >
          View details
        </button>

        <button
          className="px-3 py-1.5 rounded-lg bg-primary text-white text-sm font-semibold hover:opacity-90"
          onClick={() => onSelect?.(expert)}
          type="button"
        >
          Fast book
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

      {!description && expert?.bio && (
        <p className="text-xs text-gray-600 line-clamp-2">{expert.bio}</p>
      )}
    </div>
  );
}
