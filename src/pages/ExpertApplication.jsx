// src/pages/ExpertApplication.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const defaultForm = {
  fullName: "",
  title: "",
  email: "",
  organization: "",
  tags: "",
  rate: "",
  bio: "",
  linkedin: "",
  orcid: "",
  location: "",
  languages: "",
  invoicing: false,
};

export default function ExpertApplication() {
  const navigate = useNavigate();
  const [form, setForm] = useState(defaultForm);
  const [notice, setNotice] = useState("");

  const submit = (e) => {
    e.preventDefault();
    // Pretend submit
    sessionStorage.setItem("applicationSubmitted", "true");
    setNotice("Application submitted (prototype). Redirecting…");
    setTimeout(() => navigate("/expert/approval"), 800);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-primary">Become an Expert</h1>
      <p className="text-gray-600 mt-2">Submit your application. Visual only; no backend.</p>

      {notice && <div className="mt-3 rounded bg-[#00B7C2]/10 border border-[#00B7C2]/30 text-[#0A2540] px-3 py-2 text-sm">{notice}</div>}

      <form className="mt-6 bg-white border border-gray-200 rounded-xl p-5 grid md:grid-cols-2 gap-4" onSubmit={submit}>
        <input className="border rounded-lg px-3 py-2" placeholder="Full name" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} />
        <input className="border rounded-lg px-3 py-2" placeholder="Academic title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input className="border rounded-lg px-3 py-2" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input className="border rounded-lg px-3 py-2" placeholder="Institution / Company" value={form.organization} onChange={e => setForm({ ...form, organization: e.target.value })} />
        <input className="border rounded-lg px-3 py-2" placeholder="Expertise tags (comma-separated)" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
        <input className="border rounded-lg px-3 py-2" placeholder="Hourly rate (e.g., €250/h)" value={form.rate} onChange={e => setForm({ ...form, rate: e.target.value })} />
        <input className="border rounded-lg px-3 py-2" placeholder="LinkedIn (optional)" value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })} />
        <input className="border rounded-lg px-3 py-2" placeholder="ORCID (optional)" value={form.orcid} onChange={e => setForm({ ...form, orcid: e.target.value })} />
        <input className="border rounded-lg px-3 py-2" placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
        <input className="border rounded-lg px-3 py-2" placeholder="Languages" value={form.languages} onChange={e => setForm({ ...form, languages: e.target.value })} />
        <div className="md:col-span-2">
          <textarea className="w-full border rounded-lg px-3 py-2" rows={5} placeholder="Bio summary" value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />
        </div>
        <div className="md:col-span-2 flex items-center gap-2">
          <input id="inv" type="checkbox" className="w-4 h-4" checked={form.invoicing} onChange={e => setForm({ ...form, invoicing: e.target.checked })} />
          <label htmlFor="inv" className="text-sm text-gray-700">I confirm I can issue invoices per local regulations</label>
        </div>

        <div className="md:col-span-2 flex gap-2">
          <button type="button" className="px-3 py-1.5 rounded-lg border hover:bg-gray-50" onClick={() => navigate(-1)}>Back</button>
          <button type="submit" className="px-3 py-1.5 rounded-lg bg-primary text-white">Submit application</button>
        </div>
      </form>
    </div>
  );
}
