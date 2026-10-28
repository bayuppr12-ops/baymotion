'use client';

import Link from 'next/link';

export default function Sport100GamePage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px 60px' }}>
      {/* Navigation & Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <Link
          href="/games"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#242428',
            border: '1px solid #3F3F46',
            color: '#FFFFFF',
            padding: '8px 16px',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '0.9rem',
            transition: 'all 0.2s',
          }}
        >
          ⬅️ Kembali ke Game Arena
        </Link>

        <div style={{ display: 'flex', gap: '10px' }}>
          <a
            href="/sport-100/index.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #FF6B1A, #FF9F43)',
              color: '#FFFFFF',
              padding: '8px 18px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: 800,
              fontSize: '0.9rem',
              boxShadow: '0 4px 14px rgba(255, 107, 26, 0.4)',
            }}
          >
            🚀 Buka Fullscreen di Tab Baru
          </a>
        </div>
      </div>

      {/* Embedded Game Iframe */}
      <div
        style={{
          width: '100%',
          height: '840px',
          borderRadius: '24px',
          overflow: 'hidden',
          border: '2px solid #FF6B1A',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.7)',
          background: '#121215',
        }}
      >
        <iframe
          src="/sport-100/index.html"
          title="Sport 100 - BAYMOTION"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
