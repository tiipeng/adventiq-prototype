// src/pages/ExpertDashboard.jsx
import React from 'react'

export default function ExpertDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-primary">Expert Dashboard</h1>
      <p className="mt-2 text-gray-600">Manage requests, availability, and reports (UI only).</p>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-semibold text-primary">Requests</h3>
          <p className="text-sm text-gray-600 mt-2">Accept / Reject (mock).</p>
          <button className="mt-3 text-sm rounded-lg px-3 py-1.5 border">Open</button>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-semibold text-primary">Availability</h3>
          <p className="text-sm text-gray-600 mt-2">Calendar (mock).</p>
          <button className="mt-3 text-sm rounded-lg px-3 py-1.5 border">Open</button>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-semibold text-primary">Reports</h3>
          <p className="text-sm text-gray-600 mt-2">Upload placeholder.</p>
          <button className="mt-3 text-sm rounded-lg px-3 py-1.5 border">Open</button>
        </div>
      </div>
    </div>
  )
}
