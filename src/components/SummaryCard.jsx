// src/components/SummaryCard.jsx
import React from "react";

/**
 * Safe helpers
 */
function getInitials(name) {
  if (!name) return "EX";
  try {
    const parts = String(name).trim().split(/\s+/).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase() || "").join("") || "EX";
  } catch {
    return "EX";
  }
}

function normalizeTags(tags) {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  // accept comma-separated string
  return String(tags)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function parsePriceToNumber(price) {
  // Accept formats like "€250/h", "250", "€ 250", etc.
  if (!price) return 0;
  const m = String(price).match(/(\d+(?:[.,]\d+)?)/);
  if (!m) return 0;
  return Number(m[1].replace(",", "."));
}

export default function SummaryCard({ expert, dateTime, tier }) {
  const name = expert?.name || "Expert";
  const location = expert?.location || "—";
  const tags = normalizeTags(expert?.tags);
  const base = parsePriceToNumber(expert?.price) || 250; // fallback base
  const isPremium = tier === "premium";
  const uplift = isPremium ? 150 : 0; // mock uplift for premium
  const total = base + uplift;

  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white font-semibold">
          {getInitials(name)}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-primary">{name}</div>
          <div className="text-sm text-gray-600">{location}</div>

          <div className="mt-2 flex flex-wrap gap-2">
            {tags.length ? (
              tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs"
                >
                  {t}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-500">No tags</span>
            )}
          </div>

          {dateTime ? (
            <div className="mt-3 text-sm">
              <div className="text-gray-500">Selected time</div>
              <div className="font-medium">{dateTime}</div>
            </div>
          ) : null}

          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <div>
              <div className="text-gray-500">Base price</div>
              <div className="font-medium">€{base}/h</div>
            </div>
            <div>
              <div className="text-gray-500">Total (mock)</div>
              <div className="font-medium flex items-center gap-2">
                €{total}
                {isPremium && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#00B7C2]/10 text-[#0A2540]">
                    Premium +€{uplift}
                  </span>
                )}
              </div>
            </div>
          </div>

          {tier ? (
            <div className="mt-2 text-xs text-gray-500">
              Tier: <span className="font-medium capitalize">{tier}</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
