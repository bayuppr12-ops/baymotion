'use client';

import { useState } from 'react';
import Link from 'next/link';
import { materials, isVideoAllowedSubMaterial } from '@/data/materials';
import { videos } from '@/data/videos';

const bolaVoli = materials.find((m) => m.id === 'bola-voli')!;

function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&\n?#]+)/);
  return match ? match[1] : null;
}

export default function BolaVoliPage() {
  const [activeId, setActiveId] = useState(bolaVoli.subMaterials[0].id);
  const active = bolaVoli.subMaterials.find((s) => s.id === activeId)!;
  const activeIndex = bolaVoli.subMaterials.findIndex((s) => s.id === activeId);

  const isVideoAllowed = isVideoAllowedSubMaterial(active);
  const matchingVideo = isVideoAllowed
    ? videos.find((v) => v.material === 'bola-voli' && v.subMaterial === active.id)
    : null;

  const goNext = () => {
    if (activeIndex < bolaVoli.subMaterials.length - 1) {
      setActiveId(bolaVoli.subMaterials[activeIndex + 1].id);
    }
  };

  const goPrev = () => {
    if (activeIndex > 0) {
      setActiveId(bolaVoli.subMaterials[activeIndex - 1].id);
    }
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 20px 80px', color: '#FFFFFF', position: 'relative', zIndex: 1 }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '0.9rem', color: '#D1D5DB' }}>
        <Link href="/" style={{ color: '#D1D5DB', textDecoration: 'none' }}>🏠 Beranda</Link>
        <span>›</span>
        <Link href="/materi" style={{ color: '#D1D5DB', textDecoration: 'none' }}>📚 Materi</Link>
        <span>›</span>
        <span style={{ color: '#FF6B1A', fontWeight: 700 }}>🏐 Bola Voli</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Sidebar */}
        <div
          style={{
            background: '#242424',
            border: '1.5px solid #3F3F46',
            borderRadius: '20px',
            padding: '20px',
            position: 'sticky',
            top: '80px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
          }}
        >
          <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1rem', color: '#FFFFFF', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🏐 Bola Voli
          </div>
          {/* Progress */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#D1D5DB', marginBottom: '6px', fontWeight: 600 }}>
              <span>Progress</span>
              <span>{activeIndex + 1} / {bolaVoli.subMaterials.length}</span>
            </div>
            <div className="progress-bar" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="progress-fill" style={{ width: `${((activeIndex + 1) / bolaVoli.subMaterials.length) * 100}%` }} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {bolaVoli.subMaterials.map((sub, i) => {
              const hasVideoSpot = isVideoAllowedSubMaterial(sub);
              return (
                <button
                  key={sub.id}
                  onClick={() => setActiveId(sub.id)}
                  style={{
                    background: activeId === sub.id ? '#FF6B1A' : 'transparent',
                    border: activeId === sub.id ? '1px solid #FF6B1A' : '1px solid transparent',
                    borderRadius: '10px',
                    padding: '10px 12px',
                    color: activeId === sub.id ? '#FFFFFF' : '#D1D5DB',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: activeId === sub.id ? 700 : 500,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ minWidth: '20px', textAlign: 'center' }}>
                      {i < activeIndex ? '✅' : sub.emoji}
                    </span>
                    <span style={{ fontSize: '0.82rem' }}>{sub.title}</span>
                  </div>
                  {hasVideoSpot && (
                    <span style={{ fontSize: '0.75rem', opacity: 0.8 }} title="Memiliki Tempat Video Pembelajaran">🎥</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Video link shortcut - ONLY for technique and field */}
          {isVideoAllowed && (
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #3F3F46' }}>
              <Link href="/video" style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    background: 'rgba(255, 107, 26, 0.2)',
                    border: '1px solid rgba(255, 107, 26, 0.4)',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    color: '#FF9F43',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    justifyContent: 'center',
                  }}
                >
                  🎥 Tonton Video
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* Main content */}
        <div>
          <div
            key={activeId}
            className="animate-slide-up"
            style={{
              background: '#242424',
              border: '1.5px solid #3F3F46',
              borderRadius: '24px',
              padding: '40px',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '28px', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '3.5rem' }}>{active.emoji}</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                  <span style={{ color: '#FF6B1A', fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Materi {activeIndex + 1} dari {bolaVoli.subMaterials.length}
                  </span>
                  {active.category && (
                    <span
                      style={{
                        fontSize: '0.72rem',
                        padding: '2px 8px',
                        borderRadius: '100px',
                        fontWeight: 700,
                        background: isVideoAllowed ? 'rgba(255, 107, 26, 0.2)' : 'rgba(156, 163, 175, 0.2)',
                        color: isVideoAllowed ? '#FF9F43' : '#9CA3AF',
                        border: `1px solid ${isVideoAllowed ? 'rgba(255, 107, 26, 0.4)' : 'rgba(156, 163, 175, 0.4)'}`,
                      }}
                    >
                      {active.category === 'lapangan' ? '🏟️ Visual Lapangan' : active.category === 'teknik' ? '⚡ Peragaan Teknik' : '📖 Teori & Aturan'}
                    </span>
                  )}
                </div>
                <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: '2rem', color: '#FFFFFF', margin: 0 }}>
                  {active.title}
                </h1>
              </div>
            </div>

            {/* Description */}
            <div
              style={{
                background: '#171717',
                border: '1px solid rgba(255, 107, 26, 0.4)',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '28px',
                fontSize: '1.05rem',
                color: '#FFFFFF',
                lineHeight: 1.8,
              }}
            >
              {active.description}
            </div>

            {/* Key Points */}
            <div style={{ marginBottom: '28px' }}>
              <div
                style={{
                  background: 'rgba(255, 159, 67, 0.12)',
                  border: '1px solid rgba(255, 159, 67, 0.3)',
                  borderRadius: '16px',
                  padding: '24px',
                }}
              >
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#FF9F43', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  💡 Yang Harus Kamu Ingat
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {active.keyPoints.map((point, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: '#FFFFFF', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      <div
                        style={{
                          minWidth: '26px',
                          height: '26px',
                          background: '#FF6B1A',
                          border: '1px solid #FF6B1A',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: 800,
                          fontSize: '0.75rem',
                          color: '#FFFFFF',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      >
                        {i + 1}
                      </div>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Common Mistakes */}
            <div style={{ marginBottom: '28px' }}>
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '16px',
                  padding: '24px',
                }}
              >
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#FCA5A5', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ⚠️ Kesalahan Umum
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {active.commonMistakes.map((mistake, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: '#FFFFFF', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      <span style={{ color: '#EF4444', fontSize: '1rem', flexShrink: 0, marginTop: '2px' }}>✗</span>
                      <span>{mistake}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Practice */}
            <div style={{ marginBottom: '32px' }}>
              <div
                style={{
                  background: 'rgba(255, 107, 26, 0.12)',
                  border: '1px solid rgba(255, 107, 26, 0.3)',
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                }}
              >
                <div style={{ fontSize: '2rem', flexShrink: 0 }}>🧠</div>
                <div>
                  <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#FF6B1A', marginBottom: '8px' }}>
                    Tantangan Diskusi Teori Kelompok!
                  </h3>
                  <p style={{ color: '#FFFFFF', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                    {active.practice}
                  </p>
                </div>
              </div>
            </div>

            {/* TEMPAT LINK VIDEO PEMBELAJARAN (KHUSUS TEKNIK & LAPANGAN) */}
            {isVideoAllowed && (
              <div style={{ marginBottom: '32px' }}>
                <div
                  style={{
                    background: '#171717',
                    border: '1.5px solid #FF6B1A',
                    borderRadius: '20px',
                    padding: '24px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                    <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#FF9F43', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      🎥 Tempat Link Video Pembelajaran
                    </h3>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        background: 'rgba(255, 107, 26, 0.2)',
                        color: '#FF9F43',
                        padding: '4px 10px',
                        borderRadius: '100px',
                        fontWeight: 700,
                        border: '1px solid rgba(255, 107, 26, 0.4)',
                      }}
                    >
                      {active.category === 'lapangan' ? '🏟️ Visual Lapangan' : '⚡ Peragaan Teknik'}
                    </span>
                  </div>

                  {matchingVideo && matchingVideo.youtubeUrl && getYouTubeId(matchingVideo.youtubeUrl) ? (
                    <div>
                      <div style={{ borderRadius: '14px', overflow: 'hidden', aspectRatio: '16/9', marginBottom: '14px', border: '1px solid #3F3F46' }}>
                        <iframe
                          src={`https://www.youtube.com/embed/${getYouTubeId(matchingVideo.youtubeUrl)}?rel=0`}
                          title={matchingVideo.title}
                          style={{ width: '100%', height: '100%', border: 'none' }}
                          allowFullScreen
                        />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                        <span style={{ fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 600 }}>{matchingVideo.title}</span>
                        <Link href="/video" style={{ textDecoration: 'none' }}>
                          <button className="btn-ghost" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
                            ✏️ Kelola Link Video
                          </button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div style={{ background: '#242424', borderRadius: '14px', padding: '24px', textAlign: 'center', border: '1px dashed #3F3F46' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>📹</div>
                      <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1rem', color: '#FFFFFF', marginBottom: '6px' }}>
                        Tempat Link Video Pembelajaran
                      </div>
                      <p style={{ fontSize: '0.85rem', color: '#D1D5DB', maxWidth: '440px', margin: '0 auto 16px', lineHeight: 1.5 }}>
                        Wadah video peragaan {active.title.toLowerCase()} telah siap. Guru dapat memasukkan link YouTube melalui halaman Kelola Video.
                      </p>
                      <Link href="/video" style={{ textDecoration: 'none' }}>
                        <button className="btn-secondary" style={{ fontSize: '0.85rem', padding: '10px 18px' }}>
                          + Kelola & Tambahkan Link YouTube
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={goPrev}
                disabled={activeIndex === 0}
                className="btn-ghost"
                style={{
                  opacity: activeIndex === 0 ? 0.4 : 1,
                  cursor: activeIndex === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                ← Sebelumnya
              </button>
              <div style={{ display: 'flex', gap: '8px' }}>
                {isVideoAllowed && (
                  <Link href="/video" style={{ textDecoration: 'none' }}>
                    <button className="btn-secondary">🎥 Video</button>
                  </Link>
                )}
                <button
                  onClick={goNext}
                  disabled={activeIndex === bolaVoli.subMaterials.length - 1}
                  className="btn-primary"
                  style={{
                    opacity: activeIndex === bolaVoli.subMaterials.length - 1 ? 0.4 : 1,
                    cursor: activeIndex === bolaVoli.subMaterials.length - 1 ? 'not-allowed' : 'pointer',
                  }}
                >
                  Selanjutnya →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
