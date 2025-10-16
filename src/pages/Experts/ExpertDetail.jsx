// /src/pages/Experts/ExpertDetail.jsx
import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Card from '../../components/Card.jsx'
import Gallery from '../../components/Gallery.jsx'
import AvailabilityCalendar from '../../components/AvailabilityCalendar.jsx'
import PriceTag from '../../components/PriceTag.jsx'
import { expertProfiles } from '../../mockData.js'

export default function ExpertDetail() {
  const { id } = useParams()
  const expert = expertProfiles.find(e => String(e.id) === String(id))
  if (!expert) return <div className="max-w-7xl mx-auto px-4 py-8">Expert not found.</div>

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        <Card className="p-4">
          <div className="flex gap-3 items-center">
            <img src={expert.photo} alt={expert.name} className="w-16 h-16 rounded-xl border" />
            <div>
              <h1 className="text-xl font-bold text-primary">{expert.name}</h1>
              <p className="text-sm text-gray-600">{expert.expertise.join(', ')} • {expert.city}, {expert.country}</p>
              <div className="mt-1 flex items-center gap-2">
                <PriceTag value={expert.pricePerHour} />
                <span className="text-xs text-gray-600">★ {expert.rating}</span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-700">{expert.bio}</p>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold text-primary">gallery</h3>
          <div className="mt-3"><Gallery images={expert.gallery} /></div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold text-primary">availability</h3>
          <div className="mt-3"><AvailabilityCalendar /></div>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="p-4">
          <h3 className="font-semibold text-primary">book this expert</h3>
          <p className="text-sm text-gray-600">Pick a time slot and add your materials/brief.</p>
          <Link to={`/booking/expert/${expert.id}`} className="mt-3 inline-block px-3 py-1.5 rounded-lg bg-primary text-white">Reserve</Link>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold text-primary">includes</h3>
          <ul className="list-disc list-inside text-sm text-gray-700">
            <li>Live consultation</li>
            <li>Recommendations / report</li>
            <li>Follow-up notes</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
