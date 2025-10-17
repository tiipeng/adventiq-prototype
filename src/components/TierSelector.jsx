// src/components/TierSelector.jsx
import React from "react";

export default function TierSelector({ value, onChange }) {
  const Card = ({ tier, title, subtitle, bullets, badge }) => {
    const active = value === tier;
    return (
      <button
        type="button"
        onClick={() => onChange && onChange(tier)}
        className={`w-full text-left rounded-xl border p-4 hover:bg-gray-50 transition ${
          active ? "border-primary ring-2 ring-primary/20 bg-white" : "border-gray-200"
        }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="font-semibold text-primary">{title}</div>
            <div className="text-sm text-gray-600">{subtitle}</div>
          </div>
          {badge ? (
            <span className="text-[10px] px-2 py-1 rounded-full bg-[#00B7C2]/10 text-[#0A2540]">
              {badge}
            </span>
          ) : null}
        </div>
        <ul className="mt-3 text-sm text-gray-700 list-disc pl-5 space-y-1">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <div
          className={`mt-3 text-xs font-medium ${
            active ? "text-primary" : "text-gray-500"
          }`}
        >
          {active ? "Selected" : "Select"}
        </div>
      </button>
    );
  };

  return (
    <div className="grid gap-3">
      <Card
        tier="premium"
        title="Premium — AdventIQ Leader + Expert"
        subtitle="Leader finds experts, confirms consultation, monitors report."
        bullets={[
          "AdventIQ Leader oversight",
          "Pre-brief and scope confirmation",
          "Report quality check",
        ]}
        badge="+€150 service uplift (mock)"
      />
      <Card
        tier="standard"
        title="Standard — Expert only"
        subtitle="Expert directly confirms and delivers consultation."
        bullets={["Direct scheduling with expert", "Standard support", "Email summary"]}
      />
    </div>
  );
}
