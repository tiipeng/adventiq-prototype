// /src/components/MapPlaceholder.jsx
import React from 'react'
export default function MapPlaceholder({height='200px'}) {
  return <div className="w-full rounded-xl bg-neutral border h-[200px]" style={{height}} aria-label="map placeholder" />
}
