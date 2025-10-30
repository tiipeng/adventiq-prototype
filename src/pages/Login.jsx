// src/pages/Login.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const loginBusiness = () => {
    sessionStorage.setItem("role", "business");
    navigate("/dashboard");
  };

  const loginExpert = () => {
    sessionStorage.setItem("role", "expert");
    navigate("/expert");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-primary mb-4">Login</h1>

        {/* Mock fields (non-functional) */}
        <label className="block text-sm text-gray-600 mb-1">Email</label>
        <input
          className="w-full border rounded-lg px-3 py-2 mb-3"
          placeholder="you@company.com"
          type="email"
        />
        <label className="block text-sm text-gray-600 mb-1">Password</label>
        <input
          className="w-full border rounded-lg px-3 py-2 mb-4"
          placeholder="••••••••"
          type="password"
        />

        {/* Business */}
        <button
          className="w-full rounded-lg bg-primary text-white px-4 py-2 hover:opacity-90"
          onClick={loginBusiness}
        >
          Login as Business (mock)
        </button>

        <div className="my-4 text-center text-xs text-gray-400">or</div>

        {/* Expert */}
        <button
          className="w-full rounded-lg border px-4 py-2 hover:bg-gray-50"
          onClick={loginExpert}
        >
          Login as Expert (mock)
        </button>

        <p className="text-xs text-gray-500 mt-3">
          Prototype only — no real authentication.
        </p>
      </div>
    </div>
  );
}
