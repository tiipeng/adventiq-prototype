// /src/components/Filters.jsx
import React from 'react'

export default function Filters({values, onChange, compact=false}) {
  const set = (k) => (e) => onChange({...values, [k]: e.target.value})
  return (
    <div className={`grid ${compact?'grid-cols-2':'grid-cols-4'} gap-3`}>
      <input className="border rounded-lg px-3 py-2" placeholder="Discipline / field" value={values.discipline||''} onChange={set('discipline')} />
      <input className="border rounded-lg px-3 py-2" placeholder="Task (e.g., chemical analysis)" value={values.task||''} onChange={set('task')} />
      <input className="border rounded-lg px-3 py-2" placeholder="Country" value={values.country||''} onChange={set('country')} />
      <input className="border rounded-lg px-3 py-2" placeholder="City/Region" value={values.city||''} onChange={set('city')} />
    </div>
  )
}
