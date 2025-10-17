// src/components/SummaryCard.jsx
import React, { useMemo } from 'react'

function initials(name = '') {
  return name.split(' ').slice(0, 2).map(n => n[0]?.toUpperCase() || '').join('')
}

function parsePriceToNumber(priceStr = '') {
  // Extract first number-like value; e.g., "€250/h" -> 250
  const n = Number((priceStr.match(/\d+([.,]\d+)?/) || ['0'])[0].replace(',', '.'))
  return isNaN(n) ? 0 : n
}

export default function SummaryCard({ expert, dateTime, tier = 'standard' }) {
  const base = useMemo(() => parsePriceToNumber(expert?.price), [expert])
  const uplift = 150
  const total = tier === 'premium' ? base + uplift : base

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      <h3 className="font-semibold text-primary mb-3">Booking summary</h3>

      {expert ? (
        <>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
              {initials(expert.name)}
            </div>
            <div className="flex-1">
              <div className="font-medium text-primary">{expert.name}</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {(expert.tags || []).slice(0, 3).map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs">{t}</span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                <div>
                  <div className="text-gray-500">Location</div>
                  <div className="font-medium">{expert.location || '—'}</div>
                </div>
                <div>
                  <div className="text-gray-500">Base price</div>
                  <div className="font-medium">{expert.price || '€—/h'}</div>
                </div>
                <div>
                  <div className="text-gray-500">When</div>
                  <div className="font-medium">{dateTime || '—'}</div>
                </div>
                <div>
                  <div className="text-gray-500">Tier</div>
                  <div className="font-medium">
                    <span className={`px-2 py-0.5 rounded text-xs ${tier === 'premium' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}>
                      {tier === 'premium' ? 'Premium' : 'Standard'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mock total */}
          <div className="mt-4 border-t pt-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Estimated total (mock)</span>
              <div className="font-semibold text-primary">€{total}</div>
            </div>
            {tier === 'premium' && (
              <p className="text-xs text-gray-500 mt-1">Includes service uplift (+€{uplift}) for AdventIQ Leader.</p>
            )}
          </div>
        </>
      ) : (
        <p className="text-sm text-gray-600">No expert selected.</p>
      )}
    </div>
  )
}
