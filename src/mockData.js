export const experts = [
  { id: 1, name: 'Dr. Jane Doe', expertise: 'AI Materials', price: 250, rating: 4.8, photo: 'https://placehold.co/80x80' },
  { id: 2, name: 'Prof. Alan Smith', expertise: 'Battery Tech', price: 220, rating: 4.6, photo: 'https://placehold.co/80x80' },
  { id: 3, name: 'Dr. Linh Nguyen', expertise: 'Biotech', price: 200, rating: 4.7, photo: 'https://placehold.co/80x80' },
]

export const labs = [
  { id: 1, name: 'AI Materials Lab', location: 'TU Berlin', pricePerHour: 180, facilities: ['SEM', '3D Printer'] },
  { id: 2, name: 'Battery Testing Lab', location: 'ETH Zürich', pricePerHour: 200, facilities: ['Cyclers', 'Environmental Chamber'] },
]

export const bookings = [
  { id: 'B-1001', type: 'Expert', target: 'Dr. Jane Doe', date: '2025-10-28', status: 'Pending', report: null },
  { id: 'B-1002', type: 'Lab', target: 'AI Materials Lab', date: '2025-11-03', status: 'Confirmed', report: 'Consultation Summary' },
]
