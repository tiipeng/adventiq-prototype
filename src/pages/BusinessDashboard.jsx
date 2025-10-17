// src/pages/BusinessDashboard.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// Static import of what's actually exported
import { bookings as bookingsDataFile } from "../data/mockData.js";

const STATUS_BADGE = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-700",
  canceled: "bg-red-100 text-red-700",
};

export default function BusinessDashboard() {
  const navigate = useNavigate();

  // Use imported bookings or a safe fallback so the page always renders
  const bookingsData =
    Array.isArray(bookingsDataFile) && bookingsDataFile.length
      ? bookingsDataFile
      : [
          {
            id: "bk-1001",
            expert: "Dr. Jane Bauer",
            date: "2025-11-06",
            time: "10:30",
            status: "confirmed",
            tier: "Premium",
            report: false,
          },
          {
            id: "bk-1002",
            expert: "Prof. Alan Smith",
            date: "2025-11-12",
            time: "14:00",
            status: "pending",
            tier: "Standard",
            report: false,
          },
          {
            id: "bk-1003",
            expert: "Dr. Linh Nguyen",
            date: "2025-11-18",
            time: "09:00",
            status: "completed",
            tier: "Premium",
            report: true,
          },
        ];

  // Local fallback for reports (since mockData.js doesn't export reports)
  const reportsData = [
    {
      id: "rp-501",
      title: "Consultation Summary — AI in Manufacturing",
      expert: "Dr. Jane Bauer",
      date: "2025-10-28",
    },
    {
      id: "rp-502",
      title: "Materials Fatigue — Initial Findings",
      expert: "Prof. Alan Smith",
      date: "2025-10-15",
    },
  ];

  const [filter, setFilter] = useState("All");

  const filteredBookings = useMemo(() => {
    if (filter === "All") return bookingsData;
    return bookingsData.filter((b) => b.status.toLowerCase() === filter.toLowerCase());
  }, [filter, bookingsData]);

  const ongoing = useMemo(
    () => bookingsData.filter((b) => ["pending", "confirmed"].includes(b.status)).slice(0, 3),
    [bookingsData]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb + Header */}
      <div className="text-sm text-gray-500">Dashboard</div>
      <div className="mt-1 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Business Dashboard</h1>
        <div className="hidden md:flex gap-2">
          <button
            className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
            onClick={() => navigate("/dashboard/consultation")}
          >
            Start Expert Consultation
          </button>
          <button
            className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
            onClick={() => navigate("/dashboard/labs")}
          >
            Explore Labs
          </button>
          <button
            className="px-3 py-1.5 rounded-lg bg-primary text-white"
            onClick={() => navigate("/dashboard/consultation/browse")}
          >
            Browse Experts
          </button>
        </div>
      </div>

      {/* Quick actions (mobile) */}
      <div className="mt-4 md:hidden grid grid-cols-2 gap-2">
        <button
          className="px-3 py-2 rounded-lg border hover:bg-gray-50 text-sm"
          onClick={() => navigate("/dashboard/consultation")}
        >
          Start Consultation
        </button>
        <button
          className="px-3 py-2 rounded-lg border hover:bg-gray-50 text-sm"
          onClick={() => navigate("/dashboard/labs")}
        >
          Explore Labs
        </button>
        <button
          className="px-3 py-2 rounded-lg border hover:bg-gray-50 text-sm col-span-2"
          onClick={() => navigate("/dashboard/consultation/browse")}
        >
          Browse Experts
        </button>
      </div>

      {/* Ongoing cards */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold text-primary">Ongoing</h2>
        <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ongoing.map((o) => (
            <div key={o.id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium text-primary">{o.expert}</div>
                <span
                  className={`text-xs px-2 py-0.5 rounded ${
                    STATUS_BADGE[o.status] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {o.status}
                </span>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {o.date} · {o.time}
              </div>
              <div className="text-xs text-gray-500 mt-1">Tier: {o.tier}</div>
              <div className="mt-3 flex gap-2">
                <button
                  className="px-3 py-1.5 rounded-lg border text-sm hover:bg-gray-50"
                  onClick={() => navigate("/dashboard/consultation/browse")}
                >
                  View
                </button>
                <button
                  className="px-3 py-1.5 rounded-lg border text-sm hover:bg-gray-50"
                  onClick={() => navigate("/dashboard/consultation/browse")}
                >
                  Book another
                </button>
              </div>
            </div>
          ))}
          {!ongoing.length && (
            <div className="sm:col-span-2 lg:col-span-3 bg-white border border-gray-200 rounded-xl p-5 text-sm text-gray-600">
              No ongoing bookings. Start by{" "}
              <button className="underline" onClick={() => navigate("/dashboard/consultation")}>
                starting a consultation
              </button>{" "}
              or{" "}
              <button className="underline" onClick={() => navigate("/dashboard/labs")}>
                exploring labs
              </button>
              .
            </div>
          )}
        </div>
      </section>

      {/* My Bookings */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-primary">My Bookings</h2>
          <div className="flex gap-2">
            {["All", "Pending", "Confirmed", "Completed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full border text-sm ${
                  filter === f ? "bg-primary text-white border-primary" : "hover:bg-gray-50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 overflow-x-auto bg-white border border-gray-200 rounded-xl">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="px-4 py-3">Expert</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Report</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b) => (
                <tr key={b.id} className="border-t">
                  <td className="px-4 py-3 font-medium text-primary">{b.expert}</td>
                  <td className="px-4 py-3">{b.date}</td>
                  <td className="px-4 py-3">{b.time}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        STATUS_BADGE[b.status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{b.report ? "Ready" : "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex gap-2">
                      <button
                        className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
                        onClick={() => navigate("/dashboard/consultation/browse")}
                        title="Prototype only"
                      >
                        View
                      </button>
                      {b.status !== "completed" && (
                        <button
                          className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
                          onClick={() => navigate("/dashboard/consultation/browse")}
                        >
                          Rebook
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {!filteredBookings.length && (
                <tr>
                  <td className="px-4 py-6 text-sm text-gray-600" colSpan={6}>
                    No bookings in this view.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* My Reports */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-primary">My Reports</h2>
        <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportsData.map((r) => (
            <div key={r.id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="font-medium text-primary">{r.title}</div>
              <div className="text-sm text-gray-600 mt-1">{r.expert}</div>
              <div className="text-xs text-gray-500 mt-1">{r.date}</div>
              <div className="mt-3 flex gap-2">
                <button
                  className="px-3 py-1.5 rounded-lg border text-sm hover:bg-gray-50"
                  onClick={() => alert("Opening report (prototype)")}
                >
                  View Report
                </button>
                <button
                  className="px-3 py-1.5 rounded-lg border text-sm text-gray-400 cursor-not-allowed"
                  disabled
                  title="Disabled in prototype"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
          {!reportsData.length && (
            <div className="sm:col-span-2 lg:col-span-3 bg-white border border-gray-200 rounded-xl p-5 text-sm text-gray-600">
              No reports yet. Your consultation summaries will appear here.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
