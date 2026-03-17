'use client';

import Link from 'next/link';

const MOCK_LESSONS = [
  {
    id: '1',
    tutor: 'Priya Williams',
    subject: 'Business English',
    date: 'Today, 6:00 PM IST',
    status: 'upcoming',
    avatar: 'PW',
    color: '#8774DB',
  },
  {
    id: '2',
    tutor: 'Akira Tanaka',
    subject: 'Conversational English',
    date: 'Tomorrow, 10:00 AM IST',
    status: 'upcoming',
    avatar: 'AT',
    color: '#49D1FD',
  },
];

export default function StudentDashboard() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{ background: '#0D0A1E', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #8774DB, #49D1FD)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 14 }}>E</div>
          <span style={{ color: 'white', fontWeight: 700, fontSize: 18 }}>Eigo</span>
        </Link>
        <div style={{ color: '#94a3b8', fontSize: 14 }}>Student Dashboard</div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        {/* Welcome */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1e293b', margin: 0 }}>Welcome back! 👋</h1>
          <p style={{ color: '#64748b', marginTop: 8, fontSize: 15 }}>Here are your upcoming lessons.</p>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Total Lessons', value: '3', color: '#8774DB' },
            { label: 'Hours Learned', value: '4.5', color: '#49D1FD' },
            { label: 'Streak Days', value: '2 🔥', color: '#FAB657' },
          ].map((s) => (
            <div key={s.label} style={{ background: 'white', borderRadius: 16, padding: '20px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', borderTop: `4px solid ${s.color}` }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Upcoming lessons */}
        <div style={{ background: 'white', borderRadius: 20, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: '#1e293b' }}>Upcoming Lessons</h2>
            <Link href="/tutors" style={{ fontSize: 13, color: '#8774DB', textDecoration: 'none', fontWeight: 600 }}>+ Book new lesson</Link>
          </div>

          {MOCK_LESSONS.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📚</div>
              <p>No upcoming lessons yet.</p>
              <Link href="/tutors" style={{ display: 'inline-block', marginTop: 12, padding: '10px 24px', background: '#8774DB', color: 'white', borderRadius: 99, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>Find a tutor</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {MOCK_LESSONS.map((l) => (
                <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 16px', borderRadius: 12, background: '#f8f9fa', border: '1px solid #f1f5f9' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: l.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{l.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: '#1e293b', fontSize: 15 }}>{l.tutor}</div>
                    <div style={{ fontSize: 13, color: '#64748b' }}>{l.subject} · {l.date}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ padding: '4px 12px', borderRadius: 99, background: '#f0fdf4', color: '#16a34a', fontSize: 12, fontWeight: 600 }}>Confirmed</span>
                    <button style={{ padding: '6px 16px', borderRadius: 99, background: '#8774DB', color: 'white', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Join</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Find tutors CTA */}
        <div style={{ background: 'linear-gradient(135deg, #8774DB, #49D1FD)', borderRadius: 20, padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'white' }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>Ready to learn more?</div>
            <div style={{ fontSize: 14, opacity: 0.85, marginTop: 4 }}>Browse 50+ expert tutors for your next lesson</div>
          </div>
          <Link href="/tutors" style={{ padding: '12px 28px', background: 'white', color: '#8774DB', borderRadius: 99, textDecoration: 'none', fontWeight: 700, fontSize: 15, flexShrink: 0 }}>Browse tutors</Link>
        </div>
      </div>
    </div>
  );
}
