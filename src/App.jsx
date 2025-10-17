// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'

import LandingPage from './pages/LandingPage.jsx'
import About from './pages/About.jsx'
import HowItWorks from './pages/HowItWorks.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import BusinessDashboard from './pages/BusinessDashboard.jsx'
import ExpertDashboard from './pages/ExpertDashboard.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<BusinessDashboard />} />
          <Route path="/expert" element={<ExpertDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between text-sm text-gray-500">
          <span>© {new Date().getFullYear()} AdventIQ</span>
          <div className="flex gap-4">
            <button className="hover:text-primary">Privacy</button>
            <button className="hover:text-primary">Terms</button>
            <button className="hover:text-primary">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
