// src/pages/ConsultationHome.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ConsultationHome() {
  const navigate = useNavigate()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <span className="hover:underline cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
        <span className="mx-2">/</span>
        <span className="text-primary font-medium">Consultation</span>
      </nav>

      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Choose how you want to proceed</h1>
        <p className="text-gray-600 mt-2">
          Browse our expert catalogue or answer a quick questionnaire to get matches.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Path A */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#00B7C2]/10 flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" className="text-[#00B7C2]">
                <path d="M21 21l-4-4m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-primary">I know what I need</h3>
              <p className="text-sm text-gray-600 mt-1">
                Explore our expert catalogue with filters for field, location, and price.
              </p>
              <button
                onClick={() => navigate('/dashboard/consultation/browse')}
                className="mt-4 rounded-lg bg-primary text-white px-4 py-2 text-sm hover:opacity-90"
              >
                Browse Experts
              </button>
            </div>
          </div>
        </div>

        {/* Path B */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0A2540]/10 flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" className="text-[#0A2540]">
                <path d="M12 3v18m9-9H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-primary">Help me choose</h3>
              <p className="text-sm text-gray-600 mt-1">
                Answer a short questionnaire and we’ll suggest the best experts for your goal.
              </p>
              <button
                onClick={() => navigate('/dashboard/consultation/questionnaire')}
                className="mt-4 rounded-lg border border-primary text-primary px-4 py-2 text-sm hover:bg-white"
              >
                Start Questionnaire
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
