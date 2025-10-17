// src/pages/SuggestedExperts.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ExpertCard from '../components/ExpertCard.jsx'
// Try to import; fallback if not present
import { experts as expertsFromData } from '../data/mockData'

const fallbackExperts = [
  { id: 11, name: 'Dr. Eva Müller', tags: ['AI', 'Materials'], price: '€240/h', rating: 4.7, location: 'Munich, DE', availability: ['Mon AM', 'Thu PM'] },
  { id: 12, name: 'Dr. Marco Conte', tags: ['Manufacturing', 'Robotics'], price: '€260/h', rating: 4.6, location: 'Milan, IT', availability: ['Tue PM', 'Fri AM'] },
  { id: 13, name: 'Prof. Sara Kim', tags: ['Biotech'], price: '€230/h', rating: 4.8, location: 'Seoul, KR', availability: ['Wed AM', 'Fri PM'] },
]

export default function SuggestedExperts() {
  const navigate = useNavigate()
  const experts = (expertsFromData && expertsFromData.length ? expertsFromData.slice(0, 3) : fallbackExperts)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-4 rounded-lg bg-[#00B7C2]/10 border border-[#00B7C2]/30 text-sm text-[#0A2540] px-3 py-2">
        These are mock suggestions for the prototype.
      </div>

      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Suggested Experts</h1>
        <p className="text-gray-600 mt-2">Based on your answers</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {experts.map((e) => (
          <ExpertCard
            key={e.id}
            expert={e}
            onView={(ex) => alert(`Viewing: ${ex.name}`)}
            onSelect={(ex) => navigate(`/booking/${ex.id}`)}
          />
        ))}
      </div>
    </div>
  )
}
