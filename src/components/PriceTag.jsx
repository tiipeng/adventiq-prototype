// /src/components/PriceTag.jsx
import React from 'react'
export default function PriceTag({value, suffix='/h'}) {
  return <span className="inline-block rounded-lg bg-neutral px-2 py-1 text-xs text-primary">€{value}{suffix}</span>
}
