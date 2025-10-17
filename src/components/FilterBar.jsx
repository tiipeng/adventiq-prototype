// src/components/FilterBar.jsx
import React, { useEffect, useState } from 'react'

const chipOptions = ['AI', 'Materials', 'Manufacturing', 'Biotech', 'Energy']
const locations = ['Any', 'Berlin', 'Munich', 'Dresden']
const prices = ['Any', '€100–€200/h', '€200–€300/h', '€300+/h']

export default function FilterBar({ onChange }) {
  const [q, setQ] = useState('')
  const [tags, setTags] = useState([])
  const [location, setLocation] = useState(locations[0])
  const [price, setPrice] = useState(prices[0])

  useEffect(() => {
    onChange && onChange({ q, tags, location, price })
  }, [q, tags, location, price, onChange])

  const toggleTag = (t) => {
    setTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex-1">
          <input
            className="w-full border rounded-lg px-3 py-2 text-sm"
            placeholder="Search expertise, keywords…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            className="border rounded-lg px-3 py-2 text-sm"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            {locations.map(l => <option key={l}>{l}</option>)}
          </select>
          <select
            className="border rounded-lg px-3 py-2 text-sm"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          >
            {prices.map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {chipOptions.map((t) => {
          const active = tags.includes(t)
          return (
            <button
              key={t}
              onClick={() => toggleTag(t)}
              className={`px-3 py-1.5 rounded-full text-sm border transition ${
                active ? 'bg-[#00B7C2]/10 border-[#00B7C2] text-[#0A2540]' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-white'
              }`}
            >
              {t}
            </button>
          )
        })}
      </div>
    </div>
  )
}
