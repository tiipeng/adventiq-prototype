// src/pages/LandingPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import logo from "../image/logo.png"; // make sure file exists at src/image/logo.png

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
        <div className="max-w-7xl mx-auto px-4 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          {/* Left: Copy + CTAs */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight">
              We enable the Fast Forward.
            </h1>

            {/* ✅ Updated tagline (AI removed) */}
            <p className="mt-4 text-gray-600 text-base md:text-lg">
              Find experts and rent labs for your next innovation step.
            </p>

            {/* CTA buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              {/* ✅ Updated Start Now target */}
              <button
                onClick={() => navigate("/dashboard/consultation")}
                className="rounded-xl px-4 py-2 bg-primary text-white hover:opacity-90"
                type="button"
              >
                Start Now
              </button>

              <button
                onClick={() => navigate("/dashboard/consultation/browse")}
                className="rounded-xl px-4 py-2 border border-primary text-primary hover:bg-white"
                type="button"
              >
                Explore Experts
              </button>

              <button
                onClick={() => navigate("/dashboard/labs")}
                className="rounded-xl px-4 py-2 border border-primary text-primary hover:bg-white"
                type="button"
              >
                Explore Labs
              </button>
            </div>
          </div>

          {/* Right: Illustration / banner */}
          <div>
            <div className="rounded-2xl border border-gray-200 bg-white h-72 md:h-96 shadow-sm overflow-hidden">
              <img
                src={logo}
                alt="AdventIQ full banner"
                className="w-full h-full object-contain p-6"
              />
            </div>
          </div>
        </div>
        {/* Central Search */}
        <div className="max-w-7xl mx-auto px-4">
          <SearchBar onSelect={handleSelect} />
          <p className="mt-2 text-xs text-gray-500">Hint: Try “Lab”, “Consulting”, or “Biotech”.</p>
        </div>

       {/* How it works */}
<div className="max-w-7xl mx-auto px-4 mt-12 mb-16">
  <div className="flex items-stretch gap-3 overflow-x-auto no-scrollbar">
    {/* Step 1 */}
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm min-w-[240px] flex-1">
      <h3 className="font-semibold text-primary">1. choose your service</h3>
      <p className="text-sm text-gray-600 mt-2">
        Consultation or Labs — pick what you need.
      </p>
    </div>

    {/* Arrow */}
    <div className="flex items-center justify-center shrink-0 px-1" aria-hidden="true">
      <svg
        className="w-6 h-6 md:w-7 md:h-7 text-gray-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </div>

    {/* Step 2 */}
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm min-w-[240px] flex-1">
      <h3 className="font-semibold text-primary">2. book your expert</h3>
      <p className="text-sm text-gray-600 mt-2">
        Browse or get guided suggestions. Reserve a time.
      </p>
    </div>

    {/* Arrow */}
    <div className="flex items-center justify-center shrink-0 px-1" aria-hidden="true">
      <svg
        className="w-6 h-6 md:w-7 md:h-7 text-gray-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </div>

    {/* Step 3 */}
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm min-w-[240px] flex-1">
      <h3 className="font-semibold text-primary">3. receive a report</h3>
      <p className="text-sm text-gray-600 mt-2">
        Get actionable insights and deliverables.
      </p>
    </div>
  </div>
</div>
      </section>
    </div>
  );
}
