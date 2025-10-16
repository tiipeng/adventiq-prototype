// /src/pages/Confirmation.jsx
import React from 'react'
import Card from '../components/Card.jsx'

export default function Confirmation() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Card className="p-6">
        <h2 className="text-xl font-bold text-primary mb-2">booking confirmed</h2>
        <p className="text-sm text-gray-600">You’ll receive a confirmation and the AdventIQ Leader will monitor delivery and report milestones.</p>
        <div className="mt-4 p-4 rounded-xl border">
          <p className="text-sm">Summary (mock): Expert/Lab · Date/Time · Duration · Price</p>
        </div>
      </Card>
    </div>
  )
}
