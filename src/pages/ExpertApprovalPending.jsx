// src/pages/ExpertApprovalPending.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ExpertApprovalPending() {
  const navigate = useNavigate();
  const [approved, setApproved] = useState(sessionStorage.getItem("applicationApproved") === "true");

  useEffect(() => {
    // Ensure applicationSubmitted is true when arriving here
    if (sessionStorage.getItem("applicationSubmitted") !== "true") {
      sessionStorage.setItem("applicationSubmitted", "true");
    }
  }, []);

  const toggleApproval = () => {
    const next = !approved;
    setApproved(next);
    sessionStorage.setItem("applicationApproved", next ? "true" : "false");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {!approved ? (
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 text-yellow-800 px-4 py-3">
          Your application is under review.
        </div>
      ) : (
        <div className="rounded-xl border border-green-200 bg-green-50 text-green-800 px-4 py-3">
          Your application is approved!
        </div>
      )}

      <div className="mt-6 bg-white border border-gray-200 rounded-xl p-5">
        <h1 className="text-2xl font-bold text-primary">Approval Status</h1>
        <p className="text-sm text-gray-600 mt-2">
          Prototype only. Use the toggle below to simulate the approval result.
        </p>

        <div className="mt-4 flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg border hover:bg-gray-50" onClick={toggleApproval}>
            {approved ? "Set as Pending" : "Toggle Approval (Prototype)"}
          </button>

          {approved && (
            <button className="px-3 py-1.5 rounded-lg bg-primary text-white" onClick={() => navigate("/expert/profile")}>
              Complete Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
