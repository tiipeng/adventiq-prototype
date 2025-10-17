// src/components/CalendarMock.jsx
import React, { useMemo, useState } from 'react'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default function CalendarMock({ value, onChange }) {
  const today = new Date()
  const [monthOffset, setMonthOffset] = useState(0)

  const view = useMemo(() => {
    const base = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1)
    const year = base.getFullYear()
    const month = base.getMonth()
    // Make a simple 7x5 grid with 1..28/30/31, no leading blanks to keep it simple
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const cells = Array.from({ length: 35 }).map((_, i) => i + 1 <= daysInMonth ? i + 1 : null)
    return { year, month, cells }
  }, [today, monthOffset])

  const isSelected = (d) => {
    if (!value || !d) return false
    const [y, m, day] = value.date.split('-').map(Number)
    return y === view.year && (m - 1) === view.month && day === d
  }

  const format = (y, m, d) => {
    const mm = String(m + 1).padStart(2, '0')
    const dd = String(d).padStart(2, '0')
    return `${y}-${mm}-${dd}`
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          className="w-8 h-8 rounded-lg border hover:bg-gray-50"
          onClick={() => setMonthOffset(o => o - 1)}
          aria-label="Previous month"
        >
          ‹
        </button>
        <div className="text-sm font-medium text-primary">
          {MONTHS[view.month]} {view.year}
        </div>
        <button
          className="w-8 h-8 rounded-lg border hover:bg-gray-50"
          onClick={() => setMonthOffset(o => o + 1)}
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-2">
        {view.cells.map((d, idx) => {
          const disabled = d === null
          const active = !disabled && isSelected(d)
          const isToday =
            view.year === today.getFullYear() &&
            view.month === today.getMonth() &&
            d === today.getDate()

        return (
          <button
            key={idx}
            disabled={disabled}
            onClick={() => !disabled && onChange && onChange({ date: format(view.year, view.month, d) })}
            className={`h-10 rounded-lg border text-sm ${
              disabled ? 'opacity-20 cursor-default' :
              active ? 'bg-primary text-white border-primary' :
              'hover:bg-gray-50'
            } ${isToday && !active ? 'ring-1 ring-accent' : ''}`}
            aria-pressed={active}
          >
            {d || ''}
          </button>
        )})}
      </div>
    </div>
  )
}
