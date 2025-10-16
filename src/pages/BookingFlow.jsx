// /src/pages/BookingFlow.jsx
import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Card from '../components/Card.jsx'
import CalendarMock from '../components/CalendarMock.jsx'
import { experts } from '../mockData.js'

function StepLayout({ children, onNext, onBack, step, total = 5 }) {
  return (
    <Card className="max-w-3xl mx-auto my-6">
      <p className="text-xs text-gray-500 mb-3">Step {step} / {total}</p>
      {children}
      <div className="mt-6 flex justify-between">
        <button onClick={onBack} className="px-3 py-1.5 rounded-lg border hover:bg-neutral">Back</button>
        <button onClick={onNext} className="px-3 py-1.5 rounded-lg bg-primary text-white hover:opacity-90">Next</button>
      </div>
    </Card>
  )
}

function Step1() {
  const nav = useNavigate()
  return (
    <StepLayout step={1} onNext={() => nav('/#/booking/step-2')} onBack={() => nav(-1)}>
      <h3 className="font-semibold text-primary text-lg mb-2">Describe your problem</h3>
      <textarea className="w-full border rounded-lg p-3" rows="6" placeholder="Tell us about your challenge..."></textarea>
      <p className="text-xs text-gray-500 mt-2">This is a prototype. No data is saved.</p>
    </StepLayout>
  )
}

function Step2() {
  const nav = useNavigate()
  const [selected, setSelected] = useState(null)
  return (
    <StepLayout step={2} onNext={() => nav('/#/booking/step-3')} onBack={() => nav('/#/booking/step-1')}>
      <h3 className="font-semibold text-primary text-lg mb-3">Select an expert</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {experts.map(e => (
          <Card
            key={e.id}
            className={`hover:shadow-md transition-shadow cursor-pointer ${selected === e.id ? 'ring-2 ring-accent' : ''}`}
            onClick={() => setSelected(e.id)}
          >
            <div className="flex items-center gap-3">
              <img src={e.photo} alt={e.name} className="w-16 h-16 rounded-lg" />
              <div>
                <p className="font-semibold text-primary">{e.name}</p>
                <p className="text-sm text-gray-600">{e.expertise}</p>
                <p className="text-sm text-gray-600">€{e.price}/h — ★{e.rating}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">Click a card to select. Proceed to time slot.</p>
    </StepLayout>
  )
}

function Step3() {
  const nav = useNavigate()
  const [selected, setSelected] = useState(null)
  return (
    <StepLayout step={3} onNext={() => nav('/#/booking/step-4')} onBack={() => nav('/#/booking/step-2')}>
      <h3 className="font-semibold text-primary text-lg mb-3">Choose a time slot</h3>
      <CalendarMock selected={selected} setSelected={setSelected} />
      <p className="text-xs text-gray-500 mt-2">Pick any date to continue (UI only).</p>
    </StepLayout>
  )
}

function Step4() {
  const nav = useNavigate()
  return (
    <StepLayout step={4} onNext={() => nav('/#/booking/step-5')} onBack={() => nav('/#/booking/step-3')}>
      <h3 className="font-semibold text-primary text-lg mb-3">Mock payment</h3>
      <div className="grid md:grid-cols-3 gap-3">
        <input className="border rounded-lg p-2" placeholder="Card number" />
        <input className="border rounded-lg p-2" placeholder="MM/YY" />
        <input className="border rounded-lg p-2" placeholder="CVC" />
      </div>
      <p className="text-xs text-gray-500 mt-2">Prototype only. No real payment.</p>
    </StepLayout>
  )
}

function Step5() {
  return (
    <Card className="max-w-3xl mx-auto my-6">
      <h3 className="font-semibold text-primary text-lg mb-3">Booking confirmed</h3>
      <p className="text-sm text-gray-600">Your consultation is scheduled. A summary will appear in your reports.</p>
      <div className="mt-4 p-4 rounded-xl border">
        <p className="text-sm">Summary (mock): Dr. Jane Doe — 60 min — 03 Nov 2025</p>
      </div>
    </Card>
  )
}

export default function BookingFlow() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <Routes>
        <Route index element={<Step1 />} />
        <Route path="step-1" element={<Step1 />} />
        <Route path="step-2" element={<Step2 />} />
        <Route path="step-3" element={<Step3 />} />
        <Route path="step-4" element={<Step4 />} />
        <Route path="step-5" element={<Step5 />} />
      </Routes>
    </div>
  )
}
