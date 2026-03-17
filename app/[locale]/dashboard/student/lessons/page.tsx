'use client';
import Link from 'next/link';

const ALL_LESSONS = [
  { id: '1', tutor: 'Priya Williams', avatar: 'PW', color: '#8774DB', subject: 'Business English', date: 'Today, 6:00 PM IST', status: 'upcoming' },
  { id: '2', tutor: 'Akira Tanaka', avatar: 'AT', color: '#49D1FD', subject: 'Conversational English', date: 'Tomorrow, 10:00 AM IST', status: 'upcoming' },
  { id: '3', tutor: 'Priya Williams', avatar: 'PW', color: '#8774DB', subject: 'Business English', date: 'Mar 14, 2025', status: 'completed' },
  { id: '4', tutor: 'Rohan Mehta', avatar: 'RM', color: '#AFF035', subject: 'Interview Prep', date: 'Mar 10, 2025', status: 'completed' },
  { id: '5', tutor: 'Akira Tanaka', avatar: 'AT', color: '#49D1FD', subject: 'Pronunciation', date: 'Mar 5, 2025', status: 'completed' },
];

const statusStyle: Record<string, { bg: string; color: string; label: string }> = {
  upcoming:  { bg: '#f0fdf4', color: '#16a34a', label: 'Upcoming' },
  completed: { bg: '#f1f5f9', color: '#64748b', label: 'Completed' },
  cancelled: { bg: '#fef2f2', color: '#ef4444', label: 'Cancelled' },
};

export default function LessonsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <DashNav active="lessons" />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1e293b', margin: 0 }}>My Lessons</h1>
            <p style={{ color: '#64748b', marginTop: 4, fontSize: 14 }}>{ALL_LESSONS.length} lessons total</p>
          </div>
          <Link href="../../../(marketing)/tutors" style={{ padding: '10px 20px', background: '#8774DB', color: 'white', borderRadius: 99, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>+ Book lesson</Link>
        </div>
        <div style={{ background: 'white', borderRadius: 20, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          {ALL_LESSONS.map((l, i) => (
            <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderBottom: i < ALL_LESSONS.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: l.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{l.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: '#1e293b' }}>{l.tutor}</div>
                <div style={{ fontSize: 13, color: '#64748b' }}>{l.subject} · {l.date}</div>
              </div>
              <span style={{ padding: '4px 12px', borderRadius: 99, background: statusStyle[l.status].bg, color: statusStyle[l.status].color, fontSize: 12, fontWeight: 600 }}>{statusStyle[l.status].label}</span>
              {l.status === 'upcoming' && (
                <Link href={`/classroom/${l.id}`} style={{ padding: '6px 16px', borderRadius: 99, background: '#8774DB', color: 'white', textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>Join</Link>
              )}
              {l.status === 'completed' && (
                <button style={{ padding: '6px 16px', borderRadius: 99, background: '#f1f5f9', color: '#64748b', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Review</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashNav({ active }: { active: string }) {
  return (
    <div style={{ background: '#0D0A1E', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #8774DB, #49D1FD)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 14 }}>E</div>
        <span style={{ color: 'white', fontWeight: 700, fontSize: 18 }}>Eigo</span>
      </Link>
      <div style={{ display: 'flex', gap: 4 }}>
        {[['dashboard', 'Overview'], ['lessons', 'My Lessons'], ['progress', 'Progress']].map(([key, label]) => (
          <Link key={key} href={`/dashboard/student${key === 'dashboard' ? '' : '/' + key}`}
            style={{ color: active === key ? 'white' : '#94a3b8', fontSize: 14, padding: '6px 12px', borderRadius: 6, textDecoration: 'none', background: active === key ? 'rgba(135,116,219,0.25)' : 'transparent' }}>{label}</Link>
        ))}
      </div>
      <Link href="/dashboard/student/profile" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 99, padding: '6px 14px 6px 8px' }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #8774DB, #F35555)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 11, color: 'white' }}>RS</div>
        <span style={{ color: 'white', fontSize: 13 }}>Rahul</span>
      </Link>
    </div>
  );
}
