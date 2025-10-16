// /src/pages/Checkout.jsx
import React from 'react'
import Card from '../components/Card.jsx'

export default function Checkout() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Card className="p-6">
        <h2 className="text-xl font-bold text-primary mb-4">payment</h2>
        <div className="grid md:grid-cols-3 gap-3">
          <input className="border rounded-lg p-2" placeholder="Card number" />
          <input className="border rounded-lg p-2" placeholder="MM/YY" />
          <input className="border rounded-lg p-2" placeholder="CVC" />
        </div>
        <p className="text-xs text-gray-500 mt-2">Prototype only — no real charge.</p>
        <div className="text-right mt-4">
          <a href="/#/confirmation" className="px-3 py-1.5 rounded-lg bg-primary text-white">Pay & confirm</a>
        </div>
      </Card>
    </div>
  )
}
