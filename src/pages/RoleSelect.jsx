import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card.jsx'

const RoleCard = ({title, desc, to}) => (
  <Card className="p-6 hover:shadow-md transition-shadow">
    <div className="h-24 rounded-xl bg-neutral mb-4"></div>
    <h3 className="text-lg font-semibold text-primary">{title}</h3>
    <p className="text-sm text-gray-600 mt-1">{desc}</p>
    <Link to={to} className="inline-block mt-4 px-3 py-1.5 rounded-lg bg-primary text-white">Enter Dashboard</Link>
  </Card>
)

export default function RoleSelect() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-primary mb-6">choose your role</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <RoleCard title="Business User" desc="Book experts and labs, track reports." to="/dashboard/business" />
        <RoleCard title="Expert" desc="Manage availability & consulting requests." to="/dashboard/expert" />
        <RoleCard title="Lab" desc="Show facilities and approve bookings." to="/dashboard/lab" />
      </div>
    </div>
  )
}
