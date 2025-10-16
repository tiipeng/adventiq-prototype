// /src/components/AvailabilityCalendar.jsx
import React, {useState} from 'react'
import CalendarMock from './CalendarMock.jsx'
export default function AvailabilityCalendar() {
  const [day, setDay] = useState(null)
  return (
    <div>
      <div className="flex items-center gap-2 mb-2 text-xs">
        <span className="inline-block w-3 h-3 rounded bg-accent" /> <span>Available</span>
        <span className="inline-block w-3 h-3 rounded bg-neutral ml-4" /> <span>Other</span>
      </div>
      <CalendarMock selected={day} setSelected={setDay} />
      <p className="text-xs text-gray-500 mt-2">Select a day to continue (prototype).</p>
    </div>
  )
}
