// src/components/LabFeatures.jsx
import React from 'react'

export default function LabFeatures({ items = [], max = 3 }) {
  const shown = items.slice(0, max)
  const more = Math.max(0, items.length - shown.length)

  return (
    <div className="flex flex-wrap gap-2">
      {shown.map((t) => (
        <span
          key={t}
          className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs"
        >
          {t}
        </span>
      ))}
      {more > 0 && (
        <span className="px-2 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-600 text-xs">
          +{more} more
        </span>
      )}
    </div>
  )
}
