// src/pages/LabsCatalog.jsx
import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal.jsx'
import LabCard from '../components/LabCard.jsx'
import LabFeatures from '../components/LabFeatures.jsx'
import { labs as labsFromData } from '../data/mockData'

const fallbackLabs = [
  {
    id: 101,
    name: 'AI Materials Lab',
    services: ['Materials', 'Imaging', 'Microscopy'],
    dayRate: '€1,200/day',
    location: 'Berlin, DE',
    rating: 4.7,
    contactEmail: 'contact@aimaterials.example',
    equipment: ['SEM', 'XRD', '3D Printer']
  },
  {
    id: 102,
    name: 'Mechanical Testing Facility',
    services: ['Mechanical', 'Fatigue Testing', 'Metrology'],
    dayRate: '€900/day',
    location: 'Munich, DE',
    rating: 4.5,
    contactEmail: 'info@mechtest.example',
    equipment: ['Instron', 'CMM', 'Climate Chamber']
  },
  {
    id: 103,
    name: 'Chemistry Innovation Lab',
    services: ['Chemistry', 'Synthesis', 'Biotech'],
    dayRate: '€1,600/day',
    location: 'Hamburg, DE',
    rating: 4.6,
    contactEmail: 'hello@chemlab.example',
    equipment: ['Fume Hoods', 'GC-MS', 'HPLC']
  },
]

const chipOptions = ['Materials', 'Imaging', 'Mechanical', 'Chemistry', 'Biotech']
const locations = ['Any', 'Berlin', 'Munich', 'Dresden', 'Hamburg']
const prices = ['Any', '≤ €800/day', '€800–€1,500/day', '€1,500+/day']

export default function LabsCatalog() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [chips, setChips] = useState([])
  const [location, setLocation] = useState(locations[0])
  const [price, setPrice] = useState(prices[0])

  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const labs = (labsFromData && labsFromData.length ? labsFromData : fallbackLabs)

  const toggleChip = (t) => setChips(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])

  const filtered = useMemo(() => {
    // Visual-only filtering (best-effort)
    let list = [...labs]
    if (q) {
      const s = q.toLowerCase()
      list = list.filter(l =>
        l.name.toLowerCase().includes(s) ||
        (l.services || []).join(' ').toLowerCase().includes(s) ||
        (l.equipment || []).join(' ').toLowerCase().includes(s)
      )
    }
    if (chips.length) {
      list = list.filter(l => chips.every(c => (l.services || []).includes(c)))
    }
    if (location !== 'Any') {
      list = list.filter(l => (l.location || '').toLowerCase().includes(location.toLowerCase()))
    }
    // Price select is UI-only; do a very rough match against dayRate string
    if (price !== 'Any') {
      const numeric = (txt) => Number((txt || '').replace(/[^\d]/g, '')) || 0
      list = list.filter(l => {
        const v = numeric(l.dayRate)
        if (price === '≤ €800/day') return v <= 800
        if (price === '€800–€1,500/day') return v >= 800 && v <= 1500
        if (price === '€1,500+/day') return v >= 1500
        return true
      })
    }
    return list
  }, [labs, q, chips, location, price])

  const onView = (lab) => {
    setSelected(lab)
    setOpen(true)
  }

  const requestLab = (lab) => {
    // Mock action — navigate to confirmation or alert
    navigate('/booking/confirmation')
    // Alternatively: alert('Requested (prototype)')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <span className="hover:underline cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
        <span className="mx-2">/</span>
        <span className="text-primary font-medium">Labs</span>
      </nav>

      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Labs &amp; Facilities</h1>
        <p className="text-gray-600 mt-2">
          Explore university and research labs available for short-term access.
        </p>
      </header>

      {/* Filters (inline UI) */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <input
            className="w-full md:flex-1 border rounded-lg px-3 py-2 text-sm"
            placeholder="Search lab name, capability, equipment…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
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
            const active = chips.includes(t)
            return (
              <button
                key={t}
                onClick={() => toggleChip(t)}
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

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((lab) => (
            <LabCard key={lab.id} lab={lab} onView={onView} />
          ))}
        </div>
      ) : (
        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-600">
          <p>No labs match your current filters.</p>
          <button
            className="mt-3 px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm"
            onClick={() => { setQ(''); setChips([]); setLocation('Any'); setPrice('Any') }}
          >
            Reset filters
          </button>
        </div>
      )}

      {/* Details Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={selected ? selected.name : 'Lab details'}
        footer={
          selected && (
            <div className="flex justify-end gap-2">
              <button className="px-3 py-1.5 rounded-lg border hover:bg-gray-50" onClick={() => setOpen(false)}>Close</button>
              <button className="px-3 py-1.5 rounded-lg bg-primary text-white" onClick={() => selected && requestLab(selected)}>
                Request Lab
              </button>
            </div>
          )
        }
      >
        {selected && (
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-3 gap-3">
              <div><span className="text-gray-500">Rating</span><div className="font-medium">★ {selected.rating ?? '—'}</div></div>
              <div><span className="text-gray-500">Location</span><div className="font-medium">{selected.location ?? '—'}</div></div>
              <div><span className="text-gray-500">Day rate</span><div className="font-medium">{selected.dayRate ?? '€—/day'}</div></div>
            </div>

            <div>
              <span className="text-gray-500">Capabilities</span>
              <div className="mt-1">
                <LabFeatures items={selected.services || []} max={6} />
              </div>
            </div>

            {(selected.equipment && selected.equipment.length > 0) && (
              <div>
                <span className="text-gray-500">Equipment</span>
                <ul className="list-disc list-inside mt-1 text-gray-700">
                  {selected.equipment.map((e) => <li key={e}>{e}</li>)}
                </ul>
              </div>
            )}

            {selected.contactEmail && (
              <div className="text-gray-700">
                <span className="text-gray-500">Contact</span>
                <div className="font-medium">{selected.contactEmail}</div>
              </div>
            )}

            <p className="text-xs text-gray-500">
              Billing model is indicative for prototype.
            </p>
          </div>
        )}
      </Modal>
    </div>
  )
}
