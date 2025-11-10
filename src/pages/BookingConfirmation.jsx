// src/pages/BookingConfirmation.jsx
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { experts as expertsFromData } from "../data/mockData.js";
import SummaryCard from "../components/SummaryCard.jsx";

export default function BookingConfirmation() {
  const navigate = useNavigate();

  const expertId = sessionStorage.getItem("booking_expertId");

  const date =
    sessionStorage.getItem("booking_date") ||
    sessionStorage.getItem("consultation_date");
  const time =
    sessionStorage.getItem("booking_time") ||
    sessionStorage.getItem("consultation_time");
  const tier = sessionStorage.getItem("booking_tier") || "standard";
  const ref = sessionStorage.getItem("booking_ref") || "AIQ-2025-0000";
  const notes = sessionStorage.getItem("booking_notes") || "";

  const consultationTopic = sessionStorage.getItem("consultation_topic") || "";
  const consultationSector = sessionStorage.getItem("consultation_sector") || "";
  const consultationProblemArea =
    sessionStorage.getItem("consultation_problemArea") || "";
  const consultationExpectations =
    sessionStorage.getItem("consultation_expectations") || "";
  const consultationDuration = (() => {
    const stored = parseFloat(sessionStorage.getItem("consultation_duration"));
    return Number.isFinite(stored) ? stored : null;
  })();
  const consultationLeaderIncluded =
    sessionStorage.getItem("consultation_leader") === "true";
  const consultationTotal = (() => {
    const stored = parseFloat(sessionStorage.getItem("consultation_estimatedTotal"));
    return Number.isFinite(stored) ? stored : null;
  })();
  const consultationAttachments = useMemo(() => {
    try {
      const raw = sessionStorage.getItem("consultation_attachments");
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.warn("Unable to parse consultation attachments", error);
      return [];
    }
  }, []);

  const consultationTeam = useMemo(() => {
    try {
      const raw = sessionStorage.getItem("consultation_team");
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed
        .map((member) => {
          if (!member) return null;
          const hourly = Number.isFinite(member.hourlyRate)
            ? member.hourlyRate
            : Number(member.hourlyRate);
          const hours = Number.isFinite(member.hours)
            ? member.hours
            : Number(member.hours);
          return {
            ...member,
            hourlyRate: Number.isFinite(hourly) ? hourly : null,
            hours: Number.isFinite(hours) ? hours : null,
          };
        })
        .filter(Boolean);
    } catch (error) {
      console.warn("Unable to parse consultation team", error);
      return [];
    }
  }, []);

  const additionalTeamMembers = useMemo(() => {
    if (consultationTeam.length <= 1) return [];
    return consultationTeam.slice(1);
  }, [consultationTeam]);

  const experts = Array.isArray(expertsFromData) ? expertsFromData : [];
  const expertFromDataset = useMemo(
    () => experts.find((e) => String(e.id) === String(expertId)),
    [experts, expertId]
  );
  const expertFromTeam = useMemo(() => {
    if (!consultationTeam.length) return null;
    const match = consultationTeam.find(
      (member) => String(member.id) === String(expertId)
    );
    return match || consultationTeam[0];
  }, [consultationTeam, expertId]);

  const primaryExpert = useMemo(() => {
    if (expertFromTeam) {
      return {
        ...expertFromDataset,
        ...expertFromTeam,
        tags:
          (Array.isArray(expertFromTeam.tags) && expertFromTeam.tags.length
            ? expertFromTeam.tags
            : expertFromDataset?.tags) || [],
        location:
          expertFromTeam.location ||
          expertFromDataset?.location ||
          "—",
        price:
          expertFromTeam.price || expertFromDataset?.price || null,
        rating:
          expertFromTeam.rating ?? expertFromDataset?.rating ?? null,
      };
    }
    return expertFromDataset || null;
  }, [expertFromDataset, expertFromTeam]);

  const hasBriefDetails = Boolean(
    consultationTopic ||
      consultationSector ||
      consultationProblemArea ||
      consultationAttachments.length
  );

  const goToMyBookings = () => {
    // No real route in prototype — send to dashboard as a stand-in
    navigate("/dashboard");
  };

  if (!primaryExpert || !date || !time) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Booking details missing</h1>
        <p className="text-gray-600 mt-2">Please restart the booking process.</p>
        <div className="mt-4">
          <button
            className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
            onClick={() => navigate("/dashboard/consultation/browse")}
          >
            Back to Experts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-sm text-gray-500 mb-2">Booking · Request sent</div>

      <div className="rounded-xl border border-green-200 bg-green-50 text-green-800 px-4 py-3">
        <div className="font-semibold">Booking confirmed (Prototype)</div>
        <div className="text-sm">Reference: <span className="font-mono">{ref}</span></div>
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="font-semibold text-primary">Summary</h2>
          <div className="mt-3 space-y-4">
            <SummaryCard
              expert={primaryExpert}
              dateTime={`${date} · ${time}`}
              tier={tier}
            />

            {consultationTeam.length > 1 && (
              <div className="rounded-xl border border-gray-200 px-4 py-3">
                <div className="font-semibold text-primary text-sm uppercase tracking-wide">
                  Expert team
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Your consultation includes {consultationTeam.length} experts. The lead
                  expert is shown above; the additional specialists are listed below.
                </p>
                <div className="mt-3 space-y-3">
                  {additionalTeamMembers.map((member) => {
                    const tags = Array.isArray(member.tags)
                      ? member.tags
                      : typeof member.tags === "string"
                        ? member.tags.split(",").map((t) => t.trim()).filter(Boolean)
                        : [];
                    const total =
                      Number.isFinite(member.hourlyRate) && Number.isFinite(member.hours)
                        ? member.hourlyRate * member.hours
                        : null;
                    return (
                      <div
                        key={member.id || member.name}
                        className="rounded-lg border border-gray-100 px-4 py-3"
                      >
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <div className="font-semibold text-primary">
                              {member.name || "Expert"}
                            </div>
                            <div className="text-xs text-gray-500">
                              {member.location || "—"}
                            </div>
                            {tags.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="text-sm text-gray-700 sm:text-right">
                            {Number.isFinite(member.hours) && (
                              <div>{member.hours} h</div>
                            )}
                            {Number.isFinite(member.hourlyRate) && (
                              <div>€{member.hourlyRate.toFixed(0)}/h</div>
                            )}
                            {total != null && (
                              <div className="font-semibold text-primary">
                                €{total.toFixed(0)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {notes && (
              <div className="rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700">
                <div className="font-semibold text-primary text-sm uppercase tracking-wide">
                  Additional context
                </div>
                <p className="mt-2 whitespace-pre-wrap">{notes}</p>
              </div>
            )}

            {hasBriefDetails && (
              <div className="rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 space-y-2">
                <div className="font-semibold text-primary text-sm uppercase tracking-wide">
                  Consultation brief
                </div>
                {consultationTopic && (
                  <div>
                    <span className="text-gray-500">Topic:</span> {consultationTopic}
                  </div>
                )}
                {consultationSector && (
                  <div>
                    <span className="text-gray-500">Sector:</span> {consultationSector}
                  </div>
                )}
                {consultationProblemArea && (
                  <div>
                    <span className="text-gray-500">Problem area:</span> {consultationProblemArea}
                  </div>
                )}
                {consultationDuration && (
                  <div>
                    <span className="text-gray-500">Duration:</span> {consultationDuration.toFixed(1)} h
                  </div>
                )}
                <div>
                  <span className="text-gray-500">AdventIQ Leader:</span> {consultationLeaderIncluded ? "Included" : "Not added"}
                </div>
                {consultationExpectations && (
                  <div className="text-gray-600 whitespace-pre-wrap border-t border-gray-100 pt-2 text-xs">
                    {consultationExpectations}
                  </div>
                )}
                {consultationAttachments.length > 0 && (
                  <div className="text-xs text-gray-600 border-t border-gray-100 pt-2 space-y-1">
                    <div className="font-semibold text-gray-700">Attachments</div>
                    <ul className="list-disc pl-5 space-y-1">
                      {consultationAttachments.map((file) => (
                        <li key={file.name || file}>{file.name || String(file)}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {consultationTotal != null && (
              <div className="rounded-xl border border-primary/40 bg-primary/5 px-4 py-3 text-sm text-[#0A2540] space-y-1">
                <div className="flex items-center justify-between font-semibold">
                  <span>Estimated total</span>
                  <span>€{consultationTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-[#0A2540]/80">
                  Live session total based on the consultation brief. Final invoice is issued after expert confirmation.
                </p>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500">
            Payment and notifications are mocked in this prototype.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 h-fit">
          <h3 className="font-semibold text-primary">Next steps</h3>
          <ul className="mt-2 text-sm text-gray-700 list-disc pl-5 space-y-1">
            <li>Await expert acceptance — they can confirm or propose an alternative (prototype).</li>
            <li>Calendars sync automatically once accepted; invites are generated by AdventIQ (prototype).</li>
            <li>A consultation summary/report will appear in “My Reports” after the session (prototype).</li>
          </ul>

          <div className="mt-4 flex flex-col gap-2">
            <button
              className="px-3 py-1.5 rounded-lg bg-primary text-white"
              onClick={goToMyBookings}
            >
              Go to My Bookings
            </button>
            <button
              className="px-3 py-1.5 rounded-lg border text-gray-400 cursor-not-allowed"
              disabled
              title="Disabled in prototype"
            >
              Download Confirmation (PDF)
            </button>
            <button
              className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
              onClick={() => navigate("/dashboard/consultation/browse")}
            >
              Book another expert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
