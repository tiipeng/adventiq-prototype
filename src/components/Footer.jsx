import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t border-neutral bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-gray-500 flex flex-col md:flex-row items-center justify-between gap-3">
        <p>© 2025 AdventIQ. We enable the Fast Forward.</p>
        <div className="flex gap-4">
          <a className="hover:text-primary" href="#">Privacy</a>
          <a className="hover:text-primary" href="#">Terms</a>
          <a className="hover:text-primary" href="#">Contact</a>
        </div>
      </div>
    </footer>
  )
}
