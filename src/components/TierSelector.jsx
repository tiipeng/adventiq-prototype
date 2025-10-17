// src/components/TierSelector.jsx
import React from 'react'

export default function TierSelector({ value = 'standard', onChange }) {
  const Card = ({ id, title, desc, bullets = [], badge }) => {
    const active = value === id
    return (
      <button
        type="button"
        onClick={() => onChange && onChange(id)}
        className={`w-full text-left rounded-xl border p-4 transition ${
          active ? 'border-primary ring-2 ring-[#00B7C2]/40 bg-[#00B7C2]/5' : 'border-gray-200 hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-primary">{title}</h4>
          <span className={`text-xs px-2 py-1 rounded ${active ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}>
            {badge}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{desc}</p>
        <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
          {bullets.map((b) => <li key={b}>{b}</li>)}
        </ul>
      </button>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-3">
      <Card
        id="premium"
        title="Premium — AdventIQ Leader + Expert"
        desc="Leader finds experts, confirms consultation, monitors report."
        bullets={['Concierge coordination', 'Quality oversight', 'Milestone tracking']}
        badge="+€150 uplift (mock)"
      />
      <Card
        id="standard"
        title="Standard — Expert only"
        desc="Expert directly confirms and delivers consultation."
        bullets={['Direct communication', 'One session', 'Summary report']}
        badge="Base rate"
      />
    </div>
  )
}
