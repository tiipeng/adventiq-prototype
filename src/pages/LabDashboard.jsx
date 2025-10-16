// /src/pages/LabDashboard.jsx
import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import Card from '../components/Card.jsx'
import Modal from '../components/Modal.jsx'
import { bookings } from '../mockData.js'

function LabHome() {
  return (
    <div className="p-4 space-y-4">
      <Card>
        <h3 className="font-semibold text-primary mb-2">pending booking approvals</h3>
        <ul className="text-sm text-gray-700 space-y-2">
          {bookings.map(b => (
            <li key={b.id} className="flex items-center justify-between">
              <span>{b.id} — {b.target} — {b.date} — {b.status}</span>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg border hover:bg-neutral">Reject</button>
                <button className="px-3 py-1.5 rounded-lg bg-primary text-white">Approve</button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

function Facilities() {
  const [items, setItems] = useState([
    { id: 1, name: 'SEM (Scanning Electron Microscope)', status: 'Online' },
    { id: 2, name: '3D Printer — SLA', status: 'Maintenance' },
    { id: 3, name: 'Environmental Chamber', status: 'Online' },
  ])
  const [edit, setEdit] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [newFac, setNewFac] = useState({ name: '', status: 'Online' })

  const startEdit = (id) => setEdit(id)
  const commitEdit = (id, name, status) => {
    setItems(prev => prev.map(i => i.id === id ? ({ ...i, name, status }) : i))
    setEdit(null)
  }
  const addFacility = () => {
    if (!newFac.name.trim()) return
    setItems(prev => [...prev, { id: Date.now(), ...newFac }])
    setNewFac({ name: '', status: 'Online' })
    setModalOpen(false)
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-primary">facilities</h3>
        <button className="px-3 py-1.5 rounded-lg border hover:bg-neutral" onClick={() => setModalOpen(true)}>
          Add facility
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {items.map(f => (
          <Card key={f.id} className="p-4">
            {edit === f.id ? (
              <div className="space-y-3">
                <input
                  className="w-full border rounded-lg px-3 py-2"
                  defaultValue={f.name}
                  onChange={e => (f._tmpName = e.target.value)}
                />
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  defaultValue={f.status}
                  onChange={e => (f._tmpStatus = e.target.value)}
                >
                  <option>Online</option>
                  <option>Maintenance</option>
                  <option>Offline</option>
                </select>
                <div className="flex gap-2 justify-end">
                  <button className="px-3 py-1.5 rounded-lg border" onClick={() => setEdit(null)}>Cancel</button>
                  <button
                    className="px-3 py-1.5 rounded-lg bg-primary text-white"
                    onClick={() =>
                      commitEdit(
                        f.id,
                        f._tmpName ?? f.name,
                        f._tmpStatus ?? f.status
                      )
                    }
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-primary">{f.name}</h4>
                    <p className="text-sm text-gray-600">Status: {f.status}</p>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg border hover:bg-neutral" onClick={() => startEdit(f.id)}>
                    Edit
                  </button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add facility">
        <div className="space-y-3">
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Facility name"
            value={newFac.name}
            onChange={e => setNewFac(v => ({ ...v, name: e.target.value }))}
          />
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={newFac.status}
            onChange={e => setNewFac(v => ({ ...v, status: e.target.value }))}
          >
            <option>Online</option>
            <option>Maintenance</option>
            <option>Offline</option>
          </select>
          <div className="text-right">
            <button className="px-3 py-1.5 rounded-lg bg-primary text-white" onClick={addFacility}>
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

function Bookings() {
  return (
    <div className="p-4">
      <Card>
        <h3 className="font-semibold text-primary mb-2">bookings</h3>
        <p className="text-sm text-gray-600">Overview of lab bookings (placeholder).</p>
      </Card>
    </div>
  )
}

function Reports() {
  return (
    <div className="p-4">
      <Card>
        <h3 className="font-semibold text-primary mb-2">reports</h3>
        <p className="text-sm text-gray-600">Upload & manage lab reports (UI only).</p>
      </Card>
    </div>
  )
}

export default function LabDashboard() {
  const items = [
    { label: 'Dashboard', to: '/dashboard/lab' },
    { label: 'Facilities', to: '/dashboard/lab/facilities' },
    { label: 'Bookings', to: '/dashboard/lab/bookings' },
    { label: 'Reports', to: '/dashboard/lab/reports' },
  ]

  return (
    <div className="flex">
      <Sidebar items={items} />
      <div className="flex-1">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route index element={<LabHome />} />
            <Route path="facilities" element={<Facilities />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="reports" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
