'use client';

import { useState, useEffect } from 'react';
import { reflectionQuestions } from '@/data/questions';
import Timer from '@/components/Timer';

export default function RefleksiPage() {
  const [mounted, setMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentQ = reflectionQuestions[activeIdx];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px 80px', color: '#FFFFFF', position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '8px' }}>💡</div>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '2.2rem', color: '#FFFFFF', margin: 0 }}>
          Refleksi Pembelajaran Kelas
        </h1>
        <p style={{ color: '#D1D5DB', fontSize: '0.98rem' }}>
          Tampilkan pertanyaan refleksi di proyektor. Siswa berdiskusi secara lisan / kelompok.
        </p>
      </div>

      {/* Main reflection prompt card */}
      <div
        style={{
          background: '#242424',
          border: '1.5px solid rgba(255, 107, 26, 0.4)',
          borderRadius: '24px',
          padding: '40px',
          textAlign: 'center',
          marginBottom: '32px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div style={{ color: '#FF6B1A', fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.85rem', marginBottom: '16px', letterSpacing: '0.5px' }}>
          PERTANYAAN REFLEKSI #{activeIdx + 1} DARI {reflectionQuestions.length}
        </div>

        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>{currentQ.emoji}</div>

        <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)', color: '#FFFFFF', lineHeight: 1.4, marginBottom: '24px' }}>
          &ldquo;{currentQ.text}&rdquo;
        </h2>

        {/* Navigation between reflection questions */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            className="btn-ghost"
            onClick={() => setActiveIdx((prev) => Math.max(0, prev - 1))}
            disabled={activeIdx === 0}
            style={{ opacity: activeIdx === 0 ? 0.4 : 1 }}
          >
            ← Pertanyaan Sebelumnya
          </button>
          <button
            className="btn-primary"
            onClick={() => setActiveIdx((prev) => Math.min(reflectionQuestions.length - 1, prev + 1))}
            disabled={activeIdx === reflectionQuestions.length - 1}
            style={{ opacity: activeIdx === reflectionQuestions.length - 1 ? 0.4 : 1 }}
          >
            Pertanyaan Berikutnya →
          </button>
        </div>
      </div>

      {/* Timer for reflection discussion */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1rem', color: '#FFFFFF', textAlign: 'center', marginBottom: '16px' }}>
          ⏱ Timer Diskusi Kelompok
        </div>
        <Timer />
      </div>

      {/* All Reflection List */}
      <div style={{ background: '#242424', border: '1.5px solid #3F3F46', borderRadius: '20px', padding: '24px', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)' }}>
        <div style={{ fontFamily: 'Poppins', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px', fontSize: '1rem' }}>
          📋 Daftar Semua Pertanyaan Refleksi
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
          {reflectionQuestions.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveIdx(idx)}
              style={{
                background: activeIdx === idx ? '#FF6B1A' : '#171717',
                border: `1.5px solid ${activeIdx === idx ? '#FF6B1A' : '#3F3F46'}`,
                borderRadius: '12px',
                padding: '14px',
                textAlign: 'left',
                color: activeIdx === idx ? '#FFFFFF' : '#D1D5DB',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{item.emoji}</div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '0.85rem' }}>{item.text}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
