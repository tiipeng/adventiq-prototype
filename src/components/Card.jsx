// /src/components/Card.jsx
import React from 'react'

export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl border border-neutral shadow-sm p-4 ${className}`}>
      {children}
    </div>
  )
}
