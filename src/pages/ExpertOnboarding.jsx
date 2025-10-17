// src/pages/ExpertOnboarding.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import OnboardingChecklist from "../components/OnboardingChecklist.jsx";

export default function ExpertOnboarding() {
  const navigate = useNavigate();

  const acceptedTCNDA = sessionStorage.getItem("acceptedTCNDA") === "true";
  const applicationSubmitted = sessionStorage.getItem("applicationSubmitted") === "true";
  const applicationApproved = sessionStorage.getItem("applicationApproved") === "true";
  const availabilitySlots = JSON.parse(sessionStorage.getItem("availabilitySlots") || "{}");
  const profileSaved = sessionStorage.getItem("expertProfileSaved") === "true";

  const items = [
    { key: "tcs", title: "Accept T&C + NDA", status: acceptedTCNDA ? "completed" : "pending", route: "/expert/terms", description: "Agree to T&C and NDA." },
    { key: "availability", title: "Provide Availabilities", status: Object.keys(availabilitySlots).length ? "completed" : "pending", route: "/expert/availability", description: "Set your working slots." },
    { key: "application", title: "Become an Expert (Application)", status: applicationSubmitted ? "completed" : "pending", route: "/expert/application", description: "Tell us about you." },
    { key: "approval", title: "Approval Status", status: applicationApproved ? "completed" : (applicationSubmitted ? "inprogress" : "pending"), route: "/expert/approval", description: "Track your approval." },
    { key: "profile", title: "Registration & Profile", status: profileSaved ? "completed" : "pending", route: "/expert/profile", description: "Complete your profile." },
    { key: "orders", title: "Get Orders & Approve/Reject", status: "pending", route: "/expert/orders", description: "Manage requests." },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Expert Onboarding</h1>
        <p className="text-gray-600 mt-2">Complete the steps below. Status is visual only for this prototype.</p>
      </header>

      <OnboardingChecklist items={items} />

      <div className="mt-6">
        <button className="px-3 py-1.5 rounded-lg border text-sm hover:bg-gray-50" onClick={() => navigate("/expert")}>
          Back to Expert Dashboard
        </button>
      </div>
    </div>
  );
}
