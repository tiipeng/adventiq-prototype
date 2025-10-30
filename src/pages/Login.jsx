// src/pages/Login.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../image/logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      // TODO: call your API
      await new Promise((r) => setTimeout(r, 600));
      window.location.hash = "#/dashboard";
    } catch (e) {
      setErr("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔧 Mock expert login (dev shortcut)
  const mockExpertLogin = () => {
    sessionStorage.setItem("mockRole", "expert");
    // adjust this path if your expert dashboard route differs
    window.location.hash = "#/dashboard/expert";
  };

  return (
    <main className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <img src={logo} alt="AdventIQ" className="h-8 w-auto" />
          <h1 className="text-xl font-semibold text-gray-900">Sign in</h1>
        </div>

        {/* SSO */}
        <div className="grid grid-cols-2 gap-2">
          <button className="border rounded-lg px-3 py-2 hover:bg-gray-50" type="button" title="Continue with Google">
            Continue with Google
          </button>
          <button className="border rounded-lg px-3 py-2 hover:bg-gray-50" type="button" title="Continue with Microsoft">
            Continue with Microsoft
          </button>
        </div>

        <div className="my-4 flex items-center">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-2 text-xs text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Email / Password */}
        <form onSubmit={onSubmit} className="space-y-3">
          {err && <div className="text-sm text-red-600">{err}</div>}

          <div>
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
                autoComplete="current-password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 text-gray-500 text-sm"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? "Hide password" : "Show password"}
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" className="rounded border-gray-300" />
              Remember me
            </label>
            <Link to="/forgot" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            className="w-full rounded-xl px-3 py-2 bg-primary text-white hover:opacity-90 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        {/* ---- Mock Expert Login (dev helper) ---- */}
        <div className="my-3" />

        <button
          className="w-full rounded-xl px-3 py-2 bg-gray-800 text-white hover:opacity-90"
          type="button"
          onClick={mockExpertLogin}
        >
          Login as Expert (Mock)
        </button>

        <p className="mt-4 text-sm text-gray-600">
          No account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
