// src/components/ProfileForm.jsx
import React, { useState } from "react";

export default function ProfileForm({ initial = {}, onSave }) {
  const [form, setForm] = useState({
    fullName: initial.fullName || "",
    title: initial.title || "",
    rate: initial.rate || "",
    tags: initial.tags || "",
    bio: initial.bio || "",
    location: initial.location || "",
    email: initial.email || "",
    phone: initial.phone || "",
    website: initial.website || "",
    linkedin: initial.linkedin || "",
  });
  const [notice, setNotice] = useState("");

  const save = (e) => {
    e.preventDefault();
    onSave && onSave(form);
    setNotice("Saved (prototype).");
    setTimeout(() => setNotice(""), 1200);
  };

  return (
    <form onSubmit={save} className="space-y-4">
      {notice && <div className="rounded bg-green-50 border border-green-200 text-green-800 px-3 py-2 text-sm">{notice}</div>}

      <div>
        <h4 className="font-semibold text-primary">Personal Info</h4>
        <div className="mt-2 grid md:grid-cols-2 gap-3">
          <input className="border rounded-lg px-3 py-2" placeholder="Full name" value={form.fullName} onChange={e=>setForm({...form, fullName: e.target.value})} />
          <input className="border rounded-lg px-3 py-2" placeholder="Academic title" value={form.title} onChange={e=>setForm({...form, title: e.target.value})} />
          <input className="border rounded-lg px-3 py-2 md:col-span-2" placeholder="Location" value={form.location} onChange={e=>setForm({...form, location: e.target.value})} />
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-primary">Expertise & Tags</h4>
        <input className="mt-2 border rounded-lg px-3 py-2 w-full" placeholder="Tags (comma-separated)" value={form.tags} onChange={e=>setForm({...form, tags: e.target.value})} />
      </div>

      <div>
        <h4 className="font-semibold text-primary">Pricing</h4>
        <input className="mt-2 border rounded-lg px-3 py-2 w-full" placeholder="Hourly rate (e.g., €250/h)" value={form.rate} onChange={e=>setForm({...form, rate: e.target.value})} />
      </div>

      <div>
        <h4 className="font-semibold text-primary">Contact</h4>
        <div className="mt-2 grid md:grid-cols-2 gap-3">
          <input className="border rounded-lg px-3 py-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
          <input className="border rounded-lg px-3 py-2" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} />
          <input className="border rounded-lg px-3 py-2 md:col-span-2" placeholder="Website" value={form.website} onChange={e=>setForm({...form, website: e.target.value})} />
          <input className="border rounded-lg px-3 py-2 md:col-span-2" placeholder="LinkedIn" value={form.linkedin} onChange={e=>setForm({...form, linkedin: e.target.value})} />
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-primary">Bio</h4>
        <textarea className="mt-2 border rounded-lg px-3 py-2 w-full" rows={5} placeholder="Short bio summary" value={form.bio} onChange={e=>setForm({...form, bio: e.target.value})} />
      </div>

      <div className="pt-2">
        <button type="submit" className="px-3 py-1.5 rounded-lg bg-primary text-white">Save Profile</button>
      </div>
    </form>
  );
}
