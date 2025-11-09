import React from "react";
import { Link } from "react-router-dom";

const filters = [
  { id: "specialty", label: "Specialty", active: true },
  { id: "region", label: "Region", active: true },
  { id: "availability", label: "Availability", active: false },
  { id: "price", label: "Price", active: false },
];

const experts = [
  {
    id: 1,
    name: "Dr. Lena Whitfield",
    title: "Battery Aging Scientist",
    rating: 4.9,
    reviews: 182,
    tags: ["Electrochemistry", "EV", "Failure analysis"],
    bio:
      "Former Panasonic lead chemist helping scale cathode chemistry and interpret accelerated aging data for commercialization milestones.",
    nextSlot: "Tomorrow • 14:00 CET",
  },
  {
    id: 2,
    name: "Rajesh Kannan",
    title: "Microscopy Lab Director",
    rating: 4.8,
    reviews: 96,
    tags: ["Cryo-TEM", "Nanomaterials", "Sample prep"],
    bio:
      "Director at MicroVision Labs guiding startups on high-resolution imaging workflows, from hypothesis to annotated reports in under a week.",
    nextSlot: "Thu • 09:30 CET",
  },
  {
    id: 3,
    name: "Dr. Elise Martín",
    title: "Regulatory Strategist (EU MDR)",
    rating: 5.0,
    reviews: 214,
    tags: ["EU MDR", "Clinical eval", "Quality"],
    bio:
      "Ex-Notified Body reviewer crafting MDR submissions, evidence plans, and response strategies that pass scrutiny on the first round.",
    nextSlot: "Fri • 16:00 CET",
  },
  {
    id: 4,
    name: "Miguel Santos",
    title: "Manufacturing Scale-Up Expert",
    rating: 4.7,
    reviews: 141,
    tags: ["Scale-up", "Process design", "cGMP"],
    bio:
      "Former operations VP translating pilot runs into validated production lines with compliant documentation and supplier playbooks.",
    nextSlot: "Mon • 11:00 CET",
  },
  {
    id: 5,
    name: "Dr. Ava Nguyen",
    title: "Clinical Evidence Lead",
    rating: 4.9,
    reviews: 163,
    tags: ["Clinical strategy", "Medtech", "Trials"],
    bio:
      "Clinical strategist aligning regulatory, payer, and investigator stakeholders to de-risk studies and accelerate approvals.",
    nextSlot: "Wed • 13:30 CET",
  },
  {
    id: 6,
    name: "Noah Becker",
    title: "Go-to-Market Strategist",
    rating: 4.8,
    reviews: 118,
    tags: ["Positioning", "Pricing", "Launch"],
    bio:
      "B2B commercial strategist building launch plans, buyer messaging, and revenue experiments for regulated innovations.",
    nextSlot: "Today • 18:00 CET",
  },
];

const logos = ["Ionis", "NeuroPulse", "Helixion", "FluxLabs", "NovaThera"];

const howItWorks = [
  {
    title: "Choose expert",
    description: "Search and filter by specialty, availability, or price — every profile is vetted.",
    icon: (
      <svg
        className="h-10 w-10 text-primary"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M11 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
        <path d="m20 20-3.5-3.5" />
        <path d="M4 19a7 7 0 0 1 14 0" />
      </svg>
    ),
  },
  {
    title: "Lock a time",
    description: "Book a live consultation in minutes with instant calendar confirmation.",
    icon: (
      <svg
        className="h-10 w-10 text-primary"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M7 3v4" />
        <path d="M17 3v4" />
        <rect x="4" y="5" width="16" height="16" rx="2" />
        <path d="M4 11h16" />
        <path d="m16 15-2 2-2-2" />
      </svg>
    ),
  },
  {
    title: "Sync calendars",
    description: "Receive prep notes, agenda, and recordings automatically shared with your team.",
    icon: (
      <svg
        className="h-10 w-10 text-primary"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 5h14v14H5z" />
        <path d="M9 9h6v6H9z" />
        <path d="M4 12H2" />
        <path d="M22 12h-2" />
        <path d="M12 2v2" />
        <path d="M12 22v-2" />
      </svg>
    ),
  },
];

export default function LandingPage() {
  return (
    <div className="bg-slate-50 text-gray-900">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8"
          aria-label="Primary"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
            <img src={'src/image/logo.png'} alt="AdventIQ" className="h-8 w-auto" />
            </span>
            <div className="flex flex-col">
              <span className="text-base font-semibold tracking-tight">AdventIQ</span>
              <span className="text-xs text-slate-500">Fast Consultation</span>
            </div>
          </div>
          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a className="transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" href="#/how-it-works">
              How it works
            </a>
            <a className="transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" href="#/About">
              About
            </a>
            <a className="transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" href="#/dashboard/consultation/browse">
              Browse experts
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm font-semibold">
            <Link
              className="text-slate-600 transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="rounded-full border border-primary/20 px-4 py-2 text-primary transition hover:border-primary hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              to="/register"
            >
              Register
            </Link>
            <Link
              className="hidden rounded-full bg-primary px-4 py-2 text-white transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:inline-flex"
              to="/booking/1"
            >
              Book a demo
            </Link>
          </div>
        </nav>
      </header>

      <main id="main" className="mx-auto flex max-w-7xl flex-col gap-16 px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <section className="grid gap-12 lg:grid-cols-[minmax(0,1fr),minmax(0,0.9fr)] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-sm font-semibold text-primary">
              <span aria-hidden="true">⚡</span>
              On-demand experts for deeptech, medtech, and scale-up teams
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Book the specialist who ships answers before your next sprint review.
            </h1>
            <p className="max-w-xl text-lg text-slate-600">
              AdventIQ pairs product, R&amp;D, and regulatory leaders with vetted scientists, operators, and advisors who translate challenges into concrete experiments, documentation, and next steps.
            </p>
            <div
              role="search"
              className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm shadow-slate-200/50"
              aria-label="Search experts"
            >
              <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(event) => event.preventDefault()}>
                <label className="sr-only" htmlFor="expert-search">
                  Search experts
                </label>
                <div className="relative flex-1">
                  <input
                    id="expert-search"
                    type="search"
                    placeholder="Search experts, e.g., battery ageing, microscopy…"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                    aria-describedby="search-help"
                  />
                  <svg
                    className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="6" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  aria-label="Browse experts"
                >
                  Browse experts
                </button>
              </form>
              <p id="search-help" className="mt-2 text-xs text-slate-500">
                Popular: electrolyzer scale-up · EU MDR · pilot manufacturing
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                <span aria-hidden="true">⭐</span>
                <span>
                  4.8 average from <span className="font-bold">1,200+</span> reviews
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                {logos.map((logo) => (
                  <span key={logo} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-500">
                    {logo}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3" role="group" aria-label="Primary actions">
              <a
                href="#/dashboard/consultation/browse"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="Browse featured experts"
              >
                Browse experts
              </a>
              <Link
                to="/dashboard/consultation/questionnaire"
                className="inline-flex items-center justify-center rounded-xl border border-primary px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="Get help choosing an expert"
              >
                Help me choose
              </Link>
            </div>
          </div>
          <div className="relative isolate overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/10" aria-hidden="true" />
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Next slot</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">Battery lab de-risking sprint</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Confirmed</span>
            </div>
            <dl className="mt-6 grid gap-4 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  LW
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Dr. Lena Whitfield</dt>
                  <dd>Battery aging scientist • 12 yrs experience</dd>
                </div>
              </div>
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Agenda</dt>
                <dd className="mt-3 space-y-2 text-sm">
                  <p>1. Validate accelerated aging protocol</p>
                  <p>2. Interpret impedance spectroscopy findings</p>
                  <p>3. Outline pilot line readiness checklist</p>
                </dd>
              </div>
              <div className="rounded-2xl bg-primary/5 p-4 text-sm text-slate-700">
                “We reduced our testing cycle by three weeks with Lena’s playbook.”
                <span className="ml-1 font-semibold text-slate-900"> — Alex, CTO @ FluxLabs</span>
              </div>
            </dl>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href="#/dashboard/consultation/suggested"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                View profile
              </a>
              <Link
                to="/dashboard/consultation"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Share brief
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2" aria-labelledby="paths">
          <h2 id="paths" className="sr-only">
            Choose your path
          </h2>
          <article className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md focus-within:-translate-y-1 focus-within:shadow-md focus-within:ring-2 focus-within:ring-primary/30" tabIndex={-1}>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary" aria-hidden="true">
              <span className="text-2xl">🔍</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-slate-900">I know what I need</h3>
              <p className="text-sm text-slate-600">
                Explore the catalog by capability, sector, or deliverable. Shortlist experts, compare formats, and save briefs for later.
              </p>
            </div>
            <a
              href="#filters"
              className="mt-auto inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Browse catalog
              <span aria-hidden="true">→</span>
            </a>
          </article>
          <article className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md focus-within:-translate-y-1 focus-within:shadow-md focus-within:ring-2 focus-within:ring-primary/30" tabIndex={-1}>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary" aria-hidden="true">
              <span className="text-2xl">🧭</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-slate-900">Match me with the right expert</h3>
              <p className="text-sm text-slate-600">
                Answer a few questions and we will curate a shortlist, agenda, and prep checklist—typically within 30 minutes.
              </p>
            </div>
            <Link
              to="/dashboard/consultation/questionnaire"
              className="mt-auto inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Start guided intake
              <span aria-hidden="true">→</span>
            </Link>
          </article>
        </section>

        <section id="filters" aria-labelledby="filter-heading" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="filter-heading" className="text-lg font-semibold text-slate-900">
              Filter experts
            </h2>
            <button
              type="button"
              className="text-sm font-semibold text-primary transition hover:text-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Reset filters
            </button>
          </div>
          <div className="flex flex-wrap gap-2" role="toolbar" aria-label="Filter experts">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                aria-pressed={filter.active}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  filter.active
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-slate-200 bg-white text-slate-600 hover:border-primary/60 hover:text-primary"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </section>

        <section id="experts" aria-labelledby="expert-heading" className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="expert-heading" className="text-2xl font-semibold text-slate-900">
              Featured experts ready to talk this week
            </h2>
            <p className="text-sm text-slate-500">Showing {experts.length} experts • Times in CET</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {experts.map((expert) => (
              <article
                key={expert.id}
                className="flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md focus-within:-translate-y-1 focus-within:shadow-md focus-within:ring-2 focus-within:ring-primary/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{expert.name}</h3>
                    <p className="text-sm text-slate-600">{expert.title}</p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="m10 2.5 1.9 4.4 4.6.4-3.4 3.1.9 4.5L10 12.9l-4 1.9.9-4.5L3.5 7.3l4.6-.4L10 2.5Z" />
                    </svg>
                    <span>
                      {expert.rating} ({expert.reviews})
                    </span>
                  </div>
                </div>
                <p
                  className="text-sm text-slate-600"
                  style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                >
                  {expert.bio}
                </p>
                <div className="flex flex-wrap gap-2">
                  {expert.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M6 2v2" />
                      <path d="M14 2v2" />
                      <path d="M3 6h14" />
                      <rect x="3" y="6" width="14" height="11" rx="2" />
                    </svg>
                    {expert.nextSlot}
                  </span>
                  <Link
                    to={`/booking/${expert.id}`}
                    className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    aria-label={`View profile for ${expert.name}`}
                  >
                    View profile
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="how-it-works" aria-labelledby="process-heading" className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="process-heading" className="text-2xl font-semibold text-slate-900">
              How AdventIQ consultation works
            </h2>
            <p className="text-sm text-slate-500">Every engagement is guided by a dedicated producer.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {howItWorks.map((step) => (
              <article
                key={step.title}
                className="flex h-full flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 text-sm shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="text-sm text-slate-600">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="trust"
          aria-labelledby="trust-heading"
          className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[1.1fr,0.9fr] lg:p-8"
        >
          <div className="space-y-4">
            <h2 id="trust-heading" className="text-2xl font-semibold text-slate-900">
              Beyond the consultation
            </h2>
            <p className="text-sm text-slate-600">
              Upgrade to our momentum plan and receive a quarterly outcomes review, curated vendor introductions, and a live playbook workspace shared with your internal team.
            </p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span aria-hidden="true">•</span> Monthly progress clinics with your lead expert
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true">•</span> Compliance-ready documentation templates
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true">•</span> Priority booking windows and on-demand lab availability
              </li>
            </ul>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Talk to sales
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="flex flex-col justify-between gap-4 rounded-3xl bg-slate-50 p-6">
            <div className="space-y-2 text-sm text-slate-600">
              <p className="text-base font-semibold text-slate-900">Teams trust AdventIQ to ship faster:</p>
              <p>“Our MDR dossier cleared on the first pass. AdventIQ’s experts kept the review on pace with zero surprises.”</p>
              <p className="font-semibold text-slate-900">— Sofia, Head of Quality @ NovaThera</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
              {logos.map((logo) => (
                <div key={logo} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-center text-slate-500">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">AI</span>
            <p className="text-sm">© {new Date().getFullYear()} AdventIQ. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a className="transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" href="/privacy">
              Privacy
            </a>
            <a className="transition hover:text-primary focus-visible:outline focus-visible:outline-primary" href="#/expert/terms">
              Terms
            </a>
            <a className="transition hover:text-primary focus-visible:outline focus-visible:outline-primary" href="mailto:hello@adventiq.com">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
