import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Landing from './pages/Landing.jsx'
import RoleSelect from './pages/RoleSelect.jsx'
import BusinessDashboard from './pages/BusinessDashboard.jsx'
import ExpertDashboard from './pages/ExpertDashboard.jsx'
import LabDashboard from './pages/LabDashboard.jsx'
import BookingFlow from './pages/BookingFlow.jsx'
import Reports from './pages/Reports.jsx'
import Admin from './pages/Admin.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/roles" element={<RoleSelect />} />
          <Route path="/dashboard/business/*" element={<BusinessDashboard />} />
          <Route path="/dashboard/expert/*" element={<ExpertDashboard />} />
          <Route path="/dashboard/lab/*" element={<LabDashboard />} />
          <Route path="/booking/*" element={<BookingFlow />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
