// /src/components/Sidebar.jsx
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar({ items = [] }) {
  return (
    <aside className="w-full md:w-64 shrink-0 border-r border-neutral bg-white sticky top-[57px] h-[calc(100vh-57px)]">
      <nav className="p-4 space-y-1">
        {items.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg text-sm transition ${
                isActive ? 'bg-primary text-white' : 'hover:bg-neutral'
              }`
            }
            end
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
