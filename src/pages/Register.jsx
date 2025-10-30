import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../image/logo.png";

// Tiny password strength helper
const strength = (pw) => {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[a-z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(s, 4); // 0..4
};

export default function Register() {
  const [role, setRole] = useState("user"); // "user" | "expert"
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");

  // expert fields
  const [discipline, setDiscipline] = useState("");
  const [languages, setLanguages] = useState([]);
  const [rate, setRate] = useState("");
  const [bio, setBio] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const s = strength(pw);
  const strengthLabel = ["Very weak", "Weak", "Fair", "Good", "Strong"][s] || "Very weak";

  const onToggleLanguage = (code) => {
    setLanguages((cur) =>
      cur.includes(code) ? cur.filter((c) => c !== code) : [...cur, code]
    );
  };

  const isExpert = role === "expert";
  const canSubmit =
    email && name && pw && pw2 && pw === pw2 && acceptTerms && (!isExpert || (discipline && rate));

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!canSubmit) {
      setErr("Please complete all required fields.");
      return;
    }
    setLoading(true);
    try {
      // TODO: API call for register
      await new Promise((r) => setTimeout(r, 700));
      // On success: go to dashboard or onboarding
      window.location.hash = isExpert ? "#/dashboard/consultation" : "#/dashboard";
    } catch (e) {
      setErr("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="AdventIQ" className="h-8 w-auto" />
            <h1 className="text-xl font-semibold text-gray-900">Create account</h1>
          </div>

          {/* Tabs for role */}
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            <button
              className={`px-3 py-1.5 text-sm ${role === "user" ? "bg-primary text-white" : "bg-white"}`}
              onClick={() => setRole("user")}
              type="button"
            >
              Register as User
            </button>
            <button
              className={`px-3 py-1.5 text-sm ${role === "expert" ? "bg-primary text-white" : "bg-white"}`}
              onClick={() => setRole("expert")}
              type="button"
            >
              Register as Expert
            </button>
          </div>
        </div>

        {/* SSO */}
        <div className="grid grid-cols-2 gap-2">
          <button className="border rounded-lg px-3 py-2 hover:bg-gray-50" type="button">
            Sign up with Google
          </button>
          <button className="border rounded-lg px-3 py-2 hover:bg-gray-50" type="button">
            Sign up with Microsoft
          </button>
        </div>

        <div className="my-4 flex items-center">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-2 text-xs text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4">
          {err && <div className="md:col-span-2 text-sm text-red-600">{err}</div>}

          {/* Common fields */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Full name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Jane Doe"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 relative">
              <input
                type={show ? "text" : "password"}
                required
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 text-gray-500 text-sm"
                onClick={() => setShow((s) => !s)}
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
            {/* strength meter */}
            <div className="mt-1 flex items-center gap-2">
              <div className="flex-1 h-1 bg-gray-200 rounded">
                <div className="h-1 rounded bg-primary" style={{ width: `${(s / 4) * 100}%` }} />
              </div>
              <span className="text-xs text-gray-500">{strengthLabel}</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1">
              Use 8+ chars, including upper/lowercase, number and symbol.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm password</label>
            <input
              type="password"
              required
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="••••••••"
            />
          </div>

          {/* Expert-only fields */}
          {isExpert && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Main discipline</label>
                <input
                  value={discipline}
                  onChange={(e) => setDiscipline(e.target.value)}
                  required={isExpert}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="e.g., Bioprocess, Materials…"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Hourly rate (€/h)</label>
                <input
                  type="number"
                  min={0}
                  step={10}
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  required={isExpert}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="e.g., 180"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Languages</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {["EN", "DE", "PL"].map((code) => (
                    <label key={code} className="inline-flex items-center gap-2 text-sm border rounded-md px-2 py-1">
                      <input
                        type="checkbox"
                        checked={languages.includes(code)}
                        onChange={() => onToggleLanguage(code)}
                      />
                      {code}
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Short bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 min-h-[90px]"
                  placeholder="Expertise, methods, facilities, examples of work…"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">LinkedIn (optional)</label>
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="https://www.linkedin.com/in/username"
                />
              </div>

              {/* Future: verification / NDA notice */}
              <div className="md:col-span-2 text-xs text-gray-500">
                After sign-up, we may ask for verification (e.g., affiliation, portfolio). NDAs and contracts can be managed from your dashboard.
              </div>
            </>
          )}

          {/* Consents */}
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="inline-flex items-start gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                className="mt-1 rounded border-gray-300"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                required
              />
              <span>
                I agree to the{" "}
                <a href="/terms" className="text-primary hover:underline">
                  Terms
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </a>
                .
              </span>
            </label>

            <label className="inline-flex items-start gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                className="mt-1 rounded border-gray-300"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
              />
              <span>Send me product updates and tips (optional).</span>
            </label>
          </div>

          <div className="md:col-span-2">
            <button
              className="w-full rounded-xl px-3 py-2 bg-primary text-white hover:opacity-90 disabled:opacity-50"
              disabled={!canSubmit || loading}
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}