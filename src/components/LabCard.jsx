// src/components/LabCard.jsx
import React from 'react'
import LabFeatures from './LabFeatures.jsx'

export default function LabCard({ lab, onView }) {
  const { name, rating, location, dayRate, services = [] } = lab

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:ring-2 hover:ring-[#00B7C2]/40 transition">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-primary">{name}</h3>
          <p className="text-sm text-gray-600 mt-1">{location || '—'}</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Rating</div>
          <div className="font-medium">★ {rating ?? '—'}</div>
        </div>
      </div>

      <div className="mt-3">
        <LabFeatures items={services} />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div>
          <div className="text-gray-500">Day rate</div>
          <div className="font-medium">{dayRate || '€—/day'}</div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm"
          onClick={() => onView && onView(lab)}
        >
          View details
        </button>
        <button
          className="px-3 py-1.5 rounded-lg bg-primary text-white text-sm"
          onClick={() => onView && onView(lab)}
        >
          Request Lab
        </button>
      </div>
    </div>
  )
}
