// src/pages/ExpertProfile.jsx
import React, { useState } from "react";
import ProfileForm from "../components/ProfileForm.jsx";

export default function ExpertProfile() {
  const [profile, setProfile] = useState(() => {
    const prev = sessionStorage.getItem("expertProfile") || "{}";
    return JSON.parse(prev);
  });
  const [banner, setBanner] = useState("");

  const onSave = (data) => {
    sessionStorage.setItem("expertProfile", JSON.stringify(data));
    sessionStorage.setItem("expertProfileSaved", "true");
    setProfile(data);
    setBanner("Profile saved (prototype).");
    setTimeout(() => setBanner(""), 1200);
  };

  const tags = (profile.tags || "").split(",").map(t => t.trim()).filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-primary">Expert Profile</h1>
      {banner && <div className="mt-3 rounded bg-green-50 border border-green-200 text-green-800 px-3 py-2 text-sm">{banner}</div>}

      <div className="mt-6 grid lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <ProfileForm initial={profile} onSave={onSave} />
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold text-primary">Live preview</h3>
          <div className="mt-3">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                {(profile.fullName || "Jane Doe").split(" ").slice(0,2).map(n=>n[0]).join("").toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-primary">{profile.fullName || "Dr. Jane Doe"}</div>
                <div className="text-sm text-gray-600">{profile.title || "PhD, Expert"}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {tags.length ? tags.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs">{t}</span>
                  )) : <span className="text-xs text-gray-500">No tags</span>}
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                  <div>
                    <div className="text-gray-500">Rate</div>
                    <div className="font-medium">{profile.rate || "€250/h"}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Location</div>
                    <div className="font-medium">{profile.location || "Berlin, DE"}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-3">{profile.bio || "Short bio summary will appear here."}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
