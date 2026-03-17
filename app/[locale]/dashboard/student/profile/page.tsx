'use client';
import Link from 'next/link';
import DashNav from '@/components/dashboard/DashNav';
import { useState } from 'react';

export default function ProfilePage() {
  const [name, setName] = useState('Rahul Sharma');
  const [email, setEmail] = useState('rahul.sharma@gmail.com');
  const [bio, setBio] = useState('Software engineer looking to improve Business English for international clients.');
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <DashNav active="profile" />
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '32px 24px' }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1e293b', margin: '0 0 24px' }}>My Profile</h1>

        {/* Avatar */}
        <div style={{ background: 'white', borderRadius: 20, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #8774DB, #F35555)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 28 }}>RS</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 20, color: '#1e293b' }}>{name}</div>
              <div style={{ color: '#64748b', fontSize: 14, marginTop: 2 }}>Intermediate · Member since March 2025</div>
              <button style={{ marginTop: 8, padding: '6px 14px', borderRadius: 99, border: '1px solid #e2e8f0', background: 'white', fontSize: 13, cursor: 'pointer', color: '#475569' }}>Change photo</button>
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={{ background: 'white', borderRadius: 20, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          {[
            { label: 'Full Name', value: name, onChange: setName, type: 'text' },
            { label: 'Email', value: email, onChange: setEmail, type: 'email' },
          ].map(f => (
            <div key={f.label} style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 6 }}>{f.label}</label>
              <input type={f.type} value={f.value} onChange={e => f.onChange(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 14, color: '#1e293b', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          ))}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 6 }}>Bio</label>
            <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 14, color: '#1e293b', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
          </div>
          <button onClick={handleSave}
            style={{ padding: '11px 28px', background: saved ? '#16a34a' : '#8774DB', color: 'white', borderRadius: 99, border: 'none', fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'background .2s' }}>
            {saved ? '✓ Saved!' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
