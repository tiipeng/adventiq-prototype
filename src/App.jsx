// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'

// Landing & static
import LandingPage from './pages/LandingPage.jsx'
import About from './pages/About.jsx'
import HowItWorks from './pages/HowItWorks.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import NotFound from './pages/NotFound.jsx'

// Dashboards
import BusinessDashboard from './pages/BusinessDashboard.jsx'
import ExpertDashboard from './pages/ExpertDashboard.jsx'

// Consultation (Business)
import ConsultationHome from './pages/ConsultationHome.jsx'
import ExpertCatalog from './pages/ExpertCatalog.jsx'
import Questionnaire from './pages/Questionnaire.jsx'
import SuggestedExperts from './pages/SuggestedExperts.jsx'

// Labs
import LabsCatalog from './pages/LabsCatalog.jsx'

// Booking flow
import Booking from './pages/Booking.jsx'
import BookingReview from './pages/BookingReview.jsx'
import BookingConfirmation from './pages/BookingConfirmation.jsx'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboards */}
          <Route path="/dashboard" element={<BusinessDashboard />} />
          <Route path="/expert" element={<ExpertDashboard />} />

          {/* Business -> Consultation */}
          <Route path="/dashboard/consultation" element={<ConsultationHome />} />
          <Route path="/dashboard/consultation/browse" element={<ExpertCatalog />} />
          <Route path="/dashboard/consultation/questionnaire" element={<Questionnaire />} />
          <Route path="/dashboard/consultation/suggested" element={<SuggestedExperts />} />

          {/* Business -> Labs */}
          <Route path="/dashboard/labs" element={<LabsCatalog />} />

          {/* Booking */}
          <Route path="/booking/:expertId" element={<Booking />} />
          <Route path="/booking/review" element={<BookingReview />} />
          <Route path="/booking/confirmation" element={<BookingConfirmation />} />

          {/* Catch-all */}
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
