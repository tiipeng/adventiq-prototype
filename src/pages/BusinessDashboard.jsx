// /src/pages/BusinessDashboard.jsx
import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import Card from '../components/Card.jsx'
import Modal from '../components/Modal.jsx'
import { bookings } from '../mockData.js'

function Overview() {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-4 space-y-4">
      <Card>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-primary">ongoing bookings</h3>
          <button
            onClick={() => setOpen(true)}
            className="rounded-lg px-3 py-1.5 bg-primary text-white hover:opacity-90"
          >
            Start new booking
          </button>
        </div>
        <ul className="mt-3 text-sm text-gray-600 list-disc list-inside">
          {bookings.map(b => (
            <li key={b.id}>
              {b.id} — {b.type} with {b.target} — {b.status}
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h3 className="font-semibold text-primary mb-2">quick links</h3>
        <div className="flex gap-3">
          <Link
            to="/booking"
            className="rounded-lg px-3 py-1.5 border border-primary text-primary hover:bg-neutral"
          >
            Book Consultation
          </Link>
          <Link
            to="/reports"
            className="rounded-lg px-3 py-1.5 border border-primary text-primary hover:bg-neutral"
          >
            My Reports
          </Link>
        </div>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Start booking">
        <p className="text-sm text-gray-600">
          This opens the guided booking flow (UI-only).
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <Link
            to="/booking"
            className="rounded-lg px-3 py-1.5 bg-primary text-white"
            onClick={() => setOpen(false)}
          >
            Go
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-1.5 border hover:bg-neutral"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  )
}

function MyBookings() {
  return (
    <div className="p-4">
      <Card>
        <h3 className="font-semibold text-primary mb-3">my bookings</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left bg-neutral">
                <th className="p-2">Expert/Lab</th>
                <th className="p-2">Date</th>
                <th className="p-2">Status</th>
                <th className="p-2">Report</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id} className="border-b">
                  <td className="p-2">{b.target}</td>
                  <td className="p-2">{b.date}</td>
                  <td className="p-2">{b.status}</td>
                  <td className="p-2">{b.report || '-'}</td>
                  <td className="p-2">
                    <button className="text-primary hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

function Reports() {
  return (
    <div className="p-4">
      <Card>
        <h3 className="font-semibold text-primary mb-3">my reports</h3>
        <p className="text-sm text-gray-600">Access final deliverables here (mock).</p>
      </Card>
    </div>
  )
}

export default function BusinessDashboard() {
  const items = [
    { label: 'Dashboard', to: '/dashboard/business' },
    { label: 'Book Consultation', to: '/dashboard/business/book' },
    { label: 'My Bookings', to: '/dashboard/business/bookings' },
    { label: 'My Reports', to: '/dashboard/business/reports' },
    { label: 'Settings', to: '/dashboard/business/settings' },
  ]

  return (
    <div className="flex">
      <Sidebar items={items} />
      <div className="flex-1">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="book" element={<Overview />} />
            <Route path="bookings" element={<MyBookings />} />
            <Route path="reports" element={<Reports />} />
            <Route
              path="settings"
              element={
                <div className="p-4">
                  <Card><p>Settings (placeholder)</p></Card>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  )
}
