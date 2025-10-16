// /src/pages/ExpertDashboard.jsx
import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import Card from '../components/Card.jsx'
import Modal from '../components/Modal.jsx'
import { bookings } from '../mockData.js'

function ExpertHome() {
  const [openAvail, setOpenAvail] = useState(false)

  return (
    <div className="p-4 space-y-4">
      {/* Pending booking requests */}
      <Card>
        <h3 className="font-semibold text-primary mb-3">pending booking requests</h3>
        <ul className="text-sm text-gray-700 space-y-2">
          {bookings.map(b => (
            <li key={b.id} className="flex items-center justify-between">
              <span>{b.id} — {b.type} — {b.date} — {b.status}</span>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg border hover:bg-neutral">Reject</button>
                <button
                  className="px-3 py-1.5 rounded-lg bg-primary text-white"
                  onClick={() => setOpenAvail(true)}
                >
                  Accept
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {/* Availability preview */}
      <Card>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-primary">availability</h3>
          <button
            className="px-3 py-1.5 rounded-lg border hover:bg-neutral"
            onClick={() => setOpenAvail(true)}
          >
            Add Availability
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left bg-neutral">
                <th className="p-2">Date</th>
                <th className="p-2">Start</th>
                <th className="p-2">End</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">2025-10-28</td>
                <td className="p-2">09:00</td>
                <td className="p-2">12:00</td>
                <td className="p-2">Open</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">2025-11-03</td>
                <td className="p-2">13:00</td>
                <td className="p-2">16:00</td>
                <td className="p-2">Open</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Upload report placeholder */}
      <Card>
        <h3 className="font-semibold text-primary mb-2">upload report</h3>
        <div className="flex flex-wrap gap-2">
          <input type="file" disabled className="border rounded-lg px-3 py-2 opacity-60 cursor-not-allowed" />
          <button className="px-3 py-1.5 rounded-lg bg-primary text-white opacity-60 cursor-not-allowed">
            Upload
          </button>
          <p className="text-xs text-gray-500">UI only — disabled in prototype.</p>
        </div>
      </Card>

      {/* Add Availability modal (UI only) */}
      <Modal open={openAvail} onClose={() => setOpenAvail(false)} title="Add Availability">
        <div className="grid grid-cols-2 gap-3">
          <input className="border rounded-lg px-2 py-1" placeholder="Date (YYYY-MM-DD)" />
          <input className="border rounded-lg px-2 py-1" placeholder="Start (HH:MM)" />
          <input className="border rounded-lg px-2 py-1" placeholder="End (HH:MM)" />
          <select className="border rounded-lg px-2 py-1">
            <option>Open</option>
            <option>Busy</option>
          </select>
        </div>
        <div className="mt-4 text-right">
          <button className="px-3 py-1.5 rounded-lg bg-primary text-white">Save</button>
        </div>
      </Modal>
    </div>
  )
}

function AvailabilityPage() {
  return (
    <div className="p-4">
      <Card>
        <h3 className="font-semibold text-primary mb-3">availability (table)</h3>
        <p className="text-sm text-gray-600">Manage your time slots (static UI).</p>
      </Card>
    </div>
  )
}

function BookingsPage() {
  return (
    <div className="p-4">
      <Card>
        <h3 className="font-semibold text-primary mb-3">bookings</h3>
        <p className="text-sm text-gray-600">List of your accepted bookings (placeholder).</p>
      </Card>
    </div>
  )
}

function ReportsPage() {
  return (
    <div className="p-4">
      <Card>
        <h3 className="font-semibold text-primary mb-3">reports</h3>
        <p className="text-sm text-gray-600">Upload and manage reports (UI only).</p>
      </Card>
    </div>
  )
}

export default function ExpertDashboard() {
  const items = [
    { label: 'Dashboard', to: '/dashboard/expert' },
    { label: 'Availability', to: '/dashboard/expert/availability' },
    { label: 'Bookings', to: '/dashboard/expert/bookings' },
    { label: 'Reports', to: '/dashboard/expert/reports' },
  ]

  return (
    <div className="flex">
      <Sidebar items={items} />
      <div className="flex-1">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route index element={<ExpertHome />} />
            <Route path="availability" element={<AvailabilityPage />} />
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="reports" element={<ReportsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
