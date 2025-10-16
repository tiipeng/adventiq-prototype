// /src/pages/Experts/ExpertsCatalog.jsx
import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/Card.jsx'
import Filters from '../../components/Filters.jsx'
import PriceTag from '../../components/PriceTag.jsx'
import { expertProfiles } from '../../mockData.js'

export default function ExpertsCatalog() {
  const [filter, setFilter] = useState({ discipline:'', task:'', country:'', city:'' })
  const [sort, setSort] = useState('rating')

  const items = useMemo(()=>{
    let list = [...expertProfiles]
    if (filter.discipline) list = list.filter(e => e.expertise.join(' ').toLowerCase().includes(filter.discipline.toLowerCase()))
    if (filter.country)   list = list.filter(e => e.country.toLowerCase().includes(filter.country.toLowerCase()))
    if (filter.city)      list = list.filter(e => e.city.toLowerCase().includes(filter.city.toLowerCase()))
    if (sort==='price')   list.sort((a,b)=>a.pricePerHour-b.pricePerHour)
    if (sort==='rating')  list.sort((a,b)=>b.rating-a.rating)
    return list
  }, [filter, sort])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">experts</h2>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Sort by</label>
          <select className="border rounded-lg px-2 py-1 text-sm" value={sort} onChange={e=>setSort(e.target.value)}>
            <option value="rating">Rating</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>

      <Card className="p-4">
        <Filters values={filter} onChange={setFilter} />
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        {items.map(e => (
          <Card key={e.id} className="p-4 hover:shadow-md transition">
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
              <Link to={`/experts/${e.id}`} className="px-3 py-1.5 rounded-lg border hover:bg-neutral text-sm">View details</Link>
              <Link to={`/booking/expert/${e.id}`} className="px-3 py-1.5 rounded-lg bg-primary text-white text-sm">Reserve</Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
