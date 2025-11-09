// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../image/logo.png";

const linkBase =
  "px-3 py-2 text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50";
const linkActive = "text-white bg-primary";
const linkIdle = "text-gray-700 hover:bg-gray-100";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(() => sessionStorage.getItem("role")); // "business" | "expert" | null
  const navigate = useNavigate();
  const location = useLocation();

  // Refresh the role when the route changes (so Navbar reflects latest login state)
  useEffect(() => {
    setRole(sessionStorage.getItem("role"));
  }, [location]);

  const Logo = () => (
    <button
      onClick={() => {
        navigate("/");
        setOpen(false);
      }}
      className="flex items-center gap-2"
      aria-label="AdventIQ home"
    >
      <img src={logo} alt="AdventIQ" className="h-8 w-auto" />
    </button>
  );

  const LinkItem = ({ to, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}
      onClick={() => setOpen(false)}
    >
      {children}
    </NavLink>
  );

  const handleLogout = () => {
    sessionStorage.removeItem("role");
    setRole(null);
    navigate("/");
    setOpen(false);
  };

  const dashboardPath = role === "expert" ? "/expert" : "/dashboard";

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          <LinkItem to="/">Home</LinkItem>
          <LinkItem to="/how-it-works">How It Works</LinkItem>
          <LinkItem to="/about">About</LinkItem>
          <LinkItem to="/expert/flow">Expertflow</LinkItem>

          {/* Show Dashboard if logged in as business or expert */}
          {role && <LinkItem to={dashboardPath}>Dashboard</LinkItem>}


          {!role ? (
            <>
              <LinkItem to="/login">Login</LinkItem>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : "bg-primary text-white hover:opacity-90"}`
                }
                onClick={() => setOpen(false)}
              >
                Register
              </NavLink>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="ml-2 px-3 py-2 text-sm rounded-lg border hover:bg-gray-50"
            >
              Logout
            </button>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" className="text-primary">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 flex flex-col gap-1">
            <LinkItem to="/">Home</LinkItem>
            <LinkItem to="/how-it-works">How It Works</LinkItem>
            <LinkItem to="/about">About</LinkItem>
            <LinkItem to="/expert/flow">Expertflow</LinkItem>
            {!role ? (
              <>
                <LinkItem to="/login">Login</LinkItem>
                <button
                  onClick={() => {
                    navigate("/register");
                    setOpen(false);
                  }}
                  className="mt-1 px-3 py-2 rounded-lg bg-primary text-white text-sm"
                >
                  Register
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="mt-1 px-3 py-2 rounded-lg border text-sm hover:bg-gray-50"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
