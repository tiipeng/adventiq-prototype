// /src/pages/Guided/SuggestedExperts.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/Card.jsx'
import PriceTag from '../../components/PriceTag.jsx'
import { expertProfiles } from '../../mockData.js'

export default function SuggestedExperts() {
  const ranked = [...expertProfiles].sort((a,b)=>b.rating-a.rating)
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-4">
      <h2 className="text-2xl font-bold text-primary">suggested experts</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {ranked.map(e => (
          <Card key={e.id} className="p-4">
            <div className="flex gap-3">
              <img src={e.photo} alt={e.name} className="w-16 h-16 rounded-xl border" />
              <div>
                <p className="font-semibold text-primary">{e.name}</p>
                <p className="text-sm text-gray-600">{e.expertise.join(', ')}</p>
                <div className="flex items-center gap-2 mt-1">
                  <PriceTag value={e.pricePerHour} />
                  <span className="text-xs text-gray-600">★ {e.rating}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <Link to={`/experts/${e.id}`} className="px-3 py-1.5 rounded-lg border hover:bg-neutral text-sm">Details</Link>
              <Link to={`/booking/expert/${e.id}`} className="px-3 py-1.5 rounded-lg bg-primary text-white text-sm">Reserve</Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
