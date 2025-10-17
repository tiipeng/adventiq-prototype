// src/components/OnboardingChecklist.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const STATUS_BADGE = {
  pending: "bg-gray-100 text-gray-700",
  inprogress: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-700",
};

export default function OnboardingChecklist({ items = [] }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="divide-y">
        {items.map((it) => (
          <div key={it.key} className="p-4 flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-primary">{it.title}</h4>
                <span className={`text-xs px-2 py-0.5 rounded ${STATUS_BADGE[it.status] || STATUS_BADGE.pending}`}>
                  {it.status === "inprogress" ? "In progress" : it.status.charAt(0).toUpperCase() + it.status.slice(1)}
                </span>
              </div>
              {it.description && <p className="text-sm text-gray-600 mt-1">{it.description}</p>}
            </div>
            <button
              className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm"
              onClick={() => navigate(it.route)}
            >
              Go
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
