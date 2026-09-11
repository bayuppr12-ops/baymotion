'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Beranda', icon: '🏠' },
  { href: '/materi', label: 'Materi', icon: '📚' },
  { href: '/video', label: 'Video', icon: '🎥' },
  { href: '/games', label: 'Games', icon: '🎮' },
  { href: '/ranking', label: 'Ranking', icon: '🏆' },
  { href: '/kuis', label: 'Kuis', icon: '🧠' },
  { href: '/refleksi', label: 'Refleksi', icon: '💡' },
  { href: '/guru', label: 'Mode Guru', icon: '👨‍🏫' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      style={{
        background: 'rgba(23, 23, 23, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid #3F3F46',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div className="flex items-center gap-2.5">
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #FF6B1A, #FF9F43)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.2rem',
                boxShadow: '0 3px 10px rgba(255, 107, 26, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              🏆
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 900,
                  fontSize: '1.25rem',
                  lineHeight: 1,
                  background: 'linear-gradient(135deg, #FF6B1A, #FF9F43)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '0.5px',
                }}
              >
                BAYMOTION
              </div>
              <div style={{ fontSize: '0.62rem', color: '#D1D5DB', fontWeight: 700, letterSpacing: '0.5px', marginTop: '2px' }}>
                Learn • Move • Challenge
              </div>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1 flex-wrap">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href + '/'));
            const isGuruMode = item.href === '/guru';
            return (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                <div
                  className="nav-link"
                  style={{
                    background: isActive
                      ? '#FF6B1A'
                      : isGuruMode
                      ? 'rgba(255, 159, 67, 0.2)'
                      : 'transparent',
                    color: isActive
                      ? '#FFFFFF'
                      : isGuruMode
                      ? '#FFC857'
                      : '#FFFFFF',
                    border: isGuruMode
                      ? '1px solid rgba(255, 159, 67, 0.4)'
                      : isActive
                      ? '1px solid rgba(255, 107, 26, 0.5)'
                      : '1px solid transparent',
                    fontSize: '0.84rem',
                    padding: '6px 12px',
                    fontWeight: isActive || isGuruMode ? 700 : 600,
                  }}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Projector button */}
        <Link href="/projector" style={{ textDecoration: 'none' }}>
          <button
            className="hidden lg:flex items-center gap-2"
            style={{
              background: '#FF6B1A',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '10px',
              padding: '8px 16px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer',
              boxShadow: '0 3px 10px rgba(255, 107, 26, 0.4)',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#E55A0D';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FF6B1A';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            📺 Proyektor
          </button>
        </Link>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: '#242424',
            border: '1px solid #3F3F46',
            borderRadius: '8px',
            padding: '8px 12px',
            cursor: 'pointer',
            color: '#FFFFFF',
            fontSize: '1.1rem',
            fontWeight: 700,
          }}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          style={{
            background: '#171717',
            borderTop: '1px solid #3F3F46',
            padding: '16px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.6)',
          }}
        >
          <div className="grid grid-cols-2 gap-2 lg:hidden">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{ textDecoration: 'none' }}
                  onClick={() => setIsOpen(false)}
                >
                  <div
                    style={{
                      background: isActive ? '#FF6B1A' : '#242424',
                      borderRadius: '10px',
                      padding: '10px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#FFFFFF',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: isActive ? 700 : 600,
                      fontSize: '0.88rem',
                      border: isActive ? '1px solid #FF6B1A' : '1px solid #3F3F46',
                    }}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </div>
          <Link href="/projector" style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
            <div
              style={{
                marginTop: '12px',
                background: '#FF6B1A',
                borderRadius: '10px',
                padding: '12px',
                textAlign: 'center',
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                fontSize: '0.9rem',
                boxShadow: '0 4px 12px rgba(255, 107, 26, 0.4)',
              }}
            >
              📺 Mode Proyektor
            </div>
          </Link>
        </div>
      )}
    </nav>
  );
}
