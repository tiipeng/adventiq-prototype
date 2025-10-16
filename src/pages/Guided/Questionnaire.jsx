// /src/pages/Guided/Questionnaire.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/Card.jsx'

export default function Questionnaire() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Card className="p-6">
        <h2 className="text-xl font-bold text-primary mb-4">help us understand your need</h2>
        <div className="grid gap-3">
          <input className="border rounded-lg px-3 py-2" placeholder="What is your challenge?" />
          <input className="border rounded-lg px-3 py-2" placeholder="Discipline (e.g., chemistry, materials)" />
          <input className="border rounded-lg px-3 py-2" placeholder="Country / City preference" />
          <input className="border rounded-lg px-3 py-2" placeholder="Budget (e.g., €1500)" />
          <textarea className="border rounded-lg px-3 py-2" rows="4" placeholder="Describe the context / desired outcomes" />
        </div>
        <div className="text-right mt-4">
          <Link to="/suggested-experts" className="px-3 py-1.5 rounded-lg bg-primary text-white">See suggested experts</Link>
        </div>
      </Card>
    </div>
  )
}
