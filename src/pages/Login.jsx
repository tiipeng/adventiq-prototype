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

        {/* Mock fields */}
        <input className="w-full border rounded-lg px-3 py-2 mb-3" placeholder="Email" />
        <input className="w-full border rounded-lg px-3 py-2 mb-4" placeholder="Password" type="password" />

        {/* Business */}
        <button
          className="w-full rounded-lg bg-primary text-white px-4 py-2 hover:opacity-90"
          onClick={loginBusiness}
        >
          Sign in as Business (mock)
        </button>

        <div className="my-4 text-center text-xs text-gray-400">or</div>

        {/* Expert */}
        <button
          className="w-full rounded-lg border px-4 py-2 hover:bg-gray-50"
          onClick={loginExpert}
        >
          Continue as Expert (mock)
        </button>

        <p className="text-xs text-gray-500 mt-3">
          Prototype only — no real authentication.
        </p>
      </div>
    </div>
  );
}
