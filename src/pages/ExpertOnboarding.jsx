// src/pages/ExpertOnboarding.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import OnboardingChecklist from "../components/OnboardingChecklist.jsx";

export default function ExpertOnboarding() {
  const navigate = useNavigate();

  const accepted = sessionStorage.getItem("acceptedTCNDA") === "true";
  const applicationSubmitted = sessionStorage.getItem("applicationSubmitted") === "true";
  const applicationApproved = sessionStorage.getItem("applicationApproved") === "true";

  const items = [
    {
      key: "tcs",
      title: "Accept T&C + NDA",
      desc: "Agree to the platform terms and non-disclosure.",
      status: accepted ? "completed" : "pending",
      route: "/expert/terms",
    },
    {
      key: "availability",
      title: "Provide Availabilities",
      desc: "Add your bookable time slots.",
      status: "inprogress",
      route: "/expert/availability",
    },
    {
      key: "application",
      title: "Become an Expert (Application)",
      desc: "Tell us your expertise, pricing, and background.",
      status: applicationSubmitted ? "completed" : "pending",
      route: "/expert/application",
    },
    {
      key: "approval",
      title: "Approval Status",
      desc: "We review and approve your application.",
      status: applicationApproved ? "completed" : "pending",
      route: "/expert/approval",
    },
    {
      key: "profile",
      title: "Registration & Profile",
      desc: "Complete your public profile so clients can find you.",
      status: "inprogress",
      route: "/expert/profile",
    },
    // NOTE: Orders intentionally NOT part of onboarding anymore.
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-sm text-gray-500">Expert</div>
      <h1 className="text-2xl md:text-3xl font-bold text-primary">Onboarding</h1>
      <p className="text-gray-600 mt-2">
        Complete these steps to start receiving consultation requests.
      </p>

      <div className="mt-6 bg-white border border-gray-200 rounded-xl">
        <OnboardingChecklist items={items} />
      </div>

      <div className="mt-6 flex gap-2">
        <button
          className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
          onClick={() => navigate("/expert")}
        >
          Back to Expert Home
        </button>
        <button
          className="px-3 py-1.5 rounded-lg bg-primary text-white"
          onClick={() => navigate("/expert/orders")}
        >
          Go to Orders
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        Prototype note: Orders are managed separately from onboarding.
      </p>
    </div>
  );
}
