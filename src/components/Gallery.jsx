// /src/components/Gallery.jsx
import React from 'react'
export default function Gallery({images=[]}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {images.slice(0,3).map((src, i)=>(
        <img key={i} src={src} alt={`gallery-${i}`} className="rounded-xl border object-cover w-full h-32" />
      ))}
    </div>
  )
}
