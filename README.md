# AdventIQ Prototype (Static UI)

A static, clickable prototype of the AdventIQ platform built with **React + Vite + Tailwind**.
This is **frontend only** and ready for Netlify.

## Quick Start

```bash
npm i
npm run dev
```

## Build (Static Files)

```bash
npm run build
# output in dist/
```

Deploy the `dist/` folder to Netlify (Drag & Drop or connect repo).
Because we use **HashRouter**, no special redirects are required.

## Structure

- `src/pages/*` — Landing, Role selection, Dashboards (Business, Expert, Lab), Booking flow, Reports, Admin
- `src/components/*` — Navbar, Footer, Card, Modal, Sidebar, CalendarMock
- `src/mockData.js` — Example experts, labs, bookings
- Tailwind config, PostCSS config included
