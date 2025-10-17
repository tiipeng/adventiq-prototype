// src/pages/ExpertDashboard.jsx
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingChecklist from "../components/OnboardingChecklist.jsx";

// Optional: try to read pending requests count from mock bookings (fallback if not available)
let pendingCount = 2;
let upcomingCount = 1;
try {
  // If your mockData exports `bookings`, you could derive counts here.
  // import { bookings } from "../data/mockData.js"; // avoid compile errors if not exported
  // pendingCount = bookings.filter(b => b.status === "pending").length || pendingCount;
  // upcomingCount = bookings.filter(b => b.status === "confirmed").length || upcomingCount;
} catch {
  // keep fallbacks
}

export default function ExpertDashboard() {
  const navigate = useNavigate();

  // Onboarding status (prototype flags)
  const accepted = sessionStorage.getItem("acceptedTCNDA") === "true";
  const applicationSubmitted = sessionStorage.getItem("applicationSubmitted") === "true";
  const applicationApproved = sessionStorage.getItem("applicationApproved") === "true";

  // crude “profile completion” mock
  const profilePercent = useMemo(() => {
    let p = 20;
    if (accepted) p += 20;
    if (applicationSubmitted) p += 20;
    if (applicationApproved) p += 20;
    // assume some profile fields filled
    p += 10;
    return Math.min(p, 95);
  }, [accepted, applicationSubmitted, applicationApproved]);

  const checklistItems = [
    {
      key: "tcs",
      title: "Accept T&C + NDA",
      desc: "Agree to terms so bookings can start.",
      status: accepted ? "completed" : "pending",
      route: "/expert/terms",
    },
    {
      key: "availability",
      title: "Provide Availabilities",
      desc: "Add time slots clients can book.",
      status: "inprogress",
      route: "/expert/availability",
    },
    {
      key: "application",
      title: "Become an Expert (Application)",
      desc: "Tell us about your expertise and rates.",
      status: applicationSubmitted ? "completed" : "pending",
      route: "/expert/application",
    },
    {
      key: "approval",
      title: "Approval Status",
      desc: "See if your application is approved.",
      status: applicationApproved ? "completed" : "pending",
      route: "/expert/approval",
    },
    {
      key: "profile",
      title: "Registration & Profile",
      desc: "Complete your public expert profile.",
      status: "inprogress",
      route: "/expert/profile",
    },
    // NOTE: Orders REMOVED from onboarding
  ];

  // Mock incoming orders preview (UI-only)
  const ordersPreview = [
    {
      id: "req-2001",
      customer: "Acme Robotics",
      topic: "AI for industrial vision",
      when: "2025-11-07 · 10:30",
      tier: "Premium",
      status: "Pending",
    },
    {
      id: "req-2002",
      customer: "GreenCell GmbH",
      topic: "Battery materials advisory",
      when: "2025-11-08 · 14:00",
      tier: "Standard",
      status: "Pending",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Expert</div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">Welcome, Dr. Jane Doe</h1>
          <p className="text-gray-600 mt-1">
            Manage your expert profile, availability, and orders.
          </p>
        </div>
        <div className="hidden md:flex gap-2">
          <button
            className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
            onClick={() => navigate("/expert/orders")}
          >
            View Orders
          </button>
          <button
            className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
            onClick={() => navigate("/expert/availability")}
          >
            Edit Availability
          </button>
          <button
            className="px-3 py-1.5 rounded-lg bg-primary text-white"
            onClick={() => navigate("/expert/profile")}
          >
            Go to Profile
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-sm text-gray-500">Pending Requests</div>
          <div className="text-2xl font-semibold text-primary mt-1">{pendingCount}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-sm text-gray-500">Upcoming Consultations</div>
          <div className="text-2xl font-semibold text-primary mt-1">{upcomingCount}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-sm text-gray-500">Profile Completion</div>
          <div className="text-2xl font-semibold text-primary mt-1">{profilePercent}%</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-sm text-gray-500">T&C Status</div>
          <div className="text-sm mt-1">
            <span
              className={`px-2 py-0.5 rounded ${
                accepted ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {accepted ? "Accepted" : "Pending"}
            </span>
          </div>
        </div>
      </div>

      {/* Orders panel (moved out of onboarding) */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-primary">Orders</h2>
          <button
            className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
            onClick={() => navigate("/expert/orders")}
          >
            Go to Orders
          </button>
        </div>
        <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ordersPreview.map((o) => (
            <div key={o.id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium text-primary">{o.customer}</div>
                <span className="text-xs px-2 py-0.5 rounded bg-yellow-100 text-yellow-800">
                  {o.status}
                </span>
              </div>
              <div className="mt-1 text-sm text-gray-600">{o.topic}</div>
              <div className="mt-1 text-xs text-gray-500">{o.when}</div>
              <div className="mt-1 text-xs text-gray-500">Tier: {o.tier}</div>
              <div className="mt-3 flex gap-2">
                <button
                  className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm"
                  onClick={() => navigate("/expert/orders")}
                >
                  Review
                </button>
                <button
                  className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm"
                  onClick={() => navigate("/expert/orders")}
                >
                  Approve / Reject
                </button>
              </div>
            </div>
          ))}
          {!ordersPreview.length && (
            <div className="sm:col-span-2 lg:col-span-3 bg-white border border-gray-200 rounded-xl p-5 text-sm text-gray-600">
              No orders yet. Once clients book you, requests will appear here.
            </div>
          )}
        </div>
      </section>

      {/* Onboarding (without Orders) */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-primary">Onboarding</h2>
        <div className="mt-3 bg-white border border-gray-200 rounded-xl">
          <OnboardingChecklist items={checklistItems} />
        </div>
      </section>
    </div>
  );
}
