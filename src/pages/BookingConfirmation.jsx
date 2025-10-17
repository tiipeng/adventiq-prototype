// src/pages/BookingConfirmation.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// Try to import; fallback if missing
import { experts as expertsFromData } from '../data/mockData'

const fallbackExperts = [
  { id: 1, name: 'Dr. Jane Bauer', tags: ['AI', 'Manufacturing'], price: '€250/h', rating: 4.8, location: 'Berlin, DE' },
  { id: 2, name: 'Prof. Alan Smith', tags: ['Materials', 'Energy'], price: '€220/h', rating: 4.6, location: 'Zürich, CH' },
]

function makeRef() {
  const n = Math.floor(Math.random() * 9000) + 1000
  return `AIQ-2025-${n}`
}

export default function BookingConfirmation() {
  const navigate = useNavigate()
  const [state, setState] = useState(null)
  const [ref, setRef] = useState(makeRef())

  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem('adventiq.booking') || '{}')
    if (!stored || !stored.expertId || !stored.dateObj || !stored.time) {
      navigate('/dashboard/consultation/browse')
      return
    }
    setState(stored)
  }, [navigate])

  const experts = (expertsFromData && expertsFromData.length ? expertsFromData : fallbackExperts)
  const expert = useMemo(() => experts.find(e => String(e.id) === String(state?.expertId)), [experts, state])

  if (!state || !expert) return null

  const dateTime = `${state.dateObj.date} ${state.time}`

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <span className="text-primary font-medium">Booking</span>
        <span className="mx-2">·</span>
        <span>Step 3 of 3</span>
      </nav>

      <div className="rounded-xl border border-green-200 bg-green-50 text-green-900 px-4 py-3 mb-4">
        Booking confirmed (Prototype)
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-primary">Confirmation</h1>
            <p className="text-sm text-gray-600 mt-1">Reference: <span className="font-mono">{ref}</span></p>
          </div>
          <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">{state.tier === 'premium' ? 'Premium' : 'Standard'}</span>
        </div>

        <div className="mt-4 grid gap-3 text-sm">
          <div><span className="text-gray-500">Expert</span><div className="font-medium">{expert.name}</div></div>
          <div><span className="text-gray-500">Date &amp; time</span><div className="font-medium">{dateTime}</div></div>
          <div><span className="text-gray-500">Location</span><div className="font-medium">{expert.location || '—'}</div></div>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          Payment and notifications are mocked in this prototype.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => navigate('/my/bookings')}
            className="px-3 py-1.5 rounded-lg bg-primary text-white"
          >
            Go to My Bookings
          </button>
          <button
            disabled
            className="px-3 py-1.5 rounded-lg border text-gray-400 cursor-not-allowed"
            title="Disabled in prototype"
          >
            Download Confirmation
          </button>
        </div>
      </div>
    </div>
  )
}
