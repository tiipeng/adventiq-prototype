// src/pages/BookingReview.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TierSelector from '../components/TierSelector.jsx'
import SummaryCard from '../components/SummaryCard.jsx'
// Try to import; fallback if missing
import { experts as expertsFromData } from '../data/mockData'

const fallbackExperts = [
  { id: 1, name: 'Dr. Jane Bauer', tags: ['AI', 'Manufacturing'], price: '€250/h', rating: 4.8, location: 'Berlin, DE' },
  { id: 2, name: 'Prof. Alan Smith', tags: ['Materials', 'Energy'], price: '€220/h', rating: 4.6, location: 'Zürich, CH' },
]

export default function BookingReview() {
  const navigate = useNavigate()
  const [notes, setNotes] = useState('')
  const [tier, setTier] = useState('standard')
  const [state, setState] = useState(null)

  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem('adventiq.booking') || '{}')
    if (!stored || !stored.expertId || !stored.dateObj || !stored.time) {
      navigate('/dashboard/consultation/browse')
      return
    }
    setTier(stored.tier || 'standard')
    setState(stored)
  }, [navigate])

  const experts = (expertsFromData && expertsFromData.length ? expertsFromData : fallbackExperts)
  const expert = useMemo(() => experts.find(e => String(e.id) === String(state?.expertId)), [experts, state])

  const confirm = () => {
    const payload = { ...(state || {}), tier, notes }
    sessionStorage.setItem('adventiq.booking', JSON.stringify(payload))
    navigate('/booking/confirmation')
  }

  if (!state || !expert) return null

  const dateTime = `${state.dateObj.date} ${state.time}`

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <span className="text-primary font-medium">Booking</span>
        <span className="mx-2">·</span>
        <span>Step 2 of 3</span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: tier + notes */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="font-semibold text-primary mb-3">Select service tier</h2>
            <TierSelector value={tier} onChange={setTier} />
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-primary mb-3">Additional context / materials (optional)</h3>
            <textarea
              className="w-full border rounded-lg px-3 py-2"
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Share any notes for the expert… (UI-only)"
            />
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => navigate(`/booking/${expert.id}`)}
              className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={confirm}
              className="px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90"
            >
              Confirm &amp; Mock Pay
            </button>
          </div>
        </div>

        {/* Right: summary */}
        <div>
          <SummaryCard expert={expert} dateTime={dateTime} tier={tier} />
        </div>
      </div>
    </div>
  )
}
