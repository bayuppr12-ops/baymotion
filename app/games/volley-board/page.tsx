'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function VolleyBoardRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/games/sport-board');
  }, [router]);

  return (
    <div style={{ maxWidth: '600px', margin: '80px auto', textAlign: 'center', color: '#FFFFFF', padding: '24px' }}>
      <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎲</div>
      <h2 style={{ fontFamily: 'Poppins', fontWeight: 800 }}>Mengalihkan ke Sport Board...</h2>
      <p style={{ color: '#9CA3AF', marginBottom: '24px' }}>
        Game Volley Board telah diperbarui menjadi <strong>Sport Board</strong> yang mendukung semua materi (termasuk Bulu Tangkis, Bola Voli, dll).
      </p>
      <Link href="/games/sport-board">
        <button className="btn-primary" style={{ padding: '12px 28px' }}>
          Buka Sport Board Sekarang →
        </button>
      </Link>
    </div>
  );
}
