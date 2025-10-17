// src/components/ExpertCard.jsx
import React from 'react'

function initials(name = '') {
  return name.split(' ').slice(0, 2).map(n => n[0]?.toUpperCase() || '').join('')
}

export default function ExpertCard({ expert, onView, onSelect }) {
  const { name, tags = [], rating, price, location } = expert

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:ring-2 hover:ring-[#00B7C2]/50 transition">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-[#0A2540] text-white flex items-center justify-center font-semibold">
          {initials(name)}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-primary">{name}</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.slice(0, 4).map((t) => (
              <span key={t} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs">{t}</span>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
            <div><span className="text-gray-500">Rating</span><div className="font-medium">★ {rating ?? '—'}</div></div>
            <div><span className="text-gray-500">Price</span><div className="font-medium">{price ?? '€—/h'}</div></div>
            <div><span className="text-gray-500">Location</span><div className="font-medium">{location ?? '—'}</div></div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onView && onView(expert)}
          className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm"
        >
          View details
        </button>
        <button
          onClick={() => onSelect && onSelect(expert)}
          className="px-3 py-1.5 rounded-lg bg-primary text-white text-sm"
        >
          Select &amp; Book
        </button>
      </div>
    </div>
  )
}
