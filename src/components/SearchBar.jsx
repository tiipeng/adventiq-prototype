// src/components/SearchBar.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react'

/**
 * Props:
 *  onSelect(type, payload)
 *    type: "expert" | "lab" | "ai"
 *    payload: { label: string }
 */
export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const suggestions = useMemo(() => {
    // Always the same three groups (static mock); optionally filter by query for UX.
    const matches = (s) => !query || s.toLowerCase().includes(query.toLowerCase())
    const experts = [
      { id: 'exp-1', type: 'expert', label: 'AI in Manufacturing – 12 experts found' },
    ].filter(x => matches(x.label))
    const labs = [
      { id: 'lab-1', type: 'lab', label: 'Materials Testing Lab – 3 labs available' },
    ].filter(x => matches(x.label))
    const ai = [
      { id: 'ai-1', type: 'ai', label: 'Ask AI Assistant – coming soon (Beta)' },
    ].filter(x => matches(x.label))

    const groups = [
      { title: 'Experts', items: experts },
      { title: 'Labs', items: labs },
      { title: 'AI Assistant', items: ai },
    ]

    // Flatten for keyboard nav
    const flat = []
    groups.forEach(g => g.items.forEach(i => flat.push(i)))
    return { groups, flat }
  }, [query])

  useEffect(() => {
    // Reset highlight when opening or query changes
    setActive(0)
  }, [open, query])

  const handleKeyDown = (e) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setOpen(true)
      return
    }
    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive(prev => Math.min(prev + 1, suggestions.flat.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const item = suggestions.flat[active]
      if (item) {
        (onSelect || defaultSelect)(item.type, { label: item.label })
        setOpen(false)
        inputRef.current?.blur()
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  const defaultSelect = (type, payload) => {
    // eslint-disable-next-line no-console
    console.log('Selected:', type, payload)
    // eslint-disable-next-line no-alert
    alert(`${payload.label}`)
  }

  const handleClickItem = (item) => {
    (onSelect || defaultSelect)(item.type, { label: item.label })
    setOpen(false)
  }

  const activeId = suggestions.flat[active]?.id || ''

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        className="relative"
        role="combobox"
        aria-haspopup="listbox"
        aria-owns="search-suggestions"
        aria-expanded={open}
        aria-controls="search-suggestions"
        aria-activedescendant={activeId}
      >
        {/* Input */}
        <div className="flex items-center gap-3 bg-white rounded-2xl border border-gray-200 shadow-sm px-4 py-3 focus-within:ring-2 focus-within:ring-accent">
          <svg width="20" height="20" viewBox="0 0 24 24" className="text-gray-400" aria-hidden="true">
            <path d="M21 21l-4.2-4.2M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search for experts, labs, or type a question…"
            className="w-full outline-none text-sm md:text-base placeholder-gray-400"
          />
          <button
            onClick={() => setOpen(true)}
            className="text-sm rounded-lg px-3 py-1.5 bg-primary text-white hover:opacity-90"
          >
            Search
          </button>
        </div>

        {/* Hint */}
        <p className="mt-2 text-xs text-gray-500">Hint: Try “AI”, “Lab”, or “Consulting”.</p>

        {/* Suggestions dropdown */}
        {open && (
          <div
            id="search-suggestions"
            ref={listRef}
            role="listbox"
            className="absolute z-20 mt-2 w-full bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
          >
            {suggestions.groups.map((group, gi) => (
              <div key={gi} className="py-2">
                <p className="px-4 pb-1 text-[11px] uppercase tracking-wide text-gray-400">{group.title}</p>
                {group.items.length === 0 && (
                  <div className="px-4 py-2 text-sm text-gray-500">No suggestions</div>
                )}
                {group.items.map((item) => {
                  const idx = suggestions.flat.findIndex(f => f.id === item.id)
                  const isActive = idx === active
                  return (
                    <div
                      key={item.id}
                      id={item.id}
                      role="option"
                      aria-selected={isActive}
                      onMouseEnter={() => setActive(idx)}
                      onClick={() => handleClickItem(item)}
                      className={`px-4 py-2 text-sm cursor-pointer ${
                        isActive ? 'bg-neutral' : 'hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
