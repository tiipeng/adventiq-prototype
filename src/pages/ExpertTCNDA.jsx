// src/pages/ExpertTCNDA.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ExpertTCNDA() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(sessionStorage.getItem("acceptedTCNDA") === "true");
  const [notice, setNotice] = useState("");

  const accept = () => {
    if (!checked) {
      setNotice("Please confirm you agree to the Terms & Conditions and NDA.");
      return;
    }
    sessionStorage.setItem("acceptedTCNDA", "true");
    setNotice("Saved. Returning to onboarding…");
    setTimeout(() => navigate("/expert/onboarding"), 600);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-4">Terms & Conditions + NDA</h1>
      <div className="bg-white border border-gray-200 rounded-xl p-4 h-80 overflow-auto">
        <p className="text-sm text-gray-700">
          <b>Prototype text:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          vulputate, nunc id auctor pellentesque, magna leo hendrerit neque, ut ornare dolor velit quis
          sapien. Aliquam blandit, arcu id fermentum dictum, augue velit ultricies augue, sit amet
          vulputate odio nibh quis magna. {/* Add more lorem as needed */}
        </p>
        <p className="text-xs text-gray-500 mt-4">This preview is non-binding. Prototype only — no legal effect.</p>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input id="agree" type="checkbox" className="w-4 h-4" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        <label htmlFor="agree" className="text-sm text-gray-700">
          I agree to the Terms &amp; Conditions and NDA
        </label>
      </div>

      {notice && <div className="mt-3 text-sm text-[#0A2540] bg-[#00B7C2]/10 border border-[#00B7C2]/30 rounded px-3 py-2">{notice}</div>}

      <div className="mt-4 flex gap-2">
        <button className="px-3 py-1.5 rounded-lg border hover:bg-gray-50" onClick={() => navigate(-1)}>Back</button>
        <button className="px-3 py-1.5 rounded-lg bg-primary text-white" onClick={accept}>Accept &amp; Continue</button>
      </div>
      <p className="text-xs text-gray-500 mt-2">Prototype only — no legal effect.</p>
    </div>
  );
}
