// src/pages/LandingPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleSelect = (type, payload) => {
    if (type === "expert") navigate("/dashboard/consultation/browse");
    else if (type === "lab") navigate("/dashboard/labs");
    else navigate("/how-it-works");

    console.log("Selected from search:", type, payload);
  };

  // ---------------------------
  // ✅ Language Switcher Placeholder
  // ---------------------------
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "EN");
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] relative">
      {/* ✅ Language Switcher at Top Right */}
      <div className="absolute top-4 right-4">
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm"
        >
          <option value="EN">EN</option>
          <option value="DE">DE</option>
          <option value="PL">PL</option>
        </select>
      </div>

      {/* Hero Section */}
      <section className="flex-1">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-indigo-100 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 md:py-24">
            <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
              <div className="space-y-6">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  Fast Consulting for innovators
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                  Accelerate product decisions with on-demand experts.
                </h1>
                <p className="text-lg text-gray-600">
                  Match with vetted consultants in R&D, regulatory, and go-to-market specialties.
                  Bring your project to life faster with guided sessions, actionable next steps,
                  and curated laboratory access when you need it.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate("/dashboard/consultation")}
                    className="rounded-xl px-5 py-3 bg-primary text-white font-semibold shadow-sm hover:opacity-90 transition"
                    type="button"
                  >
                    Start Fast Consulting
                  </button>
                  <button
                    onClick={() => navigate("/how-it-works")}
                    className="rounded-xl px-5 py-3 border border-primary text-primary font-semibold hover:bg-white transition"
                    type="button"
                  >
                    See How It Works
                  </button>
                </div>
                <div className="grid gap-4 sm:grid-cols-3 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">48h</p>
                    <p className="text-sm text-gray-500">Average time from request to expert session</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">120+</p>
                    <p className="text-sm text-gray-500">Specialists across biotech, medtech, and digital health</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">94%</p>
                    <p className="text-sm text-gray-500">Clients reporting faster decision-making cycles</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-3xl bg-white shadow-xl border border-gray-100 p-6 md:p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Next live consultation</p>
                      <p className="text-xl font-semibold text-gray-900">Design Transfer Review</p>
                    </div>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      Confirmed
                    </span>
                  </div>
                  <div className="mt-6 space-y-5">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                        JD
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Dr. Julia Dorn</p>
                        <p className="text-xs text-gray-500">Regulatory Strategist · 12 yrs experience</p>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-dashed border-gray-200 p-4 bg-slate-50">
                      <p className="text-sm font-semibold text-gray-700">Agenda</p>
                      <ul className="mt-2 space-y-2 text-sm text-gray-600 list-disc list-inside">
                        <li>Assess MDR submission readiness</li>
                        <li>Align risk management documentation</li>
                        <li>Outline validation timeline</li>
                      </ul>
                    </div>
                    <div className="rounded-2xl bg-primary/5 p-4 text-sm text-gray-600">
                      "The Fast Consulting sessions helped us prepare a market entry plan in one week." —
                      <span className="font-semibold text-gray-900"> Alex, MedTech Founder</span>
                    </div>
                  </div>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <button
                      onClick={() => navigate("/dashboard/consultation/browse")}
                      className="rounded-xl bg-primary text-white py-2.5 font-semibold hover:opacity-90 transition"
                      type="button"
                    >
                      Browse Experts
                    </button>
                    <button
                      onClick={() => navigate("/dashboard/labs")}
                      className="rounded-xl border border-gray-200 py-2.5 font-semibold text-gray-700 hover:bg-gray-50 transition"
                      type="button"
                    >
                      Find a Lab Partner
                    </button>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 hidden lg:block">
                  <div className="rounded-2xl bg-white/70 backdrop-blur shadow-lg border border-gray-100 px-6 py-4">
                    <p className="text-xs text-gray-500">Service rating</p>
                    <p className="text-lg font-semibold text-gray-900">4.9 / 5</p>
                    <p className="text-xs text-gray-500">Based on 230+ consultations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Central Search */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 -mt-10">
          <div className="rounded-3xl border border-gray-200 bg-white/90 backdrop-blur shadow-lg p-4 md:p-6">
            <p className="text-sm font-semibold text-gray-700 mb-3">Search for a capability or topic</p>
            <SearchBar onSelect={handleSelect} />
            <p className="mt-2 text-xs text-gray-500">Hint: Try “Regulatory Strategy”, “ISO 13485”, or “Biotech Lab”.</p>
          </div>
        </div>

        {/* Fast Consulting value props */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-16">
          <div className="flex flex-wrap items-center justify-between gap-6 border border-gray-200 rounded-3xl bg-white p-6 md:p-10 shadow-sm">
            <div className="max-w-xl space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">Fast Consulting combines strategy, experts, and labs.</h2>
              <p className="text-base text-gray-600">
                Engage an expert for a focused sprint, receive a clear action report, and transition straight
                into execution with the right lab or partner. Every project is curated by AdventIQ specialists.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 w-full sm:w-auto">
              {[
                {
                  title: "Curated experts",
                  description: "Hand-selected consultants with proven track records and domain depth.",
                },
                {
                  title: "Guided engagements",
                  description: "Structured sessions tailored to your product milestones and evidence needs.",
                },
                {
                  title: "Execution ready",
                  description: "Immediate access to partnered labs and service providers to act on the plan.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-gray-200 bg-slate-50 p-4">
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process section */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center">How Fast Consulting works</h2>
          <p className="mt-3 text-base text-gray-600 text-center">
            A dedicated AdventIQ producer keeps the process moving so you never lose momentum.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Define your objective",
                description: "Tell us the milestone you need to unlock. We scope the engagement within 30 minutes.",
              },
              {
                number: "02",
                title: "Meet curated experts",
                description: "Join a live working session with one or more specialists tailored to your needs.",
              },
              {
                number: "03",
                title: "Act on a precise plan",
                description: "Receive prioritized recommendations and connect with labs or partners instantly.",
              },
            ].map((step) => (
              <div key={step.number} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <span className="text-xs font-bold tracking-widest text-primary">STEP {step.number}</span>
                <h3 className="mt-3 text-xl font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-16">
          <div className="rounded-3xl bg-gradient-to-r from-primary to-indigo-500 text-white p-10 shadow-lg">
            <div className="grid gap-8 md:grid-cols-[1.1fr,0.9fr] items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Teams trust AdventIQ to deliver velocity.</h2>
                <p className="text-base text-white/80">
                  "Our Fast Consulting sprint clarified our FDA pathway and gave us a hiring plan in under a week.
                  The follow-up lab work kicked off two days later."
                </p>
                <p className="text-sm font-semibold">Nina Patel · COO, HelixWave Diagnostics</p>
              </div>
              <div className="rounded-2xl bg-white/10 border border-white/20 p-6">
                <h3 className="text-lg font-semibold">Use cases we accelerate</h3>
                <ul className="mt-4 space-y-3 text-sm text-white/80">
                  <li>• Clinical validation planning</li>
                  <li>• Quality management system upgrades</li>
                  <li>• Go-to-market launch readiness</li>
                  <li>• Scaling manufacturing and supply chains</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-16 mb-20">
          <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-sm text-center">
            <h2 className="text-3xl font-bold text-gray-900">Ready to fast-track your next milestone?</h2>
            <p className="mt-3 text-base text-gray-600">
              Book a Fast Consulting intake today and get a curated expert recommendation within one business day.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => navigate("/dashboard/consultation")}
                className="rounded-xl px-6 py-3 bg-primary text-white font-semibold hover:opacity-90 transition"
                type="button"
              >
                Request Fast Consulting
              </button>
              <button
                onClick={() => navigate("/register")}
                className="rounded-xl px-6 py-3 border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition"
                type="button"
              >
                Create an Account
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
