'use client';
import Link from 'next/link';

const INVOICES = [
  { id: 'INV-001', date: 'Mar 14, 2025', desc: 'Business English · Priya Williams', amount: '₹799', status: 'paid' },
  { id: 'INV-002', date: 'Mar 10, 2025', desc: 'Interview Prep · Rohan Mehta', amount: '₹999', status: 'paid' },
  { id: 'INV-003', date: 'Mar 5, 2025', desc: 'Pronunciation · Akira Tanaka', amount: '₹649', status: 'paid' },
];

export default function BillingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <DashNav />
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '32px 24px' }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1e293b', margin: '0 0 24px' }}>Billing</h1>

        {/* Payment method */}
        <div style={{ background: 'white', borderRadius: 20, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', margin: '0 0 16px' }}>Payment Method</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 12, border: '1px solid #e2e8f0', background: '#f8f9fa' }}>
            <div style={{ width: 40, height: 28, background: 'linear-gradient(135deg, #8774DB, #49D1FD)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 10, fontWeight: 700 }}>UPI</div>
            <div>
              <div style={{ fontWeight: 600, color: '#1e293b', fontSize: 14 }}>rahul@upi</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>Default payment method</div>
            </div>
            <button style={{ marginLeft: 'auto', padding: '6px 14px', borderRadius: 99, border: '1px solid #e2e8f0', background: 'white', fontSize: 13, cursor: 'pointer', color: '#475569' }}>Change</button>
          </div>
        </div>

        {/* Invoice history */}
        <div style={{ background: 'white', borderRadius: 20, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', margin: '0 0 16px' }}>Invoice History</h2>
          {INVOICES.map((inv, i) => (
            <div key={inv.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: i < INVOICES.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: '#1e293b', fontSize: 14 }}>{inv.desc}</div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{inv.id} · {inv.date}</div>
              </div>
              <span style={{ fontWeight: 700, color: '#1e293b' }}>{inv.amount}</span>
              <span style={{ padding: '3px 10px', borderRadius: 99, background: '#f0fdf4', color: '#16a34a', fontSize: 11, fontWeight: 600 }}>Paid</span>
              <button style={{ padding: '4px 12px', borderRadius: 6, border: '1px solid #e2e8f0', background: 'white', fontSize: 12, cursor: 'pointer', color: '#475569' }}>PDF</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashNav() {
  return (
    <div style={{ background: '#0D0A1E', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #8774DB, #49D1FD)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 14 }}>E</div>
        <span style={{ color: 'white', fontWeight: 700, fontSize: 18 }}>Eigo</span>
      </Link>
      <div style={{ display: 'flex', gap: 4 }}>
        {[['dashboard', 'Overview'], ['lessons', 'My Lessons'], ['progress', 'Progress']].map(([key, label]) => (
          <Link key={key} href={`/dashboard/student${key === 'dashboard' ? '' : '/' + key}`}
            style={{ color: '#94a3b8', fontSize: 14, padding: '6px 12px', borderRadius: 6, textDecoration: 'none' }}>{label}</Link>
        ))}
      </div>
      <Link href="/dashboard/student/profile" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 99, padding: '6px 14px 6px 8px' }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #8774DB, #F35555)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 11, color: 'white' }}>RS</div>
        <span style={{ color: 'white', fontSize: 13 }}>Rahul</span>
      </Link>
    </div>
  );
}
