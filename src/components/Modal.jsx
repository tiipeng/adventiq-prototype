import React from 'react'

export default function Modal({open, onClose, title, children}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-lg max-w-lg w-full mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg text-primary">{title}</h3>
          <button onClick={onClose} className="px-2 py-1 rounded hover:bg-neutral">✕</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
