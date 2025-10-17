// src/pages/Booking.jsx
import React, { useMemo, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CalendarMock from '../components/CalendarMock.jsx'
import SummaryCard from '../components/SummaryCard.jsx'
// Try to import; fallback if missing
import { experts as expertsFromData } from '../data/mockData'

const fallbackExperts = [
  { id: 1, name: 'Dr. Jane Bauer', tags: ['AI', 'Manufacturing'], price: '€250/h', rating: 4.8, location: 'Berlin, DE' },
  { id: 2, name: 'Prof. Alan Smith', tags: ['Materials', 'Energy'], price: '€220/h', rating: 4.6, location: 'Zürich, CH' },
]

const TIME_SLOTS = ['09:00', '10:30', '14:00', '15:30', '17:00']

export default function Booking() {
  const navigate = useNavigate()
  const { expertId } = useParams()
  const experts = (expertsFromData && expertsFromData.length ? expertsFromData : fallbackExperts)
  const expert = useMemo(() => experts.find(e => String(e.id) === String(expertId)), [experts, expertId])

  const [dateObj, setDateObj] = useState(null) // { date: 'YYYY-MM-DD' }
  const [time, setTime] = useState('')
  const [tier] = useState('standard') // default; can change on review page

  // Hydrate from sessionStorage if returning
  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem('adventiq.booking') || '{}')
    if (stored.dateObj) setDateObj(stored.dateObj)
    if (stored.time) setTime(stored.time)
  }, [])

  const canContinue = !!(dateObj && time && expert)

  const handleContinue = () => {
    const payload = {
      expertId: expert?.id,
      dateObj,
      time,
      tier, // initial default tier; user can switch in review
    }
    sessionStorage.setItem('adventiq.booking', JSON.stringify(payload))
    navigate('/booking/review')
  }

  if (!expert) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <h2 className="text-lg font-semibold text-primary">Expert not found</h2>
          <p className="text-sm text-gray-600 mt-2">The selected expert is unavailable in this prototype.</p>
          <button
            onClick={() => navigate('/dashboard/consultation/browse')}
            className="mt-4 px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm"
          >
            Back to Experts
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <span className="text-primary font-medium">Booking</span>
        <span className="mx-2">·</span>
        <span>Step 1 of 3</span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: calendar & slots */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="font-semibold text-primary mb-3">Choose a date</h2>
            <CalendarMock value={dateObj} onChange={setDateObj} />
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-primary mb-3">Choose a time</h3>
            <div className="flex flex-wrap gap-2">
              {TIME_SLOTS.map((t) => {
                const active = time === t
                return (
                  <button
                    key={t}
                    onClick={() => setTime(t)}
                    className={`px-3 py-1.5 rounded-lg border text-sm transition ${
                      active ? 'bg-primary text-white border-primary' : 'hover:bg-gray-50'
                    }`}
                  >
                    {t}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => navigate(-1)}
              className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
            >
              Back
            </button>
            <button
              disabled={!canContinue}
              onClick={handleContinue}
              className={`px-4 py-2 rounded-lg text-white ${canContinue ? 'bg-primary hover:opacity-90' : 'bg-gray-300 cursor-not-allowed'}`}
            >
              Continue
            </button>
          </div>
        </div>

        {/* Right: summary */}
        <div>
          <SummaryCard expert={expert} dateTime={dateObj && time ? `${dateObj.date} ${time}` : null} tier="standard" />
        </div>
      </div>
    </div>
  )
}
