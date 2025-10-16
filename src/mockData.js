export const expertServices = [
  { id: 1, expertId: 1, title: 'Materials Review', hours: 2, pricePerHour: 250 },
  { id: 2, expertId: 1, title: 'Lab Validation Planning', hours: 3, pricePerHour: 250 },
]

export const expertProfiles = [
  {
    id: 1,
    name: 'Dr. Jane Doe',
    expertise: ['AI Materials', 'Microscopy'],
    pricePerHour: 250,
    rating: 4.8,
    photo: 'https://placehold.co/96',
    country: 'Germany', city: 'Berlin',
    gallery: ['https://placehold.co/600x360'],
    bio: 'Former PI at TU Berlin. 10+ years in AI-driven materials discovery.'
  },
  // ...
]

export const labProfiles = [
  {
    id: 1,
    name: 'AI Materials Lab',
    city: 'Berlin', country: 'Germany',
    pricePerHour: 180,
    equipment: ['SEM', '3D Printer'],
    opening: 'Mon–Fri 09:00–18:00',
    gallery: ['https://placehold.co/600x360'],
    location: { lat: 52.52, lng: 13.40 } // placeholder
  },
  // ...
]
