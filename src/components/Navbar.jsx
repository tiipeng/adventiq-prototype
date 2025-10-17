// src/components/Navbar.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const NavLink = ({ label, to }) => (
    <button
      onClick={() => { navigate(to); setOpen(false) }}
      className="px-3 py-2 text-sm text-gray-700 hover:text-primary"
    >
      {label}
    </button>
  )

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
          aria-label="AdventIQ home"
        >
          <div className="w-8 h-8 rounded-lg bg-primary" />
          <span className="font-bold text-lg text-primary">AdventIQ</span>
        </button>

        {/* Right (desktop) */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink label="Home" to="/" />
          <NavLink label="How It Works" to="/how-it-works" />
          <NavLink label="About" to="/about" />
          <NavLink label="Login" to="/login" />
          <button
            onClick={() => navigate('/register')}
            className="ml-2 rounded-lg px-3 py-2 text-sm bg-primary text-white hover:opacity-90"
          >
            Register
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(v => !v)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100"
          aria-label="Open menu"
          aria-expanded={open}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-2 flex flex-col">
            <NavLink label="Home" to="/" />
            <NavLink label="How It Works" to="/how-it-works" />
            <NavLink label="About" to="/about" />
            <NavLink label="Login" to="/login" />
            <button
              onClick={() => { navigate('/register'); setOpen(false) }}
              className="mt-2 rounded-lg px-3 py-2 text-sm bg-primary text-white"
            >
              Register
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
