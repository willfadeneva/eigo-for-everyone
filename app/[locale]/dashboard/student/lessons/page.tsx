'use client';
import Link from 'next/link';
import DashNav from '@/components/dashboard/DashNav';

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
