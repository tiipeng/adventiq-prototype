// /src/pages/Landing.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card.jsx'

export default function Landing() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          {/* Logo + Slogan */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary" aria-hidden="true" />
            <span className="font-bold text-2xl text-primary">AdventIQ</span>
          </div>

          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-primary leading-tight">
            We enable the Fast Forward.
          </h1>

          <p className="mt-4 text-gray-600">
            AdventIQ connects companies with experts and advanced research labs — bridging science and industry.
            Fast. Smart. Affordable.
          </p>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/booking"
              className="rounded-xl px-4 py-2 bg-primary text-white hover:opacity-90 transition"
            >
              Start Expert Consultation
            </Link>
            <Link
              to="/dashboard/lab"
              className="rounded-xl px-4 py-2 border border-primary text-primary hover:bg-neutral transition"
            >
              Explore Labs
            </Link>
          </div>

          {/* AI placeholder */}
          <p className="mt-3 text-xs text-gray-500">
            AI-powered recommendations — <span className="italic">coming soon</span>.
          </p>
        </div>

        {/* Visual placeholder card */}
        <Card className="p-8">
          <div className="h-48 rounded-xl bg-neutral mb-4" />
          <p className="text-sm text-gray-600">
            Prototype preview (placeholder for future product shots)
          </p>
        </Card>
      </section>

      {/* About */}
      <section id="about" className="bg-neutral">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-primary mb-2">about</h2>
          <p className="text-gray-700">
            AdventIQ accelerates innovation cycles by productizing expert consultations and enabling access to
            underutilized lab infrastructure. Clean, minimal, and trustworthy by design.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">
        <Card>
          <h3 className="font-semibold text-primary">1. describe your challenge</h3>
          <p className="text-sm text-gray-600 mt-2">Submit your brief in minutes.</p>
        </Card>
        <Card>
          <h3 className="font-semibold text-primary">2. match with experts & labs</h3>
          <p className="text-sm text-gray-600 mt-2">See curated options instantly.</p>
        </Card>
        <Card>
          <h3 className="font-semibold text-primary">3. book, collaborate, deliver</h3>
          <p className="text-sm text-gray-600 mt-2">Pay easily, get your report.</p>
        </Card>
      </section>
    </div>
  )
}