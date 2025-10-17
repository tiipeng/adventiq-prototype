// src/pages/HowItWorks.jsx
import React from 'react'

export default function HowItWorks() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-primary">How It Works</h1>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-semibold text-primary">1. Choose a service</h3>
          <p className="text-sm text-gray-600 mt-2">Consultation or Lab access.</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-semibold text-primary">2. Book your expert</h3>
          <p className="text-sm text-gray-600 mt-2">Pick a time and confirm.</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-semibold text-primary">3. Get recommendations</h3>
          <p className="text-sm text-gray-600 mt-2">Actionable insights &amp; reports.</p>
        </div>
      </div>
    </div>
  )
}
