'use client';

import Link from 'next/link';
import { useState } from 'react';

const STUDENT = {
  name: 'Rahul Sharma',
  initials: 'RS',
  email: 'rahul.sharma@gmail.com',
  level: 'Intermediate',
  memberSince: 'March 2025',
};

const NAV_LINKS = [
  ['Overview',    '/dashboard/student'],
  ['My Lessons',  '/dashboard/student/lessons'],
  ['Progress',    '/dashboard/student/progress'],
];

const MENU_ITEMS = [
  { icon: '👤', label: 'My Profile',  href: '/dashboard/student/profile' },
  { icon: '📚', label: 'My Lessons',  href: '/dashboard/student/lessons' },
  { icon: '💳', label: 'Billing',     href: '/dashboard/student/billing' },
  { icon: '⚙️', label: 'Settings',    href: '/dashboard/student/settings' },
];

export default function DashNav({ active }: { active?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div style={{ background: '#0D0A1E', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60, position: 'relative', zIndex: 200 }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #8774DB, #49D1FD)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 14 }}>E</div>
          <span style={{ color: 'white', fontWeight: 700, fontSize: 18 }}>Eigo</span>
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: 4 }}>
          {NAV_LINKS.map(([label, href]) => (
            <Link key={label} href={href}
              style={{ color: active === label ? 'white' : '#94a3b8', fontSize: 14, padding: '6px 12px', borderRadius: 6, textDecoration: 'none', background: active === label ? 'rgba(135,116,219,0.25)' : 'transparent' }}>
              {label}
            </Link>
          ))}
        </div>

        {/* Profile button + dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setOpen(o => !o)}
            style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 99, padding: '6px 14px 6px 8px', cursor: 'pointer', color: 'white' }}
          >
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #8774DB, #F35555)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>
              {STUDENT.initials}
            </div>
            <span style={{ fontSize: 14, fontWeight: 500 }}>{STUDENT.name.split(' ')[0]}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.6, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
              <path d="M2 4l4 4 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {open && (
            <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', background: 'white', borderRadius: 14, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', minWidth: 220, overflow: 'hidden', zIndex: 300 }}>
              {/* Profile header */}
              <div style={{ padding: '16px 18px', background: 'linear-gradient(135deg, #0D0A1E, #1a1040)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #8774DB, #F35555)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, color: 'white', flexShrink: 0 }}>
                  {STUDENT.initials}
                </div>
                <div>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>{STUDENT.name}</div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 2 }}>{STUDENT.level} · Since {STUDENT.memberSince}</div>
                </div>
              </div>

              {/* Menu items */}
              <div style={{ padding: '8px 0' }}>
                {MENU_ITEMS.map(item => (
                  <Link key={item.label} href={item.href} onClick={() => setOpen(false)}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 18px', color: '#334155', fontSize: 14, textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f8f9fa')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
                <div style={{ height: 1, background: '#f1f5f9', margin: '4px 0' }} />
                <button
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 18px', color: '#ef4444', fontSize: 14, background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#fef2f2')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <span>🚪</span>
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {open && <div style={{ position: 'fixed', inset: 0, zIndex: 199 }} onClick={() => setOpen(false)} />}
    </>
  );
}
