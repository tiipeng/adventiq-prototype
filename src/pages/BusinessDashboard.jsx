// src/pages/BusinessDashboard.jsx
import React from 'react'

export default function BusinessDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-primary">Business Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Quick links to Consultation &amp; Labs will go here.
      </p>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-semibold text-primary">Start Expert Consultation</h3>
          <p className="text-sm text-gray-600 mt-2">Browse or get guided suggestions.</p>
          <a href="/#/dashboard/consultation" className="inline-block mt-3 text-sm rounded-lg px-3 py-1.5 bg-primary text-white">
            Open (mock)
          </a>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-semibold text-primary">Explore Labs</h3>
          <p className="text-sm text-gray-600 mt-2">Find equipment &amp; facilities.</p>
          <a href="/#/dashboard/labs" className="inline-block mt-3 text-sm rounded-lg px-3 py-1.5 border border-primary text-primary">
            Open (mock)
          </a>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-semibold text-primary">My Reports</h3>
          <p className="text-sm text-gray-600 mt-2">View previous outcomes.</p>
          <button className="mt-3 text-sm rounded-lg px-3 py-1.5 border">Open</button>
        </div>
      </div>
    </div>
  )
}
