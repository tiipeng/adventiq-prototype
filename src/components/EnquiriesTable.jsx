import React, { useState } from 'react';

const initialEnquiries = [
  {
    id: 'ENQ-2025-001',
    client: 'Acme Biotech',
    title: 'Cell viability test pilot',
    date: '2025-10-28',
    status: 'Pending',
    ndaUrl: '/docs/sample-nda.pdf',          // placeholder
    contractUrl: '/docs/sample-contract.pdf', // placeholder
  },
  {
    id: 'ENQ-2025-002',
    client: 'Nova Materials',
    title: 'Materials stress analysis',
    date: '2025-10-29',
    status: 'Pending',
    ndaUrl: '/docs/sample-nda.pdf',
    contractUrl: '/docs/sample-contract.pdf',
  },
];

export default function EnquiriesTable() {
  const [enquiries, setEnquiries] = useState(initialEnquiries);

  const accept = (id) =>
    setEnquiries(list => list.map(e => (e.id === id ? { ...e, status: 'Accepted' } : e)));

  const decline = (id) =>
    setEnquiries(list => list.map(e => (e.id === id ? { ...e, status: 'Declined' } : e)));

  return (
    <section style={{ marginTop: 24 }}>
      <h2 style={{ marginBottom: 12 }}>Enquiries</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>ID</th>
              <th style={th}>Client</th>
              <th style={th}>Title</th>
              <th style={th}>Date</th>
              <th style={th}>Status</th>
              <th style={{ ...th, minWidth: 360 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((e) => (
              <tr key={e.id}>
                <td style={td}>{e.id}</td>
                <td style={td}>{e.client}</td>
                <td style={td}>{e.title}</td>
                <td style={td}>{e.date}</td>
                <td style={td}>{e.status}</td>
                <td style={{ ...td, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button
                    style={btnSuccess}
                    onClick={() => accept(e.id)}
                    disabled={e.status !== 'Pending'}
                    title={e.status !== 'Pending' ? 'Already processed' : 'Accept enquiry'}
                  >
                    Accept
                  </button>

                  <a
                    style={btnOutline}
                    href={e.ndaUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="Open NDA"
                  >
                    Sign NDA
                  </a>

                  <a
                    style={btnOutline}
                    href={e.contractUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="Open Contract"
                  >
                    View Contract
                  </a>

                  <button
                    style={btnDanger}
                    onClick={() => decline(e.id)}
                    disabled={e.status !== 'Pending'}
                    title={e.status !== 'Pending' ? 'Already processed' : 'Decline enquiry'}
                  >
                    Decline
                  </button>
                </td>
              </tr>
            ))}
            {enquiries.length === 0 && (
              <tr>
                <td style={td} colSpan={6}>
                  <div style={{ textAlign: 'center', padding: 16 }}>No enquiries yet.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const table = {
  width: '100%',
  borderCollapse: 'collapse',
  background: 'white',
  border: '1px solid #eee',
  borderRadius: 8,
};
const th = {
  textAlign: 'left',
  padding: '10px 12px',
  fontWeight: 600,
  borderBottom: '1px solid #eee',
  whiteSpace: 'nowrap',
};
const td = {
  padding: '10px 12px',
  borderBottom: '1px solid #f2f2f2',
  verticalAlign: 'top',
};

const btnBase = {
  display: 'inline-block',
  padding: '8px 12px',
  borderRadius: 8,
  border: '1px solid transparent',
  fontWeight: 600,
  textDecoration: 'none',
  cursor: 'pointer',
  background: 'white',
  color: '#111827',
  borderColor: '#D1D5DB',
};

const btnSuccess = {
  ...btnBase,
  background: '#065f46',
  color: 'white',
  borderColor: '#065f46',
};

const btnDanger = {
  ...btnBase,
  background: '#991b1b',
  color: 'white',
  borderColor: '#991b1b',
};

const btnOutline = {
  ...btnBase,
  background: 'white',
  color: '#111827',
  borderColor: '#D1D5DB',
};
