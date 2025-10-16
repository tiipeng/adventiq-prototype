// /src/pages/Reports.jsx
import React, { useState } from 'react'
import Card from '../components/Card.jsx'
import Modal from '../components/Modal.jsx'

export default function Reports() {
  const [open, setOpen] = useState(false)

  const items = [
    { id: 1, name: 'Consultation Summary', owner: 'Dr. Jane Doe', date: '2025-10-10' },
    { id: 2, name: 'Lab Results Overview', owner: 'AI Materials Lab', date: '2025-11-02' },
    { id: 3, name: 'Battery Test Findings', owner: 'Prof. Alan Smith', date: '2025-11-12' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Card>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-primary">reports</h3>
          <button
            onClick={() => setOpen(true)}
            className="px-3 py-1.5 rounded-lg border hover:bg-neutral"
          >
            Open example
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left bg-neutral">
                <th className="p-2">Report name</th>
                <th className="p-2">Expert/Lab</th>
                <th className="p-2">Date</th>
                <th className="p-2">Download</th>
              </tr>
            </thead>
            <tbody>
              {items.map(r => (
                <tr key={r.id} className="border-b">
                  <td className="p-2">{r.name}</td>
                  <td className="p-2">{r.owner}</td>
                  <td className="p-2">{r.date}</td>
                  <td className="p-2">
                    <button className="opacity-40 cursor-not-allowed">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Consultation Summary">
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Client:</strong> ACME Energy</p>
          <p><strong>Expert:</strong> Dr. Jane Doe (AI Materials Lab)</p>
          <p><strong>Date:</strong> 10 Oct 2025</p>
          <hr className="my-2" />
          <p>Your consultation with Dr. Jane Doe resulted in 3 key insights:</p>
          <ol className="list-decimal list-inside">
            <li>Candidate material composites show 12–18% efficiency gains in predictive models.</li>
            <li>Lab validation requires 2–3 sessions (SEM + environmental chamber).</li>
            <li>Recommended pilot: 4-week sprint with weekly reviews.</li>
          </ol>
          <p className="text-xs text-gray-500 mt-2">Prototype only — downloads are disabled.</p>
        </div>
      </Modal>
    </div>
  )
}
