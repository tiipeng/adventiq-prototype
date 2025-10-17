// src/pages/ExpertDashboard.jsx
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingChecklist from "../components/OnboardingChecklist.jsx";
// Try to import shared mocks; fall back if missing.
let expertsData = [];
let bookingsData = [];
try {
  // eslint-disable-next-line import/no-unresolved
  const md = await import("../data/mockData.js");
  expertsData = md.experts || [];
  bookingsData = md.bookings || [];
} catch (e) {
  // Fallback mock
  expertsData = [
    { id: 1, name: "Dr. Jane Bauer", tags: ["AI"], price: "€250/h", location: "Berlin, DE" },
  ];
  bookingsData = [
    { id: "b1", customer: "ACME GmbH", topic: "AI in manufacturing", date: "2025-11-04", time: "10:30", tier: "Premium", duration: "1.5h", notes: "Scope discussion", status: "pending" },
    { id: "b2", customer: "NovaTech", topic: "Materials fatigue", date: "2025-11-10", time: "14:00", tier: "Standard", duration: "2h", notes: "Review test data", status: "approved" },
  ];
}

export default function ExpertDashboard() {
  const navigate = useNavigate();

  // Session flags
  const acceptedTCNDA = sessionStorage.getItem("acceptedTCNDA") === "true";
  const applicationSubmitted = sessionStorage.getItem("applicationSubmitted") === "true";
  const applicationApproved = sessionStorage.getItem("applicationApproved") === "true";
  const availabilitySlots = JSON.parse(sessionStorage.getItem("availabilitySlots") || "{}");
  const profileSaved = sessionStorage.getItem("expertProfileSaved") === "true";

  const pending = useMemo(() => bookingsData.filter(b => b.status === "pending").length, []);
  const upcoming = useMemo(() => bookingsData.filter(b => b.status === "approved").length, []);

  const profilePercent = useMemo(() => {
    // crude progress indicator
    let p = 0;
    if (acceptedTCNDA) p += 20;
    if (Object.keys(availabilitySlots).length) p += 20;
    if (applicationSubmitted) p += 20;
    if (applicationApproved) p += 20;
    if (profileSaved) p += 20;
    return p;
  }, [acceptedTCNDA, availabilitySlots, applicationSubmitted, applicationApproved, profileSaved]);

  const checklistItems = [
    { key: "tcs", title: "Accept T&C + NDA", status: acceptedTCNDA ? "completed" : "pending", route: "/expert/terms", description: "Agree to the legal terms to get started." },
    { key: "availability", title: "Provide Availabilities", status: Object.keys(availabilitySlots).length ? "completed" : "pending", route: "/expert/availability", description: "Set your available time slots." },
    { key: "application", title: "Become an Expert (Application)", status: applicationSubmitted ? "completed" : "pending", route: "/expert/application", description: "Tell us about your expertise." },
    { key: "approval", title: "Approval Status", status: applicationApproved ? "completed" : (applicationSubmitted ? "inprogress" : "pending"), route: "/expert/approval", description: "Track your approval." },
    { key: "profile", title: "Registration & Profile", status: profileSaved ? "completed" : "pending", route: "/expert/profile", description: "Complete your public profile." },
    { key: "orders", title: "Get Orders & Approve/Reject", status: pending ? "inprogress" : "pending", route: "/expert/orders", description: "Manage booking requests." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Welcome, Dr. Jane Doe</h1>
        <p className="text-gray-600 mt-2">Your expert workspace at AdventIQ.</p>
      </header>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-sm text-gray-500">Pending Requests</div>
          <div className="text-2xl font-bold text-primary">{pending}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-sm text-gray-500">Upcoming Consultations</div>
          <div className="text-2xl font-bold text-primary">{upcoming}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-sm text-gray-500">Profile Completion</div>
          <div className="text-2xl font-bold text-primary">{profilePercent}%</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-sm text-gray-500">T&C Status</div>
          <div className={`text-sm inline-block px-2 py-1 rounded ${acceptedTCNDA ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
            {acceptedTCNDA ? "Accepted" : "Not accepted"}
          </div>
        </div>
      </div>

      {/* Onboarding */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold text-primary">Onboarding checklist</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg border text-sm hover:bg-gray-50" onClick={() => navigate("/expert/orders")}>View Orders</button>
            <button className="px-3 py-1.5 rounded-lg border text-sm hover:bg-gray-50" onClick={() => navigate("/expert/availability")}>Edit Availability</button>
            <button className="px-3 py-1.5 rounded-lg bg-primary text-white text-sm" onClick={() => navigate("/expert/profile")}>Go to Profile</button>
          </div>
        </div>
        <OnboardingChecklist items={checklistItems} />
      </div>
    </div>
  );
}
