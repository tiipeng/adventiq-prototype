// src/pages/ExpertDashboard.jsx
import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingChecklist from "../components/OnboardingChecklist.jsx";
import DashboardSidebar from "../components/DashboardSidebar.jsx";

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
  const topRef = useRef(null);
  const [activeKey, setActiveKey] = useState("dashboard");

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

  const handleScrollTo = (key, elementId) => {
    setActiveKey(key);
    if (elementId === "top") {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const target = document.getElementById(elementId);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const sidebarItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      description: "Pulse of your expert work",
      onSelect: () => handleScrollTo("dashboard", "top"),
    },
    {
      key: "projectplan",
      label: "Project Plan",
      description: "Milestones with clients",
      onSelect: () => handleScrollTo("projectplan", "project-plan"),
    },
    {
      key: "datashare",
      label: "Data Share Point",
      description: "Files to review & deliver",
      onSelect: () => handleScrollTo("datashare", "data-share"),
    },
    {
      key: "reports",
      label: "Reports & Visualisation",
      description: "Outputs you owe",
      onSelect: () => handleScrollTo("reports", "reports"),
    },
    {
      key: "communications",
      label: "Chat / Mailbox",
      description: "Client conversations",
      onSelect: () => handleScrollTo("communications", "communications"),
    },
    {
      key: "account",
      label: "Account & Settings",
      description: "Payouts, notifications",
      onSelect: () => alert("Settings for experts are coming soon in this prototype."),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div ref={topRef} id="top" />
      <div className="flex flex-col lg:flex-row gap-6">
        <DashboardSidebar title="Expert Workspace" items={sidebarItems} activeKey={activeKey} />
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-sm text-gray-500">Expert</div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary">Welcome, Dr. Jane Doe</h1>
              <p className="text-gray-600 mt-1">
                Manage your expert profile, availability, and orders.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
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
          <section className="mt-6" id="dashboard-stats">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
          </section>

          <section className="mt-8" id="project-plan">
            <h2 className="text-lg font-semibold text-primary">Project Plan</h2>
            <div className="mt-3 grid md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-primary">Client Kick-off</div>
                  <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700">This week</span>
                </div>
                <ul className="mt-3 text-sm text-gray-600 list-disc list-inside space-y-1">
                  <li>Confirm agenda & deliverables</li>
                  <li>Request supporting documentation</li>
                  <li>Outline decision makers</li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-primary">Research Sprint</div>
                  <span className="text-xs px-2 py-0.5 rounded bg-yellow-100 text-yellow-800">Next 10 days</span>
                </div>
                <ul className="mt-3 text-sm text-gray-600 list-disc list-inside space-y-1">
                  <li>Analyse shared datasets</li>
                  <li>Schedule lab sync if required</li>
                  <li>Draft interim findings</li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-primary">Executive Session</div>
                  <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-700">In 2 weeks</span>
                </div>
                <ul className="mt-3 text-sm text-gray-600 list-disc list-inside space-y-1">
                  <li>Finalise presentation deck</li>
                  <li>Align with co-presenters</li>
                  <li>Prep Q&A responses</li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="font-medium text-primary">Action Items</div>
                <ul className="mt-3 text-sm text-gray-600 list-disc list-inside space-y-1">
                  <li>Update availability calendar</li>
                  <li>Submit expense estimates</li>
                  <li>Share open questions with client</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mt-8" id="data-share">
            <h2 className="text-lg font-semibold text-primary">Data Share Point</h2>
            <div className="mt-3 grid md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="font-medium text-primary">Client Assets</div>
                <ul className="mt-3 space-y-2 text-sm text-gray-600">
                  <li className="flex items-center justify-between">
                    <span>Manufacturing Line Specs.xlsx</span>
                    <span className="text-xs text-gray-400">Updated today</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Risk Register.pdf</span>
                    <span className="text-xs text-gray-400">2 days ago</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Q&A Thread.docx</span>
                    <span className="text-xs text-gray-400">Last week</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="font-medium text-primary">Your Deliverables</div>
                <p className="mt-3 text-sm text-gray-600">
                  Upload annotated findings, session recordings, or slide decks directly to the workspace
                  to keep stakeholders aligned.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm">
                    Upload Files
                  </button>
                  <button className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm">
                    Request Data
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Orders panel (moved out of onboarding) */}
          <section className="mt-8" id="orders">
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
          <section className="mt-8" id="onboarding">
            <h2 className="text-lg font-semibold text-primary">Onboarding</h2>
            <div className="mt-3 bg-white border border-gray-200 rounded-xl">
              <OnboardingChecklist items={checklistItems} />
            </div>
          </section>

          <section className="mt-8" id="reports">
            <h2 className="text-lg font-semibold text-primary">Reports & Visualisation</h2>
            <div className="mt-3 grid md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="font-medium text-primary">Deliverables In Progress</div>
                <ul className="mt-3 text-sm text-gray-600 list-disc list-inside space-y-1">
                  <li>Insight summary for Acme Robotics — due Nov 12</li>
                  <li>Lab coordination note for GreenCell — draft pending</li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="font-medium text-primary">Visual Assets</div>
                <p className="mt-3 text-sm text-gray-600">
                  Use the template gallery to create decision-ready visuals and share them in the client
                  workspace once approved.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm">
                    Open Templates
                  </button>
                  <button className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm">
                    Schedule Review
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8" id="communications">
            <h2 className="text-lg font-semibold text-primary">Chat / Mailbox</h2>
            <div className="mt-3 grid md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-primary">Recent Threads</div>
                  <span className="text-xs text-gray-400">Prototype</span>
                </div>
                <ul className="mt-3 text-sm text-gray-600 space-y-2">
                  <li>
                    <div className="font-medium text-primary">Acme Robotics</div>
                    <div className="text-xs text-gray-500">“Could we add a section on ROI sensitivity?”</div>
                  </li>
                  <li>
                    <div className="font-medium text-primary">GreenCell GmbH</div>
                    <div className="text-xs text-gray-500">“Shared the thermal run-up data you requested.”</div>
                  </li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
                <div className="font-medium text-primary">Reply Draft</div>
                <textarea
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  rows={5}
                  placeholder="Draft your response or notes for the next touchpoint..."
                />
                <div className="flex gap-2 justify-end">
                  <button className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm">Save Draft</button>
                  <button className="px-3 py-1.5 rounded-lg bg-primary text-white text-sm">Send Reply</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
