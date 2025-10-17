// src/pages/LandingPage.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import SearchBar from '../components/SearchBar.jsx'

export default function LandingPage() {
  const navigate = useNavigate()

  const handleSelect = (type, payload) => {
    // Simple routing hint based on selection
    if (type === 'expert') navigate('/dashboard/consultation/browse')
    else if (type === 'lab') navigate('/dashboard/labs')
    else navigate('/how-it-works')
    // Log payload for demo
    // eslint-disable-next-line no-console
    console.log('Selected from search:', type, payload)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <Navbar />

      {/* Hero Section */}
      <section className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight">
              We enable the Fast Forward.
            </h1>
            <p className="mt-4 text-gray-600 text-base md:text-lg">
              Find experts, rent labs, or let AI help you define your next innovation step.
            </p>

            {/* CTA buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="rounded-xl px-4 py-2 bg-primary text-white hover:opacity-90"
              >
                Start Now
              </button>
              <button
                onClick={() => navigate('/dashboard/consultation/browse')}
                className="rounded-xl px-4 py-2 border border-primary text-primary hover:bg-white"
              >
                Explore Experts
              </button>
              <button
                onClick={() => navigate('/dashboard/labs')}
                className="rounded-xl px-4 py-2 border border-primary text-primary hover:bg-white"
              >
                Explore Labs
              </button>
            </div>

            {/* Subtle note */}
            <p className="mt-3 text-xs text-gray-500">
              AI Assistant is in private beta — mock only.
            </p>
          </div>

          {/* Illustration / banner placeholder */}
          <div className="rounded-2xl border border-gray-200 bg-white h-56 md:h-72 shadow-sm flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto rounded-xl bg-neutral mb-3" />
              <p className="text-sm text-gray-500">Abstract product banner (placeholder)</p>
            </div>
          </div>
        </div>

        {/* Central Search */}
        <div className="max-w-7xl mx-auto px-4">
          <SearchBar onSelect={handleSelect} />
        </div>

        {/* How it works */}
        <div className="max-w-7xl mx-auto px-4 mt-12 mb-16 grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-semibold text-primary">1. choose your service</h3>
            <p className="text-sm text-gray-600 mt-2">Consultation or Labs — pick what you need.</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-semibold text-primary">2. book your expert</h3>
            <p className="text-sm text-gray-600 mt-2">Browse or get guided suggestions. Reserve a time.</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-semibold text-primary">3. get recommendations / report</h3>
            <p className="text-sm text-gray-600 mt-2">Receive actionable insights and deliverables.</p>
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between text-sm text-gray-500">
          <span>© {new Date().getFullYear()} AdventIQ</span>
          <div className="flex gap-4">
            <button onClick={() => {}} className="hover:text-primary">Privacy</button>
            <button onClick={() => {}} className="hover:text-primary">Terms</button>
            <button onClick={() => {}} className="hover:text-primary">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
