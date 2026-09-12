'use client';

import { useState } from 'react';
import Link from 'next/link';
import { materials } from '@/data/materials';

export default function MateriPage() {
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>(materials[0].id);
  const activeMaterial = materials.find((m) => m.id === selectedMaterialId) || materials[0];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px 80px', color: '#FFFFFF', position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div
          style={{
            display: 'inline-block',
            background: 'rgba(255, 107, 26, 0.25)',
            border: '1px solid #FF6B1A',
            borderRadius: '100px',
            padding: '8px 20px',
            marginBottom: '16px',
            color: '#FF6B1A',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 800,
            fontSize: '0.88rem',
          }}
        >
          📚 Modul Pembelajaran Lengkap
        </div>
        <h1
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            marginBottom: '12px',
            color: '#FFFFFF',
          }}
        >
          Materi Pembelajaran PJOK
        </h1>
        <p style={{ color: '#D1D5DB', fontSize: '1.02rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
          Pilih modul materi yang ingin dipelajari bersama di kelas! Semua modul sudah dilengkapi sub-materi visual, tips kunci, kesalahan umum, dan tantangan praktik.
        </p>
      </div>

      {/* Grid of All Materials */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        {materials.map((mat) => (
          <div
            key={mat.id}
            style={{
              background: '#242424',
              border: '1.5px solid #3F3F46',
              borderRadius: '24px',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div>
              <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>{mat.emoji}</div>
              <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '8px' }}>
                {mat.title}
              </h2>
              <p style={{ color: '#D1D5DB', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: '20px' }}>
                {mat.description}
              </p>

              {/* Sub-materials highlight */}
              <div style={{ background: '#171717', border: '1px solid #3F3F46', borderRadius: '14px', padding: '14px', marginBottom: '20px' }}>
                <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.78rem', color: '#FF6B1A', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
                  📖 {mat.subMaterials.length} SUB-MATERI TERSEDIA:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {mat.subMaterials.slice(0, 4).map((sub) => (
                    <div key={sub.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#FFFFFF' }}>
                      <span>{sub.emoji}</span>
                      <span style={{ fontWeight: 600 }}>{sub.title}</span>
                    </div>
                  ))}
                  {mat.subMaterials.length > 4 && (
                    <div style={{ fontSize: '0.78rem', color: '#D1D5DB', fontStyle: 'italic', marginTop: '2px' }}>
                      + {mat.subMaterials.length - 4} sub-materi lainnya...
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Link href={`/materi/${mat.id}`} style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '0.95rem' }}>
                🚀 Buka Modul {mat.title} →
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Interactive Material Explorer across All Materials */}
      <div
        style={{
          background: '#242424',
          border: '1.5px solid rgba(255, 107, 26, 0.4)',
          borderRadius: '24px',
          padding: '36px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '0.85rem', color: '#FF6B1A', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>
            PENJELAJAH SUB-MATERI
          </div>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.8rem', color: '#FFFFFF', margin: 0, marginBottom: '8px' }}>
            Daftar Lengkap Sub-Materi PJOK
          </h2>
          <div style={{ color: '#D1D5DB', fontSize: '0.92rem' }}>
            Pilih cabang olahraga di bawah untuk melihat rincian topik dan langsung menuju materi terkait!
          </div>
        </div>

        {/* Tab Selection */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {materials.map((mat) => {
            const isActive = mat.id === selectedMaterialId;
            return (
              <button
                key={mat.id}
                onClick={() => setSelectedMaterialId(mat.id)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '12px',
                  border: `2px solid ${isActive ? '#FF6B1A' : '#3F3F46'}`,
                  background: isActive ? 'rgba(255, 107, 26, 0.2)' : '#171717',
                  color: isActive ? '#FF9F43' : '#FFFFFF',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{mat.emoji}</span>
                <span>{mat.title}</span>
                <span
                  style={{
                    background: isActive ? '#FF6B1A' : '#2A2A2E',
                    color: '#FFFFFF',
                    fontSize: '0.72rem',
                    padding: '2px 6px',
                    borderRadius: '6px',
                  }}
                >
                  {mat.subMaterials.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sub-materials Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
          {activeMaterial.subMaterials.map((sub, idx) => (
            <Link key={sub.id} href={`/materi/${activeMaterial.id}#${sub.id}`} style={{ textDecoration: 'none' }}>
              <div
                style={{
                  background: '#171717',
                  border: '1px solid #3F3F46',
                  borderRadius: '14px',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <span style={{ fontFamily: 'Poppins', fontWeight: 900, color: '#FF6B1A', fontSize: '0.95rem' }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: '1.3rem' }}>{sub.emoji}</span>
                <span style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '0.9rem', color: '#FFFFFF', flex: 1 }}>
                  {sub.title}
                </span>
                <span style={{ color: '#FF9F43', fontWeight: 900 }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
