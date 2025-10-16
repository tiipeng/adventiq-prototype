import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl font-bold text-primary mb-2">Page not found</h2>
      <p className="text-gray-600 mb-4">The page you are looking for might have been moved or deleted.</p>
      <Link to="/" className="rounded-lg px-3 py-1.5 bg-primary text-white">Back to Home</Link>
    </div>
  )
}
