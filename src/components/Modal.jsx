// src/components/Modal.jsx
import React, { useEffect } from 'react'

export default function Modal({ open, onClose, title, children, footer }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose && onClose()
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/30"
        onClick={() => onClose && onClose()}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-xl mx-auto mt-24 bg-white rounded-2xl border border-gray-200 shadow-xl">
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-semibold text-primary">{title}</h3>
          <button
            onClick={() => onClose && onClose()}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="px-5 py-4">
          {children}
        </div>
        {footer && (
          <div className="px-5 py-3 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
