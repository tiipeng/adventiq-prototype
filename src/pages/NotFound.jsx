// src/pages/NotFound.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-primary">Page not found</h1>
      <p className="mt-2 text-gray-600">The page you’re looking for doesn’t exist in this prototype.</p>
      <button
        onClick={() => navigate('/')}
        className="mt-5 rounded-lg px-4 py-2 bg-primary text-white hover:opacity-90"
      >
        Back to home
      </button>
    </div>
  )
}
