import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  // Simple placeholder language picker; persists to localStorage
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'EN');
  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  return (
    <main className="landing-page" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Language switcher placeholder at top-right */}
      <div style={{ position: 'absolute', top: 12, right: 12 }}>
        <label htmlFor="lang" className="sr-only">Language</label>
        <select
          id="lang"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          aria-label="Language"
          style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd' }}
        >
          <option value="EN">EN</option>
          <option value="DE">DE</option>
          <option value="PL">PL</option>
        </select>
      </div>

      {/* Hero / Header */}
      <section style={{ padding: '72px 20px 24px', textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: 42, lineHeight: 1.2 }}>AdventIQ</h1>

        {/* ✅ Updated tagline WITHOUT AI */}
        <p className="tagline" style={{ marginTop: 12, fontSize: 18, opacity: 0.85 }}>
          Find experts and rent labs for your next innovation step.
        </p>

        {/* CTA buttons */}
        <div className="cta" style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'center' }}>
          {/* Prefer client-side routing with Link */}
          <Link to="/dashboard/consultation" className="btn btn-primary" style={btnPrimary}>
            Start now
          </Link>

          {/* If you prefer programmatic navigation:
          <button style={btnPrimary} onClick={() => navigate('/dashboard/consultation')}>
            Start now
          </button>
          */}

          <Link to="/dashboard" className="btn btn-secondary" style={btnSecondary}>
            Dashboard
          </Link>
        </div>
      </section>

      {/* Features / Body (placeholder content – keep your existing sections if you have them) */}
      <section style={{ maxWidth: 1000, margin: '40px auto', padding: '0 20px' }}>
        <div style={cardsGrid}>
          <article style={card}>
            <h3>Find Experts</h3>
            <p>Connect with vetted experts to accelerate your R&amp;D.</p>
          </article>
          <article style={card}>
            <h3>Rent Labs</h3>
            <p>Access specialized facilities on demand.</p>
          </article>
          <article style={card}>
            <h3>From Idea to Validation</h3>
            <p>Plan, execute, and validate your innovation with the right partners.</p>
          </article>
        </div>
      </section>
    </main>
  );
}

const btnBase = {
  display: 'inline-block',
  padding: '10px 16px',
  borderRadius: 8,
  border: '1px solid transparent',
  fontWeight: 600,
  textDecoration: 'none',
  cursor: 'pointer',
};
const btnPrimary = {
  ...btnBase,
  background: '#111827',
  color: 'white',
  borderColor: '#111827',
};
const btnSecondary = {
  ...btnBase,
  background: 'white',
  color: '#111827',
  borderColor: '#D1D5DB',
};
const cardsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: 16,
};
const card = {
  padding: 16,
  borderRadius: 12,
  border: '1px solid #eee',
  background: 'white',
};
