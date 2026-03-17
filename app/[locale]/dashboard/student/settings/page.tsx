'use client';
import Link from 'next/link';
import DashNav from '@/components/dashboard/DashNav';
import { useState } from 'react';

export default function SettingsPage() {
  const [notifs, setNotifs] = useState({ email: true, sms: false, reminders: true });
  const [lang, setLang] = useState('en');
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const Toggle = ({ val, onChange }: { val: boolean; onChange: () => void }) => (
    <button onClick={onChange} style={{ width: 44, height: 24, borderRadius: 99, background: val ? '#8774DB' : '#e2e8f0', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background .2s', flexShrink: 0 }}>
      <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: val ? 23 : 3, transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
    </button>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <DashNav />
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '32px 24px' }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1e293b', margin: '0 0 24px' }}>Settings</h1>

        {/* Notifications */}
        <div style={{ background: 'white', borderRadius: 20, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', margin: '0 0 16px' }}>Notifications</h2>
          {[
            { key: 'email', label: 'Email notifications', desc: 'Lesson confirmations and updates' },
            { key: 'sms', label: 'SMS reminders', desc: 'Text message 30 min before lesson' },
            { key: 'reminders', label: 'Lesson reminders', desc: 'Push notification 1 hour before' },
          ].map(n => (
            <div key={n.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#1e293b', fontSize: 14 }}>{n.label}</div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{n.desc}</div>
              </div>
              <Toggle val={notifs[n.key as keyof typeof notifs]} onChange={() => setNotifs(p => ({ ...p, [n.key]: !p[n.key as keyof typeof notifs] }))} />
            </div>
          ))}
        </div>

        {/* Language */}
        <div style={{ background: 'white', borderRadius: 20, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', margin: '0 0 16px' }}>Language</h2>
          <select value={lang} onChange={e => setLang(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 14, color: '#1e293b', outline: 'none', minWidth: 200 }}>
            <option value="en">English</option>
            <option value="hi">हिंदी (Hindi)</option>
            <option value="ja">日本語 (Japanese)</option>
          </select>
        </div>

        {/* Danger zone */}
        <div style={{ background: 'white', borderRadius: 20, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: 24, border: '1px solid #fee2e2' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#ef4444', margin: '0 0 8px' }}>Danger Zone</h2>
          <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 14px' }}>Permanently delete your account and all data.</p>
          <button style={{ padding: '8px 18px', borderRadius: 99, background: 'white', border: '1px solid #ef4444', color: '#ef4444', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Delete account</button>
        </div>

        <button onClick={handleSave}
          style={{ padding: '11px 28px', background: saved ? '#16a34a' : '#8774DB', color: 'white', borderRadius: 99, border: 'none', fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'background .2s' }}>
          {saved ? '✓ Saved!' : 'Save settings'}
        </button>
      </div>
    </div>
  );
}
