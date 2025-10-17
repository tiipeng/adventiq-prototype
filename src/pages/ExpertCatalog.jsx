// src/pages/ExpertCatalog.jsx
import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ExpertCard from '../components/ExpertCard.jsx'
import Modal from '../components/Modal.jsx'
import FilterBar from '../components/FilterBar.jsx'
// Try to import mock data; fallback if undefined
import { experts as expertsFromData } from '../data/mockData'

const fallbackExperts = [
  {
    id: 1, name: 'Dr. Jane Bauer', tags: ['AI', 'Manufacturing'], price: '€250/h', rating: 4.8,
    location: 'Berlin, DE', availability: ['Mon AM', 'Tue PM', 'Fri AM'],
    bio: '10+ years applying AI to industrial process optimization.'
  },
  {
    id: 2, name: 'Prof. Alan Smith', tags: ['Materials', 'Energy'], price: '€220/h', rating: 4.6,
    location: 'Zürich, CH', availability: ['Wed AM', 'Thu PM'], bio: 'Battery materials & testing expert.'
  },
  {
    id: 3, name: 'Dr. Linh Nguyen', tags: ['Biotech', 'Assays'], price: '€200/h', rating: 4.7,
    location: 'Hamburg, DE', availability: ['Tue AM', 'Fri PM'], bio: 'Assay design and validation specialist.'
  },
]

export default function ExpertCatalog() {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({ q: '', tags: [], location: 'Any', price: 'Any' })
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const experts = (expertsFromData && expertsFromData.length ? expertsFromData : fallbackExperts)

  const displayList = useMemo(() => {
    // Optional lightweight filtering (purely visual)
    let list = [...experts]
    if (filters.q) {
      const q = filters.q.toLowerCase()
      list = list.filter(e =>
        e.name.toLowerCase().includes(q) ||
        (e.tags || []).join(' ').toLowerCase().includes(q) ||
        (e.location || '').toLowerCase().includes(q)
      )
    }
    if (filters.tags && filters.tags.length) {
      list = list.filter(e => filters.tags.every(t => (e.tags || []).includes(t)))
    }
    if (filters.location && filters.location !== 'Any') {
      list = list.filter(e => (e.location || '').toLowerCase().includes(filters.location.toLowerCase()))
    }
    // price is UI-only; skip implementing numeric filter to keep it simple
    return list
  }, [experts, filters])

  const handleView = (expert) => {
    setSelected(expert)
    setOpen(true)
  }

  const handleSelect = (expert) => {
    navigate(`/booking/${expert.id}`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Expert Catalogue</h1>
        <p className="text-gray-600 mt-2">
          Browse verified experts. Use filters to narrow by field, location, and indicative price.
        </p>
      </header>

      <FilterBar onChange={setFilters} />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayList.map((expert) => (
          <ExpertCard
            key={expert.id}
            expert={expert}
            onView={handleView}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={selected ? selected.name : 'Details'}
        footer={
          selected && (
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
              <button
                className="px-3 py-1.5 rounded-lg bg-primary text-white"
                onClick={() => { setOpen(false); navigate(`/booking/${selected.id}`) }}
              >
                Select &amp; Book
              </button>
            </div>
          )
        }
      >
        {selected && (
          <div className="space-y-3 text-sm">
            <p className="text-gray-700">{selected.bio || 'Profile description (placeholder).'}</p>
            <div className="flex flex-wrap gap-2">
              {(selected.tags || []).map((t) => (
                <span key={t} className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">{t}</span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div><span className="text-gray-500">Price</span><div className="font-medium">{selected.price || '€—/h'}</div></div>
              <div><span className="text-gray-500">Rating</span><div className="font-medium">★ {selected.rating || '—'}</div></div>
              <div><span className="text-gray-500">Location</span><div className="font-medium">{selected.location || '—'}</div></div>
              <div><span className="text-gray-500">Availability</span><div className="font-medium">{(selected.availability || []).join(', ') || '—'}</div></div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
