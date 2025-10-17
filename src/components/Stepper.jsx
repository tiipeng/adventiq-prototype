    // src/components/Stepper.jsx
import React from 'react'

export default function Stepper({ steps = [], current = 0 }) {
  return (
    <div className="flex items-center gap-3 overflow-x-auto">
      {steps.map((s, i) => {
        const active = i === current
        return (
          <div key={s} className="flex items-center gap-3">
            <div className={`px-3 py-1.5 rounded-lg text-xs border ${
              active ? 'bg-primary text-white border-primary' : 'bg-gray-100 text-gray-700'
            }`}>
              {i + 1}. {s}
            </div>
            {i < steps.length - 1 && <span className="text-gray-400">›</span>}
          </div>
        )
      })}
    </div>
  )
}
