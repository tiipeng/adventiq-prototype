import React from 'react'

export default function CalendarMock({selected, setSelected}) {
  const days = Array.from({length: 30}, (_, i) => i + 1)
  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map(d => (
        <button
          key={d}
          onClick={() => setSelected(d)}
          className={`aspect-square rounded-lg border ${selected===d? 'bg-accent text-white border-accent' : 'hover:bg-neutral'}`}
        >
          {d}
        </button>
      ))}
    </div>
  )
}
