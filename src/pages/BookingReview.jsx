// src/pages/BookingReview.jsx
import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { experts as expertsFromData } from "../data/mockData.js";
import TierSelector from "../components/TierSelector.jsx";
import SummaryCard from "../components/SummaryCard.jsx";

const LEADER_FLAT_FEE = 50;

function parseTeamFromSession() {
  try {
    const raw = sessionStorage.getItem("consultation_team");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((member) => {
        if (!member) return null;
        const hourlyRaw = member.hourlyRate;
        const hoursRaw = member.hours;
        const hourly =
          typeof hourlyRaw === "number"
            ? hourlyRaw
            : typeof hourlyRaw === "string"
              ? Number.parseFloat(hourlyRaw)
              : null;
        const hours =
          typeof hoursRaw === "number"
            ? hoursRaw
            : typeof hoursRaw === "string"
              ? Number.parseFloat(hoursRaw)
              : null;
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
}

function safeParsePrice(value) {
  if (value == null) return null;
  const match = String(value).match(/(\d+(?:[.,]\d+)?)/);
  if (!match) return null;
  const numeric = Number(match[1].replace(",", "."));
  return Number.isFinite(numeric) ? numeric : null;
}

export default function BookingReview() {
  const navigate = useNavigate();

  const storedExpertId = sessionStorage.getItem("booking_expertId");
  const fallbackExpertId = sessionStorage.getItem("consultation_expertId");
  const expertId = storedExpertId || fallbackExpertId;

  const date =
    sessionStorage.getItem("booking_date") ||
    sessionStorage.getItem("consultation_date") ||
    "";
  const time =
    sessionStorage.getItem("booking_time") ||
    sessionStorage.getItem("consultation_time") ||
    "";

  const consultationTeam = useMemo(parseTeamFromSession, []);

  const experts = Array.isArray(expertsFromData) ? expertsFromData : [];
  const resolvedExpertId = expertId || (consultationTeam[0]?.id ?? null);

  const expertFromDataset = useMemo(() => {
    if (!resolvedExpertId) return null;
    return experts.find((e) => String(e.id) === String(resolvedExpertId)) || null;
  }, [experts, resolvedExpertId]);

  const expertFromTeam = useMemo(() => {
    if (!consultationTeam.length) return null;
    if (resolvedExpertId) {
      const match = consultationTeam.find((member) => String(member.id) === String(resolvedExpertId));
      if (match) return match;
    }
    return consultationTeam[0];
  }, [consultationTeam, resolvedExpertId]);

  const primaryExpert = useMemo(() => {
    if (expertFromTeam) {
      const mergedTags =
        (Array.isArray(expertFromTeam.tags) && expertFromTeam.tags.length
          ? expertFromTeam.tags
          : expertFromDataset?.tags) || [];
      return {
        ...expertFromDataset,
        ...expertFromTeam,
        tags: mergedTags,
        location: expertFromTeam.location || expertFromDataset?.location || "—",
        price: expertFromTeam.price ?? expertFromDataset?.price ?? null,
        hourlyRate: expertFromTeam.hourlyRate ?? expertFromDataset?.hourlyRate ?? null,
      };
    }
    return expertFromDataset || null;
  }, [expertFromDataset, expertFromTeam]);

  const additionalTeamMembers = useMemo(() => {
    if (consultationTeam.length <= 1) return [];
    return consultationTeam.slice(1);
  }, [consultationTeam]);

  const consultationTopic = sessionStorage.getItem("consultation_topic") || "";
  const consultationSector = sessionStorage.getItem("consultation_sector") || "";
  const consultationProblemArea = sessionStorage.getItem("consultation_problemArea") || "";
  const consultationExpectations = sessionStorage.getItem("consultation_expectations") || "";
  const consultationDuration = (() => {
    const stored = parseFloat(sessionStorage.getItem("consultation_duration"));
    return Number.isFinite(stored) ? stored : null;
  })();
  const [estimatedTotal, setEstimatedTotal] = useState(() => {
    const stored = parseFloat(sessionStorage.getItem("consultation_estimatedTotal"));
    return Number.isFinite(stored) ? stored : null;
  });
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

  const initialTier = useMemo(() => {
    const storedTier = sessionStorage.getItem("booking_tier");
    if (storedTier) return storedTier;
    return sessionStorage.getItem("consultation_leader") === "true" ? "premium" : "standard";
  }, []);
  const [tier, setTier] = useState(initialTier);
  const [notes, setNotes] = useState(() => sessionStorage.getItem("booking_notes") || "");

  const baseHourly = useMemo(() => {
    if (!primaryExpert) return null;
    if (typeof primaryExpert.hourlyRate === "number" && Number.isFinite(primaryExpert.hourlyRate)) {
      return primaryExpert.hourlyRate;
    }
    return safeParsePrice(primaryExpert.price);
  }, [primaryExpert]);

  const computedTotal = useMemo(() => {
    if (!Number.isFinite(baseHourly)) return null;
    return baseHourly + (tier === "premium" ? LEADER_FLAT_FEE : 0);
  }, [baseHourly, tier]);

  useEffect(() => {
    sessionStorage.setItem("booking_tier", tier);
  }, [tier]);

  useEffect(() => {
    sessionStorage.setItem("consultation_leader", tier === "premium" ? "true" : "false");
  }, [tier]);

  useEffect(() => {
    if (computedTotal == null || computedTotal === estimatedTotal) return;
    setEstimatedTotal(computedTotal);
    sessionStorage.setItem("consultation_estimatedTotal", String(computedTotal));
  }, [computedTotal, estimatedTotal]);

  const leaderIncluded = tier === "premium";
  const canConfirm = Boolean(primaryExpert && date && time && tier);

  const onConfirm = () => {
    sessionStorage.setItem("booking_notes", notes || "");
    const ref = `AIQ-2025-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`;
    sessionStorage.setItem("booking_ref", ref);
    navigate("/booking/confirmation");
  };

  if (!primaryExpert || !date || !time) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Incomplete booking</h1>
        <p className="text-gray-600 mt-2">
          We’re missing the expert or the selected time. Please go back and choose again.
        </p>
        <div className="mt-4">
          <button
            className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
            onClick={() => navigate("/dashboard/consultation/details")}
          >
            Back to consultation details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-sm text-gray-500 mb-2">Booking · Review &amp; confirm</div>

      <h1 className="text-2xl md:text-3xl font-bold text-primary">Tier & Details</h1>
      <p className="text-gray-600 mt-2">
        Your scheduling choices from the consultation brief are carried forward. Pick a service tier and add optional context
        before sending the request.
      </p>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        {/* Left: Tier + notes */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold text-primary mb-3">Select a tier</h3>
          <TierSelector value={tier} onChange={setTier} />

          <div className="mt-4 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-[#0A2540]">
            <div className="font-semibold">Why add an AdventIQ Leader?</div>
            <p className="mt-1 text-xs md:text-sm text-[#0A2540]/80">
              They lead the entire process, help and guide you through preparation, and support across basics and
              meritoric topics so your consultation stays on track.
            </p>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-primary">Additional context / materials (optional)</h3>
            <textarea
              className="mt-2 w-full border rounded-lg px-3 py-2"
              rows={5}
              placeholder="Links, sample data, short brief… (not uploaded in this prototype)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        {/* Right: Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 h-fit">
          <SummaryCard expert={primaryExpert} dateTime={`${date} · ${time}`} tier={tier} />

          {additionalTeamMembers.length > 0 && (
            <div className="mt-4 rounded-xl border border-gray-200 px-4 py-3">
              <div className="font-semibold text-primary text-sm uppercase tracking-wide">Expert team</div>
              <p className="text-xs text-gray-600 mt-1">
                Your request includes {additionalTeamMembers.length + 1} experts. The lead expert is listed above; other
                specialists are noted here for visibility.
              </p>
              <div className="mt-3 space-y-2 text-xs text-gray-700">
                {additionalTeamMembers.map((member) => {
                  const tags = Array.isArray(member.tags)
                    ? member.tags
                    : typeof member.tags === "string"
                      ? member.tags.split(",").map((t) => t.trim()).filter(Boolean)
                      : [];
                  return (
                    <div key={member.id || member.name} className="rounded-lg border border-gray-100 px-3 py-2">
                      <div className="font-semibold text-primary text-sm">{member.name || "Expert"}</div>
                      <div className="text-[11px] text-gray-500">{member.location || "—"}</div>
                      {tags.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {(consultationTopic || consultationSector || consultationProblemArea || consultationAttachments.length) && (
            <div className="mt-4 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 space-y-2">
              <h3 className="font-semibold text-primary text-sm uppercase tracking-wide">Consultation brief</h3>
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
                <span className="text-gray-500">AdventIQ Leader:</span> {leaderIncluded ? "Included" : "Not added"}
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
                    {consultationAttachments.map((file) => {
                      const displayName =
                        typeof file === "string" ? file : file?.name || "Attachment";
                      return <li key={displayName}>{displayName}</li>;
                    })}
                  </ul>
                </div>
              )}
            </div>
          )}

          {estimatedTotal != null && (
            <div className="mt-4 rounded-xl border border-primary/40 bg-primary/5 px-4 py-3 text-sm text-[#0A2540] space-y-1">
              <div className="flex items-center justify-between font-semibold">
                <span>Estimated total</span>
                <span>€{estimatedTotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-[#0A2540]/80">
                Live session total based on the consultation brief. Final invoice is issued after expert confirmation.
              </p>
            </div>
          )}

          <div className="mt-4 flex gap-2">
            <button
              className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
              onClick={() => navigate("/dashboard/consultation/details")}
            >
              Back
            </button>
            <button
              className={`px-3 py-1.5 rounded-lg text-white ${
                canConfirm ? "bg-primary hover:opacity-90" : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={onConfirm}
              disabled={!canConfirm}
            >
              Confirm &amp; Mock Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
