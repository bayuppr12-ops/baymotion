'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { materials, isVideoAllowedSubMaterial } from '@/data/materials';
import { videos } from '@/data/videos';
import { notFound } from 'next/navigation';

function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  return match ? match[1] : null;
}

export default function DynamicMaterialPage({ params }: { params: Promise<{ materialId: string }> }) {
  const { materialId } = use(params);
  const currentMaterial = materials.find((m) => m.id === materialId);

  if (!currentMaterial) {
    notFound();
  }

  const [activeId, setActiveId] = useState(
    currentMaterial.subMaterials[0]?.id || ''
  );

  const activeSub = currentMaterial.subMaterials.find((s) => s.id === activeId) || currentMaterial.subMaterials[0];
  const activeIndex = currentMaterial.subMaterials.findIndex((s) => s.id === activeId);

  const isVideoAllowed = isVideoAllowedSubMaterial(activeSub);
  const matchingVideo = isVideoAllowed
    ? videos.find((v) => v.material === currentMaterial.id && v.subMaterial === activeSub.id)
    : null;

  const goNext = () => {
    if (activeIndex < currentMaterial.subMaterials.length - 1) {
      setActiveId(currentMaterial.subMaterials[activeIndex + 1].id);
    }
  };

  const goPrev = () => {
    if (activeIndex > 0) {
      setActiveId(currentMaterial.subMaterials[activeIndex - 1].id);
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
        <span style={{ color: '#FF6B1A', fontWeight: 700 }}>
          {currentMaterial.emoji} {currentMaterial.title}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '290px 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Sidebar - sub material list */}
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
          <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#FFFFFF', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>{currentMaterial.emoji}</span> {currentMaterial.title}
          </div>

          {/* Progress */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#D1D5DB', marginBottom: '6px', fontWeight: 600 }}>
              <span>Progress</span>
              <span>{activeIndex + 1} / {currentMaterial.subMaterials.length}</span>
            </div>
            <div className="progress-bar" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div
                className="progress-fill"
                style={{
                  width: `${((activeIndex + 1) / currentMaterial.subMaterials.length) * 100}%`,
                  background: 'linear-gradient(90deg, #FF6B1A, #FF9F43)',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {currentMaterial.subMaterials.map((sub) => {
              const isCurrent = activeSub?.id === sub.id;
              const hasVideoSpot = isVideoAllowedSubMaterial(sub);
              return (
                <button
                  key={sub.id}
                  onClick={() => setActiveId(sub.id)}
                  style={{
                    background: isCurrent ? '#FF6B1A' : 'transparent',
                    border: isCurrent ? '1px solid #FF6B1A' : '1px solid transparent',
                    borderRadius: '10px',
                    padding: '10px 12px',
                    color: isCurrent ? '#FFFFFF' : '#D1D5DB',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: isCurrent ? 700 : 500,
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
                    <span style={{ minWidth: '22px', textAlign: 'center' }}>
                      {sub.emoji}
                    </span>
                    <span style={{ fontSize: '0.82rem', lineHeight: 1.3 }}>{sub.title}</span>
                  </div>
                  {hasVideoSpot && (
                    <span style={{ fontSize: '0.75rem', opacity: 0.8 }} title="Memiliki Tempat Video Pembelajaran">🎥</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Video link shortcut - ONLY if current sub-material has video spot */}
          {isVideoAllowed && (
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #3F3F46' }}>
              <Link href="/video" style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    background: 'rgba(255, 107, 26, 0.2)',
                    border: '1px solid rgba(255, 107, 26, 0.4)',
                    borderRadius: '100px',
                    padding: '10px 14px',
                    color: '#FF9F43',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    justifyContent: 'center',
                  }}
                >
                  🎥 Tonton Video Pembelajaran
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* Main content area */}
        {activeSub && (
          <div>
            <div
              key={activeSub.id}
              className="animate-slide-up"
              style={{
                background: '#242424',
                border: '1.5px solid #3F3F46',
                borderRadius: '24px',
                padding: '40px',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* Sub-Material Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '28px', flexWrap: 'wrap' }}>
                <div style={{ fontSize: '3.5rem' }}>{activeSub.emoji}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <span style={{ color: '#FF6B1A', fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {currentMaterial.title} — Sub-Materi {activeIndex + 1} dari {currentMaterial.subMaterials.length}
                    </span>
                    {activeSub.category && (
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
                        {activeSub.category === 'lapangan' ? '🏟️ Visual Lapangan' : activeSub.category === 'teknik' ? '⚡ Peragaan Teknik' : '📖 Teori & Aturan'}
                      </span>
                    )}
                  </div>
                  <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: '2.2rem', color: '#FFFFFF', margin: 0 }}>
                    {activeSub.title}
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
                {activeSub.description}
              </div>

              {/* Key Points */}
              {activeSub.keyPoints && activeSub.keyPoints.length > 0 && (
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {activeSub.keyPoints.map((point, i) => (
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
              )}

              {/* Common Mistakes */}
              {activeSub.commonMistakes && activeSub.commonMistakes.length > 0 && (
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
                      {activeSub.commonMistakes.map((mistake, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: '#FFFFFF', fontSize: '0.95rem', lineHeight: 1.6 }}>
                          <span style={{ color: '#EF4444', fontSize: '1rem', flexShrink: 0, marginTop: '2px' }}>✗</span>
                          <span>{mistake}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Practice / Theory Challenge */}
              {activeSub.practice && (
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
                        {activeSub.practice}
                      </p>
                    </div>
                  </div>
                </div>
              )}

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
                        {activeSub.category === 'lapangan' ? '🏟️ Visual Lapangan' : '⚡ Peragaan Teknik'}
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
                          Wadah video peragaan {activeSub.title.toLowerCase()} telah siap. Guru dapat memasukkan link YouTube melalui halaman Kelola Video.
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

              {/* Navigation buttons */}
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
                  ← Sub-Materi Sebelumnya
                </button>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {isVideoAllowed && (
                    <Link href="/video" style={{ textDecoration: 'none' }}>
                      <button className="btn-secondary">🎥 Video</button>
                    </Link>
                  )}
                  <button
                    onClick={goNext}
                    disabled={activeIndex === currentMaterial.subMaterials.length - 1}
                    className="btn-primary"
                    style={{
                      opacity: activeIndex === currentMaterial.subMaterials.length - 1 ? 0.4 : 1,
                      cursor: activeIndex === currentMaterial.subMaterials.length - 1 ? 'not-allowed' : 'pointer',
                    }}
                  >
                    Sub-Materi Selanjutnya →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
