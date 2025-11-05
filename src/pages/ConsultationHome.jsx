// src/pages/ConsultationHome.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { experts as expertsData } from '../data/mockData.js'

export default function ConsultationHome() {
  const navigate = useNavigate()
  const featuredExperts = Array.isArray(expertsData) ? expertsData.slice(0, 3) : []

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <span className="hover:underline cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
        <span className="mx-2">/</span>
        <span className="text-primary font-medium">Consultation</span>
      </nav>

      <header className="mb-10 space-y-3">
        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
          Fast Consultation
        </span>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
          Get from question to expert time slot in just a few clicks.
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Pick your path below. Every fast consultation highlights the expert&apos;s speciality, rating, and availability so you can commit with confidence.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-6">
        {/* Path A */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#00B7C2]/10 flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" className="text-[#00B7C2]">
                <path d="M21 21l-4-4m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-primary">I know what I need</h3>
              <p className="text-sm text-gray-600 mt-2">
                Jump straight into the expert catalogue, filter by speciality, and compare ratings at a glance.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-500">
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1">★ 4.8+ experts</span>
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1">Detailed profiles</span>
              </div>
              <button
                onClick={() => navigate('/dashboard/consultation/browse')}
                className="mt-5 rounded-lg bg-primary text-white px-4 py-2 text-sm font-semibold hover:opacity-90"
              >
                Browse experts now
              </button>
            </div>
          </div>
        </div>

        {/* Path B */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0A2540]/10 flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" className="text-[#0A2540]">
                <path d="M12 3v18m9-9H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-primary">Help me choose</h3>
              <p className="text-sm text-gray-600 mt-2">
                Answer five quick questions and we&apos;ll shortlist experts with the right expertise and outstanding reviews.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-500">
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1">Guided intake</span>
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1">Human review</span>
              </div>
              <button
                onClick={() => navigate('/dashboard/consultation/questionnaire')}
                className="mt-5 rounded-lg border border-primary text-primary px-4 py-2 text-sm font-semibold hover:bg-white"
              >
                Start questionnaire
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-primary">Compare experts in seconds</h2>
            <p className="text-sm text-gray-600 mt-1 max-w-2xl">
              Every fast consultation card surfaces the expert&apos;s focus area, headline, and live rating so you know why they&apos;re a fit before opening the full profile.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/consultation/browse')}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Open catalogue
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {featuredExperts.map((expert) => (
            <div key={expert.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-primary">{expert.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{expert.headline}</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">
                  ★ {expert.rating}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {(expert.tags || []).map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm text-gray-600 line-clamp-3">{expert.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl md:text-2xl font-semibold text-primary">How the fast consultation flow plays out</h2>
        <ol className="mt-4 space-y-3 text-sm text-gray-700">
          <li className="flex gap-3">
            <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">1</span>
            <div>
              <p className="font-semibold text-gray-900">Choose the right expert</p>
              <p className="text-gray-600 text-sm">Compare expertise highlights and ratings instantly. Open a profile only when you need deeper credentials.</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">2</span>
            <div>
              <p className="font-semibold text-gray-900">Lock the time</p>
              <p className="text-gray-600 text-sm">Pick a preferred slot inside the booking calendar. We show upcoming availability so you can request a meeting in under a minute.</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">3</span>
            <div>
              <p className="font-semibold text-gray-900">Synchronise calendars</p>
              <p className="text-gray-600 text-sm">AdventIQ pings the expert for acceptance and, once confirmed, pushes the session to both calendars automatically.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="text-xl md:text-2xl font-semibold text-primary">Beyond the consultation</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-6">
            <h3 className="text-lg font-semibold text-primary">Labs (Upsell)</h3>
            <p className="mt-2 text-sm text-gray-600">
              Convert insights into experiments. Upgrade to a partnered lab slot once your expert validates the brief. Pricing, facilities, and availability are surfaced side-by-side for a seamless upsell.
            </p>
            <button
              onClick={() => navigate('/dashboard/labs')}
              className="mt-4 inline-flex rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-white"
            >
              Explore lab partners
            </button>
          </div>
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-900">Strategic deliverables (TBD)</h3>
            <p className="mt-2 text-sm text-gray-600">
              Need a report or board-ready presentation without a live call? We&apos;re designing a deliverable-only service for structured outputs on demand. Feature details are to be defined.
            </p>
            <p className="mt-4 text-xs text-gray-500">Register your interest during booking so we can prioritise the roadmap.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
