// /src/pages/Admin.jsx
import React, { useState } from 'react'
import Card from '../components/Card.jsx'

const usersSeed = [
  { id: 1, name: 'Alice Bauer', email: 'alice@acme.com', role: 'Business' },
  { id: 2, name: 'Dr. Jane Doe', email: 'jane@aimaterials.lab', role: 'Expert' },
  { id: 3, name: 'ETH Zürich Lab', email: 'contact@ethz.ch', role: 'Lab' },
]

const expertsSeed = [
  { id: 11, name: 'Dr. Jane Doe', field: 'AI Materials', rate: '€250/h', rating: '★ 4.8' },
  { id: 12, name: 'Prof. Alan Smith', field: 'Battery Tech', rate: '€220/h', rating: '★ 4.6' },
]

const labsSeed = [
  { id: 21, name: 'AI Materials Lab', location: 'TU Berlin', facilities: 'SEM, 3D Printer' },
  { id: 22, name: 'Battery Testing Lab', location: 'ETH Zürich', facilities: 'Cyclers, Env. Chamber' },
]

export default function Admin() {
  const [tab, setTab] = useState('users')

  const Tab = ({ id, children }) => (
    <button
      onClick={() => setTab(id)}
      className={`px-3 py-1.5 rounded-lg border text-sm ${
        tab === id ? 'bg-primary text-white' : 'hover:bg-neutral'
      }`}
    >
      {children}
    </button>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-4">
      <div className="flex gap-2">
        <Tab id="users">Users</Tab>
        <Tab id="experts">Experts</Tab>
        <Tab id="labs">Labs</Tab>
      </div>

      <Card>
        {tab === 'users' && (
          <div className="overflow-x-auto">
            <h3 className="font-semibold text-primary mb-3">users</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left bg-neutral">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Role</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersSeed.map(u => (
                  <tr key={u.id} className="border-b">
                    <td className="p-2">{u.name}</td>
                    <td className="p-2">{u.email}</td>
                    <td className="p-2">{u.role}</td>
                    <td className="p-2">
                      <button className="px-2 py-1 rounded border hover:bg-neutral">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'experts' && (
          <div className="overflow-x-auto">
            <h3 className="font-semibold text-primary mb-3">experts</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left bg-neutral">
                  <th className="p-2">Name</th>
                  <th className="p-2">Field</th>
                  <th className="p-2">Rate</th>
                  <th className="p-2">Rating</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expertsSeed.map(e => (
                  <tr key={e.id} className="border-b">
                    <td className="p-2">{e.name}</td>
                    <td className="p-2">{e.field}</td>
                    <td className="p-2">{e.rate}</td>
                    <td className="p-2">{e.rating}</td>
                    <td className="p-2">
                      <button className="px-2 py-1 rounded border hover:bg-neutral">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'labs' && (
          <div className="overflow-x-auto">
            <h3 className="font-semibold text-primary mb-3">labs</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left bg-neutral">
                  <th className="p-2">Name</th>
                  <th className="p-2">Location</th>
                  <th className="p-2">Facilities</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {labsSeed.map(l => (
                  <tr key={l.id} className="border-b">
                    <td className="p-2">{l.name}</td>
                    <td className="p-2">{l.location}</td>
                    <td className="p-2">{l.facilities}</td>
                    <td className="p-2">
                      <button className="px-2 py-1 rounded border hover:bg-neutral">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <p className="text-xs text-gray-500">
        Prototype only — all actions are disabled.
      </p>
    </div>
  )
}
