'use client';
import Link from 'next/link';
import DashNav from '@/components/dashboard/DashNav';

const SKILLS = [
  { label: 'Speaking', pct: 68, color: '#8774DB' },
  { label: 'Listening', pct: 75, color: '#49D1FD' },
  { label: 'Grammar', pct: 54, color: '#FAB657' },
  { label: 'Vocabulary', pct: 62, color: '#AFF035' },
  { label: 'Writing', pct: 45, color: '#F35555' },
];

const MILESTONES = [
  { label: 'First lesson completed', done: true },
  { label: '5 lessons completed', done: true },
  { label: '10 lessons completed', done: false },
  { label: 'First 5-star review', done: false },
  { label: 'B2 level reached', done: false },
];

export default function ProgressPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <DashNav active="progress" />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1e293b', margin: '0 0 24px' }}>My Progress</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
          {/* Skill bars */}
          <div style={{ background: 'white', borderRadius: 20, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', margin: '0 0 20px' }}>Skill Breakdown</h2>
            {SKILLS.map(s => (
              <div key={s.label} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>{s.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.pct}%</span>
                </div>
                <div style={{ height: 8, background: '#f1f5f9', borderRadius: 99 }}>
                  <div style={{ height: '100%', width: `${s.pct}%`, background: s.color, borderRadius: 99, transition: 'width 1s' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Milestones */}
          <div style={{ background: 'white', borderRadius: 20, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', margin: '0 0 20px' }}>Milestones</h2>
            {MILESTONES.map(m => (
              <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: m.done ? '#8774DB' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {m.done ? <span style={{ color: 'white', fontSize: 12 }}>✓</span> : <span style={{ color: '#94a3b8', fontSize: 10 }}>○</span>}
                </div>
                <span style={{ fontSize: 14, color: m.done ? '#1e293b' : '#94a3b8', fontWeight: m.done ? 600 : 400 }}>{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Level badge */}
        <div style={{ background: 'linear-gradient(135deg, #8774DB20, #49D1FD20)', border: '1px solid #8774DB40', borderRadius: 20, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #8774DB, #49D1FD)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 20 }}>B1</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, color: '#1e293b' }}>Intermediate Level</div>
            <div style={{ color: '#64748b', fontSize: 14, marginTop: 2 }}>Keep going! B2 is just 3 lessons away.</div>
          </div>
          <Link href="/dashboard/student/lessons" style={{ marginLeft: 'auto', padding: '10px 20px', background: '#8774DB', color: 'white', borderRadius: 99, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>Book next lesson →</Link>
        </div>
      </div>
    </div>
  );
}
