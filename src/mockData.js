// /src/mockData.js

// Minimal list used by the original BookingFlow (Step 2 - select expert)
export const experts = [
  { id: 1, name: 'Dr. Jane Doe', expertise: 'AI Materials', price: 250, rating: 4.8, photo: 'https://placehold.co/80x80' },
  { id: 2, name: 'Prof. Alan Smith', expertise: 'Battery Tech', price: 220, rating: 4.6, photo: 'https://placehold.co/80x80' },
  { id: 3, name: 'Dr. Linh Nguyen', expertise: 'Biotech',      price: 200, rating: 4.7, photo: 'https://placehold.co/80x80' },
]

// Minimal lab list (used in earlier UI and future labs flow)
export const labs = [
  { id: 1, name: 'AI Materials Lab', location: 'TU Berlin',   pricePerHour: 180, facilities: ['SEM', '3D Printer'] },
  { id: 2, name: 'Battery Testing Lab', location: 'ETH Zürich', pricePerHour: 200, facilities: ['Cyclers', 'Environmental Chamber'] },
]

// Bookings used by BusinessDashboard / ExpertDashboard tables
export const bookings = [
  { id: 'B-1001', type: 'Expert', target: 'Dr. Jane Doe',        date: '2025-10-28', status: 'Pending',   report: null },
  { id: 'B-1002', type: 'Lab',    target: 'AI Materials Lab',    date: '2025-11-03', status: 'Confirmed', report: 'Consultation Summary' },
  { id: 'B-1003', type: 'Expert', target: 'Prof. Alan Smith',    date: '2025-11-07', status: 'Scheduled', report: null },
]

// Richer expert profiles used by the new Experts Catalog / Detail pages
export const expertProfiles = [
  {
    id: 1,
    name: 'Dr. Jane Doe',
    expertise: ['AI Materials', 'Microscopy'],
    pricePerHour: 250,
    rating: 4.8,
    photo: 'https://placehold.co/96',
    country: 'Germany',
    city: 'Berlin',
    gallery: ['https://placehold.co/600x360?text=AI+Materials+Lab', 'https://placehold.co/600x360?text=Microscopy'],
    bio: 'Former PI at TU Berlin. 10+ years in AI-driven materials discovery.',
  },
  {
    id: 2,
    name: 'Prof. Alan Smith',
    expertise: ['Battery Tech', 'Degradation'],
    pricePerHour: 220,
    rating: 4.6,
    photo: 'https://placehold.co/96',
    country: 'Switzerland',
    city: 'Zürich',
    gallery: ['https://placehold.co/600x360?text=Battery+Cyclers'],
    bio: 'Battery systems & testing expert. Focus on performance & lifetime.',
  },
  {
    id: 3,
    name: 'Dr. Linh Nguyen',
    expertise: ['Biotech', 'Assays'],
    pricePerHour: 200,
    rating: 4.7,
    photo: 'https://placehold.co/96',
    country: 'Germany',
    city: 'Hamburg',
    gallery: ['https://placehold.co/600x360?text=Assay+Setup'],
    bio: 'Biotech specialist with experience in assay design and validation.',
  },
]

// Richer lab profiles for the (upcoming) Labs catalog/detail flow
export const labProfiles = [
  {
    id: 1,
    name: 'AI Materials Lab',
    city: 'Berlin',
    country: 'Germany',
    pricePerHour: 180,
    equipment: ['SEM', '3D Printer'],
    opening: 'Mon–Fri 09:00–18:00',
    gallery: ['https://placehold.co/600x360?text=SEM', 'https://placehold.co/600x360?text=3D+Printer'],
    location: { lat: 52.52, lng: 13.40 },
  },
  {
    id: 2,
    name: 'Battery Testing Lab',
    city: 'Zürich',
    country: 'Switzerland',
    pricePerHour: 200,
    equipment: ['Cyclers', 'Environmental Chamber'],
    opening: 'Mon–Fri 08:00–17:00',
    gallery: ['https://placehold.co/600x360?text=Cycler', 'https://placehold.co/600x360?text=Env+Chamber'],
    location: { lat: 47.37, lng: 8.54 },
  },
]

// Example service SKUs (detail page add-on)
export const expertServices = [
  { id: 101, expertId: 1, title: 'Materials Review',           hours: 2, pricePerHour: 250 },
  { id: 102, expertId: 1, title: 'Lab Validation Planning',    hours: 3, pricePerHour: 250 },
  { id: 201, expertId: 2, title: 'Battery Performance Audit',  hours: 2, pricePerHour: 220 },
]
