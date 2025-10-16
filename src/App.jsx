// /src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

// Existing pages
import Landing from './pages/Landing.jsx'
import RoleSelect from './pages/RoleSelect.jsx'
import BusinessDashboard from './pages/BusinessDashboard.jsx'
import ExpertDashboard from './pages/ExpertDashboard.jsx'
import LabDashboard from './pages/LabDashboard.jsx'
import BookingFlow from './pages/BookingFlow.jsx'
import Reports from './pages/Reports.jsx'
import Admin from './pages/Admin.jsx'
import NotFound from './pages/NotFound.jsx'

// New: Experts flow (direct booking)
import ExpertsCatalog from './pages/Experts/ExpertsCatalog.jsx'
import ExpertDetail from './pages/Experts/ExpertDetail.jsx'

// New: Guided flow (when users don’t know what they need)
import Questionnaire from './pages/Guided/Questionnaire.jsx'
import SuggestedExperts from './pages/Guided/SuggestedExperts.jsx'

// New: Checkout & Confirmation
import Checkout from './pages/Checkout.jsx'
import Confirmation from './pages/Confirmation.jsx'

// (Optional) When you add Labs flow, import here:
// import LabsCatalog from './pages/Labs/LabsCatalog.jsx'
// import LabDetail from './pages/Labs/LabDetail.jsx'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* Landing + Auth entry */}
          <Route path="/" element={<Landing />} />
          <Route path="/roles" element={<RoleSelect />} />

          {/* Dashboards */}
          <Route path="/dashboard/business/*" element={<BusinessDashboard />} />
          <Route path="/dashboard/expert/*" element={<ExpertDashboard />} />
          <Route path="/dashboard/lab/*" element={<LabDashboard />} />

          {/* Legacy booking wizard (still available) */}
          <Route path="/booking/*" element={<BookingFlow />} />

          {/* Direct Experts flow */}
          <Route path="/experts" element={<ExpertsCatalog />} />
          <Route path="/experts/:id" element={<ExpertDetail />} />

          {/* Guided flow */}
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/suggested-experts" element={<SuggestedExperts />} />

          {/* Checkout & Confirmation */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />

          {/* Labs flow (enable when pages are added) */}
          {/* <Route path="/labs" element={<LabsCatalog />} /> */}
          {/* <Route path="/labs/:id" element={<LabDetail />} /> */}

          {/* Reports & Admin */}
          <Route path="/reports" element={<Reports />} />
          <Route path="/admin" element={<Admin />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
