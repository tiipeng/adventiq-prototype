// /src/components/Navbar.jsx
import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="border-b border-neutral bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary" aria-hidden="true" />
          <span className="font-bold text-xl text-primary">AdventIQ</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className="text-sm hover:text-primary">Home</NavLink>
          <a href="#about" className="text-sm hover:text-primary">About</a>
          <a href="#how" className="text-sm hover:text-primary">How It Works</a>
          <NavLink to="/roles" className="text-sm hover:text-primary">Login</NavLink>
          <NavLink
            to="/roles"
            className="text-sm rounded-lg px-3 py-1.5 bg-primary text-white hover:opacity-90"
          >
            Register
          </NavLink>
        </nav>

        {/* Mobile: minimal entry to roles */}
        <NavLink to="/roles" className="md:hidden text-sm rounded-lg px-3 py-1.5 bg-primary text-white">
          Start
        </NavLink>
      </div>
    </header>
  )
}
