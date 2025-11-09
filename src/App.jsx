// src/App.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

// Public
import LandingPage from "./pages/LandingPage.jsx";
import About from "./pages/About.jsx";
import HowItWorks from "./pages/HowItWorks.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import NotFound from "./pages/NotFound.jsx";

// Business & Expert (existing)
import BusinessDashboard from "./pages/BusinessDashboard.jsx";
import ExpertDashboard from "./pages/ExpertDashboard.jsx";
import ConsultationSession from "./pages/ConsultationSession.jsx";
import ReportReview from "./pages/ReportReview.jsx";
import ConsultationCompletion from "./pages/ConsultationCompletion.jsx";

// Consultation & Labs (existing from prior steps, if present — otherwise keep routes; components can be added later)
import ConsultationHome from "./pages/ConsultationHome.jsx";
import ExpertCatalog from "./pages/ExpertCatalog.jsx";
import Questionnaire from "./pages/Questionnaire.jsx";
import SuggestedExperts from "./pages/SuggestedExperts.jsx";
import LabsCatalog from "./pages/LabsCatalog.jsx";
import ConsultationDetails from "./pages/ConsultationDetails.jsx";

// Booking flow (existing)
import Booking from "./pages/Booking.jsx";
import BookingReview from "./pages/BookingReview.jsx";
import BookingConfirmation from "./pages/BookingConfirmation.jsx";

// NEW Expert area pages
import ExpertOnboarding from "./pages/ExpertOnboarding.jsx";
import ExpertTCNDA from "./pages/ExpertTCNDA.jsx";
import ExpertAvailability from "./pages/ExpertAvailability.jsx";
import ExpertApplication from "./pages/ExpertApplication.jsx";
import ExpertApprovalPending from "./pages/ExpertApprovalPending.jsx";
import ExpertProfile from "./pages/ExpertProfile.jsx";
import ExpertOrders from "./pages/ExpertOrders.jsx";
import ExpertFlow from "./pages/ExpertFlow.jsx";

export default function App() {
  const location = useLocation();
  const hideChrome = location.pathname === "/" || location.pathname === "";

  return (
    <div className="min-h-screen flex flex-col">
      {!hideChrome && <Navbar />}
      <main className="flex-1">
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Business dashboard */}
          <Route path="/dashboard" element={<BusinessDashboard />} />
          <Route path="/dashboard/session/live" element={<ConsultationSession />} />
          <Route path="/dashboard/report/review" element={<ReportReview />} />
          <Route path="/dashboard/session/completion" element={<ConsultationCompletion />} />

          {/* Business → Consultation */}
          <Route path="/dashboard/consultation" element={<ConsultationHome />} />
          <Route path="/dashboard/consultation/browse" element={<ExpertCatalog />} />
          <Route path="/dashboard/consultation/details" element={<ConsultationDetails />} />
          <Route path="/dashboard/consultation/questionnaire" element={<Questionnaire />} />
          <Route path="/dashboard/consultation/suggested" element={<SuggestedExperts />} />

          {/* Business → Labs */}
          <Route path="/dashboard/labs" element={<LabsCatalog />} />

          {/* Booking */}
          <Route path="/booking/:expertId" element={<Booking />} />
          <Route path="/booking/review" element={<BookingReview />} />
          <Route path="/booking/confirmation" element={<BookingConfirmation />} />

          {/* Expert area */}
          <Route path="/expert" element={<ExpertDashboard />} />
          <Route path="/expert/onboarding" element={<ExpertOnboarding />} />
          <Route path="/expert/terms" element={<ExpertTCNDA />} />
          <Route path="/expert/availability" element={<ExpertAvailability />} />
          <Route path="/expert/application" element={<ExpertApplication />} />
          <Route path="/expert/approval" element={<ExpertApprovalPending />} />
          <Route path="/expert/profile" element={<ExpertProfile />} />
          <Route path="/expert/orders" element={<ExpertOrders />} />
          <Route path="/expert/flow" element={<ExpertFlow />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!hideChrome && (
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
      )}
    </div>
  );
}
